import { computed, onMounted, onUnmounted, type Ref } from "vue"
import { slides, DECK_TOTAL, slideForChapter, slideById } from "../content/slides"
import { allVo } from "../content/media"
import { playStinger, playVo } from "./useAudio"

const ORDER = slides.map((s) => s.id)

/** Map slide id → primary enter VO */
const SLIDE_VO: Record<string, string> = {
  hero: "hero-enter",
  act1: "act1-enter",
  act2intro: "act1-devices",
  act2a: "a-enter",
  act2b: "b-enter",
  act2c: "c-enter",
  act2d: "d-enter",
  act2e: "e-enter",
  act2f: "f-enter",
  act3: "act3-enter",
}

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

  const announceSlide = (id: string) => {
    const slide = slideById[id]
    const stinger = slide ? (slide.page - 1) % 7 : 0
    playStinger(stinger)
    const voId = SLIDE_VO[id]
    if (voId) {
      const line = allVo.find((l) => l.id === voId)
      playVo(voId, { text: line?.zh, force: true, stinger })
    }
  }

  const jumpTo = (id: string, opts?: { announce?: boolean }) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
    if (opts?.announce !== false) {
      // slight delay so scroll starts before VO
      window.setTimeout(() => announceSlide(id), 120)
    }
  }

  const go = (dir: -1 | 1) => {
    const idx = ORDER.indexOf(activeId.value)
    const next = ORDER[Math.max(0, Math.min(ORDER.length - 1, (idx < 0 ? 0 : idx) + dir))]
    if (next && next !== activeId.value) jumpTo(next)
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

  return { page, total, label, go, jumpTo, announceSlide, ORDER }
}
