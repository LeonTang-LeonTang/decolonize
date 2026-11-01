/**
 * Pass 11 — lightweight Kristallnacht-inspired cinematic director config.
 * Leon-editable: wipe / claim-card / beat timing. Not a full CMS product.
 * Consumed by ChapterWipe + ChapterHold; hold beat media still live in holdBeats.ts.
 */
import { holdDirectors, type HoldBeat, type HoldBeatRole } from "./holdBeats"

export type WipeTone = "void" | "ember" | "ink"

export type WipeDirector = {
  /** Matches bridge `to` / section id (act1, act2b, …) */
  toId: string
  label: string
  /** Runway height for the wipe band */
  heightVh: number
  /** 0–1 — how black the shade sits */
  darkness: number
  /** Underlying wipe video opacity */
  videoOpacity: number
  /** GSAP flash duration (seconds, one-way before yoyo) */
  flashSec: number
  tone: WipeTone
  stinger?: number
}

export type ClaimCardStyle = {
  kicker: string
  /** Typographic weight of the claim text */
  weight: "editorial" | "monument" | "whisper"
  /** Extra dark flash ms when entering claim beat */
  flashMs: number
}

export type BeatTiming = {
  role: HoldBeatRole
  /** Suggested press-hold ms for this beat (ChapterHold may use) */
  holdMs: number
  /** Dark flash duration when landing on this beat */
  flashMs: number
}

export type ChapterCinematic = {
  sectionId: string
  label: string
  claim: ClaimCardStyle
  timings: BeatTiming[]
  /** Soft sequence hint for editors — claim → artwork → effect */
  sequenceNote: string
  exitVoId?: string
  exitStinger?: number
  beats: HoldBeat[]
}

/** Darker chapter wipes — Inside Kristallnacht adjacent, still scroll-native */
export const wipeDirectors: WipeDirector[] = [
  {
    toId: "act1",
    label: "Ⅰ · 定义",
    heightVh: 26,
    darkness: 0.94,
    videoOpacity: 0.18,
    flashSec: 0.62,
    tone: "void",
    stinger: 1,
  },
  {
    toId: "act2intro",
    label: "Ⅱ · 论证",
    heightVh: 26,
    darkness: 0.95,
    videoOpacity: 0.16,
    flashSec: 0.68,
    tone: "ink",
    stinger: 2,
  },
  {
    toId: "act2b",
    label: "例证 B",
    heightVh: 28,
    darkness: 0.97,
    videoOpacity: 0.14,
    flashSec: 0.72,
    tone: "void",
    stinger: 3,
  },
  {
    toId: "act2c",
    label: "例证 C",
    heightVh: 28,
    darkness: 0.96,
    videoOpacity: 0.15,
    flashSec: 0.7,
    tone: "ink",
    stinger: 4,
  },
  {
    toId: "act2d",
    label: "例证 D",
    heightVh: 30,
    darkness: 0.98,
    videoOpacity: 0.12,
    flashSec: 0.78,
    tone: "ember",
    stinger: 5,
  },
  {
    toId: "act2e",
    label: "例证 E",
    heightVh: 28,
    darkness: 0.96,
    videoOpacity: 0.15,
    flashSec: 0.7,
    tone: "ink",
    stinger: 6,
  },
  {
    toId: "act2f",
    label: "例证 F",
    heightVh: 28,
    darkness: 0.97,
    videoOpacity: 0.14,
    flashSec: 0.72,
    tone: "void",
    stinger: 0,
  },
  {
    toId: "act3",
    label: "Ⅳ · 总结",
    heightVh: 26,
    darkness: 0.95,
    videoOpacity: 0.16,
    flashSec: 0.66,
    tone: "ember",
    stinger: 1,
  },
]

const DEFAULT_CLAIM: ClaimCardStyle = {
  kicker: "主张卡 · 课堂清晰度",
  weight: "editorial",
  flashMs: 640,
}

const DEFAULT_TIMINGS: BeatTiming[] = [
  { role: "claim", holdMs: 720, flashMs: 640 },
  { role: "artwork", holdMs: 680, flashMs: 520 },
  { role: "effect", holdMs: 650, flashMs: 480 },
]

/** Per-core claim typography + timing — edit here, not in Vue */
const claimBySection: Record<string, ClaimCardStyle> = {
  act2a: {
    kicker: "主张卡 · 画题即权力",
    weight: "monument",
    flashMs: 700,
  },
  act2b: {
    kicker: "主张卡 · 命名装置",
    weight: "editorial",
    flashMs: 660,
  },
  act2c: {
    kicker: "主张卡 · 省略伦理",
    weight: "whisper",
    flashMs: 720,
  },
  act2d: {
    kicker: "主张卡 · 纪念碑语法",
    weight: "monument",
    flashMs: 740,
  },
  act2e: {
    kicker: "主张卡 · 档案接缝",
    weight: "editorial",
    flashMs: 680,
  },
  act2f: {
    kicker: "主张卡 · 展览／纪念工程",
    weight: "monument",
    flashMs: 700,
  },
}

export function wipeForTo(toId: string): WipeDirector | undefined {
  return wipeDirectors.find((w) => w.toId === toId)
}

export function cinematicForSection(sectionId: string): ChapterCinematic | undefined {
  const base = holdDirectors.find((d) => d.sectionId === sectionId)
  if (!base) return undefined
  return {
    sectionId: base.sectionId,
    label: base.label,
    claim: claimBySection[sectionId] || DEFAULT_CLAIM,
    timings: DEFAULT_TIMINGS,
    sequenceNote: "claim → artwork → effect（Kristallnacht 式定格节拍）",
    exitVoId: base.exitVoId,
    exitStinger: base.exitStinger,
    beats: base.beats,
  }
}

export function claimStyleForSection(sectionId: string): ClaimCardStyle {
  return claimBySection[sectionId] || DEFAULT_CLAIM
}

export function beatTiming(role: HoldBeatRole): BeatTiming {
  return DEFAULT_TIMINGS.find((t) => t.role === role) || DEFAULT_TIMINGS[0]
}
