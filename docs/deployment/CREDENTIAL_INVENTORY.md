# Credential inventory

The permanent record of every environment variable and every account this project
depends on: what reads it, where it must be set, who can issue a replacement,
whether it can be issued per person, and what happens to it when a maintainer
leaves.

`.env.example` explains *what each variable does* and the incident that produced
the comment above it. `MAINTAINER_HANDOVER.md` explains *what stops working when
the maintainer stops answering*. This file is the third thing neither of those
is: the ownership ledger. It is meant to be edited whenever a variable is added,
retired, or changes hands — a stale inventory is worse than none, because it ends
the search.

> **This file carries no credential values, and must not gain any.** It records
> *where* a secret lives and *who* can reissue it. The values are in Vercel and
> in the accounts themselves. This is the file most tempting to break that rule
> on, and it is the one file where breaking it is unrecoverable: this repository
> is public, and a value committed here is world-readable immediately and
> permanently. **Do not write plausible-looking placeholder values either** —
> secret-scanning push protection rejects the push rather than flagging it, and
> the shapes that are already safe to show are the redacted forms in
> `.env.example` (`re_your_resend_api_key`, `xoxb-your-slack-bot-token`).
> `MAILCHIMP_LIST_ID=31bd05e8eb` is not a secret and is already public in the
> repository.

**Everything below was measured on 2026-09-10.** Where this file gives a count,
the command that produced it is named beside it. Never write a bare count into
this document again: `MAINTAINER_HANDOVER.md` §3 says the production variable
count is 46 and §10.1 says 48, and on 2026-09-10 it was **45**. Both of those
numbers were true once and neither says when.

---

## 1. How to read the table

Five controlled vocabularies. A cell outside them is a bug in this document.

### `Scope` — where the variable is actually set today

| Value | Means |
|---|---|
| `vercel-prod` | Vercel production only |
| `local` | one or both local dotenv files only |
| `gh-secret` | a GitHub Actions repository secret only |
| `vercel-prod+local` | both of the above two |
| `all-three` | Vercel production **and** local **and** a GitHub Actions secret |
| `injected` | nobody sets it by hand — a platform or a marketplace integration writes it |
| `none` | has a reader in the code, but is set in no environment |

`injected` is not a convenience label, it is a prohibition. The nine
`KV_*` / `UPSTASH_*` / `REDIS_URL` variables belong to the Vercel↔Upstash
marketplace integration, which owns the resource and re-pushes its own values on
every resource sync. **Hand-editing one desynchronises it and the edit is
silently rolled back later**, at a time unrelated to the edit. The same applies
to `VERCEL_OIDC_TOKEN`, which `vercel env pull` writes into `.env.local`, and to
`GITHUB_TOKEN`, which GitHub Actions mints per job.

`none` is usually correct rather than broken. Six of these rows are the
Redis/KV alternates the resolver tries in order before falling through to the
pair that *is* set; several more are tuning knobs with defaults in the code. The
one `none` row that is a genuine omission is `MAINTENANCE_MODE`, and it is
marked `create`.

### `Class`

`secret` — holding the value grants access to something. `config` — holding it
grants nothing. A Slack incoming-webhook URL is a `secret`: the URL *is* the
authentication. An OAuth **client ID** is `config`; it ships to the browser on
every sign-in. `MAILCHIMP_LIST_ID` is `config` and already public.

### `Ownership` — whether this can be one key per person

| Value | Means |
|---|---|
| `per-person` | each maintainer can and should hold their own |
| `shared` | one value, everyone uses it; a leak means everybody rotates |
| `shared-by-plan-limit` | it *would* be per-person, but the platform or plan cannot mint a second key |
| `personal-not-transferred` | belongs to an individual and cannot be handed over at all |
| `n-a` | not a credential — a mode switch, a path, an address |

`shared-by-plan-limit` exists so that a real constraint stays visible instead of
being written down as an aspiration. A row that says `shared` because nobody has
checked is not the same as a row that says `shared-by-plan-limit` because
somebody checked and the platform said no. Where the check has not been made,
this document says so in the `Action` column rather than guessing here.

### `Action` — what the departure requires

| Value | Means |
|---|---|
| `keep` | nothing owed; the value survives the departure |
| `rotate` | issue a new value and retire the old one, in the §6 order |
| `issue-per-person` | mint one credential per incoming maintainer |
| `create` | a value or a row that does not exist yet must be written |
| `delete` | remove it; §4 |
| `confirm-first` | **blocked** |

**`confirm-first` is a block, not a decision.** No key on such a row gets issued,
rotated or deleted until the ownership question behind it is answered. It does
not remove the row from the §6 rotation order — it keeps its place in the queue
and simply does not start. Every `confirm-first` row here traces to an unanswered
box on the offboarding ownership worksheet, and the worksheet is the thing that
lifts it.

### `Issuer` — the account that can mint a replacement

A closed list: `Vercel she-sharp1`, `GitHub NZ-SheSharp`, `Neon website@`,
`Resend website@`, `Google Cloud website@`, `OpenAI website@`, `Stripe console`,
`Slack app admin`, `Humanitix events@`, `Mailchimp`, `Upstash via Vercel`,
`self-generated`, `n-a`, and **`UNCONFIRMED`**.

`self-generated` means there is no issuing account: the value is a random string
anyone with write access to the environment can mint. `UNCONFIRMED` means the
repository does not prove it. **A separate ownership worksheet is being filled in
by the outgoing maintainer and will supply those values**; until it comes back,
`UNCONFIRMED` stays, and the rows carrying it are `confirm-first`. A list that
fills every cell by assumption is less useful than one that honestly shows its
three holes.

---

## 2. The accounts

The variables hang off these. Where a login was established by an API call
rather than by reading a document, it says so — the repository's own prose has
been wrong about ownership before.

| Account | Login | How established | Break-glass |
|---|---|---|---|
| Vercel, team `she-sharp1` | `shesharpnz` | `vercel whoami` on 2026-09-10 | §7 |
| GitHub org `NZ-SheSharp` | two owners: `ChanMeng666` and the shared `SheSharpNZ` | GitHub API, 2026-09-10 | §7 |
| Neon, org "She Sharp" `org-dark-moon-42071634` | `website@shesharp.org.nz` | Neon API `/users/me`, 2026-09-10 | §7 |
| Resend, team `shesharp` | `website@shesharp.org.nz` | `EMAIL_OPERATIONS.md`; moved off the maintainer's personal team by Domain Claim, 2026-08-28 | §7 |
| Google Workspace | `website@shesharp.org.nz` | the mailbox itself | §7 |
| Google Cloud, project `146130765065` | `website@shesharp.org.nz` | `DOMAIN_MIGRATION_2026-06-19.md` §5 | §7 |
| OpenAI | `website@shesharp.org.nz` | `MAINTAINER_HANDOVER.md` §3, verified 2026-09-05 | §7 |
| Stripe, `acct_1NHkCPFH4SQKCLLp` | **UNCONFIRMED** | — | §7 |
| Slack, She Sharp workspace, four apps | workspace owner is the founder | `MAINTAINER_HANDOVER.md` §7 | §7 |
| Humanitix | `events@shesharp.org.nz`, a shared login | `HUMANITIX_INTEGRATION_SHUTDOWN.md` | §7 |
| Mailchimp, `us3` | **UNCONFIRMED** | — | §7 |
| Upstash `upstash-kv-cerise-leaf` | none of its own — reached through the Vercel team | Vercel marketplace integration | follows Vercel |
| Domain registrar for `shesharp.org.nz` | **UNCONFIRMED** | never recorded anywhere in this repository | §7 |
| Cloudflare, DNS for `shesharp.org.nz` | **UNCONFIRMED** | never recorded anywhere in this repository | §7 |

**One warning that is bigger than any row in this file.** The
`website@shesharp.org.nz` Google account is the login for Resend, Neon, OpenAI
*and* Google Cloud, and it reaches the mailbox and the legacy Webflow back end.
One credential, six systems, one of which can mail 1,500 people from a domain
they trust. That is why it is first in §6 and not third.

---

## 3. The matrix

Grouped in `.env.example`'s section order, so the two can be read side by side.
Sections at the end have no `.env.example` counterpart and are marked as such —
that absence is itself a finding.

`Reader` gives **one representative path**, not every reader. The full reader
census is reproducible with the commands in §5.

### Authentication

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `AUTH_SECRET` | Signs session cookies and mentee payment links | `lib/auth/auth.config.ts` | `vercel-prod+local` | secret | shared | self-generated | `keep` [1] |
| `NEXTAUTH_SECRET` | The same value under NextAuth's own name | `lib/auth/auth.config.ts` | `vercel-prod+local` | secret | shared | self-generated | `keep` [1] |
| `AUTH_URL` | Origin NextAuth builds callback URLs from | `lib/auth/auth.config.ts` | `vercel-prod+local` | config | n-a | n-a | `keep` |
| `NEXTAUTH_URL` | The same value under NextAuth's own name | `lib/auth/auth.config.ts` | `vercel-prod+local` | config | n-a | n-a | `keep` |

[1] **Deliberately not rotated.** Both were rotated on 2026-09-06 because the old
value was found in this repository's git history (`MAINTAINER_HANDOVER.md` §12).
Rotating again signs every existing user out *and* invalidates outstanding mentee
payment links, which `AUTH_SECRET` has also signed since 2026-09-06
(`lib/forms/submission-token.ts`). See the warning in §6.

### Application

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `BASE_URL` | Origin every outgoing email link is built from | `lib/email/service.ts` | `vercel-prod+local` | config | n-a | n-a | `keep` [2] |

[2] Never inline the fallback. Duplicated fallback logic put `localhost:3000`
into 25 real mentor invitations on 2026-03-19 and six newsletter confirmations on
2026-09-01. All URL construction goes through `getBaseUrl()` in
`lib/email/service.ts`.

### Database (Neon PostgreSQL)

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `DATABASE_URL` | Pooled Neon connection string | `drizzle.config.ts` | `vercel-prod+local` | secret | per-person | Neon website@ | `issue-per-person` [3] |
| `POSTGRES_URL` | The same connection under a second name | `lib/db/drizzle.ts` | `vercel-prod+local` | secret | per-person | Neon website@ | `issue-per-person` [3] |

[3] Two per-person roles, `tharanee` and `lesley`, were created on the
`production` branch on 2026-09-10, each with its own password and each a member
of `neon_superuser`. **Their privileges were measured, not assumed**, inside
transactions that were rolled back: `SELECT`/`INSERT`/`UPDATE`/`DELETE` allowed;
`TRUNCATE`, `ALTER TABLE`, `CREATE INDEX`, `CREATE TABLE` and `DROP TABLE` all
denied. Every email and event skill keeps working; the two genuinely dangerous
operations are blocked by the database rather than by a script flag. **The
consequence to plan around: `pnpm db:generate` and `pnpm db:migrate` will fail
for these roles** — schema changes stay a `neondb_owner` job, and `neondb_owner`
travels with the Neon organisation login, not with a person.

The whole project's point-in-time-restore window is **six hours** of history
retention on the Free plan. Before 2026-09-10 there was no backup of any kind
beyond that. A full `pg_dump -Fc` was taken that day; it holds every mentor,
mentee, donation and subscriber record, and it must never go on Vercel Blob
(public, immutable for a year) or into this repository.

### OAuth Providers

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `GITHUB_CLIENT_ID` | Public identifier of the GitHub sign-in app | `app/api/auth/providers/route.ts` | `vercel-prod+local` | config | shared | GitHub NZ-SheSharp | `keep` |
| `GITHUB_CLIENT_SECRET` | Secret of the GitHub sign-in app | `app/api/auth/providers/route.ts` | `vercel-prod+local` | secret | shared | GitHub NZ-SheSharp | `rotate` [4] |
| `GOOGLE_CLIENT_ID` | Public identifier of the Google sign-in client | `app/api/auth/providers/route.ts` | `vercel-prod+local` | config | shared | Google Cloud website@ | `keep` |
| `GOOGLE_CLIENT_SECRET` | Secret of the Google sign-in client | `app/api/auth/providers/route.ts` | `vercel-prod+local` | secret | shared | Google Cloud website@ | `rotate` [4] |

[4] `shared` here is not a gap in the checking. An OAuth client secret identifies
the *application*, not the person using it, so per-person has no meaning for it.
Rotate both **last, and outside an event** — a wrong value takes sign-in down for
everyone at once and the failure is only visible to somebody trying to sign in.

Two GitHub secret-scanning alerts on Google OAuth client secrets are still open,
deliberately. They match no OAuth client in any Google account anyone here can
reach, but *"no account I can see holds it"* is not *"no account holds it"*. If a
third Google account turns up, that is where to look.

### Email Service (Resend)

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `RESEND_API_KEY` | Sends all mail, transactional and newsletter | `lib/email/service.ts` | `vercel-prod+local` | secret | shared | Resend website@ | `rotate` [5] |
| `EMAIL_FROM` | Overrides the transactional From header only | `lib/email/senders.ts` | `vercel-prod+local` | config | n-a | n-a | `keep` [6] |
| `EMAIL_UNSUBSCRIBE_SECRET` | Signs one-click unsubscribe tokens (RFC 8058) | `lib/email/unsubscribe-token.ts` | `vercel-prod` | secret | shared | self-generated | `keep` [7] |
| `EMAIL_UNSUBSCRIBE_MAILTO` | Optional mailto alternative to the unsubscribe URL | `lib/email/unsubscribe-headers.ts` | `none` | config | n-a | n-a | `keep` [8] |
| `RESEND_WEBHOOK_SECRET` | Verifies Resend's bounce and complaint webhooks | `app/api/webhooks/resend/route.ts` | `vercel-prod` | secret | shared | Resend website@ | `keep` [9] |
| `DONATION_ADMIN_EMAIL` | Where "new donation received" notices go | `lib/email/service.ts` | `vercel-prod` | config | n-a | n-a | `keep` [10] |

[5] The key must be `full_access`. A `sending_access` key **silently fails list
operations** rather than erroring (`AI_SKILLS_GUIDE.md` §2-G), which is the worst
possible failure shape for a mailing list. Whether the current Resend plan can
mint a *second* `full_access` key — and therefore whether this row could ever be
`per-person` rather than `shared` — is unanswered on the ownership worksheet and
is listed in §8.

[6] Must stay on `shesharp.org.nz`. Resend DKIM-signs with `d=shesharp.org.nz`,
so any other domain loses DMARC alignment and is dropped without a bounce once
the domain reaches `p=reject`.

[7] Rotating it invalidates unsent links only, so it is safe — but it is not owed
by a departure, and `scripts/email/build-batch.ts` **refuses to build a send**
without it. It is on Vercel and in neither local file, which is why a locally
built send fails today.

[8] Deliberately empty. Some clients prefer the mailto, so an address that
bounces is worse than none, and the HTTPS URL alone already satisfies RFC 8058
and the Gmail/Yahoo bulk-sender rules. Set it only once somebody confirms the
inbox is real and monitored.

[9] It is the webhook endpoint's signing secret, a separate object from the API
key — rotating the key does not change it. It changes only if the endpoint is
recreated. Without it, bounces and spam complaints are never recorded.

[10] A test donation writes to the **production** `donations` table and mails
this address unless it is overridden.

### AI Integration

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `OPENAI_API_KEY` | Chatbot, matching, CV screening, funding scoring, posters | `lib/chatbot/agent.ts` | `vercel-prod+local` | secret | shared | OpenAI website@ | `rotate` [11] |
| `OPENAI_MODEL` | Model override for matching and screening | `lib/matching/openai-service.ts` | `none` | config | n-a | n-a | `keep` |
| `AI_GATEWAY_API_KEY` | Dormant Vercel AI Gateway credential | `lib/chatbot/agent.ts` | `none` | secret | n-a | n-a | `keep` |
| `CHATBOT_USE_GATEWAY` | Switch routing the chatbot via the gateway | `lib/chatbot/agent.ts` | `none` | config | n-a | n-a | `keep` |

[11] The only one of the 45 production variables flagged **Sensitive** on Vercel,
which means `vercel env pull` returns it as an empty string. **That is the flag,
not a missing value** — reading it as "not configured" is one of the four false
negatives caught on 2026-09-06. Whether the OpenAI organisation can mint a named
project key per maintainer is unanswered on the worksheet; §8.

### Vercel Blob

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `BLOB_READ_WRITE_TOKEN` | Read/write token for the She Sharp Blob store | `lib/blob/uploads.ts` | `vercel-prod+local` | secret | shared | Vercel she-sharp1 | `keep` [12] |

[12] `local` here means **`.env.local` only**. Scripts load `.env` and nothing
else (`import "dotenv/config"`), so every Blob-touching script under `scripts/`
has been running blind while `pnpm dev` worked. The store id is embedded in the
token and the upload routes derive the hostname from it, so a wrong token fails
closed rather than writing somewhere unexpected. It replaced the three
`CLOUDINARY_*` variables on 2026-09-06.

### Slack Notifications

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `SLACK_VOLUNTEER_WEBHOOK_URL` | Volunteer form alerts | `lib/slack/service.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` |
| `SLACK_CONTACT_WEBHOOK_URL` | Contact form alerts, and the fallback for four others | `lib/slack/service.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` |
| `SLACK_DONATION_WEBHOOK_URL` | Donation alerts | `lib/slack/service.ts` | `none` | secret | shared | UNCONFIRMED | `keep` [13] |
| `SLACK_EVENT_FEEDBACK_WEBHOOK_URL` | Post-event attendee feedback | `lib/slack/service.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` |
| `SLACK_MENTORSHIP_STATS_WEBHOOK_URL` | Weekly mentorship digest | `lib/slack/mentorship-stats-service.ts` | `vercel-prod` | secret | shared | UNCONFIRMED | `confirm-first` |
| `SLACK_FUNDING_WEBHOOK_URL` | Weekly NZ funding digest | `lib/slack/funding-digest-service.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` |
| `SLACK_BOT_TOKEN` | Bot token for the `/event` bot and Slack triage | `lib/slack-bot/slack-client.ts` | `all-three` | secret | shared | UNCONFIRMED | `confirm-first` [14] |
| `SLACK_USER_TOKEN` | A named human's own Slack read access | `.claude/skills/sync-event-from-slack/scripts/slack-client.ts` | `local` | secret | **personal-not-transferred** | n-a | `issue-per-person` [15] |
| `SLACK_ARCHIVE_DIR` | Path to the private Slack archive checkout | `.claude/skills/sync-event-from-slack/scripts/refresh-archive.ts` | `local` | config | n-a | n-a | `keep` [16] |
| `SLACK_USERS_CACHE_TTL_MIN` | Skill-local user-cache lifetime | `.claude/skills/sync-event-from-slack/scripts/slack-client.ts` | `none` | config | n-a | n-a | `keep` |

[13] Deliberately unset — it falls back to `SLACK_CONTACT_WEBHOOK_URL`, so a
donation alert lands somewhere visible rather than vanishing. The same is true of
`SLACK_NEWSLETTER_WEBHOOK_URL` below.

[14] **It lives in two places** — Vercel production *and* the repository's
Actions secrets — and rotating only one leaves `slack-triage.yml` silently
broken. It is one of only two Actions secrets on the repository.

[15] This one is genuinely untransferable rather than merely unconfirmed. A bot
token can read only public channels it joined plus private channels it was
invited to; a user token acts as the authorising human and therefore reads their
DMs and every private channel they are in. **The outgoing maintainer's user token
cannot be handed over** — each incoming maintainer must authorise their own, and
the one in the old `.env` should simply die with the account.

[16] Ships **empty**. It points at `ChanMeng666/she-sharp-slack-archive`, a
personal private repository that is not part of this handover; a script that
needs it refuses cleanly when it is unset, and nothing the website serves depends
on it. The same applies to `MAILCHIMP_VAULT_DIR`, `HUMANITIX_VAULT_DIR` and
`SHESHARP_REPORTS_DIR`.

### Slack Event Bot (inbound `/event` slash command)

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `SLACK_SIGNING_SECRET` | HMAC secret verifying inbound Slack requests | `app/api/slack/events/interactive/route.ts` | `vercel-prod` | secret | shared | UNCONFIRMED | `confirm-first` |
| `SLACK_ALLOWED_USER_IDS` | Slack user IDs permitted to trigger the bot | `lib/slack-bot/allowlist.ts` | `vercel-prod` | config | n-a | n-a | `create` [17] |
| `GITHUB_BOT_TOKEN` | Fine-grained PAT the bot opens its pull requests with | `lib/slack-bot/github-client.ts` | `vercel-prod` | secret | **per-person** | GitHub NZ-SheSharp | `rotate` [18] |
| `GITHUB_REPO` | Target repository, `owner/repo` | `app/api/slack/events/route.ts` | `vercel-prod` | config | n-a | n-a | `keep` |
| `GITHUB_REPO_DEFAULT_BRANCH` | Base branch for the bot's pull requests | `lib/slack-bot/github-client.ts` | `vercel-prod` | config | n-a | n-a | `keep` |

[17] The variable exists; its *value* is owed. **The two incoming maintainers'
Slack user IDs must be added or the `/event` bot refuses them**, and it refuses
them quietly, from inside Slack, where nobody will connect it to a handover.

[18] The one variable in this file that is unambiguously issued against a person.
A fine-grained PAT belongs to the GitHub account that created it, so the
departing maintainer's must be revoked and a new one minted by whoever takes the
bot — which is what makes this `rotate` and not `keep`. Scope is
`contents:write` + `pull_requests:write` on this repository only.

### Monthly Newsletter

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `SLACK_NEWSLETTER_WEBHOOK_URL` | "Issue approved" Slack post | `lib/newsletter/notify.ts` | `none` | secret | shared | UNCONFIRMED | `keep` [13] |

The subscriber list is not a variable. It is the `newsletter_subscribers` table,
and since Resend's Marketing objects were deleted on 2026-08-29 it is **the only
marketing-consent record that exists**. It travels with the Neon rows in [3], not
with any credential here.

### Mailchimp Marketing API v3 — local tooling only

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `MAILCHIMP_API_KEY` | Read access to the archived `She#` audience | `lib/mailchimp/client.ts` | `local` | secret | shared | UNCONFIRMED | `confirm-first` [19] |
| `MAILCHIMP_SERVER_PREFIX` | Shard override for a key with no `<dc>` suffix | `lib/mailchimp/client.ts` | `local` | config | n-a | n-a | `keep` |
| `MAILCHIMP_LIST_ID` | The `She#` audience id — **not a secret** | `scripts/email/suppression.ts` | `local` | config | n-a | n-a | `keep` |
| `MAILCHIMP_VAULT_DIR` | Path to the raw export vault | `scripts/mailchimp/fetch-api.ts` | `local` | config | n-a | n-a | `keep` [16] |

[19] The current key (`she-sharp-repo-2026-08`) **expires 2027-08-27** —
Mailchimp forces a one-year expiry, so this is a dated obligation with no owner
yet. Separately, **a 2020-vintage key that never expires has still not been
revoked**; it was left alive on purpose while working out whether the (now
disconnected) Humanitix integration used it, and that question was never closed.
Nothing under `app/` reads any `MAILCHIMP_*` variable and nothing may. The
account is to be **paused or downgraded, never deleted**.

### Humanitix Public API — read-only

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `HUMANITIX_API_KEY` | Read-only ticketing API; powers the "Sold out" badge | `lib/humanitix/client.ts` | `vercel-prod+local` | secret | shared | Humanitix events@ | `confirm-first` [20] |
| `HUMANITIX_VAULT_DIR` | Path to the raw export vault | `scripts/humanitix/fetch-api.ts` | `none` | config | n-a | n-a | `keep` [16] |

[20] Blocked on two unanswered worksheet boxes: who else knows the shared
`events@shesharp.org.nz` password, and whether one Humanitix account can issue
more than one API key. Until the second is answered, "per-person" is a guess
either way.

The PII boundary here is enforced by **absence**: `/v1/events`, `/check-in-count`
and `/tags` carry no personal data and are implemented; `/orders` and `/tickets`
carry names, emails, mobiles, street addresses and live access codes, and
`lib/humanitix/client.ts` deliberately does not implement them, so a function
that does not exist cannot be imported from `app/` by mistake. **Do not add
them.**

### Cron / scheduled jobs

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `CRON_SECRET` | Bearer token protecting all cron and admin-trigger endpoints | `app/api/cron/process-queue/route.ts` | `vercel-prod` | secret | shared | self-generated | `rotate` [21] |

[21] It guards three Vercel crons and the newsletter approve endpoint. **All of
them fail with a silent 401** if it is wrong — nobody is paged, and the only
symptom is a Slack channel that stops receiving its weekly post. It is on Vercel
and in neither local file, so no cron or approve endpoint can be exercised
locally today. See §6 for the verification step that must follow the rotation.

### Stripe Payments

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `STRIPE_MODE` | Selects the test or live key set | `lib/stripe/config.ts` | `vercel-prod+local` | config | n-a | n-a | `keep` [22] |
| `STRIPE_LIVE_SECRET_KEY` | Live Stripe secret key | `lib/stripe/config.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` [23] |
| `STRIPE_LIVE_WEBHOOK_SECRET` | Verifies live Stripe webhooks | `lib/stripe/config.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` [23] |
| `STRIPE_LIVE_ANNUAL_PRICE_ID` | Price object for the annual membership | `lib/stripe/config.ts` | `vercel-prod+local` | config | n-a | UNCONFIRMED | `keep` |
| `STRIPE_LIVE_PUBLISHABLE_KEY` | Live publishable key — **no reader** | — | `vercel-prod+local` | config | n-a | UNCONFIRMED | `confirm-first` [24] |
| `STRIPE_TEST_SECRET_KEY` | Test Stripe secret key | `lib/stripe/config.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` [23] |
| `STRIPE_TEST_WEBHOOK_SECRET` | Verifies test Stripe webhooks | `lib/stripe/config.ts` | `vercel-prod+local` | secret | shared | UNCONFIRMED | `confirm-first` [23] |
| `STRIPE_TEST_ANNUAL_PRICE_ID` | Test price object | `lib/stripe/config.ts` | `vercel-prod+local` | config | n-a | UNCONFIRMED | `keep` |
| `STRIPE_TEST_PUBLISHABLE_KEY` | Test publishable key — **no reader** | — | `vercel-prod+local` | config | n-a | UNCONFIRMED | `confirm-first` [24] |

[22] It defaults to **`live`** when unset. Confirm what production actually holds
before assuming which key set is in use; do not infer it from `.env`, which says
`test`.

[23] Every Stripe row is blocked because the Stripe block of the ownership
worksheet is entirely unfilled: nobody has confirmed which login owns
`acct_1NHkCPFH4SQKCLLp`, and the Stripe CLI on the outgoing maintainer's
workstation points at a **different, personal** account. Rotating a live key
while unsure which account you are in is precisely the mistake this document
exists to prevent. Stripe has no key-management CLI or API — `/v1/api_keys`,
`/v1/apikeys` and `/v1/account/api_keys` all return "Unrecognized request URL" —
so listing and rotating are **console-only**.

[24] These two are set in every environment and read by nothing. `getStripeEnv()`
is called for the secret key, the webhook secret and the price id, and nowhere in
`app/`, `lib/`, `components/` or `scripts/` does the string `PUBLISHABLE` appear
at all — checkout is a server-side redirect to a Stripe-hosted session, so no
publishable key is ever needed in the browser. They are **not** in the 24 dead
variables of §4, which is a census dated 2026-09-10 and reproduced verbatim; they
are a separate finding of the same census and they are blocked on the same Stripe
ownership question. Retiring them is safe reasoning but not a safe *action* until
somebody can see the Stripe dashboard.

### Deploy and CI — not in `.env.example`

Nothing in this section is a dotenv variable, which is exactly why it goes
missing. A reader census that scans only TypeScript reports `VERCEL_TOKEN` — the
single credential that can deploy this site — as having no reader and therefore
as deletable. That happened while preparing this handover.

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `VERCEL_TOKEN` | The only credential that can deploy this site | `.github/workflows/deploy.yml` | `gh-secret` | secret | shared | **UNCONFIRMED** | `rotate` [25] |
| `VERCEL_ORG_ID` | Team id — a literal in the workflow, not a secret | `.github/workflows/deploy.yml` | `none` | config | n-a | n-a | `keep` |
| `VERCEL_PROJECT_ID` | Project id — a literal in the workflow, not a secret | `.github/workflows/deploy.yml` | `none` | config | n-a | n-a | `keep` |
| `VERCEL_OIDC_TOKEN` | Short-lived token `vercel env pull` writes locally | — | `injected` | secret | n-a | n-a | `keep` [26] |
| `GITHUB_TOKEN` | Per-job token GitHub Actions mints itself | `.github/workflows/slack-triage.yml` | `injected` | secret | n-a | n-a | `keep` |
| `NODE_ENV`, `VERCEL_URL` | Platform-provided build and runtime facts | `lib/auth/auth.config.ts` | `injected` | config | n-a | n-a | `keep` |
| `VERCEL` | Set to `1` on Vercel; distinguishes a real deploy from local | `lib/email/localhost-links.ts` | `injected` | config | n-a | n-a | `keep` |

[25] Created 2026-03-29. Its owner cannot be read from a workstation: Vercel's
`vca_` OAuth token returns **403 for every REST endpoint including `/v2/user`**,
so team membership and the API-token list are visible only in the console. That
is a blind surface, not a negative result. **Rotating it is the cheapest way to
close the question** — a token minted now from the `shesharpnz` login is
definitively the organisation's, whatever the old one was. Verify with
`gh workflow run deploy.yml` before going any further down the §6 list; since
2026-09-06 the workflow accepts `workflow_dispatch`, so this needs no invented
commit.

[26] Never copy it into a handover `.env`. It expires, and it is regenerated by
`vercel env pull`.

### Upstash / Vercel KV — injected, do not hand-edit

Nine variables, of which **four have a reader**. All nine are owned by the
Vercel↔Upstash marketplace integration.

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `KV_REST_API_URL` | Upstash REST endpoint | `lib/chatbot/redis.ts` | `injected` | config | shared | Upstash via Vercel | `keep` |
| `KV_REST_API_TOKEN` | Upstash REST token | `lib/chatbot/redis.ts` | `injected` | secret | shared | Upstash via Vercel | `keep` |
| `UPSTASH_REDIS_URL` | First alternate the resolver tries | `lib/chatbot/redis.ts` | `none` | config | n-a | n-a | `keep` |
| `UPSTASH_REDIS_TOKEN` | First alternate the resolver tries | `lib/chatbot/redis.ts` | `none` | secret | n-a | n-a | `keep` |
| `UPSTASH_REDIS_REST_URL` | Second alternate the resolver tries | `lib/chatbot/redis.ts` | `none` | config | n-a | n-a | `keep` |
| `UPSTASH_REDIS_REST_TOKEN` | Second alternate the resolver tries | `lib/chatbot/redis.ts` | `none` | secret | n-a | n-a | `keep` |

The remaining three — `KV_REST_API_READ_ONLY_TOKEN`, `KV_URL` and `REDIS_URL` —
have no reader and appear in §4. **They are the exception to §4: do not delete
them.** See the warning there.

### Tuning knobs and script-only paths — not in `.env.example`

| Variable | What it is | Reader | Scope | Class | Ownership | Issuer | Action |
|---|---|---|---|---|---|---|---|
| `MAINTENANCE_MODE` | Serves a 503 for the entire site | `proxy.ts` | `none` | config | n-a | n-a | `create` [27] |
| `MATCHING_MIN_SCORE` | Mentor-match score floor | `lib/matching/service.ts` | `none` | config | n-a | n-a | `keep` |
| `MATCHING_PRE_FILTER_THRESHOLD` | Pre-filter cutoff before the model runs | `lib/matching/service.ts` | `none` | config | n-a | n-a | `keep` |
| `MATCHING_QUEUE_EXPIRY_DAYS` | Mentee waiting-queue expiry | `lib/matching/service.ts` | `none` | config | n-a | n-a | `keep` |
| `AUTO_SCREEN_APPLICATIONS` | Runs CV screening on submission | `lib/forms/volunteer-service.ts` | `none` | config | n-a | n-a | `keep` |
| `ADMIN_SEED_EMAIL` | Seed admin address for a database reset | `scripts/reset-db-and-create-admin.ts` | `none` | config | n-a | n-a | `keep` [28] |
| `ADMIN_SEED_PASSWORD` | Seed admin password for a database reset | `scripts/reset-db-and-create-admin.ts` | `none` | secret | n-a | n-a | `keep` [28] |
| `PLAYWRIGHT_MODULE_PATH` | Local Playwright install path | `scripts/lib/playwright.ts` | `none` | config | n-a | n-a | `keep` |
| `CURATED_OUT` | Output directory for the curated-photo pipeline | `scripts/optimize-images.mts` | `none` | config | n-a | n-a | `keep` |
| `SHESHARP_REPORTS_DIR` | Path to the funder-report checkout | `scripts/internal-report/build-record.ts` | `none` | config | n-a | n-a | `keep` [16] |

[27] It is the site-wide kill switch, it works, and it is documented in
`MAINTENANCE_MODE.md` — and it appears in **neither** `.env.example` nor Vercel,
so the only way to discover it is to read `proxy.ts`. What is owed is a
documented row in `.env.example`, unset. **Not** a value on Vercel: setting it
returns 503 for the whole site including `/f/*` and the feedback form.

[28] `scripts/reset-db-and-create-admin.ts` destroys the database. Pass these on
the command line for the one run that needs them; never leave them in a dotenv
file where a stray `npx tsx` can find them.

`SHESHARP_REPO_DIR` is deliberately absent from this table: it is read by the
*reports* repository, pointing back at this one, and nothing here reads it.

---

## 4. The 24 dead variables

Census dated **2026-09-10**. Each of these has **no reader anywhere** — not in
`app/`, `lib/`, `components/`, `hooks/`, `types/`, `scripts/`, `.claude/`,
`emails/`, not in `proxy.ts`, `drizzle.config.ts` or `next.config.ts`, and not in
`.github/workflows/*.yml`.

| Variable | Evidence |
|---|---|
| `CLOUDINARY_API_KEY` | no reader — service removed 2026-09-06 |
| `CLOUDINARY_API_SECRET` | no reader — service removed 2026-09-06 |
| `CLOUDINARY_CLOUD_NAME` | no reader — service removed 2026-09-06 |
| `NEXT_PUBLIC_STACK_PROJECT_ID` | no reader — Stack Auth was never imported |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | no reader — Stack Auth was never imported |
| `STACK_SECRET_SERVER_KEY` | no reader — Stack Auth was never imported |
| `DATABASE_URL_UNPOOLED` | no reader |
| `NEON_PROJECT_ID` | no reader — **and actively misleading, see below** |
| `NEWSLETTER_ADMIN_EMAIL` | no reader |
| `KV_REST_API_READ_ONLY_TOKEN` | no reader — **but injected; do not delete** |
| `KV_URL` | no reader — **but injected; do not delete** |
| `REDIS_URL` | no reader — **but injected; do not delete** |
| `PGDATABASE` | no reader |
| `PGHOST` | no reader |
| `PGHOST_UNPOOLED` | no reader |
| `PGPASSWORD` | no reader |
| `PGUSER` | no reader |
| `POSTGRES_DATABASE` | no reader |
| `POSTGRES_HOST` | no reader |
| `POSTGRES_PASSWORD` | no reader |
| `POSTGRES_PRISMA_URL` | no reader |
| `POSTGRES_URL_NON_POOLING` | no reader |
| `POSTGRES_URL_NO_SSL` | no reader |
| `POSTGRES_USER` | no reader |

**All 24 are still sitting in the local `.env` and `.env.local`. None of them is
on Vercel** — they were removed there on 2026-09-06, which is most of the drop
from 66 production variables that morning to 45 today. So "delete" here means
delete from the two local files and from `.env.example`, not from Vercel.

**Three of them must not be deleted anyway.** `KV_REST_API_READ_ONLY_TOKEN`,
`KV_URL` and `REDIS_URL` are readerless *and* marketplace-injected. Removing them
by hand desynchronises the Vercel↔Upstash integration, and the resulting
divergence shows up at the next resource sync rather than at the moment of the
edit — which makes it one of the hardest classes of failure to attribute. The
census says they are dead; the integration says they are not yours. **The
integration wins.**

**`NEON_PROJECT_ID` is worse than dead: it is a false statement.** It still holds
the *old* Neon project id while the connection string on the line beside it
points at the *new* project. Read the two lines together and they say the live
endpoint belongs to the project that is scheduled for deletion on 2026-09-20 —
i.e. that the site is about to die. It took a call to the Neon API to disprove
that, during this handover. Two dead variables next to a live one are not a
cosmetic problem. **This is the strongest argument in this document for actually
doing the deletion**, rather than leaving 24 harmless-looking lines for the next
person to reason from.

---

## 5. Where each variable must be set

Three places, and they do not overlap the way anyone expects.

| Place | Count on 2026-09-10 | Command that produced it |
|---|---|---|
| **Vercel production** | **45** | `npx vercel env ls production` |
| **GitHub Actions repository secrets** | **2** | `gh secret list` |
| local `.env` | 55 | names only, from the file |
| local `.env.local` | 55 | names only, from the file |
| `.env.example` | 50 uncommented, 16 commented | names only, from the file |
| names with a reader | 79 | the reader census in §4's preamble |
| **union of all of them** | **99** | — |

The two Actions secrets are `VERCEL_TOKEN` (created 2026-03-29) and
`SLACK_BOT_TOKEN` (2026-08-31). There are **zero** Actions *variables*.
`VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are literals in `deploy.yml`, so anyone
looking for them in the secrets list will not find them and may conclude the
deploy is broken.

Ten variables are on Vercel and in **neither** local file: `CRON_SECRET`,
`EMAIL_UNSUBSCRIBE_SECRET`, `RESEND_WEBHOOK_SECRET`, `GITHUB_BOT_TOKEN`,
`GITHUB_REPO`, `GITHUB_REPO_DEFAULT_BRANCH`, `SLACK_SIGNING_SECRET`,
`SLACK_ALLOWED_USER_IDS`, `SLACK_MENTORSHIP_STATS_WEBHOOK_URL` and
`DONATION_ADMIN_EMAIL`. Two consequences you will hit within a day of starting:
a locally built newsletter send **refuses** without `EMAIL_UNSUBSCRIBE_SECRET`,
and no cron or approve endpoint can be exercised locally without `CRON_SECRET`.

Thirteen more differ between the two local files. `.env.local` alone has
`BLOB_READ_WRITE_TOKEN` and the five `KV_*` / `REDIS_URL` values; `.env` alone
has `HUMANITIX_API_KEY`, all four `MAILCHIMP_*`, `SLACK_USER_TOKEN` and
`SLACK_EVENT_FEEDBACK_WEBHOOK_URL`. **Scripts read `.env` only** — `import
"dotenv/config"` does not load `.env.local` — while the Next.js dev server reads
both. That single asymmetry is why every Blob-touching script has been running
blind while `pnpm dev` worked, and why the dev server has never seen the
Humanitix or Mailchimp keys. The fix is to ship **one** file and install it as
both.

### Three traps for whoever re-runs this census

The first two produce a confident, wrong, and *actionable* answer — a list of
things to delete. The third produces a confident, wrong answer about whether a
credential was ever rotated.

1. **Stripe is invisible to `grep`.** `lib/stripe/config.ts` builds the real
   variable names at runtime: `getStripeEnv()` does
   `name.replace('STRIPE_', isTestMode ? 'STRIPE_TEST_' : 'STRIPE_LIVE_')`. A
   plain `grep process.env` sees only `STRIPE_SECRET_KEY`,
   `STRIPE_WEBHOOK_SECRET` and `STRIPE_ANNUAL_PRICE_ID`, none of which is set
   anywhere, and reports the eight `STRIPE_TEST_*` / `STRIPE_LIVE_*` variables
   that *are* set as having no reader — i.e. as deletable. That is the live
   payment configuration.
2. **GitHub Actions read their secrets from YAML, not TypeScript.** A census that
   scans only code reports `VERCEL_TOKEN` as having no reader. It is the only
   credential that can deploy this site. This actually happened while preparing
   this handover, and was caught only because a positive control was run.
3. **The `created` column in `vercel env ls` is not "last changed".** It survives
   an update, so a variable rewritten this morning can still report `170d ago`.
   Read that column as "when this name first appeared", never as evidence about
   the value. Proved on 2026-09-10 without touching a single value:
   `POSTGRES_URL` reports `170d ago`, yet its value points at
   `she-sharp-production`, a Neon project that **did not exist until 2026-09-05**.
   The variable must therefore have been rewritten on or after that date while
   keeping its original timestamp. That also settles the question the same column
   raises about `AUTH_SECRET` and `NEXTAUTH_SECRET`, which report `170d ago`
   while `MAINTAINER_HANDOVER.md` §12 says both were rotated on 2026-09-06: the
   dates are not in conflict with the rotation, because the dates cannot speak to
   it either way.

The habit that catches all three: **before trusting a result, prove the check can
produce a different one.** Feed it something you know it should catch. On
2026-09-06 four separate checks in one session returned a clean answer from the
wrong surface, and three of the four were caught only by a positive control.

---

## 6. Rotation, in dependency order

Rotate in this order. It is a dependency order, not a priority order: several
of these are the login for the ones below them, and doing them out of order locks
you out of the console you need for the next step.

A `confirm-first` row **keeps its place in this queue and simply does not start**
until the ownership question behind it is answered. Skipping past a block is not
the same as clearing it.

1. **The `website@shesharp.org.nz` Google account password.** First, not third.
   It is the login for **Resend, Neon, OpenAI and Google Cloud**, and it reaches
   the mailbox and the legacy Webflow back end. Rotating anything below it before
   this one means doing the work twice.
2. **Resend API key.** `full_access`, not `sending_access` — the lesser scope
   fails list operations silently. Reachable only once step 1 is done.
3. **`VERCEL_TOKEN`.** Then **verify with `gh workflow run deploy.yml` before
   going any further.** This is the only credential that can deploy the site; if
   it is wrong, every subsequent change in this list becomes unshippable, and you
   will not find out until the next deploy fails for an unrelated-looking reason.
   Rotating it also closes the "whose token is it" question in §8 for free.
4. **Vercel account access** — team membership, and the departing maintainer's
   seat.
5. **Stripe.** Console only; there is no CLI or API path. **Change the key in the
   Stripe dashboard and in Vercel in one sitting.** A live key rotated in the
   dashboard but not in Vercel does not produce an error page — donation
   webhooks fail signature verification and the events are dropped silently, and
   the first symptom is a donation that never appears in the database.
   *Currently `confirm-first`; see [23].*
6. **`GITHUB_BOT_TOKEN`.** A fine-grained PAT belongs to a person; revoke the
   departing maintainer's and mint a new one against whoever takes the `/event`
   bot.
7. **`CRON_SECRET`.** Then **redeploy, and confirm a cron actually fired.** All
   three crons and the newsletter approve endpoint return a silent 401 on a
   mismatch. Nobody is paged. The only symptom is a Slack channel that quietly
   stops posting, and the gap between the rotation and the first missed post can
   be six days.
8. **Slack bot token and signing secret.** `SLACK_BOT_TOKEN` lives in **two
   places** — Vercel production *and* the repository's Actions secrets. Changing
   only the first leaves `slack-triage.yml` broken in a way nothing reports.
   *Currently `confirm-first`.*
9. **OAuth client secrets** — `GITHUB_CLIENT_SECRET`, then
   `GOOGLE_CLIENT_SECRET`. **Last, and not during an event.** A wrong value takes
   sign-in down for everybody simultaneously, and the only person who sees the
   failure is somebody trying to sign in.

### What must **not** be rotated

**`AUTH_SECRET` and `NEXTAUTH_SECRET`.** They were rotated on 2026-09-06 because
the previous value was found in this repository's git history, and that was the
right call then. Rotating them again now signs **every user out** and invalidates
**outstanding mentee payment links**, which `AUTH_SECRET` has also signed since
that date. Neither of those is a security gain; the exposed value is already
dead.

This is worth naming as a habit rather than a rule about two variables. **A
"rotate everything" sweep is exactly the instinct that gets this wrong.** A
sweep treats every credential as equivalent, and these two are not: the cost of
rotating them is borne by users, not by the maintainer, and it is invisible from
the console where the rotation happens. Rotate what a departure actually
exposes, in the order above, and leave the rest alone.

---

## 7. Break-glass

For each account: **if nobody can log in, what then.** Several of these answers
are "unknown", and each unknown is written as an open item rather than as a
recovery path somebody might rely on in an emergency. **Do not fill these in by
inference.** An invented recovery path is worse than a blank one, because it will
be believed at the worst possible moment.

| Account | If nobody can log in |
|---|---|
| **GitHub org `NZ-SheSharp`** | The org has exactly two owners: the departing maintainer and the shared `SheSharpNZ` account. Neither incoming maintainer is an owner. Once the departing account goes, **every org-level action requires the `SheSharpNZ` credentials** — which are the same credentials that reach the mailbox, the Webflow back end and Resend. Who holds `SheSharpNZ`'s password and 2FA is **unknown**. This is the most serious single gap in this document. |
| **Google Workspace `website@`** | **Unknown.** `admin.google.com` is on the founder's account only; `website@` cannot administer itself. So recovery runs through the founder, and whether the founder's own recovery is intact has never been checked. Everything in the row below inherits this. |
| **Vercel** | Recovery is the `shesharpnz` login's recovery, which is a Google account — so this reduces to the row above. Whether a second person can be given a team seat is **unknown**; the API-token list is unreadable from a workstation (403 on every REST endpoint, including `/v2/user`) and can only be seen in the console. |
| **Neon** | Reduces to `website@`. The two per-person roles created 2026-09-10 keep data access alive independently of the console login, but they **cannot run a migration** and cannot create further roles. So a lost console login means the schema freezes while the site keeps working — a slow failure, not a loud one. |
| **Resend** | Reduces to `website@`. The domain was moved onto this team by Domain Claim on 2026-08-28; losing the login does not lose the domain, but it does lose the ability to issue a key. |
| **OpenAI** | Reduces to `website@`. |
| **Google Cloud** | Reduces to `website@`. Losing it means the OAuth clients cannot be edited, and Google sign-in cannot be repaired. |
| **Stripe** | **Unknown.** The login has never been recorded, and the CLI on the outgoing maintainer's workstation points at a different, personal account. This is the account that holds live payments. |
| **Slack** | The workspace's only owner is the founder. The four apps survive a person leaving, but the tokens' **scopes** were granted by one named human, and re-granting them needs app-management access. Who holds that is **unknown**. |
| **Humanitix** | A shared `events@shesharp.org.nz` login. Who else knows the password, and where its recovery address points, are both **unknown**. |
| **Mailchimp** | **Unknown.** The card on the account is the founder's. The account is to be paused or downgraded, never deleted. |
| **Upstash** | No login of its own — it is reached through the Vercel team, so it reduces to the Vercel row. |
| **Domain registrar** | **Unknown, and never recorded anywhere in this repository.** `MAINTAINER_HANDOVER.md` §3 says only "Transferred 2026-06-18 — confirm the registrar login is org-held", which means it was never confirmed. Losing this loses the site and DKIM/DMARC alignment for every email. It is a bigger exposure than any single API key in this file. |
| **Cloudflare (DNS)** | **Unknown, and never recorded anywhere in this repository.** Whoever holds it can redirect both the website and the mail. Same risk class as the registrar. Do not delete the `TXT _gh-NZ-SheSharp-o` record — it is GitHub's domain verification. |

---

## 8. Open, and deliberately unresolved

Left visible rather than tidied away. A list that shows its holes is more useful
than one that fills them by assumption.

- **`VERCEL_TOKEN`'s owner.** Unverifiable from a workstation: Vercel's `vca_`
  OAuth token returns 403 for every REST endpoint, `/v2/user` included. It must
  be checked in the console — or, more cheaply, made moot by rotating it (§6
  step 3).
- **The domain registrar for `shesharp.org.nz`.** Never recorded anywhere in this
  repository.
- **The Cloudflare account holding DNS.** Never recorded anywhere in this
  repository.
- **`aihackathon-2026`** — a live She Sharp deployment on the same Vercel team,
  serving `hackathon.shesharp.org.nz`, created 2026-07-02 and updated within the
  last week. **No document mentions it and its source repository is in neither
  `NZ-SheSharp` nor the departing maintainer's account.** It is a production
  service with no known owner, no known code, and no entry in this inventory
  beyond this line.
- **Two GitHub secret-scanning alerts on Google OAuth client secrets** that match
  no account anyone here can reach. Left open on purpose: *"no account I can see
  holds it"* is not *"no account holds it"*.
- **The 2020-vintage Mailchimp API key** that never expires and has never been
  revoked. It was kept alive to work out whether the now-disconnected Humanitix
  integration used it; that question was never closed and somebody needs to close
  it.
- **A `sk_live_` Stripe key on three stale remote branches** of a now-public
  repository. It belongs to the departing maintainer's *other* Stripe account and
  is theirs to roll. **Deleting the branches is not remediation** — orphaned
  commits stay fetchable by SHA through GitHub's API until Support purges them.
- **Whether Resend, OpenAI and Humanitix can issue a second key per person.**
  Three unanswered boxes on the ownership worksheet, and the difference between
  `shared` and `shared-by-plan-limit` on three rows of §3. Until they are
  answered, "one key each" is an aspiration, not a plan.
- **`STRIPE_LIVE_PUBLISHABLE_KEY` and `STRIPE_TEST_PUBLISHABLE_KEY` have no
  reader** anywhere in this repository, but are set in every environment. Almost
  certainly retirable; blocked behind the same Stripe ownership question as every
  other Stripe row.
