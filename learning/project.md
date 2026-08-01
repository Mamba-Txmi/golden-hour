---
# learning/project.md — Phase 1 output (adopt-project)
---

## About me

I wrote the whole existing codebase myself (`index.html`, `styles.css`, `script.js`) — no AI tool or tutorial scaffold. Confirmed via a live probe: I correctly explained why `testUserInput()` in `script.js` uses `/\d/.test(searchInput)` to branch between postcode and city lookups ("only postcodes have numbers").

I don't yet know:
- How Vercel serverless functions work or how to write/deploy one.
- How to call the Google Places API (New) to retrieve nearby locations, reviews, and AI summaries.

Goal: understand how to build these myself, not just have them work.

## The idea

**Golden Hour** — a sunset-location finder. The user gives a location (typed city/postcode, or browser geolocation) and a search radius. The app returns:
1. The sunset time (and golden hour) for that location.
2. Nearby sunset-watching spots, found via the Google Places API (New), including reviews and AI-generated summaries.
3. A way to get directions to a chosen spot via Google Maps.

The API key for Places is meant to live behind a Vercel serverless function (`api/api/viewpoints.js`, currently an empty stub) so it's never exposed in the shipped client code — unlike the current OpenWeather key, which is hardcoded directly in `script.js`.

## MVP

**In**
- Location input: typed city or UK postcode (existing, working) → geocoded via OpenWeather (city) or postcodes.io (postcode)
- Geolocation input (browser "use my location") — not yet built
- Radius selector for the nearby-places search — not yet built
- Sunset / sunrise / golden-hour time display (existing, working) via sunrisesunset.io
- Nearby sunset-watching locations via Google Places API (New) — not yet built
- Reviews + AI-generated summaries per location (Places API (New) fields) — not yet built
- "Get directions" link to Google Maps for a chosen location — not yet built
- Serverless proxy (Vercel function) so the Google Places API key is never shipped to the client — stub exists, unimplemented

**Frozen**
- None. Nothing here is oversized or half-built relative to what's working — this is a normal-sized feature set for the next build phase, not a trim situation.

**Parking lot**
- (empty for now — nothing extra was proposed beyond the stated scope)

## Triage decision: **Adopt**

Reasoning: the existing code works (typed-location sunset lookup is fully functional), nothing is broken, and the remaining work (geolocation, radius, Places integration, serverless proxy, directions) is a coherent forward build rather than a mess of half-finished parallel features. The stack (static HTML/CSS/JS + a Vercel serverless function) is a standard, learnable, unexceptional choice — no reason to rebuild. We map what exists, then plan forward from here.
