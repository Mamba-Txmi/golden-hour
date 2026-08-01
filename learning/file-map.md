---
# learning/file-map.md — Phase 2 output (adopt-project)
---

## Root

- `index.html` — page structure and element ids that `script.js` hooks into (search box, result boxes). **known** — self-authored; understands the `display:none` → `display:block` toggle purpose (hide results until a location is searched), but not the timing subtlety (see below). → [[dom-visibility-toggling]]
- `styles.css` — visual styling (gradients, glass/blur cards, layout). **known** — self-authored, straightforward CSS, no probe needed.
- `script.js` — all app logic: geocoding branch (postcode vs city), fetches to OpenWeather/postcodes.io/sunrisesunset.io, rendering results into the DOM. **known** for the postcode/city branch (`/\d/.test(searchInput)`, evidenced). **parked** for the async/loading-state handling — `sunInfo.style.display = 'block'` fires before any fetch resolves, so there's a moment of visible-but-empty boxes; acknowledged as accidental, not designed. Revisit when building the Places results loading state. → [[async-fetch-flow]], [[dom-visibility-toggling]]
- `.vscode/launch.json` — **generated**, one-liner: VS Code's Edge-launch config for opening `index.html` directly. Machine-made, never hand-edit.
- `skills-lock.json` — **generated**, one-liner: records which learning-method skills are installed and their source hashes. Not part of the app.

## api/

- `api/api/viewpoints.js` — **parked**, empty stub. Intended home for a Vercel serverless function to proxy Google Places API (New) calls so the key never ships to the client. → [[vercel-serverless-functions]], [[api-key-security]]

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
