# Credits & Licenses

媒体编排对齐 `/workspace/decolonial-packs/SITE-MEDIA-PLAN.md`。Tier1 内嵌于 `public/media/{a,b,c,d,e,f}/`（已为网页缩放）。当代作品 **0 件本体下载**——仅「待许可」框＋官方 URL。

## Core A — Saleh × Pieneman

| File | License | Credit |
|------|---------|--------|
| `media/a/saleh.jpg` (+ detail) | Public domain | Raden Saleh, *Penangkapan Diponegoro*, 1857. Istana Negara. Wikimedia Commons. |
| `media/a/pieneman.jpg` (+ detail) | Public domain | Nicolaas Pieneman, *The Submission of Prince Dipo Negoro…*, 1835. Rijksmuseum. Wikimedia Commons. |

Revolusi! press stills = Tier2【待核】— not embedded.

## Core B — Ho Tzu Nyen (historical maps only)

| File | License | Credit |
|------|---------|--------|
| `media/b/pacific-war-se-asia-1941.jpg` | Public domain | Pacific War — Southeast Asia, 1941. Wikimedia Commons. |
| `media/b/pacific-war-southern-asia-1942.jpg` | Public domain | Pacific War — Southern Asia, 1942. Wikimedia Commons. |
| `media/b/japanese-empire-1942.svg` | CC BY-SA 3.0 | Japanese Empire, 1942. Wikimedia Commons. |
| `media/b/greater-east-asia-co-prosperity.png` | CC BY-SA 3.0 | Greater East Asia Co-Prosperity Sphere. Wikimedia Commons. |

Utama / CDOSEA / Hotel Aporia stills = Tier2【待核】— placeholder panels only. CDOSEA UI = self-made word chips (not iframe).

## Core C — Champa maps

| File | License | Credit |
|------|---------|--------|
| `media/c/champa-seasia-1000-1100.png` | CC0 | Mainland SE Asia c.1000–1100 CE. Wikimedia Commons. |
| `media/c/indianized-kingdoms-indochina.jpg` | Public domain | Indianized kingdoms in Indochina. Wikimedia Commons. |
| `media/c/champa-locator.png` | CC BY-SA 3.0 | Champa locator. Wikimedia Commons. |

*Letters from Panduranga* / *Specter of Ancestors* stills = Tier2【待核】.

## Core D — Democracy Monument (+ correction maps)

| File | License | Credit |
|------|---------|--------|
| `media/d/democracy-monument-bangkok.jpg` | CC BY-SA 4.0 | Democracy Monument, Bangkok (2016). Wikimedia Commons. |
| `media/d/death-railway-map.png` | CC BY-SA 3.0 | Burma–Siam Death Railway map. **Correction page only — NOT artwork subject.** |
| `media/d/pow-camps-siam-burma-railway.jpg` | CC BY-SA 4.0 | POW camps map. **Correction / footnote only.** |

Arin documenta14 installation stills = Tier2【待核】.

## Core E — Sulu charts

| File | License | Credit |
|------|---------|--------|
| `media/e/dalrymple-borneo-sulu-1769.jpg` | Public domain | Dalrymple 1769 Borneo–Sulu chart. Wikimedia Commons. |
| `media/e/sulu-1848-1899.jpg` | Public domain | Sulu historical map 1848–1899. Wikimedia Commons. |
| `media/e/moro-sultanates.jpg` | CC BY-SA 4.0 | Moro sultanates schematic. Wikimedia Commons. |

Yee *Archipelago* / *Barangay* = Tier2 Mori collection URLs only.

## Core F — Raffles

| File | License | Credit |
|------|---------|--------|
| `media/f/raffles-statue-singapore-river.jpg` | CC BY-SA 3.0 | Raffles statue, Singapore River. Calvin Teo / Wikimedia Commons. |
| `media/f/raffles-statue-front.jpg` | CC BY-SA 2.0 | Raffles statue front. Wikimedia Commons. |
| `media/f/raffles-portrait-*.jpeg/jpg` | Public domain | Historical Raffles portraits. Wikimedia Commons. |

2019 “invisible” press photos / Artist & Empire press = Tier2【待核】— text + ordinary statue only. No AI fake invisibility renders.

## Code

Vite + Vue 3 + TypeScript + GSAP ScrollTrigger + Lenis + Howler + Sass.  
Kaizen public patterns consulted at stack level only. **No NanoGL fork. No reverse-engineering of insidekristallnacht.org.**

## Media pass 2026-10-31 — VO + video clips

### Chinese VO (Tier3 TTS)

| Path | License / note |
|------|----------------|
| `public/media/vo/scripts.json` | Original Chinese narration scripts (class report) |
| `public/media/vo/*.mp3` (+ `.ogg`) | Generated with **edge-tts** voice `zh-CN-YunyangNeural`. Not a human archival recording. |

Scroll enter IDs: `hero-enter`, `a-enter`…`f-enter` (+ beat lines `a-saleh`, `b-naming`, `c-1832`, `d-correction`, `e-borders`, `f-invisible`, etc.).

### OA archival video clips (`public/media/clips/`)

| File | License | Source |
|------|---------|--------|
| `b-japan-seasia-singapore-1942.mp4` | Public domain | Trim (~22s) from *Japan verovert Zuidoost-Azië.webm* (Nippon Eigasha / Beeld en Geluid via Wikimedia Commons). **Japanese propaganda — biased historical source.** |
| `a-japan-java-landing-1942.mp4` | Public domain | Trim from same film (Java landing segment). |
| `a-batavia-market-1946.mp4` | Public domain | Trim from *Nieuws uit Indonesië, markt in Batavia* Weeknummer 46-30 — Open Beelden / Wikimedia. |
| `a-tanjung-priok-departure.mp4` | Check Commons page | Trim from *Vertrek dok Tandjong Priok naar Nederlands-Indië* — Wikimedia Commons. |
| `a-fock-governor-departure.mp4` | Check Commons page | Trim from *Vertrek mr. B. Fock als gouverneur Nederlands-Indië* — Wikimedia Commons. |
| `b-mag24-philippines-1945.mp4` | US gov / Commons | Trim from *Today in History - MAG-24 Lands in Philippines January 11, 1945* — Wikimedia Commons. |

Manifest: `public/media/clips/manifest.json`.

### generated-atmosphere (Ken Burns from Tier1 stills — not documentary of artworks)

| File | Base still |
|------|------------|
| `hero-raffles-river-kb.mp4` | `f/raffles-statue-singapore-river.jpg` |
| `a-saleh-pieneman-dissolve-kb.mp4` | PD Saleh + Pieneman stills (atmosphere dissolve; paintings remain evidenced by stills + compare slider) |
| `b-pacific-maps-crossfade-kb.mp4` | PD 1941 / 1942 Pacific maps |
| `c-champa-map-kb.mp4` | CC0 Champa map |
| `d-democracy-monument-kb.mp4` | CC BY-SA Democracy Monument |
| `e-dalrymple-sulu-kb.mp4` | PD Dalrymple 1769 |
| `f-raffles-statue-kb.mp4` | CC BY-SA Raffles statue front |

**No AI-faked historical artworks or unauthorized contemporary artist film stills.** Tier2 contemporary trailers remain placeholders.



## Pass 2 ambient (synthesized, not commercial)

- `public/media/ambient/bed-layered.mp3` — brown noise + low sine drone + soft shimmer (ffmpeg lavfi), looped.
- `public/media/ambient/stinger-*.mp3` — short tonal hits for chapter enters (synthesized sine fades).
- No licensed film scores or stolen commercial beds.
