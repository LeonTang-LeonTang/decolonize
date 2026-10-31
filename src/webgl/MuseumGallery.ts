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
  private floorMat: THREE.MeshBasicMaterial
  private wallMat: THREE.MeshBasicMaterial
  private props: GalleryProps

  private scene: THREE.Scene

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.root.name = "MuseumGallery"
    // Pass5b: MeshBasic shell — unmistakable walls/floors even if lights/bloom crush PBR
    this.floorMat = new THREE.MeshBasicMaterial({ color: 0x5a4a38 })
    this.wallMat = new THREE.MeshBasicMaterial({ color: 0x3e3428 })
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
      h.targetEmissive = 0.18 + near * 0.55
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
      new THREE.MeshBasicMaterial({ color: 0x2a241c }),
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
      new THREE.MeshBasicMaterial({ color: 0x4a3c2c }),
    )
    back.position.set(0, 1.7, floor.position.z - half)

    // Room label strip on back wall — visible even if textures fail
    const label = this.makeRoomLabel(kind)
    label.position.set(0, 2.85, floor.position.z - half + 0.02)
    parent.add(label)

    const key = new THREE.SpotLight(0xfff0d8, 42, 48, Math.PI / 4.2, 0.4, 1.1)
    key.position.set(0, 3.1, kind === "corridor" ? 8 : 5)
    key.target.position.set(0, 1.4, kind === "corridor" ? -4 : -1)
    parent.add(key, key.target)

    const fill = new THREE.PointLight(0xe8d5a3, 12, 28, 1.6)
    fill.position.set(0, 2.4, kind === "corridor" ? 0 : 1)

    const fill2 = new THREE.PointLight(0xffe6c8, 8, 22, 1.8)
    fill2.position.set(2.2, 2.2, kind === "corridor" ? -2 : -1.2)

    const rim = new THREE.DirectionalLight(0xc4a574, 0.85)
    rim.position.set(-2, 4, 6)

    const amb = new THREE.AmbientLight(0xd4c4a0, 0.45)

    parent.add(floor, ceil, left, right, back, fill, fill2, rim, amb)
  }

  private makeRoomLabel(kind: string): THREE.Mesh {
    const canvas = document.createElement("canvas")
    canvas.width = 1024
    canvas.height = 128
    const ctx = canvas.getContext("2d")!
    ctx.fillStyle = "#2a2218"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#c4a574"
    ctx.lineWidth = 4
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16)
    ctx.fillStyle = "#e8d5a3"
    ctx.font = "bold 48px Georgia, serif"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    const title =
      kind === "corridor"
        ? "CORRIDOR · 展廊总览"
        : `ROOM ${kind.replace("core", "").toUpperCase()} · 三维展厅`
    ctx.fillText(title, canvas.width / 2, canvas.height / 2)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 0.55),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true }),
    )
    return mesh
  }

  private async hangFrames(
    parent: THREE.Group,
    frames: GalleryFrame[],
    layout: "corridor" | CoreMode,
  ) {
    const tasks = frames.map(async (frame, i) => {
      const { tex, fallback } = await this.loadTextureSafe(frame)
      const aspect =
        frame.aspect ||
        (tex.image && tex.image.width && tex.image.height
          ? tex.image.width / tex.image.height
          : 1.4)
      const h = layout === "corridor" ? 1.65 : layout === "coreA" ? 2.2 : 1.9
      const w = h * aspect

      const geo = new THREE.PlaneGeometry(w, h)
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        roughness: fallback ? 0.55 : 0.65,
        metalness: 0.05,
        emissive: new THREE.Color(fallback ? 0xb08a4a : 0xffffff),
        emissiveIntensity: fallback ? 0.85 : 0.55,
        emissiveMap: fallback ? null : tex,
      })
      const mesh = new THREE.Mesh(geo, mat)

      const frameGroup = new THREE.Group()
      const moulding = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.12, h + 0.12, 0.06),
        new THREE.MeshBasicMaterial({ color: 0xc4a574 }),
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

  private async loadTextureSafe(
    frame: GalleryFrame,
  ): Promise<{ tex: THREE.Texture; fallback: boolean }> {
    try {
      const tex = await this.loadTexture(frame.src)
      return { tex, fallback: false }
    } catch (err) {
      console.warn("[museum] texture failed — solid label plane", frame.src, err)
      return { tex: this.makeFallbackTexture(frame), fallback: true }
    }
  }

  private makeFallbackTexture(frame: GalleryFrame): THREE.Texture {
    const canvas = document.createElement("canvas")
    canvas.width = 768
    canvas.height = 512
    const ctx = canvas.getContext("2d")!
    const hues: Record<string, string> = {
      A: "#5c3d2e",
      B: "#3d4a5c",
      C: "#3d5c45",
      D: "#5c3d4a",
      E: "#4a3d5c",
      F: "#5c523d",
      intro: "#3a3428",
    }
    ctx.fillStyle = hues[frame.core] || "#3a3428"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#c4a574"
    ctx.lineWidth = 10
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48)
    ctx.fillStyle = "#e8d5a3"
    ctx.font = "bold 36px Georgia, serif"
    ctx.textAlign = "center"
    ctx.fillText(frame.title.slice(0, 28), canvas.width / 2, canvas.height / 2 - 12)
    ctx.font = "22px sans-serif"
    ctx.fillStyle = "#c4a574"
    ctx.fillText("展品纹理加载失败 · 占位可见", canvas.width / 2, canvas.height / 2 + 36)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
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
