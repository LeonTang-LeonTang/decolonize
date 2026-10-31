<script setup lang="ts">
defineProps<{ items: { date: string; text: string }[] }>()
</script>

<template>
  <ol class="tl">
    <li v-for="(item, i) in items" :key="i">
      <time>{{ item.date }}</time>
      <p>{{ item.text }}</p>
    </li>
  </ol>
</template>

<style scoped lang="scss">
.tl {
  list-style: none;
  border-left: 1px solid var(--line-strong);
  margin-left: 0.5rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  li {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -1.45rem;
      top: 0.35rem;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 3px rgba(196, 165, 116, 0.15);
    }
  }
  time {
    font-family: var(--serif);
    color: var(--accent-soft);
    font-size: 0.9rem;
    letter-spacing: 0.04em;
  }
  p {
    margin-top: 0.25rem;
    color: var(--ink-muted);
    font-size: 0.92rem;
  }
}
</style>
