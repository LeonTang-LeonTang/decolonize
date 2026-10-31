<script setup lang="ts">
import { computed } from "vue"
import { slideForChapter } from "../../content/slides"
import { useViewMode } from "../../composables/useViewMode"

const props = defineProps<{
  activeId: string
  museumActive?: boolean
}>()

const { isReading } = useViewMode()

const text = computed(() => {
  const s = slideForChapter(props.activeId)
  return s?.thesisStrip ?? ""
})

const visible = computed(() => {
  // Always show strip once past hero so art never orphans the argument
  if (!text.value) return false
  if (props.activeId === "hero" && !props.museumActive) return false
  return true
})
</script>

<template>
  <aside
    v-if="visible"
    class="thesis-strip"
    :class="{
      'thesis-strip--museum': museumActive,
      'thesis-strip--reading': isReading && !museumActive,
    }"
    aria-live="polite"
  >
    <span class="thesis-strip__label">本段论点</span>
    <p class="thesis-strip__body">{{ text }}</p>
  </aside>
</template>

<style scoped lang="scss">
.thesis-strip {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 45;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem 1rem;
  align-items: start;
  padding: 0.55rem 1rem 0.65rem;
  padding-right: 7.5rem; /* clear XR button */
  background: linear-gradient(
    0deg,
    rgba(12, 11, 9, 0.96) 0%,
    rgba(12, 11, 9, 0.88) 70%,
    rgba(12, 11, 9, 0.55) 100%
  );
  border-top: 1px solid rgba(196, 165, 116, 0.35);
  backdrop-filter: blur(8px);
  pointer-events: none;
}
.thesis-strip--museum {
  border-top-color: rgba(232, 213, 163, 0.55);
  background: linear-gradient(
    0deg,
    rgba(12, 11, 9, 0.98) 0%,
    rgba(20, 16, 10, 0.92) 80%,
    rgba(12, 11, 9, 0.5) 100%
  );
}
.thesis-strip__label {
  font-size: 0.58rem;
  letter-spacing: 0.16em;
  color: var(--accent);
  padding-top: 0.15rem;
  white-space: nowrap;
}
.thesis-strip__body {
  font-size: clamp(0.72rem, 1.3vw, 0.85rem);
  line-height: 1.5;
  color: var(--ink);
  max-width: 72em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media (max-width: 720px) {
  .thesis-strip {
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding-right: 1rem;
    padding-bottom: 2.75rem;
  }
}
</style>
