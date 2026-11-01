<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { claimPortal, releasePortal, releasePortalNow } from "../../composables/portalClaim"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { useViewMode } from "../../composables/useViewMode"
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
const { isReading } = useViewMode()
let st: ScrollTrigger | null = null
let io: IntersectionObserver | null = null
let ioVisible = false

const scale = () => (isReading.value ? 0.94 : 1)

const push = (progress: number) => {
  t.value = progress
  // Floor progress so mid-portal never reports 0 and drops immersion
  const pt = Math.max(0.02, Math.min(1, progress))
  claimPortal(props.portal, pt, scale())
}

/** Progress from element geometry — survives stale ScrollTrigger start/end after mode toggle */
const progressFromGeometry = () => {
  const el = root.value
  if (!el) return 0
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || 1
  // 0 when top hits viewport top; 1 when bottom hits viewport bottom
  const travel = Math.max(1, el.offsetHeight - vh)
  const scrolled = -rect.top
  return Math.min(1, Math.max(0, scrolled / travel))
}

const syncFromView = () => {
  if (!root.value || reduced.value) return
  const rect = root.value.getBoundingClientRect()
  const vh = window.innerHeight || 1
  // Active while any meaningful slice of the portal runway is on screen
  const overlapping = rect.bottom > vh * 0.12 && rect.top < vh * 0.88
  if (overlapping) {
    ioVisible = true
    push(progressFromGeometry())
  } else if (ioVisible) {
    ioVisible = false
    releasePortal(props.portal, 160)
  }
}

onMounted(() => {
  if (reduced.value || !root.value) return

  st = ScrollTrigger.create({
    trigger: root.value,
    // Sticky portal runway: classic pin window (refresh after mode toggles)
    start: "top top",
    end: "bottom bottom",
    scrub: 0.35,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      if (self.isActive) push(self.progress)
    },
    onEnter: (self) => push(Math.max(0.02, self.progress)),
    onEnterBack: (self) => push(Math.max(0.02, self.progress)),
    onLeave: () => {
      // Debounced — sibling portal may claim; IO may still see us
      releasePortal(props.portal, 180)
    },
    onLeaveBack: () => {
      releasePortal(props.portal, 180)
    },
  })

  // Pass 9 backup: IntersectionObserver + geometry progress.
  // Survives Lenis/ST leave races and stale ST after 阅读↔展厅 height change.
  io = new IntersectionObserver(
    () => {
      syncFromView()
    },
    { root: null, threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1], rootMargin: "0px" },
  )
  io.observe(root.value)

  const onScroll = () => {
    if (ioVisible || st?.isActive) syncFromView()
  }
  window.addEventListener("scroll", onScroll, { passive: true })
  ;(root.value as HTMLElement & { __portalOnScroll?: () => void }).__portalOnScroll = onScroll

  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    syncFromView()
    if (st?.isActive) push(st.progress)
  })
})

// Mode toggle changes heightVh → must refresh ST or start/end go stale (Core D bug)
watch(isReading, () => {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    syncFromView()
    if (st?.isActive) push(st.progress)
  })
})

onUnmounted(() => {
  const el = root.value as (HTMLElement & { __portalOnScroll?: () => void }) | null
  if (el?.__portalOnScroll) {
    window.removeEventListener("scroll", el.__portalOnScroll)
    delete el.__portalOnScroll
  }
  io?.disconnect()
  io = null
  st?.kill()
  st = null
  releasePortalNow(props.portal)
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
    :style="{ height: (isReading ? Math.max(120, heightVh * 0.85) : heightVh) + 'vh' }"
    :data-portal="portal"
  >
    <div class="portal__stage">
      <div class="portal__hud">
        <span class="portal__role">{{ isReading ? "展开证据 · 三维展厅（辅）" : "章节传送门 · 展厅模式" }}</span>
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
