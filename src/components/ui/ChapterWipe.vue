<script setup lang="ts">
/**
 * Pass 10 — darker Kristallnacht-adjacent Act transitions.
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
    start: "top 90%",
    end: "bottom 30%",
    onEnter: () => {
      if (typeof props.stinger === "number") playStinger(props.stinger)
      gsap.fromTo(
        veil.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.48,
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
      <div class="wipe__label-wrap">
        <span v-if="label" class="wipe__label">{{ label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wipe {
  position: relative;
  height: 22vh;
  min-height: 120px;
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
    opacity: 0.28;
    filter: grayscale(0.72) contrast(1.25) brightness(0.38);
  }
  .wipe__shade {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 8%, rgba(0, 0, 0, 0.92) 72%),
      linear-gradient(180deg, #000 0%, transparent 35%, transparent 65%, #000 100%);
  }
}
.wipe__label-wrap {
  position: relative;
  z-index: 1;
  padding: 0.85rem 1.4rem;
  border: 1px solid rgba(196, 165, 116, 0.28);
  background: rgba(0, 0, 0, 0.55);
}
.wipe__label {
  font-size: clamp(0.72rem, 1.6vw, 0.88rem);
  letter-spacing: 0.28em;
  color: var(--accent-soft);
  text-transform: uppercase;
  text-shadow: 0 0 28px rgba(0, 0, 0, 0.95);
  font-weight: 600;
}
</style>
