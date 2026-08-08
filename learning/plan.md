---
# learning/plan.md — Phase 3 output (adopt-project)
---

## Inherited stack decisions

- **Plain HTML/CSS/JS, no framework** — inherited: **understood**. Reasoned through together (2026-08-01): a small single-page app with a handful of DOM updates doesn't need React's component model or build step; the cost (learning JSX, a bundler) isn't earned yet. Revisit only if the app grows real component complexity.
- **Vercel + a serverless function for the Places API proxy** — inherited: **still fuzzy**, honestly stated ("i dont know anything about vercel serverless function"). Revisited in **Section 3** below.

## Sections

### Section 1 — Make the ground solid
No `.git` exists yet. `git init`, a sensible `.gitignore` (env files, editor cruft), and a baseline commit that includes everything currently on disk — including `learning/`.
Deliverable: the project can never be lost again.

- [x] `git init` the project
- [x] Write a `.gitignore` (env files, editor/OS cruft) — even though no `.env` exists yet, Section 3 will add one
- [x] Stage everything and make a baseline commit

### Section 2 — Geolocation input + radius selector
Add a "use my location" option (browser Geolocation API) alongside the existing typed city/postcode input, and a radius selector (dropdown or slider) that will later scope the Places search. Wire both into the existing `testUserInput()` flow so sunset-time lookup works from either input path.
**Reclaim task**: [[dom-visibility-toggling]] — the `sunInfo.style.display = 'block'` line that fires before any fetch resolves (confirmed accidental, not designed). Building a real loading state for geolocation resolving is the natural place to explain the current behavior, break it on purpose, predict the empty-box flash, and fix it properly.
Deliverable: you can search by typed location or by "use my location," and pick a radius.

- [x] Add the two new UI controls to `index.html`: a "use my location" button and a radius dropdown (markup only, no behavior yet)
- [x] Style the new controls in `styles.css` so they fit the existing look
- [x] Implement `navigator.geolocation.getCurrentPosition` in `script.js` to fetch the browser's coordinates
- [x] Wire those coordinates into the existing sunset-time flow, bypassing the geocoding step — reclaim task [[dom-visibility-toggling]] completed here, ahead of schedule, in both `getGeoLocation` and `findGoldenHour`
- [x] Read the selected radius value and store it for later (Section 4 will consume it)
- [x] Handle geolocation errors (permission denied, unsupported browser) with a user-facing message

### Section 3 — Serverless proxy for the Places API key
Set up a Vercel serverless function in `api/api/viewpoints.js` (currently an empty stub) that holds the Google Places API key server-side via an environment variable, and deploy it so the key is verifiably absent from shipped client code.
**Reclaim task**: [[env-variables]] — no `.env`/env-var handling exists anywhere yet (the OpenWeather key is still hardcoded client-side). This section is where that concept turns load-bearing for the first time.
Deliverable: calling your deployed function returns data, and the Places key never appears in browser dev tools.

- [x] Write a minimal serverless function in `api/api/viewpoints.js` that returns a small test JSON response
- [x] Run `vercel dev` locally and hit the function's local URL to see that test response
- [x] Create a `.env` file holding the real Google Places API key and read it in the function via `process.env`
- [x] Have the function call the Google Places API (New) server-side using that key, and return real data (still tested locally)
- [x] Deploy to Vercel and add the API key as an environment variable in the deployed project too
- [x] Verify in the browser's Network tab that calling the deployed function never exposes the real key to the client

### Section 4 — Nearby places, reviews, and AI summaries
From the serverless function, call the Google Places API (New) — Nearby Search using the geocoded lat/lon and chosen radius, with a field mask that includes reviews and the generative/AI summary fields — and render the results in the UI.
**Reclaim task**: [[async-fetch-flow]] — still at seed status (never explicitly probed). Building this second, richer fetch chain is the place to nail down *why* `async`/`await` is structured the way it is, not just that it works.
Deliverable: searching a location shows a real list of nearby sunset-watching spots with reviews and a short AI summary each.

### Section 5 — Directions via Google Maps
Add a "Get Directions" link/button per place that opens Google Maps directions to that spot.
**Reclaim task**: [[api-key-security]] — currently at "introduced" (you reasoned through why the Places key needs to be server-side, but haven't applied it a second time). Now that the proxy pattern exists and works, move the still-exposed OpenWeather key behind it too, flipping this concept from introduced to practiced.
Deliverable: every listed place has a working one-click link to directions in Google Maps.

## What this leaves out

Nothing was parked or trimmed — the whole feature set you described maps directly onto Sections 2–5. No extra scope was added beyond what you asked for.

## Next step

Run `/next-lesson` — it works through Section 1 first (git baseline), then each section in order, one small step at a time with fill-in placeholders and checks.
