# CHANGELOG — Pass 6 (article × PPT × Kaizen hybrid)

**2026-10-31** — Leon: combine academic-article / traditional PPT-slide clarity WITH interactive modern web (Kaizen / The Boat / Inside Kristallnacht), so viewers get INFO from the explainer — not only see artworks. Article remains primary; WebGL is evidence.

## Recover

- Pre-pass6 (do not overwrite): `recover/pre-pass6-article-hybrid-20261031` @ `0e02403`
- Post-pass6: `recover/pass6-article-hybrid-20261031` @ *(filled after push)*

## What shipped

| Goal | Implementation |
|---|---|
| **1. SlideChapter / ExplainerPanel** | Full-viewport sticky “slide” at each rail stage (问题／定义／论证／例证A–F／旁注／总结／证据). Big claim + thesis sentence + 3–5 bullets from `content/slides.ts`. CTA **展开证据／进入展厅** scrolls into media/WebGL evidence body. |
| **2. Deck progress** | Sticky `第 N / 12 页` + chapter dots (`DeckProgress`). Keyboard ←/→ / Space / PageUp-Down advance slides (`useDeckNav`) while Lenis scroll still works. |
| **3. Dual-mode toggle** | `阅读模式` (default) vs `展厅模式`. Persisted in `localStorage`. Reading mode subdues museum ambient opacity / immersionScale; portal still visible but article-first. |
| **4. Thesis strip / VO rail** | Persistent bottom `ThesisStrip` (“本段论点：…”) tied to active chapter so museum art never orphans the argument. VO scroll wiring unchanged; strip echoes slide thesis beats. |
| **5. Immersion upgrades** | Stronger slide holds (Boat-like sticky runway); portal HUD copy switches with mode; MuseumApp `immersionScale` + `viewMode`; sharper typography hierarchy (claim > thesis label > bullets > evidence). No AI-fake artworks. |

## Architecture (non-negotiable)

1. Academic rail 定义→论证→例证A–F→总结 stays the spine.
2. WebGL museum / clips / portals = **evidence layers** after the slide thesis is readable.
3. Viewer always knows the argument before/while seeing art.

## Version

`0.7.0` — continues PR #1 on `polish/kaizen-boat-deepdive`.

## Honest remaining gaps vs Kaizen / Kristallnacht / The Boat

| Reference | Pass 6 |
|---|---|
| Kaizen nanogl + Theatre Activity graph | Still three.js r170 + ScrollTrigger keyframes (Pass 5) |
| Kristallnacht chapter hold + dark immersive narrative | Slide holds + thesis strip; not full multi-scene cinematic director |
| The Boat continuous illustrated scroll | Sticky slide + evidence body; not full illustrated panel sequence |
| Hold-to-advance gesture | Keyboard PPT keys; scroll still primary |
| Full bilingual CMS | Chinese academic rail only |
