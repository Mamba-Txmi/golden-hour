---
# learning/file-map.md — Phase 2 output (adopt-project)
---

## Root

- `index.html` — page structure and element ids that `script.js` hooks into: search box, geolocation/radius controls, sunset results, and `#nearby-sun-place` (the place-cards container). **known** — self-authored throughout, including all Section 2/4 additions.
- `styles.css` — visual styling (gradients, glass/blur cards, layout, `.card` place cards with `overflow-y: auto`). **known** — self-authored throughout. → [[css-box-overflow]]
- `script.js` — all app logic: geocoding branch (postcode vs city), browser geolocation, fetches to OpenWeather/postcodes.io/sunrisesunset.io/your own Places proxy, rendering results into the DOM. **known** — postcode/city branch, `getGeoLocation()`, the display-timing fix, and now `getNearbyPlaces(lat, lon, radius)` (calls `/api/api/viewpoints`, called from both search paths after the sunset lookup) were all self-authored with guided debugging. → [[async-fetch-flow]], [[dom-visibility-toggling]], [[browser-geolocation-api]], [[js-function-scope]], [[arrow-functions-and-callbacks]], [[google-places-api-new]]
- `.vscode/launch.json` — **generated**, one-liner: VS Code's Edge-launch config for opening `index.html` directly. Machine-made, never hand-edit.
- `skills-lock.json` — **generated**, one-liner: records which learning-method skills are installed and their source hashes. Not part of the app.
- `.gitignore` — **known**: self-authored the `.env*` line (correctly reasoned it future-proofs beyond a single `.env` file); OS/editor cruft lines (`Thumbs.db`, `.DS_Store`) are standard boilerplate, not yet individually probed. → [[gitignore-patterns]]
- `.env` — **known**: self-authored, holds the real Google Places API key as `GOOGLE_API_KEY`. Correctly excluded from git by the `.env*` pattern above. → [[env-variables]]
- `.vercel/` — **generated**, one-liner: created automatically when the project was linked/deployed via the Vercel CLI (`vercel dev` / `vercel --prod`); holds local project-link metadata. Auto-added to `.gitignore` by the CLI itself. Machine-managed, never hand-edit.
- `.git/` — **generated**, one-liner: git's own internal database (commit history, staged changes). Machine-managed, never hand-edit directly — interact only through `git` commands. → [[git-version-control]]

## api/

- `api/api/viewpoints.js` — **known**: self-authored Vercel serverless function proxying Google Places API (New) Text Search — reads lat/lon/radius from `req.query`, computes a `locationRestriction` bounding rectangle by hand (`radiusToRectangle`), searches with a sunset-relevant `textQuery`, returns real place data (name, address, photos, reviewSummary, rating). → [[vercel-serverless-functions]], [[google-places-api-new]], [[api-key-security]], [[async-fetch-flow]], [[geodesy-bounding-box-math]]
- `api/api/photos.js` — **known**: self-authored second serverless proxy, forwards Google's Photo Media endpoint so the API key never appears in an `<img src>`. Handles binary image data via `response.arrayBuffer()`/`Buffer.from()`. → [[binary-data-handling]], [[api-key-security]]

## .agents/skills/

- `.agents/skills/adopt-project/`, `next-lesson/`, `plan-journey/`, `start-project/` — **generated**, one-liners: the learning-method skill files themselves (installed via the `skills` CLI). Not part of the app; never hand-edit.

## learning/

- `learning/project.md` — **generated** by this process (Phase 1 output).
- `learning/file-map.md` — **generated** by this process (this file).
- `learning/knowledge-graph.md` — **generated** by this process (Phase 2 output, written alongside this).

## Not yet present (relevant to the plan)

- No `package.json` — no dependencies yet; static site only so far. Not currently load-bearing for anything planned.
