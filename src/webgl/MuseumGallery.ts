import * as THREE from "three"
import { coreARoom, museumCorridor, type GalleryFrame } from "./frames"

export type GalleryMode = "corridor" | "coreA" | "idle"

type HungFrame = {
  group: THREE.Group
  mesh: THREE.Mesh
  frame: GalleryFrame
  targetEmissive: number
}

/**
 * Museum-like gallery: dark corridor with framed stills + a Core A dual-painting room.
 * Scroll progress drives camera path through the active mode.
 */
export class MuseumGallery {
  readonly root = new THREE.Group()
  private corridor = new THREE.Group()
  private coreA = new THREE.Group()
  private hung: HungFrame[] = []
  private loader = new THREE.TextureLoader()
  private mode: GalleryMode = "idle"
  private ready = false
  private floorMat: THREE.MeshStandardMaterial
  private wallMat: THREE.MeshStandardMaterial

  private scene: THREE.Scene

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.root.name = "MuseumGallery"
    this.floorMat = new THREE.MeshStandardMaterial({
      color: 0x1a1612,
      roughness: 0.92,
      metalness: 0.05,
    })
    this.wallMat = new THREE.MeshStandardMaterial({
      color: 0x12100e,
      roughness: 0.95,
      metalness: 0.02,
    })
    this.buildShell(this.corridor, 28, "corridor")
    this.buildShell(this.coreA, 14, "coreA")
    this.corridor.visible = false
    this.coreA.visible = false
    this.root.add(this.corridor, this.coreA)
    this.scene.add(this.root)
  }

  async load(): Promise<void> {
    await Promise.all([
      this.hangFrames(this.corridor, museumCorridor, "corridor"),
      this.hangFrames(this.coreA, coreARoom, "coreA"),
    ])
    this.ready = true
  }

  setMode(mode: GalleryMode) {
    this.mode = mode
    this.corridor.visible = mode === "corridor"
    this.coreA.visible = mode === "coreA"
  }

  getMode() {
    return this.mode
  }

  isReady() {
    return this.ready
  }

  /**
   * @param t 0–1 progress inside the active portal hold
   * @returns camera world position + lookAt for the scroll camera
   */
  cameraPose(t: number): { position: THREE.Vector3; lookAt: THREE.Vector3 } {
    const p = THREE.MathUtils.clamp(t, 0, 1)
    if (this.mode === "coreA") {
      // Enter room from doorway, settle between two facing paintings
      const z = THREE.MathUtils.lerp(6.5, 0.2, easeInOut(p))
      const x = Math.sin(p * Math.PI) * 0.35
      const y = 1.55 + Math.sin(p * Math.PI) * 0.08
      return {
        position: new THREE.Vector3(x, y, z),
        lookAt: new THREE.Vector3(0, 1.45, -2.2),
      }
    }
    // Corridor walk past A–F frames
    const z = THREE.MathUtils.lerp(10, -14, easeInOut(p))
    const sway = Math.sin(p * Math.PI * 2) * 0.25
    return {
      position: new THREE.Vector3(sway, 1.6, z),
      lookAt: new THREE.Vector3(sway * 0.2, 1.45, z - 4),
    }
  }

  /** Soft spotlight bias toward nearest frame */
  update(t: number, dt: number) {
    if (!this.ready || this.mode === "idle") return
    const pose = this.cameraPose(t)
    for (const h of this.hung) {
      if (!h.group.parent?.visible) continue
      const dist = h.group.position.distanceTo(pose.position)
      const near = THREE.MathUtils.clamp(1 - dist / 8, 0, 1)
      h.targetEmissive = 0.08 + near * 0.35
      const mat = h.mesh.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = THREE.MathUtils.damp(
        mat.emissiveIntensity,
        h.targetEmissive,
        4,
        dt,
      )
    }
  }

  dispose() {
    this.root.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat?.dispose()
    })
    this.scene.remove(this.root)
  }

  private buildShell(parent: THREE.Group, length: number, kind: string) {
    const half = length / 2
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, length), this.floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0, kind === "corridor" ? -half + 4 : 0)
    floor.receiveShadow = true

    const ceil = new THREE.Mesh(
      new THREE.PlaneGeometry(8, length),
      new THREE.MeshStandardMaterial({ color: 0x0a0908, roughness: 0.98 }),
    )
    ceil.rotation.x = Math.PI / 2
    ceil.position.set(0, 3.4, floor.position.z)

    const left = new THREE.Mesh(new THREE.PlaneGeometry(length, 3.4), this.wallMat)
    left.rotation.y = Math.PI / 2
    left.position.set(-4, 1.7, floor.position.z)

    const right = new THREE.Mesh(new THREE.PlaneGeometry(length, 3.4), this.wallMat)
    right.rotation.y = -Math.PI / 2
    right.position.set(4, 1.7, floor.position.z)

    const back = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x0e0c0a, roughness: 0.9 }),
    )
    back.position.set(0, 1.7, floor.position.z - half)

    // Warm museum key + fill
    const key = new THREE.SpotLight(0xffe6c8, 18, 40, Math.PI / 5, 0.45, 1.4)
    key.position.set(0, 3.1, kind === "corridor" ? 8 : 5)
    key.target.position.set(0, 1.4, kind === "corridor" ? -4 : -1)
    parent.add(key, key.target)

    const fill = new THREE.PointLight(0xc4a574, 4, 24, 2)
    fill.position.set(0, 2.4, kind === "corridor" ? 0 : 1)

    const rim = new THREE.DirectionalLight(0x6a5a40, 0.35)
    rim.position.set(-2, 4, 6)

    parent.add(floor, ceil, left, right, back, fill, rim)
  }

  private async hangFrames(
    parent: THREE.Group,
    frames: GalleryFrame[],
    layout: "corridor" | "coreA",
  ) {
    const tasks = frames.map(async (frame, i) => {
      const tex = await this.loadTexture(frame.src)
      const aspect = frame.aspect || tex.image.width / tex.image.height || 1.4
      const h = layout === "coreA" ? 2.2 : 1.65
      const w = h * aspect

      const geo = new THREE.PlaneGeometry(w, h)
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.75,
        metalness: 0.05,
        emissive: new THREE.Color(0xc4a574),
        emissiveIntensity: 0.1,
        emissiveMap: tex,
      })
      const mesh = new THREE.Mesh(geo, mat)

      // Simple oak-ish frame (box edges)
      const frameGroup = new THREE.Group()
      const moulding = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.06),
        new THREE.MeshStandardMaterial({ color: 0x3a2e1f, roughness: 0.7, metalness: 0.15 }),
      )
      moulding.position.z = -0.04
      const matte = new THREE.Mesh(
        new THREE.PlaneGeometry(w + 0.04, h + 0.04),
        new THREE.MeshStandardMaterial({ color: 0x1c1814, roughness: 1 }),
      )
      matte.position.z = -0.01
      mesh.position.z = 0.01
      frameGroup.add(moulding, matte, mesh)

      if (layout === "corridor") {
        const side = i % 2 === 0 ? -1 : 1
        const z = 6 - Math.floor(i / 2) * 4.2
        frameGroup.position.set(side * 3.55, 1.55, z)
        frameGroup.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2
      } else {
        // Facing pair + two side details
        if (i === 0) {
          frameGroup.position.set(-1.55, 1.55, -2.4)
          frameGroup.rotation.y = 0.15
        } else if (i === 1) {
          frameGroup.position.set(1.55, 1.55, -2.4)
          frameGroup.rotation.y = -0.15
        } else if (i === 2) {
          frameGroup.position.set(-3.55, 1.45, 0.5)
          frameGroup.rotation.y = Math.PI / 2
          frameGroup.scale.setScalar(0.75)
        } else {
          frameGroup.position.set(3.55, 1.45, 0.5)
          frameGroup.rotation.y = -Math.PI / 2
          frameGroup.scale.setScalar(0.75)
        }
      }

      parent.add(frameGroup)
      this.hung.push({ group: frameGroup, mesh, frame, targetEmissive: 0.1 })
    })
    await Promise.all(tasks)
  }

  private loadTexture(url: string): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace
          tex.anisotropy = 8
          tex.minFilter = THREE.LinearMipmapLinearFilter
          tex.magFilter = THREE.LinearFilter
          resolve(tex)
        },
        undefined,
        reject,
      )
    })
  }
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}
