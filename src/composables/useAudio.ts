import { Howl } from "howler"
import { onUnmounted, ref } from "vue"
import { allVo, ambientBed } from "../content/media"

/**
 * Layered ambient bed + scroll-synced Chinese VO (Howler).
 * Mute toggle persists in localStorage and gates both ambient and VO.
 * Soft chapter stingers duck under VO with the bed.
 */

const STORAGE_KEY = "decolonial-muted"

/** Module singleton so sections + App share one mixer. */
const muted = ref(true)
const activeVoId = ref<string | null>(null)
const activeCaption = ref("")
const unlocked = ref(false)

let ambient: Howl | null = null
const voCache = new Map<string, Howl>()
const stingerCache = new Map<number, Howl>()
let currentVo: Howl | null = null
let lastPlayedId: string | null = null
let duckTimer: ReturnType<typeof setTimeout> | null = null

const AMBIENT_VOL = 0.14
const AMBIENT_DUCK = 0.04

function ensureAmbient() {
  if (ambient) return ambient
  ambient = new Howl({
    src: [ambientBed.mp3, ambientBed.ogg],
    loop: true,
    volume: AMBIENT_VOL,
    html5: true,
    preload: true,
  })
  return ambient
}

function getVo(id: string, src: string) {
  let h = voCache.get(id)
  if (h) return h
  h = new Howl({
    src: [src, src.replace(/\.mp3$/, ".ogg")],
    volume: 0.92,
    html5: true,
    preload: true,
  })
  voCache.set(id, h)
  return h
}

function getStinger(i: number) {
  let h = stingerCache.get(i)
  if (h) return h
  const src = ambientBed.stingers[i % ambientBed.stingers.length]
  h = new Howl({ src: [src], volume: 0.18, html5: true, preload: true })
  stingerCache.set(i, h)
  return h
}

function setAmbientVolume(v: number) {
  ambient?.volume(v)
}

function applyMute() {
  const h = ensureAmbient()
  if (muted.value) {
    h.pause()
    currentVo?.stop()
    activeVoId.value = null
  } else if (unlocked.value) {
    if (!h.playing()) h.play()
    setAmbientVolume(AMBIENT_VOL)
  }
  try {
    localStorage.setItem(STORAGE_KEY, muted.value ? "1" : "0")
  } catch {
    /* ignore */
  }
}

export function playStinger(index = 0) {
  if (muted.value || !unlocked.value) return
  const h = getStinger(index)
  h.volume(0.16)
  h.play()
}

export function playVo(id: string, opts?: { text?: string; force?: boolean; stinger?: number }) {
  const line = allVo.find((l) => l.id === id) || null
  const text = opts?.text ?? line?.zh ?? ""
  activeCaption.value = text
  activeVoId.value = id

  if (muted.value || !unlocked.value) return
  if (!opts?.force && lastPlayedId === id && currentVo?.playing()) return

  const src = line?.src ?? `/media/vo/${id}.mp3`
  const howl = getVo(id, src)

  if (currentVo && currentVo !== howl) {
    currentVo.stop()
  }
  currentVo = howl
  lastPlayedId = id

  const sting = opts?.stinger ?? line?.stinger
  if (typeof sting === "number") playStinger(sting)

  // Duck ambient under VO
  setAmbientVolume(AMBIENT_DUCK)
  if (duckTimer) clearTimeout(duckTimer)

  howl.off("end")
  howl.once("end", () => {
    if (activeVoId.value === id) activeVoId.value = null
    setAmbientVolume(AMBIENT_VOL)
  })

  if (howl.playing()) howl.seek(0)
  howl.play()
}

export function stopVo() {
  currentVo?.stop()
  activeVoId.value = null
  setAmbientVolume(muted.value ? 0 : AMBIENT_VOL)
}

export function useAudio() {
  const init = () => {
    try {
      muted.value = localStorage.getItem(STORAGE_KEY) !== "0"
    } catch {
      muted.value = true
    }
    ensureAmbient()
    // Preload VO quietly
    for (const line of allVo) {
      getVo(line.id, line.src)
    }
    ambientBed.stingers.forEach((_, i) => getStinger(i))
  }

  const toggleMute = () => {
    muted.value = !muted.value
    if (!muted.value) unlocked.value = true
    applyMute()
  }

  const unlockAndPlay = () => {
    unlocked.value = true
    // First gesture: unmute ambient bed by default so immersion starts
    if (muted.value) {
      muted.value = false
    }
    applyMute()
  }

  const unlockKeepMute = () => {
    unlocked.value = true
    applyMute()
  }

  onUnmounted(() => {
    if (duckTimer) clearTimeout(duckTimer)
  })

  return {
    muted,
    activeVoId,
    activeCaption,
    unlocked,
    init,
    toggleMute,
    unlockAndPlay,
    unlockKeepMute,
    apply: applyMute,
    playVo,
    stopVo,
    playStinger,
  }
}
