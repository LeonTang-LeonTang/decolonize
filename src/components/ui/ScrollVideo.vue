<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useAudio } from "../../composables/useAudio"

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    src: string
    poster?: string
    credit?: string
    kind?: "oa-archival" | "generated-atmosphere"
    playWhen?: number
    loop?: boolean
  }>(),
  { playWhen: 0.35, loop: true },
)

const { muted, unlocked, activeVoId } = useAudio()
const root = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
let st: ScrollTrigger | null = null
const CLIP_VOL = 0.18
const CLIP_DUCK = 0.04

const syncAudio = () => {
  const el = video.value
  if (!el) return
  // Soft bed under clip when site sound is on; duck under VO narration
  const wantSound = unlocked.value && !muted.value
  el.muted = !wantSound
  el.volume = activeVoId.value ? CLIP_DUCK : CLIP_VOL
}

const tryPlay = async () => {
  const el = video.value
  if (!el) return
  syncAudio()
  try {
    await el.play()
  } catch {
    /* autoplay policy */
  }
}

const pause = () => {
  video.value?.pause()
}

onMounted(() => {
  if (!root.value || !video.value) return
  syncAudio()
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

watch([muted, unlocked, activeVoId], () => syncAudio())
</script>

<template>
  <figure ref="root" class="sv" :data-kind="kind || 'clip'">
    <div class="sv__frame">
      <video
        ref="video"
        :src="src"
        :poster="poster"
        playsinline
        :loop="loop"
        preload="metadata"
        disablepictureinpicture
      />
      <span class="sv__role">证据／辅叙</span>
      <span v-if="kind === 'generated-atmosphere'" class="sv__badge">generated-atmosphere</span>
      <span v-else-if="kind === 'oa-archival'" class="sv__badge sv__badge--oa">OA archival</span>
    </div>
    <figcaption v-if="credit">{{ credit }}</figcaption>
  </figure>
</template>

<style scoped lang="scss">
.sv {
  margin: 1.25rem 0 1.75rem;
}
.sv__frame {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  background: #050403;
  video {
    width: 100%;
    display: block;
    max-height: 48vh;
    object-fit: cover;
  }
}
.sv__role {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
  background: rgba(5, 4, 3, 0.75);
  color: var(--accent-soft);
  border: 1px solid var(--line);
  z-index: 1;
}
.sv__badge {
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  padding: 0.18rem 0.45rem;
  border-radius: 999px;
  background: rgba(5, 4, 3, 0.7);
  border: 1px solid var(--line);
  color: var(--ink-dim);
  &--oa {
    color: var(--accent-soft);
    border-color: var(--accent-dim);
  }
}
figcaption {
  margin-top: 0.4rem;
  font-size: 0.68rem;
  color: var(--ink-dim);
  line-height: 1.45;
}
</style>
