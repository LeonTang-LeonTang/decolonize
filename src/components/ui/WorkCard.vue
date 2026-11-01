<script setup lang="ts">
export type WorkSpine = {
  title: string
  artist?: string
  medium: string
  venue: string
  year: string
  see: string
}

defineProps<{ work: WorkSpine; contrast?: WorkSpine }>()
</script>

<template>
  <div class="wc" aria-label="作品与展场">
    <p class="wc__kicker">作品与展场</p>
    <div class="wc__grid" :class="{ 'wc__grid--duo': contrast }">
      <article>
        <h3>{{ work.title }}</h3>
        <p v-if="work.artist" class="wc__meta">{{ work.artist }}</p>
        <p class="wc__meta">{{ work.medium }} · {{ work.year }}</p>
        <p class="wc__venue">{{ work.venue }}</p>
        <p class="wc__see"><span>看见什么</span>{{ work.see }}</p>
      </article>
      <article v-if="contrast">
        <h3>{{ contrast.title }}</h3>
        <p v-if="contrast.artist" class="wc__meta">{{ contrast.artist }}</p>
        <p class="wc__meta">{{ contrast.medium }} · {{ contrast.year }}</p>
        <p class="wc__venue">{{ contrast.venue }}</p>
        <p class="wc__see"><span>看见什么</span>{{ contrast.see }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wc {
  margin: 0 0 1.5rem;
  padding: 1.1rem 1.2rem 1.25rem;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(196, 165, 116, 0.1), transparent 50%),
    var(--bg-card);
}
.wc__kicker {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.75rem;
}
.wc__grid {
  display: grid;
  gap: 1.1rem;
  &--duo {
    @media (min-width: 800px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  h3 {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    margin-bottom: 0.35rem;
    color: var(--accent-soft);
  }
}
.wc__meta {
  font-size: 0.82rem;
  color: var(--ink-dim);
  line-height: 1.5;
}
.wc__venue {
  margin-top: 0.35rem;
  font-size: 0.88rem;
  color: var(--ink-muted);
}
.wc__see {
  margin-top: 0.75rem;
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--ink);
  span {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--accent-dim);
    margin-bottom: 0.25rem;
  }
}
</style>
