<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { useAudio } from "../../composables/useAudio"

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    src: string
    poster?: string
    credit?: string
    kind?: "oa-archival" | "generated-atmosphere"
    /** Total section height in vh (sticky travel = height - 100) */
    heightVh?: number
    label?: string
  }>(),
  { heightVh: 180 },
)

const { reduced } = useReducedMotion()
const { muted, unlocked, activeVoId } = useAudio()
const CLIP_VOL = 0.1
const CLIP_DUCK = 0.025

const root = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const progress = ref(0)
let st: ScrollTrigger | null = null

const syncAudio = () => {
  const el = video.value
  if (!el) return
  const want = unlocked.value && !muted.value
  el.muted = !want
  el.volume = activeVoId.value ? CLIP_DUCK : CLIP_VOL
}

const seekTo = (p: number) => {
  const el = video.value
  if (!el || !el.duration || !Number.isFinite(el.duration)) return
  const t = Math.max(0, Math.min(el.duration - 0.05, p * el.duration))
  if (Math.abs(el.currentTime - t) > 0.04) el.currentTime = t
}

onMounted(() => {
  const el = video.value
  const wrap = root.value
  if (!el || !wrap) return
  el.pause()
  syncAudio()

  const bind = () => {
    st?.kill()
    if (reduced.value) {
      el.currentTime = 0
      el.loop = true
      el.play().catch(() => {})
      return
    }
    st = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        progress.value = self.progress
        seekTo(self.progress)
      },
    })
  }

  if (el.readyState >= 1) bind()
  else el.addEventListener("loadedmetadata", bind, { once: true })
})

watch([muted, unlocked, activeVoId], () => syncAudio())

onUnmounted(() => {
  st?.kill()
})
</script>

<template>
  <div ref="root" class="scrub" :style="{ height: heightVh + 'vh' }">
    <div class="scrub__stage">
      <video
        ref="video"
        :src="src"
        :poster="poster"
        playsinline
        preload="auto"
        disablepictureinpicture
      />
      <div class="scrub__hud">
        <span v-if="label" class="scrub__label">{{ label }}</span>
        <span v-if="kind === 'generated-atmosphere'" class="scrub__badge">generated-atmosphere · scrub</span>
        <span v-else-if="kind === 'oa-archival'" class="scrub__badge scrub__badge--oa">OA archival · scrub</span>
        <div class="scrub__bar" aria-hidden="true">
          <i :style="{ width: progress * 100 + '%' }" />
        </div>
        <p class="scrub__hint">滚动以推进画面</p>
      </div>
    </div>
    <p v-if="credit" class="scrub__credit">{{ credit }}</p>
  </div>
</template>

<style scoped lang="scss">
.scrub {
  position: relative;
  margin: 0 0 2rem;
}
.scrub__stage {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  overflow: hidden;
  background: #000;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
.scrub__hud {
  position: absolute;
  inset: auto 0 0 0;
  padding: 1.25rem 1.5rem 1.75rem;
  background: linear-gradient(transparent, rgba(8, 7, 6, 0.85));
  display: grid;
  gap: 0.45rem;
  pointer-events: none;
}
.scrub__label {
  font-family: var(--serif);
  font-size: clamp(1.1rem, 2.5vw, 1.45rem);
  color: var(--accent-soft);
}
.scrub__badge {
  justify-self: start;
  padding: 0.2rem 0.5rem;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  color: var(--accent-soft);
  background: rgba(12, 11, 9, 0.72);
  border: 1px solid rgba(232, 213, 163, 0.25);
  border-radius: 2px;
}
.scrub__badge--oa {
  color: #b8d4c8;
  border-color: rgba(184, 212, 200, 0.35);
}
.scrub__bar {
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
  max-width: 240px;
  i {
    display: block;
    height: 100%;
    background: var(--accent);
  }
}
.scrub__hint {
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  color: var(--ink-dim);
}
.scrub__credit {
  position: absolute;
  left: 1.25rem;
  bottom: 0.35rem;
  z-index: 2;
  margin: 0;
  font-size: 0.68rem;
  color: var(--ink-dim);
  max-width: 90%;
  line-height: 1.4;
  /* sits under sticky after unpin — also show in hud area via opacity on stage end */
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .scrub__hint {
    display: none;
  }
}
</style>
