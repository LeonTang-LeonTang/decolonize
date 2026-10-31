# CHANGELOG — Kaizen / Boat immersion Pass 2

**2026-10-31** — Beat-level Chinese VO, layered ambient, sticky scrub video, Act1/Act3 media, chapter wipes.

## Goal

Move `/workspace/decolonial-mvp` closer to Make Me Pulse / Kaizen, InsideKristallnacht, and The Boat (SBS): scroll-driven immersion with video, designed ambient, and Chinese voice beyond chapter-enter hooks.

## What changed

### VO — all scripts.json beats wired
- `src/content/media.ts` now exports `allVo` (31 lines): hero + Act1 + A–F enters **and** Saleh/Pieneman slider, map naming, CDOSEA chips, 1832 / letters, digit decode, correction, borders / seam, Raffles pan / portrait / title duel / 2019, Act3 scholars & empire criticism.
- `App.vue` ScrollTriggers every non-interaction line (selector + start); VoCaption `voId` lights up live.
- **Interaction VO**: `CompareSlider` plays `a-saleh` / `a-pieneman` on lean; `DigitDecode` plays `d-digits` on first tap; `FlipCard` plays Act1 keyword VO on flip.
- **New TTS** (`zh-CN-YunyangNeural`): `act1-enter`, `act1-colonialism`, `act1-coloniality`, `act1-decolonial`, `act1-devices`, `act3-enter`, `act3-scholars`, `act3-empire`, `a-slider-hint`, `f-pan` (+ ogg). Caption copy matches spoken lines.

### Ambient — designed bed (not single soft-noise)
- Replaced procedural noise-only Howl with `/media/ambient/bed-layered.mp3|.ogg` (brown noise + low drone + shimmer, ffmpeg lavfi; **not** a commercial score).
- Chapter stingers `stinger-110…277.mp3` fire softly on major enters; ambient ducks under VO as before.
- First gesture (`进入叙事`) unlocks + unmutes by default; hero shows an obvious mute / 声场 panel; loader copy says VO will start.

### Sticky scrub / Boat-like density
- New `StickyScrubVideo.vue` — full-bleed sticky video scrubbed by scroll (progress bar HUD).
- Wired: **hero** (`hero-scrub-raffles.mp4`), **Core A** (`a-scrub-saleh-pieneman.mp4`), **Core B** (`b-scrub-seasia-1942.mp4` OA trim).
- `ChapterWipe.vue` between acts/cores — brief map-flash veil from `wipe-map-flash.mp4`.

### Act1 + Act3 media
- Act1 Ken Burns primer: `act1-primer-maps-kb.mp4` + enter/devices/keyword VO.
- Act3 portrait dissolve: `act3-empire-portrait-kb.mp4` + enter/scholars/empire VO.
- Tier2 artist stills remain credited placeholders (no AI-faked Saleh/Pieneman or unauthorized contemporary works).

### Build / package
- `npm run build` green.
- Tarball refreshed: `/workspace/decolonial-mvp-immersive.tar.gz` (source + `public/media`, no `node_modules`).

## Counts (Pass 2 totals)

| Kind | Count |
|------|------:|
| Chinese VO mp3 lines | 31 |
| OA archival clips | 6 (+ 1 scrub trim of OA) |
| Ken Burns / generated-atmosphere mp4 | 7 prior + 5 new (act1, act3, hero scrub, A scrub, wipe) ≈ 12 gen |
| Sticky scrub experiences | 3 (hero, A, B) |
| Ambient bed + stingers | 1 bed + 7 stingers |

## Honest remaining gap vs Kaizen / Kristallnacht / The Boat

1. **No official artist footage** — Ho Tzu Nyen, Nguyễn Trinh Thi, Arin, Yee I-Lann, Revolusi! press, Raffles 2019 “invisible” news photos still Tier2 placeholders.
2. **Ambient is designed but synthetic** — layered lavfi bed ≠ licensed documentary score or field recording beds those references use.
3. **Scrub density** — 3 sticky scrubs; Boat/Kaizen often chain many pinned cinematic beats with custom webGL / multi-track audio stems.
4. **No live bilingual toggle / transcript sync beyond VoCaption**; no spatial audio.
5. **Chapter wipes are short CSS/video flashes**, not full map-morph transitions.
6. **Saleh/Pieneman remain PD stills + generated dissolve** — never AI-reconstructed paintings.

Pass 3 would need licensed/press stills + longer OA trims + possibly multi-stem ambient if the brief allows.

## Paths touched (high level)

- `src/App.vue`, `src/content/media.ts`, `src/composables/useAudio.ts`
- `src/components/ui/{StickyScrubVideo,ChapterWipe,CompareSlider,DigitDecode,FlipCard,LoadingScreen,VoCaption}.vue`
- `src/components/sections/{Hero,Act1,Act2A–F,Act3}Section*.vue`
- `public/media/vo/*`, `public/media/ambient/*`, `public/media/clips/*`
- `CREDITS.md`, this changelog
