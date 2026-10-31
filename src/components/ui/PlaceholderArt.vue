<script setup lang="ts">
defineProps<{ title: string; href?: string; note?: string }>()
</script>

<template>
  <div class="ph" aria-hidden="false">
    <div class="ph__ambient" />
    <div class="ph__body">
      <p class="ph__label">作品占位 · 非伪造图像</p>
      <h4>{{ title }}</h4>
      <p v-if="note" class="ph__note">{{ note }}</p>
      <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer">访问官方／机构页面 →</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ph {
  position: relative;
  overflow: hidden;
  border: 1px dashed var(--line-strong);
  border-radius: 4px;
  min-height: 200px;
  background: #12100c;
}
.ph__ambient {
  position: absolute;
  inset: -40%;
  background:
    radial-gradient(circle at 20% 30%, rgba(196, 165, 116, 0.18), transparent 40%),
    radial-gradient(circle at 80% 70%, rgba(184, 92, 74, 0.12), transparent 45%),
    conic-gradient(from 120deg at 50% 50%, transparent, rgba(232, 213, 163, 0.06), transparent 40%);
  animation: drift 18s linear infinite;
}
@keyframes drift {
  to {
    transform: rotate(360deg);
  }
}
.ph__body {
  position: relative;
  z-index: 1;
  padding: 1.5rem;
  h4 {
    font-family: var(--serif);
    margin: 0.4rem 0 0.6rem;
  }
}
.ph__label {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  color: var(--accent);
  text-transform: uppercase;
}
.ph__note {
  font-size: 0.85rem;
  color: var(--ink-muted);
  margin-bottom: 0.75rem;
}
@media (prefers-reduced-motion: reduce) {
  .ph__ambient {
    animation: none;
  }
}
</style>
