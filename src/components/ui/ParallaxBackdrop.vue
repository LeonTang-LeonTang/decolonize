<script setup lang="ts">
/**
 * Pass 8 — Boat-like parallax depth layers behind EvidenceStrip / chapter media.
 * Uses REAL pack map/paper stills only (no AI fakes). Subtle; never covers thesis.
 */
import { onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { ParallaxLayerDef } from "../../content/holdBeats"
import { useReducedMotion } from "../../composables/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{
  layers: ParallaxLayerDef[]
  label?: string
}>()

const root = ref<HTMLElement | null>(null)
const progress = ref(0)
const { reduced } = useReducedMotion()
let st: ScrollTrigger | null = null

onMounted(() => {
  if (reduced.value || !root.value || !props.layers.length) return
  st = ScrollTrigger.create({
    trigger: root.value,
    start: "top bottom",
    end: "bottom top",
    scrub: 0.4,
    onUpdate: (self) => {
      progress.value = self.progress
    },
  })
})

onUnmounted(() => {
  st?.kill()
})

function layerStyle(layer: ParallaxLayerDef) {
  const y = (progress.value - 0.5) * 100 * layer.depth
  const x = (progress.value - 0.5) * 40 * layer.depth
  const scale = layer.scale ?? 1.2
  return {
    backgroundImage: `url(${layer.src})`,
    opacity: layer.opacity,
    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
  }
}
</script>

<template>
  <div
    v-if="layers?.length && !reduced"
    ref="root"
    class="parallax"
    aria-hidden="true"
    :data-label="label || 'parallax'"
  >
    <div
      v-for="(layer, i) in layers"
      :key="i"
      class="parallax__layer"
      :style="layerStyle(layer)"
    />
    <div class="parallax__wash" />
  </div>
</template>

<style scoped lang="scss">
.parallax {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.parallax__layer {
  position: absolute;
  inset: -12%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: saturate(0.55) contrast(0.92) brightness(0.55);
  will-change: transform;
}
.parallax__wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 40%, transparent 20%, rgba(8, 7, 5, 0.55) 70%, rgba(8, 7, 5, 0.88) 100%),
    linear-gradient(180deg, rgba(8, 7, 5, 0.35), rgba(8, 7, 5, 0.72));
}
</style>
