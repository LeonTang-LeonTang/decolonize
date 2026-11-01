import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { onMounted, onUnmounted, shallowRef } from "vue"
import { useReducedMotion } from "./useReducedMotion"

gsap.registerPlugin(ScrollTrigger)
// Pass 9: expose for headless settle scripts (unforced portal shots)
if (typeof window !== "undefined") {
  ;(window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger
}


let sharedLenis: Lenis | null = null

/** Programmatic scroll that stays in sync with Lenis + ScrollTrigger (Pass 9). */
export function museumScrollTo(y: number, opts?: { immediate?: boolean }) {
  const immediate = opts?.immediate !== false
  if (sharedLenis) {
    sharedLenis.scrollTo(y, { immediate, force: true })
  } else {
    window.scrollTo(0, y)
  }
  ScrollTrigger.update()
}

export function getLenis() {
  return sharedLenis
}

export function useLenis() {
  const lenisRef = shallowRef<Lenis | null>(null)
  const { reduced } = useReducedMotion()
  let ticker: ((time: number) => void) | null = null
  let onNativeScroll: (() => void) | null = null

  onMounted(() => {
    if (reduced.value) return

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2,
      // Pass 9: do not auto-lerp over programmatic jumps (capture / hash)
      syncTouch: false,
    })
    lenisRef.value = lenis
    sharedLenis = lenis
    lenis.on("scroll", ScrollTrigger.update)

    ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    // Native scroll (puppeteer window.scrollTo, anchors) can desync Lenis.
    // Re-emit ST update + resync Lenis internal target without killing immersion.
    onNativeScroll = () => {
      ScrollTrigger.update()
    }
    window.addEventListener("scroll", onNativeScroll, { passive: true })
  })

  onUnmounted(() => {
    if (ticker) gsap.ticker.remove(ticker)
    if (onNativeScroll) window.removeEventListener("scroll", onNativeScroll)
    lenisRef.value?.destroy()
    if (sharedLenis === lenisRef.value) sharedLenis = null
    lenisRef.value = null
  })

  return { lenisRef, reduced }
}
