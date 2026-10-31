/**
 * Academic report armature — 定义 → 论证 → 例证 A–F → 总结
 * Keeps artworks/exhibitions as Core spine; this file only adds presentation logic.
 */

export type RailStage = "question" | "define" | "argue" | "evidence" | "summary" | "credits"

export type RailStep = {
  id: string
  stage: RailStage
  /** Short nav label (academic stage) */
  stageLabel: string
  /** Optional evidence letter A–F */
  letter?: string
  /** One-line role in the argument */
  role: string
}

/** Report-level thesis the six cases return to */
export const reportThesis = {
  question:
    "殖民权力如何在东南亚艺术与展览现场被「展示」与「回收」？谁命名、谁收藏、谁展出、谁纪念——这些看似中性的装置，如何延续或拆解殖民性？",
  claim:
    "解殖民不只是反对旧旗帜，而是拆解命名、收藏、展示与纪念里的权力装置；东南亚六个作品／展览节点共同证明：视觉与展场本身就是论证现场。",
  method:
    "本汇报按学术报告轨呈现（文章优先）：先立定义，再说明论证路径，再以六案为证据链，最后回到总论与开放问题。影像与静帧是证据／沉浸辅叙，不替代正文论证。",
}

/** How to read — Hero rail map */
export const railMap = [
  {
    key: "define",
    roman: "Ⅰ",
    title: "定义",
    body: "殖民／殖民性／解殖民／展示与回收——把易混术语与权力装置先摊开。",
  },
  {
    key: "argue",
    roman: "Ⅱ",
    title: "论证路径",
    body: "声明：六个作品／展览是证据，不是散点故事；顺序即推理链。",
  },
  {
    key: "evidence",
    roman: "Ⅲ",
    title: "例证 A–F",
    body: "画题对决 → 命名装置 → 省略伦理 → 纪念碑 → 档案接缝 → 展览／纪念工程。",
  },
  {
    key: "summary",
    roman: "Ⅳ",
    title: "总结",
    body: "六案合证、回扣总论，并留下开放问题与证据来源。",
  },
] as const

/** Chapter list with academic stage labels for ChapterNav */
export const railChapters: RailStep[] = [
  { id: "hero", stage: "question", stageLabel: "问题", role: "提出问题与阅读地图" },
  { id: "act1", stage: "define", stageLabel: "定义", role: "术语与权力装置" },
  { id: "act2intro", stage: "argue", stageLabel: "论证", role: "六案证据链说明" },
  { id: "act2a", stage: "evidence", stageLabel: "例证A", letter: "A", role: "画题对决：投降↔捕获" },
  { id: "act2b", stage: "evidence", stageLabel: "例证B", letter: "B", role: "命名权装置" },
  { id: "act2c", stage: "evidence", stageLabel: "例证C", letter: "C", role: "省略与可见性" },
  { id: "act2d", stage: "evidence", stageLabel: "例证D", letter: "D", role: "纪念碑装置" },
  { id: "act2e", stage: "evidence", stageLabel: "例证E", letter: "E", role: "档案接缝" },
  { id: "act2f", stage: "evidence", stageLabel: "例证F", letter: "F", role: "展览与纪念工程" },
  { id: "act2support", stage: "evidence", stageLabel: "旁注", role: "非 Core 短笺" },
  { id: "act3", stage: "summary", stageLabel: "总结", role: "合证、回扣、开放问题" },
  { id: "credits", stage: "credits", stageLabel: "证据", role: "来源与版权" },
]

/**
 * Bridge captions between chapters — logical move (prev → next).
 * Shown in ChapterWipe / BridgeCaption; also usable as VO text.
 */
export const bridges: {
  id: string
  from: string
  to: string
  /** Wipe short label */
  wipe: string
  /** Caption: the logical move */
  move: string
  /** Why this case follows / thesis callback */
  why: string
}[] = [
  {
    id: "hero-act1",
    from: "hero",
    to: "act1",
    wipe: "Ⅰ · 定义",
    move: "问题提出 → 立定义",
    why: "先把殖民／殖民性／解殖民摊开，观众才跟得上后面六案在拆什么装置。",
  },
  {
    id: "act1-argue",
    from: "act1",
    to: "act2intro",
    wipe: "Ⅱ · 论证",
    move: "定义 → 论证路径",
    why: "术语就位后，声明证据链：六个作品／展览，按「展示与回收」逐步加压。",
  },
  {
    id: "argue-a",
    from: "act2intro",
    to: "act2a",
    wipe: "例证 A",
    move: "论证路径 → 例证 A",
    why: "第一证：画题本身就是权力——同一场面，投降与捕获对决。",
  },
  {
    id: "a-b",
    from: "act2a",
    to: "act2b",
    wipe: "例证 B",
    move: "从画作对峙 → 命名权装置",
    why: "A 证明标题可改写道德位置；B 把尺度放大到区域之名——词典与旅馆成为可观看的知识生产。",
  },
  {
    id: "b-c",
    from: "act2b",
    to: "act2c",
    wipe: "例证 C",
    move: "从区域命名 → 省略与可见性",
    why: "命名之后是谁被省略：书信体影像让官方史空白成为可听可见的间隙。",
  },
  {
    id: "c-d",
    from: "act2c",
    to: "act2d",
    wipe: "例证 D",
    move: "从镜头伦理 → 纪念碑装置",
    why: "可见性伦理推到公共神圣物：翼板复制进文献展，日期变成可读形式。",
  },
  {
    id: "d-e",
    from: "act2d",
    to: "act2e",
    wipe: "例证 E",
    move: "从神圣复制 → 档案接缝",
    why: "纪念碑被拆神圣后，E 把殖民档案的分类权留在画面接缝上——形式即论证。",
  },
  {
    id: "e-f",
    from: "act2e",
    to: "act2f",
    wipe: "例证 F",
    move: "从拼贴改写 → 展览与纪念工程",
    why: "个人拼贴之上是机构展示：双城展览副标题与官方「隐形」莱佛士，展示装置本身成争议场。",
  },
  {
    id: "f-summary",
    from: "act2f",
    to: "act3",
    wipe: "Ⅳ · 总结",
    move: "六案合证 → 总结",
    why: "回到总论：六案共同证明展示／回收装置；并对照学术框架与开放问题。",
  },
]

export const bridgeByTo = Object.fromEntries(bridges.map((b) => [b.to, b])) as Record<
  string,
  (typeof bridges)[number]
>

/** Ordered evidence chain blurb for Act2 intro */
export const evidenceChain = [
  { letter: "A", title: "两幅画", claim: "画题／构图对决 = 观看合同" },
  { letter: "B", title: "何子彦", claim: "区域命名 = 可观看知识装置" },
  { letter: "C", title: "潘朗书信", claim: "省略 = 镜头伦理现场" },
  { letter: "D", title: "朗姜纪念碑", claim: "复制神圣物 = 拆光环" },
  { letter: "E", title: "苏禄拼贴", claim: "档案接缝 = 形式论证" },
  { letter: "F", title: "帝国展／莱佛士", claim: "展览＋纪念工程 = 机构展示政治" },
] as const

/** What the six cases jointly prove — Act3 summary return */
export const jointProof = {
  eyebrow: "总结 · 回扣总论",
  title: "六案合证：展示与回收",
  lead:
    "A–F 不是六个互不相干的故事，而是同一论题的六步加压：从画题到区域名，从省略到纪念碑，从档案接缝到双城展览与官方纪念工程。",
  points: [
    {
      title: "命名即权力",
      body: "A 的投降／捕获、B 的东南亚词典、F 的 Facing／(En)countering——标题与副标题分配道德与叙述权。",
    },
    {
      title: "可见性与省略",
      body: "C 让官方史空白出声；D 把被删的轴心通道叠进装置；E 把分类接缝留在画面上。",
    },
    {
      title: "展场与纪念是装置",
      body: "馆藏归还、文献展翼板、国家美术馆迁展、河畔「隐形」——解殖民与再收编都发生在展示现场。",
    },
    {
      title: "回收≠完成",
      body: "归还、当代补丁、官方反思景观，都不自动等于殖民性解除；六案共同拒绝「一次展完」的进度条幻想。",
    },
  ],
  returnClaim:
    "因此：本汇报的论点成立于作品与展览的可读性——解殖民艺术把权力装置做成可检验的视觉／空间形式；学术框架（去帝国、策展史、多向记忆）用来对照，而非替代六案证据。",
}
