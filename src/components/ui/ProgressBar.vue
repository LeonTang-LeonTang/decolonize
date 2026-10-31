<script setup lang="ts">
import { computed } from "vue"
import { chapters } from "../../content/site"

const props = defineProps<{ progress: number; activeId?: string }>()

const stageLabel = computed(() => {
  const c = chapters.find((x) => x.id === props.activeId)
  return c?.label ?? ""
})
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    :aria-valuenow="Math.round(progress * 100)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="stageLabel ? `进度 · ${stageLabel}` : '阅读进度'"
  >
    <i :style="{ transform: `scaleX(${progress})` }" />
    <span v-if="stageLabel" class="progress__stage">{{ stageLabel }}</span>
  </div>
</template>

<style scoped lang="scss">
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--progress-h);
  z-index: 60;
  background: transparent;
  i {
    display: block;
    height: 100%;
    width: 100%;
    transform-origin: left center;
    background: linear-gradient(90deg, var(--accent-dim), var(--accent-soft));
    transition: transform 0.1s linear;
  }
}
.progress__stage {
  position: absolute;
  right: 0.65rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  color: var(--accent-soft);
  pointer-events: none;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
}
</style>
