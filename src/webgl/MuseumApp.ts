import * as THREE from "three"
import { LayeredPlanes } from "./LayeredPlanes"
import { MuseumGallery, type GalleryMode } from "./MuseumGallery"

export type PortalId = "intro-museum" | "coreA-gallery" | null

export type MuseumState = {
  /** Overall page scroll 0–1 */
  scrollProgress: number
  /** Active chapter id from data-chapter */
  activeChapter: string
  /** Which portal is driving the camera (null = ambient only) */
  portal: PortalId
  /** 0–1 progress inside the active portal sticky hold */
  portalT: number
  /** How strongly the canvas should show (0–1) */
  immersion: number
}

/**
 * Senior WebGL scroll museum — three.js r170 + custom scroll camera.
 * Chosen over nanogl: Kaizen's nanogl stack (gltf/pbr/theatre/activity graph)
 * does not wire cleanly into Vite without porting their entire engine.
 * UX target matches Kaizen hold/portal + Boat layered planes.
 */
export class MuseumApp {
  readonly renderer: THREE.WebGLRenderer
  readonly scene = new THREE.Scene()
  readonly camera: THREE.PerspectiveCamera
  readonly gallery: MuseumGallery
  readonly layers: LayeredPlanes

  private canvas: HTMLCanvasElement
  private clock = new THREE.Clock()
  private raf = 0
  private running = false
  private disposed = false
  private state: MuseumState = {
    scrollProgress: 0,
    activeChapter: "hero",
    portal: null,
    portalT: 0,
    immersion: 0,
  }
  private ambientCam = {
    position: new THREE.Vector3(0, 1.8, 8),
    lookAt: new THREE.Vector3(0, 1.2, 0),
  }
  private curPos = new THREE.Vector3(0, 1.8, 8)
  private curLook = new THREE.Vector3(0, 1.2, 0)
  private targetImmersion = 0
  private immersion = 0
  private dprCap = 1.75
  private onLost: (() => void) | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.05
    this.renderer.shadowMap.enabled = false

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80)
    this.camera.position.copy(this.ambientCam.position)

    this.scene.fog = new THREE.FogExp2(0x0c0b09, 0.045)
    const hemi = new THREE.HemisphereLight(0xe8d5a3, 0x1a1612, 0.55)
    this.scene.add(hemi)

    this.gallery = new MuseumGallery(this.scene)
    this.layers = new LayeredPlanes(this.scene)

    this.resize()
  }

  async init(): Promise<void> {
    await this.gallery.load()
    // Prefetch Core A evidence wall so first portal is warm
    await this.layers.setCore("act2a")
    this.layers.setTargetOpacity(0)
  }

  start() {
    if (this.running || this.disposed) return
    this.running = true
    this.clock.start()
    const loop = () => {
      if (!this.running) return
      this.raf = requestAnimationFrame(loop)
      this.tick()
    }
    this.raf = requestAnimationFrame(loop)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  setState(partial: Partial<MuseumState>) {
    Object.assign(this.state, partial)
    this.syncMode()
  }

  getImmersion() {
    return this.immersion
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth
    const h = this.canvas.clientHeight || window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, this.dprCap)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / Math.max(1, h)
    this.camera.updateProjectionMatrix()
  }

  dispose() {
    this.disposed = true
    this.stop()
    this.gallery.dispose()
    this.layers.dispose()
    this.renderer.dispose()
    if (this.onLost) {
      this.canvas.removeEventListener("webglcontextlost", this.onLost)
    }
  }

  private syncMode() {
    const { portal, portalT, activeChapter } = this.state
    if (portal === "intro-museum") {
      this.gallery.setMode("corridor")
      this.targetImmersion = 0.35 + portalT * 0.55
      this.layers.setTargetOpacity(0.15 * (1 - portalT))
    } else if (portal === "coreA-gallery") {
      this.gallery.setMode("coreA")
      this.targetImmersion = 0.4 + portalT * 0.55
      void this.layers.setCore("act2a")
      this.layers.setTargetOpacity(0.2 * (1 - portalT * 0.7))
    } else {
      this.gallery.setMode("idle")
      // Ambient Boat layers while reading Core sections
      const coreMatch = /^(act2[a-f])$/.exec(activeChapter)
      if (coreMatch) {
        void this.layers.setCore(coreMatch[1])
        this.layers.setTargetOpacity(0.28)
        this.targetImmersion = 0.22
      } else if (activeChapter === "act2intro") {
        this.layers.setTargetOpacity(0.12)
        this.targetImmersion = 0.14
      } else {
        this.layers.setTargetOpacity(0)
        this.targetImmersion = activeChapter === "hero" ? 0.08 : 0.05
      }
    }
  }

  private tick() {
    const dt = Math.min(0.05, this.clock.getDelta())
    const { portal, portalT, scrollProgress, activeChapter } = this.state

    this.immersion = THREE.MathUtils.damp(this.immersion, this.targetImmersion, 3.2, dt)
    this.canvas.style.opacity = String(this.immersion)

    let targetPos: THREE.Vector3
    let targetLook: THREE.Vector3

    if (portal && this.gallery.getMode() !== "idle") {
      const pose = this.gallery.cameraPose(portalT)
      targetPos = pose.position
      targetLook = pose.lookAt
      this.gallery.update(portalT, dt)
    } else {
      // Ambient drift tied to scroll (Boat-like gentle camera)
      const drift = scrollProgress * Math.PI * 2
      targetPos = new THREE.Vector3(
        Math.sin(drift) * 1.2,
        1.7 + Math.sin(drift * 0.5) * 0.15,
        7.5 - scrollProgress * 2.5,
      )
      targetLook = new THREE.Vector3(0, 1.2, -1)
    }

    this.curPos.lerp(targetPos, 1 - Math.exp(-3.5 * dt))
    this.curLook.lerp(targetLook, 1 - Math.exp(-3.2 * dt))
    this.camera.position.copy(this.curPos)
    this.camera.lookAt(this.curLook)

    // Local t for parallax: portal t or chapter-ish from scroll
    const localT = portal ? portalT : (scrollProgress * 6) % 1
    void activeChapter
    this.layers.update(localT, scrollProgress, dt)

    this.renderer.render(this.scene, this.camera)
  }
}

export type { GalleryMode }
