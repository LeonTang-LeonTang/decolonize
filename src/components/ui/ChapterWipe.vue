<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { supportClips } from "../../content/media"

gsap.registerPlugin(ScrollTrigger)

defineProps<{
  /** Optional label shown during wipe */
  label?: string
}>()

const { reduced } = useReducedMotion()
const root = ref<HTMLElement | null>(null)
const veil = ref<HTMLElement | null>(null)
let st: ScrollTrigger | null = null

onMounted(() => {
  if (reduced.value || !root.value || !veil.value) return
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top 85%",
    end: "bottom 40%",
    onEnter: () => {
      gsap.fromTo(
        veil.value,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.inOut" },
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
      <span v-if="label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wipe {
  position: relative;
  height: 12vh;
  min-height: 72px;
  margin: 0;
  pointer-events: none;
  overflow: hidden;
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
    opacity: 0.55;
    filter: grayscale(0.4) contrast(1.1);
  }
  span {
    position: relative;
    z-index: 1;
    font-size: 0.7rem;
    letter-spacing: 0.22em;
    color: var(--accent-soft);
    text-transform: uppercase;
  }
}
</style>
