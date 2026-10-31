<script setup lang="ts">
/**
 * Pass 7 — Boat-style continuous illustrated evidence strip.
 * Vertical scroll scrubs a horizontal panel sequence of REAL pack media.
 * Captions stay argument-tied; article/PPT spine remains above this strip.
 */
import { computed, onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { EvidenceStripDef } from "../../content/evidencePanels"
import { parallaxBySection } from "../../content/holdBeats"
import ParallaxBackdrop from "./ParallaxBackdrop.vue"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { useViewMode } from "../../composables/useViewMode"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{ strip: EvidenceStripDef }>()

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const progress = ref(0)
const activeIdx = ref(0)
const { reduced } = useReducedMotion()
const { isReading } = useViewMode()

const parallaxLayers = computed(() => parallaxBySection[props.strip.sectionId] || [])

const n = computed(() => props.strip.panels.length)
const activePanel = computed(() => props.strip.panels[activeIdx.value])

let st: ScrollTrigger | null = null

onMounted(() => {
  if (reduced.value || !root.value || !track.value) return
  const trackEl = track.value
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.55,
    onUpdate: (self) => {
      progress.value = self.progress
      const maxX = Math.max(0, trackEl.scrollWidth - trackEl.clientWidth)
      trackEl.style.transform = `translate3d(${-maxX * self.progress}px, 0, 0)`
      const idx = Math.min(n.value - 1, Math.floor(self.progress * n.value + 0.001))
      activeIdx.value = idx
    },
  })
})

onUnmounted(() => {
  st?.kill()
})
</script>

<template>
  <!-- Reduced motion: stacked static panels -->
  <section
    v-if="reduced"
    class="estrip estrip--static"
    :data-core="strip.core"
    :aria-label="strip.label"
  >
    <header class="estrip__head">
      <span class="estrip__role">证据长卷 · 减弱动效</span>
      <h3 class="estrip__label">{{ strip.label }}</h3>
      <p class="estrip__thesis">{{ strip.thesis }}</p>
    </header>
    <div class="estrip__stack">
      <figure v-for="(p, i) in strip.panels" :key="i" class="estrip__card">
        <img :src="p.src" :alt="p.alt" loading="lazy" />
        <figcaption>
          <span class="estrip__cap">{{ p.caption }}</span>
          <span v-if="p.credit" class="estrip__credit">{{ p.credit }}</span>
        </figcaption>
      </figure>
    </div>
  </section>

  <section
    v-else
    ref="root"
    class="estrip"
    :data-core="strip.core"
    :data-mode="isReading ? 'reading' : 'museum'"
    :style="{ height: Math.max(220, 70 + n * 55) + 'vh' }"
    :aria-label="strip.label"
  >
    <div class="estrip__stage">
      <ParallaxBackdrop
        v-if="parallaxLayers.length"
        :layers="parallaxLayers"
        :label="'parallax-' + strip.core"
      />
      <header class="estrip__head">
        <span class="estrip__role">Boat 式证据长卷 · 真实包媒体</span>
        <h3 class="estrip__label">{{ strip.label }}</h3>
        <p class="estrip__thesis">{{ strip.thesis }}</p>
        <div class="estrip__meter" aria-hidden="true">
          <i :style="{ width: Math.round(progress * 100) + '%' }" />
        </div>
        <p class="estrip__idx">
          图 {{ activeIdx + 1 }} / {{ n }}
        </p>
      </header>

      <div class="estrip__viewport">
        <div ref="track" class="estrip__track">
          <figure
            v-for="(p, i) in strip.panels"
            :key="i"
            class="estrip__panel"
            :class="{ 'is-active': i === activeIdx }"
          >
            <img :src="p.src" :alt="p.alt" loading="lazy" draggable="false" />
            <figcaption class="estrip__panel-cap">
              <span class="estrip__num">{{ String(i + 1).padStart(2, "0") }}</span>
              <span class="estrip__cap">{{ p.caption }}</span>
              <span v-if="p.credit" class="estrip__credit">{{ p.credit }}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <aside class="estrip__live" aria-live="polite">
        <p v-if="activePanel">{{ activePanel.caption }}</p>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.estrip {
  position: relative;
  margin: 0.5rem 0 2rem;
  z-index: 2;
}
.estrip--static {
  height: auto;
  max-width: 960px;
  margin-inline: auto;
  padding: 1rem 1.25rem 2rem;
}
.estrip__stage {
  position: sticky;
  top: calc(var(--nav-h) + var(--progress-h) + var(--deck-h, 28px));
  height: calc(100vh - var(--nav-h) - var(--progress-h) - var(--deck-h, 28px));
  min-height: 360px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: #080705;
  border-top: 1px solid rgba(196, 165, 116, 0.22);
  border-bottom: 1px solid rgba(196, 165, 116, 0.18);
  overflow: hidden;
  isolation: isolate;
}
.estrip__stage > .parallax {
  z-index: 0;
}
.estrip__head,
.estrip__viewport,
.estrip__live {
  position: relative;
  z-index: 1;
}
.estrip[data-mode="reading"] .estrip__stage {
  background: linear-gradient(180deg, #0c0b09 0%, #080705 100%);
}
.estrip__head {
  padding: 0.75rem 1.25rem 0.5rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: 0.2rem;
  background: linear-gradient(180deg, rgba(8, 7, 5, 0.95), rgba(8, 7, 5, 0.55));
  z-index: 2;
}
.estrip__role {
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-dim);
}
.estrip__label {
  font-family: var(--serif);
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  color: var(--accent-soft);
  font-weight: 600;
}
.estrip__thesis {
  font-size: 0.88rem;
  color: var(--ink-muted);
  max-width: 42em;
  line-height: 1.55;
}
.estrip__meter {
  margin-top: 0.45rem;
  height: 2px;
  background: rgba(196, 165, 116, 0.18);
  border-radius: 1px;
  overflow: hidden;
  i {
    display: block;
    height: 100%;
    background: var(--accent);
  }
}
.estrip__idx {
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--ink-dim);
  font-variant-numeric: tabular-nums;
}
.estrip__viewport {
  position: relative;
  overflow: hidden;
  min-height: 0;
}
.estrip__track {
  display: flex;
  height: 100%;
  will-change: transform;
  gap: 0;
}
.estrip__panel {
  flex: 0 0 min(92vw, 920px);
  height: 100%;
  margin: 0;
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center center;
    background: #050403;
    user-select: none;
  }
}
.estrip__panel-cap {
  display: none; /* live caption below handles focus */
}
.estrip__live {
  padding: 0.75rem 1.25rem 1.1rem;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  background: linear-gradient(0deg, rgba(8, 7, 5, 0.96), rgba(8, 7, 5, 0.72));
  border-top: 1px solid rgba(196, 165, 116, 0.14);
  p {
    font-family: var(--serif);
    font-size: clamp(0.95rem, 2vw, 1.15rem);
    line-height: 1.55;
    color: var(--ink);
    max-width: 44em;
  }
}
.estrip__stack {
  display: grid;
  gap: 1.25rem;
  margin-top: 1rem;
}
.estrip__card {
  margin: 0;
  border: 1px solid rgba(196, 165, 116, 0.16);
  background: #0c0b09;
  img {
    width: 100%;
    max-height: 420px;
    object-fit: contain;
    background: #050403;
  }
  figcaption {
    padding: 0.75rem 1rem 1rem;
    display: grid;
    gap: 0.35rem;
  }
}
.estrip__cap {
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--ink);
}
.estrip__credit {
  font-size: 0.68rem;
  color: var(--ink-dim);
  letter-spacing: 0.04em;
}
.estrip__num {
  color: var(--accent);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
}
@media (prefers-reduced-motion: reduce) {
  .estrip:not(.estrip--static) {
    height: auto !important;
  }
}
</style>
