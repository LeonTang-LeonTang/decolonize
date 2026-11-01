/**
 * Pass 9 — coordinated portal ownership.
 * Lenis + ScrollTrigger leave/enter can race across portals (or false-leave
 * mid-scrub). A single owner + debounced release keeps immersion alive until
 * another portal claims or leave is confirmed.
 */
import { getMuseumApp } from "./useMuseumWebGL"
import type { PortalId } from "../webgl/MuseumApp"

export type PortalClaimId = Exclude<PortalId, null>

let owner: PortalClaimId | null = null
let releaseTimer = 0
/** Bumped on every claim so a stale delayed release cannot clear a re-claim. */
let claimEpoch = 0

export function getPortalOwner() {
  return owner
}

export function claimPortal(
  id: PortalClaimId,
  portalT: number,
  immersionScale: number,
) {
  if (releaseTimer) {
    clearTimeout(releaseTimer)
    releaseTimer = 0
  }
  owner = id
  claimEpoch += 1
  getMuseumApp()?.setState({
    portal: id,
    portalT: Math.min(1, Math.max(0, portalT)),
    immersionScale,
  })
  return claimEpoch
}

/**
 * Release only if `id` still owns the portal. Debounced so a neighboring
 * portal's onEnter / onUpdate can claim without a null gap that kills immersion.
 */
export function releasePortal(id: PortalClaimId, delayMs = 160) {
  if (owner !== id) return
  if (releaseTimer) clearTimeout(releaseTimer)
  const expected = id
  const epoch = claimEpoch
  releaseTimer = window.setTimeout(() => {
    releaseTimer = 0
    // Re-claim (same or other portal) bumps epoch → abandon this release
    if (claimEpoch !== epoch) return
    if (owner !== expected) return
    owner = null
    getMuseumApp()?.setState({ portal: null, portalT: 0 })
  }, delayMs)
}

export function releasePortalNow(id: PortalClaimId) {
  if (owner !== id) return
  if (releaseTimer) {
    clearTimeout(releaseTimer)
    releaseTimer = 0
  }
  owner = null
  getMuseumApp()?.setState({ portal: null, portalT: 0 })
}
