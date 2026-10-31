import * as THREE from "three"
import { coreRooms, museumCorridor, type GalleryFrame } from "./frames"
import { GalleryProps } from "./GalleryProps"
import { cameraTake } from "./cameraTakes"

export type CoreMode = "coreA" | "coreB" | "coreC" | "coreD" | "coreE" | "coreF"
export type GalleryMode = "corridor" | CoreMode | "idle"

const CORE_LIST: CoreMode[] = ["coreA", "coreB", "coreC", "coreD", "coreE", "coreF"]

type HungFrame = {
  group: THREE.Group
  mesh: THREE.Mesh
  frame: GalleryFrame
  targetEmissive: number
  room: string
}

/**
 * Museum gallery: overview corridor + dedicated Core A–F rooms with framed stills.
 * Camera poses come from cameraTakes (Theatre-like keyframes).
 */
export class MuseumGallery {
  readonly root = new THREE.Group()
  private corridor = new THREE.Group()
  private rooms = new Map<CoreMode, THREE.Group>()
  private hung: HungFrame[] = []
  private loader = new THREE.TextureLoader()
  private mode: GalleryMode = "idle"
  private ready = false
  private floorMat: THREE.MeshStandardMaterial
  private wallMat: THREE.MeshStandardMaterial
  private props: GalleryProps

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
    this.corridor.visible = false
    this.root.add(this.corridor)

    for (const id of CORE_LIST) {
      const g = new THREE.Group()
      g.name = id
      this.buildShell(g, 14, id)
      g.visible = false
      this.rooms.set(id, g)
      this.root.add(g)
    }

    this.props = new GalleryProps(this.root)
    this.scene.add(this.root)
  }

  async load(): Promise<void> {
    await this.props.load()
    const tasks: Promise<void>[] = [
      this.hangFrames(this.corridor, museumCorridor, "corridor"),
    ]
    for (const id of CORE_LIST) {
      const room = this.rooms.get(id)!
      tasks.push(this.hangFrames(room, coreRooms[id], id))
    }
    await Promise.all(tasks)
    this.props.populateCorridor(this.corridor)
    for (const id of CORE_LIST) {
      this.props.populateRoom(this.rooms.get(id)!, id === "coreA" ? 2 : 2)
    }
    this.ready = true
  }

  setMode(mode: GalleryMode) {
    this.mode = mode
    this.corridor.visible = mode === "corridor"
    for (const id of CORE_LIST) {
      this.rooms.get(id)!.visible = mode === id
    }
  }

  getMode() {
    return this.mode
  }

  isReady() {
    return this.ready
  }

  /**
   * @param t 0–1 progress inside the active portal hold
   */
  cameraPose(t: number): { position: THREE.Vector3; lookAt: THREE.Vector3; fov?: number } {
    const take = cameraTake(this.mode, t)
    if (take) return take
    // Idle fallback
    return {
      position: new THREE.Vector3(0, 1.6, 8),
      lookAt: new THREE.Vector3(0, 1.2, 0),
    }
  }

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
    this.props.dispose()
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
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, length), this.floorMat.clone())
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0, kind === "corridor" ? -half + 4 : 0)
    floor.receiveShadow = true

    const ceil = new THREE.Mesh(
      new THREE.PlaneGeometry(8, length),
      new THREE.MeshStandardMaterial({ color: 0x0a0908, roughness: 0.98 }),
    )
    ceil.rotation.x = Math.PI / 2
    ceil.position.set(0, 3.4, floor.position.z)

    const left = new THREE.Mesh(new THREE.PlaneGeometry(length, 3.4), this.wallMat.clone())
    left.rotation.y = Math.PI / 2
    left.position.set(-4, 1.7, floor.position.z)

    const right = new THREE.Mesh(new THREE.PlaneGeometry(length, 3.4), this.wallMat.clone())
    right.rotation.y = -Math.PI / 2
    right.position.set(4, 1.7, floor.position.z)

    const back = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 3.4),
      new THREE.MeshStandardMaterial({ color: 0x0e0c0a, roughness: 0.9 }),
    )
    back.position.set(0, 1.7, floor.position.z - half)

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
    layout: "corridor" | CoreMode,
  ) {
    const tasks = frames.map(async (frame, i) => {
      const tex = await this.loadTexture(frame.src)
      const aspect = frame.aspect || tex.image.width / tex.image.height || 1.4
      const h = layout === "corridor" ? 1.65 : layout === "coreA" ? 2.2 : 1.9
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
        this.layoutCoreRoom(frameGroup, i, frames.length)
      }

      parent.add(frameGroup)
      this.hung.push({ group: frameGroup, mesh, frame, targetEmissive: 0.1, room: layout })
    })
    await Promise.all(tasks)
  }

  private layoutCoreRoom(frameGroup: THREE.Group, i: number, n: number) {
    // Facing pair on back wall + side walls for extras
    if (i === 0) {
      frameGroup.position.set(-1.55, 1.55, -2.4)
      frameGroup.rotation.y = 0.15
    } else if (i === 1) {
      frameGroup.position.set(1.55, 1.55, -2.4)
      frameGroup.rotation.y = -0.15
    } else if (i === 2) {
      frameGroup.position.set(-3.55, 1.45, 0.5)
      frameGroup.rotation.y = Math.PI / 2
      frameGroup.scale.setScalar(0.78)
    } else if (i === 3) {
      frameGroup.position.set(3.55, 1.45, 0.5)
      frameGroup.rotation.y = -Math.PI / 2
      frameGroup.scale.setScalar(0.78)
    } else {
      // Overflow: further along side walls
      const side = i % 2 === 0 ? -1 : 1
      frameGroup.position.set(side * 3.55, 1.4, 2.2 + (i - 4) * 1.2)
      frameGroup.rotation.y = side > 0 ? -Math.PI / 2 : Math.PI / 2
      frameGroup.scale.setScalar(0.7)
    }
    void n
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
