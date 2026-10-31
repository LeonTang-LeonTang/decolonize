<script setup lang="ts">
import { ref } from "vue"

defineProps<{ src: string; alt: string; credit: string }>()

const scale = ref(1)
const ox = ref(50)
const oy = ref(50)

const zoomIn = () => {
  scale.value = Math.min(3, +(scale.value + 0.35).toFixed(2))
}
const zoomOut = () => {
  scale.value = Math.max(1, +(scale.value - 0.35).toFixed(2))
  if (scale.value === 1) {
    ox.value = 50
    oy.value = 50
  }
}
const onMove = (e: MouseEvent) => {
  if (scale.value <= 1) return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  ox.value = ((e.clientX - r.left) / r.width) * 100
  oy.value = ((e.clientY - r.top) / r.height) * 100
}
</script>

<template>
  <div class="pan">
    <div class="pan__stage" @mousemove="onMove">
      <img
        :src="src"
        :alt="alt"
        :style="{
          transform: `scale(${scale})`,
          transformOrigin: `${ox}% ${oy}%`,
        }"
        draggable="false"
      />
    </div>
    <div class="pan__bar">
      <button type="button" @click="zoomOut" aria-label="缩小">−</button>
      <span>{{ Math.round(scale * 100) }}%</span>
      <button type="button" @click="zoomIn" aria-label="放大">+</button>
      <span class="hint">悬停平移 · 适合海图细读</span>
    </div>
    <small>{{ credit }}</small>
  </div>
</template>

<style scoped lang="scss">
.pan__stage {
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: #111;
  cursor: crosshair;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.15s linear;
    will-change: transform;
  }
}
.pan__bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.65rem;
  button {
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--line);
    border-radius: 4px;
    color: var(--accent-soft);
  }
  span {
    font-size: 0.8rem;
    color: var(--ink-muted);
    min-width: 3rem;
  }
  .hint {
    margin-left: auto;
    font-size: 0.72rem;
    color: var(--ink-dim);
  }
}
small {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.68rem;
  color: var(--ink-dim);
  line-height: 1.4;
}
</style>
