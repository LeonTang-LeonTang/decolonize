# CHANGELOG — Pass 4 (WebGL scroll museum)

**2026-10-31** — Leon: raise immersion to Kaizen / UNESCO / Kristallnacht level with real senior WebGL, hold / chapter portals / scroll museum, real 3D scenes — at least The Boat. Article remains primary.

## Tech choice: **three.js r170** (not nanogl)

Studied `/workspace/refs/kaizen-gh` (`nanogl` + `nanogl-gltf` + `nanogl-pbr` + Theatre cameras + Activity graph) and `/workspace/refs/theboat` (R3F layered planes + ScrollControls).

**Why three.js instead of nanogl for this pass:**
- Kaizen’s nanogl stack is inseparable from their custom webpack/vue-cli engine, Theatre timeline, AssetDatabase, SceneActivityManager, and GLTF butterfly pipeline.
- Wiring nanogl* cleanly into this Vite + Vue 3 academic rail would mean porting most of that engine — out of shippable scope for one pass.
- three.js r170 ESM installs cleanly, hits the same **UX** targets (scroll-coupled camera, chapter portals / holds, 3D gallery room, Boat-like layered evidence planes), and keeps the article DOM readable.

Honest gaps vs full Kaizen are listed below.

## What shipped

| Piece | Where | Role |
|---|---|---|
| `MuseumApp` | `src/webgl/MuseumApp.ts` | WebGLRenderer, scroll camera, immersion fade |
| `MuseumGallery` | `src/webgl/MuseumGallery.ts` | Corridor (A–F frames) + Core A dual-painting room |
| `LayeredPlanes` | `src/webgl/LayeredPlanes.ts` | Boat-like 2.5D parallax evidence walls per Core |
| `frames.ts` | `src/webgl/frames.ts` | Real `public/media/` stills only (no AI-fake artworks) |
| `WebGLMuseumLayer` | fixed canvas z-index 0 behind article | Ambient + portal immersion |
| `ChapterPortal` | sticky hold scrubbing portal progress | Kaizen-like chapter portal |
| Portal: `intro-museum` | Act2Intro | Walk the six-case corridor |
| Portal: `coreA-gallery` | Act2A | Enter dual-painting room (Saleh ↔ Pieneman) |
| Reduced motion | `prefers-reduced-motion` | No WebGL; static portal card |

Academic rail unchanged: 定义 → 论证 → 例证 → 总结. Article-first hierarchy kept; WebGL is immersion / evidence, not a replacement for prose.

## Performance

- DPR capped at 1.75; no shadows; fog + standard materials
- Desktop 60fps target on mid GPUs; canvas `pointer-events: none`
- Immersion opacity lerped; ambient Core layers ~0.22 so prose stays primary

## Recover

- Pre-pass4 (do not overwrite): `recover/pre-webgl-museum-20261031` @ `bca9350`
- Post-pass4: `recover/pass4-webgl-museum-20261031` @ `f9b817e`

## Honest gaps vs full Kaizen / Kristallnacht / UNESCO

| Kaizen / reference | This pass |
|---|---|
| nanogl custom GLSL (stretch-scroll, bloom HQ, foam, lily) | three.js Standard/Basic materials; no custom post stack |
| GLTF butterflies / frogs + nanogl-gltf | No GLTF creatures |
| Theatre.js camera takes | ScrollTrigger scrub + lerp camera paths |
| Hold-to-advance gesture + HoldCursor | Scroll-scrubbed sticky portals (same narrative pause, different input) |
| XR / WebXR museum walk | Not implemented |
| Multi-scene Activity graph (Scene1–4, Archives, Origami) | Two gallery modes + layered planes shared across Cores |
| Kristallnacht chapter “rooms” with archival film planes | Corridor + Core A room; B–F share ambient layers, not dedicated rooms yet |
| UNESCO-grade multilingual i18n + full archival CMS | Chinese academic rail only |

Next passes if desired: dedicated portal rooms for B–F, light custom shaders (vignette / film grain in GL), optional GLTF plinths, WebXR peek mode.

## Version

`0.5.0` — continues PR #1 on `polish/kaizen-boat-deepdive`.
