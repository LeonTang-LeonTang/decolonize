<script setup lang="ts">
import { computed, ref } from "vue"

export interface DictCard {
  key: string
  hint: string
  reveal: string
}

const props = defineProps<{ cards: DictCard[] }>()

const revealed = ref<Record<string, boolean>>({})
const score = computed(() => Object.values(revealed.value).filter(Boolean).length)

const flip = (key: string) => {
  revealed.value = { ...revealed.value, [key]: !revealed.value[key] }
}
</script>

<template>
  <div class="dict">
    <div class="dict__status">
      已揭开 <strong>{{ score }}</strong> / {{ cards.length }} 个词条
    </div>
    <div class="dict__grid">
      <button
        v-for="c in props.cards"
        :key="c.key"
        type="button"
        class="dict__card"
        :class="{ open: revealed[c.key] }"
        @click="flip(c.key)"
      >
        <span class="key">{{ c.key }}</span>
        <span class="hint">{{ c.hint }}</span>
        <span class="reveal">{{ c.reveal }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dict__status {
  font-size: 0.85rem;
  color: var(--ink-muted);
  margin-bottom: 1rem;
  strong {
    color: var(--accent-soft);
    font-family: var(--serif);
    font-size: 1.1rem;
  }
}
.dict__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}
.dict__card {
  text-align: left;
  border: 1px solid var(--line);
  background: var(--bg-card);
  padding: 1rem;
  border-radius: 4px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: border-color 0.25s, background 0.25s, transform 0.25s var(--ease);
  &:hover {
    border-color: var(--line-strong);
    background: var(--bg-card-hover);
  }
  &.open {
    border-color: var(--accent);
    background: #1f1a12;
  }
  .key {
    font-family: var(--serif);
    font-size: 1.05rem;
    color: var(--accent-soft);
  }
  .hint {
    font-size: 0.75rem;
    color: var(--ink-dim);
  }
  .reveal {
    font-size: 0.85rem;
    color: var(--ink-muted);
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: opacity 0.35s, max-height 0.35s;
  }
  &.open .reveal {
    opacity: 1;
    max-height: 120px;
  }
}
</style>
