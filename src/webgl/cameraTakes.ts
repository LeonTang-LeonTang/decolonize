import * as THREE from "three"
import type { GalleryMode } from "./MuseumGallery"

/**
 * Theatre-like hold cameras — keyframed poses scrubbed by portalT (0–1).
 * Pass 7: denser keys + smoother ease for corridor ↔ Core room takes.
 */
export type CamPose = {
  position: THREE.Vector3
  lookAt: THREE.Vector3
  fov?: number
}

type Key = { t: number; pose: CamPose }

const tmpPos = new THREE.Vector3()
const tmpLook = new THREE.Vector3()

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function lerpPose(a: CamPose, b: CamPose, t: number): CamPose {
  const e = easeInOutCubic(THREE.MathUtils.clamp(t, 0, 1))
  return {
    position: tmpPos.copy(a.position).lerp(b.position, e).clone(),
    lookAt: tmpLook.copy(a.lookAt).lerp(b.lookAt, e).clone(),
    fov: a.fov != null && b.fov != null ? THREE.MathUtils.lerp(a.fov, b.fov, e) : a.fov ?? b.fov,
  }
}

function sampleKeys(keys: Key[], t: number): CamPose {
  const p = THREE.MathUtils.clamp(t, 0, 1)
  if (p <= keys[0].t) return keys[0].pose
  if (p >= keys[keys.length - 1].t) return keys[keys.length - 1].pose
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (p >= a.t && p <= b.t) {
      const local = (p - a.t) / Math.max(1e-5, b.t - a.t)
      return lerpPose(a.pose, b.pose, local)
    }
  }
  return keys[keys.length - 1].pose
}

function K(t: number, x: number, y: number, z: number, lx: number, ly: number, lz: number, fov?: number): Key {
  return {
    t,
    pose: {
      position: new THREE.Vector3(x, y, z),
      lookAt: new THREE.Vector3(lx, ly, lz),
      fov,
    },
  }
}

/** Per-gallery camera takes (hold → approach → settle on evidence). */
const TAKES: Partial<Record<GalleryMode, Key[]>> = {
  corridor: [
    K(0, 0.2, 1.65, 11.2, 0, 1.45, 6, 44),
    K(0.2, 0.18, 1.62, 6.5, 0.05, 1.48, 2, 42),
    K(0.45, 0.12, 1.6, 1.8, 0.1, 1.5, -2, 40),
    K(0.7, -0.08, 1.58, -5.5, 0, 1.48, -9.5, 38),
    K(1, 0, 1.55, -13.2, 0, 1.4, -16, 36),
  ],
  coreA: [
    K(0, 0, 1.62, 7.2, 0, 1.45, -0.5, 44),
    K(0.25, 0.15, 1.58, 4.2, 0, 1.48, -1.5, 42),
    K(0.5, 0.22, 1.55, 2.0, 0, 1.5, -2.2, 40),
    K(0.78, -0.12, 1.52, 0.55, -0.3, 1.5, -2.35, 38),
    K(1, 0.04, 1.5, 0.2, 0, 1.48, -2.3, 36),
  ],
  coreB: [
    K(0, 0, 1.7, 6.8, 0, 1.4, 0.2, 45),
    K(0.3, -0.25, 1.6, 3.5, -0.5, 1.48, -1.2, 42),
    K(0.6, -0.35, 1.55, 1.5, -0.7, 1.5, -2.1, 40),
    K(1, 0.15, 1.5, 0.35, 0.25, 1.45, -2.3, 38),
  ],
  coreC: [
    K(0, 0.25, 1.65, 6.5, 0, 1.4, -0.5, 44),
    K(0.35, 0.1, 1.55, 3.2, 0, 1.5, -1.8, 41),
    K(0.7, 0, 1.5, 1.2, 0, 1.55, -2.4, 39),
    K(1, -0.15, 1.48, 0.25, -0.15, 1.5, -2.4, 37),
  ],
  coreD: [
    K(0, 0, 1.78, 7.0, 0, 1.35, 0.2, 44),
    K(0.28, 0.35, 1.6, 3.8, 0.4, 1.42, -1.2, 42),
    K(0.55, 0.4, 1.55, 1.8, 0.5, 1.45, -2.0, 40),
    K(1, 0, 1.5, 0.3, 0, 1.5, -2.35, 36),
  ],
  coreE: [
    K(0, -0.15, 1.7, 6.8, 0, 1.35, 0.2, 45),
    K(0.35, 0.05, 1.58, 3.4, 0, 1.45, -1.4, 42),
    K(0.7, 0.12, 1.52, 1.3, 0, 1.48, -2.2, 40),
    K(1, 0.08, 1.48, 0.25, 0.08, 1.45, -2.4, 38),
  ],
  coreF: [
    K(0, 0, 1.65, 7.0, 0, 1.4, -0.2, 44),
    K(0.22, -0.2, 1.58, 4.0, -0.35, 1.48, -1.2, 42),
    K(0.5, -0.25, 1.54, 2.0, -0.4, 1.5, -2.1, 40),
    K(0.78, 0.2, 1.5, 0.7, 0.3, 1.48, -2.3, 38),
    K(1, 0, 1.48, 0.2, 0, 1.45, -2.35, 36),
  ],
}

export function cameraTake(mode: GalleryMode, t: number): CamPose | null {
  const keys = TAKES[mode]
  if (!keys) return null
  return sampleKeys(keys, t)
}
