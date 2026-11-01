<script setup lang="ts">
import { ref } from "vue"

export type AnalysisAxis = {
  axis: string
  title: string
  body: string
}

const props = defineProps<{
  items: AnalysisAxis[]
  thesis?: string
}>()

const active = ref(0)
</script>

<template>
  <aside class="ap" aria-label="作品读解">
    <header class="ap__head">
      <p class="eyebrow">作品读解</p>
      <p v-if="thesis" class="ap__thesis">{{ thesis }}</p>
    </header>
    <div class="ap__tabs" role="tablist">
      <button
        v-for="(item, i) in items"
        :key="item.axis"
        type="button"
        role="tab"
        class="ap__tab"
        :class="{ 'is-on': active === i }"
        :aria-selected="active === i"
        @click="active = i"
      >
        {{ item.axis }}
      </button>
    </div>
    <div class="ap__panel" role="tabpanel">
      <h4>{{ items[active]?.title }}</h4>
      <p>{{ items[active]?.body }}</p>
    </div>
    <ol class="ap__rail" aria-hidden="true">
      <li
        v-for="(item, i) in items"
        :key="'r' + item.axis"
        :class="{ 'is-on': active === i }"
        @click="active = i"
      >
        <span>{{ String(i + 1).padStart(2, "0") }}</span>
        {{ item.axis }}
      </li>
    </ol>
  </aside>
</template>

<style scoped lang="scss">
.ap {
  margin: 2rem 0;
  padding: 1.25rem 1.35rem 1.4rem;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background:
    linear-gradient(160deg, rgba(196, 165, 116, 0.08), transparent 42%),
    var(--bg-card);
  position: relative;
  overflow: hidden;
}
.ap__head {
  margin-bottom: 1rem;
}
.ap__thesis {
  margin-top: 0.55rem;
  max-width: 48em;
  color: var(--ink-muted);
  font-size: 0.92rem;
  line-height: 1.75;
  border-left: 2px solid var(--accent);
  padding-left: 0.85rem;
}
.ap__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1rem;
}
.ap__tab {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--line);
  color: var(--ink-dim);
  background: rgba(0, 0, 0, 0.25);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
  &.is-on {
    color: var(--bg);
    background: var(--accent);
    border-color: var(--accent);
  }
}
.ap__panel {
  min-height: 8.5rem;
  h4 {
    font-size: 1.12rem;
    margin-bottom: 0.55rem;
    color: var(--accent-soft);
  }
  p {
    color: var(--ink-muted);
    font-size: 0.94rem;
    line-height: 1.8;
    max-width: 46em;
  }
}
.ap__rail {
  display: none;
  @media (min-width: 1100px) {
    display: grid;
    gap: 0.35rem;
    position: absolute;
    right: 1rem;
    top: 4.5rem;
    width: 9.5rem;
    list-style: none;
    font-size: 0.68rem;
    color: var(--ink-dim);
    li {
      cursor: pointer;
      padding: 0.25rem 0;
      border-bottom: 1px solid transparent;
      span {
        color: var(--accent-dim);
        margin-right: 0.35rem;
        font-variant-numeric: tabular-nums;
      }
      &.is-on {
        color: var(--accent-soft);
        border-bottom-color: var(--accent-dim);
      }
    }
  }
}
@media (min-width: 1100px) {
  .ap {
    padding-right: 11.5rem;
  }
}
</style>
