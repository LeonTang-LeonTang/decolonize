import { railChapters, reportThesis } from "./rail"

export const siteMeta = {
  title: "解殖民 · 展示与回收",
  subtitle: "东南亚解殖民艺术：殖民权力的「展示」与「回收」",
  tagline: "殖民权力不只留在条约和战争里，也留在谁命名、谁收藏、谁展示、谁纪念里。",
  course: "课程汇报｜学术报告式媒体滚动论文",
  date: "2026 年 10 月",
  /** Central claim — echoed in Act3 summary */
  thesis: reportThesis.claim,
  question: reportThesis.question,
  method: reportThesis.method,
}

/**
 * Nav chapters — labels are academic stages (定义 / 论证 / 例证A–F / 总结),
 * not opaque section ids.
 */
export const chapters = railChapters.map((r) => ({
  id: r.id,
  label: r.stageLabel,
  stageLabel: r.stageLabel,
  act:
    r.stage === "question" || r.stage === "credits"
      ? 0
      : r.stage === "define"
        ? 1
        : r.stage === "summary"
          ? 3
          : 2,
  stage: r.stage,
  role: r.role,
  letter: r.letter,
}))

export type ChapterId = (typeof chapters)[number]["id"]
