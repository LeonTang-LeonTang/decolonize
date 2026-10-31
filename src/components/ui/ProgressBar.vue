<script setup lang="ts">
defineProps<{ progress: number }>()
</script>

<template>
  <div class="progress" role="progressbar" :aria-valuenow="Math.round(progress * 100)" aria-valuemin="0" aria-valuemax="100">
    <i :style="{ transform: `scaleX(${progress})` }" />
  </div>
</template>

<style scoped lang="scss">
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--progress-h);
  z-index: 60;
  background: transparent;
  i {
    display: block;
    height: 100%;
    width: 100%;
    transform-origin: left center;
    background: linear-gradient(90deg, var(--accent-dim), var(--accent-soft));
    transition: transform 0.1s linear;
  }
}
</style>
