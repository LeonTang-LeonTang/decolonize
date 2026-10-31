<script setup lang="ts">
import { act2Intro } from "../../content/act2"
</script>

<template>
  <section id="act2intro" data-chapter="act2a" class="section">
    <div class="section-inner narrow">
      <p class="eyebrow">{{ act2Intro.eyebrow }}</p>
      <h2>{{ act2Intro.title }}</h2>
      <p class="lead" style="margin-top: 1rem">{{ act2Intro.lead }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.6rem, 3.5vw, 2.3rem);
}
</style>
