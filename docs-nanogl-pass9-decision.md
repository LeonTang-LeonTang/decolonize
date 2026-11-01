# Pass 9 — nanogl evaluation (≤90 min)

**Date:** 2026-10-31 (America/New_York)  
**Outcome:** **DEFER** — deepen three.js GLSL instead. No half-broken nanogl pilot shipped.

## What was evaluated

| Probe | Result |
|---|---|
| npm `nanogl@2.3.2` | Installs; package is a **WebGL micro-framework** (Program / FBO / Texture / Buffer) |
| `package.json` `main` | Points at missing `nanogl.js` — entry is broken for Node resolve |
| Module shape | Per-file ESM (`program.js`, `fbo.js`, …); no scene graph, no cameras, no materials |
| Fit with current museum | Museum is **three.js r170** (MuseumGallery MeshBasic rooms, EffectComposer post, XR). nanogl would replace the GL layer, not plug into one room |
| Theatre Activity | Not present in nanogl core; Kaizen’s Theatre pairing is a separate stack |

## Why no gated pilot

1. **Not a drop-in postFX path** — our bloom/grain already lives in three `EffectComposer` + custom GLSL. Porting one pass to nanogl means a second GL context or abandoning the composer.
2. **Not a clean single-room swap** — rooms are three.js Groups/Meshes with TextureLoader + MeshBasic proof path for ANGLE/headless. A nanogl room would be a parallel renderer fighting Lenis/ST/Vue opacity.
3. **Broken package main** + no Vite-tested app example in-tree → high chance of a half-broken demo before coursework.

## What we shipped instead (Pass 9)

- Stronger three.js post: bloom + dual-frequency grain + `uFogLift` warm fog lift
- Softer scene fog (`FogExp2` density 0.0032) + brighter corridor shell/frames/label
- Portal claim/release + immersion holdover (real race fix; no `__museumApp.setState` in shots)

## Revisit criteria

Only revisit nanogl if we deliberately split a **second** canvas for a nanogl-only experiment room, with three.js remaining the production museum. Not for Pass 9 coursework demo.
nanogl_eval_elapsed_s 324
