<script setup lang="ts">
import { onMounted, ref } from "vue"

const props = defineProps<{ ready: boolean }>()
const emit = defineEmits<{ enter: [] }>()
const visible = ref(true)
const pct = ref(0)

onMounted(() => {
  const start = performance.now()
  const tick = (t: number) => {
    const p = Math.min(0.92, (t - start) / 1400)
    pct.value = Math.floor(p * 100)
    if (!props.ready && p < 0.92) requestAnimationFrame(tick)
    else pct.value = 100
  }
  requestAnimationFrame(tick)
})

const enter = () => {
  visible.value = false
  emit("enter")
}
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="loader" role="dialog" aria-label="加载">
      <div class="loader__mark" aria-hidden="true">
        <span /><span /><span />
      </div>
      <p class="loader__title">解殖民 · 展示与回收</p>
      <p class="loader__sub">东亚东南亚解殖民艺术互动汇报</p>
      <div class="loader__bar" aria-hidden="true">
        <i :style="{ width: pct + '%' }" />
      </div>
      <button class="loader__btn" type="button" @click="enter">
        {{ pct < 100 ? `准备中 ${pct}%` : "进入叙事 · 开启声场" }}
      </button>
      <p class="loader__hint">默认「阅读模式」：论点／PPT 页先行，展厅为证据层 · 可切「展厅模式」<br />进入即解锁中文 VO · ←/→ 或空格翻页 · 可随时静音</p>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 0.75rem;
  /* Pass 9 loader */ background: radial-gradient(ellipse at 50% 30%, #1a1712 0%, #0c0b09 70%);
  padding: 2rem;
  text-align: center;
}
.loader__mark {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 1rem;
  span {
    width: 10px;
    height: 36px;
    background: var(--accent);
    opacity: 0.35;
    animation: pulse 1.4s var(--ease) infinite;
    &:nth-child(2) {
      opacity: 0.7;
      animation-delay: 0.15s;
      height: 48px;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scaleY(0.7);
    opacity: 0.35;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}
.loader__title {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 4vw, 2rem);
  letter-spacing: 0.08em;
}
.loader__sub {
  color: var(--ink-muted);
  font-size: 0.9rem;
}
.loader__bar {
  width: min(240px, 60vw);
  height: 2px;
  background: var(--line);
  margin: 0.5rem 0 1rem;
  i {
    display: block;
    height: 100%;
    background: var(--accent);
    transition: width 0.2s linear;
  }
}
.loader__btn {
  border: 1px solid var(--line-strong);
  padding: 0.7rem 1.6rem;
  letter-spacing: 0.12em;
  font-size: 0.8rem;
  color: var(--accent-soft);
  transition: background 0.3s var(--ease), border-color 0.3s;
  &:hover {
    background: var(--bg-card);
    border-color: var(--accent);
  }
}
.loader__hint {
  margin-top: 1rem;
  font-size: 0.72rem;
  color: var(--ink-dim);
}
.fade-leave-active {
  /* Pass 9: longer crossfade so WebGL/article underpaint is visible before cover lifts */
  transition: opacity 1.05s var(--ease);
}
.fade-leave-to {
  opacity: 0;
}
</style>
