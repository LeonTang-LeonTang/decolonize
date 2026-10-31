<script setup lang="ts">
import { computed, ref } from "vue"
import type { SlideBeat } from "../../content/slides"
import { useViewMode } from "../../composables/useViewMode"
import { playStinger } from "../../composables/useAudio"

const props = defineProps<{
  slide: SlideBeat
  /** When true, show evidence CTA that scrolls to target / emits */
  showCta?: boolean
  /** Soft stinger when expanding into evidence */
  expandStinger?: number
}>()

const emit = defineEmits<{ expand: []; next: [] }>()
const expandedHint = ref(false)
const holdP = ref(0)
const holding = ref(false)
const { isReading } = useViewMode()

let holdRaf = 0
let holdStart = 0
const HOLD_MS = 550

const pageLabel = computed(() => `第 ${props.slide.page} / ${props.slide.total} 页`)

const goEvidence = () => {
  expandedHint.value = true
  emit("expand")
  if (typeof props.expandStinger === "number") playStinger(props.expandStinger)
  else playStinger((props.slide.page - 1) % 7)
  const target = props.slide.evidenceTarget
  if (target) {
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      return
    }
  }
  // Prefer evidence strip / body after this slide
  const strip = document.querySelector(
    `#${props.slide.id} .estrip, [data-chapter="${props.slide.id}"] .estrip`,
  ) as HTMLElement | null
  if (strip) {
    strip.scrollIntoView({ behavior: "smooth", block: "start" })
    return
  }
  const root = document.getElementById(`slide-${props.slide.id}`)
  if (root) {
    const next = root.nextElementSibling as HTMLElement | null
    const y = (next?.offsetTop ?? root.offsetTop + root.offsetHeight) - 72
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })
  }
}

const onCta = () => goEvidence()

const startHold = () => {
  holding.value = true
  holdStart = performance.now() - holdP.value * HOLD_MS
  const tick = (now: number) => {
    if (!holding.value) return
    holdP.value = Math.min(1, (now - holdStart) / HOLD_MS)
    if (holdP.value >= 1) {
      holding.value = false
      goEvidence()
      return
    }
    holdRaf = requestAnimationFrame(tick)
  }
  holdRaf = requestAnimationFrame(tick)
}

const endHold = () => {
  holding.value = false
  if (holdRaf) cancelAnimationFrame(holdRaf)
  if (holdP.value < 1) holdP.value = Math.max(0, holdP.value * 0.4)
}
</script>

<template>
  <div
    :id="'slide-' + slide.id"
    class="slide"
    :data-slide="slide.id"
    :data-mode="isReading ? 'reading' : 'museum'"
  >
    <div class="slide__stage">
      <div class="slide__deck">
        <div class="slide__meta">
          <span class="slide__page">{{ pageLabel }}</span>
          <span class="slide__stage-label">{{ slide.stageLabel }}</span>
        </div>
        <p class="slide__eyebrow">{{ slide.eyebrow }}</p>
        <h2 class="slide__claim">{{ slide.claim }}</h2>
        <p class="slide__thesis">
          <span class="slide__thesis-label">本页论点</span>
          {{ slide.thesis }}
        </p>
        <ul class="slide__bullets">
          <li v-for="(b, i) in slide.bullets" :key="i">{{ b }}</li>
        </ul>
        <div v-if="showCta !== false && slide.evidenceCta" class="slide__cta-row">
          <button type="button" class="slide__cta" @click="onCta">
            {{ slide.evidenceCta }}
            <span aria-hidden="true"> ↓</span>
          </button>
          <button
            type="button"
            class="slide__hold"
            :aria-pressed="holding"
            title="按住以进入证据层"
            @pointerdown.prevent="startHold"
            @pointerup="endHold"
            @pointerleave="endHold"
            @pointercancel="endHold"
          >
            <span class="slide__hold-ring" :style="{ '--p': holdP }"><i /></span>
            <span>{{ holding ? "松手取消 · 按满进入" : "按住进入证据" }}</span>
          </button>
          <p class="slide__hint">
            {{ isReading ? "阅读模式：先吃透论点，再展开证据／展厅" : "展厅模式：滚动即可进入沉浸辅证" }}
            · ←/→ 或空格翻页 · 按住＝Kristallnacht 式定格推进
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slide {
  position: relative;
  /* Boat-like hold: sticky stage over tall scroll runway */
  min-height: 115vh;
  margin: 0 0 0.5rem;
  z-index: 2;
}
.slide__stage {
  position: sticky;
  top: calc(var(--nav-h) + var(--progress-h) + var(--deck-h, 28px));
  min-height: calc(100vh - var(--nav-h) - var(--progress-h) - var(--deck-h, 28px) - 1rem);
  display: flex;
  align-items: center;
  padding: 1.25rem 1.25rem 2rem;
  /* Lecture-deck panel over subdued museum */
  background: linear-gradient(
    160deg,
    rgba(12, 11, 9, 0.94) 0%,
    rgba(12, 11, 9, 0.88) 55%,
    rgba(12, 11, 9, 0.78) 100%
  );
  border-bottom: 1px solid rgba(196, 165, 116, 0.18);
  backdrop-filter: blur(10px);
}
.slide[data-mode="museum"] .slide__stage {
  background: linear-gradient(
    160deg,
    rgba(12, 11, 9, 0.78) 0%,
    rgba(12, 11, 9, 0.62) 60%,
    rgba(12, 11, 9, 0.45) 100%
  );
}
.slide__deck {
  max-width: 820px;
  margin: 0 auto;
  width: 100%;
}
.slide__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}
.slide__page {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
  padding: 0.2rem 0.55rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
}
.slide__stage-label {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: var(--ink-dim);
  text-transform: uppercase;
}
.slide__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 0.65rem;
}
.slide__claim {
  font-family: var(--serif);
  font-size: clamp(1.55rem, 3.8vw, 2.45rem);
  line-height: 1.28;
  color: var(--ink);
  margin-bottom: 1rem;
  font-weight: 600;
}
.slide__thesis {
  margin: 0 0 1.25rem;
  padding: 0.85rem 1rem;
  border-left: 3px solid var(--accent);
  background: rgba(196, 165, 116, 0.08);
  border-radius: 0 6px 6px 0;
  font-size: clamp(0.92rem, 1.6vw, 1.05rem);
  line-height: 1.7;
  color: var(--ink);
  max-width: 46em;
}
.slide__thesis-label {
  display: block;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  color: var(--accent);
  margin-bottom: 0.3rem;
}
.slide__bullets {
  list-style: none;
  display: grid;
  gap: 0.55rem;
  margin: 0 0 1.35rem;
  max-width: 48em;
  li {
    position: relative;
    padding: 0.55rem 0.75rem 0.55rem 1.55rem;
    font-size: clamp(0.88rem, 1.5vw, 0.98rem);
    line-height: 1.65;
    color: var(--ink-muted);
    background: rgba(28, 25, 20, 0.55);
    border: 1px solid rgba(196, 165, 116, 0.12);
    border-radius: 4px;
    &::before {
      content: "▸";
      position: absolute;
      left: 0.55rem;
      color: var(--accent);
      font-size: 0.75rem;
      top: 0.7rem;
    }
  }
}
.slide__cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem 1.25rem;
}
.slide__cta {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  padding: 0.65rem 1.1rem;
  color: var(--bg);
  background: var(--accent);
  border-radius: 4px;
  border: 1px solid var(--accent-soft);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: var(--accent-soft);
    transform: translateY(-1px);
  }
}
.slide__hold {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.35rem 0.85rem 0.35rem 0.35rem;
  border: 1px solid rgba(196, 165, 116, 0.4);
  border-radius: 999px;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  background: rgba(12, 11, 9, 0.55);
  touch-action: none;
  user-select: none;
}
.slide__hold-ring {
  width: 1.65rem;
  height: 1.65rem;
  border-radius: 50%;
  background: conic-gradient(var(--accent) calc(var(--p, 0) * 1turn), rgba(196, 165, 116, 0.18) 0);
  display: grid;
  place-items: center;
  i {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background: #0c0b09;
    display: block;
  }
}
.slide__hint {
  font-size: 0.72rem;
  color: var(--ink-dim);
  letter-spacing: 0.04em;
  max-width: 36em;
  line-height: 1.5;
  flex-basis: 100%;
}
@media (prefers-reduced-motion: reduce) {
  .slide {
    min-height: auto;
  }
  .slide__stage {
    position: relative;
    top: auto;
    min-height: auto;
  }
}
</style>
