# CHANGELOG — Pass 5 (Kaizen depth: rooms B–F · GLSL/post · GLTF · Theatre-like · XR)

**2026-10-31** — Leon: Pass 4 still short of full Kaizen (GLSL/post, GLTF, Theatre, XR, rooms B–F). Close those gaps as far as one box pass can. Capabilities, not excuses. Article remains primary.

## Recover

- Pre-pass5 (do not overwrite): `recover/pre-pass5-kaizen-depth-20261031` @ `61462e2` (verified on origin)
- Post-pass5: `recover/pass5-kaizen-depth-20261031` (created after this land)

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
