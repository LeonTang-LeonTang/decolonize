/**
 * Pass 7 — Boat-style continuous evidence panels.
 * REAL pack / public media only; captions are argument-tied (not dump links).
 * Core D stays Democracy Monument / documenta14 — Death Railway is correction only.
 */
export type EvidencePanel = {
  src: string
  alt: string
  caption: string
  credit?: string
}

export type EvidenceStripDef = {
  core: "A" | "B" | "C" | "D" | "E" | "F"
  sectionId: string
  label: string
  thesis: string
  panels: EvidencePanel[]
}

export const evidenceStrips: EvidenceStripDef[] = [
  {
    core: "A",
    sectionId: "act2a",
    label: "证据长卷 · Core A",
    thesis: "同一场面，两套观看合同——标题即权力。",
    panels: [
      {
        src: "/media/a/saleh.jpg",
        alt: "Raden Saleh, The Capture of Prince Diponegoro, 1857",
        caption: "萨勒赫《捕获》——谈判桌上的扣押，被写成爪哇视角的捕获。",
        credit: "PD · Raden Saleh 1857",
      },
      {
        src: "/media/a/saleh-detail.jpg",
        alt: "Saleh painting detail",
        caption: "细部：身体姿态与目光分配——谁被画成主体，谁被画成被处置者。",
        credit: "PD detail",
      },
      {
        src: "/media/a/pieneman.jpg",
        alt: "Nicolaas Pieneman, The Submission of Diepo Negoro to Lieutenant-General De Kock, c.1835",
        caption: "皮内曼《投降》——殖民将军端坐，画面把征服写成和平屈服。",
        credit: "PD · Pieneman c.1835",
      },
      {
        src: "/media/a/pieneman-detail.jpg",
        alt: "Pieneman painting detail",
        caption: "细部：构图把「秩序的使者」留给殖民者——标题与构图同一装置。",
        credit: "PD detail",
      },
    ],
  },
  {
    core: "B",
    sectionId: "act2b",
    label: "证据长卷 · Core B",
    thesis: "区域名字是可观看的知识生产，不是中性地理。",
    panels: [
      {
        src: "/media/b/pacific-war-se-asia-1941.jpg",
        alt: "Pacific War SE Asia map 1941",
        caption: "盟军「东南亚」地图——命名本身就是战略装置。",
        credit: "OA / Wikimedia map still",
      },
      {
        src: "/media/b/pacific-war-southern-asia-1942.jpg",
        alt: "Pacific War Southern Asia 1942",
        caption: "1942「南方」视野——帝国叫法与盟军叫法并置，形状在漂移。",
        credit: "OA / Wikimedia",
      },
      {
        src: "/media/b/greater-east-asia-co-prosperity.jpg",
        alt: "Greater East Asia Co-Prosperity Sphere propaganda map",
        caption: "共荣圈图示——区域形状是宣传语法，不是客观边界。",
        credit: "historical propaganda map · biased source",
      },
      {
        src: "/media/stills/b/utama-mot.jpg",
        alt: "Ho Tzu Nyen Utama still",
        caption: "Utama：同一身体扮演「发现者」——发现语法可换脸。",
        credit: "exhibition still · fair use educational",
      },
      {
        src: "/media/stills/b/cdosea-sam.png",
        alt: "CDOSEA installation still",
        caption: "CDOSEA 词典重排——图像与声音漂移，区域被做成知识装置。",
        credit: "exhibition still · fair use educational",
      },
      {
        src: "/media/stills/b/hotel-aporia-still.jpg",
        alt: "Hotel Aporia still",
        caption: "Hotel Aporia（爱知旁注半句）：旅馆六频叠京都学派与特攻空间。",
        credit: "exhibition still · fair use educational",
      },
    ],
  },
  {
    core: "C",
    sectionId: "act2c",
    label: "证据长卷 · Core C",
    thesis: "解殖民发生在「谁可以看见／谁被省略」的镜头伦理。",
    panels: [
      {
        src: "/media/stills/c/letters-panduranga.jpg",
        alt: "Letters from Panduranga still",
        caption: "《来自潘朗的信》——书信体双声，拒绝民族志代言。",
        credit: "film still · fair use educational",
      },
      {
        src: "/media/c/champa-seasia-1000-1100.jpg",
        alt: "Champa SE Asia map 1000–1100",
        caption: "辅线：占婆历史地图——脚手架，不抢书信伦理主轴。",
        credit: "CC0 / OA map",
      },
      {
        src: "/media/c/indianized-kingdoms-indochina.jpg",
        alt: "Indianized kingdoms of Indochina map",
        caption: "印度化王国图——土地可被重新命名；作品让省略出声。",
        credit: "OA historical map",
      },
      {
        src: "/media/c/champa-locator.jpg",
        alt: "Champa locator",
        caption: "定位图：潘朗曾被写进吞并与核电计划——省略是政治。",
        credit: "locator still",
      },
      {
        src: "/media/stills/c/tuan-specter.png",
        alt: "Tuan Andrew Nguyen specter still",
        caption: "对照：阮俊《成为祖先的幽灵》——帝国人口流动的幽灵装置。",
        credit: "exhibition still · fair use educational",
      },
    ],
  },
  {
    core: "D",
    sectionId: "act2d",
    label: "证据长卷 · Core D",
    thesis: "复制神圣物＝拆光环；主轴是民主纪念碑翼板，不是死亡铁路。",
    panels: [
      {
        src: "/media/d/democracy-monument-bangkok.jpg",
        alt: "Democracy Monument Bangkok",
        caption: "曼谷民主纪念碑——作品等比复制翼板，把神圣物做成可检验物件。",
        credit: "CC BY-SA photo",
      },
      {
        src: "/media/stills/d/arin-install-artpress.jpg",
        alt: "Arin Rungjang installation",
        caption: "文献展装置：翼板＋肖像＋访客簿＋视频——纪念碑被改写。",
        credit: "installation photo · fair use educational",
      },
      {
        src: "/media/stills/d/arin-shanghart.jpg",
        alt: "Arin Rungjang ShanghART",
        caption: "展墙语境：日期与数字标题把立宪之日量成可读公式。",
        credit: "exhibition photo · fair use educational",
      },
      {
        src: "/media/stills/d/arin-portrait.jpg",
        alt: "Arin Rungjang portrait context",
        caption: "肖像与访客簿——观众被写入纪念装置，而非旁观。",
        credit: "portrait / install context · fair use",
      },
      {
        src: "/media/d/death-railway-map.png",
        alt: "Death Railway map — correction only",
        caption: "纠错旁注：死亡铁路是另一条苦役史——可作旁注，不可当主视觉。",
        credit: "map still · correction only, not Core D primary",
      },
    ],
  },
  {
    core: "E",
    sectionId: "act2e",
    label: "证据长卷 · Core E",
    thesis: "解殖民发生在档案接缝，不在复原一个更纯的过去。",
    panels: [
      {
        src: "/media/stills/e/archipelago.jpg",
        alt: "Yee I-Lann archipelago / Sulu Stories",
        caption: "《苏禄故事》：数码并置撕开殖民海图与民族志摄影的分类权。",
        credit: "artwork still · fair use educational",
      },
      {
        src: "/media/stills/e/barangay.jpg",
        alt: "Yee I-Lann barangay panel",
        caption: "形式本身就是论证——接缝留在画面上。",
        credit: "artwork still · fair use educational",
      },
      {
        src: "/media/e/dalrymple-borneo-sulu-1769.jpg",
        alt: "Dalrymple Borneo Sulu chart 1769",
        caption: "Dalrymple 1769 海图——「帝国怎么画海」的辅线对照。",
        credit: "PD · Dalrymple 1769",
      },
      {
        src: "/media/e/sulu-1848-1899.jpg",
        alt: "Sulu 1848–1899 map",
        caption: "苏禄海域历史图——国界切开跨海世界，为听懂群岛构图的政治。",
        credit: "OA historical map",
      },
      {
        src: "/media/e/moro-sultanates.jpg",
        alt: "Moro sultanates map",
        caption: "摩尔苏丹国图示：分类权先于「国家」叙事。",
        credit: "OA / educational map",
      },
    ],
  },
  {
    core: "F",
    sectionId: "act2f",
    label: "证据长卷 · Core F",
    thesis: "展览标题与雕像零点——谁在「面对」帝国，谁在管理反思。",
    panels: [
      {
        src: "/media/f/raffles-statue-singapore-river.jpg",
        alt: "Raffles statue Singapore River",
        caption: "河畔莱佛士像：复制品比原作更常被看见——零点叙事是纪念装置。",
        credit: "CC BY-SA",
      },
      {
        src: "/media/f/raffles-statue-front.jpg",
        alt: "Raffles statue front",
        caption: "正面像：绅士姿态把殖民奠基写成可凝视的「起源」。",
        credit: "CC BY-SA",
      },
      {
        src: "/media/f/raffles-portrait-joseph.jpg",
        alt: "Raffles portrait",
        caption: "肖像传统：绅士形象与河畔复制像同一观看合同。",
        credit: "OA / PD portrait",
      },
      {
        src: "/media/stills/f/artist-empire-tate-1.jpg",
        alt: "Artist and Empire Tate",
        caption: "泰特《Artist and Empire: Facing…》——「面对」是馆藏中心主义语法。",
        credit: "exhibition still · fair use educational",
      },
      {
        src: "/media/stills/f/artist-empire-tate-2.jpg",
        alt: "Artist and Empire installation",
        caption: "展厅现场：同一展览工程，伦敦与新加坡副标题开战。",
        credit: "exhibition still · fair use educational",
      },
      {
        src: "/media/stills/f/pioneers-arrival-2019.jpg",
        alt: "2019 pioneers arrival intervention",
        caption: "2019 官方「隐形」莱佛士：国家收编解殖民外观的视觉工程。",
        credit: "public intervention photo · fair use educational",
      },
      {
        src: "/media/stills/f/sang-nila-utama-2019.jpg",
        alt: "Sang Nila Utama 2019",
        caption: "旁置其他先驱——反思，也是管理。",
        credit: "public intervention photo · fair use educational",
      },
    ],
  },
]

export function stripForSection(sectionId: string): EvidenceStripDef | undefined {
  return evidenceStrips.find((s) => s.sectionId === sectionId)
}
