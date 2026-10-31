import * as THREE from "three"
import { LayeredPlanes } from "./LayeredPlanes"
import { MuseumGallery, type CoreMode, type GalleryMode } from "./MuseumGallery"
import { PostFX } from "./PostFX"

export type PortalId =
  | "intro-museum"
  | "coreA-gallery"
  | "coreB-gallery"
  | "coreC-gallery"
  | "coreD-gallery"
  | "coreE-gallery"
  | "coreF-gallery"
  | null

const PORTAL_TO_MODE: Record<Exclude<PortalId, null>, GalleryMode> = {
  "intro-museum": "corridor",
  "coreA-gallery": "coreA",
  "coreB-gallery": "coreB",
  "coreC-gallery": "coreC",
  "coreD-gallery": "coreD",
  "coreE-gallery": "coreE",
  "coreF-gallery": "coreF",
}

const PORTAL_TO_CORE: Partial<Record<Exclude<PortalId, null>, string>> = {
  "coreA-gallery": "act2a",
  "coreB-gallery": "act2b",
  "coreC-gallery": "act2c",
  "coreD-gallery": "act2d",
  "coreE-gallery": "act2e",
  "coreF-gallery": "act2f",
}

export type MuseumState = {
  scrollProgress: number
  activeChapter: string
  portal: PortalId
  portalT: number
  immersion: number
}

/**
 * Senior WebGL scroll museum — three.js r170.
 * Pass 5: rooms B–F, EffectComposer GLSL post, GLTF props, Theatre-like keyframes,
 * optional WebXR VR enter when the browser reports an immersive-vr session.
 */
export class MuseumApp {
  readonly renderer: THREE.WebGLRenderer
  readonly scene = new THREE.Scene()
  readonly camera: THREE.PerspectiveCamera
  readonly gallery: MuseumGallery
  readonly layers: LayeredPlanes
  private post: PostFX | null = null

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
  private baseFov = 42
  private xrEnabled = false
  private onLost: (() => void) | null = null
  private portalBg = new THREE.Color(0x2a2218)

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
    })
    // Slight warm clear so failed/empty frames still read as a museum void, not pure black
    this.renderer.setClearColor(0x1a1610, 0)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.55
    this.renderer.shadowMap.enabled = false
    // WebXR — enabled only after a successful isSessionSupported probe
    this.renderer.xr.enabled = false

    this.camera = new THREE.PerspectiveCamera(this.baseFov, 1, 0.1, 80)
    this.camera.position.copy(this.ambientCam.position)

    this.scene.fog = new THREE.FogExp2(0x2a2218, 0.012)
    const hemi = new THREE.HemisphereLight(0xffe8c8, 0x2a2218, 1.15)
    this.scene.add(hemi)

    this.gallery = new MuseumGallery(this.scene)
    this.layers = new LayeredPlanes(this.scene)

    try {
      this.post = new PostFX(this.renderer, this.scene, this.camera)
    } catch (err) {
      console.warn("[museum] PostFX init failed — raw render fallback", err)
      this.post = null
    }

    this.resize()
  }

  async init(): Promise<void> {
    await this.gallery.load()
    await this.layers.setCore("act2a")
    this.layers.setTargetOpacity(0)
    await this.probeXR()
  }

  /** True when immersive-vr is available (headset / browser VR). */
  get xrAvailable() {
    return this.xrEnabled
  }

  async enterXR(): Promise<boolean> {
    if (!this.xrEnabled || !navigator.xr) return false
    try {
      const session = await navigator.xr.requestSession("immersive-vr", {
        optionalFeatures: ["local-floor", "bounded-floor"],
      })
      await this.renderer.xr.setSession(session)
      this.renderer.xr.enabled = true
      // Post stack + XR don't mix cleanly — drop to raw while in VR
      this.post?.setEnabled(false)
      return true
    } catch (err) {
      console.warn("[museum] XR session failed", err)
      return false
    }
  }

  start() {
    if (this.running || this.disposed) return
    this.running = true
    this.clock.start()
    // Prefer XR animation loop when a session is active; else rAF
    this.renderer.setAnimationLoop(() => {
      if (!this.running) return
      this.tick()
    })
  }

  stop() {
    this.running = false
    this.renderer.setAnimationLoop(null)
    cancelAnimationFrame(this.raf)
  }

  setState(partial: Partial<MuseumState>) {
    Object.assign(this.state, partial)
    this.syncMode()
  }

  getImmersion() {
    return this.immersion
  }

  getState(): Readonly<MuseumState & { immersionLive: number }> {
    return { ...this.state, immersionLive: this.immersion }
  }

  resize() {
    const w = this.canvas.clientWidth || window.innerWidth
    const h = this.canvas.clientHeight || window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, this.dprCap)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / Math.max(1, h)
    this.camera.updateProjectionMatrix()
    this.post?.setSize(w * dpr, h * dpr)
  }

  dispose() {
    this.disposed = true
    this.stop()
    this.post?.dispose()
    this.gallery.dispose()
    this.layers.dispose()
    this.renderer.dispose()
    if (this.onLost) {
      this.canvas.removeEventListener("webglcontextlost", this.onLost)
    }
  }

  private async probeXR() {
    try {
      if (!("xr" in navigator) || !navigator.xr) return
      const ok = await navigator.xr.isSessionSupported("immersive-vr")
      this.xrEnabled = !!ok
    } catch {
      this.xrEnabled = false
    }
  }

  private syncMode() {
    const { portal, portalT, activeChapter } = this.state
    if (portal && PORTAL_TO_MODE[portal]) {
      this.gallery.setMode(PORTAL_TO_MODE[portal])
      // Pass5b: portal immersion ~1.0 so walls/frames/pedestals are unmistakable
      this.targetImmersion = 0.94 + portalT * 0.06
      const coreId = PORTAL_TO_CORE[portal]
      if (coreId) {
        void this.layers.setCore(coreId)
        this.layers.setTargetOpacity(0.28 * (1 - portalT * 0.55))
      } else {
        // intro corridor
        this.layers.setTargetOpacity(0.2 * (1 - portalT * 0.6))
      }
    } else {
      this.gallery.setMode("idle")
      const coreMatch = /^(act2[a-f])$/.exec(activeChapter)
      if (coreMatch) {
        void this.layers.setCore(coreMatch[1])
        this.layers.setTargetOpacity(0.42)
        this.targetImmersion = 0.48
      } else if (activeChapter === "act2intro") {
        this.layers.setTargetOpacity(0.28)
        this.targetImmersion = 0.36
      } else {
        this.layers.setTargetOpacity(0.08)
        this.targetImmersion = activeChapter === "hero" ? 0.22 : 0.16
      }
    }
  }

  private tick() {
    const dt = Math.min(0.05, this.clock.getDelta())
    const { portal, portalT, scrollProgress, activeChapter } = this.state
    const elapsed = this.clock.elapsedTime

    this.immersion = THREE.MathUtils.damp(this.immersion, this.targetImmersion, 3.2, dt)
    // Drive opacity + data attrs; Vue owns .museum-gl--active class (do not toggle here)
    const portalActive = !!this.state.portal && this.state.portalT > 0.05
    this.canvas.dataset.museumActive = portalActive ? "1" : "0"
    this.canvas.dataset.portalT = this.state.portalT.toFixed(3)
    this.canvas.dataset.portal = this.state.portal || ""
    this.canvas.dataset.immersion = this.immersion.toFixed(3)
    if (portalActive) {
      // Full opacity — unmistakable museum; CSS .museum-gl--active also forces 1
      this.canvas.style.opacity = "1"
      this.renderer.setClearColor(0x2a2218, 1)
      this.scene.background = this.portalBg
      this.post?.setPortalMode(true)
      this.post?.setEnabled(true)
    } else {
      // Floor ambient so layered planes / corridor peek stay readable (was ~0.05 = invisible)
      this.canvas.style.opacity = String(THREE.MathUtils.clamp(this.immersion, 0.18, 0.85))
      this.renderer.setClearColor(0x1a1610, 0)
      this.scene.background = null
      this.post?.setPortalMode(false)
      this.post?.setEnabled(true)
    }

    let targetPos: THREE.Vector3
    let targetLook: THREE.Vector3
    let targetFov = this.baseFov

    if (portal && this.gallery.getMode() !== "idle") {
      const pose = this.gallery.cameraPose(portalT)
      targetPos = pose.position
      targetLook = pose.lookAt
      if (pose.fov != null) targetFov = pose.fov
      this.gallery.update(portalT, dt)
    } else {
      const drift = scrollProgress * Math.PI * 2
      targetPos = new THREE.Vector3(
        Math.sin(drift) * 1.2,
        1.7 + Math.sin(drift * 0.5) * 0.15,
        7.5 - scrollProgress * 2.5,
      )
      targetLook = new THREE.Vector3(0, 1.2, -1)
    }

    // Skip camera lerp while presenting XR (headset owns the view)
    if (!this.renderer.xr.isPresenting) {
      this.curPos.lerp(targetPos, 1 - Math.exp(-3.5 * dt))
      this.curLook.lerp(targetLook, 1 - Math.exp(-3.2 * dt))
      this.camera.position.copy(this.curPos)
      this.camera.lookAt(this.curLook)
      if (Math.abs(this.camera.fov - targetFov) > 0.05) {
        this.camera.fov = THREE.MathUtils.damp(this.camera.fov, targetFov, 3, dt)
        this.camera.updateProjectionMatrix()
      }
    }

    const localT = portal ? portalT : (scrollProgress * 6) % 1
    void activeChapter
    this.layers.update(localT, scrollProgress, dt)

    if (this.renderer.xr.isPresenting || !this.post) {
      this.renderer.render(this.scene, this.camera)
    } else {
      const drew = this.post.render(elapsed)
      if (!drew) this.renderer.render(this.scene, this.camera)
    }
  }
}

export type { GalleryMode, CoreMode }
