<script setup lang="ts">
withDefaults(
  defineProps<{
    heightVh?: number
    label?: string
  }>(),
  { heightVh: 140 },
)
</script>

<template>
  <div class="hold" :style="{ height: heightVh + 'vh' }">
    <div class="hold__stage">
      <div class="hold__media">
        <slot />
      </div>
      <div v-if="label || $slots.caption" class="hold__hud">
        <span v-if="label" class="hold__label">{{ label }}</span>
        <div class="hold__caption">
          <slot name="caption" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hold {
  position: relative;
  margin: 0 0 2rem;
}
.hold__stage {
  position: sticky;
  top: calc(var(--nav-h) + var(--progress-h));
  height: calc(100vh - var(--nav-h) - var(--progress-h));
  overflow: hidden;
  background: #050403;
}
.hold__media {
  position: absolute;
  inset: 0;
  :deep(img),
  :deep(video),
  :deep(figure) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
    border: 0;
    border-radius: 0;
    max-height: none;
  }
  :deep(figcaption) {
    display: none;
  }
}
.hold__hud {
  position: absolute;
  inset: auto 0 0 0;
  padding: 4.5rem 1.25rem 1.35rem;
  background: linear-gradient(transparent, rgba(5, 4, 3, 0.92) 55%);
  display: grid;
  gap: 0.45rem;
}
.hold__label {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.hold__caption {
  max-width: 40em;
  color: var(--ink);
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  line-height: 1.55;
  font-family: var(--serif);
}
</style>
