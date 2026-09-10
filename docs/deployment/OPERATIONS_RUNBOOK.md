# Operations runbook

For whoever is holding the pager. **Symptom first, answer first, explanation
after.** Every section starts with what you would type.

Written **2026-09-10** against facts measured that day. It is the operational
half of [`MAINTAINER_HANDOVER.md`](./MAINTAINER_HANDOVER.md): that file records
what stops working silently when the maintainer leaves, and stops at the
diagnosis. This one says what to do about it.

> **This file carries no credential values and must not gain any.** The
> repository is public and secret-scanning push protection will reject a pull
> request that adds one — including a plausible-looking fake. Names of variables
> only, never values.

**Where this file and an older document disagree, prefer this one**, and check
the date. Counts and figures here were measured on 2026-09-10 and each says so.

---

## 1. The site is down

Work down the list. Stop at the first thing that is wrong.

### 1.1 Is it actually down?

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://www.shesharp.org.nz/
```

- **503** → maintenance mode is on. Go to §1.3.
- **500 / 504** → the app is running and failing. Go to §1.4.
- **Connection refused, DNS failure, certificate error** → not the app. DNS is
  on **Cloudflare** and the Vercel team has **zero registered domains**
  (measured 2026-09-10). Nobody in this repository is recorded as holding the
  Cloudflare account — see §5 and §8.
- **200** → the site is up. Somebody is looking at a cached page, a single
  route, or a different host. Ask which URL.

### 1.2 Did the last deploy fail?

```bash
gh run list --workflow deploy.yml --limit 5
gh run view <run-id> --log-failed
```

`deploy.yml` is **the only deploy path**. `vercel deploy --prod` from a
workstation returns `Not authorized`, and the Vercel dashboard's **Redeploy
button is not a rollback** — it reuses the previous build's environment, and
there is no Vercel Git connection, so it also reuses the previous build's code
resolution. A dashboard redeploy can bring the site back up pointing at whatever
the last build was pointing at, which during the 2026-09-06 database migration
would have meant the old database.

One failure mode is upstream and not yours: `next/font/google` fetches from
Google at build time and Google occasionally serves a stylesheet naming `.woff2`
files it has already deleted. The build dies on `Module not found: Can't resolve
'@vercel/turbopack-next/internal/font/google/font'`. `deploy.yml` already retries
that specific signature three times with 60 seconds between attempts (added after
the 2026-08-13 failure, run 31741566251). If all three attempts fail, wait and
re-run — nothing in this repository caused it.

### 1.3 Is `MAINTENANCE_MODE` on?

```bash
npx vercel env ls production | grep MAINTENANCE_MODE
```

`MAINTENANCE_MODE=true` serves a branded 503 for the whole site including `/api`
and `/f/*`. It is set only by hand and it is in neither `.env.example` nor
normally in Vercel, so a hit here means somebody turned it on and did not turn it
off. Full runbook: [`MAINTENANCE_MODE.md`](./MAINTENANCE_MODE.md).

To clear it:

```bash
npx vercel env rm MAINTENANCE_MODE production -y
gh workflow run deploy.yml          # the env change does NOT reach production on its own
```

Environment variables bind at **build time**. Removing the variable changes
nothing until a new build runs. `workflow_dispatch` was added to `deploy.yml` on
2026-09-06 for exactly this, so you no longer have to invent a commit.

### 1.4 Is the database reachable?

The whole dashboard, every form, donations and the subscriber list are one Neon
project. As at 2026-09-10:

| | |
|---|---|
| Neon organisation | "She Sharp" `org-dark-moon-42071634`, native, under `website@shesharp.org.nz` |
| Project | `she-sharp-production` `lively-night-18220962`, created 2026-09-05 |
| Branch | `production` `br-polished-mouse-a7qv5lmx`, default, **not protected** |
| Endpoint | `ep-red-butterfly-a7yzv7n7`, `aws-ap-southeast-2`, PostgreSQL **17.11** |
| Size | 40.5 MB, 41 tables, 6,599 rows |

**`neonctl` hangs** on interactive organisation selection. Use the REST API at
`https://console.neon.tech/api/v2` with the access token from
`~/.config/neonctl/credentials.json`, or the Neon console in a browser.

Two traps when you go looking:

- **The local `.env` holds `NEON_PROJECT_ID` pointing at the *retired* project**
  (`red-silence-55665683`) directly beside a `PGHOST` pointing at the live one.
  Reading those two lines together says the site is about to die. It is wrong;
  the variable is dead and unread by anything. See §8.
- **`pg_stat_activity` through the Neon pooler cannot see another client's
  session.** Any "no sessions, so nothing is using this database" reading is
  meaningless on the pooled endpoint. Use the direct (unpooled) endpoint, or
  watch `pg_stat_database.xact_commit` instead. See §9.

### 1.5 Rolling back

There is no button. A rollback is a deploy of an earlier commit.

```bash
gh workflow run deploy.yml --ref <branch-or-tag-at-the-good-commit>
```

`deploy.yml` builds from whatever ref it is dispatched against and uploads with
`vercel deploy --prebuilt --prod`, so dispatching it against a branch pointing at
the last good commit *is* the rollback. If the bad change is already on `main`,
open a revert pull request — **you cannot push to `main`**; the ruleset has zero
bypass actors and rejects everyone, org owners included. It also requires **zero
approving reviews**, so one person can open and merge their own revert as soon as
`verify` is green.

If the breakage is an environment variable rather than code, fix the variable
with `--value` (never stdin — see
[`VERCEL_ENV_VARIABLES_GUIDE.md`](./VERCEL_ENV_VARIABLES_GUIDE.md)) and dispatch
`deploy.yml` without any commit at all.

---

## 2. A weekly digest did not arrive

**There is no alert. The only signal is an absence, in a channel nobody owns.**
That is the whole problem, and §2.4 proposes the cheapest thing that fixes it.

### 2.1 What is scheduled

Three Vercel crons, defined in `vercel.json`, all authenticated with
`Authorization: Bearer ${CRON_SECRET}`:

| Path | Cron (UTC) | NZ local | Posts to | `maxDuration` |
|---|---|---|---|---|
| `/api/cron/weekly-mentorship-stats` | `0 20 * * 0` | Mon 09:00 NZDT / 08:00 NZST | `#mentorships` | 60 s |
| `/api/cron/weekly-funding-crawl` | `0 21 * * 0` | Mon 10:00 NZDT / 09:00 NZST | `#funding-opportunities` | **300 s** |
| `/api/cron/event-feedback-digest` | `0 21 * * *` | daily 10:00 NZDT / 09:00 NZST | `#event-feedback-notifications` | 60 s |

Also on a schedule, but in GitHub Actions rather than Vercel:
`slack-triage.yml`, `0 19 * * 0-4` UTC — weekday mornings NZ — which edits one
standing GitHub issue rather than posting to Slack. See §6.

### 2.2 First checks

```bash
# Did the function run at all, and what did it say?
vercel logs --search "requestPath:/api/cron/weekly-funding-crawl" --since 7d --no-follow --no-branch --expand

# Is the webhook variable still set?
npx vercel env ls production | grep -E 'SLACK_(MENTORSHIP_STATS|FUNDING|EVENT_FEEDBACK|CONTACT)_WEBHOOK_URL'
```

Each route logs `[cron] <name> invoked` on entry, so a missing log line means the
schedule did not fire and a present one with no Slack post means the send failed.

**Some of the webhooks fall back rather than failing.** `sendEventFeedbackDigest`
falls back to `SLACK_CONTACT_WEBHOOK_URL` when
`SLACK_EVENT_FEEDBACK_WEBHOOK_URL` is unset, and so do the donation and
newsletter posts. A "missing" digest may simply be sitting in the contact
channel — a fallback that works is exactly the shape of a fault nobody notices.

Checked on 2026-09-10: **`SLACK_EVENT_FEEDBACK_WEBHOOK_URL` is set on Vercel
production** (added 38 days earlier), so the feedback digest posts to its own
channel and a missing one is a real failure, not a redirection. The two that
genuinely are unset in production are `SLACK_DONATION_WEBHOOK_URL` and
`SLACK_NEWSLETTER_WEBHOOK_URL`: donation alerts and the "issue approved" post
both land in the contact channel today, by design rather than by accident.

### 2.3 The two causes that have already happened, and will again

1. **Neon's connection-burst limit.** Several small queries issued in parallel
   from a serverless handler throw `Failed to acquire permit`. Serial `await`s
   are the fix; do not "optimise" a cron route with `Promise.all`.
2. **The 60-second default `maxDuration`.** The funding crawl timed out on it on
   2026-05-24 (first seen 2026-05-18) because six source fetches plus sequential
   OpenAI scoring plus database writes do not fit. It is explicitly set to
   `300` — the Pro-plan ceiling — for that reason. **The other three routes are
   still on the 60-second default.** If one of them grows an external call, it
   inherits this failure.

### 2.4 Turning an absence into a presence

The three crons post on success and say nothing on failure. Nobody is paged, and
nobody owns the channels. `MAINTAINER_HANDOVER.md` §4 diagnoses this and stops
there. Here is a fix that costs nothing and needs no new infrastructure:

> **Set a standing Slack reminder in each channel, timed 30 minutes after the
> cron, that says: "The weekly digest should be above this message. If it is
> not, the cron is dead — see `docs/deployment/OPERATIONS_RUNBOOK.md` §2."**

```
/remind #mentorships "The weekly mentorship digest should be above this message. If it is not, the cron is dead — see docs/deployment/OPERATIONS_RUNBOOK.md §2." every Monday at 9:30am
```

The same for `#funding-opportunities` at 10:30 on Mondays. It inverts the signal:
a working cron produces two messages, a dead one produces a message that makes
its own absence obvious to whoever is in the channel. A human reading a reminder
is a worse monitor than a real alert and a very much better one than nothing,
and it can be set up in two minutes by anyone in the workspace.

**Owner: the named website maintainer** — one person, per
`MAINTAINER_HANDOVER.md` §1.1, not "the website team". Access is shared between
Tharanee and Lesley; **this obligation gets exactly one of their names against
it**, recorded here when it is assigned:

| Obligation | Owner |
|---|---|
| Set the two standing reminders | *unassigned as at 2026-09-10* |
| Answer a "the digest did not arrive" report | *unassigned as at 2026-09-10* |

An unassigned obligation is an unmet one. Fill these in.

### 2.5 Open question: is the mentee queue meant to be running?

**`app/api/cron/process-queue/route.ts` exists, is complete, checks
`CRON_SECRET`, expires stale queue entries and runs `processWaitingQueue()` — and
it is not in `vercel.json`.** Its own docblock proposes a schedule
(`"0 6 * * *"`, daily 06:00 UTC) as though it were configured. It is not, and it
has no `maxDuration` export either, so if it were added it would start on the
60-second default that §2.3 says is the recurring cause of cron failure here.

Nobody has recorded whether the mentee waiting queue is supposed to be processed
automatically. Mentorship applications have been paused since 2026-06-19, so
nothing is queueing right now and the question is not urgent — but it must be
answered before applications reopen, because the code reads as if it were live.

**Decide one of three, and write the decision down:** wire it into `vercel.json`
(with `maxDuration = 300`); delete the route; or leave it and change the docblock
so it says it is a manual endpoint. Do not leave it as it is.

---

## 3. Bounces stopped being recorded

**Symptom:** nobody has seen a bounce or a spam complaint in a while, or
suppression counts have stopped moving.

`/api/webhooks/resend` is the **only** record of bounces and spam complaints in
this system. Before it existed they lived in the Resend dashboard until somebody
thought to look. It writes to `email_optouts`, which `sendEmail()` consults on
every notification-class send, and to `email_events`, which is what
`scripts/email/send-stats.ts` measures the complaint rate against.

**Why the complaint rate matters more than it looks:** Resend's account-wide
complaint ceiling is **0.08%** — about 1.25 complaints on a full 1,545-recipient
send — and breaching it can take password resets and donation receipts down
along with the newsletter.

**The silent failure:** `RESEND_WEBHOOK_SECRET` exists in two places, the Resend
dashboard endpoint and Vercel production. Rotate it in one and not the other and
every delivery event fails signature verification. Nothing anywhere says so.
Bounces simply stop being recorded, suppression stops growing, and the first
symptom is a deliverability problem months later.

```bash
# Is the variable present in production at all?
npx vercel env ls production | grep RESEND_WEBHOOK_SECRET

# Are events still arriving? A recent row is the only proof.
npx tsx scripts/email/suppression.ts reconcile
```

**Rotate it in both places in the same sitting, and prove it afterwards** by
sending one test message and confirming a row lands. See §9: a webhook that has
stopped delivering and a webhook with nothing to deliver look identical.

---

## 4. Backup and disaster recovery

**This is the largest gap in the whole handover, and this section is deliberately
blunt about it.**

### 4.1 What is true today

**Before 2026-09-10 this project had no backup at all.** The only recovery
mechanism was Neon's history retention, which on the current plan is **six
hours**. That is the entire point-in-time-restore window. A bad migration
noticed on Monday morning that ran on Sunday night is not recoverable.

The first backup was taken on **2026-09-10**:

| | |
|---|---|
| Command | `pg_dump --no-owner --no-acl -Fc` |
| Size | 1,596,929 bytes |
| SHA-256 | `83e21c95da3374350f3fba1ec9d0a81a7e52da83bfdae9ba6ccb0e876dbf6e90` |
| Contents | 41 TABLE, 41 TABLE DATA, 33 TYPE, 55 FK CONSTRAINT entries |

It holds **every mentor, mentee, donation, feedback response and newsletter
subscriber record the organisation has.** Treat it as the most sensitive object
in the inventory.

### 4.2 Taking one

```bash
# PostgreSQL client tools are at D:\pgsql\bin (17.6 against a 17.11 server — same
# major, which is what matters). Use the UNPOOLED connection string.
pg_dump "$POSTGRES_URL_NON_POOLING" --no-owner --no-acl -Fc -f she-sharp-$(date +%F).dump
sha256sum she-sharp-$(date +%F).dump
```

Record the size and the SHA-256 next to the file. A dump you cannot fingerprint
is a dump you cannot prove was not truncated.

### 4.3 Where it must not go

- **Not Vercel Blob.** That store is public per object and immutable for a year.
  A public Blob URL is readable by anyone holding it; `addRandomSuffix` makes a
  path unguessable and **that is not access control**.
- **Not this repository.** It is public. Push protection would probably not even
  catch a `.dump` file, because a compressed archive is not credential-shaped.
- **Not a personal account.** Moving the database off one was the single largest
  piece of work in this handover (`MAINTAINER_HANDOVER.md` §10). Putting its
  backup on a personal Drive undoes that.

### 4.4 The policy this document proposes

Nothing below is in force. It is a proposal, and it needs one decision from the
organisation — the destination — before any of it is real.

| | Proposed |
|---|---|
| Frequency | Monthly, on the first working day |
| Command | `pg_dump --no-owner --no-acl -Fc`, fingerprinted with SHA-256 |
| Destination | **UNDECIDED — see below** |
| Retention | 12 rolling monthly dumps, plus one kept at each financial year end |
| Owner | **unassigned as at 2026-09-10** |
| Restore drill | Once, within 60 days of the destination being chosen, then annually |

**The destination is the open decision, and this document will not invent one.**
The requirement is a storage location that is (a) owned by the organisation and
not by a person, (b) access-controlled rather than public, and (c) survives any
one maintainer leaving. The Google Workspace under `website@shesharp.org.nz`
would satisfy all three, but that account also reaches the mailbox, the legacy
Webflow back end and Resend — one credential, four systems, one of which would
then include every subscriber record. That is a decision for the committee, not
for a developer, and **until it is taken there is no monthly backup and this row
stays empty.** Saying so is more useful than naming a plausible folder nobody has
agreed to.

**The restore drill is not optional and is not paperwork.** A backup nobody has
restored is a backup nobody has. Restore into a scratch Neon branch, run the same
census used to verify the 2026-09-06 migration — exact `count(*)` per table and
`last_value` per sequence — and compare. As at 2026-09-10 the live figures to
compare against are 41 tables, 37 sequences, 33 enums, 153 indexes, 121
constraints, 6,599 rows, with `email_events` 3,183, `newsletter_subscribers`
1,560, `funding_opportunities` 1,168, `activity_logs` 277 and `users` 43. A short
row count is a failed restore, not a rounding difference.

### 4.5 What a restore cannot bring back

Vercel Blob objects — profile photos, CVs, the impact-report PDFs and event
videos — are **not** in the database dump. The database holds their URLs. A dump
restored into an empty Blob store gives you 41 tables of links to nothing. If the
Blob store is ever part of a disaster scenario, that is a separate backup nobody
has taken either.

---

## 5. Cost and billing

**The honest summary: the repository records what several of these cost and
almost never records who pays.** Every "who holds the card" answer below that is
not written down somewhere in this repository is marked **UNCONFIRMED**, and that
is most of them. Do not resolve an UNCONFIRMED row by guessing; resolve it by
opening the billing page.

| Service | What it costs, if recorded | Who holds the card |
|---|---|---|
| **Vercel** | Pro plan. Team `she-sharp1`, projects `she-sharp` and `aihackathon-2026`. Amount not recorded in this repository | Account `shesharpnz`. Cardholder **UNCONFIRMED** |
| **Neon (PostgreSQL)** | **Free** plan. Native org "She Sharp", 40.5 MB used. The Free plan is why history retention is 6 hours (§4) | `website@shesharp.org.nz`. No card on a Free plan |
| **Upstash Redis / KV** | Free tier, provisioned through the Vercel marketplace as `upstash-kv-cerise-leaf`. Used only for chatbot rate limiting | Billed through the Vercel team if it ever leaves the free tier. **UNCONFIRMED** |
| **Vercel Blob** | Storage and egress, billed through the same Vercel team. Amount not recorded | Same as Vercel. **UNCONFIRMED** |
| **Resend** | **Transactional Pro, US$20/month** — decided 2026-08-28, re-affirmed 2026-08-30 against a "we could save $20" proposal. Marketing Pro (a further $40/month) was deliberately **not** bought; the newsletter is self-hosted instead | Signed in via `website@shesharp.org.nz`. Cardholder **UNCONFIRMED** |
| **Stripe** | Per-transaction fees only, no subscription. Rates not recorded in this repository | She Sharp's own account. Cardholder n/a; payout account **UNCONFIRMED** |
| **Mailchimp** | **Still on a paid monthly plan and still live** as at 2026-09-02, despite being archive-only since that date. Amount not recorded | **The founder is the cardholder** — the one row here that is confirmed. → [`MAILCHIMP_CANCELLATION.md`](./MAILCHIMP_CANCELLATION.md) |
| **Humanitix** | Free on the NZ charity rate | `events@shesharp.org.nz`. No card recorded |
| **OpenAI** | Usage-based: the visitor chatbot, mentor matching, the funding crawl's scoring. Spend not recorded anywhere | `website@shesharp.org.nz`, organisation-owned, verified 2026-09-05. Payment method **UNCONFIRMED** |
| **Google Workspace** | Not recorded. Likely a nonprofit tier; not verified | **UNCONFIRMED** |
| **Domain `shesharp.org.nz`** | Not recorded | **Registrar never recorded anywhere in this repository.** Transferred 2026-06-18. This is an open item, not a gap in this table |
| **Cloudflare (DNS)** | Not recorded; likely free tier | **Account never recorded anywhere in this repository.** The Vercel team has zero registered domains, so Cloudflare is load-bearing for the site being reachable at all |
| **GitHub** | Org `NZ-SheSharp` on the **Free** plan. Since 2026-09-06 this repository is public, so its **Actions minutes are free and unmetered** | Org. GitHub for Nonprofits submitted 2026-09-01, status *Applied* |

**Mailchimp and the domain registrar are the two rows worth acting on.** The
first is money leaving an account every month for a service explicitly recorded
as archive-only. The second is the thing that, if it lapses, takes the website,
every `@shesharp.org.nz` mailbox and DKIM alignment for every email with it — and
nobody here knows where it is renewed.

[`GITHUB_ACTIONS_AND_ACCOUNT.md`](./GITHUB_ACTIONS_AND_ACCOUNT.md) contains a
detailed Actions cost analysis. **Its premise was superseded on 2026-09-06**: the
repository went public, minutes became free and unmetered, and the cost argument
no longer applies. Read it as history — the per-job billing measurements are
still the reason `verify.yml` is a single job, and that shape is kept for speed
and consistency now rather than for money. The billing rules there still apply to
any *other* private repository on the org.

---

## 6. Slack

### 6.1 The workspace, and the problem with it

The She Sharp workspace is where every bot posts and where the event-planning
channels live. **The founder is the sole workspace owner.** That is not a
convenience issue: `my.slack.com/nonprofit` is owner-only, which is why the Slack
for Nonprofits application prepared on 2026-09-01 was never submitted, and it
means no maintainer can install an app, change a scope, or delete a webhook
message without going through one person. `MAINTAINER_HANDOVER.md` §7 records
this as an open loop and it is still open.

**Add at least one more workspace owner.** It is a two-minute change that only
the founder can make, and it unblocks a category of work rather than one task.

### 6.2 The seven apps

**Seven, not the four this section listed until 2026-09-10.** Read from
<https://api.slack.com/apps> for the `She#` workspace (`T06Q96RGA`). The old
list was assembled from the variables rather than from the console, which is why
it merged several apps and invented a donation app that does not exist.

| App | ID | What it does | Reaches Slack via |
|---|---|---|---|
| `contact-form-notifications` | `A0AGNRP35D3` | Contact-form alerts, and the fallback destination for four other kinds | `SLACK_CONTACT_WEBHOOK_URL` |
| `ambassador-volunteer-application` | `A0ADYECRLCE` | Volunteer and ambassador submissions | `SLACK_VOLUNTEER_WEBHOOK_URL` |
| `event-feedback-notifications` | `A0BM5AQ09RV` | Post-event attendee feedback from `/f/<code>` | `SLACK_EVENT_FEEDBACK_WEBHOOK_URL` |
| `funding-digest` | `A0B2UFKQQLA` | The Monday funding digest | `SLACK_FUNDING_WEBHOOK_URL` → `#funding-opportunities` |
| `mentorship-weekly-stats` | `A0AVAH24SJG` | The Monday pipeline digest | `SLACK_MENTORSHIP_STATS_WEBHOOK_URL` → `#mentorships` |
| **She Sharp Event Collector** | `A0AJB2DTKNU` | Read-only. The bot behind `sync-event-from-slack` and `slack-triage.yml`, and the app a maintainer installs to get her own user token | `SLACK_BOT_TOKEN` *locally*, and the Actions secret |
| **She Sharp Event Bot** | `A0AU1CWP9DY` | The `/event` slash command: describes a change in plain English, previews a patch in Block Kit, opens a pull request | `SLACK_BOT_TOKEN` *in production* + `SLACK_SIGNING_SECRET` |

**There is no donation app.** `SLACK_DONATION_WEBHOOK_URL` is unset in
production and donation alerts fall back to the contact webhook — by design, not
by accident. `SLACK_NEWSLETTER_WEBHOOK_URL` is the same (§2.2).

Both incoming maintainers were added as collaborators on all seven on
2026-09-10, so app management is no longer one person's.

The `/event` bot's `GITHUB_BOT_TOKEN` is a fine-grained PAT **issued against a
person**, not the organisation. When that person leaves it must be reissued or
the bot stops opening pull requests.

**A webhook message cannot be deleted by the bot token that shares its app.**
Incoming-webhook messages and bot messages are different entities in Slack;
deleting a webhook post needs a user token from a workspace owner or admin. Plan
for that before you post something wrong to 1,500 people's channel.

### 6.3 `SLACK_BOT_TOKEN` lives in two places

- **Vercel production** — for the `/event` slash command.
- **GitHub Actions repository secret** — for `slack-triage.yml`.

There are only **two** Actions repository secrets: `VERCEL_TOKEN` and
`SLACK_BOT_TOKEN` (measured 2026-09-10). **Rotate the Slack bot token in both
places or the triage workflow starts failing on a schedule nobody watches.**
This is the same class of fault as §3.

A census that scans only TypeScript reports `VERCEL_TOKEN` — the one credential
that can deploy this site — as unused and deletable. That happened while
preparing this handover. Scan `.github/workflows/*.yml` too.

### 6.4 What the triage genuinely cannot see

`slack-triage.yml` runs `discover-channels.ts` as the Collector bot on weekday
mornings and edits one standing GitHub issue, so any collaborator can see a
backlog instead of it being one person's private knowledge. It writes nothing to
the repository (`--no-record`), deliberately: a machine that advances a read
position is the failure mode behind every miss in that skill's history.

**Its stated blind spot is real and is not closable with the token it has.** A
bot token cannot list DMs or group DMs *at all* — `im`/`mpim` return
`missing_scope` and would abort the whole listing, which is why `--no-dms` is
passed. That is **28 known conversations** today, 9 of them marked always-read.
The triage reports them as **unseen rather than silently absent**, which is the
honest behaviour, but reporting a blind spot does not close it. Closing it needs
a **user token** (`SLACK_USER_TOKEN`), which acts as the authorising human and
which exactly one person holds. Even that cannot read a DM between two other
people — that needs Slack's Discovery API, Enterprise Grid only.

### 6.5 Check the triage is still alive — once, a week after the departure

**This is the item most likely to be forgotten, because forgetting it looks
exactly like success.**

`slack-triage.yml` runs on the **Collector's bot token**, held as a repository
Actions secret. That app was installed by the outgoing maintainer. A Slack bot
token normally survives the installing user being deactivated — the token belongs
to the app's installation, not to the person — but *normally* is not *always*,
and Slack has revoked tokens on deactivation before.

If it is revoked, the workflow does not shout. `discover-channels.ts` gets
`invalid_auth`, the run fails, and the standing issue simply stops changing. And
because that issue only comments **when the count changes**, a silent issue and a
clear backlog are the same observation. It is the same failure shape as the three
crons in §2, one level further out: not a job that stops, but a *watcher* that
stops.

A week after the departing account is deactivated:

```bash
gh workflow run slack-triage.yml
gh run list --workflow=slack-triage.yml --limit 1     # must be success, not failure
```

Then open the issue and check the scan timestamp in its first paragraph is
today's. **The run going green is not enough** — a green run that scanned nothing
would still be green.

The positive control, if you want one: the issue body says how many
conversations were scanned. It has been around 180. A number far below that means
the token is authenticating but has lost its channel membership, which is a
different fault with the same symptom.

If it *is* revoked, reinstall the Collector app (§6.2, `A0AJB2DTKNU`) and put the
new bot token in **both** places — the Actions secret and any local `.env`
(§6.3). Do not put it in Vercel; production's `SLACK_BOT_TOKEN` is the Event
Bot's and must stay that way.

---

## 7. Privacy, legal, and the data actually held

She Sharp is a **registered New Zealand charity, CC57025**, founded 2014.

### 7.1 What the organisation holds

The production database holds mentor and mentee applications (including free-text
answers), volunteer applications with uploaded CVs, donation records, event
feedback with names and email addresses, contact-form messages, and 1,560
newsletter subscriber rows (2026-09-10). Uploaded photos and CVs sit in Vercel
Blob at **public URLs** — unguessable, deliberately left public on 2026-09-06 for
parity with the Cloudinary URLs they replaced, and **an unguessable URL is not
access control**. `MAINTAINER_HANDOVER.md` §11.1 records that decision and says
that if it is revisited, revisit it for the CVs first.

### 7.2 A removal request arrives

**It goes to `PRIVACY_EMAIL`, which is `info@shesharp.org.nz`**
(`lib/config/contact-addresses.ts`). Every event page carries
`EventPhotographyNotice`, which routes removal requests there.

**Who answers `info@` is not recorded, and a 2026-08 delivery probe found seven
of the eleven addresses published on the website did not exist.** Confirm that
`info@` is a monitored mailbox before relying on this route —
[`WORKSPACE_MAILBOX_CHECKLIST.md`](./WORKSPACE_MAILBOX_CHECKLIST.md).

| Obligation | Owner |
|---|---|
| Monitor `info@` for privacy and photo-removal requests | *unassigned as at 2026-09-10* |

Removing a published photograph is **two actions**: a code change here (the
image is under `public/img/`, cached immutably for a year) *and* an edit to the
public album, which lives outside this repository. One without the other is not a
removal.

### 7.3 The feedback retention job

Event-feedback personal columns expire at 12 months; the answers never do.

```bash
npx tsx scripts/events/purge-feedback-personal-data.ts            # dry run — the default
npx tsx scripts/events/purge-feedback-personal-data.ts --apply
```

It nulls `name` and `email` past the window and leaves the ratings and free text
alone: Privacy Act 2020 IPP 9 concerns the identity, while the ratings are the
organisation's own record of how its events went and feed the funder report. Dry
run is the default because this cannot be undone.
→ [`EVENT_FEEDBACK.md`](../development/EVENT_FEEDBACK.md)

**It is not scheduled.** Nothing runs it. It is a recurring human obligation with
no owner:

| Obligation | Owner |
|---|---|
| Run the feedback purge (suggest: quarterly) | *unassigned as at 2026-09-10* |

### 7.4 Photographs of children — the standing fact

**Consent to photograph is still not collected at registration in Humanitix.**
It was not in 2026-08 when the rule was written and it is not now. What the site
has is `EventPhotographyNotice` on every event page plus a removal route to
`PRIVACY_EMAIL`. **A notice and a removal route are a notice and a removal route.
They are not consent**, and nothing in this repository can make them one — the
change has to happen in the Humanitix registration form.

The rule itself: do not publish a frame in which a child is the identifiable
subject — the frame is about them *and* their face is readable. A child inside a
wide group shot is not that. **Never name a child**, in copy, caption, `alt` text
or credit. Screen at selection, not after. Youth events (the Youth Tech Series,
Superhero Daughter Day) run under the host school's media consent, which is a
procedure, not an exemption. Ten photographs were already published before any of
this existed; they are enumerated in
[`PHOTOGRAPHING_MINORS.md`](../development/PHOTOGRAPHING_MINORS.md).

### 7.5 Private Slack content is in this public repository — open

**Found 2026-09-10. Not fixed. This is the one open item in this document that
is a live disclosure rather than a risk.**

The root `CLAUDE.md` rule is unambiguous: *"Never commit a credential, **a real
email address**, an attendee row, or anything from the private archive repo."*
Two things break it, and neither is a credential, which is why the audit before
going public did not catch them — it was looking for secrets.

**1. `.claude/skills/sync-event-from-slack/state/sync-state.json` is tracked.**
It is 562 KB and holds a `digest` field per conversation: **69 KB of prose across
63 conversations**, up to 11,279 characters in a single one. Measured that day:

- **15 conversations** whose stored text names a person or describes an itinerary
- **one real personal Gmail address** (the other two addresses in the file are
  published `@shesharp.org.nz` ones and are fine)

**2. The standing triage issue renders a slice of the same prose**, and issues on
a public repository are public. Verified by fetching
`https://api.github.com/repos/NZ-SheSharp/she-sharp/issues/254` **unauthenticated**:
HTTP 200, and the body contains the founder's name and where she was travelling.

Neither was a mistake at the time. `slack-triage.yml` shipped on **2026-08-31**,
when this repository was private, and the state file predates it. The repository
went public on **2026-09-06**. Nobody re-read what was already committed through
the new question of *who can see this now* — which is the general lesson, and it
is a different question from *is there a credential in here*.

**What was actually in it was worse than the first reading.** Of the 208 rows in
that file, **28 were direct messages and group DMs**, 13 of them with a digest.
The row *names alone* published a dozen people's Slack handles and the membership
of private group chats — `mpdm-<handle>--<handle>--<handle>-1` is a list of who
talks to whom. That is not the organisation's operational data. It is a dozen
individuals' private correspondence, and they did not agree to publish it.

### The decision, taken 2026-09-10

Three of the four possible responses were taken and one was refused.

**Stopped the bleeding.** Three changes, and the second is the one that matters
most:

1. `triage-report.ts` no longer puts any digest text in the issue. It prints the
   row, the action, the unread count and the two commands, and says the detail is
   local. The digest's real job — letting the next sync re-orient without
   re-reading a channel — happens through `_meta.priorDigest`, not through a
   public issue.
2. **DM and group-DM state no longer reaches the tracked file at all.**
   `saveManifest()` routes it to `sync-state.local.json`, which the standing
   `**/*.local.json` rule already gitignores. This follows the convention the
   newsletter reviewer roster set: the shareable half committed, the personal
   half local. And it is right on its own merits, separately from the privacy
   question — **a DM read position is personal to whoever holds the user token
   and is meaningless to anybody else**, so sharing it was never useful, only
   exposing.
3. `update-state.ts` now states what a digest may contain: state and open items,
   never a person's movements, never a quoted message, never an address. Naming
   somebody in an operational note is fine; recounting what they said is not.

**Scrubbed the tip.** The 28 private rows moved to the local file. The one real
off-domain address and the one itinerary in the remaining 180 were removed by
hand, keeping the operational sentence each sat in — the Xero digest still says a
date change was requested and never answered, which is the thing
[#292](https://github.com/NZ-SheSharp/she-sharp/issues/292) exists for.

**Added a guard, and broke it on purpose.** `state-lib.test.ts` — already in CI —
now fails if the tracked manifest gains a DM row or any off-domain address. It
was verified by injecting exactly that and watching it exit 1, then restoring.
A rule a machine can decide is the only kind worth putting in CI; "does this
prose name a person" is not one, which is why that rule lives in the skill's
instructions instead.

**Refused: a history rewrite.** §12 of `MAINTAINER_HANDOVER.md` records that the
one attempted here on 2026-06-11 *did not work and was never verified*, and that
GitHub serves orphaned commits by SHA until Support purges them. The content is
not a credential, so the payoff is smaller than the risk of a botched rewrite on
a repository two people are about to inherit.

**So be honest about what remains.** The tip is clean; the history is not. Anyone
who knows to look can still read the old commits. That is the cost of the four
days between going public and noticing, and no commit undoes it.

**Still owed, and not blocked on anything:** tell the people whose DMs were
summarised, and the person whose address it was. That is theirs to know whatever
the organisation decides about the rest.

---

## 8. Known broken, known sharp

Things that will surprise you. None is a bug report; each is a measured fact from
2026-09-10 with a decision attached.

**`tweak-event-slides` is broken.** The skill pushes straight to `main` by
design, for the "one small change an hour before doors open" case. The ruleset
has **zero bypass actors**, so that push is rejected with `GH013` — for everyone,
org owners included. *The fix is cheap precisely because the ruleset requires
zero approving reviews:* branch, open a pull request, wait for `verify`, merge.
It stays a one-person operation and takes about two minutes longer. The skill's
instructions still say otherwise.

**The two per-person Neon roles cannot run migrations.** `tharanee` and `lesley`
were created on the `production` branch on 2026-09-10, each in `neon_superuser`.
Measured, not assumed — every probe ran inside a rolled-back transaction:
`SELECT`/`INSERT`/`UPDATE`/`DELETE` allowed; `TRUNCATE`, `ALTER TABLE`,
`CREATE INDEX`, `CREATE TABLE` and `DROP TABLE` **denied**. This is the intended
posture — every skill that needs the live subscriber list keeps working while the
two genuinely dangerous operations are blocked by the database rather than by a
script flag. **The consequence: `pnpm db:generate` and `pnpm db:migrate` fail for
these roles.** Schema changes stay a `neondb_owner` job, and `neondb_owner`
travels with the Neon organisation login.

**Two skills are switched off in a file that is not in the repository.**
`.claude/settings.local.json` is gitignored (`**/*.local.json`) and carries a
`skillOverrides` block turning off `reply-to-contact-messages` and
`update-mailing-list` — two of the eleven skills in `.claude/skills/`, and
`update-mailing-list` is the one holding the binding consent rules. A fresh
checkout does **not** inherit this, so the same repository behaves differently on
two machines and nothing in `git status` mentions it. The block also disables
`send-event-emails`, a skill that no longer exists. Check this file before
concluding a skill is missing or misbehaving.

**24 dead variables are still in the local dotenv files**, and one of them lies.
`NEON_PROJECT_ID` holds the *old* project id sitting directly beside a connection
string pointing at the *new* project; read together they say the live database
belongs to a project scheduled for deletion on 2026-09-20. It took the Neon API
to disprove that. The other 23 are the three `CLOUDINARY_*` (service removed
2026-09-06), three `STACK_*` (never imported), and seventeen `PG*` /
`POSTGRES_*` / `KV_*` / `REDIS_URL` leftovers from the old Vercel–Neon
integration. **None is on Vercel** — they were removed there on 2026-09-06 —
but all 24 are still in `.env` and `.env.local`. Delete them. Two dead variables
next to a live one is not cosmetic; it is a false statement the next person will
believe.

**`.env` and `.env.local` have drifted by 13 variables.** Scripts
(`import "dotenv/config"`) read `.env` **only**; the Next.js dev server reads
both. So every Blob-touching script has been running blind while `pnpm dev`
worked, and the dev server has never seen the Humanitix or Mailchimp keys. Ship
one file and install it as both.

**`aihackathon-2026` is a live She Sharp deployment nobody documented.** It sits
under the same Vercel team as the website, serving `hackathon.shesharp.org.nz`,
and its source repository is in neither `NZ-SheSharp` nor the departing
maintainer's account. Nobody knows who can update it or what happens when it
breaks. Find the repository, or decide the site is frozen and say so.

**The `verify` job name is load-bearing.** The ruleset matches the required
status check by the literal string `verify`. Renaming or splitting that job
**silently removes branch protection** — CI keeps running, everything looks
green, and nothing is enforced.

---

## 9. The verification habit

**Before you trust a zero result, prove the check can produce a non-zero one.**
Feed it something you know it should catch. A confident negative from the wrong
surface is worse than no check at all, because it ends the search.

All four of these are from **a single day** of preparing this handover. Each read
as a clean answer and each was wrong:

1. **`pg_stat_activity` through the Neon pooler cannot see another client's
   session.** A deliberate second connection did not appear. Every "0 sessions,
   therefore nothing is using this database" reading was meaningless. It works on
   the direct, unpooled endpoint. **`MAINTAINER_HANDOVER.md` §10.1 says the
   2026-09-06 migration was verified with exactly this method — so that
   verification was probably reading a blind surface.** The migration is almost
   certainly fine; the *proof* is not.
2. **`/api/auth/csrf` on production returns `{"csrfToken":"dummy"}`.** Twenty-five
   scripted sign-in attempts therefore all failed with `MissingCSRF` and never
   reached the database. The stimulus was broken, not the observation.
3. **"No writes since 2026-09-04" did not mean the database was retired.** The
   site is simply quiet between events.
4. **A variable census that skips `.github/workflows` reports `VERCEL_TOKEN` as
   having no reader** — i.e. as safe to delete. It is the single credential that
   can deploy this site.

What did work is worth copying as a shape. To prove which database production was
actually using: POST to `/api/auth/forgot-password` (plain JSON, no CSRF gate,
`SELECT`s `users` and writes nothing for an unknown address) and watch
`pg_stat_database.xact_commit` on the candidate endpoint. Idle windows moved it
by 2–3. Sixty queries of one's own moved it by 29 — **that is the positive
control**. Twenty production requests moved it by 23. The control is what turns
the last number from a hope into a measurement.

The same rule in its other forms, each from a dated incident: a guard is not
verified until you have broken the thing it guards (2026-08-30, two gates read as
correct and gated nothing); a check keyed on an annotation inherits the
annotating pass's blind spot and exits 0; `no_team` from a Slack webhook reads
exactly like "revoked" until you discover it also answers that for a
`T00000000` placeholder that was never real.

---

## See also

- [`MAINTAINER_HANDOVER.md`](./MAINTAINER_HANDOVER.md) — the access inventory, the
  human obligations, the open loops, and §10–§13: the database move, the
  Cloudinary removal, the credential exposure, and going public.
- [`MAINTENANCE_MODE.md`](./MAINTENANCE_MODE.md) — the site-wide kill switch.
- [`VERCEL_ENV_VARIABLES_GUIDE.md`](./VERCEL_ENV_VARIABLES_GUIDE.md) — how to set
  a variable without silently storing an empty string.
- [`GITHUB_ACTIONS_AND_ACCOUNT.md`](./GITHUB_ACTIONS_AND_ACCOUNT.md) — superseded
  history; still the reason `verify.yml` is one job.
- [`../development/TESTING.md`](../development/TESTING.md) — there is no test
  runner; checks are plain `node:assert` scripts and CI is one job on purpose.
- [`../development/EMAIL_PLATFORM_STATE.md`](../development/EMAIL_PLATFORM_STATE.md)
  — what each email platform holds and what it costs.
- [`./HUMANITIX_INTEGRATION_SHUTDOWN.md`](./HUMANITIX_INTEGRATION_SHUTDOWN.md) and
  [`./MAILCHIMP_CANCELLATION.md`](./MAILCHIMP_CANCELLATION.md) — two decisions
  taken and not executed, both needing the founder's console.
