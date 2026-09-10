# Maintainer onboarding — Tharanee and Lesley

Written **2026-09-10**, for **Tharanee (`Tharaneetharan7`)** and **Lesley
(`lesley-gao`)**, who are taking over this repository and the production
deployment behind `https://www.shesharp.org.nz`.

This is the developer-side companion to `MAINTAINER_HANDOVER.md`. That document
answers *what stops working silently when the person who built this stops
answering messages*. This one answers a narrower question: **what you two do, in
what order, on your first two weeks, so that the answer to the other question
stops being "nobody knows".**

It is written to be read **once each, in order, on your first day**. Everything
in it is either an action with a proof step attached, or a fact that will
surprise you and cost you an afternoon if nobody says it first. Where a subject
already has a document, this points at it. A duplicated rule is a rule that will
disagree with itself within a year.

`MAINTAINER_HANDOVER.md` §1.1 has said "name a maintainer" since **2026-09-05**
and nobody was named. This document is that being done, five days late, with two
names instead of one.

> **This file carries no credential values, and must not gain any.** The
> repository is public and secret-scanning push protection is on: a pull request
> containing something credential-shaped is *rejected*, not flagged. It records
> *where* a secret lives and *who* holds it.

---

## 1. Who you are and what you own

**You are both full maintainers.** Access is shared — neither of you should ever
be blocked waiting for the other to be awake. But **every recurring obligation
gets exactly one named owner**, because an obligation owned by "the website team"
is an obligation nobody does, and §5 of `MAINTAINER_HANDOVER.md` is a list of
obligations with dates attached.

The split below is a **proposal for you to confirm or swap** at your first
meeting. What matters is that each row ends up with one name in it, not which
name.

| Area | Proposed owner | Why |
|---|---|---|
| Access, credentials, rotations, the accounts inventory (`MAINTAINER_HANDOVER.md` §3) | **Lesley** | Already repo admin, so already the person GitHub will let do it |
| The event loop — `docs/development/EVENT_LIFECYCLE_SOP.md` and the event skills | **Tharanee** | The loop that runs most often and has the hardest deadline |
| The newsletter and mailing-list loop — consent, the monthly send, the frequency cap | **Tharanee** | It is one audience and one cap; splitting it across two people is how a cap gets exceeded |
| Deploying | **both** | Neither of you should have to wait for the other to ship a fix |
| The three unwatched crons (`MAINTAINER_HANDOVER.md` §4) | **Lesley** | They fail silently; somebody has to notice an absence on a Monday |

### The gap you must close first

As at 2026-09-10, measured against the GitHub API:

| | GitHub | Repo permission | Org role |
|---|---|---|---|
| Chan Meng (outgoing) | `ChanMeng666` | admin | **org owner** |
| Tharanee | `Tharaneetharan7` | write | member |
| Lesley | `lesley-gao` | admin | member |
| (shared account) | `SheSharpNZ` | admin | **org owner** |

**The `NZ-SheSharp` org has exactly two owners: the departing maintainer and the
shared `SheSharpNZ` account. Neither of you is one.**

When the departing maintainer's account goes, every org-level action — adding a
member, changing a ruleset, transferring a repository — requires signing in as
the shared account. That is the same credential that reaches the mailbox, the
legacy Webflow back end and Resend, which can mail about 1,500 people from a
domain they trust. One credential, four systems.

**At least one of you must be made an org owner before the departing
maintainer's account is removed**, and Tharanee's repository permission should
go from `write` to `admin` at the same time. This is the single item on this
page that cannot be done by either of you: it needs the departing maintainer or
the shared account, today, while both still exist.

---

## 2. Day 1 — access, with a proof step for each

Six accesses. For each one there is a command that **proves** you have it.

**Why a proof step rather than "log in and see the dashboard".** A login that
looks like it worked proves that a page rendered. It does not prove that your
account can read the thing you will need at 9 p.m. on the night an event page is
wrong. Four separate false readings were caught while preparing this handover,
each of which looked like a clean answer (`MAINTAINER_HANDOVER.md` §13, "the
habit worth keeping"; the full list is in the verified-facts working file, §6).
An access nobody has exercised is an access nobody has.

Work through these **each of you, separately**. Two people who watched one person
do it have not been onboarded.

| # | Access | Proof |
|---|---|---|
| 1 | **Vercel** — team `she-sharp1`, project `she-sharp` | `npx vercel env ls production --scope she-sharp1` returns **45 variables** (measured 2026-09-10) |
| 2 | **GitHub** — `NZ-SheSharp/she-sharp` | Push a branch, open a pull request, and watch the `verify` check run and go green |
| 3 | **Neon** | Connect with **your own role** (`tharanee` / `lesley`) and count **41 tables** |
| 4 | **The `website@shesharp.org.nz` Google account** | Sign in, and from there reach the **Resend** dashboard — that account *is* the Resend login |
| 5 | **Stripe** | Open the dashboard and confirm which key set production is using before assuming — check `STRIPE_MODE` |
| 6 | **Slack** — workspace member, plus app-management on the four apps | Open the app-management page for each of the four apps in `MAINTAINER_HANDOVER.md` §3 |

Notes that will save you the afternoon:

- **Vercel.** The count is the proof, not the login. If it comes back much
  smaller you are scoped to the wrong team. `OPENAI_API_KEY` pulls back as an
  empty string — that is the **Sensitive** flag, not a missing value, and every
  `VERCEL_GIT_*` variable pulls empty too because this project has **no Vercel
  Git connection** (§5 below is entirely about what that means).
- **GitHub.** A green `verify` on your own pull request is the proof. Do not
  substitute "I can see the repository" — the repository is public, so anyone on
  earth can see it.
- **Neon.** The organisation is **"She Sharp"** (`org-dark-moon-42071634`),
  native, not Vercel-managed. Project `she-sharp-production`
  (`lively-night-18220962`), branch `production`
  (`br-polished-mouse-a7qv5lmx`), endpoint `ep-red-butterfly-a7yzv7n7` in
  `aws-ap-southeast-2`, PostgreSQL **17.11**. Roles `tharanee` and `lesley` were
  created on 2026-09-10, one password each. **41 tables** (40 `public` +
  `drizzle.__drizzle_migrations`), 33 enums, 6,599 rows in total; the largest are
  `email_events` 3,183, `newsletter_subscribers` 1,560, `funding_opportunities`
  1,168.
  **`neonctl` hangs** on interactive organisation selection — use the REST API at
  `https://console.neon.tech/api/v2` with the token from
  `~/.config/neonctl/credentials.json`, or `psql` directly.
  **History retention on this branch is six hours.** That is the entire
  point-in-time-restore window. It is not a backup.
- **The Google account** is the one to rotate *first*, not third, for the reason
  in §1 above.
- **Stripe** has **no key-management CLI or API**. `stripe keys` has no
  subcommands, and `/v1/api_keys`, `/v1/apikeys` and `/v1/account/api_keys` all
  return "Unrecognized request URL". Listing and rotating keys are console-only.
  The `stripe` CLI on the departing maintainer's machine points at a **different,
  personal** account, so anything it prints is not about She Sharp.

### One access nobody could verify from a workstation

`VERCEL_TOKEN` — the single credential in GitHub Actions that can deploy this
site — has an owner nobody could read. Vercel's OAuth token returns **403 for
every REST endpoint**, including `/v2/user`, so team membership and the
API-token list cannot be checked from a command line. **Check it in the Vercel
console during week 1** and write the answer into
`MAINTAINER_HANDOVER.md` §3. This is a blind surface, not a clean result.

---

## 3. Day 1 — local setup

If you are setting up in order to run the **skills** rather than to write code —
posters, the newsletter, replying to contact messages — do not use this section.
Use **`docs/development/AI_SKILLS_GUIDE.md` §2**, which is written for exactly
that and does not assume you have used a terminal. It covers Cursor, the four
background tools, GitHub sign-in and the secrets file, and each part ends with a
way to check it worked. Come back here afterwards for §4 and §5.

For the developer path:

1. **pnpm 10 is pinned** by `packageManager` (`pnpm@10.34.5`), and CI reads the
   same field. If your machine has pnpm 11, do **not** upgrade or downgrade
   globally — run `npx pnpm@10 install`. On pnpm 11, `pnpm db:migrate` tries to
   purge `node_modules`; use `npx drizzle-kit migrate` instead. Do not add a
   `version:` back to `pnpm/action-setup` in the workflows: two sources that
   agree today can disagree tomorrow, and the action then fails outright.
2. **Node 22.** Both workflows pin `node-version: '22'`. A newer major breaks the
   build.
3. **Install the handover environment file as *both* `.env` and `.env.local`.**
   Same file, two names. This is not belt-and-braces; it is a fix for a real
   split:

   > Scripts use `import "dotenv/config"`, which reads **`.env` only**. The
   > Next.js dev server reads **both**. On the departing maintainer's machine the
   > two files had drifted by **13 variables** — `BLOB_READ_WRITE_TOKEN` and the
   > KV/Redis set existed only in `.env.local`, while `HUMANITIX_API_KEY`, all
   > four `MAILCHIMP_*`, `SLACK_USER_TOKEN` and
   > `SLACK_EVENT_FEEDBACK_WEBHOOK_URL` existed only in `.env`. The consequence:
   > **every Blob-touching script had been running blind while `pnpm dev`
   > worked**, and the dev server had never seen the Humanitix or Mailchimp keys.
   > Neither failure announces itself.

4. **Ten production variables are in neither local file** and are not in the
   handover file either: `CRON_SECRET`, `EMAIL_UNSUBSCRIBE_SECRET`,
   `RESEND_WEBHOOK_SECRET`, `GITHUB_BOT_TOKEN`, `GITHUB_REPO`,
   `GITHUB_REPO_DEFAULT_BRANCH`, `SLACK_SIGNING_SECRET`, `SLACK_ALLOWED_USER_IDS`,
   `SLACK_MENTORSHIP_STATS_WEBHOOK_URL`, `DONATION_ADMIN_EMAIL`. Two consequences
   you will meet directly: without `EMAIL_UNSUBSCRIBE_SECRET` a locally built
   send **refuses** (`scripts/email/build-batch.ts`), and without `CRON_SECRET`
   no cron or approve endpoint can be exercised locally. Pull them from Vercel
   when you need them; do not invent them.
5. **`MAINTENANCE_MODE` is in neither `.env.example` nor Vercel**, and it is the
   site-wide kill switch. `MAINTENANCE_MODE=true` serves a branded 503 for the
   whole site, `/f/*` and the feedback form included.
   → `docs/deployment/MAINTENANCE_MODE.md`.
6. **Clear `tmp/` before a local build**, then `CI=true npx next build`. `tmp/`
   is gitignored but it is a *contract* — those exact paths appear in skill
   instructions and script defaults, so do not relocate it. Leaving it populated
   breaks the local build.

Four working directories behave the same way — `tmp/`, `.cache/`,
`scripts/.cache/`, `.recommendations/`, `.playwright-cli/`. `git status` never
mentions them, but Grep, Glob and `find` read them exactly like source. Nothing
under them is ever a source of truth.

### Never commit these

- The `.env` file, under any name. It has never been committed under any name,
  and that is not luck — keep it that way.
- Any attendee list, export or spreadsheet with people's addresses in it. Those
  belong in `tmp/`, and CI has leak guards for the specific case of a raw export
  landing in `lib/data/json/`.
- A promo, access or discount code. The 2026-06-11 hackathon page leaked
  registration codes and needed a history rewrite plus rotation — **and the
  rewrite did not work**: one of the codes it was supposed to purge was fetched
  back out of GitHub's API during the 2026-09-06 audit.

---

## 4. Day 2 — your first change

Make it a small one. A typo in a document is ideal; you are testing the pipeline,
not the change.

```
branch  →  commit  →  push  →  pull request  →  verify goes green  →  merge  →  deploy.yml runs
```

**You cannot push to `main`.** Not "should not" — cannot. Ruleset `protect main`
(id `22368186`) is active on the default branch with **zero bypass actors**,
verified against the API on 2026-09-10. Zero bypass actors means **nobody**: not
an org owner, not a repository admin, not the person who wrote the ruleset. A
direct push fails with `GH013`. The rules are `deletion`, `non_fast_forward`,
`pull_request`, and `required_status_checks` requiring a context named exactly
`verify`.

**But it requires zero approving reviews** (`required_approving_review_count: 0`).
That is the part people assume the opposite of, and it matters to a two-person
team: **once `verify` is green you can merge your own pull request.** You do not
need to wait for the other maintainer, and you do not need to invent a reviewer.
Branch, push, open, wait for green, merge. It stays a one-person operation.

Two consequences that are easy to trip over:

- **The job name `verify` is load-bearing.** The ruleset matches the status check
  by name. Renaming or splitting that job **silently removes the branch
  protection** — CI would still run, and nothing would be enforced. `verify.yml`
  is deliberately **one job**: `typecheck`, `typecheck:scripts`, `lint`, and a
  long tail of offline data checks — decks, image paths, email content lint,
  fonts, event assets, consent rules, the Humanitix and Mailchimp archives. They
  share one checkout and one install because none of them needs a database or the
  network. **A check that needs neither belongs as a step in that job**, not as a
  second job. → `docs/development/TESTING.md`.
- **Somebody has still not been told.** Commit `647ae0b6` ("Add registration link
  for Xero event") was pushed straight to `main` at 23:04 on **2026-09-05** by a
  second contributor, skipping every check and deploying itself. The ruleset now
  prevents exactly that — and **that person has not been told**. Their next
  direct push will simply fail, with a message about a ruleset they have never
  heard of. Telling them is a handover task with a name attached, not a technical
  one. **Whoever owns access (proposed: Lesley) owns this.**

After the merge, watch the deploy: `.github/workflows/deploy.yml` triggers on
push to `main`, builds in the runner with `vercel build`, and uploads with
`vercel deploy --prebuilt`. It has a 15-minute timeout and cancels superseded
runs. About three minutes from merge to live.

**`vercel deploy --prod` from a workstation returns `Not authorized`.** That is
not a permissions problem you can fix; this account cannot use Vercel's remote
build. **Every deploy this project has ever made went through `deploy.yml`.**

---

## 5. Day 2 — how an environment-variable change actually reaches production

This is the most surprising true fact in this repository, and until now it lived
in a comment inside `deploy.yml` where nobody would find it in an incident.

**Changing an environment variable does nothing to the running site.** Vercel
binds the environment at **build time**. The live site keeps serving the values
that were present when it was built. The dashboard's **"Redeploy" button does not
help** — it reuses the previous build's environment, which means it will
faithfully rebuild the site with the old value and report success.

So a variable change is always two commands:

```bash
# 1. Set it. --value, never stdin.
npx vercel env add VAR_NAME production --value 'the_value' --no-sensitive --force --yes --scope she-sharp1

# 2. Ship it. There is no Vercel Git connection; this is what rebuilds.
gh workflow run deploy.yml
```

`deploy.yml` accepts `workflow_dispatch` as of **2026-09-06**, added during the
Neon migration, which needed exactly this twice. Before that, shipping a variable
change meant inventing a commit to push.

> **Note:** `VERCEL_ENV_VARIABLES_GUIDE.md` still says there is no
> `workflow_dispatch` and that pushing a commit is the only route. That sentence
> was true when written and re-verified 2026-08-28; it was overtaken on
> 2026-09-06. Everything else in that guide is current and you should read it.

### Why `--value` and never stdin

Two separate failure modes, and only the flag form avoids both. Both are recorded
incidents, not hypotheticals:

- **2026-03-24 — the newline.** Ten variables in the personal Vercel project were
  found carrying a trailing `\n`, set with `echo "value" | vercel env add …`. One
  of them, `STRIPE_LIVE_WEBHOOK_SECRET`, was copied to the She Sharp project
  before it was noticed. The dashboard displayed it looking normal; the
  application would have received the newline and Stripe signature verification
  would have failed in live mode. The fix at the time was "use `printf`, not
  `echo`".
- **2026-06-19 — the `printf` rule was itself unsafe.** During the domain cutover,
  `BASE_URL`, `AUTH_URL` and `NEXTAUTH_URL` were re-set with the `printf … |`
  form this repository had recommended for three months. **This CLI reads the
  value from `/dev/tty`, not from standard input.** The pipe is never consumed,
  the variable is created **empty**, and the command reports success. Nothing
  was deployed with an empty `BASE_URL` — but had it been, every generated URL
  would have fallen back to `http://localhost:3000`, which is not a hypothesis
  about that fallback but a description of what it did on 2026-03-19, when
  duplicated fallback logic put `localhost:3000` into **25 real mentor
  invitation emails**.

An empty value is the worse of the two, because a corrupted value at least looks
wrong once you find it, whereas an empty value looks exactly like a variable
nobody ever set — so the investigation starts in the wrong place.

`--no-sensitive` is not cosmetic. Since CLI ≥54, new production variables default
to **Sensitive**, and a Sensitive variable pulls back as `""` — indistinguishable
from the empty-write failure. **An empty `vercel env pull` does not prove an
empty value.** Mark non-secret values (URLs, flags) non-sensitive so the next
person can actually verify them.

**Always verify per variable, byte for byte**, against what you meant to set —
not with a pattern check. An empty value contains no `\n`, no stray quotes and no
bad characters, so every pattern-based check passes on it.
→ `docs/deployment/VERCEL_ENV_VARIABLES_GUIDE.md`.

---

## 6. Week 1 — the operational assets you have inherited

Two bodies of tooling, and you should know they exist before you need them at
speed.

**Eleven skills under `.claude/skills/`.** Each is a written procedure an AI
assistant follows, so a recurring task is done the same careful way every time —
posters, slide decks, the monthly newsletter, an announcement to the mailing
list, replying to contact messages, turning a Slack planning channel into an
event page. They were written for a **non-technical operator on purpose**; that
was the succession plan, and it only pays off if somebody is pointed at it.
→ `docs/development/SKILLS_AND_WORKFLOWS_HANDOVER.md` for what each one is and
who should run it, and `docs/development/AI_SKILLS_GUIDE.md` for how to run one
without writing code.

**Ninety-odd scripts under `scripts/`**, all run by hand with `npx tsx <file>`
from the repository root. Exactly one is wired into `package.json`. They are
found by reading **`scripts/README.md`**, which opens with a **DANGER table** —
read it before running anything from that directory. The reason it exists in one
sentence: `lib/db/drizzle.ts` reads `POSTGRES_URL` through `dotenv.config()`, so
**on a machine that has ever run `vercel env pull`, the default target of every
script there is production.**

Two you will genuinely run, often:

| Script | What it is |
|---|---|
| `npx tsx scripts/events/event-status.ts` | The event lifecycle report. Offline, read-only, always exits 0. Safe to run at any time, including while you are still working out what it does |
| `npx tsx scripts/email/suppression.ts reconcile` | The **authoritative live subscriber count**. Read the number from its **`Mailable after suppression`** line |

**Never take a subscriber count from prose — this repository's own prose
included.** Every document here that quotes a figure quotes it with a date
attached because the figure moves, and a stale number in a document is how a send
gets planned against an audience that no longer exists.

---

## 7. Week 2 — the obligations no script enforces

These are the parts that do not survive a maintainer change on their own. Read
`MAINTAINER_HANDOVER.md` §5 in full; the summary is here so you know what you are
looking for.

- **Consent, before any email reaches a list.** The `newsletter_subscribers`
  table is the **only** marketing-consent record the organisation has, since the
  Resend Marketing objects were deleted on 2026-08-29. Only
  `status = 'subscribed'` is mailable, and a row only reaches that status by
  **double opt-in**. Registering for an event, donating, applying, giving
  feedback or writing in **is not subscribing**. The binding text is
  `.claude/skills/update-mailing-list/references/consent-rules.md`; every sending
  skill defers to it.
- **Three marketing sends per calendar month, maximum**, counted across every
  skill including the newsletter. There is a check for it
  (`marketing-frequency-check`) and it runs in CI, but the counting only works if
  every send goes through the skills.
- **A broadcast to the list is the founder's call, not the maintainer's.** That
  has been the working arrangement throughout. State it out loud to each other,
  because the tooling will happily send without asking.
- **Photographs of children.** Do not publish a frame in which a child is the
  identifiable subject, and never name a child — in copy, caption, `alt` text or
  credit. Screening happens **at selection**, because `/img/*` is cached
  immutably for a year and the public album lives outside this repository:
  removing a published frame is a code change *plus* an album edit. Consent is
  still not collected at registration.
  → `docs/development/PHOTOGRAPHING_MINORS.md`.

---

## 8. What you will find broken on day one

Not bugs to fix on sight. Three known differences between what you were shown and
what your machine will do, each recorded so you do not spend an hour deciding
whether you broke it.

**1. `pnpm db:migrate` fails with `must be owner`.** This is deliberate. Your
Neon roles (`tharanee`, `lesley`) are members of `neon_superuser` and their real
privileges were measured on 2026-09-10, not assumed — every probe ran inside a
transaction that was rolled back:

| Operation | Your role |
|---|---|
| `SELECT` | allowed |
| `INSERT` / `UPDATE` / `DELETE` | allowed |
| `TRUNCATE` | **denied** |
| `ALTER TABLE`, `CREATE INDEX` | **denied** — `must be owner of table` |
| `CREATE TABLE` in `public` | **denied** |
| `DROP TABLE` | **denied** |

Every skill that needs the live subscriber list keeps working; the two genuinely
irreversible operations are blocked by the database rather than by a script flag.
**The cost is that `pnpm db:migrate` and `pnpm db:generate` will not run for
you.** Schema changes remain a `neondb_owner` job, and `neondb_owner` travels
with the Neon organisation login. That is a decision you can revisit — but
revisit it deliberately, and know that the alternative is a role that can `DROP
TABLE` on production.

> One reading trap while you are testing this: a genuine privilege failure says
> `permission denied for …`. Two of the original probes came back *looking*
> denied because the test row was missing a NOT NULL column — PostgreSQL checks
> privileges **before** constraints, so a constraint violation actually proves the
> privilege was granted.

**2. `/tweak-event-slides` is broken.** The skill pushes straight to `main` by
design, for the "one small change an hour before doors open" case. With zero
bypass actors on the ruleset, that push is now rejected with `GH013` — and the
first person to discover this will be someone standing in a venue. **The fix is
cheap precisely because the ruleset requires zero approving reviews:** branch,
open a pull request, let `verify` pass, merge. It stays a one-person operation
and adds about three minutes. Somebody should make that change to the skill
before the next event, not during one.

**3. Two skills are switched off on the departing maintainer's machine, in a file
that is not in the repository.** `.claude/settings.local.json` is gitignored, and
its `skillOverrides` block sets `reply-to-contact-messages` and
`update-mailing-list` to `"off"`. **Your clone will behave differently from
anything you were shown** — those two will be available to you and were not to
them. (The same block also switches off `send-event-emails`, a skill that no
longer exists under `.claude/skills/`; that entry is stale and means nothing.)
Nothing is wrong with either skill. But if a demonstration you remember does not
match what your machine offers, this is why.

---

## 9. Acceptance criteria — when the handover is finished

The handover is **not** finished when the departing maintainer says so. It is
finished when **each of you, independently, has done all four of these** — not
watched them done, not done them in a pair.

Sign your name and the date against each row. Two columns, on purpose.

| # | | Tharanee | Lesley |
|---|---|---|---|
| a | **Deployed to production** — merged your own pull request, watched `verify` go green and `deploy.yml` finish, and confirmed the change on `https://www.shesharp.org.nz` | | |
| b | **Connected to the database with your own role** — `tharanee` / `lesley`, not a shared string — and counted **41 tables** | | |
| c | **Run one skill end to end**, including whatever it publishes or proposes | | |
| d | **Rotated one credential** — set it with `--value`, verified it byte-for-byte, shipped it with `gh workflow run deploy.yml`, and confirmed the site still works | | |

(d) is the one people skip, and it is the one that matters most. The rotation
list is `MAINTAINER_HANDOVER.md` §3, "Rotate on departure": Vercel, the
`website@` Google account, Stripe API keys, the Resend API key,
`GITHUB_BOT_TOKEN`, `CRON_SECRET`, and the Slack bot tokens. Pick a low-stakes
one for the exercise.

**Do not use `AUTH_SECRET` / `NEXTAUTH_SECRET` as your practice rotation.**
Rotating it signs every existing user out *and* invalidates outstanding mentee
payment links (`lib/forms/submission-token.ts`). It was rotated on 2026-09-06
because the previous value was found in this repository's git history. Rotate it
deliberately, when nobody is mid-application, or not at all this month.

Two more things that belong on the same page as the acceptance criteria, because
they are owed and dated:

- **There is now a backup.** Before 2026-09-10 this project had **no backup at
  all** beyond Neon's six-hour window. A full `pg_dump --no-owner --no-acl -Fc`
  was taken on 2026-09-10 (1,596,929 bytes, SHA-256
  `83e21c95da3374350f3fba1ec9d0a81a7e52da83bfdae9ba6ccb0e876dbf6e90`). It holds
  every mentor, mentee, donation and subscriber record. **It must never go on
  Vercel Blob** — public, immutable for a year — **or into this repository.**
  Deciding where it lives, and who takes the next one, is yours.
- **The old Neon project** `red-silence-55665683` is the rollback path until
  **2026-09-20**, after which it is the personal account's to delete. Until then
  the personal Vercel account still carries a copy of the organisation's data.

---

## 10. What is deliberately not yours

Some things look like they should have come with the repository and did not, on
purpose. `ChanMeng666/she-sharp-slack-archive` and
`ChanMeng666/she-sharp-transformation-record` are personal and private, and are
not being transferred — so `MAILCHIMP_VAULT_DIR`, `HUMANITIX_VAULT_DIR`,
`SLACK_ARCHIVE_DIR` and `SHESHARP_REPORTS_DIR` **must ship empty**, and the local
reporting scripts that read them will refuse cleanly rather than half-work.
Nothing the website serves depends on any of it, and a fresh clone deploys fine.
`NZ-SheSharp/she-sharp-reports` and the promo-video repository are archival, on
the organisation, and outside this handover. If you need the Humanitix or
Mailchimp history back, take fresh exports from the consoles — both are
re-exportable by anyone with the account, and the standing rule is that raw
exports never enter `lib/data/json/`.

---

## Where to go next

1. `CLAUDE.md` in the repository root — the rules that bind before any file is
   opened, and the index to the eight directory-level files.
2. `docs/deployment/MAINTAINER_HANDOVER.md` §4 through §7 — the crons, the human
   obligations, the rules that already cost something, and the open loops handed
   back to the organisation rather than to you.
3. `docs/ARCHITECTURE.md` §7 — the subsystem map.
4. `docs/README.md` — every document, with an honest status column.
5. `docs/development/TESTING.md` — there is no test runner, and CI is one job on
   purpose.

**And one habit, from the people who wrote the documents you are about to read:
before you trust a check that returns nothing, feed it something you know it
should catch.** A confident negative from the wrong surface is worse than no
check, because it ends the search. On 2026-09-06 that happened four times in one
session, and three of the four were only caught because somebody ran the positive
control.
