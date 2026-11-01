# CHANGELOG — Pass 10 (media density · Boat comic · Kristallnacht atmosphere)

**2026-10-31** — Overnight Pass 10 while Leon sleeps. Immersion density toward The Boat’s continuous illustrated story and Inside Kristallnacht’s dark cinematic chapters — article×PPT spine stays primary. **No nanogl. No portal-force regression.**

## Recover

- Pre-pass10 (do not overwrite): `recover/pre-pass10-media-density-20261031` @ `20eea4b`
- Post-pass10: `recover/pass10-media-density-20261031` @ `4bfa988`

## Version

**`0.10.0`** — density jump (comic strip densification + per-Core ambient + claim cards + darker wipes). Not full Boat R3F / Kristallnacht CMS; nanogl still deferred.

## What shipped

| Goal | Implementation |
|---|---|
| **1. Pack media into EvidenceStrip** | Core A 4→8 (archival frames from Batavia/Priok/Java/Fock); B 6→11 (empire map, Utama alts, Singapore 1942 archival, MAG-24); C +map alt; D +KB frame + video thumb denser; E +KB frame + moro alt; F +second portrait. Captions stay argument-tied. **No AI-faked artworks.** |
| **2. Boat comic continuity** | EvidenceStrip denser horizontal comic row (`flex-basis ~62vw`), VO-adjacent gutter labels (`voLabel`), live caption with VO chip, longer runway. Parallax 3-layer retained. |
| **3. Kristallnacht atmosphere** | Darker taller ChapterWipe; claim-role typographic cards on ChapterHold; longer dark-flash fades between beats. |
| **4. Clip / ambient beds** | All chapter clips already carry audio; ScrollVideo bed vol 0.12→0.18 (still ducks under VO). **Per-Core ambient EQ beds** (`bed-core-a`…`f`) swap on `activeId` via Howler fade; VO duck preserved. |
| **5. Locks** | Core D = Democracy Monument / documenta14 (Death Railway correction-only panel retained). Aichi / Hotel Aporia half-line only. SE Asia + East↔SE framing. Unforced portals untouched. Nanogl not attempted. |

## Media added (this pass)

- `public/media/stills/a/{batavia-market,priok-departure,java-landing-1942,fock-departure}.jpg` — frames from OA archival clips
- `public/media/stills/b/{singapore-1942-archival,mag24-philippines-1945}.jpg`
- `public/media/stills/d/democracy-monument-kb-frame.jpg`
- `public/media/stills/e/dalrymple-kb-frame.jpg`
- `public/media/b/japanese-empire-1942.png` (raster from pack SVG)
- `public/media/ambient/bed-core-{a–f}.{mp3,ogg}` — EQ variants of layered bed

## Closed vs refs (honest)

| Reference | Pass 10 | Still open |
|---|---|---|
| The Boat continuous illustrated story | Denser comic EvidenceStrip + VO labels + more panels | Not full R3F boat world / wave sim |
| Inside Kristallnacht dark chapters | Darker wipes, claim cards, per-Core ambient | Not CMS cinematic director / Theatre Activity |
| Kaizen nanogl | Still deferred (Pass 9 decision) | three.js path only |
| Unforced portals | Untouched (Pass 9 claim registry) | ANGLE flake possible |

## Architecture (non-negotiable)

1. Academic rail / SlideChapter spine unchanged.
2. EvidenceStrip / holds / WebGL = evidence after slide thesis.
3. No AI-faked historical artworks; Core D Democracy Monument shortlist locked.
