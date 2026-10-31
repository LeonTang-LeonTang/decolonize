/** Media bindings for scroll VO + chapter enter / scrub videos. Paths under public/. */

export type VoLine = {
  id: string
  core: string
  zh: string
  src: string
  /** CSS selector for ScrollTrigger enter (optional if interaction-driven) */
  section?: string
  /** ScrollTrigger start string */
  start?: string
  /** Interaction-only (slider / flip / digit) — no auto scroll wire */
  interaction?: boolean
  /** Soft chapter stinger index 0–6 when this line plays */
  stinger?: number
}

export type ChapterClip = {
  core: string
  sectionId: string
  src: string
  kind: "oa-archival" | "generated-atmosphere"
  credit: string
  poster?: string
}

/** Full VO catalog — enters + beat moments + Act1/Act3. */
export const allVo: VoLine[] = [
  {
    id: "hero-enter",
    core: "hero",
    zh: "这是一份学术报告，不是展览导览。先立定义，再沿六案证据链追问：谁在命名、谁被写掉、谁展示、谁回收。",
    src: "/media/vo/hero-enter.mp3",
    section: "#hero",
    start: "top 55%",
    stinger: 0,
  },
  {
    id: "act1-enter",
    core: "act1",
    zh: "第一幕是定义：殖民主义、殖民性、反殖民、解殖民、后殖民。先摊开，再进入论证与例证。",
    src: "/media/vo/act1-enter.mp3",
    section: "#act1",
    start: "top 60%",
    stinger: 1,
  },
  {
    id: "act1-colonialism",
    core: "act1",
    zh: "殖民主义：以军事、行政与经济手段，对他者领土实施直接统治与掠夺。",
    src: "/media/vo/act1-colonialism.mp3",
    section: "#act1-card-colonialism",
    start: "top 70%",
  },
  {
    id: "act1-coloniality",
    core: "act1",
    zh: "殖民性：统治结束后仍延续的知识等级、审美标准、分类与所有权。",
    src: "/media/vo/act1-coloniality.mp3",
    section: "#act1-card-coloniality",
    start: "top 70%",
  },
  {
    id: "act1-decolonial",
    core: "act1",
    zh: "解殖民：不仅反对统治，还追问展览与审美权力是否继续存在。",
    src: "/media/vo/act1-decolonial.mp3",
    section: "#act1-card-decolonial",
    start: "top 70%",
  },
  {
    id: "act1-devices",
    core: "act1",
    zh: "命名、收藏、展示、纪念——展示与回收的柔性装置，将贯穿六案证据链。",
    src: "/media/vo/act1-devices.mp3",
    section: "#act1-devices",
    start: "top 72%",
  },
  {
    id: "a-enter",
    core: "A",
    zh: "先看两幅画：同一场面，一边叫投降，一边叫捕获——标题本身就是观看装置。",
    src: "/media/vo/a-enter.mp3",
    section: "#act2a",
    start: "top 62%",
    stinger: 2,
  },
  {
    id: "a-slider-hint",
    core: "A",
    zh: "拖动滑杆：左边是萨勒赫的捕获，右边是皮内曼的投降——标题本身就是权力。",
    src: "/media/vo/a-slider-hint.mp3",
    section: "#a-compare",
    start: "top 65%",
  },
  {
    id: "a-saleh",
    core: "A",
    zh: "萨勒赫写的是被捕：谈判桌上的扣押，被画成爪哇视角的捕获。",
    src: "/media/vo/a-saleh.mp3",
    interaction: true,
  },
  {
    id: "a-pieneman",
    core: "A",
    zh: "皮内曼为将军画画：和平屈服的构图，把殖民者写成秩序的使者。",
    src: "/media/vo/a-pieneman.mp3",
    interaction: true,
  },
  {
    id: "a-return",
    core: "A",
    zh: "三次归还与 bersiap 之争：收藏权与展墙用词，仍是殖民权力的现役装置。",
    src: "/media/vo/a-return.mp3",
    section: "#a-timeline",
    start: "top 70%",
  },
  {
    id: "b-enter",
    core: "B",
    zh: "先看何子彦的作品：词典在重排，旅馆里叠着幽灵——「东南亚」被做成可观看的知识装置。",
    src: "/media/vo/b-enter.mp3",
    section: "#act2b",
    start: "top 62%",
    stinger: 3,
  },
  {
    id: "b-naming",
    core: "B",
    zh: "作品旁的命名脚手架：盟军叫东南亚，帝国叫南方——用来听懂词典与旅馆里的幽灵。",
    src: "/media/vo/b-naming.mp3",
    section: "#b-maps",
    start: "top 68%",
  },
  {
    id: "b-cdosea",
    core: "B",
    zh: "词典在重排：图像与声音不断漂移，区域的形状不是给出正确定义，而是可观看的知识生产。",
    src: "/media/vo/b-cdosea.mp3",
    section: "#b-chips",
    start: "top 70%",
  },
  {
    id: "c-enter",
    core: "C",
    zh: "先看阮静诗的影像：书信体双声，风景与日常——她不替占族发言，只让省略自己成为可见。",
    src: "/media/vo/c-enter.mp3",
    section: "#act2c",
    start: "top 62%",
    stinger: 4,
  },
  {
    id: "c-1832",
    core: "C",
    zh: "辅线一句：潘朗曾被写进吞并与核电计划——土地可被重新命名，作品让省略出声。",
    src: "/media/vo/c-1832.mp3",
    section: "#c-territory",
    start: "top 68%",
  },
  {
    id: "c-letters",
    core: "C",
    zh: "书信体双声：不替占族发言，只把省略与土地叠在同一帧。",
    src: "/media/vo/c-letters.mp3",
    section: "#c-film",
    start: "top 70%",
  },
  {
    id: "d-enter",
    core: "D",
    zh: "先看文献展里的翼板与数字标题：纪念碑被做成可检验的物件，日期变成可读的形式。",
    src: "/media/vo/d-enter.mp3",
    section: "#act2d",
    start: "top 62%",
    stinger: 5,
  },
  {
    id: "d-digits",
    core: "D",
    zh: "二四、六二、四七……立宪之日被量成可朗读的权力公式。",
    src: "/media/vo/d-digits.mp3",
    section: "#d-digits",
    start: "top 68%",
  },
  {
    id: "d-correction",
    core: "D",
    zh: "纠错：本作品不是死亡铁路。那是另一条苦役史——可作旁注，不可当主视觉。",
    src: "/media/vo/d-correction.mp3",
    section: "#d-correction",
    start: "top 72%",
  },
  {
    id: "e-enter",
    core: "E",
    zh: "先看数码拼贴：海天与殖民档案并置——解殖民发生在接缝，不在复原一个更纯的过去。",
    src: "/media/vo/e-enter.mp3",
    section: "#act2e",
    start: "top 62%",
    stinger: 6,
  },
  {
    id: "e-borders",
    core: "E",
    zh: "辅线一句：国界切开跨海世界——为的是听懂群岛构图的政治，不是海事编年。",
    src: "/media/vo/e-borders.mp3",
    section: "#e-borders",
    start: "top 68%",
  },
  {
    id: "e-seam",
    core: "E",
    zh: "档案接缝留在画面上：解殖民发生在改写凝视，而非另造纯洁起源。",
    src: "/media/vo/e-seam.mp3",
    section: "#e-artwork",
    start: "top 70%",
  },
  {
    id: "f-enter",
    core: "F",
    zh: "先看展览标题与河边雕像：谁在「面对」帝国，谁把零点做成可争议的纪念装置。",
    src: "/media/vo/f-enter.mp3",
    section: "#act2f",
    start: "top 62%",
    stinger: 0,
  },
  {
    id: "f-pan",
    core: "F",
    zh: "靠近河畔像：复制品比原作更常被看见——零点叙事，也是可争议的纪念装置。",
    src: "/media/vo/f-pan.mp3",
    section: "#f-statue",
    start: "top 65%",
  },
  {
    id: "f-portrait",
    core: "F",
    zh: "绅士与复制品：河畔常见的是一九七二年复制像，原作铜像另有其身。",
    src: "/media/vo/f-portrait.mp3",
    section: "#f-portrait",
    start: "top 68%",
  },
  {
    id: "f-empire",
    core: "F",
    zh: "谁在面对帝国：伦敦「面对」与新加坡「遭遇」——同一展览标题，两种权力语法。",
    src: "/media/vo/f-empire.mp3",
    section: "#f-duel",
    start: "top 70%",
  },
  {
    id: "f-invisible",
    core: "F",
    zh: "涂进背景：二零一九，官方把莱佛士「隐形」，旁置其他先驱——反思，也是管理。",
    src: "/media/vo/f-invisible.mp3",
    section: "#f-invisible",
    start: "top 72%",
  },
  {
    id: "act3-enter",
    core: "act3",
    zh: "现象之后是框架：谁在定义殖民现代性与解殖民？陈光兴、Clark、Flores，以及帝国展览的批评链。",
    src: "/media/vo/act3-enter.mp3",
    section: "#act3",
    start: "top 60%",
    stinger: 1,
  },
  {
    id: "act3-scholars",
    core: "act3",
    zh: "去帝国、亚洲现代、东南亚策展史——三条学术路径，都落在展示装置上。",
    src: "/media/vo/act3-scholars.mp3",
    section: "#act3-scholars",
    start: "top 68%",
  },
  {
    id: "act3-empire",
    core: "act3",
    zh: "谁在面对帝国？馆藏中心主义与当代回应，并不自动等于解殖民完成。",
    src: "/media/vo/act3-empire.mp3",
    section: "#act3-empire",
    start: "top 70%",
  },
]

/** @deprecated use allVo — kept as alias for enter-only subset consumers */
export const enterVo = allVo.filter((l) => !l.interaction)

export const chapterClips: ChapterClip[] = [
  {
    core: "hero",
    sectionId: "hero",
    src: "/media/clips/hero-raffles-river-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · Ken Burns from Raffles river statue still (CC BY-SA 3.0)",
    poster: "/media/f/raffles-statue-singapore-river.jpg",
  },
  {
    core: "act1",
    sectionId: "act1",
    src: "/media/clips/act1-primer-maps-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · naming-power maps crossfade (Pacific / Champa / Dalrymple)",
    poster: "/media/b/pacific-war-se-asia-1941.jpg",
  },
  {
    core: "A",
    sectionId: "act2a",
    src: "/media/clips/a-saleh-pieneman-dissolve-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · Ken Burns dissolve from PD Saleh / Pieneman stills",
    poster: "/media/a/saleh.jpg",
  },
  {
    core: "B",
    sectionId: "act2b",
    src: "/media/clips/b-japan-seasia-singapore-1942.mp4",
    kind: "oa-archival",
    credit:
      "OA archival · Japan verovert Zuidoost-Azië (Singapore segment, 1942 propaganda) — Beeld en Geluid / Wikimedia Commons (PD). Biased historical source.",
    poster: "/media/b/pacific-war-se-asia-1941.jpg",
  },
  {
    core: "C",
    sectionId: "act2c",
    src: "/media/clips/c-champa-map-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · Ken Burns from CC0 Champa map still",
    poster: "/media/c/champa-seasia-1000-1100.jpg",
  },
  {
    core: "D",
    sectionId: "act2d",
    src: "/media/clips/d-democracy-monument-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · Ken Burns from CC BY-SA Democracy Monument still",
    poster: "/media/d/democracy-monument-bangkok.jpg",
  },
  {
    core: "E",
    sectionId: "act2e",
    src: "/media/clips/e-dalrymple-sulu-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · Ken Burns from PD Dalrymple 1769 chart",
    poster: "/media/e/dalrymple-borneo-sulu-1769.jpg",
  },
  {
    core: "F",
    sectionId: "act2f",
    src: "/media/clips/f-raffles-statue-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · Ken Burns from CC BY-SA Raffles statue still",
    poster: "/media/f/raffles-statue-front.jpg",
  },
  {
    core: "act3",
    sectionId: "act3",
    src: "/media/clips/act3-empire-portrait-kb.mp4",
    kind: "generated-atmosphere",
    credit: "generated-atmosphere · portrait→statue dissolve (OA stills; not Artist & Empire press)",
    poster: "/media/f/raffles-portrait-stamford.jpeg",
  },
]

export const scrubClips = {
  hero: {
    src: "/media/clips/hero-scrub-raffles.mp4",
    poster: "/media/f/raffles-statue-singapore-river.jpg",
    credit: "generated-atmosphere · sticky scrub · Raffles river (CC BY-SA still)",
    kind: "generated-atmosphere" as const,
  },
  a: {
    src: "/media/clips/a-scrub-saleh-pieneman.mp4",
    poster: "/media/a/saleh.jpg",
    credit: "generated-atmosphere · sticky scrub · Saleh↔Pieneman dissolve (PD)",
    kind: "generated-atmosphere" as const,
  },
  b: {
    src: "/media/clips/b-scrub-seasia-1942.mp4",
    poster: "/media/b/pacific-war-se-asia-1941.jpg",
    credit:
      "OA archival · sticky scrub · Japan SE Asia 1942 propaganda trim — biased historical source",
    kind: "oa-archival" as const,
  },
}

export const supportClips = {
  aBatavia: {
    src: "/media/clips/a-batavia-market-1946.mp4",
    credit: "OA · Batavia market newsreel 1946 — Open Beelden / Wikimedia (PD)",
  },
  aPriok: {
    src: "/media/clips/a-tanjung-priok-departure.mp4",
    credit: "OA · Tanjung Priok dock departure — Wikimedia Commons",
  },
  bMaps: {
    src: "/media/clips/b-pacific-maps-crossfade-kb.mp4",
    credit: "generated-atmosphere · 1941↔1942 Pacific maps crossfade",
  },
  bPhilippines: {
    src: "/media/clips/b-mag24-philippines-1945.mp4",
    credit: "OA · MAG-24 Philippines landing 1945 — Wikimedia Commons",
  },
  wipe: {
    src: "/media/clips/wipe-map-flash.mp4",
    credit: "generated-atmosphere · chapter wipe flash from 1942 map still",
  },
}

export const ambientBed = {
  mp3: "/media/ambient/bed-layered.mp3",
  ogg: "/media/ambient/bed-layered.ogg",
  stingers: [110, 147, 165, 196, 220, 247, 277].map(
    (f) => `/media/ambient/stinger-${f}.mp3`,
  ),
}

export function clipForSection(sectionId: string) {
  return chapterClips.find((c) => c.sectionId === sectionId)
}

export function voById(id: string) {
  return allVo.find((l) => l.id === id)
}
