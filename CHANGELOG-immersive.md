# CHANGELOG — immersive rebuild

**2026-10-31** — Media-first scroll essay upgrade (packs A–F + SITE-MEDIA-PLAN).

## What changed

- Embedded Tier1 assets into `public/media/{a,b,c,d,e,f}/` (web-resized).
- Rewrote `src/content/*` from pack ANALYSIS／timeline／MEDIA (Chinese, SE spine).
- New UI: `CompareSlider`, `MapCrossfade`, `DigitDecode`, `PlaceholderStill`, `SupportTip`, `VoCaption`, `ScrollTimeline`, `PanZoomImage`, `WordChips`.
- Remapped Act 2: C=Panduranga, D=Arin Democracy Monument, E=Yee Sulu, F=Artist & Empire＋Raffles (old Peace Statue / documenta-as-main / wrong letter map removed from spine).
- **Core D correction**: Democracy Monument hero; death-railway maps only inside red 纠错 card; no “死亡铁路” as artwork subject.
- Sticky chapter nav: section `padding-top` / `scroll-margin-top` under nav so titles clear the header.
- Cut 台展／陈界仁／兽首／曾灶财 from main scroll; Support strip for documenta15／Khvay／Aichi tip.
- Ambient Howler bed + mute; VO as caption strips (no TTS API required).
- CREDITS.md / README refreshed.

## Feel

Boat/Kaizen-ish full-bleed media + scroll reveals — original Vue implementation, not a NanoGL fork / not RE of insidekristallnacht.
