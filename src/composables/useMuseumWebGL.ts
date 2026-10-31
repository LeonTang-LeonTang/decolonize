import { onMounted, onUnmounted, shallowRef, type Ref } from "vue"
import type { MuseumApp, MuseumState, PortalId } from "../webgl/MuseumApp"
import { useReducedMotion } from "./useReducedMotion"

let singleton: MuseumApp | null = null

export function getMuseumApp() {
  return singleton
}

export function useMuseumWebGL(canvasRef: Ref<HTMLCanvasElement | null>) {
  const appRef = shallowRef<MuseumApp | null>(null)
  const ready = shallowRef(false)
  const { reduced } = useReducedMotion()
  let ro: ResizeObserver | null = null
  const onWinResize = () => singleton?.resize()

  onMounted(async () => {
    const prefersReduced =
      reduced.value ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      reduced.value = true
      return
    }
    const canvas = canvasRef.value
    if (!canvas) return
    try {
      const { MuseumApp } = await import("../webgl/MuseumApp")
      const app = new MuseumApp(canvas)
      singleton = app
      appRef.value = app
      await app.init()
      app.start()
      ready.value = true
      ro = new ResizeObserver(() => app.resize())
      ro.observe(canvas)
      window.addEventListener("resize", onWinResize)
    } catch (err) {
      console.warn("[museum-webgl] init failed — falling back to CSS only", err)
      singleton = null
      appRef.value = null
    }
  })

  onUnmounted(() => {
    ro?.disconnect()
    window.removeEventListener("resize", onWinResize)
    singleton?.dispose()
    singleton = null
    appRef.value = null
  })

  const pushState = (partial: Partial<MuseumState>) => {
    singleton?.setState(partial)
  }

  const setPortal = (portal: PortalId, portalT: number) => {
    singleton?.setState({ portal, portalT })
  }

  return { appRef, ready, reduced, pushState, setPortal }
}
