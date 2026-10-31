/**
 * Pass 6 — PPT / lecture-deck beats for the academic rail.
 * Each slide is claim-first; media/WebGL are evidence revealed after.
 */
import { reportThesis, jointProof, evidenceChain } from "./rail"
import { act1Intro, powerDevices, flipTerms } from "./act1"
import { act2Intro, nodeA, nodeB, nodeC, nodeD, nodeE, nodeF } from "./act2"
import { act3Intro } from "./act3"
import { siteMeta } from "./site"

export type SlideBeat = {
  id: string
  page: number
  total: number
  stageLabel: string
  eyebrow: string
  /** Big claim line — PPT title */
  claim: string
  /** One thesis sentence under the claim */
  thesis: string
  /** 3–5 short bullets (lecture clarity) */
  bullets: string[]
  /** Persistent strip while museum/evidence is open */
  thesisStrip: string
  /** Optional evidence CTA */
  evidenceCta?: string
  evidenceTarget?: string
}

export const DECK_TOTAL = 12

export const slides: SlideBeat[] = [
  {
    id: "hero",
    page: 1,
    total: DECK_TOTAL,
    stageLabel: "问题",
    eyebrow: "课程汇报 · 问题提出",
    claim: "殖民权力如何在东南亚艺术与展览现场被「展示」与「回收」？",
    thesis: reportThesis.claim,
    bullets: [
      "谁命名、谁收藏、谁展出、谁纪念——这些看似中性的装置，如何延续或拆解殖民性？",
      "本汇报按学术报告轨：定义 → 论证 → 例证 A–F → 总结。",
      "影像与三维展厅是证据／沉浸辅叙，不替代正文论证。",
      "东亚／东南亚桥梁为主；六案锁定为证据链，非散点故事。",
    ],
    thesisStrip: `总论：${siteMeta.thesis}`,
    evidenceCta: "开始阅读 · 进入定义",
    evidenceTarget: "act1",
  },
  {
    id: "act1",
    page: 2,
    total: DECK_TOTAL,
    stageLabel: "定义",
    eyebrow: act1Intro.eyebrow,
    claim: act1Intro.title,
    thesis: act1Intro.argumentSetup,
    bullets: [
      ...flipTerms.slice(0, 3).map((t) => `${t.term}：${t.front}`),
      `操作对——展示：权力做成可观看的正当性；回收：夺回／改写／再景观化。`,
      `四装置：${powerDevices.map((d) => d.title).join(" · ")}。`,
    ],
    thesisStrip: "本段论点：先立定义，再进证据——解殖民对准的是装置，不只是旧旗帜。",
    evidenceCta: "展开术语卡与权力装置",
    evidenceTarget: "act1-devices",
  },
  {
    id: "act2intro",
    page: 3,
    total: DECK_TOTAL,
    stageLabel: "论证",
    eyebrow: act2Intro.eyebrow,
    claim: act2Intro.title,
    thesis: act2Intro.lead,
    bullets: [
      act2Intro.orderNote,
      ...evidenceChain.map((s) => `${s.letter}. ${s.title} — ${s.claim}`),
    ],
    thesisStrip: "本段论点：六个作品／展览是证据链，顺序即推理链。",
    evidenceCta: "进入三维走廊 · 展开证据",
    evidenceTarget: "act2a",
  },
  {
    id: "act2a",
    page: 4,
    total: DECK_TOTAL,
    stageLabel: "例证A",
    eyebrow: nodeA.eyebrow,
    claim: nodeA.title,
    thesis: nodeA.thesis,
    bullets: [
      nodeA.railCallback,
      "左 Saleh《捕获》(1857) ↔ 右 Pieneman《投降》(约 1835)——同一场面，两套观看合同。",
      "标题即权力：谁命名画面，谁分配道德位置。",
      "归还与展墙用词是这套视觉政权在馆藏时间里的延长。",
      "读画面与画题，不展开爪哇战争全史。",
    ],
    thesisStrip: `本段论点：${nodeA.thesis}`,
    evidenceCta: "展开证据 · 进入双画展厅",
    evidenceTarget: "a-compare",
  },
  {
    id: "act2b",
    page: 5,
    total: DECK_TOTAL,
    stageLabel: "例证B",
    eyebrow: nodeB.eyebrow,
    claim: nodeB.title,
    thesis: nodeB.thesis,
    bullets: [
      nodeB.railCallback,
      "Utama：同一身体扮演「发现者」——发现语法可换脸。",
      "CDOSEA：词典重排图像与声音——区域形状漂移是可观看的知识生产。",
      "Hotel Aporia：旅馆六频叠京都学派与特攻空间（爱知旁注半句）。",
      "解殖民是观看知识如何被生产，而非背诵地名沿革。",
    ],
    thesisStrip: `本段论点：${nodeB.thesis}`,
    evidenceCta: "展开证据 · 进入命名展厅",
    evidenceTarget: "b-maps",
  },
  {
    id: "act2c",
    page: 6,
    total: DECK_TOTAL,
    stageLabel: "例证C",
    eyebrow: nodeC.eyebrow,
    claim: nodeC.title,
    thesis: nodeC.thesis,
    bullets: [
      nodeC.railCallback,
      "主作品：阮静诗《来自潘朗的信》(2015)——书信体影像散文，拒绝民族志代言。",
      "解殖民发生在「谁可以看见／谁被省略」的镜头伦理。",
      "对照：阮俊《成为祖先的幽灵》(2019)——帝国人口流动的幽灵装置。",
      "占婆史与核电只作短脚手架，不抢主轴。",
    ],
    thesisStrip: `本段论点：${nodeC.thesis}`,
    evidenceCta: "展开证据 · 进入省略展厅",
  },
  {
    id: "act2d",
    page: 7,
    total: DECK_TOTAL,
    stageLabel: "例证D",
    eyebrow: nodeD.eyebrow,
    claim: nodeD.title,
    thesis: nodeD.thesis,
    bullets: [
      nodeD.railCallback,
      "作品为 documenta 14 创作：等比民主纪念碑翼板复制＋肖像＋访客簿＋视频。",
      "解殖民读法落在装置如何改写纪念碑，而非泰缅铁路史。",
      "纠错：短名单曾误系「死亡铁路」——本站以曼谷民主纪念碑为准。",
      "复制神圣物 = 拆光环。",
    ],
    thesisStrip: `本段论点：${nodeD.thesis}`,
    evidenceCta: "展开证据 · 进入纪念碑展厅",
  },
  {
    id: "act2e",
    page: 8,
    total: DECK_TOTAL,
    stageLabel: "例证E",
    eyebrow: nodeE.eyebrow,
    claim: nodeE.title,
    thesis: nodeE.thesis,
    bullets: [
      nodeE.railCallback,
      "Yee I-Lann《苏禄故事》(2005)：数码并置撕开殖民海图与民族志摄影的分类权。",
      "形式本身就是论证——档案接缝留在画面上。",
      "Dalrymple 海图是「帝国怎么画海」的辅线对照，不是正文。",
      "个人拼贴之上，下一案将升到机构展览工程。",
    ],
    thesisStrip: `本段论点：${nodeE.thesis}`,
    evidenceCta: "展开证据 · 进入档案展厅",
  },
  {
    id: "act2f",
    page: 9,
    total: DECK_TOTAL,
    stageLabel: "例证F",
    eyebrow: nodeF.eyebrow,
    claim: nodeF.title,
    thesis: nodeF.thesis,
    bullets: [
      nodeF.railCallback,
      "泰特《Artist and Empire: Facing…》→ 新加坡《(En)countering…》——副标题是策展语法战。",
      "2019 官方「隐形」莱佛士：国家收编解殖民外观的视觉工程。",
      "读展览与纪念装置，不是建国编年。",
      "Support 一句话：documenta15／Taring Padi 风波 = 展览政治同型回响。",
    ],
    thesisStrip: `本段论点：${nodeF.thesis}`,
    evidenceCta: "展开证据 · 进入展览工程展厅",
  },
  {
    id: "act2support",
    page: 10,
    total: DECK_TOTAL,
    stageLabel: "旁注",
    eyebrow: "旁注 · 非 Core",
    claim: "短笺：documenta15／Taring Padi 只作展览政治回响",
    thesis: "不抢 A–F 主轴；说明当代文献展冲突与「展示」装置同型。",
    bullets: [
      "Support 不是第七证，而是防止主轴被热点事件带偏的护栏。",
      "记忆政治与馆藏中心主义的争论，在 Core F 已有同型。",
      "继续向下进入总结。",
    ],
    thesisStrip: "旁注：热点回响，不替代六案证据。",
    evidenceCta: "进入总结",
    evidenceTarget: "act3",
  },
  {
    id: "act3",
    page: 11,
    total: DECK_TOTAL,
    stageLabel: "总结",
    eyebrow: act3Intro.eyebrow,
    claim: jointProof.title,
    thesis: jointProof.returnClaim,
    bullets: [
      jointProof.lead,
      ...jointProof.points.map((p) => `${p.title}：${p.body}`),
    ],
    thesisStrip: `总结回扣：${jointProof.returnClaim}`,
    evidenceCta: "对照学术框架与开放问题",
  },
  {
    id: "credits",
    page: 12,
    total: DECK_TOTAL,
    stageLabel: "证据",
    eyebrow: "证据来源 · Credits",
    claim: "来源、版权与媒体规则",
    thesis: "教育／非商用；Tier1 公版与许可静帧；不 AI 伪作历史作品。",
    bullets: [
      "Tier1 来自 decolonial-packs → public/media；Tier2 仅占位＋外链。",
      "中文 VO = edge-tts；环境层随旁白闪避。",
      "三维展厅挂真实静帧，非生成伪作。",
      "完整清单见 CREDITS.md。",
    ],
    thesisStrip: "证据可追溯；沉浸不替代引用。",
  },
]

export const slideById = Object.fromEntries(slides.map((s) => [s.id, s])) as Record<
  string,
  SlideBeat
>

export function slideForChapter(id: string): SlideBeat | undefined {
  return slideById[id]
}
