# Moving `shesharp.org.nz` DNS off a personal Cloudflare account

> **Decided, not done, and currently blocked.** Recorded 2026-09-10 during the
> maintainer handover. This file carries no credential values.

## The finding

`shesharp.org.nz` is served by Cloudflare, and the Cloudflare zone sits in a
**personal account**, next to seven unrelated personal domains.

Measured on 2026-09-10 through the Cloudflare API:

| | |
|---|---|
| Zone | `shesharp.org.nz`, id `69ceead400d875da5621043801344101` |
| Account | `Chanmeng.dev@gmail.com's Account`, id `c87dca24333f7ed5d643f731f6308fec` |
| Plan | Free |
| Cloudflare nameservers | `art.ns.cloudflare.com`, `ashley.ns.cloudflare.com` |
| Nameservers before Cloudflare | `ns1.1stdomains.net.nz`, `ns2.1stdomains.net.nz` |
| Other zones in the same account | `chanmeng.org`, `archcanvas.uk`, `archlang.uk`, `fanfic-lab.tech`, `femtechweekend.com`, `libraryos.live`, `vitex.org.nz` |

Registrar is **1stdomains.nz**, and the registrar login is held by the founder.
That part is fine. **DNS is the part that is not.**

## Why this outranks every API key in `CREDENTIAL_INVENTORY.md`

Whoever controls this zone controls, without needing any other credential:

- **where the website points** — the apex and `www` records in front of Vercel;
- **all email for the domain** — MX, and the SPF, DKIM and DMARC records that
  decide whether mail from `shesharp.org.nz` is delivered or silently dropped.
  `docs/deployment/EMAIL_AUTHENTICATION.md` is the record of how carefully that
  was assembled;
- **the GitHub organisation's domain verification** — the `TXT _gh-NZ-SheSharp-o`
  record that `docs/deployment/GITHUB_ACTIONS_AND_ACCOUNT.md` says must never be
  deleted.

Every other credential in this repository can be rotated by somebody who still
has access. DNS is the one that decides who *gets* the mail that a rotation
sends.

`MAINTAINER_HANDOVER.md` §3 has always said "confirm the registrar login is
org-held". It was the right instruction pointed at the wrong layer: the registrar
was never the exposure.

## Why this is not a button

Cloudflare will not let two accounts hold the same **active** zone, and the Free
plan has no zone-transfer flow. So a "move" is really a delete-and-recreate:

1. Export every DNS record from the zone in the personal account.
2. Delete the zone from the personal account.
3. Add `shesharp.org.nz` in the organisation's Cloudflare account
   (`website@shesharp.org.nz` already has one).
4. Import the records.
5. Cloudflare assigns nameservers to the new zone. **They may not be the same
   pair.** If they differ, the registrar has to be updated at 1stdomains.nz.
6. Verify, then watch mail for a day.

**Between steps 2 and 4 the domain has no Cloudflare zone.** The registrar is
still pointing at `art.ns` / `ashley.ns`, which no longer answer for it. In that
window the website is unreachable and inbound mail has nowhere to go. If step 5
turns out to need a nameserver change, the window lasts until the registrar
update propagates, which is not minutes.

## Why it is blocked today

- **The registrar cannot be signed into right now.** Until somebody can reach
  1stdomains.nz, step 5 has no fallback, so the move cannot be started safely —
  the whole plan depends on being able to fix the nameservers if the new zone
  comes back with a different pair.
- **The DNS export has not been taken.** The workstation's Cloudflare token
  carries `zone:read` but not `dns_records:read`, so listing the records returns
  `Authentication error`. Zone metadata above came back fine, which is exactly
  the shape of a partial permission that reads like a working connection.

## Before anyone starts

1. **Take the export first, and check it is not empty.** An export file that
   exists and contains nothing looks identical to an export that worked. Create a
   Cloudflare API token scoped to *Zone → DNS → Read* on this zone alone, list the
   records, and count them before deleting anything.
2. **Write down the records whose loss is silent**: every MX, `_dmarc`,
   `*._domainkey`, the SPF TXT, `TXT _gh-NZ-SheSharp-o`, and any `_vercel`
   verification record. Losing one of these does not produce an error anywhere —
   mail simply stops arriving, or a verification quietly lapses.
3. **Record which records are proxied** (orange cloud). The copy has to match, or
   the site's addressing and TLS change under it.
4. **Have the registrar login in the room**, not "available if needed".
5. **Do it outside an event and outside a send.** Not in the days around a
   newsletter: a DMARC or DKIM record that is missing for an hour is a reputation
   problem that outlasts the outage.

## Interim mitigation, if the move keeps slipping

The exposure is that one personal account holds the zone. That is reduced —
not removed — by inviting `website@shesharp.org.nz` as a **member of the personal
Cloudflare account** with access to this zone, so the organisation can at least
read and edit its own DNS without going through one person. It does not change
who owns the account, and it does not survive that person deleting it. Treat it
as a stopgap with a date on it, not as a resolution.

## Status

| | |
|---|---|
| Found | 2026-09-10, during the maintainer handover |
| Blocked by | no working 1stdomains.nz login; no DNS export taken |
| Owner | unassigned — this needs the founder for the registrar, and a maintainer for the Cloudflare side |
| Not done | the move itself, and the export that must precede it |
