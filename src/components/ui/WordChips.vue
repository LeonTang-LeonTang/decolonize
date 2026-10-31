<script setup lang="ts">
import { ref } from "vue"

export interface Chip {
  key: string
  hint: string
  reveal: string
}

defineProps<{ cards: Chip[] }>()
const open = ref<string | null>(null)
</script>

<template>
  <div class="chips">
    <button
      v-for="c in cards"
      :key="c.key"
      type="button"
      class="chip"
      :class="{ on: open === c.key }"
      @click="open = open === c.key ? null : c.key"
    >
      <strong>{{ c.key }}</strong>
      <span>{{ c.hint }}</span>
    </button>
    <div v-if="open" class="chips__reveal">
      <p>{{ cards.find((x) => x.key === open)?.reveal }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}
.chip {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg-card);
  transition: border-color 0.2s, background 0.2s;
  strong {
    font-family: var(--serif);
    font-size: 0.95rem;
    color: var(--accent-soft);
  }
  span {
    font-size: 0.68rem;
    color: var(--ink-dim);
  }
  &.on,
  &:hover {
    border-color: var(--accent);
    background: rgba(196, 165, 116, 0.1);
  }
}
.chips__reveal {
  flex: 1 1 100%;
  margin-top: 0.35rem;
  padding: 1rem 1.1rem;
  border-left: 2px solid var(--accent);
  background: rgba(196, 165, 116, 0.05);
  color: var(--ink-muted);
  font-size: 0.92rem;
  line-height: 1.75;
}
</style>
