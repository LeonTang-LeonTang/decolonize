# CHANGELOG — Pass 5 (Kaizen depth: rooms B–F · GLSL/post · GLTF · Theatre-like · XR)

## Pass 5b — visibility fix (2026-10-31)

Leon: Pass 5 features (rooms B–F, GLSL, GLTF, Theatre cams, XR) were **not visible at all**. Root cause: canvas CSS `opacity: 0` only raised via `immersion` floats (~0.05–0.93), so the museum read as “no change.”

### Recover

- Pre-fix (do not overwrite): `recover/pre-pass5-visibility-fix-20261031` @ `fb6fd6a`
- Post-fix: `recover/pass5b-visibility-20261031` (this tip)

### What changed

| Fix | Detail |
|---|---|
| Portal immersion ~1.0 | `targetImmersion = 0.94 + portalT * 0.06`; Act2 ambient 0.36–0.48 (was 0.05–0.22) |
| `.museum-gl--active` | Full `opacity: 1 !important` when `portalT > 0.05`; no longer rely on tiny immersion alone |
| Brighter gallery | Lighter walls/floors, stronger lights, room label strip on back wall |
| Texture / GLTF fallbacks | Solid labeled planes if stills 404; procedural pedestal/frame if GLTF fails |
| Portal window | Top ~55%+ clear gradient; HUD/caption cards darkened only |
| XR hint | Always show control when ready; disabled **本设备无 VR** without headset |
| Badge | **三维展厅已开启** when museum portal is active |

### Honest note

WebXR enter still needs a headset / browser `immersive-vr` support. On Mac Desktop without VR the button correctly shows **本设备无 VR** — that is expected, not a missing feature. Rebuild box preview (`npm run build` + `:4175`); Mac Desktop app must also rebuild if viewing a local Electron/Desktop build.

---

**2026-10-31** — Leon: Pass 4 still short of full Kaizen (GLSL/post, GLTF, Theatre, XR, rooms B–F). Close those gaps as far as one box pass can. Capabilities, not excuses. Article remains primary.

## Recover

- Pre-pass5 (do not overwrite): `recover/pre-pass5-kaizen-depth-20261031` @ `61462e2` (verified on origin)
- Post-pass5: `recover/pass5-kaizen-depth-20261031` @ `512e1bd`

## What shipped

| Goal | Implementation |
|---|---|
| **1. Rooms B–F** | Dedicated gallery modes `coreB`–`coreF` in `MuseumGallery`; framed Core stills from `frames.ts`; `ChapterPortal` on Act2B–F (`coreB-gallery` … `coreF-gallery`) same system as intro + Core A |
| **2. Custom GLSL / post** | `PostFX` EffectComposer: RenderPass → UnrealBloomPass (lite) → custom **vignette + film grain** ShaderPass (`src/webgl/shaders/vignetteGrain.frag.ts`) |
| **3. GLTF props** | `GalleryProps` + `GLTFLoader`: `/public/models/museum-pedestal.gltf` + `picture-frame.gltf` (CC0-style architecture). Pedestals in corridor + each Core room; empty decorative frames. **Artwork textures never baked into GLTF** |
| **4. Theatre-like camera** | `cameraTakes.ts` — keyframed hold cameras per portal, scrubbed by existing GSAP ScrollTrigger `portalT`. **Choice: custom keyframes, not Theatre.js project file** (documented in module header) |
| **5. XR** | WebXR probe + “进入 VR 展厅” button when `immersive-vr` is supported. Post stack disabled while presenting. On desktop without headset the button stays hidden — deferred gracefully, not burned |

Academic rail / article-first / artwork spine unchanged. Educational stills only; no AI-fake artworks.

## Tech notes

- Engine remains **three.js r170** (Vite-stable). Full Kaizen nanogl + Theatre Activity graph still not ported — see gaps.
- Camera FOV also keyframed per take; immersion lerp unchanged.
- DPR cap 1.75; bloom intensity kept low so prose stays readable.

## Honest remaining gaps vs makemepulse Kaizen

| Kaizen | Pass 5 |
|---|---|
| nanogl custom stretch-scroll / foam / lily / HQ bloom stack | three.js EffectComposer vignette+grain + bloom-lite |
| nanogl-gltf butterflies / frogs + PBR material graph | Static oak pedestal + empty frame GLTFs (architecture only) |
| Theatre.js studio project + sequenced camera takes tied to Activity | Keyframe table scrubbed by ScrollTrigger (same *feel*, no `.theatre` file) |
| HoldCursor + hold-to-advance gesture | Scroll-scrubbed sticky portals (Pass 4 input model kept) |
| Multi-scene Activity graph (Scene1–4, Archives, Origami) | One MuseumApp, seven gallery modes + LayeredPlanes |
| Production WebXR museum walk with controllers | Optional immersive-vr enter when browser reports support; no controller interaction / teleport |
| Full archival CMS + i18n | Chinese academic rail only |

## Version

`0.6.0` — continues PR #1 on `polish/kaizen-boat-deepdive`.
