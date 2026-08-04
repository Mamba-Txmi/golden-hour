---
# learning/file-map.md — Phase 2 output (adopt-project)
---

## Root

- `index.html` — page structure and element ids that `script.js` hooks into (search box, result boxes). **known** — self-authored; understands the `display:none` → `display:block` toggle purpose (hide results until a location is searched), but not the timing subtlety (see below). → [[dom-visibility-toggling]]
- `styles.css` — visual styling (gradients, glass/blur cards, layout). **known** — self-authored, straightforward CSS, no probe needed.
- `script.js` — all app logic: geocoding branch (postcode vs city), browser geolocation, fetches to OpenWeather/postcodes.io/sunrisesunset.io, rendering results into the DOM. **known** — postcode/city branch, the `getGeoLocation()` function (geolocation callback + scope refactor of `getSunData`/DOM consts to top level), and the display-timing fix (now flips visible only after data renders in both paths) were all self-authored with guided debugging. → [[async-fetch-flow]], [[dom-visibility-toggling]], [[browser-geolocation-api]], [[js-function-scope]], [[arrow-functions-and-callbacks]]
- `.vscode/launch.json` — **generated**, one-liner: VS Code's Edge-launch config for opening `index.html` directly. Machine-made, never hand-edit.
- `skills-lock.json` — **generated**, one-liner: records which learning-method skills are installed and their source hashes. Not part of the app.
- `.gitignore` — **known**: self-authored the `.env*` line (correctly reasoned it future-proofs beyond a single `.env` file); OS/editor cruft lines (`Thumbs.db`, `.DS_Store`) are standard boilerplate, not yet individually probed. → [[gitignore-patterns]]
- `.env` — **known**: self-authored, holds the real Google Places API key as `GOOGLE_API_KEY`. Correctly excluded from git by the `.env*` pattern above. → [[env-variables]]
- `.git/` — **generated**, one-liner: git's own internal database (commit history, staged changes). Machine-managed, never hand-edit directly — interact only through `git` commands. → [[git-version-control]]

## api/

- `api/api/viewpoints.js` — **known**: self-authored Vercel serverless function proxying Google Places API (New) Nearby Search — reads the key from `process.env`, POSTs to `places:searchNearby` with fixed test coordinates, returns real place data. → [[vercel-serverless-functions]], [[google-places-api-new]], [[api-key-security]], [[async-fetch-flow]]

## .agents/skills/

- `.agents/skills/adopt-project/`, `next-lesson/`, `plan-journey/`, `start-project/` — **generated**, one-liners: the learning-method skill files themselves (installed via the `skills` CLI). Not part of the app; never hand-edit.

## learning/

- `learning/project.md` — **generated** by this process (Phase 1 output).
- `learning/file-map.md` — **generated** by this process (this file).
- `learning/knowledge-graph.md` — **generated** by this process (Phase 2 output, written alongside this).

## Not yet present (relevant to the plan)

- No `.git` — version control hasn't been set up yet. → [[git-version-control]]
- No `.env`/env-var handling anywhere — will become load-bearing once the Vercel function needs to hold a secret key. → [[env-variables]]
- No `package.json` — no dependencies yet; static site only so far.
