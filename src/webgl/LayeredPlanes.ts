import * as THREE from "three"
import { evidenceWalls } from "./frames"

/**
 * Boat-like 2.5D layered image planes with scroll parallax.
 * Used as ambient evidence-wall behind Core sections (not replacing prose).
 */
export class LayeredPlanes {
  readonly root = new THREE.Group()
  private layers: { mesh: THREE.Mesh; depth: number; baseX: number }[] = []
  private loader = new THREE.TextureLoader()
  private activeCore = ""
  private opacity = 0
  private targetOpacity = 0
  private fogPlane: THREE.Mesh | null = null

  private scene: THREE.Scene

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.root.name = "LayeredPlanes"
    this.root.visible = false
    this.scene.add(this.root)

    const fogMat = new THREE.MeshBasicMaterial({
      color: 0x0c0b09,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    })
    this.fogPlane = new THREE.Mesh(new THREE.PlaneGeometry(24, 14), fogMat)
    this.fogPlane.position.set(0, 0, 1.2)
    this.root.add(this.fogPlane)
  }

  async setCore(coreId: string): Promise<void> {
    if (coreId === this.activeCore) return
    this.activeCore = coreId
    this.clearLayers()
    const urls = evidenceWalls[coreId]
    if (!urls?.length) {
      this.root.visible = false
      return
    }
    const depths = [-6, -3.5, -1.8]
    await Promise.all(
      urls.slice(0, 3).map(async (url, i) => {
        const tex = await this.loadTexture(url)
        const aspect = (tex.image?.width || 16) / (tex.image?.height || 9)
        const h = 4.2 - i * 0.35
        const w = h * aspect
        const mat = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.55 - i * 0.08,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat)
        const depth = depths[i] ?? -2
        const baseX = (i - 1) * 1.4
        mesh.position.set(baseX, 0.2 * (1 - i), depth)
        mesh.rotation.y = (i - 1) * 0.08
        this.root.add(mesh)
        this.layers.push({ mesh, depth, baseX })
      }),
    )
    this.root.visible = true
  }

  setTargetOpacity(v: number) {
    this.targetOpacity = THREE.MathUtils.clamp(v, 0, 1)
  }

  /**
   * @param localT 0–1 progress within the core section (or portal)
   * @param globalProgress overall page scroll 0–1 for gentle drift
   */
  update(localT: number, globalProgress: number, dt: number) {
    this.opacity = THREE.MathUtils.damp(this.opacity, this.targetOpacity, 3.5, dt)
    this.root.visible = this.opacity > 0.02
    if (!this.root.visible) return

    const parallax = (localT - 0.5) * 2
    for (let i = 0; i < this.layers.length; i++) {
      const L = this.layers[i]
      const factor = 0.35 + i * 0.45
      L.mesh.position.x = L.baseX + parallax * factor * 0.9
      L.mesh.position.y = 0.15 * Math.sin(globalProgress * Math.PI * 2 + i) * 0.4
      const mat = L.mesh.material as THREE.MeshBasicMaterial
      mat.opacity = (0.5 - i * 0.08) * this.opacity
    }
    if (this.fogPlane) {
      const fm = this.fogPlane.material as THREE.MeshBasicMaterial
      fm.opacity = 0.25 + (1 - this.opacity) * 0.4
    }
  }

  clear() {
    this.clearLayers()
    this.activeCore = ""
    this.root.visible = false
  }

  dispose() {
    this.clearLayers()
    this.scene.remove(this.root)
  }

  private clearLayers() {
    for (const L of this.layers) {
      L.mesh.geometry.dispose()
      ;(L.mesh.material as THREE.Material).dispose()
      this.root.remove(L.mesh)
    }
    this.layers = []
  }

  private loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          resolve(tex)
        },
        undefined,
        reject,
      )
    })
  }
}
