<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"

export interface MapFrame {
  id?: string
  src: string
  label: string
  credit: string
}

const props = defineProps<{
  frames: MapFrame[]
  auto?: boolean
  intervalMs?: number
}>()

const idx = ref(0)
const mix = ref(0)
let timer: number | undefined

const go = (i: number) => {
  idx.value = ((i % props.frames.length) + props.frames.length) % props.frames.length
  mix.value = 0
}

const next = () => go(idx.value + 1)
const prev = () => go(idx.value - 1)

const startAuto = () => {
  stopAuto()
  if (!props.auto || props.frames.length < 2) return
  const ms = props.intervalMs ?? 4200
  timer = window.setInterval(() => {
    mix.value = 1
    window.setTimeout(() => {
      idx.value = (idx.value + 1) % props.frames.length
      mix.value = 0
    }, 900)
  }, ms)
}
const stopAuto = () => {
  if (timer) window.clearInterval(timer)
  timer = undefined
}

watch(() => props.auto, startAuto)
onMounted(startAuto)
onUnmounted(stopAuto)

const current = () => props.frames[idx.value]
const nextFrame = () => props.frames[(idx.value + 1) % props.frames.length]
</script>

<template>
  <div class="xfade" @mouseenter="stopAuto" @mouseleave="startAuto">
    <div class="xfade__stage">
      <img class="base" :src="current().src" :alt="current().label" />
      <img
        v-if="frames.length > 1"
        class="top"
        :src="nextFrame().src"
        :alt="nextFrame().label"
        :style="{ opacity: mix }"
      />
      <div class="xfade__label">{{ current().label }}</div>
    </div>
    <div class="xfade__controls">
      <button type="button" @click="prev" aria-label="上一张">←</button>
      <div class="dots">
        <button
          v-for="(f, i) in frames"
          :key="f.src"
          type="button"
          :class="{ on: i === idx }"
          :aria-label="f.label"
          @click="go(i)"
        />
      </div>
      <button type="button" @click="next" aria-label="下一张">→</button>
    </div>
    <small class="xfade__credit">{{ current().credit }}</small>
  </div>
</template>

<style scoped lang="scss">
.xfade__stage {
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: #000;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: #0a0908;
    transition: opacity 0.9s var(--ease);
  }
  .top {
    z-index: 1;
    pointer-events: none;
  }
}
.xfade__label {
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  z-index: 2;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  padding: 0.25rem 0.55rem;
  background: rgba(0, 0, 0, 0.6);
  color: var(--accent-soft);
}
.xfade__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.85rem;
  button {
    color: var(--accent);
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
  .dots {
    display: flex;
    gap: 0.4rem;
    button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      padding: 0;
      background: var(--ink-dim);
      &.on {
        background: var(--accent);
        box-shadow: 0 0 0 3px rgba(196, 165, 116, 0.2);
      }
    }
  }
}
.xfade__credit {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.68rem;
  color: var(--ink-dim);
  line-height: 1.4;
}
</style>
