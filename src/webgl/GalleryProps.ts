import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

/**
 * GLTF gallery architecture: pedestals + picture-frame mouldings.
 * Models in /public/models are purpose-built CC0-style glTF (oak pedestal + gilt frame).
 * Artwork textures stay on hung planes from frames.ts — never baked into these props.
 */
export class GalleryProps {
  readonly root = new THREE.Group()
  private loader = new GLTFLoader()
  private pedestalProto: THREE.Object3D | null = null
  private frameProto: THREE.Object3D | null = null
  private instances: THREE.Object3D[] = []
  private ready = false

  constructor(parent: THREE.Object3D) {
    this.root.name = "GalleryProps"
    parent.add(this.root)
  }

  async load(): Promise<void> {
    try {
      const [ped, frame] = await Promise.all([
        this.loadGltf("/models/museum-pedestal.gltf"),
        this.loadGltf("/models/picture-frame.gltf"),
      ])
      this.pedestalProto = ped
      this.frameProto = frame
    } catch (err) {
      console.warn("[museum] GLTF props failed — procedural pedestals/frames", err)
      this.pedestalProto = this.makeProceduralPedestal()
      this.frameProto = this.makeProceduralFrame()
    }
    this.ready = true
  }

  private makeProceduralPedestal(): THREE.Object3D {
    const g = new THREE.Group()
    const oak = new THREE.MeshStandardMaterial({
      color: 0x6b4f32,
      roughness: 0.7,
      metalness: 0.08,
      emissive: new THREE.Color(0x2a1c10),
      emissiveIntensity: 0.2,
    })
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.9), oak)
    base.position.y = 0.06
    const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.7, 0.55), oak.clone())
    shaft.position.y = 0.47
    const top = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.75), oak.clone())
    top.position.y = 0.87
    g.add(base, shaft, top)
    return g
  }

  private makeProceduralFrame(): THREE.Object3D {
    const g = new THREE.Group()
    const gilt = new THREE.MeshStandardMaterial({
      color: 0xc4a574,
      roughness: 0.45,
      metalness: 0.35,
      emissive: new THREE.Color(0x5a4020),
      emissiveIntensity: 0.25,
    })
    const outer = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 0.08), gilt)
    const matte = new THREE.Mesh(
      new THREE.PlaneGeometry(0.95, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x1c1814, roughness: 1 }),
    )
    matte.position.z = 0.045
    g.add(outer, matte)
    return g
  }

  isReady() {
    return this.ready
  }

  /** Place pedestals under a room's freestanding stills (z near center). */
  populateRoom(room: THREE.Group, count = 2) {
    this.clearUnder(room)
    if (!this.pedestalProto) return
    for (let i = 0; i < count; i++) {
      const p = this.pedestalProto.clone(true)
      const side = i % 2 === 0 ? -1 : 1
      p.position.set(side * 1.35, 0, -0.4 + i * 0.15)
      p.scale.setScalar(0.55)
      room.add(p)
      this.instances.push(p)
    }
    // Decorative empty frames on back wall corners (architecture only)
    if (this.frameProto) {
      for (const side of [-1, 1]) {
        const f = this.frameProto.clone(true)
        f.position.set(side * 2.6, 1.7, -6.2)
        f.scale.setScalar(0.9)
        room.add(f)
        this.instances.push(f)
      }
    }
  }

  populateCorridor(corridor: THREE.Group) {
    this.clearUnder(corridor)
    if (!this.pedestalProto) return
    // Three plinths down the center aisle
    for (let i = 0; i < 3; i++) {
      const p = this.pedestalProto.clone(true)
      p.position.set((i - 1) * 0.15, 0, 4 - i * 5.5)
      p.scale.setScalar(0.45)
      corridor.add(p)
      this.instances.push(p)
    }
  }

  dispose() {
    for (const o of this.instances) {
      o.parent?.remove(o)
      o.traverse((obj) => {
        const m = obj as THREE.Mesh
        m.geometry?.dispose()
        const mat = m.material as THREE.Material | THREE.Material[] | undefined
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose())
        else mat?.dispose()
      })
    }
    this.instances = []
    this.root.parent?.remove(this.root)
  }

  private clearUnder(room: THREE.Group) {
    // leave; instances tracked globally — rooms share lifetime with gallery
    void room
  }

  private loadGltf(url: string): Promise<THREE.Object3D> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        url,
        (gltf) => {
          gltf.scene.traverse((obj) => {
            const mesh = obj as THREE.Mesh
            if (mesh.isMesh) {
              mesh.castShadow = false
              mesh.receiveShadow = false
            }
          })
          resolve(gltf.scene)
        },
        undefined,
        reject,
      )
    })
  }
}
