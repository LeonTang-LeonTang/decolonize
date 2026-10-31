<script setup lang="ts">
defineProps<{
  move: string
  why: string
  wipe?: string
}>()
</script>

<template>
  <aside class="bridge" aria-label="章节衔接">
    <p class="bridge__stage" v-if="wipe">{{ wipe }}</p>
    <p class="bridge__move">{{ move }}</p>
    <p class="bridge__why">{{ why }}</p>
  </aside>
</template>

<style scoped lang="scss">
.bridge {
  position: relative;
  max-width: 40rem;
  margin: 0.25rem auto 0.5rem;
  padding: 1rem 1.25rem 1.15rem;
  border: 1px solid var(--line-strong);
  border-radius: 6px;
  background: linear-gradient(
    135deg,
    rgba(196, 165, 116, 0.1),
    rgba(12, 11, 9, 0.65) 55%,
    rgba(184, 92, 74, 0.06)
  );
  text-align: center;
}
.bridge__stage {
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  color: var(--ink-dim);
  margin-bottom: 0.45rem;
  text-transform: uppercase;
}
.bridge__move {
  font-family: var(--serif);
  font-size: clamp(0.95rem, 2.2vw, 1.15rem);
  color: var(--accent-soft);
  letter-spacing: 0.04em;
  line-height: 1.45;
}
.bridge__why {
  margin-top: 0.55rem;
  font-size: 0.82rem;
  color: var(--ink-muted);
  line-height: 1.65;
  text-align: left;
}
</style>
