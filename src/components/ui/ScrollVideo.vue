<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    src: string
    poster?: string
    credit?: string
    kind?: "oa-archival" | "generated-atmosphere"
    /** Play when this fraction of the video enters the viewport */
    playWhen?: number
    loop?: boolean
  }>(),
  { playWhen: 0.35, loop: true },
)

const root = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
let st: ScrollTrigger | null = null

const tryPlay = async () => {
  const el = video.value
  if (!el) return
  try {
    el.muted = true
    await el.play()
  } catch {
    /* autoplay policy — stay paused until user gesture / retry on scroll */
  }
}

const pause = () => {
  video.value?.pause()
}

onMounted(() => {
  if (!root.value || !video.value) return
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top 75%",
    end: "bottom 25%",
    onEnter: () => tryPlay(),
    onEnterBack: () => tryPlay(),
    onLeave: () => pause(),
    onLeaveBack: () => pause(),
  })
})

onUnmounted(() => {
  st?.kill()
})

watch(
  () => props.src,
  () => {
    pause()
    requestAnimationFrame(() => tryPlay())
  },
)
</script>

<template>
  <figure ref="root" class="sv" :data-kind="kind || 'clip'">
    <div class="sv__frame">
      <video
        ref="video"
        :src="src"
        :poster="poster"
        muted
        playsinline
        :loop="loop"
        preload="metadata"
        disablepictureinpicture
      />
      <span v-if="kind === 'generated-atmosphere'" class="sv__badge">generated-atmosphere</span>
      <span v-else-if="kind === 'oa-archival'" class="sv__badge sv__badge--oa">OA archival</span>
    </div>
    <figcaption v-if="credit" class="sv__credit">{{ credit }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
.sv {
  margin: 1.25rem 0 1.75rem;
}
.sv__frame {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid var(--line);
  background: #000;
  aspect-ratio: 16 / 9;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
.sv__badge {
  position: absolute;
  left: 0.65rem;
  bottom: 0.65rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  color: var(--accent-soft);
  background: rgba(12, 11, 9, 0.72);
  border: 1px solid rgba(232, 213, 163, 0.25);
  border-radius: 2px;
  backdrop-filter: blur(6px);
}
.sv__badge--oa {
  color: #b8d4c8;
  border-color: rgba(184, 212, 200, 0.35);
}
.sv__credit {
  margin-top: 0.45rem;
  font-size: 0.72rem;
  color: var(--ink-dim);
  line-height: 1.5;
}
</style>
