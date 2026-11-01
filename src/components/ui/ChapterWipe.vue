<script setup lang="ts">
/**
 * Pass 11 — data-driven Kristallnacht wipe (cinematicDirector.wipeDirectors).
 * Darker tones, taller bands, configurable flash — still scroll-native, not a CMS.
 */
import { computed, onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "../../composables/useReducedMotion"
import { supportClips } from "../../content/media"
import { playStinger } from "../../composables/useAudio"
import { wipeForTo, type WipeDirector } from "../../content/cinematicDirector"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  /** Optional label shown during wipe */
  label?: string
  stinger?: number
  /** Bridge `to` id — looks up wipeDirectors */
  toId?: string
  /** Optional override when not using toId */
  director?: WipeDirector
}>()

const { reduced } = useReducedMotion()
const root = ref<HTMLElement | null>(null)
const veil = ref<HTMLElement | null>(null)
let st: ScrollTrigger | null = null

const cfg = computed<WipeDirector>(() => {
  if (props.director) return props.director
  if (props.toId) {
    const found = wipeForTo(props.toId)
    if (found) return found
  }
  return {
    toId: props.toId || "generic",
    label: props.label || "",
    heightVh: 26,
    darkness: 0.96,
    videoOpacity: 0.16,
    flashSec: 0.7,
    tone: "void",
    stinger: props.stinger,
  }
})

const displayLabel = computed(() => props.label || cfg.value.label)
const stingerId = computed(() =>
  typeof props.stinger === "number" ? props.stinger : cfg.value.stinger,
)

onMounted(() => {
  if (reduced.value || !root.value || !veil.value) return
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top 90%",
    end: "bottom 30%",
    onEnter: () => {
      if (typeof stingerId.value === "number") playStinger(stingerId.value)
      gsap.fromTo(
        veil.value,
        { opacity: 0 },
        {
          opacity: 1,
          duration: cfg.value.flashSec,
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
  <div
    ref="root"
    class="wipe"
    :class="'wipe--' + cfg.tone"
    :style="{ height: cfg.heightVh + 'vh' }"
    :data-wipe-to="cfg.toId"
    aria-hidden="true"
  >
    <div ref="veil" class="wipe__veil">
      <video
        :src="supportClips.wipe.src"
        muted
        playsinline
        autoplay
        loop
        preload="metadata"
        :style="{ opacity: cfg.videoOpacity }"
      />
      <div
        class="wipe__shade"
        :style="{ opacity: 0.55 + cfg.darkness * 0.45 }"
      />
      <div class="wipe__label-wrap">
        <span v-if="displayLabel" class="wipe__label">{{ displayLabel }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wipe {
  position: relative;
  min-height: 130px;
  margin: 0;
  pointer-events: none;
  overflow: hidden;
  background: #000;
}
.wipe--void {
  background: #000;
}
.wipe--ink {
  background: #020104;
}
.wipe--ember {
  background: #050201;
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
    filter: grayscale(0.78) contrast(1.3) brightness(0.32);
  }
  .wipe__shade {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, transparent 4%, rgba(0, 0, 0, 0.95) 68%),
      linear-gradient(180deg, #000 0%, transparent 32%, transparent 68%, #000 100%);
  }
}
.wipe--ember .wipe__shade {
  background:
    radial-gradient(ellipse at center, rgba(40, 12, 4, 0.2) 0%, rgba(0, 0, 0, 0.96) 70%),
    linear-gradient(180deg, #000 0%, transparent 32%, transparent 68%, #000 100%);
}
.wipe__label-wrap {
  position: relative;
  z-index: 1;
  padding: 0.95rem 1.55rem;
  border: 1px solid rgba(196, 165, 116, 0.32);
  background: rgba(0, 0, 0, 0.72);
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.85);
}
.wipe__label {
  font-size: clamp(0.72rem, 1.6vw, 0.92rem);
  letter-spacing: 0.3em;
  color: var(--accent-soft);
  text-transform: uppercase;
  text-shadow: 0 0 28px rgba(0, 0, 0, 0.95);
  font-weight: 600;
}
</style>
