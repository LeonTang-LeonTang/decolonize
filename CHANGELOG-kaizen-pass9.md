# CHANGELOG — Pass 9 (demo polish · unforced portals · nanogl deferred)

**2026-10-31** — Overnight Pass 9 while Leon sleeps. Make immersion feel “finished” for coursework demo without flipping museum-first. Article×PPT spine retained.

## Recover

- Pre-pass9 (do not overwrite): `recover/pre-pass9-demo-polish-20261031` @ `fd63b56`
- Post-pass9: `recover/pass9-demo-polish-20261031` @ _(filled after feature commit)_

## Version

**`0.9.5`** — honest bump. Not `1.0.0-demo`: nanogl deferred; Boat R3F / full Kristallnacht CMS / Theatre Activity still open.

## What shipped

| Goal | Implementation |
|---|---|
| **1. Portal activation race** | `portalClaim.ts` coordinated claim + debounced release; ChapterPortal ST `start: top 85%` / `end: bottom 15%`; MuseumApp 160ms portal holdover; Lenis native-scroll → `ScrollTrigger.update`; mode toggles portal-aware immersionScale. **Shots prove rooms WITHOUT `__museumApp.setState`. |
| **2. Boat parallax** | 3 real-pack layers per Core; stronger drift + micro-rotate in `ParallaxBackdrop`. Core D: Democracy Monument primary; Death Railway faint deep only. |
| **3. Multi-beat → portal handoff** | Act2A–F reorder: EvidenceStrip → ChapterHold → handoff label → ChapterPortal. |
| **4. Intro corridor readable** | Brighter MeshBasic shell/ambient/frames; larger corridor hung stills; clearer corridor label. Softer FogExp2. |
| **5. Cold-start** | Inline warm paint in `index.html`; canvas warm underpaint; longer loader crossfade — no black void flash. |
| **6. Kaizen nanogl** | ≤90 min eval → **DEFER** (see `docs-nanogl-pass9-decision.md`). Deepened three.js bloom/grain/`uFogLift` instead. |

## Closed vs refs (honest)

| Reference | Pass 9 | Still open |
|---|---|---|
| Portal race / unforced headless | Claim registry + holdover; unforced shots | ANGLE/SwiftShader can still flake |
| The Boat parallax | 3-layer CSS parallax + drift | Not full R3F waves/boat world |
| Inside Kristallnacht | Hold → portal handoff | Not CMS cinematic director |
| Kaizen nanogl + Theatre | Documented deferral; deeper three.js GLSL | Still GSAP ST, not nanogl/Theatre |

## Architecture (non-negotiable)

1. Academic rail spine unchanged.
2. EvidenceStrip / parallax / WebGL / multi-beat = evidence after slide thesis.
3. No AI-faked artworks; Core D Democracy Monument shortlist locked.
