<script setup lang="ts">
import { supportStrip } from "../../content/act2"
</script>

<template>
  <section :id="supportStrip.id" :data-chapter="supportStrip.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ supportStrip.eyebrow }}</p>
      <h2>{{ supportStrip.title }}</h2>
      <p class="lead" style="margin: 1rem 0 1.5rem; max-width: 42em">{{ supportStrip.lead }}</p>
      <div class="grid">
        <article v-for="item in supportStrip.items" :key="item.title">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
}
.grid {
  display: grid;
  gap: 0.85rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  article {
    padding: 1rem 1.1rem;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: var(--bg-card);
    h3 {
      font-size: 0.98rem;
      margin-bottom: 0.4rem;
      color: var(--accent-soft);
    }
    p {
      font-size: 0.88rem;
      color: var(--ink-muted);
      line-height: 1.65;
    }
  }
}
</style>
