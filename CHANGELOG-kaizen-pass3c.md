# CHANGELOG — Pass 3c (academic report rail)

**2026-10-31** — Leon correction: lack of coherence between chapters; treat as academic report with definition → argument → examples → summary so the audience can follow the thought/rail.

## Armature

| Stage | Where | Role |
|---|---|---|
| 问题提出 + 如何读 | Hero / Act0 | Question, thesis, rail map Ⅰ–Ⅳ |
| **定义** | Act1 | Colonialism / coloniality / decolonial + 展示与回收 |
| **论证路径** | Act2Intro | Six works/exhibitions as evidence chain |
| **例证 A–F** | Cores | Deliberate order + bridge captions + thesis callbacks |
| **总结** | Act3 | Joint proof → scholar frames → open questions |
| 证据来源 | Credits | Sources |

## Connective tissue

- `src/content/rail.ts` — report thesis, rail map, bridges, evidence chain, jointProof
- Between chapters: `ChapterWipe` label + `BridgeCaption` (logical move + why this follows)
- Sample A→B: **从画作对峙 → 命名权装置** — A proves title assigns moral place; B scales naming to the region itself
- Core sections: `railCallback` one-liner under title; eyebrows `例证 A–F`
- ChapterNav / ProgressBar: academic stage labels（定义／论证／例证A–F／总结）, not opaque ids

## Kept from pass3b

- Artworks/exhibitions remain the spine of each Core
- History only as scaffolding
- Boat/Kaizen immersion (holds, media) retained

## Files

- `src/content/rail.ts` (new), `site.ts`, `act1.ts`, `act2.ts`, `act3.ts`, `media.ts` (VO captions)
- `src/App.vue`, `HeroSection`, `Act1Section`, `Act2Intro`, `Act2A–F`, `Act3Section`, `CreditsSection`
- `ChapterNav`, `ProgressBar`, `BridgeCaption` (new)

Recover: `recover/pre-academic-rail-20261031` @ pre-edit HEAD; post-edit `recover/pass3c-academic-rail-20261031`.
Continues PR #1 on `polish/kaizen-boat-deepdive`.


## Article first (Leon addendum)

Prose rail leads; rich media = auxiliary storytelling / evidence / immersion.
- Section order: eyebrow / title / lead / thesis / WorkCard / VO / media insert
- ScrollVideo max-height 48vh + evidence badge; ChapterHold / StickyScrub shortened and labeled immersive support
- Sticky scrub contained to article column (not full-bleed takeover)
- Hero + rail method: media supports text, does not replace argument
