---
# learning/knowledge-graph.md — Phase 2 output (adopt-project)
# statuses: seed -> introduced -> practicing -> understood
---

## geocoding-branch-by-input-type
- status: **understood**
- evidence (2026-08-01): explained that `/\d/.test(searchInput)` correctly routes to postcode lookup because "only postcodes have numbers" — own reasoning, own code.
- depends-on: none

## async-fetch-flow
- status: **practicing**
- last-reviewed: 2026-08-04
- evidence (2026-08-04): in `api/api/viewpoints.js`, self-corrected a missing `async`/`await` pairing (function returning before `fetch` resolved) and a keyword-order syntax error (`async export default` → `export default async`), and reasoned through why `response.ok` should be checked before calling `.json()` by comparing to the existing pattern in `script.js`.
- depends-on: none

## dom-visibility-toggling
- status: **practicing**
- last-reviewed: 2026-08-02
- evidence (2026-08-01): `sunInfo.style.display = 'block'` set early was confirmed accidental ("just where the line ended up... didn't know it affected much") — real gap, not designed loading-state handling.
- evidence (2026-08-02): **reclaimed.** After refactoring `getSunData` to the top level (needed for the geolocation path), correctly reasoned that placing `display='block'` right after `getCurrentPosition()` (non-blocking) recreated the same premature-visibility bug, then moved it to *after* `await getSunData(...)` in both `getGeoLocation` and `findGoldenHour` — display now only flips once content is actually rendered, no empty-box flash in either path. Self-driven fix in both places, not just one told to.
- depends-on: [[async-fetch-flow]]

## js-function-scope
- status: **practicing**
- last-reviewed: 2026-08-10
- evidence (2026-08-02): correctly reasoned, unprompted, that `getSunData` (originally nested in `findGoldenHour`) couldn't be called from `getGeoLocation` because of scope, and separately that `searchInput` (a `let` local to `findGoldenHour`) wouldn't be in scope once `getSunData` moved to the top level — proposed the parameter-based fix themselves before being shown syntax.
- evidence (2026-08-10): fixed `getNearbyPlaces(geoData.latitude, geoData.longitude, ...)` to `geoData.lat, geoData.lon` after being asked to check the actual property names on the object returned by `testUserInput()`, by comparing against the correct usage one line above.
- depends-on: none

## stale-dom-reads
- status: **practicing**
- last-reviewed: 2026-08-02
- evidence (2026-08-02): read `radius-select`'s `.value` once into a top-level `const` at page-load, missing that it wouldn't reflect later changes. First attempt (switching to `let`) didn't fix the actual timing bug; after a comparison to how `searchInput` is re-read fresh at the top of `findGoldenHour` every call, correctly applied the same re-read-at-call-time fix in both `getGeoLocation` and `findGoldenHour`.
- depends-on: [[js-function-scope]]

## api-key-security
- status: **practicing**
- last-reviewed: 2026-08-08
- evidence (2026-07-31): articulated unprompted that the Places key should live server-side on Vercel "so that when it goes public, the api is not visible" — correct reasoning, own words.
- evidence (2026-08-08): correctly predicted `.env` alone wouldn't reach the deployed server since it's gitignored and never pushed; set the real key via `vercel env add` as a **sensitive** variable (understood that means write-only, unreadable later) scoped to Production; deployed with `vercel --prod`; independently verified via the Network tab that the key appears in neither request nor response on the live site. Full loop from stated intent to verified practice.
- depends-on: [[vercel-serverless-functions]], [[env-variables]]

## vercel-serverless-functions
- status: **practicing**
- last-reviewed: 2026-08-08
- evidence (2026-07-31): explicitly stated "i dont know anything about vercel serverless function[s]".
- evidence (2026-08-04): wrote `export default function(req, res){ res.status(200).json(...) }` in `api/api/viewpoints.js` after being told the contract, not shown the code. Ran `vercel dev`, correctly predicted the endpoint URL from the file path (`api/api/viewpoints.js` → `/api/api/viewpoints`) before testing, and confirmed it live in the browser.
- evidence (2026-08-08): extended the function to read `req.query.lat/lon/radius` from incoming URL query parameters (converted with `Number(...)` since query values arrive as strings), correctly diagnosed that testing the bare URL without query params was the cause of "undefined" values rather than a code bug.
- depends-on: none

## env-variables
- status: **practicing**
- last-reviewed: 2026-08-04
- evidence (2026-08-04): created `.env` with the real Places key, read it via `process.env.GOOGLE_API_KEY` in `api/api/viewpoints.js`. Made and self-corrected two real mistakes: capitalized `Process.env` (JS is case-sensitive, caught via question), and a trailing `;` in `.env` (a JS-syntax habit bleeding into a file format that doesn't use it — caught via question, then fixed). Confirmed the real key printed correctly in the terminal after restarting `vercel dev`.
- depends-on: none

## google-places-api-new
- status: **practicing**
- last-reviewed: 2026-08-10
- evidence (2026-08-10): looked up real Places API (New) field names for reviews/AI summary via docs rather than guessing, confirmed both populated with real content. Debugged an end-to-end integration issue methodically: distinguished production vs. localhost testing, used the Network tab's Request URL/Status/Response to isolate a `200 OK` empty response from a `404`, and correctly reasoned that Google's `radius` field is in meters while the dropdown values represented kilometers — fixed by converting the actual `value` attributes (10000/20000/50000), not just the display labels.
- evidence (2026-07-31): explicitly stated "i dont know... how to use the places api to retreive the sunset locations".
- evidence (2026-08-04): built the real Nearby Search (New) POST request in `api/api/viewpoints.js` from a plain-language contract description (not shown code). Made and self-corrected real mistakes along the way — translated curl syntax to `fetch` options, fixed an array where a header needed a joined string, fixed a flat dotted key (`'locationRestriction.circle'`) into proper nesting, reordered `response.ok` check before `.json()` parsing after comparing to their own `script.js` pattern. Independently diagnosed a `400` error caused by an invalid `includedTypes` value by reading Google's docs, without being told the fix. Confirmed real place data (names, addresses, photos) returned end-to-end.
- depends-on: [[vercel-serverless-functions]]

## browser-geolocation-api
- status: **practicing**
- last-reviewed: 2026-08-02
- evidence (2026-08-02): wrote `getGeoLocation()` calling `navigator.geolocation.getCurrentPosition(success, error)`, self-corrected a `.`/`,` typo after being asked to compare them, and fixed a parameter-naming mismatch (renamed `success` to `position` to match its use in the body) after a guided question. Tested live in browser — got the permission prompt and confirmed coordinates logged. First contact today — capped at practicing.
- depends-on: none

## arrow-functions-and-callbacks
- status: **practicing**
- last-reviewed: 2026-08-02
- evidence (2026-08-02): refactored named `success`/`error` functions into inline arrow-function arguments unprompted, stated this was just learned. Correctly used callback parameters after one guided fix.
- depends-on: none

## google-maps-directions-links
- status: **seed**
- evidence: not yet built or discussed beyond the original feature request.
- depends-on: none

## git-version-control
- status: **practicing**
- last-reviewed: 2026-08-08
- evidence (2026-08-01): ran `git init` and correctly predicted a new repo would connect to an account (fixed to: local-only, no account link — misconception corrected and confirmed understood on the spot). Wrote `.gitignore` themselves, correctly reasoning `.env*` would still catch a plain `.env` file. Set `user.name`/`user.email` via `git config --global`, staged with `git add .`, and made the first commit (`git commit -m "First ever Commit"`) after self-correcting a `config`/`commit` typo once pointed out. First contact today — capped at practicing, not understood, until a later review confirms it stuck.
- evidence (2026-08-08): passed a spaced review after a week away — correctly explained a commit as a checkpoint in history distinct from a plain file save. Also made 4 more real commits across Sections 2-3 in the meantime without prompting on syntax, only reminders to do it.
- depends-on: none

## gitignore-patterns
- status: **practicing**
- last-reviewed: 2026-08-08
- evidence (2026-08-01): correctly reasoned that a bare `.env` line matches only that exact filename, then asked whether `.env*` would still protect the real key — showing they understood the wildcard as "match this plus anything after," not just copying a suggestion.
- evidence (2026-08-08): passed a spaced review after a week away — correctly explained `.env*` covers "different versions of `.env`" in their own words.
- depends-on: [[git-version-control]]
