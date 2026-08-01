---
# learning/knowledge-graph.md — Phase 2 output (adopt-project)
# statuses: seed -> introduced -> practicing -> understood
---

## geocoding-branch-by-input-type
- status: **understood**
- evidence (2026-08-01): explained that `/\d/.test(searchInput)` correctly routes to postcode lookup because "only postcodes have numbers" — own reasoning, own code.
- depends-on: none

## async-fetch-flow
- status: **seed**
- evidence: not yet probed for the *why* of `await`/`async` structure itself (only observed as working code). Flagged for [[dom-visibility-toggling]] follow-up.
- depends-on: none

## dom-visibility-toggling
- status: **seed**
- evidence (2026-08-01): `sunInfo.style.display = 'block'` set early was confirmed accidental ("just where the line ended up... didn't know it affected much") — real gap, not designed loading-state handling.
- depends-on: [[async-fetch-flow]]
- comes due: when building the Places results panel + loading/error states (early plan section).

## api-key-security
- status: **introduced**
- evidence (2026-07-31): articulated unprompted that the Places key should live server-side on Vercel "so that when it goes public, the api is not visible" — correct reasoning, own words. Not yet practiced (no server code written).
- depends-on: [[vercel-serverless-functions]], [[env-variables]]

## vercel-serverless-functions
- status: **seed**
- evidence (2026-07-31): explicitly stated "i dont know anything about vercel serverless function[s]".
- depends-on: none

## env-variables
- status: **seed**
- evidence: no env-var usage anywhere in the codebase yet (existing OpenWeather key is hardcoded client-side). Will become load-bearing once the Vercel function holds the Places key.
- depends-on: none

## google-places-api-new
- status: **seed**
- evidence (2026-07-31): explicitly stated "i dont know... how to use the places api to retreive the sunset locations".
- depends-on: [[vercel-serverless-functions]]

## browser-geolocation-api
- status: **seed**
- evidence: not yet built or discussed beyond the original feature request.
- depends-on: none

## google-maps-directions-links
- status: **seed**
- evidence: not yet built or discussed beyond the original feature request.
- depends-on: none

## git-version-control
- status: **practicing**
- last-reviewed: 2026-08-01
- evidence (2026-08-01): ran `git init` and correctly predicted a new repo would connect to an account (fixed to: local-only, no account link — misconception corrected and confirmed understood on the spot). Wrote `.gitignore` themselves, correctly reasoning `.env*` would still catch a plain `.env` file. Set `user.name`/`user.email` via `git config --global`, staged with `git add .`, and made the first commit (`git commit -m "First ever Commit"`) after self-correcting a `config`/`commit` typo once pointed out. First contact today — capped at practicing, not understood, until a later review confirms it stuck.
- depends-on: none

## gitignore-patterns
- status: **practicing**
- last-reviewed: 2026-08-01
- evidence (2026-08-01): correctly reasoned that a bare `.env` line matches only that exact filename, then asked whether `.env*` would still protect the real key — showing they understood the wildcard as "match this plus anything after," not just copying a suggestion.
- depends-on: [[git-version-control]]
