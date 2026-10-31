export const siteMeta = {
  title: "解殖民 · 展示与回收",
  subtitle: "东南亚解殖民艺术：殖民权力的「展示」与「回收」",
  tagline: "殖民权力不只留在条约和战争里，也留在谁命名、谁收藏、谁展示、谁纪念里。",
  course: "课程汇报｜媒体优先滚动论文",
  date: "2026 年 10 月",
  thesis:
    "本汇报锁定东南亚主轴，并以东亚↔东南亚的桥梁案例（命名、帝国展览、轴心记忆）回应「展示」与「回收」。东亚／东北亚深挖交由同学主线。",
}

export const chapters = [
  { id: "hero", label: "开篇", act: 0 },
  { id: "act1", label: "第一幕 · 概念", act: 1 },
  { id: "act2a", label: "A 两幅画", act: 2 },
  { id: "act2b", label: "B 命名", act: 2 },
  { id: "act2c", label: "C 潘朗", act: 2 },
  { id: "act2d", label: "D 纪念碑", act: 2 },
  { id: "act2e", label: "E 苏禄", act: 2 },
  { id: "act2f", label: "F 帝国", act: 2 },
  { id: "act2support", label: "Support", act: 2 },
  { id: "act3", label: "第三幕 · 学术", act: 3 },
  { id: "credits", label: "致谢", act: 0 },
] as const

export type ChapterId = (typeof chapters)[number]["id"]
