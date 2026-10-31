<script setup lang="ts">
defineProps<{ muted: boolean }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <button
    class="mute"
    type="button"
    :aria-pressed="!muted"
    :aria-label="muted ? '打开声场（环境声＋中文 VO）' : '静音'"
    @click="$emit('toggle')"
  >
    <span aria-hidden="true">{{ muted ? "🔇" : "🔊" }}</span>
    <span class="mute__label">{{ muted ? "静音" : "声场·VO" }}</span>
  </button>
</template>

<style scoped lang="scss">
.mute {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.72rem;
  color: var(--ink-muted);
  background: rgba(12, 11, 9, 0.55);
  backdrop-filter: blur(8px);
  transition: border-color 0.25s, color 0.25s;
  &:hover {
    border-color: var(--accent);
    color: var(--accent-soft);
  }
}
.mute__label {
  letter-spacing: 0.08em;
}
</style>
