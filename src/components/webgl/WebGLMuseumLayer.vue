<script setup lang="ts">
import { ref, watch } from "vue"
import { useMuseumWebGL } from "../../composables/useMuseumWebGL"
import { useScrollProgress } from "../../composables/useScrollProgress"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { ready, reduced, pushState } = useMuseumWebGL(canvasRef)
const { progress, activeId } = useScrollProgress()

watch(
  [progress, activeId],
  () => {
    pushState({
      scrollProgress: progress.value,
      activeChapter: activeId.value,
    })
  },
  { immediate: true },
)
</script>

<template>
  <canvas
    v-show="!reduced"
    ref="canvasRef"
    class="museum-gl"
    :class="{ 'museum-gl--ready': ready }"
    aria-hidden="true"
  />
</template>

<style scoped>
.museum-gl {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
}
</style>
