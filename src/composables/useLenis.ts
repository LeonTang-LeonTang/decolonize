import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { onMounted, onUnmounted, shallowRef } from "vue"
import { useReducedMotion } from "./useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = shallowRef<Lenis | null>(null)
  const { reduced } = useReducedMotion()
  let ticker: ((time: number) => void) | null = null

  onMounted(() => {
    if (reduced.value) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })
    lenisRef.value = lenis
    lenis.on("scroll", ScrollTrigger.update)

    ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)
  })

  onUnmounted(() => {
    if (ticker) gsap.ticker.remove(ticker)
    lenisRef.value?.destroy()
    lenisRef.value = null
  })

  return { lenisRef, reduced }
}
