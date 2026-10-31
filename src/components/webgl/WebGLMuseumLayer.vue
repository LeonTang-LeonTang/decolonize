<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useMuseumWebGL, getMuseumApp } from "../../composables/useMuseumWebGL"
import { useScrollProgress } from "../../composables/useScrollProgress"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { ready, reduced, pushState } = useMuseumWebGL(canvasRef)
const { progress, activeId } = useScrollProgress()
const xrOk = ref(false)
const xrBusy = ref(false)

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

watch(ready, () => {
  xrOk.value = !!getMuseumApp()?.xrAvailable
})

onMounted(() => {
  // Late probe — init may finish after first ready tick
  const id = window.setInterval(() => {
    const app = getMuseumApp()
    if (!app) return
    xrOk.value = app.xrAvailable
    if (app.xrAvailable || ready.value) window.clearInterval(id)
  }, 400)
  window.setTimeout(() => window.clearInterval(id), 8000)
})

async function onEnterXR() {
  const app = getMuseumApp()
  if (!app || xrBusy.value) return
  xrBusy.value = true
  try {
    await app.enterXR()
  } finally {
    xrBusy.value = false
  }
}
</script>

<template>
  <canvas
    v-show="!reduced"
    ref="canvasRef"
    class="museum-gl"
    :class="{ 'museum-gl--ready': ready }"
    aria-hidden="true"
  />
  <!-- WebXR VR enter — only when immersive-vr is supported; pointer-events on this control only -->
  <button
    v-if="!reduced && ready && xrOk"
    type="button"
    class="museum-xr"
    :disabled="xrBusy"
    @click="onEnterXR"
  >
    {{ xrBusy ? "进入 VR…" : "进入 VR 展厅" }}
  </button>
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
.museum-xr {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 40;
  pointer-events: auto;
  padding: 0.45rem 0.75rem;
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-soft, #e8d5a3);
  background: rgba(12, 11, 9, 0.72);
  border: 1px solid rgba(196, 165, 116, 0.45);
  border-radius: 2px;
  cursor: pointer;
}
.museum-xr:disabled {
  opacity: 0.55;
  cursor: wait;
}
</style>
