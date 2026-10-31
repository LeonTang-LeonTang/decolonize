import { computed, onMounted, onUnmounted, type Ref } from "vue"
import { slides, DECK_TOTAL, slideForChapter } from "../content/slides"

const ORDER = slides.map((s) => s.id)

export function useDeckNav(activeId: Ref<string>) {
  const page = computed(() => {
    const s = slideForChapter(activeId.value)
    return s?.page ?? 1
  })
  const total = computed(() => DECK_TOTAL)
  const label = computed(() => {
    const s = slideForChapter(activeId.value)
    return s ? `第 ${s.page} / ${s.total} 页 · ${s.stageLabel}` : ""
  })

  const jumpTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const go = (dir: -1 | 1) => {
    const idx = ORDER.indexOf(activeId.value)
    const next = ORDER[Math.max(0, Math.min(ORDER.length - 1, (idx < 0 ? 0 : idx) + dir))]
    if (next) jumpTo(next)
  }

  const onKey = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement | null)?.tagName
    if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault()
      go(1)
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault()
      go(-1)
    } else if (e.key === " " && !e.shiftKey) {
      // Space advances like PPT; Shift+Space reserved for browser
      const ae = document.activeElement
      if (ae && ae !== document.body && ae.tagName === "BUTTON") return
      e.preventDefault()
      go(1)
    } else if (e.key === " " && e.shiftKey) {
      e.preventDefault()
      go(-1)
    }
  }

  onMounted(() => window.addEventListener("keydown", onKey))
  onUnmounted(() => window.removeEventListener("keydown", onKey))

  return { page, total, label, go, jumpTo, ORDER }
}
