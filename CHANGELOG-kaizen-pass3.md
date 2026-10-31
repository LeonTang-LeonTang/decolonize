# CHANGELOG — Kaizen / Boat immersion Pass 3

**2026-10-31** — Drop license gates, embed educational stills, mux clip audio, deep analysis panels, Boat-like chapter holds.

## Goals (user brief)

1. Remove 「待许可 · Tier2」 / PlaceholderStill gates — educational use may embed copyrighted museum/press stills.
2. Fix silent clips — mux ambient under `public/media/clips/*.mp4`; soft-play when site sound is on without drowning Howler VO.
3. UI leap toward Kaizen / InsideKristallnacht / The Boat — denser holds, full-bleed media, structured analysis (stay Vue3+Vite; no NanoGL port).
4. Rewrite Core A–F analyses from `/workspace/decolonial-packs/*/ANALYSIS.md` into 四轴：解殖民机制／国家与地方／文化与展演效应／媒体装置.
5. Core D remains Democracy Monument / Thai–Axis / documenta14 — **not** Death Railway (correction card kept).

## What changed

### Media embeds (no more dotted placeholders)
- New `EmbeddedStill.vue` replaces `PlaceholderStill` in Act2 A–F.
- Downloaded educational stills under `public/media/stills/{b,c,d,e,f}/`:
  - **B** Utama (ART iT/MOT), CDOSEA (SAM), Hotel Aporia (Aichi + ART iT)
  - **C** Letters from Panduranga (Jeu de Paume), Specter of Ancestors (MoMA post / RAW)
  - **D** documenta14 install (artpress), ShanghART, artist portrait, video thumb
  - **E** *Archipelago* / *Barangay* (Universes in Universe / Mori pages)
  - **F** Tate Artist & Empire imagery; 2019 Arrival / Sang Nila Utama Wikimedia stills
- `CREDITS.md` rewritten with sources; intro copy no longer mentions Tier2 gates.

### Clip audio
- ffmpeg mux: looped `bed-layered.mp3` @ volume 0.18 → AAC under every `clips/*.mp4` (was video-only).
- `ScrollVideo.vue` + `StickyScrubVideo.vue`: soft-unmute when `unlocked && !muted`; volume ~0.10–0.12, duck to ~0.03 while Howler VO `activeVoId` is set.

### Analysis depth
- `act2.ts`: each Core exports `breakdown: AnalysisAxis[]` (4 axes) + `embeds: MediaEmbed[]`.
- New `AnalysisPanel.vue` — tabbed 深度拆解 with thesis strip + desktop axis rail.
- Concrete dates/places/works wired from ANALYSIS packs (SEAC 1943, Jeu de Paume 2015-10-20—2016-01-24, documenta14 2017, Tate/NGS 2015–17, bicentennial 2019-01, etc.).

### UI density (Boat/Kaizen grammar, Vue stack)
- New `ChapterHold.vue` — sticky full-bleed media hold with HUD caption (Boat-like scroll grammar).
- Wired holds on Core A–F enters; larger chapter titles; denser embed grids.
- Softened leftover `PlaceholderStill` badge to 「外链参考」 (unused in main Act2 path).

### Build / git
- Branch: `polish/kaizen-boat-deepdive` from `master` @ `63c4b98`.
- Baseline recover branch `recover/pre-kaizen-polish-20261031` **untouched**.
- `npm run build` must be green before push.

## Honest remaining gaps vs full Kaizen / Kristallnacht / The Boat

1. **No NanoGL / GLTF / Theatre.js museum** — Kaizen public engine not ported; we stay 2.5D scroll + video + CSS holds.
2. **No XR / shader portals** — chapter wipes remain short CSS/video flashes.
3. **Artist footage is stills, not licensed moving image** — no full Utama / Letters / Arin video embeds.
4. **Ambient bed is synthetic lavfi** — not field-recorded documentary stems.
5. **Scrub audio is discontinuous** when seeking — soft bed only; VO still owns narrative clarity.
6. **2019 “invisible Raffles” paint job** — no authentic news photo of the camouflage paint located; used Arrival / Sang Nila Utama Wikimedia stills + text (no AI fake).
7. **Revolusi! gallery photography** — still described via timeline + press URL, not a full press-kit mirror.

Pass 4 (if wanted): multi-stem ambient, longer OA trims, optional light Three.js planes for map rails — still short of Kaizen’s WebGL product.

## Paths touched

- `src/content/act2.ts`
- `src/components/ui/{EmbeddedStill,AnalysisPanel,ChapterHold,ScrollVideo,StickyScrubVideo,PlaceholderStill}.vue`
- `src/components/sections/Act2{A–F}.vue`, `CreditsSection.vue`
- `public/media/clips/*.mp4` (remuxed), `public/media/stills/**`
- `CREDITS.md`, this changelog
