<script setup lang="ts">
import { computed } from "vue"
import { chapters } from "../../content/site"

const props = defineProps<{ activeId: string }>()

/** Nav shows academic stages; hide Support to keep rail readable */
const navItems = computed(() =>
  chapters.filter((c) => c.id !== "act2support"),
)

const activeMeta = computed(() => chapters.find((c) => c.id === props.activeId))

const jump = (id: string) => {
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: "smooth", block: "start" })
}
</script>

<template>
  <nav class="nav" aria-label="学术报告章节">
    <div class="nav__brand">
      <span>解殖民</span>
      <small v-if="activeMeta">{{ activeMeta.stageLabel }} · {{ activeMeta.role }}</small>
    </div>
    <ul class="nav__list">
      <li v-for="c in navItems" :key="c.id">
        <button
          type="button"
          :class="{ active: activeId === c.id }"
          :aria-current="activeId === c.id ? 'true' : undefined"
          :title="c.role"
          @click="jump(c.id)"
        >
          {{ c.label }}
        </button>
      </li>
    </ul>
    <slot />
  </nav>
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: var(--progress-h);
  left: 0;
  right: 0;
  z-index: 55;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  background: linear-gradient(180deg, rgba(12, 11, 9, 0.92), rgba(12, 11, 9, 0.55) 70%, transparent);
  backdrop-filter: blur(6px);
}
.nav__brand {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  span {
    font-family: var(--serif);
    letter-spacing: 0.14em;
    font-size: 0.85rem;
    color: var(--accent-soft);
  }
  small {
    font-size: 0.62rem;
    color: var(--ink-dim);
    letter-spacing: 0.04em;
    max-width: 11rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.nav__list {
  list-style: none;
  display: flex;
  gap: 0.1rem;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  button {
    white-space: nowrap;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
    padding: 0.4rem 0.5rem;
    color: var(--ink-dim);
    border-radius: 4px;
    transition: color 0.2s, background 0.2s;
    &:hover,
    &.active {
      color: var(--accent-soft);
      background: rgba(196, 165, 116, 0.08);
    }
  }
}
@media (max-width: 720px) {
  .nav__brand small {
    display: none;
  }
}
</style>
