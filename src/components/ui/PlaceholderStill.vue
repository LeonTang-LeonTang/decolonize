<script setup lang="ts">
defineProps<{
  title: string
  description: string
  href?: string
  hrefLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
}>()
</script>

<template>
  <aside class="ph" aria-label="待许可媒体框">
    <div class="ph__badge">待许可 · Tier2</div>
    <h4>{{ title }}</h4>
    <p>{{ description }}</p>
    <div class="ph__links">
      <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer">{{ hrefLabel || "机构链接" }}</a>
      <a
        v-if="secondaryHref"
        :href="secondaryHref"
        target="_blank"
        rel="noopener noreferrer"
      >{{ secondaryLabel || "相关链接" }}</a>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.ph {
  position: relative;
  padding: 1.25rem 1.35rem;
  border: 1px dashed var(--line-strong);
  border-radius: 6px;
  background:
    linear-gradient(135deg, rgba(196, 165, 116, 0.07), transparent 55%),
    var(--bg-card);
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 10px,
      rgba(196, 165, 116, 0.03) 10px,
      rgba(196, 165, 116, 0.03) 20px
    );
    pointer-events: none;
  }
  h4 {
    position: relative;
    font-size: 1.05rem;
    margin: 0.55rem 0 0.5rem;
  }
  p {
    position: relative;
    color: var(--ink-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
}
.ph__badge {
  position: relative;
  display: inline-block;
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  color: var(--accent);
  border: 1px solid var(--accent-dim);
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
}
.ph__links {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.85rem;
  font-size: 0.85rem;
}
</style>
