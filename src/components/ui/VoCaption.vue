<script setup lang="ts">
import { computed } from "vue"
import { useAudio } from "../../composables/useAudio"

const props = defineProps<{
  text: string
  label?: string
  /** When set, highlights while this VO id is playing */
  voId?: string
}>()

const { activeVoId, muted } = useAudio()
const live = computed(() => !!props.voId && activeVoId.value === props.voId && !muted.value)
</script>

<template>
  <div class="vo" role="note" :data-live="live ? '1' : '0'">
    <span class="vo__label">{{ label || (live ? "VO 播放中" : "VO") }}</span>
    <p>「{{ text }}」</p>
    <span v-if="live" class="vo__pulse" aria-hidden="true" />
  </div>
</template>

<style scoped lang="scss">
.vo {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.65rem 1rem;
  margin: 1rem 0 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  background: rgba(232, 213, 163, 0.06);
  border: 1px solid rgba(232, 213, 163, 0.18);
  transition: border-color 0.35s, background 0.35s;
  &[data-live="1"] {
    border-color: rgba(232, 213, 163, 0.55);
    background: rgba(232, 213, 163, 0.12);
  }
  p {
    font-family: var(--serif);
    font-size: clamp(1rem, 2vw, 1.15rem);
    color: var(--accent-soft);
    line-height: 1.6;
  }
}
.vo__label {
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  color: var(--ink-dim);
  flex-shrink: 0;
}
.vo__pulse {
  position: absolute;
  right: 0.85rem;
  top: 0.85rem;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 0 rgba(196, 165, 116, 0.55);
  animation: pulse 1.6s ease-out infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(196, 165, 116, 0.55);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(196, 165, 116, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(196, 165, 116, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  .vo__pulse {
    animation: none;
  }
}
</style>
