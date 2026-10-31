<script setup lang="ts">
import { siteMeta } from "../../content/site"
import { scrubClips } from "../../content/media"
import StickyScrubVideo from "../ui/StickyScrubVideo.vue"
import MuteToggle from "../ui/MuteToggle.vue"
import { useAudio } from "../../composables/useAudio"

const { muted, toggleMute, unlocked } = useAudio()
const scrub = scrubClips.hero
</script>

<template>
  <header id="hero" data-chapter="hero" class="hero section">
    <div class="hero__glow" aria-hidden="true" />
    <div class="section-inner hero__inner">
      <p class="eyebrow">{{ siteMeta.course }} · {{ siteMeta.date }}</p>
      <h1>{{ siteMeta.title }}</h1>
      <p class="hero__sub">{{ siteMeta.subtitle }}</p>
      <p class="lead hero__lead">{{ siteMeta.tagline }}</p>
      <p class="hero__thesis">{{ siteMeta.thesis }}</p>

      <div class="hero__audio" :data-muted="muted ? '1' : '0'">
        <MuteToggle :muted="muted" @toggle="toggleMute" />
        <p>
          <template v-if="muted">点击开启声场 · 中文 VO + 环境层会随滚动播放</template>
          <template v-else>声场已开 · 滚动时自动播 VO · 环境层会在旁白下闪避</template>
          <span v-if="!unlocked" class="hero__unlock">（进入叙事后解锁）</span>
        </p>
      </div>

      <div class="hero__acts">
        <div><span>I</span>概念区分</div>
        <div><span>II</span>东南亚六案 A–F</div>
        <div><span>III</span>学术状况</div>
      </div>
      <p class="hero__scroll">向下滚动 · 粘住画面以推进视频</p>
    </div>

    <StickyScrubVideo
      :src="scrub.src"
      :poster="scrub.poster"
      :kind="scrub.kind"
      :credit="scrub.credit"
      label="零点 · 河畔"
      :height-vh="200"
    />
  </header>
</template>

<style scoped lang="scss">
.hero {
  min-height: 100vh;
  padding-top: calc(var(--nav-h) + var(--progress-h) + 3rem);
  overflow: visible;
}
.hero__glow {
  position: absolute;
  inset: 10% 20% auto;
  height: 40vh;
  background: radial-gradient(ellipse, rgba(196, 165, 116, 0.14), transparent 70%);
  filter: blur(20px);
  pointer-events: none;
}
.hero__inner {
  position: relative;
  max-width: 860px;
  margin-bottom: 2rem;
}
h1 {
  font-size: clamp(2.2rem, 6vw, 3.6rem);
  margin-bottom: 0.75rem;
}
.hero__sub {
  font-size: 1.05rem;
  color: var(--accent-soft);
  margin-bottom: 1.5rem;
}
.hero__lead {
  max-width: 36em;
}
.hero__thesis {
  margin-top: 1.1rem;
  max-width: 40em;
  font-size: 0.92rem;
  color: var(--ink-dim);
  line-height: 1.75;
}
.hero__audio {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem 1.1rem;
  margin-top: 1.5rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  background: rgba(196, 165, 116, 0.06);
  &[data-muted="0"] {
    border-color: rgba(232, 213, 163, 0.45);
    background: rgba(196, 165, 116, 0.1);
  }
  p {
    font-size: 0.82rem;
    color: var(--ink-muted);
    max-width: 36em;
    line-height: 1.55;
  }
}
.hero__unlock {
  color: var(--ink-dim);
}
.hero__acts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
  div {
    border: 1px solid var(--line);
    padding: 0.65rem 1rem;
    font-size: 0.85rem;
    color: var(--ink-muted);
    span {
      color: var(--accent);
      margin-right: 0.55rem;
      font-family: var(--serif);
    }
  }
}
.hero__scroll {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  color: var(--ink-dim);
  animation: bob 2.4s ease-in-out infinite;
}
@keyframes bob {
  0%,
  100% {
    opacity: 0.5;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(4px);
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero__scroll {
    animation: none;
  }
}
</style>
