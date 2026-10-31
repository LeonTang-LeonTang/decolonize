<script setup lang="ts">
import { computed } from "vue"
import { slides } from "../../content/slides"

const props = defineProps<{
  activeId: string
  page: number
  total: number
}>()

const emit = defineEmits<{ jump: [id: string] }>()

const label = computed(() => `第 ${props.page} / ${props.total} 页`)

const dots = computed(() =>
  slides.map((s) => ({
    id: s.id,
    page: s.page,
    stage: s.stageLabel,
    on: s.id === props.activeId || s.page === props.page,
  })),
)
</script>

<template>
  <div class="deck" role="navigation" aria-label="幻灯进度">
    <span class="deck__page">{{ label }}</span>
    <ol class="deck__dots">
      <li v-for="d in dots" :key="d.id">
        <button
          type="button"
          :class="{ 'is-on': d.on }"
          :title="`${d.page}. ${d.stage}`"
          :aria-current="d.on ? 'true' : undefined"
          @click="emit('jump', d.id)"
        />
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.deck {
  position: fixed;
  top: calc(var(--progress-h) + var(--nav-h));
  left: 0;
  right: 0;
  z-index: 54;
  height: var(--deck-h, 28px);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0 1rem;
  background: linear-gradient(180deg, rgba(12, 11, 9, 0.75), transparent);
  pointer-events: none;
}
.deck__page {
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--accent-soft);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  white-space: nowrap;
}
.deck__dots {
  list-style: none;
  display: flex;
  gap: 0.35rem;
  flex: 1;
  overflow-x: auto;
  pointer-events: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  button {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(196, 165, 116, 0.28);
    border: 1px solid transparent;
    padding: 0;
    transition: background 0.2s, transform 0.2s;
    &.is-on {
      background: var(--accent);
      transform: scale(1.25);
      border-color: var(--accent-soft);
    }
  }
}
</style>
