<script setup lang="ts">
import SlideChapter from "../ui/SlideChapter.vue"
import EvidenceStrip from "../ui/EvidenceStrip.vue"
import { stripForSection } from "../../content/evidencePanels"
import { slideById } from "../../content/slides"
import { ref } from "vue"
import { nodeD } from "../../content/act2"
import WorkCard from "../ui/WorkCard.vue"
import DigitDecode from "../ui/DigitDecode.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import EmbeddedStill from "../ui/EmbeddedStill.vue"
import AnalysisPanel from "../ui/AnalysisPanel.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import ChapterHold from "../ui/ChapterHold.vue"
import ChapterPortal from "../webgl/ChapterPortal.vue"
import { clipForSection, voById } from "../../content/media"

const evidenceStrip = stripForSection("act2d")
const clip = clipForSection("act2d")
const digits = voById("d-digits")
const correction = voById("d-correction")
const showCorrection = ref(true)
</script>

<template>
  <section :id="nodeD.id" :data-chapter="nodeD.id" class="section chapter">
    <SlideChapter :slide="slideById.act2d" />
    <EvidenceStrip v-if="evidenceStrip" :strip="evidenceStrip" />
    <p class="slide-evidence-label">证据层 · Core D 展厅／作品读解</p>
    <div class="section-inner evidence-body">
      <p class="eyebrow">{{ nodeD.eyebrow }}</p>
      <h2 class="sr-only">{{ nodeD.title }}</h2>
      <p v-if="nodeD.railCallback" class="rail-callback">{{ nodeD.railCallback }}</p>

      <p class="lead article-prose" style="margin: 0.75rem 0 1rem; max-width: 42em">{{ nodeD.lead }}</p>
      <p class="thesis-block"><span class="thesis-block__label">本证论点</span>{{ nodeD.thesis }}</p>
      <WorkCard :work="nodeD.work" />
      <VoCaption :text="nodeD.vo" vo-id="d-enter" />
      <div class="media-insert">
        <p class="media-insert__role">证据／辅叙 · 章节影像</p>
        <ScrollVideo
          v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
        />
      </div>

    </div>

    <ChapterPortal
      portal="coreD-gallery"
      label="Core D · 数字与纪念室"
      hint="滚动进入展室：阿林装置静帧。论证仍在正文。"
      :height-vh="150"
    >
      <p>{{ nodeD.vo }}</p>
    </ChapterPortal>

    <ChapterHold :exit-stinger="5" exit-vo-id="d-enter" label="Core D · 246247… 装置母题" :height-vh="100">
      <img :src="nodeD.hero.src" :alt="nodeD.hero.alt" />
      <template #caption>{{ nodeD.vo }}</template>
    </ChapterHold>

    <div class="section-inner">
      <figure class="hero">
        <img :src="nodeD.hero.src" :alt="nodeD.hero.alt" />
        <figcaption>{{ nodeD.hero.credit }}</figcaption>
      </figure>

      <div id="d-digits">
        <VoCaption v-if="digits" :text="digits.zh" vo-id="d-digits" />
        <DigitDecode
          title="标题数字点读 · 246247596248914102516 …"
          :items="nodeD.digits"
          vo-id="d-digits"
        />
      </div>

      <AnalysisPanel :items="nodeD.breakdown" :thesis="nodeD.thesis" />

      <div class="embed-grid">
        <EmbeddedStill v-for="e in nodeD.embeds" :key="e.title" v-bind="e" />
      </div>

      <aside v-if="showCorrection" id="d-correction" class="correction" role="note">
        <header>
          <strong>{{ nodeD.correction.title }}</strong>
          <button type="button" @click="showCorrection = false">收起</button>
        </header>
        <VoCaption v-if="correction" :text="correction.zh" vo-id="d-correction" />
        <p>{{ nodeD.correction.body }}</p>
        <div class="correction__maps">
          <figure>
            <img :src="nodeD.correction.mapSrc" alt="死亡铁路地图（纠错用，非作品主题）" />
            <figcaption>{{ nodeD.correction.mapCredit }}</figcaption>
          </figure>
          <figure>
            <img :src="nodeD.correction.powSrc" alt="泰缅铁路战俘营地图（旁注）" />
            <figcaption>{{ nodeD.correction.powCredit }}</figcaption>
          </figure>
        </div>
        <p class="stamp">非本作品主题 · 短名单误系已校正</p>
      </aside>

      <div class="block">
        <h3>时间线</h3>
        <ScrollTimeline :items="nodeD.timeline" />
      </div>
      <p class="elsewhere">{{ nodeD.elsewhere }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.75rem, 4vw, 2.55rem);
}
.hero {
  margin: 1.25rem 0 2rem;
  img {
    width: 100%;
    max-height: 78vh;
    object-fit: cover;
    object-position: center 30%;
    border: 1px solid var(--line);
    border-radius: 4px;
  }
  figcaption {
    margin-top: 0.45rem;
    font-size: 0.68rem;
    color: var(--ink-dim);
  }
}
.embed-grid {
  display: grid;
  gap: 1.25rem;
  margin: 1.5rem 0;
  @media (min-width: 900px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
}
.correction {
  margin-top: 2rem;
  padding: 1.1rem 1.2rem;
  border: 1px solid rgba(184, 92, 74, 0.45);
  border-radius: 6px;
  background: rgba(184, 92, 74, 0.08);
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.65rem;
    strong {
      color: #e8b4a8;
      font-family: var(--serif);
    }
    button {
      font-size: 0.75rem;
      color: var(--ink-dim);
      text-decoration: underline;
    }
  }
  > p {
    color: var(--ink-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
}
.correction__maps {
  display: grid;
  gap: 1rem;
  margin-top: 1rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  img {
    width: 100%;
    border: 1px solid var(--line);
    border-radius: 4px;
    filter: grayscale(0.2);
  }
  figcaption {
    margin-top: 0.35rem;
    font-size: 0.65rem;
    color: var(--ink-dim);
    line-height: 1.4;
  }
}
.stamp {
  margin-top: 0.85rem !important;
  font-size: 0.72rem !important;
  letter-spacing: 0.12em;
  color: var(--danger) !important;
  text-transform: uppercase;
}
.block {
  margin-top: 2.25rem;
  h3 {
    margin-bottom: 1rem;
  }
}
.elsewhere {
  margin-top: 1.75rem;
  padding: 1rem;
  border-left: 2px solid var(--accent);
  color: var(--ink-muted);
  font-size: 0.92rem;
  background: rgba(196, 165, 116, 0.05);
}

.rail-callback {
  margin: 0.5rem 0 0.25rem;
  max-width: 42em;
  font-size: 0.84rem;
  color: var(--accent-soft);
  line-height: 1.6;
  padding-left: 0.75rem;
  border-left: 2px solid var(--accent-dim);
}
</style>
