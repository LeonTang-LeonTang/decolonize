<script setup lang="ts">
/**
 * Pass 8 — Kristallnacht multi-beat chapter director.
 * Sequence 2–3 hold beats (claim → artwork reveal → effect) with dark transitions.
 * Scroll resistance + press-and-hold to advance beats / unlock exit.
 * Single-slot API kept when `beats` is omitted (Pass 7 compat).
 */
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { playStinger, playVo } from "../../composables/useAudio"
import { beatRoleLabel, type HoldBeat } from "../../content/holdBeats"

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    heightVh?: number
    label?: string
    requireHold?: boolean
    holdMs?: number
    exitVoId?: string
    exitVoText?: string
    exitStinger?: number
    /** Pass 8 multi-beat sequence; when set, drives claim→artwork→effect */
    beats?: HoldBeat[]
  }>(),
  {
    heightVh: 110,
    requireHold: true,
    holdMs: 650,
  },
)

const emit = defineEmits<{
  "hold-progress": [n: number]
  "hold-unlock": []
  "hold-exit": []
  "beat-change": [i: number]
}>()

const root = ref<HTMLElement | null>(null)
const scrub = ref(0)
const holdProgress = ref(0)
const unlocked = ref(false)
const pressing = ref(false)
const beatIdx = ref(0)
const darkFlash = ref(0)
const { reduced } = useReducedMotion()

let st: ScrollTrigger | null = null
let holdRaf = 0
let holdStart = 0
let exited = false
let lastBeat = -1

const multi = computed(() => (props.beats?.length ?? 0) >= 2)
const beatCount = computed(() => props.beats?.length ?? 1)
const activeBeat = computed(() => (multi.value ? props.beats![beatIdx.value] : null))

const runwayVh = computed(() => {
  const base = props.heightVh
  if (reduced.value) return Math.min(base, 70)
  // Extra runway per beat for Kristallnacht resistance
  const boost = multi.value ? 40 * beatCount.value : props.requireHold ? 30 : 0
  return Math.max(base + boost, multi.value ? 160 : base)
})

const syncBeatFromScrub = (p: number) => {
  if (!multi.value) return
  const n = beatCount.value
  const idx = Math.min(n - 1, Math.floor(p * n + 0.001))
  if (idx !== beatIdx.value) {
    darkFlash.value = 1
    beatIdx.value = idx
    emit("beat-change", idx)
    // Soft fade flash
    requestAnimationFrame(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 560)
        darkFlash.value = 1 - t
        if (t < 1) requestAnimationFrame(tick)
        else darkFlash.value = 0
      }
      requestAnimationFrame(tick)
    })
  }
}

const startHold = () => {
  if (unlocked.value || reduced.value) return
  pressing.value = true
  holdStart = performance.now() - holdProgress.value * props.holdMs
  const tick = (now: number) => {
    if (!pressing.value) return
    const p = Math.min(1, (now - holdStart) / props.holdMs)
    holdProgress.value = p
    emit("hold-progress", p)
    if (p >= 1) {
      pressing.value = false
      // Multi-beat: press unlocks next beat until last; then exit unlock
      if (multi.value && beatIdx.value < beatCount.value - 1) {
        const next = beatIdx.value + 1
        darkFlash.value = 1
        beatIdx.value = next
        holdProgress.value = 0
        emit("beat-change", next)
        requestAnimationFrame(() => {
          const start = performance.now()
          const fade = (tnow: number) => {
            const t = Math.min(1, (tnow - start) / 520)
            darkFlash.value = 1 - t
            if (t < 1) requestAnimationFrame(fade)
            else darkFlash.value = 0
          }
          requestAnimationFrame(fade)
        })
        return
      }
      unlocked.value = true
      emit("hold-unlock")
      if (typeof props.exitStinger === "number") playStinger(props.exitStinger)
      return
    }
    holdRaf = requestAnimationFrame(tick)
  }
  holdRaf = requestAnimationFrame(tick)
}

const endHold = () => {
  pressing.value = false
  if (holdRaf) cancelAnimationFrame(holdRaf)
  if (!unlocked.value && holdProgress.value < 1) {
    holdProgress.value = Math.max(0, holdProgress.value * 0.65)
  }
}

const skipUnlock = () => {
  if (multi.value && beatIdx.value < beatCount.value - 1) {
    beatIdx.value = beatCount.value - 1
    emit("beat-change", beatIdx.value)
  }
  unlocked.value = true
  holdProgress.value = 1
  emit("hold-unlock")
}

const fireExit = () => {
  if (exited) return
  exited = true
  emit("hold-exit")
  if (props.exitVoId) {
    playVo(props.exitVoId, { text: props.exitVoText, force: false })
  } else if (typeof props.exitStinger === "number") {
    playStinger(props.exitStinger)
  }
}

const pressLabel = computed(() => {
  if (!multi.value) return pressing.value ? "继续按住…" : "按住以进入证据"
  if (beatIdx.value < beatCount.value - 1) {
    return pressing.value ? "继续按住… 下一拍" : "按住进入下一拍"
  }
  return pressing.value ? "继续按住…" : "按住解锁继续滚动"
})

onMounted(() => {
  if (reduced.value || !root.value) {
    unlocked.value = true
    return
  }
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.65,
    onUpdate: (self) => {
      scrub.value = self.progress
      syncBeatFromScrub(self.progress)
      if (props.requireHold && !unlocked.value && self.progress > 0.72) {
        holdProgress.value = Math.max(holdProgress.value, (self.progress - 0.72) / 0.28)
        if (holdProgress.value >= 0.98) {
          unlocked.value = true
          emit("hold-unlock")
        }
      }
      if (self.progress > 0.9 && unlocked.value) fireExit()
      lastBeat = beatIdx.value
    },
    onLeave: () => {
      if (unlocked.value) fireExit()
    },
  })
})

onUnmounted(() => {
  st?.kill()
  if (holdRaf) cancelAnimationFrame(holdRaf)
})

watch(unlocked, (v) => {
  if (v) emit("hold-unlock")
})

void lastBeat
</script>

<template>
  <div
    ref="root"
    class="hold"
    :class="{
      'hold--locked': requireHold && !unlocked && !reduced,
      'hold--unlocked': unlocked || reduced,
      'hold--multi': multi,
    }"
    :style="{ height: runwayVh + 'vh' }"
    :data-scrub="scrub.toFixed(3)"
    :data-beat="beatIdx"
  >
    <div class="hold__stage">
      <div
        class="hold__veil"
        :style="{ opacity: 0.58 * (1 - Math.min(1, scrub * 1.35)) + darkFlash * 0.92 }"
        aria-hidden="true"
      />
      <div class="hold__dark" :style="{ opacity: darkFlash }" aria-hidden="true" />

      <!-- Multi-beat media stack -->
      <div v-if="multi && beats" class="hold__media hold__media--beats">
        <figure
          v-for="(b, i) in beats"
          :key="i"
          class="hold__beat"
          :class="{ 'is-active': i === beatIdx, 'hold__beat--claim': b.role === 'claim' }"
          :data-role="b.role"
        >
          <img :src="b.src" :alt="b.alt" draggable="false" />
          <div v-if="b.role === 'claim'" class="hold__claim-card" aria-hidden="false">
            <span class="hold__claim-kicker">主张卡 · 课堂清晰度</span>
            <p class="hold__claim-text">{{ b.caption }}</p>
          </div>
        </figure>
      </div>
      <!-- Single-slot Pass 7 fallback -->
      <div v-else class="hold__media">
        <slot />
      </div>

      <div class="hold__hud">
        <span class="hold__role">
          {{ multi ? "沉浸辅证 · 多拍定格导演" : "沉浸辅证 · 章节定格" }}
        </span>
        <span v-if="label" class="hold__label">{{ label }}</span>

        <div v-if="multi && activeBeat" class="hold__beat-meta">
          <span class="hold__beat-idx">
            {{ beatRoleLabel(activeBeat.role) }} · {{ beatIdx + 1 }}/{{ beatCount }}
          </span>
          <div class="hold__beat-dots" aria-hidden="true">
            <i
              v-for="(_, i) in beats"
              :key="i"
              :class="{ on: i === beatIdx, done: i < beatIdx }"
            />
          </div>
        </div>

        <div
          class="hold__caption"
          :class="{ 'hold__caption--claim': multi && activeBeat?.role === 'claim' }"
        >
          <template v-if="multi && activeBeat && activeBeat.role !== 'claim'">{{ activeBeat.caption }}</template>
          <template v-else-if="multi && activeBeat?.role === 'claim'">
            <span class="hold__caption-hint">向下滚动或长按进入下一拍</span>
          </template>
          <slot v-else name="caption" />
        </div>

        <div v-if="requireHold && !reduced" class="hold__director">
          <button
            v-if="!unlocked"
            type="button"
            class="hold__press"
            :aria-pressed="pressing"
            @pointerdown.prevent="startHold"
            @pointerup="endHold"
            @pointerleave="endHold"
            @pointercancel="endHold"
            @keydown.space.prevent="startHold"
            @keyup.space="endHold"
          >
            <span class="hold__press-ring" :style="{ '--p': holdProgress }">
              <i />
            </span>
            <span class="hold__press-label">{{ pressLabel }}</span>
          </button>
          <p v-else class="hold__unlocked-hint">已解锁 · 继续滚动进入下一证据</p>
          <button
            v-if="!unlocked"
            type="button"
            class="hold__skip"
            @click="skipUnlock"
          >
            跳过定格 ↓
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hold {
  position: relative;
  margin: 0 0 2rem;
}
.hold__stage {
  position: sticky;
  top: calc(var(--nav-h) + var(--progress-h));
  height: calc(78vh - var(--nav-h) - var(--progress-h));
  min-height: 300px;
  overflow: hidden;
  background: #030201;
}
.hold__veil {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 18%, rgba(0, 0, 0, 0.75) 100%);
  transition: opacity 0.15s linear;
}
.hold__dark {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: #000;
  transition: opacity 0.05s linear;
}
.hold--locked .hold__stage {
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.65);
}
.hold__media {
  position: absolute;
  inset: 0;
  :deep(img),
  :deep(video),
  :deep(figure) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
    border: 0;
    border-radius: 0;
    max-height: none;
  }
  :deep(figcaption) {
    display: none;
  }
}
.hold__media--beats {
  display: block;
}
.hold__beat {
  position: absolute;
  inset: 0;
  margin: 0;
  opacity: 0;
  transition: opacity 0.45s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.is-active {
    opacity: 1;
    z-index: 1;
  }
}
.hold__hud {
  position: absolute;
  inset: auto 0 0 0;
  z-index: 4;
  padding: 4.5rem 1.25rem 1.35rem;
  background: linear-gradient(transparent, rgba(3, 2, 1, 0.94) 55%);
  display: grid;
  gap: 0.4rem;
}
.hold__role {
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  color: var(--ink-dim);
}
.hold__label {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.hold__beat-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}
.hold__beat-idx {
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: var(--accent-soft);
}
.hold__beat-dots {
  display: inline-flex;
  gap: 0.35rem;
  i {
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    background: rgba(196, 165, 116, 0.28);
    display: block;
    &.on {
      background: var(--accent);
      box-shadow: 0 0 0 3px rgba(196, 165, 116, 0.22);
    }
    &.done {
      background: rgba(196, 165, 116, 0.7);
    }
  }
}
.hold__caption {
  max-width: 40em;
  color: var(--ink);
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  line-height: 1.55;
  font-family: var(--serif);
}
.hold__director {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1rem;
  margin-top: 0.65rem;
}
.hold__press {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.4rem 0.75rem 0.4rem 0.4rem;
  border: 1px solid rgba(196, 165, 116, 0.45);
  border-radius: 999px;
  background: rgba(12, 11, 9, 0.72);
  color: var(--ink);
  touch-action: none;
  user-select: none;
}
.hold__press-ring {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: conic-gradient(var(--accent) calc(var(--p, 0) * 1turn), rgba(196, 165, 116, 0.2) 0);
  display: grid;
  place-items: center;
  i {
    width: 1.35rem;
    height: 1.35rem;
    border-radius: 50%;
    background: #0c0b09;
    display: block;
  }
}
.hold__press-label {
  font-size: 0.75rem;
  letter-spacing: 0.06em;
}
.hold__skip {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  color: var(--ink-dim);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.hold__unlocked-hint {
  font-size: 0.72rem;
  color: var(--accent-soft);
  letter-spacing: 0.06em;
}
@media (prefers-reduced-motion: reduce) {
  .hold {
    height: auto !important;
  }
  .hold__stage {
    position: relative;
    top: auto;
    height: auto;
    min-height: 220px;
  }
  .hold__beat {
    position: relative;
    opacity: 1 !important;
    margin-bottom: 0.5rem;
  }
}

.hold__beat--claim img {
  filter: brightness(0.42) contrast(1.08) saturate(0.85);
}
.hold__claim-card {
  position: absolute;
  inset: 12% 8% auto 8%;
  z-index: 2;
  max-width: 36em;
  padding: 1.35rem 1.5rem 1.5rem;
  background: rgba(2, 1, 0, 0.82);
  border: 1px solid rgba(196, 165, 116, 0.38);
  border-left: 3px solid var(--accent);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
}
.hold__claim-kicker {
  display: block;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.65rem;
}
.hold__claim-text {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(1.25rem, 3.2vw, 1.85rem);
  line-height: 1.4;
  color: var(--ink);
  font-weight: 600;
  text-wrap: balance;
}
.hold__caption--claim {
  opacity: 0.75;
}
.hold__caption-hint {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--ink-dim);
  font-family: var(--sans, system-ui, sans-serif);
}
.hold__stage {
  background: #010100;
}
.hold__dark {
  background: #000;
}
</style>
