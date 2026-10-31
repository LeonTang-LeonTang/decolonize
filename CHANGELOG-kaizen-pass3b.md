# CHANGELOG — Pass 3b (artwork spine rebalance)

**2026-10-31** — Leon correction: mainly focus on artworks / exhibitions and art↔decolonization analysis; history only as short scaffolding.

## Rebalance

### Analysis axes (renamed)
| Was (pass3) | Now (pass3b) |
|---|---|
| 解殖民机制 | **作品与展场** |
| 国家与地方 | **解殖民视觉机制** |
| 文化与展演效应 | **形式与装置读法** |
| 媒体装置 | **历史与地缘线索（辅）** |

`AnalysisPanel` eyebrow: 深度拆解 → **作品读解**.

### Content spine
- Each Core A–F opens with `WorkCard`（作品与展场）：title / medium / venue / year +「看见什么」.
- A / C / F use dual cards (work + contrast work).
- `lead` / `thesis` / `breakdown` rewritten so **artwork & display strategies lead**; history/nation/society = short unlockers.
- Timelines trimmed toward exhibition/work dates; historical years marked（辅）.
- ChapterHold labels/images prefer works (e.g. Core C → Letters still; Core E → Archipelago still).

### VO (light)
Enter / scaffold lines rephrased to start with「先看…作品／影像／装置」; history lines marked「辅线一句」. TTS regenerated (edge-tts) for 9 lines.

### Sample — Core C one-liner
- **Before:** 地图上有过潘朗；国史里被写掉。占婆末疆，在官方叙事里成了空白。
- **After:** 先看阮静诗的影像：书信体双声，风景与日常——她不替占族发言，只让省略自己成为可见。

## Files
- `src/content/act2.ts`, `src/content/media.ts`
- `src/components/ui/WorkCard.vue`, `AnalysisPanel.vue`
- `src/components/sections/Act2A–F.vue`
- `public/media/vo/{a-enter,b-enter,b-naming,c-enter,c-1832,d-enter,e-enter,e-borders,f-enter}.*`
- `public/media/vo/scripts.json`

Recover branch untouched. Continues PR #1 on `polish/kaizen-boat-deepdive`.
