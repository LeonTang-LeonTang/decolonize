<script setup lang="ts">
defineProps<{
  items: { year: string; event: string }[]
  horizontal?: boolean
}>()
</script>

<template>
  <ol class="tl" :class="{ horiz: horizontal }">
    <li v-for="(item, i) in items" :key="i">
      <time>{{ item.year }}</time>
      <p>{{ item.event }}</p>
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
.tl.horiz {
  flex-direction: row;
  overflow-x: auto;
  border-left: none;
  border-top: 1px solid var(--line-strong);
  margin-left: 0;
  padding-left: 0;
  padding-top: 1.25rem;
  gap: 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  li {
    flex: 0 0 min(260px, 78vw);
    padding: 0 1.1rem 0.25rem;
    scroll-snap-align: start;
    border-right: 1px solid var(--line);
    &::before {
      left: 1.1rem;
      top: -1.45rem;
    }
  }
}
</style>
