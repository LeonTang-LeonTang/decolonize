import { computed, ref, watch } from "vue"
import { getMuseumApp } from "./useMuseumWebGL"

export type ViewMode = "reading" | "museum"

const STORAGE_KEY = "decolonial-view-mode"

const mode = ref<ViewMode>("reading")
let hydrated = false

function applyDom(m: ViewMode) {
  if (typeof document === "undefined") return
  document.documentElement.dataset.viewMode = m
  document.body.classList.toggle("mode-reading", m === "reading")
  document.body.classList.toggle("mode-museum", m === "museum")
}

function pushMuseum(m: ViewMode) {
  getMuseumApp()?.setState({
    viewMode: m,
    immersionScale: m === "reading" ? 0.35 : 1,
  })
}

export function hydrateViewMode() {
  if (hydrated || typeof localStorage === "undefined") return
  hydrated = true
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === "reading" || saved === "museum") mode.value = saved
  applyDom(mode.value)
  pushMuseum(mode.value)
}

export function useViewMode() {
  if (!hydrated) hydrateViewMode()

  const isReading = computed(() => mode.value === "reading")
  const isMuseum = computed(() => mode.value === "museum")

  const setMode = (m: ViewMode) => {
    mode.value = m
    try {
      localStorage.setItem(STORAGE_KEY, m)
    } catch {
      /* ignore */
    }
    applyDom(m)
    pushMuseum(m)
  }

  const toggle = () => setMode(mode.value === "reading" ? "museum" : "reading")

  watch(mode, (m) => {
    applyDom(m)
    pushMuseum(m)
  })

  return { mode, isReading, isMuseum, setMode, toggle }
}
