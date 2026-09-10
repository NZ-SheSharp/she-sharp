# Skills and workflows — the handover companion

Written **2026-09-10**, against the repository as it stood that day.

`docs/deployment/MAINTAINER_HANDOVER.md` §5 says the skills and the runbooks
"were the succession plan, and it only works if somebody is actually pointed at
it" — and then does not list them. **This file is the pointing.** It is written
for the two incoming maintainers, who are semi-technical: it assumes you can run
a command someone gives you and read what comes back, and assumes nothing else.

It is a companion to `docs/development/AI_SKILLS_GUIDE.md`, not a replacement.
That guide teaches you to *use* the skills — install Cursor, sign in, run one,
get your work back into the repository. **Read it first.** This file answers the
questions a guide for operators deliberately leaves out: what each skill can
reach, what it will refuse, which of them have actually been exercised, and
which one is broken today.

> **This file carries no credential values and must not gain any.** It names
> *which* variable a skill reads. The repository is public and secret-scanning
> push protection is on; a pull request carrying a plausible-looking key is
> rejected, not flagged.

Where this file and any other document disagree on a measured number, the
measurement wins and the other document needs correcting.

---

## 1. What `.claude/` actually is

`.claude/skills/` holds eleven directories. Each contains a `SKILL.md` — a
written procedure in plain English, with the commands inline — and, where it
needs them, `references/` (the rules that were too long for the procedure),
`scripts/` (TypeScript the skill runs), and `state/` (the ledger of what it has
done).

Three things follow, and they are the reason this is an **operational asset
rather than developer tooling**:

- **It is read identically by Claude Code, Cursor and Claude Desktop.** The
  format is not tied to one editor or one vendor's chat window. A non-developer
  in Cursor runs the same procedure, with the same guardrails, that a developer
  runs from a terminal. `AI_SKILLS_GUIDE.md` §2 sets up Cursor for exactly this
  reason.
- **It is versioned with the code it operates.** When
  `newsletter_subscribers` moved off Resend on 2026-08-29, the skills that send
  to it changed in the same pull requests. A procedure kept in a wiki or a
  Google Doc would still be describing Resend segments today.
- **It is the only written form of a lot of this knowledge.** The consent gate
  (`.claude/skills/update-mailing-list/references/consent-rules.md`) is
  referenced as binding by the root `CLAUDE.md`, by `MAINTAINER_HANDOVER.md` §5
  and by `scripts/CLAUDE.md`. It is not a copy of a policy that lives elsewhere.
  It *is* the policy.

`.claude/settings.local.json` is a different kind of file — machine-local, and
untracked. §4 is about that, and it matters more than it sounds.

---

## 2. The eleven skills

**Start with `/run-event-playbook`.** It is the way in. It runs one read-only
command, tells you where an event has got to across ten checks, and names the
skill that closes the first gap — so nobody has to hold the order in their head.
`AI_SKILLS_GUIDE.md` §1 says the same thing, and it is worth repeating.

| Skill | Owner | Needs | Sends email? | Writes to the database? |
|---|---|---|---|---|
| `/run-event-playbook` | anyone | nothing | no | no |
| `/sync-event-from-slack` | website team | `SLACK_BOT_TOKEN` or `SLACK_USER_TOKEN` | no | no |
| `/make-event-poster` | Marketing | `OPENAI_API_KEY` | no | no |
| `/make-event-video` | Marketing | a sibling Remotion project; a Suno track | no | no |
| `/build-event-slides` | website team, organiser decides content | `OPENAI_API_KEY` (poster plate only) | no | no |
| `/tweak-event-slides` | anyone | git + `gh` | no | no |
| `/promote-event` | Comms | `POSTGRES_URL`, `RESEND_API_KEY`, `EMAIL_UNSUBSCRIBE_SECRET`, `BASE_URL` | **yes — to the whole list** | reads only |
| `/email-the-community` | Comms | as above | **yes — to the whole list** | reads only |
| `/update-mailing-list` | Comms | `POSTGRES_URL`; `MAILCHIMP_API_KEY` for the suppression pull | no | **yes — it is the only skill that writes subscriber rows** |
| `/reply-to-contact-messages` | Comms | `POSTGRES_URL`, `SLACK_BOT_TOKEN`, the Resend CLI | yes — one person at a time | yes — closes `reviewed_at` |
| `/monthly-newsletter` | website team | `POSTGRES_URL`, `RESEND_API_KEY`, `EMAIL_UNSUBSCRIBE_SECRET`, `BLOB_READ_WRITE_TOKEN`, `BASE_URL`, `CRON_SECRET` | **yes — to the whole list** | reads only |

Two environment notes that will bite on a fresh machine, both from the census in
the handover working file (2026-09-10):

- **`EMAIL_UNSUBSCRIBE_SECRET` is set on Vercel production and in neither local
  dotenv file.** Without it `scripts/email/build-batch.ts` **refuses** — which is
  correct behaviour, because the per-recipient unsubscribe link cannot be signed
  without it. Every one of the three list-sending skills stops there. So does
  `CRON_SECRET`, which the newsletter's approve step needs.
- **Scripts read `.env`, never `.env.local`** (`scripts/CLAUDE.md`, "How a script
  runs"). `BLOB_READ_WRITE_TOKEN` currently exists only in `.env.local`, so the
  newsletter's photo-curation step has been running blind while `pnpm dev`
  worked. Ship one file and install it as both.

### `/run-event-playbook` — the conductor

Runs `npx tsx scripts/events/event-status.ts --slug <slug>`, which is offline,
read-only and writes nothing, then reads the ten-line report back in plain words
and hands the first gap to the skill that owns it. **It builds nothing itself** —
no poster, no deck, no email, no Slack read, no commit. Its `missing` lines carry
a `→` naming the exact command; the skill is instructed never to paraphrase that
line into a different one. It refuses to conduct a flagship or multi-day event
(a hackathon, a festival, a conference) and hands those to the individual skills,
and it will not skip a gate to save a step. Phases:
`.claude/skills/run-event-playbook/references/phases.md`.

### `/sync-event-from-slack` — how an event reaches the website

Reads an event-planning Slack channel and turns it into
`lib/data/json/events-custom.json` plus `public/img/events/<slug>/`, downloading
and renaming speaker headshots, cover posters and `.docx` bios. It needs a Slack
token and nothing else — notably, **it does not need the private archive** (see
§7). It refuses to copy an internal code or a private invite/checkout link into
the repository; that rule exists because three access codes reached a committed
file on 2026-06-11 and needed a history rewrite plus rotation. It never
hand-edits its own ledger — `.claude/skills/sync-event-from-slack/scripts/update-state.ts` is the only writer. Fifteen
helper scripts sit in `.claude/skills/sync-event-from-slack/scripts/`, and one of
them (`state-lib.test.ts`) is a step in the CI job.

### `/make-event-poster` — the artwork

Builds the ticketing banner, the feed post, the story, the square tile and the
print poster, plus one poster per speaker and a line-up tile, from the event's own
record — so the artwork and the website cannot disagree. The picture is generated
as a **textless plate** with gpt-image-2 (`scripts/events/generate-poster-plate.ts`
reads `OPENAI_API_KEY`) and every word is then set in code, which is what makes
the type exact and correctable. It refuses to generate people, faces or taonga,
refuses to retouch or restyle a real headshot, and refuses to invent a fact — a
wrong date is fixed in `events-custom.json`, never in the poster.

### `/make-event-video` — the short social video

A promo before the night or a recap after it, in four sizes, as a Remotion
composition cut to a Suno soundtrack. **The Remotion project is a sibling of this
repository, never inside it** — `tsconfig.json` includes `**/*.tsx`, so a Remotion
tree anywhere under `she-sharp` is swept into `pnpm typecheck` and `next build`.
It refuses to Ken Burns a photograph marked `wideOnly` (a child inside a wide
group shot is not an identifiable subject; cropping in makes them one — see
`docs/development/PHOTOGRAPHING_MINORS.md`), and refuses to put the `attendees`
figure on screen as people who came.

### `/build-event-slides` — the deck the room sees

Generates `/present/<slug>` from the event's own data, then confirms, trims,
lints, previews and deploys it. The run sheet, speakers, hosts and sponsors are
read live, so **a correction goes into the event data, not into the deck**. The
copy limits are enforced by `npx tsx lib/deck/deck.test.ts`, which is a CI step.
It refuses to write a fact into a deck file to avoid editing the event record.
Assumes the event is already in the repository — `/sync-event-from-slack` puts it
there.

### `/tweak-event-slides` — one small change, fast

**This one is broken. See §5.** By design it makes a single low-risk change to an
existing deck, runs three offline checks (about a minute), and pushes straight to
`main` with no branch, no pull request and no approval prompt. It refuses
anything that touches a component, a stylesheet, a skin, a slide type or the
deck's structure, and hands those to `/build-event-slides`.

### `/promote-event` — telling the list about an upcoming event

Up to three stages — save-the-date, line-up reveal, last call — each a different
email built from the event's own record. It generates one stage's spec and then
**hands over to `/email-the-community` from its Step 3 onward**; it duplicates
none of that machinery. It refuses a past event outright, and refuses a stage
that does not belong at this distance from the date (a "last call" six weeks out
is a refusal, and the refusal prints which stage does fit). It sends to the
newsletter subscriber table and nothing else — never a registrant list, never a
Humanitix export.

### `/email-the-community` — one announcement to the whole list

Drafts a spec, renders and gates it, test-sends to a mailbox **the user names
every time** (never a hard-coded address), builds the batch from the subscriber
table, and sends chunk by chunk. Nothing leaves the building before an explicit
plan approval. It refuses to build a batch from a render that is red; it refuses
to put a registration code, a discount code or a private Slack link in the body;
and if fewer than five people would be mailed it stops and says so, because that
is a database connection to check rather than a list to mail.

### `/update-mailing-list` — who is on the list

The only skill that writes to `newsletter_subscribers`, which since 2026-08-29 is
the organisation's **entire** marketing-consent record. It reports the roster,
normalises a sign-up sheet of any shape, applies the four-way consent gate and
maintains the do-not-contact registers. `references/consent-rules.md` is the
binding text and is read first, every time: **registering, donating, applying,
giving feedback or writing in is not subscribing.** It refuses a file with no
opt-in column outright — until 2026-08-30 that file passed through whole and
reported `Excluded 0`, which reads as a clean file. It is a hard prerequisite for
`/email-the-community`.

### `/reply-to-contact-messages` — the contact inbox

Reconciles `contact_form_submissions` against the `#contact-form-notifications`
Slack channel, drafts and gates a reply, sends it through the Resend CLI, then
closes the row and notes the Slack thread. One reply per row, enforced by
`reviewed_at`. It never emails a `qa-test` row, and that check outranks every
other. It **stops and hands over** the moment a minor, a safeguarding concern, a
complaint or an immigration question appears — it drafts, but a human decides.

### `/monthly-newsletter` — the monthly loop

One month's issue, from an empty file at
`lib/data/json/newsletter-issues/<YYYY-MM>.json` to a send a human runs one batch
at a time. The `auto` block is a machine snapshot; the `editorial` block is
human-owned and **nothing in this repository generates it** — a person writes the
founder note, the cover, the photo of the month and the subject line.
`scripts/newsletter/new-issue.ts` refuses to overwrite an existing issue file
without `--force`, because that file is hand-edited all month. Photos must be
absolute Blob JPEGs of real events; it refuses to pad an empty month with filler.

---

## 3. The ledgers are the only record of what was sent

Five tracked JSON files under `.claude/skills/*/state/` are the **only** history
of what this repository sent, to whom, and when. Resend's own dashboard has a
retention window; these do not. Losing one, or hand-editing one, loses the audit
trail — and for the marketing frequency cap, loses the count that enforces it.

| Ledger | Records | State on 2026-09-10 |
|---|---|---|
| `email-the-community/state/broadcasts.json` | every one-off broadcast | `lastRunAt: null`, no entries — **nothing has ever been sent through this skill** |
| `email-the-community/state/frequency-overrides.json` | deliberate exceptions to the three-per-month cap | empty; added 2026-08-30 |
| `monthly-newsletter/state/issues.json` | every issue's test, review, approval and batch | 2026-08 sent 2026-08-31 in 16 chunks (15 × 100 + 49 = **1,549** recipients); 2026-09 created 2026-09-04, test and review done, **approval `null` and no batches** |
| `reply-to-contact-messages/state/inbox-state.json` | which enquiry rows have been answered | one row (message 12), answered 2026-07-28 |
| `update-mailing-list/state/roster.json` | every import into the subscriber table | `lastRunAt: null`, no entries |
| `sync-event-from-slack/state/sync-state.json` | how far each Slack channel has been read | last recorded pass 2026-09-05 |

Two of those rows need saying out loud.

**`roster.json` is empty, and the list is not.** The Mailchimp carry-over on
2026-08-29 and the first opt-in harvest in September both ran as scripts
(`scripts/email/import-mailchimp-subscribers.ts`,
`scripts/email/import-optin-subscribers.ts`) rather than through the skill, so
the skill's ledger never saw them. The provenance of those rows is in the
database columns and in `docs/development/EMAIL_PLATFORM_STATE.md`, not here.
**If you import through the skill from now on, the ledger becomes true.**

**`broadcasts.json` is empty, and `promote-event` writes into it.** So neither
`/email-the-community` nor `/promote-event` has ever completed a send. The one
send on the record is the August newsletter, and the three-per-month cap already
counts it.

### These are not the same as `.cache/` and `tmp/`

Under the same skill directories there are untracked working directories, and
they are never a source of truth:

| Path | Ignored by | What it is |
|---|---|---|
| `.claude/skills/*/.cache/` | `.gitignore:76` | Slack channel dumps, `triage.json`, `contact-notifications.json` |
| `.claude/skills/sync-event-from-slack/tmp/` | `.gitignore:80` | scratch from a sync run |
| `.claude/skills/monthly-newsletter/state/reviewers.local.json` | `.gitignore:108` (`**/*.local.json`) | who gets the review copy, per machine — the `.example` beside it is tracked |

A fresh clone will not have any of them, and that is correct. `git status` and
`git ls-files` never mention them, but **Grep, Glob and `find` read them exactly
like source** — which is how `.cache/` came to hold April-2026 files named
`events-custom-final.json` and `current.json`, neither of which was ever the live
event data. `scripts/CLAUDE.md` has the full working-directory table.

---

## 4. What is switched off, and why your clone will behave differently

`.claude/settings.local.json` is **untracked** (`.gitignore:108`, `**/*.local.json`).
It exists only on the departing maintainer's machine. Its `skillOverrides` block
turns off eleven entries, three of which concern this repository:

```
"reply-to-contact-messages": "off",
"update-mailing-list":       "off",
"send-event-emails":         "off",
```

`AI_SKILLS_GUIDE.md` §6.1 and §6.2 document the first two as core Comms tools —
the first two sections of the skills walkthrough. `send-event-emails` is not a
skill at all any more: it was deleted on 2026-08-30 and registrant mail is sent
from Humanitix → Email campaigns
(`docs/development/EMAIL_RESPONSIBILITY_BOUNDARIES.md`). The override is a stale
line pointing at nothing.

**State this plainly, because it is the practical consequence:**

1. On the departing maintainer's machine, `/reply-to-contact-messages` and
   `/update-mailing-list` have not been invoked while the override was in place.
   The ledgers agree: the contact inbox has one entry, from 2026-07-28, and the
   roster has none at all.
2. **Your clone will not inherit the override.** The file is not in the
   repository and will not arrive with it. Both skills will be live and
   invocable on your machine from the first day.
3. So **your first run of either is effectively an untested run.** Neither has
   been exercised recently. Treat the first one as a rehearsal: run the read-only
   step, read what comes back, and stop before the step that sends or writes.
   `/update-mailing-list` in particular writes to the only marketing-consent
   record the organisation has.

The rest of that file's `permissions.allow` list is machine-local convenience and
carries nothing you need. Do not try to reconstruct it.

---

## 5. `/tweak-event-slides` is broken

The skill pushes straight to `main` by design. That is the whole point of it: the
one small change an hour before doors open — a typo on slide 12, a late speaker,
a swapped photo — checked in about a minute and live in about three more.

**It cannot work today.** The ruleset `protect main` (id 22368186, verified
against the GitHub API on 2026-09-10) is active on the default branch with
**zero bypass actors**. `git push origin main` is rejected with `GH013`. Not for
the incoming maintainers, not for a repository admin, not for an org owner —
zero means zero. `MAINTAINER_HANDOVER.md` §13 and the root `CLAUDE.md` both say
this; the skill predates it.

**The fix is cheap, and it is cheap for a specific reason.** The same ruleset
sets `required_approving_review_count: 0`. A pull request needs the `verify`
check to pass and nothing else — no second human, no waiting for a reviewer. So
the repair is to replace the skill's Step 4 with:

```
git checkout -b fix/deck-<slug>-<what>
git add lib/deck/decks/<slug>.ts lib/deck/index-meta.ts
git commit -m "fix(deck): ..."
git push -u origin HEAD
gh pr create --fill
gh pr checks --watch      # `verify` — the twelve-step job
gh pr merge --squash
```

Still one person, start to finish. What it costs you is the `verify` run — call
it three to five minutes on top of the deploy, so budget **ten minutes rather
than four** for a last-minute deck change.

**What to do the next time you are standing in a venue an hour before doors.**
Do not go looking for a way around the ruleset; do not ask an owner to lift it
for one push. Ten minutes before doors is not enough time — so the honest answer
is the one nobody likes: make the change on the branch, open the pull request,
and if `verify` has not gone green by the time you need the room, **present the
deck as it is and fix it afterwards**. A typo on a slide costs less than a red
`main` in a venue whose wifi you cannot rely on. And note the skill's own Step 5
warning, which is still true on the pull-request path: **there are no preview
deploys on this project.** Production is the first place the change has ever
rendered, so load `/present/<slug>` once after the merge.

Until Step 4 is rewritten, the skill's own guardrail 1 also stops applying the
way it reads: it says `verify.yml` runs on pull requests only, so a push to
`main` has no CI. On the pull-request path, CI is exactly what you now get.

---

## 6. `scripts/` — the safety boundary

`scripts/README.md` is the index; `scripts/CLAUDE.md` carries the conventions.
Everything there is run by hand with `npx tsx <file>` from the repository root.

**Read this before you run anything in that directory:**

> `lib/db/drizzle.ts` reads **`POSTGRES_URL`** through `dotenv.config()`, so on a
> machine that has ever run `vercel env pull` **the default target of every
> script here is production.**

There is no development database and no staging environment. A script that says
it deleted forty rows deleted forty real rows. And scripts read **`.env`**, never
`.env.local` — which is why a script can report a missing key on a machine where
`pnpm dev` works perfectly.

### What a non-developer may run

All five are read-only or offline. None of them can send anything.

| Command | What it does |
|---|---|
| `npx tsx scripts/events/event-status.ts --slug <slug>` | Offline, read-only, writes nothing, **always exits 0**. The ten-line event report `/run-event-playbook` is built on. `--upcoming`, `--past N`, `--all`, `--json` |
| `npx tsx scripts/email/suppression.ts reconcile` | Prints the live mailable count. Read it from the **`Mailable after suppression`** line — never from prose, including the prose in this repository. The first line, `Subscribed rows`, is the count *before* the two do-not-contact registers are applied |
| `npx tsx scripts/email/inspect-subscribers.ts` | Who is on the list, as counts and truncated hashes — never an address |
| `npx tsx scripts/deck/lint-deck.ts [slug]` | The organiser-readable deck report: copy limits, rhythm, feedback QR |
| `npx tsx scripts/verify-image-paths.ts` | Every image reference resolves, every file is referenced, every event image belongs to an event. Also a CI step |

The middle two connect to the production database and read from it. That is
expected and safe; they hold no write path.

### What is gated behind a developer

`scripts/README.md` opens with a table headed **"DANGER — read before running"**.
Do not treat it as a formality — every row is there because of something that
happened. Read the table itself rather than this summary; what it covers is:

- **Two database wipes** (`clear-all-data.ts`, `reset-db-and-create-admin.ts`),
  gated by `scripts/lib/destructive.ts`: dry run by default, `--apply` to write,
  and against a non-local host also `--confirm-host=<host>`. Nothing is backed
  up first.
- **Seven real mailers** to mentors, mentees and admins — reminder sweeps,
  invitation re-sends, an admin invitation that grants admin on redemption, and
  `newsletter/approve.ts`, the one script there that can reach the whole
  newsletter audience.
- **Two writers into `newsletter_subscribers`**, both dry-run by default. You
  cannot un-import consent, only delete rows and lose the provenance.
- **`humanitix/fetch-api.ts --include orders,tickets`**, which is in a paragraph
  of its own rather than the table: it mails nobody and is entirely reversible,
  but what it *writes* is names, addresses, dates of birth, free-text
  accessibility answers, admission tokens and a **live access code on nearly
  every row**.

`email/build-batch.ts` and `email/render-message.ts` deliberately do **not**
send: they write files and print the `resend` command a human runs.

### The new guard: the database now refuses the dangerous operations

Two per-person Neon roles, `tharanee` and `lesley`, were created on the
`production` branch on 2026-09-10. Their privileges were **measured, not
assumed** — every probe ran inside a transaction that was rolled back, and the
row counts were re-checked afterwards:

| Operation | Result for these roles |
|---|---|
| `SELECT`, `INSERT`, `UPDATE`, `DELETE` | allowed |
| `TRUNCATE` | **denied** |
| `ALTER TABLE`, `CREATE INDEX`, `CREATE TABLE`, `DROP TABLE` | **denied** |

So `clear-all-data.ts` will fail at the `TRUNCATE`, and `pnpm db:migrate` /
`pnpm db:generate` will fail at the `ALTER TABLE`. **That is deliberate**, and it
is a better guard than a script flag: a flag can be typed past, a database
privilege cannot. Every skill that needs the live subscriber list keeps working
untouched.

The consequence to plan for: **schema changes remain a `neondb_owner` job**, and
`neondb_owner` travels with the Neon organisation login
(`website@shesharp.org.nz`). A migration is therefore a two-step: write and
review it as yourself, apply it signed in as the organisation.

One stale pointer worth knowing before it wastes your afternoon: the **"What CI
runs" table at the foot of `scripts/README.md` lists five jobs**. Since
2026-09-01 CI is **one job named `verify`**, with twelve steps
(`.github/workflows/verify.yml`). The ruleset matches that context **by name**,
so renaming or splitting the job silently removes branch protection.

---

## 7. What breaks without the private archive

`MAINTAINER_HANDOVER.md` §8 records that `ChanMeng666/she-sharp-slack-archive`
and `ChanMeng666/she-sharp-transformation-record` are personal repositories and
are **not being transferred**. Four environment variables point at checkouts you
will not have:

`MAILCHIMP_VAULT_DIR` · `HUMANITIX_VAULT_DIR` · `SLACK_ARCHIVE_DIR` ·
`SHESHARP_REPORTS_DIR`

**They ship empty on purpose.** An empty variable makes the scripts that need one
refuse cleanly at startup rather than half-run against a directory that is not
there and report a confident, wrong, empty result.

What stops working, and nothing else does:

- **Everything under `scripts/humanitix/`** — `verify-export.ts`,
  `build-archive.ts`, `manifest.ts`, `fetch-api.ts`, `report-metrics.ts`,
  `top-employers.ts`, `propose-crosswalk.ts`, `export-optins.ts`, `csv.ts`.
- **Everything under `scripts/mailchimp/`** — `verify-export.ts`,
  `build-archive.ts`, `build-campaigns.ts`, `fetch-api.ts`, `fetch-assets.ts`,
  `campaign-images.ts`, `extract-archive.ts`, `rehost-archive-images.ts`,
  `recent-openers.ts`, `report-metrics.ts`, `archive-index.ts`, `manifest.ts`,
  `propose-crosswalk.ts`, `csv.ts`.
- **`scripts/internal-report/build-record.ts`**, which reads the Slack archive
  and the reports checkout.
- The `refresh-archive.ts` helper inside `/sync-event-from-slack`.

**Nothing the website serves depends on any of it, and a fresh clone deploys
fine.** These are local reporting and archive tools. The committed aggregates
they once produced — `lib/data/json/humanitix/`, `lib/data/json/mailchimp/`,
`lib/data/newsletter-archive/` — are already in the repository and are read
normally by the site and by CI.

`/sync-event-from-slack` is the one that reads as if it needs the archive and
does not: it reads Slack directly and needs only a token. Refreshing the archive
is not a step of syncing an event.

**The recovery path**, if the archive tooling is ever wanted again: take fresh
exports from the Humanitix and Mailchimp consoles — both are re-exportable by
anyone with the account — point `HUMANITIX_VAULT_DIR` / `MAILCHIMP_VAULT_DIR` at
wherever you put them, and run the `verify-export.ts` → `manifest.ts` →
`build-archive.ts` chain. Two standing rules apply and neither bends: **raw
exports never enter `lib/data/json/`** (CI has leak guards for exactly that), and
a vault stores **verbatim payloads, never mapped objects** — a checksum over a
mapped object once certified 86 months of growth history that were all zeroes.

Also: the two verify scripts accept `--allow-missing-vault`, and it must be asked
for explicitly. Do not reach for it to make a red command go green. A verify that
passes with nothing to verify is worse than no verify at all.

---

## 8. The recurring loops, and who owns each one

`MAINTAINER_HANDOVER.md` §1.1 says it plainly: not a committee, not "the website
team" — **one named person per obligation**. Access is shared between both
maintainers; ownership is not. What follows is **proposed, for Tharanee and
Lesley to confirm or swap**, not decided.

| Loop | Skill | Runbook | Cadence | Proposed owner |
|---|---|---|---|---|
| The monthly newsletter | `/monthly-newsletter` | `docs/development/EMAIL_OPERATIONS.md` | monthly — issue file in the first week, send in the last | **Lesley** (`lesley-gao`) |
| The mailing list and consent | `/update-mailing-list` | `.claude/skills/update-mailing-list/references/consent-rules.md` | before every send; an opt-in harvest after every event | **Lesley** (`lesley-gao`) |
| The event lifecycle | `/run-event-playbook` and the skills it calls | `docs/development/EVENT_LIFECYCLE_SOP.md` | per event, from about six weeks out to a fortnight after | **Tharanee** (`Tharaneetharan7`) |
| The contact inbox | `/reply-to-contact-messages` | `.claude/skills/reply-to-contact-messages/references/reply-voice-and-templates.md` | weekly | **Tharanee** (`Tharaneetharan7`) |

The newsletter and the mailing list are paired on one owner deliberately: the
marketing cap of **three sends per calendar month** is counted *across every
skill, the newsletter included*, and one person holding both is the simplest way
for that count to stay true. The event loop and the inbox are paired because both
are reactive and both run on a weekly rhythm.

Two standing rules sit above all four, and neither is enforced by any script:

- **A broadcast to the list is the founder's call, not the developer's.** That
  has been the working arrangement throughout. `MAINTAINER_HANDOVER.md` §5 says
  it, and it is worth repeating here because **the tooling will happily send
  without asking** — the skills gate on *your* approval, and they cannot tell the
  difference between your approval and hers.
- **Read the live subscriber count from the command, never from prose.** The
  `Mailable after suppression` line of `npx tsx scripts/email/suppression.ts
  reconcile`. Every dated figure in this repository, including the ones in this
  file, is a snapshot of a moving number.

There is one job deliberately absent from that table: **emailing the people who
registered for an event.** That is done in Humanitix → Email campaigns, against
the ticket holders Humanitix already holds, and not from this repository. The
skill that used to do it here was deleted on 2026-08-30 —
`docs/development/EMAIL_RESPONSIBILITY_BOUNDARIES.md` has the reasoning.

---

## Where to go next

| If you want | Read |
|---|---|
| To actually run one of these | `docs/development/AI_SKILLS_GUIDE.md` — start at §2 |
| One event, end to end, for the whole team | `docs/development/EVENT_LIFECYCLE_SOP.md` |
| Who may be emailed, by which system | `docs/development/EMAIL_RESPONSIBILITY_BOUNDARIES.md` |
| The state of the email platform, with dates | `docs/development/EMAIL_PLATFORM_STATE.md` |
| Every script, with its danger table | `scripts/README.md`, then `scripts/CLAUDE.md` |
| What stops working when the maintainer leaves | `docs/deployment/MAINTAINER_HANDOVER.md` |
