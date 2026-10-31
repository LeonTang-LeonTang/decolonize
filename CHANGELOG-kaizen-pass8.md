# CHANGELOG — Pass 8 (immersion: portal harden · Boat parallax · multi-beat holds)

**2026-10-31** — Overnight Pass 8 while Leon sleeps. Push immersion closer to Kaizen / Boat / InsideKristallnacht **without** flipping museum-first. Article/PPT spine (Pass 6 SlideChapter + ThesisStrip) stays primary.

## Recover

- Pre-pass8 (do not overwrite): `recover/pre-pass8-immersion-20261031` @ `fbd54f6`
- Post-pass8: `recover/pass8-immersion-20261031` @ 

## What shipped

| Goal | Implementation |
|---|---|
| **1. Portal visibility hardening** | `preserveDrawingBuffer` + `failIfMajorPerformanceCaveat:false`; `webglcontextlost` / `restored` recovery; portal immersion snaps ≥0.9; brighter MeshBasic shells + **MeshBasic framed stills** (toneMapped off); softer fog; portal clear `0x4a3c2c`; immersionScale floor in portals ~0.94 even in 阅读模式. ThesisStrip still always on. |
| **2. Boat parallax layer** | `ParallaxBackdrop.vue` + `parallaxBySection` — 1–2 depth layers of **real pack** map/paper stills behind each EvidenceStrip (CSS translate parallax). Core D keeps Democracy Monument primary; Death Railway map only as faint deep layer. |
| **3. Kristallnacht multi-beat director** | `ChapterHold` sequences 2–3 beats (claim → artwork reveal → effect) with dark flash transitions, beat dots, press-and-hold to advance beats. Content in `holdBeats.ts` for Core A–F. |
| **4. Kaizen feel (stay on three.js)** | Skipped nanogl (half-broken Vite swap risk). Deepened three.js: dual-frequency GLSL grain, warmer bloom, brighter room labels (`ROOM X · 三维展厅 · ON`), stronger lights, MeshBasic proof path. |
| **5. Article-first retained** | Default 阅读模式; SlideChapter before EvidenceStrip / portal / multi-beat hold. No AI-faked artworks. Core D shortlist locked. |

## Version

`0.9.0` — continues PR #1 on `polish/kaizen-boat-deepdive`.

## Closed vs refs (honest)

| Reference | Pass 8 closed | Still open |
|---|---|---|
| **The Boat** parallax comic | EvidenceStrip + 1–2 real-asset parallax depth layers | Not full R3F waves/boat layered world |
| **Inside Kristallnacht** director | Multi-beat claim→artwork→effect with dark transitions | Not a CMS multi-scene cinematic timeline |
| **Kaizen** WebGL | Deeper three.js grain/bloom/MeshBasic rooms | Still GSAP ScrollTrigger — not nanogl + Theatre Activity |
| Mid-portal WebGL in headless | CONTEXT_LOST recovery + MeshBasic + preserveDrawingBuffer | ANGLE/SwiftShader can still flake; shots prove best-effort |

## Architecture (non-negotiable)

1. Academic rail 定义→论证→例证A–F→总结 stays the spine.
2. EvidenceStrip / parallax / WebGL / multi-beat holds = evidence after the slide thesis.
3. No Tier2 gates; educational fair use for real stills; no AI-fake historical artworks.
