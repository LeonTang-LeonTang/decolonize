<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { playVo } from "../../composables/useAudio"

export interface SlideImage {
  id: string
  src: string
  detail?: string
  title: string
  artist: string
  year: string
  caption: string
  credit: string
}

const props = defineProps<{ left: SlideImage; right: SlideImage }>()

const pos = ref(50)
const dragging = ref(false)
const root = ref<HTMLElement | null>(null)
const useDetail = ref(false)
let lastSide: "saleh" | "pieneman" | "mid" | null = null

const leftSrc = ref(props.left.src)
const rightSrc = ref(props.right.src)

watch(pos, (v) => {
  // Prefer detail crops when slider leans strongly to one side
  if (v < 28 && props.left.detail) {
    useDetail.value = true
    leftSrc.value = props.left.detail
  } else if (v > 72 && props.right.detail) {
    useDetail.value = true
    rightSrc.value = props.right.detail
  } else {
    useDetail.value = false
    leftSrc.value = props.left.src
    rightSrc.value = props.right.src
  }

  // VO beats: lean left = Saleh (capture), lean right = Pieneman (surrender)
  if (v < 32) {
    if (lastSide !== "saleh") {
      lastSide = "saleh"
      playVo("a-saleh")
    }
  } else if (v > 68) {
    if (lastSide !== "pieneman") {
      lastSide = "pieneman"
      playVo("a-pieneman")
    }
  } else {
    lastSide = "mid"
  }
})

const setFromEvent = (clientX: number) => {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  pos.value = Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100))
}

const onPointerDown = (e: PointerEvent) => {
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  setFromEvent(e.clientX)
}
const onPointerMove = (e: PointerEvent) => {
  if (!dragging.value) return
  setFromEvent(e.clientX)
}
const onPointerUp = () => {
  dragging.value = false
}

onMounted(() => window.addEventListener("pointerup", onPointerUp))
onUnmounted(() => window.removeEventListener("pointerup", onPointerUp))
</script>

<template>
  <div class="compare" ref="root">
    <div class="compare__frame">
      <figure class="compare__layer base">
        <img :src="rightSrc" :alt="right.title" loading="lazy" />
      </figure>
      <figure class="compare__layer overlay" :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }">
        <img :src="leftSrc" :alt="left.title" loading="lazy" />
      </figure>
      <div
        class="compare__handle"
        role="slider"
        tabindex="0"
        :aria-valuenow="Math.round(pos)"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="对比两幅画：捕获 vs 投降"
        :style="{ left: pos + '%' }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @keydown.left.prevent="pos = Math.max(4, pos - 3)"
        @keydown.right.prevent="pos = Math.min(96, pos + 3)"
      >
        <i />
      </div>
      <span class="compare__tag left">{{ left.artist }} · 捕获</span>
      <span class="compare__tag right">{{ right.artist }} · 投降</span>
      <span v-if="useDetail" class="compare__detail-flag">细节</span>
    </div>
    <div class="compare__meta">
      <div>
        <strong>{{ left.title }}</strong>
        <em>{{ left.year }}</em>
        <p>{{ left.caption }}</p>
        <small>{{ left.credit }}</small>
      </div>
      <div>
        <strong>{{ right.title }}</strong>
        <em>{{ right.year }}</em>
        <p>{{ right.caption }}</p>
        <small>{{ right.credit }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.compare {
  width: 100%;
}
.compare__frame {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border: 1px solid var(--line);
  background: #000;
  border-radius: 4px;
  user-select: none;
  touch-action: none;
}
.compare__layer {
  position: absolute;
  inset: 0;
  margin: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.overlay {
  z-index: 1;
}
.compare__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 28px;
  margin-left: -14px;
  z-index: 3;
  cursor: ew-resize;
  display: grid;
  place-items: center;
  i {
    width: 2px;
    height: 100%;
    background: var(--accent-soft);
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4);
    position: relative;
    &::after {
      content: "⇆";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--bg);
      border: 1px solid var(--accent);
      display: grid;
      place-items: center;
      font-size: 0.75rem;
      color: var(--accent-soft);
    }
  }
}
.compare__tag {
  position: absolute;
  bottom: 0.6rem;
  z-index: 2;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  padding: 0.2rem 0.5rem;
  background: rgba(0, 0, 0, 0.55);
  color: var(--accent-soft);
  &.left {
    left: 0.6rem;
  }
  &.right {
    right: 0.6rem;
  }
}
.compare__detail-flag {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  z-index: 2;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  padding: 0.2rem 0.45rem;
  border: 1px solid var(--accent);
  color: var(--accent-soft);
  background: rgba(0, 0, 0, 0.5);
}
.compare__meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
  strong {
    font-family: var(--serif);
    display: block;
    margin-bottom: 0.2rem;
  }
  em {
    display: block;
    font-style: normal;
    font-size: 0.78rem;
    color: var(--accent);
    margin-bottom: 0.35rem;
  }
  p {
    font-size: 0.85rem;
    color: var(--ink-muted);
  }
  small {
    display: block;
    margin-top: 0.4rem;
    font-size: 0.68rem;
    color: var(--ink-dim);
    line-height: 1.4;
  }
}
@media (max-width: 700px) {
  .compare__meta {
    grid-template-columns: 1fr;
  }
}
</style>
