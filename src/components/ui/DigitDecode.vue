<script setup lang="ts">
import { ref } from "vue"
import { playVo } from "../../composables/useAudio"

export interface DigitNote {
  digit: string
  note: string
}

defineProps<{ items: DigitNote[]; title?: string; voId?: string }>()
const active = ref(0)
let voiced = false

const select = (i: number, voId?: string) => {
  active.value = i
  if (!voiced && voId) {
    voiced = true
    playVo(voId)
  }
}
</script>

<template>
  <div class="digits">
    <p v-if="title" class="digits__title">{{ title }}</p>
    <div class="digits__row" role="tablist">
      <button
        v-for="(item, i) in items"
        :key="i"
        type="button"
        role="tab"
        :aria-selected="active === i"
        :class="{ on: active === i }"
        @click="select(i, voId)"
      >
        {{ item.digit }}
      </button>
    </div>
    <div class="digits__panel" role="tabpanel">
      <p>{{ items[active]?.note }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.digits__title {
  font-family: var(--serif);
  color: var(--accent-soft);
  margin-bottom: 0.85rem;
  letter-spacing: 0.04em;
}
.digits__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1rem;
  button {
    min-width: 2.6rem;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--line);
    border-radius: 4px;
    font-family: var(--serif);
    font-size: 1.05rem;
    color: var(--ink-muted);
    background: var(--bg-card);
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    &.on,
    &:hover {
      color: var(--accent-soft);
      border-color: var(--accent);
      background: rgba(196, 165, 116, 0.08);
    }
  }
}
.digits__panel {
  padding: 1rem 1.1rem;
  border-left: 2px solid var(--accent);
  background: rgba(196, 165, 116, 0.05);
  color: var(--ink-muted);
  font-size: 0.95rem;
  line-height: 1.75;
  min-height: 4.5rem;
}
</style>
