<script setup lang="ts">
defineProps<{
  src: string
  title: string
  caption?: string
  credit: string
  href?: string
  hrefLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  fullBleed?: boolean
}>()
</script>

<template>
  <figure class="es" :class="{ 'es--bleed': fullBleed }" :aria-label="title">
    <div class="es__frame">
      <img :src="src" :alt="title" loading="lazy" />
      <span class="es__badge">展演静帧 · 教育引用</span>
    </div>
    <figcaption>
      <h4>{{ title }}</h4>
      <p v-if="caption" class="es__cap">{{ caption }}</p>
      <small class="es__credit">{{ credit }}</small>
      <div class="es__links">
        <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer">{{ hrefLabel || "来源" }}</a>
        <a
          v-if="secondaryHref"
          :href="secondaryHref"
          target="_blank"
          rel="noopener noreferrer"
        >{{ secondaryLabel || "相关" }}</a>
      </div>
    </figcaption>
  </figure>
</template>

<style scoped lang="scss">
.es {
  margin: 0;
  display: grid;
  gap: 0.75rem;
  &--bleed {
    .es__frame img {
      max-height: 78vh;
      object-fit: cover;
      width: 100%;
    }
  }
}
.es__frame {
  position: relative;
  border: 1px solid var(--line);
  border-radius: 4px;
  overflow: hidden;
  background: #0a0908;
  img {
    width: 100%;
    max-height: 56vh;
    object-fit: contain;
    display: block;
  }
}
.es__badge {
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(10, 9, 8, 0.72);
  border: 1px solid var(--accent-dim);
  color: var(--accent-soft);
}
figcaption {
  h4 {
    font-size: 1.02rem;
    margin-bottom: 0.35rem;
  }
}
.es__cap {
  color: var(--ink-muted);
  font-size: 0.9rem;
  line-height: 1.7;
  margin-bottom: 0.45rem;
}
.es__credit {
  display: block;
  font-size: 0.68rem;
  color: var(--ink-dim);
  line-height: 1.45;
}
.es__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.55rem;
  font-size: 0.82rem;
}
</style>
