<script setup lang="ts">
import { useViewMode } from "../../composables/useViewMode"

const { mode, setMode } = useViewMode()
</script>

<template>
  <div class="mode" role="group" aria-label="阅读／展厅模式">
    <button
      type="button"
      :class="{ 'is-on': mode === 'reading' }"
      :aria-pressed="mode === 'reading'"
      title="阅读模式：文章／PPT 优先，展厅压低"
      @click="setMode('reading')"
    >
      阅读模式
    </button>
    <button
      type="button"
      :class="{ 'is-on': mode === 'museum' }"
      :aria-pressed="mode === 'museum'"
      title="展厅模式：沉浸升高，三维辅证更醒目"
      @click="setMode('museum')"
    >
      展厅模式
    </button>
  </div>
</template>

<style scoped lang="scss">
.mode {
  display: inline-flex;
  border: 1px solid var(--line);
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
  button {
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    padding: 0.35rem 0.65rem;
    color: var(--ink-dim);
    background: rgba(0, 0, 0, 0.25);
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
    &.is-on {
      color: var(--bg);
      background: var(--accent);
    }
  }
}
@media (max-width: 720px) {
  .mode button {
    padding: 0.3rem 0.45rem;
    font-size: 0.58rem;
  }
}
</style>
