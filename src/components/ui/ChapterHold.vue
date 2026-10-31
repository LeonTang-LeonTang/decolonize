<script setup lang="ts">
/**
 * Pass 7 — Kristallnacht-style chapter director hold.
 * Sticky immersive media beat with:
 *  - scroll resistance (longer pin / scrub damping)
 *  - optional press-and-hold to release into next evidence
 *  - dark immersive HUD + progress
 *  - emit hold-exit for VO / stinger wiring
 */
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { playStinger, playVo } from "../../composables/useAudio"

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    heightVh?: number
    label?: string
    /** Require press-and-hold (or enough scrub) before scrolling past */
    requireHold?: boolean
    /** Hold duration ms to unlock advance */
    holdMs?: number
    /** Optional VO id fired when hold unlocks / exits */
    exitVoId?: string
    exitVoText?: string
    /** Soft stinger index on exit */
    exitStinger?: number
  }>(),
  {
    heightVh: 110,
    requireHold: true,
    holdMs: 700,
  },
)

const emit = defineEmits<{
  "hold-progress": [n: number]
  "hold-unlock": []
  "hold-exit": []
}>()

const root = ref<HTMLElement | null>(null)
const scrub = ref(0)
const holdProgress = ref(0)
const unlocked = ref(false)
const pressing = ref(false)
const { reduced } = useReducedMotion()

let st: ScrollTrigger | null = null
let holdRaf = 0
let holdStart = 0
let exited = false

const runwayVh = computed(() => {
  // Extra runway = scroll resistance feel (Kristallnacht-style claim beat)
  const base = props.heightVh
  if (reduced.value) return Math.min(base, 70)
  return props.requireHold ? Math.max(base, 130) : base
})

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
      unlocked.value = true
      pressing.value = false
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
  // Decay slightly if not complete — scroll resistance remains
  if (!unlocked.value && holdProgress.value < 1) {
    holdProgress.value = Math.max(0, holdProgress.value * 0.65)
  }
}

const skipUnlock = () => {
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
      // Soft resistance: until unlocked, clamp visual progress feel
      if (props.requireHold && !unlocked.value && self.progress > 0.55) {
        // Visual cue only — user must hold or keep scrolling the long runway
        holdProgress.value = Math.max(holdProgress.value, (self.progress - 0.55) / 0.45)
        if (holdProgress.value >= 0.98) {
          unlocked.value = true
          emit("hold-unlock")
        }
      }
      if (self.progress > 0.88 && unlocked.value) fireExit()
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
</script>

<template>
  <div
    ref="root"
    class="hold"
    :class="{
      'hold--locked': requireHold && !unlocked && !reduced,
      'hold--unlocked': unlocked || reduced,
    }"
    :style="{ height: runwayVh + 'vh' }"
    :data-scrub="scrub.toFixed(3)"
  >
    <div class="hold__stage">
      <div class="hold__veil" :style="{ opacity: 0.55 * (1 - Math.min(1, scrub * 1.4)) }" aria-hidden="true" />
      <div class="hold__media">
        <slot />
      </div>
      <div v-if="label || $slots.caption" class="hold__hud">
        <span class="hold__role">沉浸辅证 · 章节定格</span>
        <span v-if="label" class="hold__label">{{ label }}</span>
        <div class="hold__caption">
          <slot name="caption" />
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
            <span class="hold__press-label">
              {{ pressing ? "继续按住…" : "按住以进入证据" }}
            </span>
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
  background: radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.72) 100%);
  transition: opacity 0.2s linear;
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
.hold__hud {
  position: absolute;
  inset: auto 0 0 0;
  z-index: 2;
  padding: 4.5rem 1.25rem 1.35rem;
  background: linear-gradient(transparent, rgba(3, 2, 1, 0.94) 55%);
  display: grid;
  gap: 0.45rem;
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
}
</style>
