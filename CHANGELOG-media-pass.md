# CHANGELOG — media immersion pass

**2026-10-31** — VO + OA/Ken-Burns video toward Kaizen / InsideKristallnacht / The Boat density.

## Added

### Chinese VO
- `public/media/vo/scripts.json` — 21 lines (hero + A–F enters + key beats), 中文 ~1–2 sentences.
- `public/media/vo/*.mp3` + `.ogg` — edge-tts `zh-CN-YunyangNeural`.
- ScrollTrigger in `App.vue` plays enter VO on chapter enter / enter-back; mute toggle ducks ambient and gates VO.
- `VoCaption` live pulse when matching `voId` is playing.

### Video
- **6 OA archival** H.264 mp4 trims under `public/media/clips/` (Japanese SE Asia propaganda PD, Batavia market, Tanjung Priok, Fock departure, MAG-24 Philippines).
- **7 generated-atmosphere** Ken Burns / xfade mp4s from existing Tier1 stills (hero, A dissolve, B maps, C–F enters).
- `ScrollVideo.vue` — muted, playsinline, scroll enter/leave play/pause; OA vs generated badges.
- Wired into Hero + Core A–F (enter clip each); Core A/B also show secondary archival clips.

### Code
- `src/content/media.ts` — bindings.
- `src/composables/useAudio.ts` — ambient + Howler VO cache + ducking.
- CREDITS.md extended.

## Still Tier2-blocked (vs Kaizen/Boat)

1. Official stills/trailers for Ho Tzu Nyen Utama / CDOSEA / Hotel Aporia.
2. *Letters from Panduranga* + Tuan Andrew Nguyen stills.
3. Arin documenta14 installation footage.
4. Yee I-Lann Mori/SAM artwork stills.
5. Artist & Empire press + 2019 Raffles “invisible” news photos.
6. Revolusi! press stills.
7. Richer multi-layer ambient beds (currently soft noise + VO); no licensed film score.
8. Beat-level VO autoplay beyond enter hooks (Saleh slider / digit decode / etc. scripts exist as files but are not all ScrollTrigger-wired yet).

## Build

- `npm run build` must pass after this pass.
- Optional tarball: `/workspace/decolonial-mvp-immersive.tar.gz` (source + public media, no node_modules).

## Counts

| Kind | Count |
|------|------:|
| OA archival clips | 6 |
| Ken Burns / generated-atmosphere | 7 |
| Chinese VO mp3 lines | 21 |
