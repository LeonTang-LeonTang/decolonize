# CHANGELOG — Pass 11 (Boat R3F-grammar 3D scroll · Kristallnacht cinematic director)

**2026-10-31** — Overnight Pass 11 while Leon sleeps. Incremental leap toward The Boat’s scroll-driven 3D horizon world and Inside Kristallnacht’s data-driven dark chapters — article×PPT spine stays primary. **No nanogl. No portal-force regression. No React/R3F island.**

## Recover

- Pre-pass11 (do not overwrite): `recover/pre-boat-r3f-kristallnacht-20261031` @ `4f4629d`
- Optional tag: `recover/pre-boat-r3f-kristallnacht-20261031-tag`

## Version

**`0.11.0`** — Boat 3D scroll world + cinematic director config. Not full R3F Boat / full Kristallnacht CMS.

## What shipped

| Goal | Implementation |
|---|---|
| **1. Boat 3D scroll world** | `BoatScrollWorld` (raw three.js r170) + `BoatScrollCanvas.vue` behind EvidenceStrip. Horizon/sky, 4 wave layers, drifting clouds, fog, boat silhouette, evidence planes in depth; camera dollies with strip scrub progress. Comic EvidenceStrip retained on top. CSS ParallaxBackdrop kept as soft secondary texture. |
| **2. Kristallnacht cinematic director** | `cinematicDirector.ts` — Leon-editable wipe directors (height/darkness/tone/flash/stinger) + per-Core claim card styles (monument/editorial/whisper) + beat flash timings. `ChapterWipe` consumes `to-id`; `ChapterHold` consumes `section-id` claim styles. |
| **3. Locks** | Nanogl deferred. Core D = Democracy Monument. Aichi half-line only. 阅读模式 / SlideChapter / ThesisStrip untouched. Unforced `portalClaim` untouched. Real pack + The Boat public demo textures (educational). No AI-faked artworks. |

## Files

- `src/webgl/BoatScrollWorld.ts` — three.js voyage engine
- `src/components/ui/BoatScrollCanvas.vue` — Vue portal
- `src/content/cinematicDirector.ts` — wipe + claim config
- `src/components/ui/EvidenceStrip.vue` — integrates Boat 3D
- `src/components/ui/ChapterWipe.vue` — director-driven wipes
- `src/components/ui/ChapterHold.vue` — claim card weights + flash timing
- `src/components/sections/Act2A–F.vue` — `section-id` on holds
- `src/App.vue` — `to-id` on wipes
- `public/media/boat-world/*` — wave/fog/cloud/boat/bg from The Boat public ref (educational)
- `package.json` → `0.11.0`

## Closed vs refs (honest)

| Reference | Pass 11 | Still open |
|---|---|---|
| The Boat R3F ScrollControls world | Vue+three scroll voyage: waves/horizon/boat/depth panels | Not React R3F; no rain/audio positional; no multi-page ScrollControls narrative |
| Inside Kristallnacht CMS / Theatre | Editable wipe + claim + beat timing config | Not full CMS UI / Theatre Activity authoring |
| Kaizen nanogl | Still deferred | three.js path only |
| Unforced portals | Untouched | ANGLE flake possible |

## Architecture (non-negotiable)

1. Academic rail / SlideChapter spine unchanged.
2. EvidenceStrip / holds / WebGL = evidence after slide thesis.
3. No AI-faked historical artworks; Core D Democracy Monument shortlist locked.
4. Prefer raw three in Vue over adding React/R3F to the stack.
