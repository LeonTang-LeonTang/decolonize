<script setup lang="ts">
/**
 * Pass 8/9 — Boat-like parallax depth layers behind EvidenceStrip / chapter media.
 * Uses REAL pack map/paper stills only (no AI fakes). Subtle; never covers thesis.
 * Pass 9: up to 3 layers, stronger scroll drift + micro rotate.
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
    scrub: 0.55,
    onUpdate: (self) => {
      progress.value = self.progress
    },
  })
})

onUnmounted(() => {
  st?.kill()
})

function layerStyle(layer: ParallaxLayerDef, i: number) {
  const p = progress.value - 0.5
  const y = p * 140 * layer.depth
  const x = p * 56 * layer.depth * (i % 2 === 0 ? 1 : -1)
  const rot = p * 2.4 * layer.depth * (i % 2 === 0 ? 1 : -0.7)
  const scale = layer.scale ?? 1.22
  return {
    backgroundImage: `url(${layer.src})`,
    opacity: layer.opacity,
    transform: `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`,
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
    :data-layers="layers.length"
  >
    <div
      v-for="(layer, i) in layers"
      :key="i"
      class="parallax__layer"
      :data-depth="layer.depth"
      :style="layerStyle(layer, i)"
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
  inset: -16%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: saturate(0.58) contrast(0.94) brightness(0.52);
  will-change: transform;
}
.parallax__wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 40%, transparent 18%, rgba(8, 7, 5, 0.5) 68%, rgba(8, 7, 5, 0.9) 100%),
    linear-gradient(180deg, rgba(8, 7, 5, 0.32), rgba(8, 7, 5, 0.74));
}
</style>
