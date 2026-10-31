<script setup lang="ts">
import { ref } from "vue"
import type { FlipTerm } from "../../content/act1"
import { playVo } from "../../composables/useAudio"

const props = defineProps<{ term: FlipTerm; voId?: string }>()
const flipped = ref(false)

const onFlip = () => {
  flipped.value = !flipped.value
  if (flipped.value && props.voId) playVo(props.voId)
}
</script>

<template>
  <button
    class="flip"
    type="button"
    :class="{ flipped }"
    :aria-pressed="flipped"
    @click="onFlip"
  >
    <div class="flip__inner">
      <div class="flip__face front">
        <span class="flip__hook">{{ term.hook }}</span>
        <h3>{{ term.term }}</h3>
        <p class="en">{{ term.en }}</p>
        <p class="body">{{ term.front }}</p>
        <span class="hint">点击翻转</span>
      </div>
      <div class="flip__face back">
        <h3>{{ term.term }}</h3>
        <p class="body">{{ term.back }}</p>
        <span class="hint">再点返回</span>
      </div>
    </div>
  </button>
</template>

<style scoped lang="scss">
.flip {
  perspective: 1200px;
  width: 100%;
  min-height: 260px;
  text-align: left;
  display: block;
}
.flip__inner {
  position: relative;
  width: 100%;
  min-height: 260px;
  transform-style: preserve-3d;
  transition: transform 0.7s var(--ease);
}
.flipped .flip__inner {
  transform: rotateY(180deg);
}
.flip__face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border: 1px solid var(--line);
  background: linear-gradient(160deg, var(--bg-card), #14110c);
  padding: 1.25rem 1.2rem 1.5rem;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}
.back {
  transform: rotateY(180deg);
  background: linear-gradient(160deg, #1a1610, #241f16);
  border-color: var(--line-strong);
}
.flip__hook {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  color: var(--accent);
  text-transform: uppercase;
}
h3 {
  font-size: 1.25rem;
}
.en {
  font-size: 0.75rem;
  color: var(--ink-dim);
  letter-spacing: 0.06em;
}
.body {
  font-size: 0.9rem;
  color: var(--ink-muted);
  line-height: 1.65;
  flex: 1;
}
.hint {
  font-size: 0.68rem;
  color: var(--ink-dim);
  margin-top: auto;
}
@media (prefers-reduced-motion: reduce) {
  .flip__inner {
    transition: none;
  }
  .flipped .front {
    display: none;
  }
  .flipped .back {
    transform: none;
    position: relative;
  }
}
</style>
