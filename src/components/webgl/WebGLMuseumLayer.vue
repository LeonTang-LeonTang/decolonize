<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { useMuseumWebGL, getMuseumApp } from "../../composables/useMuseumWebGL"
import { useScrollProgress } from "../../composables/useScrollProgress"

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { ready, reduced, pushState } = useMuseumWebGL(canvasRef)
const { progress, activeId } = useScrollProgress()
const xrOk = ref(false)
const xrBusy = ref(false)
const museumActive = ref(false)
let pollId = 0

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

  // Sync badge / active flag from MuseumApp — portalT>0.05 = full museum
  pollId = window.setInterval(() => {
    const canvas = canvasRef.value
    const app = getMuseumApp()
    if (!canvas || !app) {
      museumActive.value = false
      return
    }
    const st = app.getState()
    museumActive.value =
      canvas.dataset.museumActive === "1" ||
      (!!st.portal && st.portalT > 0.05)
    xrOk.value = app.xrAvailable
  }, 120)
})

onUnmounted(() => {
  if (pollId) window.clearInterval(pollId)
})

async function onEnterXR() {
  const app = getMuseumApp()
  if (!app || xrBusy.value || !xrOk.value) return
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
    :class="{
      'museum-gl--ready': ready,
      'museum-gl--active': museumActive,
    }"
    aria-hidden="true"
  />
  <!-- Visible proof the 3D museum layer is on -->
  <div
    v-if="!reduced && ready && museumActive"
    class="museum-badge"
    aria-live="polite"
  >
    三维展厅已开启
  </div>
  <!-- WebXR: always show when ready; disabled hint if no headset -->
  <button
    v-if="!reduced && ready"
    type="button"
    class="museum-xr"
    :class="{ 'museum-xr--unavailable': !xrOk }"
    :disabled="xrBusy || !xrOk"
    :title="xrOk ? 'Enter immersive VR gallery' : '本设备无 VR / No immersive-vr on this device'"
    @click="onEnterXR"
  >
    <template v-if="xrBusy">进入 VR…</template>
    <template v-else-if="xrOk">进入 VR 展厅</template>
    <template v-else>本设备无 VR</template>
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
  transition: opacity 0.35s ease;
}
/* Pass5b: full opacity when portal is active — not tiny immersion floats */
.museum-gl--active,
.museum-gl.museum-gl--active {
  opacity: 1 !important;
}
.museum-gl--ready:not(.museum-gl--active) {
  /* ambient floor handled inline by MuseumApp; keep CSS from clamping to 0 */
  opacity: 0.22;
}
.museum-badge {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 40;
  pointer-events: none;
  padding: 0.4rem 0.7rem;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: none;
  color: #0c0b09;
  background: #e8d5a3;
  border: 1px solid rgba(196, 165, 116, 0.85);
  border-radius: 2px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
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
  opacity: 0.7;
  cursor: not-allowed;
}
.museum-xr--unavailable {
  letter-spacing: 0.04em;
  text-transform: none;
  color: rgba(232, 213, 163, 0.65);
  border-color: rgba(196, 165, 116, 0.28);
}
</style>
