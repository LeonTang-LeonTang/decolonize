import * as THREE from "three"

export type BoatPanelInput = {
  src: string
  /** Normalized 0–1 slot along the voyage (left → right) */
  t: number
  depth?: number
}

/**
 * Pass 11 — scroll-driven Boat / horizon 3D world (raw three.js, Vue-friendly).
 * Grammar inspired by The Boat (R3F ScrollControls): layered waves, fog, clouds,
 * evidence planes in depth, camera dolly with progress. Not a full R3F port.
 */
export class BoatScrollWorld {
  readonly renderer: THREE.WebGLRenderer
  readonly scene = new THREE.Scene()
  readonly camera: THREE.PerspectiveCamera
  readonly root = new THREE.Group()

  private waves: { mesh: THREE.Mesh; baseY: number; speed: number; amp: number; phase: number }[] = []
  private clouds: { mesh: THREE.Mesh; speed: number; wrap: number }[] = []
  private panels: { mesh: THREE.Mesh; baseX: number; depth: number; bob: number }[] = []
  private boat: THREE.Mesh | null = null
  private fogPlane: THREE.Mesh | null = null
  private horizon: THREE.Mesh | null = null
  private loader = new THREE.TextureLoader()
  private clock = new THREE.Clock()
  private progress = 0
  private targetProgress = 0
  private running = false
  private raf = 0
  private disposed = false
  private width = 1
  private height = 1
  private dpr = 1

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.outputColorSpace = THREE.SRGBColorSpace

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80)
    this.camera.position.set(0, 1.15, 6.2)

    this.scene.fog = new THREE.FogExp2(0x070605, 0.045)
    this.scene.add(this.root)
    this.root.name = "BoatScrollWorld"

    const hemi = new THREE.HemisphereLight(0xb8c4d4, 0x1a1410, 1.15)
    this.scene.add(hemi)
    const key = new THREE.DirectionalLight(0xffe6c8, 0.55)
    key.position.set(4, 6, 3)
    this.scene.add(key)
  }

  async init(panelInputs: BoatPanelInput[]): Promise<void> {
    if (this.disposed) return

    // Horizon / sky backdrop
    const bgTex = await this.loadTexture("/media/boat-world/bg.png").catch(() => null)
    const horizonGeo = new THREE.PlaneGeometry(48, 22)
    const horizonMat = new THREE.MeshBasicMaterial({
      map: bgTex || undefined,
      color: bgTex ? 0xffffff : 0x1a222c,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    })
    this.horizon = new THREE.Mesh(horizonGeo, horizonMat)
    this.horizon.position.set(0, 2.2, -18)
    this.root.add(this.horizon)

    // Sea tint plane under horizon
    const sea = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 16),
      new THREE.MeshBasicMaterial({
        color: 0x0a1218,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      }),
    )
    sea.position.set(0, -3.2, -12)
    sea.rotation.x = -0.42
    this.root.add(sea)

    const waveTex = await this.loadTexture("/media/boat-world/waves-pot.png").catch(() => null)
    const waveSpecs = [
      { z: -1.2, y: -1.15, w: 18, h: 2.6, speed: 0.22, amp: 0.1, opacity: 0.72, color: 0x7a9aba },
      { z: -2.6, y: -1.4, w: 22, h: 3.0, speed: 0.14, amp: 0.13, opacity: 0.58, color: 0x5a7a98 },
      { z: -4.4, y: -1.65, w: 26, h: 3.4, speed: 0.09, amp: 0.16, opacity: 0.45, color: 0x3e5a76 },
      { z: -6.5, y: -1.85, w: 30, h: 3.8, speed: 0.06, amp: 0.12, opacity: 0.32, color: 0x2a4558 },
    ]
    for (let i = 0; i < waveSpecs.length; i++) {
      const s = waveSpecs[i]
      const mat = new THREE.MeshLambertMaterial({
        map: waveTex || undefined,
        color: s.color,
        transparent: true,
        opacity: s.opacity,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), mat)
      mesh.position.set(0, s.y, s.z)
      this.root.add(mesh)
      this.waves.push({
        mesh,
        baseY: s.y,
        speed: s.speed,
        amp: s.amp,
        phase: i * 1.3,
      })
    }

    const cloudTex = await this.loadTexture("/media/boat-world/cloud-pot-01.png").catch(() => null)
    const fgCloudTex = await this.loadTexture("/media/boat-world/foreground-clouds-pot.png").catch(() => null)
    const cloudLayers = [
      { tex: cloudTex, z: -10, y: 3.2, w: 28, h: 6, speed: 0.012, opacity: 0.35 },
      { tex: fgCloudTex, z: -3.5, y: 2.4, w: 20, h: 5, speed: 0.028, opacity: 0.28 },
    ]
    for (const c of cloudLayers) {
      if (!c.tex) continue
      const mat = new THREE.MeshBasicMaterial({
        map: c.tex,
        transparent: true,
        opacity: c.opacity,
        depthWrite: false,
      })
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(c.w, c.h), mat)
      mesh.position.set(0, c.y, c.z)
      this.root.add(mesh)
      this.clouds.push({ mesh, speed: c.speed, wrap: c.w })
      // Seamless twin
      const mesh2 = mesh.clone()
      mesh2.position.x = c.w
      this.root.add(mesh2)
      this.clouds.push({ mesh: mesh2, speed: c.speed, wrap: c.w })
    }

    const fogTex = await this.loadTexture("/media/boat-world/fog-pot.png").catch(() => null)
    if (fogTex) {
      const fogMat = new THREE.MeshBasicMaterial({
        map: fogTex,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
      })
      this.fogPlane = new THREE.Mesh(new THREE.PlaneGeometry(22, 10), fogMat)
      this.fogPlane.position.set(0, 0.4, -0.6)
      this.root.add(this.fogPlane)
    }

    const boatTex = await this.loadTexture("/media/boat-world/boat-01.png").catch(() => null)
    if (boatTex) {
      const boatMat = new THREE.MeshBasicMaterial({
        map: boatTex,
        transparent: true,
        opacity: 0.82,
        depthWrite: false,
      })
      this.boat = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.35), boatMat)
      this.boat.position.set(-1.2, -0.55, -5.2)
      this.root.add(this.boat)
    }

    // Evidence panels as depth cards along the voyage
    const inputs = panelInputs.slice(0, 8)
    await Promise.all(
      inputs.map(async (p, i) => {
        const tex = await this.loadTexture(p.src).catch(() => null)
        if (!tex) return
        const aspect = (tex.image?.width || 16) / (tex.image?.height || 9)
        const h = 1.55 + (i % 3) * 0.12
        const w = h * Math.min(aspect, 1.65)
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.78,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
        const depth = p.depth ?? -2.2 - (i % 4) * 0.85
        const span = 14
        const baseX = (p.t - 0.5) * span
        mesh.position.set(baseX, 0.35 + (i % 2) * 0.25, depth)
        mesh.rotation.y = ((i % 2) * 2 - 1) * 0.12
        this.root.add(mesh)
        this.panels.push({ mesh, baseX, depth, bob: i * 0.7 })
      }),
    )
  }

  setProgress(p: number) {
    this.targetProgress = THREE.MathUtils.clamp(p, 0, 1)
  }

  setSize(w: number, h: number, dpr = Math.min(window.devicePixelRatio || 1, 1.75)) {
    this.width = Math.max(1, w)
    this.height = Math.max(1, h)
    this.dpr = dpr
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height, false)
  }

  start() {
    if (this.running || this.disposed) return
    this.running = true
    this.clock.start()
    const loop = () => {
      if (!this.running || this.disposed) return
      this.raf = requestAnimationFrame(loop)
      this.tick()
    }
    this.raf = requestAnimationFrame(loop)
  }

  stop() {
    this.running = false
    if (this.raf) cancelAnimationFrame(this.raf)
    this.raf = 0
  }

  dispose() {
    this.disposed = true
    this.stop()
    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh) {
        mesh.geometry?.dispose()
        const mat = mesh.material
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
        else if (mat) (mat as THREE.Material).dispose()
      }
    })
    this.renderer.dispose()
    this.waves = []
    this.clouds = []
    this.panels = []
  }

  private tick() {
    const dt = Math.min(0.05, this.clock.getDelta())
    const t = this.clock.elapsedTime
    this.progress = THREE.MathUtils.damp(this.progress, this.targetProgress, 4.2, dt)

    // Camera voyage: dolly along X with slight pitch / Z drift
    const p = this.progress
    const camX = (p - 0.5) * 10.5
    const camY = 1.05 + Math.sin(p * Math.PI) * 0.18
    const camZ = 6.4 - p * 1.1
    this.camera.position.x = THREE.MathUtils.damp(this.camera.position.x, camX, 3.5, dt)
    this.camera.position.y = THREE.MathUtils.damp(this.camera.position.y, camY, 3.5, dt)
    this.camera.position.z = THREE.MathUtils.damp(this.camera.position.z, camZ, 3.5, dt)
    this.camera.lookAt(camX * 0.35, 0.2, -6)

    for (const w of this.waves) {
      w.mesh.position.y = w.baseY + Math.sin(t * w.speed * 6 + w.phase) * w.amp
      w.mesh.position.x = Math.sin(t * w.speed + w.phase) * 0.35 + (p - 0.5) * 0.8
    }

    for (const c of this.clouds) {
      c.mesh.position.x -= c.speed
      if (c.mesh.position.x < -c.wrap) c.mesh.position.x += c.wrap * 2
    }

    if (this.boat) {
      this.boat.position.x = -1.2 + Math.sin(t * 0.55) * 0.35 + (p - 0.5) * 2.2
      this.boat.position.y = -0.55 + Math.sin(t * 1.1) * 0.06
      this.boat.rotation.z = Math.sin(t * 0.9) * 0.04
    }

    if (this.fogPlane) {
      this.fogPlane.position.x = (p - 0.5) * 1.5
      const fm = this.fogPlane.material as THREE.MeshBasicMaterial
      fm.opacity = 0.28 + Math.sin(t * 0.4) * 0.06
    }

    if (this.horizon) {
      this.horizon.position.x = (p - 0.5) * 3.5
    }

    // Chapter-hold feel: panels gently face camera + bob; active zone brightens
    for (let i = 0; i < this.panels.length; i++) {
      const L = this.panels[i]
      const hold = 1 - Math.min(1, Math.abs(L.baseX / 7 - (p - 0.5) * 1.1) * 1.8)
      L.mesh.position.x = L.baseX - (p - 0.5) * 2.4
      L.mesh.position.y = 0.35 + Math.sin(t * 0.8 + L.bob) * 0.08 + hold * 0.12
      const mat = L.mesh.material as THREE.MeshBasicMaterial
      mat.opacity = 0.35 + hold * 0.55
      L.mesh.rotation.y = THREE.MathUtils.damp(L.mesh.rotation.y, (i % 2 === 0 ? -1 : 1) * 0.08 * (1 - hold), 3, dt)
    }

    this.renderer.render(this.scene, this.camera)
  }

  private loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.anisotropy = 4
          resolve(tex)
        },
        undefined,
        reject,
      )
    })
  }
}
