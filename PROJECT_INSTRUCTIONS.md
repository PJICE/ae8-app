# ae8-app — Project Instructions
## AR-EMPYR8 (AE8) · Built Different
### Owner: Consensus Protocol LLC (PBX) · Initialized: 2026-04-23

Governance in this project is governed by `CONSTITUTION.md` (portable rules)
plus the project-specific layer in this file. In case of conflict, the
constitution wins on process; this file wins on project scope.

---

## 1. What this is

A single-file Progressive Web App for youth / HS / college football: gear
catalog, camp listings, map of event locations, film feed, and player
profile. Mobile-first portrait, built to install to home screen and work
offline.

- **Repo:** `github.com/PJICE/ae8-app`
- **Brand name:** AR-EMPYR8 (app ID: AE8)
- **Tagline:** "Drip, Camps, Map & Locker Room"
- **Audience:** grade-school through college football players and their
  parents

## 2. Architecture

| Layer | Choice |
|---|---|
| Shell | `index.html` — single file, ~3,728 lines, ~193 KB |
| JS | Vanilla, inline in `index.html`. No build step. No framework. |
| Styling | Inline `<style>` block. CSS variables only. |
| Maps | Leaflet 1.9.4 via unpkg CDN |
| Offline | `sw.js` — network-first, same-origin only, videos never cached |
| Manifest | `manifest.json` — standalone, portrait, black theme |
| Backend | **None.** Client-side only. |
| Hosting | GitHub Pages (primary). Local via `python3 -m http.server 8000`. |

### Tabs (source of truth: section IDs in `index.html`)
| Tab | Section ID | Purpose |
|---|---|---|
| Home | `#panel-home` | Welcome, approved list, camps teaser |
| Drip | `#panel-drip` | 8-category gear catalog, 70 products |
| Camps | `#panel-camps` | Camp listings with filters (FBU, UA, college, HS, youth) |
| Map | `#panel-map` | Leaflet map of camp locations |
| Film | `#panel-film` | Highlight reel feed + upload |
| Locker | `#panel-locker` | Sign in / sign up / profile |

### Assets
- `imgs/` — 70 product images, named `{category}-{brand}-{model}.{ext}`
- `videos/` — 14 category intro videos + player highlight reels
- `audio/` — 22 music tracks for the in-app player

## 3. Brand system

| Token | Value |
|---|---|
| `--black` | `#000000` (base) |
| `--pink` | `#FF0099` (primary accent) |
| `--pink-light` | `#FF66C4` |
| `--pink-dark` | `#CC0077` |
| `--pink-glow` | `rgba(255,0,153,0.35)` |
| `--white` | `#FFFFFF` |
| `--gray` | `#888888` |
| `--nav-h` | `62px` (tab nav height) |
| `--player-h` | `86px` (audio player height) |
| Font stack | `-apple-system, 'Arial Black', Arial, sans-serif` |

**Do not** drift to other colors without updating this file and the CSS
variables together in the same commit.

## 4. Deployment

### Primary: GitHub Pages
Repo → Settings → Pages → Source: `Deploy from a branch` → Branch: `main`
/ `root` → Save. URL: `https://pjice.github.io/ae8-app/`.

### Local dev
```
cd ae8-app
python3 -m http.server 8000
# open http://localhost:8000
```

Leaflet CSS/JS load from unpkg. Service worker requires HTTPS or
`localhost` to register.

### Ultron
Not required for this project. The 4090s do not accelerate a static
PWA. Keep Ultron out of the loop unless / until a backend is added.

## 5. Project-specific rules (layered on top of constitution)

1. **Single-file constraint.** `index.html` holds everything. Do not
   split into separate JS / CSS files without explicit PBX sign-off and
   an updated build / bundle story.
2. **Service worker cache bump required.** Any change to app shell
   behavior (new asset in PRECACHE, routing logic change) bumps
   `CACHE_NAME` in `sw.js` by one (`ae8-v2` → `ae8-v3`). Forgetting this
   leaves users on a stale shell.
3. **All asset paths relative.** GitHub Pages serves from a subpath;
   absolute paths break in production. No leading `/` on image or asset
   references inside `index.html` unless PBX decides on a custom domain.
4. **Cross-origin assets skip the SW cache.** YouTube iframes, Leaflet
   tiles, and any other CDN content must not be cached by `sw.js`.
   Current `sw.js` already enforces this — do not regress.
5. **Videos are never cached.** The `.mov|.mp4|.webm` skip in `sw.js` is
   deliberate. They're large and change often. Do not "optimize" by
   adding them to PRECACHE.
6. **Audio track licensing.** Files in `audio/` are named after
   commercial tracks. Before any public deployment beyond friends-and-
   family testing, PBX must confirm licensing or swap to original /
   licensed music. Do not treat a working demo as rights-cleared.
7. **Camp data is hand-maintained.** Camp cards in `#panel-camps` are
   hardcoded in `index.html` with dates. They go stale. A stale camp is
   worse than no camp — gate visibility on date or remove past camps
   each session until a data source is wired up.

## 6. Banned for this project (in addition to constitution Part 5)

- **Build tools.** No webpack, Vite, Parcel, Rollup. If it needs a build
  step, it's the wrong choice for this project right now.
- **Frameworks.** No React, Vue, Svelte, Solid, etc. Vanilla JS is the
  design decision, not a limitation.
- **Node runtime.** No server-side JS. No `package.json` in this repo
  without a long conversation first.
- **Analytics that phone home.** No Google Analytics, Mixpanel, etc.
  without PBX sign-off. PWA installs on kids' phones — privacy bar is
  high.

## 7. Known issues / open work

*(Living list — update every session. Empty at initialization.)*

- [ ] Confirm GitHub Pages deploy target and publish URL.
- [ ] Decide licensing plan for `audio/` tracks before public launch.
- [ ] Camp cards dated April 2026 need review / pruning.
- [ ] Add favicon / `icon-192.png` / `icon-512.png` (referenced by
      `manifest.json`, not currently in repo).
- [ ] No `.gitignore` in repo at init — added this session.
- [ ] No README in repo at init — consider a short one pointing to this
      doc.

## 8. Handoff pointers

- Latest session log: `HANDOFF_2026-04-23.md`
- Run the regression / smoke check before committing any non-trivial
  change: currently manual (open in browser, click through tabs, verify
  SW registers, verify map renders, verify audio plays). A scripted
  smoke check is a future work item.

## 9. Adaptation checklist (filled in per constitution Part 8)

- [x] Project name: AR-EMPYR8 (AE8)
- [x] Repo URL: `github.com/PJICE/ae8-app`
- [x] Deploy target: GitHub Pages (TBD confirm)
- [x] Brand colors: `#FF0099` pink on `#000000` black
- [x] Tech stack: vanilla HTML/CSS/JS + Leaflet + SW
- [x] Project-specific inviolable rules: Section 5 above
- [x] Project-specific banned tech: Section 6 above
- [x] Known issues / open work: Section 7 above
