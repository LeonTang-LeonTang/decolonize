<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getMuseumApp } from "../../composables/useMuseumWebGL"
import { useReducedMotion } from "../../composables/useReducedMotion"
import type { PortalId } from "../../webgl/MuseumApp"

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    /** Which 3D room to enter */
    portal: Exclude<PortalId, null>
    heightVh?: number
    label?: string
    hint?: string
  }>(),
  {
    heightVh: 160,
    label: "章节传送门",
    hint: "滚动进入展厅 · Scroll to enter the gallery",
  },
)

const root = ref<HTMLElement | null>(null)
const t = ref(0)
const { reduced } = useReducedMotion()
let st: ScrollTrigger | null = null

onMounted(() => {
  if (reduced.value || !root.value) return
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.45,
    onUpdate: (self) => {
      t.value = self.progress
      getMuseumApp()?.setState({
        portal: props.portal,
        portalT: self.progress,
      })
    },
    onEnter: () => {
      getMuseumApp()?.setState({ portal: props.portal, portalT: 0 })
    },
    onLeave: () => {
      getMuseumApp()?.setState({ portal: null, portalT: 0 })
    },
    onEnterBack: () => {
      getMuseumApp()?.setState({ portal: props.portal, portalT: 1 })
    },
    onLeaveBack: () => {
      getMuseumApp()?.setState({ portal: null, portalT: 0 })
    },
  })
})

onUnmounted(() => {
  st?.kill()
  getMuseumApp()?.setState({ portal: null, portalT: 0 })
})
</script>

<template>
  <!-- Reduced motion: compact static card, no sticky portal -->
  <div v-if="reduced" class="portal portal--static" :data-portal="portal">
    <p class="portal__role">沉浸辅证 · 减弱动效</p>
    <p class="portal__label">{{ label }}</p>
    <p class="portal__hint">三维展厅已关闭；正文与证据图仍可阅读。</p>
    <div class="portal__slot">
      <slot />
    </div>
  </div>

  <div
    v-else
    ref="root"
    class="portal"
    :style="{ height: heightVh + 'vh' }"
    :data-portal="portal"
  >
    <div ref="stage" class="portal__stage">
      <div class="portal__hud">
        <span class="portal__role">章节传送门 · Chapter portal</span>
        <span class="portal__label">{{ label }}</span>
        <p class="portal__hint">{{ hint }}</p>
        <div class="portal__meter" aria-hidden="true">
          <i :style="{ width: Math.round(t * 100) + '%' }" />
        </div>
        <p class="portal__pct">{{ Math.round(t * 100) }}%</p>
      </div>
      <div class="portal__caption">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.portal {
  position: relative;
  margin: 1.5rem 0 2.5rem;
  z-index: 1;
}
.portal--static {
  height: auto;
  padding: 1.25rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--bg-card);
  max-width: 920px;
  margin-inline: auto;
}
.portal__stage {
  position: sticky;
  top: calc(var(--nav-h) + var(--progress-h));
  height: calc(100vh - var(--nav-h) - var(--progress-h));
  min-height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  pointer-events: none;
  /* Pass5b: keep top ~55%+ clear as a WebGL window; darken HUD/caption only */
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 55%,
    rgba(12, 11, 9, 0.25) 68%,
    rgba(12, 11, 9, 0.72) 82%,
    rgba(12, 11, 9, 0.92) 100%
  );
}
.portal__hud {
  padding: 0.85rem 1.25rem 0.5rem;
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: 0.25rem;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(12, 11, 9, 0.4) 35%,
    rgba(12, 11, 9, 0.78) 100%
  );
  border-radius: 4px 4px 0 0;
}
.portal__role {
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--ink-dim);
}
.portal__label {
  font-family: var(--serif);
  font-size: clamp(1.15rem, 2.6vw, 1.65rem);
  color: var(--accent-soft);
}
.portal__hint {
  font-size: 0.85rem;
  color: var(--ink-muted);
  max-width: 36em;
}
.portal__meter {
  margin-top: 0.55rem;
  height: 2px;
  background: rgba(196, 165, 116, 0.2);
  border-radius: 1px;
  overflow: hidden;
  i {
    display: block;
    height: 100%;
    background: var(--accent);
    transition: width 0.05s linear;
  }
}
.portal__pct {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--ink-dim);
}
.portal__caption {
  padding: 0.55rem 1.25rem 1.1rem;
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
  font-family: var(--serif);
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  line-height: 1.5;
  color: var(--ink);
  background: rgba(12, 11, 9, 0.86);
  border-radius: 0 0 4px 4px;
  border: 1px solid rgba(196, 165, 116, 0.14);
  border-top: none;
}
.portal__slot {
  margin-top: 0.75rem;
}
</style>
