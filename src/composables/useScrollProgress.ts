import { onMounted, onUnmounted, ref } from "vue"

export function useScrollProgress() {
  const progress = ref(0)
  const activeId = ref("hero")

  const update = () => {
    const doc = document.documentElement
    const max = doc.scrollHeight - window.innerHeight
    progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"))
    let current = "hero"
    const mid = window.scrollY + window.innerHeight * 0.35
    for (const el of sections) {
      if (el.offsetTop <= mid) current = el.dataset.chapter || current
    }
    activeId.value = current
  }

  onMounted(() => {
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
  })

  onUnmounted(() => {
    window.removeEventListener("scroll", update)
    window.removeEventListener("resize", update)
  })

  return { progress, activeId }
}
