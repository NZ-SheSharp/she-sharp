# Moving `shesharp.org.nz` DNS to an account the organisation controls

> **Decided, not done, and currently blocked.** Recorded 2026-09-10 during the
> maintainer handover. This file carries no credential values, and no account
> identifiers — see "What this file deliberately does not say" at the end.

## The finding

`shesharp.org.nz` is served by Cloudflare, and **the Cloudflare zone is not in an
account the organisation controls.** It is in a personal one, alongside several
unrelated personal domains.

| | |
|---|---|
| DNS | Cloudflare, Free plan |
| Cloudflare nameservers | `art.ns.cloudflare.com`, `ashley.ns.cloudflare.com` |
| Nameservers before Cloudflare | `ns1.1stdomains.net.nz`, `ns2.1stdomains.net.nz` |
| Registrar | **1stdomains.nz**, held by the founder |

The registrar is fine. **DNS is the part that is not.**

## Why this outranks every API key in `CREDENTIAL_INVENTORY.md`

Whoever controls that zone controls, without needing any other credential:

- **where the website points** — the apex and `www` records in front of Vercel;
- **all email for the domain** — MX, and the SPF, DKIM and DMARC records that
  decide whether mail from `shesharp.org.nz` is delivered or silently dropped.
  [`EMAIL_AUTHENTICATION.md`](EMAIL_AUTHENTICATION.md) is the record of how
  carefully that was assembled;
- **the GitHub organisation's domain verification** — the `TXT _gh-NZ-SheSharp-o`
  record that
  [`GITHUB_ACTIONS_AND_ACCOUNT.md`](GITHUB_ACTIONS_AND_ACCOUNT.md) says must
  never be deleted.

Every other credential in this repository can be rotated by somebody who still
has access. **DNS decides who *receives* the mail that a rotation sends.**

`MAINTAINER_HANDOVER.md` §3 said for months: "confirm the registrar login is
org-held". That instruction was right and pointed one layer too high. The
registrar was never the exposure.

## Why this is not a button

Cloudflare will not let two accounts hold the same **active** zone, and the Free
plan has no zone-transfer flow. A "move" is really a delete-and-recreate:

1. Export every DNS record from the current zone.
2. Delete the zone from the account holding it.
3. Add `shesharp.org.nz` in the organisation's Cloudflare account
   (`website@shesharp.org.nz` already has one).
4. Import the records.
5. Cloudflare assigns nameservers to the new zone. **They may not be the same
   pair.** If they differ, the registrar has to be updated at 1stdomains.nz.
6. Verify, then watch mail for a day.

**Between steps 2 and 4 the domain has no Cloudflare zone.** The registrar is
still pointing at `art.ns` / `ashley.ns`, which no longer answer for it. In that
window the website is unreachable and inbound mail has nowhere to go. If step 5
needs a nameserver change, the window lasts until that propagates, which is not
minutes.

## Why it is blocked today

- **The registrar cannot be signed into.** Until somebody can reach
  1stdomains.nz, step 5 has no fallback — the whole plan depends on being able to
  fix the nameservers if the new zone comes back on a different pair.
- **The DNS export has not been taken.** The credentials available on the
  outgoing maintainer's workstation carry `zone:read` but not
  `dns_records:read`, so listing the records returns `Authentication error`.
  Zone metadata comes back fine, which is exactly the shape of a partial
  permission that reads like a working connection right up to the call you
  needed.

## Before anyone starts

1. **Take the export first, and check it is not empty.** An export file that
   exists and contains nothing looks identical to an export that worked. Use a
   Cloudflare API token scoped to *Zone → DNS → Read* on this zone alone, list
   the records, and count them before deleting anything.
2. **Write down the records whose loss is silent**: every MX, `_dmarc`,
   `*._domainkey`, the SPF TXT, `TXT _gh-NZ-SheSharp-o`, and any `_vercel`
   verification record. Losing one of these produces no error anywhere — mail
   stops arriving, or a verification quietly lapses.
3. **Record which records are proxied** (orange cloud). The copy has to match, or
   the site's addressing and TLS change under it.
4. **Have the registrar login in the room**, not "available if needed".
5. **Do it outside an event and outside a send.** Not in the days around a
   newsletter: a DKIM or DMARC record missing for an hour is a reputation problem
   that outlasts the outage.

## Interim mitigation, if the move keeps slipping

The exposure is that one account outside the organisation holds the zone. That is
reduced — **not removed** — by inviting `website@shesharp.org.nz` into that
account as a member with access to this zone, so the organisation can read and
edit its own DNS without going through one person. It does not change who owns
the account and it does not survive that account being closed. Treat it as a
stopgap with a date on it, not as a resolution.

## What this file deliberately does not say

Which account, whose, its identifier, the zone id, or what else is in it.

Publishing that would name a private individual's account on a public repository
**and** tell anyone reading exactly where to aim to take over a charity's domain
and mail. The organisation needs the risk to be legible and actionable — it is
their domain — and it does not need the personal specifics to act.

**Whoever is doing the move should ask the outgoing maintainer directly.** The
identifiers, the workstation's credential state, and the seven other domains in
that account are recorded privately and can be handed over in one message.

## Status

| | |
|---|---|
| Found | 2026-09-10, during the maintainer handover |
| Blocked by | no working 1stdomains.nz login; no DNS export taken |
| Owner | unassigned — needs the founder for the registrar, and a maintainer for the Cloudflare side |
| Not done | the move itself, and the export that must precede it |
