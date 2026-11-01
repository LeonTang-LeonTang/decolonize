# CHANGELOG — Pass 7 (Kaizen / Boat / Kristallnacht depth)

**2026-10-31** — Overnight Pass 7 while Leon sleeps. Close immersion gap WITHOUT flipping to museum-first. Article/PPT spine from Pass 6 stays primary.

## Recover

- Pre-pass7 (do not overwrite): `recover/pre-pass7-kaizen-depth-20261031` @ `f42fe5a`
- Post-pass7: `recover/pass7-kaizen-depth-20261031` @ `b3c408e`*

## What shipped

| Goal | Implementation |
|---|---|
| **1. Boat-style continuous evidence panels** | `EvidenceStrip.vue` + `content/evidencePanels.ts` — vertical scroll scrubs a horizontal illustrated panel sequence of REAL pack / `public/media` stills inside each Core A–F (after SlideChapter thesis). Captions are argument-tied; D keeps Democracy Monument primary + Death Railway as correction-only panel. |
| **2. Kristallnacht-style chapter director** | Stronger `ChapterHold`: longer runway (scroll resistance), press-and-hold unlock ring, skip control, dark veil, exit VO/stinger hooks. `SlideChapter` gains hold-to-advance CTA into evidence. Darker `ChapterWipe` rail transitions. |
| **3. Kaizen-level WebGL polish (stay on three.js)** | Warmer/brighter room shells + lights; denser cameraTakes keys; smoother camera lerp; PostFX `setViewMode` — richer grain/bloom only in 展厅模式; vignette floor raised so midtones don't crush-to-black (Pass 5b visibility preserved). ThesisStrip still always on in portals. |
| **4. VO / ambient** | `useDeckNav` plays enter VO + stinger on ←/→ / Space / deck jump. Hold exits fire exit VO/stinger. Wipe stages can soft-stinger. |
| **5. Article-first retained** | Default 阅读模式; SlideChapter claim→thesis→bullets before EvidenceStrip / portal / compare. No AI-faked artworks. Core D shortlist locked. |

## Version

`0.8.0` — continues PR #1 on `polish/kaizen-boat-deepdive`.

## Closed vs refs (honest)

| Reference | Pass 7 closed | Still open |
|---|---|---|
| **The Boat** continuous illustrated panels | EvidenceStrip horizontal scrub of real pack media per Core | Not a full R3F parallax comic world (waves/boat layers) |
| **Inside Kristallnacht** chapter director | Hold-to-advance + scroll-resistance + dark wipes | Not a multi-scene cinematic timeline director / CMS |
| **Kaizen** WebGL polish | Lighting / camera / mode-aware postFX on three.js | Still ScrollTrigger — not nanogl + Theatre Activity graph |
| Hold-to-advance gesture | Slide CTA + ChapterHold press rings | Not native touch long-press across every beat |
| Mid-portal WebGL in headless shots | Brighter rooms + clearer emissive frames | Headless Chrome WebGL still flaky to prove |

## Architecture (non-negotiable)

1. Academic rail 定义→论证→例证A–F→总结 stays the spine.
2. EvidenceStrip / WebGL / clips = evidence after the slide thesis.
3. No Tier2 gates; educational fair use for real stills; no AI-fake historical artworks.
