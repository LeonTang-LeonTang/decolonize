<script setup lang="ts">
defineProps<{ text: string; href?: string; label?: string }>()
</script>

<template>
  <aside class="tip">
    <span class="tip__mark">Support</span>
    <p>{{ text }}</p>
    <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer">{{ label || "相关声明" }}</a>
  </aside>
</template>

<style scoped lang="scss">
.tip {
  margin-top: 1.5rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--line);
  border-radius: 4px;
  background: rgba(184, 92, 74, 0.06);
  display: grid;
  gap: 0.4rem;
  p {
    color: var(--ink-muted);
    font-size: 0.88rem;
    line-height: 1.65;
  }
  a {
    font-size: 0.82rem;
  }
}
.tip__mark {
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--danger);
}
</style>
