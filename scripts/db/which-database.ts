/**
 * Answers one question: is the database at `POSTGRES_URL` the one the live site
 * is actually using?
 *
 * Why this exists. Both the production database and any copy of it serve every
 * page identically, so a working site proves nothing. On 2026-09-06 the database
 * was moved off a personal Neon account and the cutover was verified by checking
 * `pg_stat_activity` on both projects — but Neon's pooler multiplexes server
 * backends, so a client session there cannot see any session but its own. That
 * check was reading a blind surface. On 2026-09-10 the same method was tried
 * again during the maintainer handover: a deliberate second connection did not
 * appear, which is how the blindness was found rather than believed.
 *
 * What works instead: make production do a database read you are certain of,
 * and watch `pg_stat_database.xact_commit` on the candidate endpoint. The
 * stimulus is `POST /api/auth/forgot-password` with an address that does not
 * exist — `createPasswordResetToken()` looks the address up in `users` for any
 * input, and for an unknown one it writes no row and sends no mail.
 *
 * Two things this script refuses to do without proving them first:
 *
 *  - It runs its own queries against the counter and requires it to move. A
 *    counter that does not respond makes every later zero meaningless, so a
 *    failed control aborts rather than reporting "not the live database".
 *  - It checks the stimulus reached the application. A scripted sign-in against
 *    `/api/auth/callback/credentials` was the first choice and produced a clean
 *    "no traffic" answer for a database that turned out to be live — because
 *    `/api/auth/csrf` on production returns a stub token and every request was
 *    rejected with `MissingCSRF` before it reached any query.
 *
 * The counters live on the compute, not the pooler, so the check connects to the
 * direct endpoint: `-pooler` is stripped from the host. That is also why the
 * result is unaffected by connection reuse — production sharing a pooler backend
 * with this process would hide a session, but not a committed transaction.
 *
 * Usage:
 *   npx tsx scripts/db/which-database.ts
 *   npx tsx scripts/db/which-database.ts --url "postgres://…" --base https://…
 *   npx tsx scripts/db/which-database.ts --self-test
 *
 * Exit codes: 0 confirmed live · 2 a finding (production is elsewhere) · 1 could
 * not run. `--self-test` inverts the expectation and exits 0 only when the
 * script correctly reports a database that is NOT production, which is the
 * positive control for the script itself.
 */
import 'dotenv/config';
import postgres from 'postgres';
import { getBaseUrl } from '../../lib/email/service';

const args = process.argv.slice(2);
const flag = (name: string): string | undefined => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const selfTest = args.includes('--self-test');

const connectionString = flag('--url') ?? process.env.POSTGRES_URL;
const origin = (flag('--base') ?? getBaseUrl()).replace(/\/+$/, '');

const IDLE_MS = 15_000;
const CONTROL_QUERIES = 60;
const STIMULUS_REQUESTS = 20;
/** The control moves the counter by roughly half its query count — postgres.js
 *  pipelines, so 60 queries commit around 30 transactions. Anything at or above
 *  this means the counter is answering. */
const CONTROL_FLOOR = 10;
/** Twenty `users` lookups commit far more than the two or three a quiet fifteen
 *  seconds does. The margin is deliberately wide: a false "yes" is worse here
 *  than a false "no", because it ends the search. */
const SIGNAL_MARGIN = 8;

function directHost(url: string): string {
  const u = new URL(url);
  u.hostname = u.hostname.replace('-pooler', '');
  return u.toString();
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main(): Promise<number> {
  if (!connectionString) {
    console.error('not ok - POSTGRES_URL is not set, and no --url was given');
    return 1;
  }

  const url = directHost(connectionString);
  const sql = postgres(url, { max: 1, prepare: false, connect_timeout: 20 });

  try {
    console.log(`endpoint : ${new URL(url).hostname}`);
    console.log(`site     : ${origin}\n`);

    const commits = async (): Promise<number> => {
      const [row] = await sql<{ x: string }[]>`
        select xact_commit::bigint as x
        from pg_stat_database where datname = current_database()`;
      return Number(row.x);
    };

    // --- window A: idle -----------------------------------------------------
    const a0 = await commits();
    await sleep(IDLE_MS);
    const idleA = (await commits()) - a0;
    console.log(`idle ${IDLE_MS / 1000}s                     +${idleA}`);

    // --- window B: the positive control -------------------------------------
    const b0 = await commits();
    for (let i = 0; i < CONTROL_QUERIES; i++) await sql`select 1`;
    const control = (await commits()) - b0;
    console.log(`control, ${CONTROL_QUERIES} of my own queries  +${control}`);
    if (control < CONTROL_FLOOR) {
      console.error(
        `\nnot ok - the counter did not move for ${CONTROL_QUERIES} queries of this script's own.\n` +
          '        Every result below would be meaningless, so nothing is reported.'
      );
      return 1;
    }

    // --- the stimulus must be proven to reach the application ---------------
    const probe = await fetch(`${origin}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: `which-database-${Date.now()}@example.invalid` }),
    });
    if (probe.status !== 200) {
      console.error(
        `\nnot ok - the stimulus returned HTTP ${probe.status}, so it never reached a query.\n` +
          '        This is a broken check, not a negative result.'
      );
      return 1;
    }

    // --- window C: production doing real reads ------------------------------
    const c0 = await commits();
    for (let i = 0; i < STIMULUS_REQUESTS; i++) {
      await fetch(`${origin}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: `which-database-${Date.now()}-${i}@example.invalid` }),
      }).catch(() => undefined);
      await sleep(150);
    }
    await sleep(3_000);
    const signal = (await commits()) - c0;
    console.log(`${STIMULUS_REQUESTS} production reads          +${signal}`);

    // --- window D: idle again -----------------------------------------------
    const d0 = await commits();
    await sleep(IDLE_MS);
    const idleB = (await commits()) - d0;
    console.log(`idle ${IDLE_MS / 1000}s                     +${idleB}`);

    const idle = (idleA + idleB) / 2;
    const isLive = signal >= idle + SIGNAL_MARGIN;
    console.log(`\nmean idle +${idle}, production window +${signal}`);

    if (selfTest) {
      if (isLive) {
        console.error('not ok - --self-test expects a database production does NOT use, and this one is live');
        return 1;
      }
      console.log('ok - --self-test: the check correctly reports a database production is not using');
      return 0;
    }

    if (isLive) {
      console.log('ok - production is using this database');
      return 0;
    }
    console.log('not ok - production is NOT using this database; it is reading somewhere else');
    return 2;
  } finally {
    await sql.end();
  }
}

main()
  .then((code) => process.exit(code))
  .catch((error: unknown) => {
    console.error('not ok - could not run:', error instanceof Error ? error.message : error);
    process.exit(1);
  });
