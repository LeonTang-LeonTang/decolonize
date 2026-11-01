<script setup lang="ts">
import { siteMeta } from "../../content/site"
import { railMap } from "../../content/rail"
import { scrubClips } from "../../content/media"
import StickyScrubVideo from "../ui/StickyScrubVideo.vue"
import MuteToggle from "../ui/MuteToggle.vue"
import SlideChapter from "../ui/SlideChapter.vue"
import { slideById } from "../../content/slides"
import { useAudio } from "../../composables/useAudio"

const { muted, toggleMute, unlocked } = useAudio()
const scrub = scrubClips.hero
const slide = slideById.hero
</script>

<template>
  <header id="hero" data-chapter="hero" class="hero section">
    <div class="hero__glow" aria-hidden="true" />
    <SlideChapter :slide="slide" />

    <div class="section-inner hero__inner evidence-body">
      <p class="slide-evidence-label" style="padding:0;margin:0 0 1rem">证据／辅叙 · 标题页细节</p>
      <p class="eyebrow">{{ siteMeta.course }} · {{ siteMeta.date }}</p>
      <h1>{{ siteMeta.title }}</h1>
      <p class="hero__sub">{{ siteMeta.subtitle }}</p>
      <p class="lead hero__lead">{{ siteMeta.tagline }}</p>

      <div class="hero__audio" :data-muted="muted ? '1' : '0'">
        <MuteToggle :muted="muted" @toggle="toggleMute" />
        <p>
          <template v-if="muted">点击开启声场 · 中文 VO + 环境层会随滚动播放</template>
          <template v-else>声场已开 · 滚动时自动播 VO · 环境层会在旁白下闪避</template>
          <span v-if="!unlocked" class="hero__unlock">（进入叙事后解锁）</span>
        </p>
      </div>

      <div class="hero__rail" aria-label="报告如何读">
        <p class="hero__rail-title">报告如何读 · 逻辑轨</p>
        <ol class="hero__rail-list">
          <li v-for="s in railMap" :key="s.key">
            <span class="hero__rail-roman">{{ s.roman }}</span>
            <div>
              <strong>{{ s.title }}</strong>
              <p>{{ s.body }}</p>
            </div>
          </li>
        </ol>
      </div>

      <p class="hero__article-note">文章优先 · 默认阅读模式：正文与论点先行；影像／三维展厅为证据与沉浸辅叙。</p>
      <p class="hero__scroll">向下滚动或按空格 · 沿报告轨翻页（定义 → 论证 → 例证 → 总结）</p>
    </div>

    <StickyScrubVideo
      :src="scrub.src"
      :poster="scrub.poster"
      :kind="scrub.kind"
      :credit="scrub.credit"
      label="零点 · 河畔"
      :height-vh="130"
    />
  </header>
</template>

<style scoped lang="scss">
.hero {
  min-height: 100vh;
  padding-top: calc(var(--nav-h) + var(--progress-h) + var(--deck-h, 28px));
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
.hero__question {
  margin-top: 1.5rem;
  padding: 1rem 1.15rem;
  border-left: 3px solid var(--accent);
  background: rgba(196, 165, 116, 0.06);
  border-radius: 0 6px 6px 0;
}
.hero__q-label {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: var(--accent);
  margin-bottom: 0.4rem;
}
.hero__q-body {
  font-family: var(--serif);
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--ink);
  line-height: 1.7;
}
.hero__thesis {
  margin-top: 1.1rem;
  max-width: 42em;
  font-size: 0.92rem;
  color: var(--ink-dim);
  line-height: 1.75;
  strong {
    color: var(--accent-soft);
    font-weight: 600;
    margin-right: 0.35rem;
  }
}
.hero__method {
  margin-top: 0.65rem;
  max-width: 42em;
  font-size: 0.85rem;
  color: var(--ink-muted);
  line-height: 1.65;
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
.hero__rail {
  margin-top: 1.75rem;
  padding: 1.15rem 1.2rem 1.25rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--bg-elevated);
}
.hero__rail-title {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: var(--accent-soft);
  margin-bottom: 0.85rem;
}
.hero__rail-list {
  list-style: none;
  display: grid;
  gap: 0.75rem;
  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
  }
  strong {
    display: block;
    font-family: var(--serif);
    color: var(--ink);
    margin-bottom: 0.2rem;
  }
  p {
    font-size: 0.82rem;
    color: var(--ink-muted);
    line-height: 1.55;
  }
}
.hero__rail-roman {
  font-family: var(--serif);
  color: var(--accent);
  font-size: 0.95rem;
  min-width: 1.5rem;
}
.hero__article-note {
  margin-top: 1.25rem;
  font-size: 0.82rem;
  color: var(--ink-muted);
  max-width: 36em;
  line-height: 1.6;
}
.hero__scroll {
  margin-top: 1.25rem;
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
