/**
 * Pass 8 — Kristallnacht-style multi-beat hold directors per Core.
 * Sequence: claim → artwork reveal → effect. Real pack media only.
 * Core D: Democracy Monument primary; Death Railway never a hero beat.
 */
export type HoldBeatRole = "claim" | "artwork" | "effect"

export type HoldBeat = {
  role: HoldBeatRole
  src: string
  alt: string
  caption: string
}

export type HoldDirectorDef = {
  sectionId: string
  label: string
  exitVoId?: string
  exitStinger?: number
  beats: HoldBeat[]
}

const ROLE_LABEL: Record<HoldBeatRole, string> = {
  claim: "定格 1 · 主张卡",
  artwork: "定格 2 · 作品现身",
  effect: "定格 3 · 机制／效果",
}

export function beatRoleLabel(role: HoldBeatRole) {
  return ROLE_LABEL[role]
}

export const holdDirectors: HoldDirectorDef[] = [
  {
    sectionId: "act2a",
    label: "Core A · 三拍定格",
    exitVoId: "a-enter",
    exitStinger: 2,
    beats: [
      {
        role: "claim",
        src: "/media/a/saleh.jpg",
        alt: "Raden Saleh, The Capture of Prince Diponegoro",
        caption: "同一场面，两套观看合同——标题本身就是权力装置。",
      },
      {
        role: "artwork",
        src: "/media/a/pieneman.jpg",
        alt: "Pieneman, The Submission of Diepo Negoro",
        caption: "作品现身：皮内曼把扣押写成「投降」；萨勒赫改写为「捕获」。",
      },
      {
        role: "effect",
        src: "/media/a/saleh-detail.jpg",
        alt: "Saleh painting detail",
        caption: "效果：目光与姿态分配谁是主体——归还与展墙用词是这套政权的延长。",
      },
    ],
  },
  {
    sectionId: "act2b",
    label: "Core B · 三拍定格",
    exitVoId: "b-enter",
    exitStinger: 3,
    beats: [
      {
        role: "claim",
        src: "/media/b/pacific-war-se-asia-1941.jpg",
        alt: "Pacific War SE Asia map 1941",
        caption: "区域名字是可观看的知识生产，不是中性地理。",
      },
      {
        role: "artwork",
        src: "/media/stills/b/utama-mot.jpg",
        alt: "Ho Tzu Nyen Utama still",
        caption: "作品现身：Utama／CDOSEA——发现语法与词典可被重演、重排。",
      },
      {
        role: "effect",
        src: "/media/b/greater-east-asia-co-prosperity.jpg",
        alt: "Greater East Asia Co-Prosperity Sphere map",
        caption: "效果：共荣圈与盟军战区图并置——形状在漂移，命名即装置。",
      },
    ],
  },
  {
    sectionId: "act2c",
    label: "Core C · 三拍定格",
    exitVoId: "c-enter",
    exitStinger: 4,
    beats: [
      {
        role: "claim",
        src: "/media/c/champa-locator.jpg",
        alt: "Champa locator map",
        caption: "省略与缺席也是展示伦理——谁被画进「东南亚」叙事。",
      },
      {
        role: "artwork",
        src: "/media/stills/c/letters-panduranga.jpg",
        alt: "Letters from Panduranga still",
        caption: "作品现身：Letters from Panduranga——通信体裁把缺席做成可听的证据。",
      },
      {
        role: "effect",
        src: "/media/c/indianized-kingdoms-indochina.jpg",
        alt: "Indianized kingdoms Indochina map",
        caption: "效果：历史地图的「印度化王国」图层——边界语法先于民族国家。",
      },
    ],
  },
  {
    sectionId: "act2d",
    label: "Core D · 三拍定格",
    exitVoId: "d-enter",
    exitStinger: 5,
    beats: [
      {
        role: "claim",
        src: "/media/d/democracy-monument-bangkok.jpg",
        alt: "Democracy Monument Bangkok",
        caption: "纪念碑数字是可点读的政治语法——不是另一条铁路的故事。",
      },
      {
        role: "artwork",
        src: "/media/stills/d/arin-install-artpress.jpg",
        alt: "Arin Rungjang installation still",
        caption: "作品现身：阿林装置把 246247… 做成可进入的纪念空间。",
      },
      {
        role: "effect",
        src: "/media/stills/d/arin-video-thumb.jpg",
        alt: "Arin video still",
        caption: "效果：数字点读把官方纪念改写成可争辩的证据链（纠错：≠死亡铁路）。",
      },
    ],
  },
  {
    sectionId: "act2e",
    label: "Core E · 三拍定格",
    exitVoId: "e-enter",
    exitStinger: 6,
    beats: [
      {
        role: "claim",
        src: "/media/e/dalrymple-borneo-sulu-1769.jpg",
        alt: "Dalrymple Borneo Sulu chart 1769",
        caption: "海图接缝处，主权与航线被同时画出。",
      },
      {
        role: "artwork",
        src: "/media/stills/e/archipelago.jpg",
        alt: "Archipelago still",
        caption: "作品现身：Sulu Stories／群岛帧——档案与口述在同一接缝里。",
      },
      {
        role: "effect",
        src: "/media/e/sulu-1848-1899.jpg",
        alt: "Sulu 1848–1899 map",
        caption: "效果：殖民分界叠在苏丹国示意上——边界是被画出的，不是被发现的。",
      },
    ],
  },
  {
    sectionId: "act2f",
    label: "Core F · 三拍定格",
    exitVoId: "f-enter",
    exitStinger: 0,
    beats: [
      {
        role: "claim",
        src: "/media/f/raffles-statue-front.jpg",
        alt: "Raffles statue Singapore",
        caption: "展览与雕像是同一套帝国纪念工程的两端。",
      },
      {
        role: "artwork",
        src: "/media/stills/f/artist-empire-tate-1.jpg",
        alt: "Artist and Empire Tate still",
        caption: "作品现身：Artist & Empire／纪念装置——馆墙重新分配谁可被观看。",
      },
      {
        role: "effect",
        src: "/media/f/raffles-portrait-stamford.jpeg",
        alt: "Stamford Raffles portrait",
        caption: "效果：肖像与雕像互证——「发现者」形象在展墙上被再生产。",
      },
    ],
  },
]

export function directorForSection(sectionId: string) {
  return holdDirectors.find((d) => d.sectionId === sectionId)
}

/** Subtle parallax textures per Core — real pack maps/paper only */
export type ParallaxLayerDef = {
  src: string
  depth: number
  opacity: number
  scale?: number
}

export const parallaxBySection: Record<string, ParallaxLayerDef[]> = {
  act2a: [
    { src: "/media/a/pieneman.jpg", depth: 0.1, opacity: 0.11, scale: 1.16 },
    { src: "/media/a/saleh.jpg", depth: 0.24, opacity: 0.085, scale: 1.26 },
    { src: "/media/a/saleh-detail.jpg", depth: 0.4, opacity: 0.055, scale: 1.4 },
  ],
  act2b: [
    { src: "/media/b/pacific-war-se-asia-1941.jpg", depth: 0.1, opacity: 0.12, scale: 1.18 },
    { src: "/media/b/pacific-war-southern-asia-1942.jpg", depth: 0.24, opacity: 0.09, scale: 1.28 },
    { src: "/media/b/greater-east-asia-co-prosperity.jpg", depth: 0.4, opacity: 0.055, scale: 1.38 },
  ],
  act2c: [
    { src: "/media/c/champa-seasia-1000-1100.jpg", depth: 0.1, opacity: 0.11, scale: 1.18 },
    { src: "/media/c/indianized-kingdoms-indochina.jpg", depth: 0.24, opacity: 0.08, scale: 1.28 },
    { src: "/media/c/champa-locator.jpg", depth: 0.4, opacity: 0.05, scale: 1.4 },
  ],
  act2d: [
    // Democracy Monument primary; Death Railway only as faint deep layer
    { src: "/media/d/democracy-monument-bangkok.jpg", depth: 0.1, opacity: 0.12, scale: 1.16 },
    { src: "/media/stills/d/arin-install-artpress.jpg", depth: 0.24, opacity: 0.08, scale: 1.26 },
    { src: "/media/d/death-railway-map.png", depth: 0.42, opacity: 0.04, scale: 1.42 },
  ],
  act2e: [
    { src: "/media/e/dalrymple-borneo-sulu-1769.jpg", depth: 0.1, opacity: 0.11, scale: 1.18 },
    { src: "/media/e/moro-sultanates.jpg", depth: 0.24, opacity: 0.08, scale: 1.28 },
    { src: "/media/e/sulu-1848-1899.jpg", depth: 0.4, opacity: 0.05, scale: 1.4 },
  ],
  act2f: [
    { src: "/media/f/raffles-statue-singapore-river.jpg", depth: 0.1, opacity: 0.1, scale: 1.18 },
    { src: "/media/stills/f/artist-empire-tate-2.jpg", depth: 0.24, opacity: 0.07, scale: 1.28 },
    { src: "/media/f/raffles-statue-front.jpg", depth: 0.4, opacity: 0.05, scale: 1.4 },
  ],
}
