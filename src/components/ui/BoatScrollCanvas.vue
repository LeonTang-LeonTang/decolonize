<script setup lang="ts">
/**
 * Pass 11 — Vue portal for BoatScrollWorld (raw three.js).
 * Fits behind EvidenceStrip comic track; scroll progress drives camera voyage.
 */
import { onMounted, onUnmounted, ref, watch } from "vue"
import { BoatScrollWorld, type BoatPanelInput } from "../../webgl/BoatScrollWorld"
import { useReducedMotion } from "../../composables/useReducedMotion"

const props = defineProps<{
  panels: BoatPanelInput[]
  progress: number
  label?: string
}>()

const host = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
const { reduced } = useReducedMotion()

let world: BoatScrollWorld | null = null
let ro: ResizeObserver | null = null

onMounted(async () => {
  if (reduced.value || !canvas.value || !host.value) return
  world = new BoatScrollWorld(canvas.value)
  const rect = host.value.getBoundingClientRect()
  world.setSize(rect.width, rect.height)
  await world.init(props.panels)
  if (!world || reduced.value) return
  world.setProgress(props.progress)
  world.start()
  ready.value = true
  ro = new ResizeObserver((entries) => {
    const cr = entries[0]?.contentRect
    if (!cr || !world) return
    world.setSize(cr.width, cr.height)
  })
  ro.observe(host.value)
})

onUnmounted(() => {
  ro?.disconnect()
  world?.dispose()
  world = null
})

watch(
  () => props.progress,
  (p) => world?.setProgress(p),
)
</script>

<template>
  <div
    v-if="!reduced"
    ref="host"
    class="boat-world"
    aria-hidden="true"
    :data-label="label || 'boat-scroll'"
    :data-ready="ready ? '1' : '0'"
  >
    <canvas ref="canvas" class="boat-world__canvas" />
    <div class="boat-world__wash" />
    <div class="boat-world__horizon-line" />
  </div>
</template>

<style scoped lang="scss">
.boat-world {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: linear-gradient(180deg, #0b1016 0%, #070605 48%, #050403 100%);
}
.boat-world__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
.boat-world__wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 50% 42%, transparent 12%, rgba(6, 5, 4, 0.45) 70%, rgba(6, 5, 4, 0.88) 100%),
    linear-gradient(180deg, rgba(6, 5, 4, 0.25), rgba(6, 5, 4, 0.55));
  z-index: 1;
}
.boat-world__horizon-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 46%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(196, 165, 116, 0.18) 20%,
    rgba(196, 165, 116, 0.28) 50%,
    rgba(196, 165, 116, 0.18) 80%,
    transparent
  );
  z-index: 2;
  opacity: 0.65;
  pointer-events: none;
}
</style>
