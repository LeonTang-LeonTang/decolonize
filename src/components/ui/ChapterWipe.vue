<script setup lang="ts">
/**
 * Pass 7 — darker immersive rail-stage transitions (Kristallnacht-adjacent).
 */
import { onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { supportClips } from "../../content/media"
import { playStinger } from "../../composables/useAudio"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  /** Optional label shown during wipe */
  label?: string
  stinger?: number
}>()

const { reduced } = useReducedMotion()
const root = ref<HTMLElement | null>(null)
const veil = ref<HTMLElement | null>(null)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (reduced.value || !root.value || !veil.value) return
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top 88%",
    end: "bottom 35%",
    onEnter: () => {
      if (typeof props.stinger === "number") playStinger(props.stinger)
      gsap.fromTo(
        veil.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.38,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
      )
    },
  })
})

onUnmounted(() => st?.kill())
</script>

<template>
  <div ref="root" class="wipe" aria-hidden="true">
    <div ref="veil" class="wipe__veil">
      <video :src="supportClips.wipe.src" muted playsinline autoplay loop preload="metadata" />
      <div class="wipe__shade" />
      <span v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wipe {
  position: relative;
  height: 16vh;
  min-height: 88px;
  margin: 0;
  pointer-events: none;
  overflow: hidden;
  background: #000;
}
.wipe__veil {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: #000;
  display: grid;
  place-items: center;
  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
    filter: grayscale(0.55) contrast(1.15) brightness(0.55);
  }
  .wipe__shade {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 10%, rgba(0, 0, 0, 0.85) 75%);
  }
  span {
    position: relative;
    z-index: 1;
    font-size: 0.72rem;
    letter-spacing: 0.24em;
    color: var(--accent-soft);
    text-transform: uppercase;
    text-shadow: 0 0 24px rgba(0, 0, 0, 0.9);
  }
}
</style>
