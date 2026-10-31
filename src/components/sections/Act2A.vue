<script setup lang="ts">
import SlideChapter from "../ui/SlideChapter.vue"
import EvidenceStrip from "../ui/EvidenceStrip.vue"
import { stripForSection } from "../../content/evidencePanels"
import { slideById } from "../../content/slides"
import { nodeA } from "../../content/act2"
import WorkCard from "../ui/WorkCard.vue"
import { clipForSection, scrubClips, supportClips, voById } from "../../content/media"
import CompareSlider from "../ui/CompareSlider.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import EmbeddedStill from "../ui/EmbeddedStill.vue"
import AnalysisPanel from "../ui/AnalysisPanel.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import StickyScrubVideo from "../ui/StickyScrubVideo.vue"
import ChapterHold from "../ui/ChapterHold.vue"
import { directorForSection } from "../../content/holdBeats"
import ChapterPortal from "../webgl/ChapterPortal.vue"

const left = nodeA.paintings[0]
const right = nodeA.paintings[1]
const timeline = nodeA.timeline
const elsewhere = nodeA.elsewhere
const evidenceStrip = stripForSection("act2a")
const holdDirector = directorForSection("act2a")
const clip = clipForSection("act2a")
const scrub = scrubClips.a
const saleh = voById("a-saleh")
const pieneman = voById("a-pieneman")
const ret = voById("a-return")
const hint = voById("a-slider-hint")
</script>

<template>
  <section :id="nodeA.id" :data-chapter="nodeA.id" class="section chapter">
    <SlideChapter :slide="slideById.act2a" />
    <EvidenceStrip v-if="evidenceStrip" :strip="evidenceStrip" />
    <p class="slide-evidence-label">证据层 · Core A 展厅／compare／读解</p>
    <div class="section-inner prose-card evidence-body">
      <p class="eyebrow">{{ nodeA.eyebrow }}</p>
      <h2 class="sr-only">{{ nodeA.title }}</h2>
      <p v-if="nodeA.railCallback" class="rail-callback">{{ nodeA.railCallback }}</p>

      <p class="lead article-prose" style="margin: 0.75rem 0 1rem; max-width: 42em">{{ nodeA.lead }}</p>
      <p class="thesis-block"><span class="thesis-block__label">本证论点</span>{{ nodeA.thesis }}</p>
      <WorkCard :work="nodeA.work" :contrast="nodeA.workContrast" />
      <VoCaption :text="nodeA.vo" vo-id="a-enter" />
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

    <ChapterHold
      v-if="holdDirector"
      :beats="holdDirector.beats"
      :label="holdDirector.label"
      :exit-vo-id="holdDirector.exitVoId"
      :exit-stinger="holdDirector.exitStinger"
      :height-vh="130"
    />

    <p class="immersion-handoff" aria-hidden="true">定格导演 → 三维展厅</p>


    <ChapterPortal
      portal="coreA-gallery"
      label="Core A · 双画对峙室"
      hint="滚动进入展室：萨勒赫与皮内曼对墙而立。标题本身就是观看装置。"
      :height-vh="170"
    >
      <p>{{ nodeA.vo }}</p>
    </ChapterPortal>

    <StickyScrubVideo
      :src="scrub.src"
      :poster="scrub.poster"
      :kind="scrub.kind"
      :credit="scrub.credit"
      label="捕获 ↔ 投降"
      :height-vh="100"
    />

    <div class="section-inner">
      <div id="a-compare">
        <VoCaption v-if="hint" :text="hint.zh" vo-id="a-slider-hint" />
        <CompareSlider :left="left" :right="right" />
        <div class="beat-captions">
          <VoCaption v-if="saleh" :text="saleh.zh" vo-id="a-saleh" label="滑杆·萨勒赫" />
          <VoCaption v-if="pieneman" :text="pieneman.zh" vo-id="a-pieneman" label="滑杆·皮内曼" />
        </div>
      </div>

      <AnalysisPanel :items="nodeA.breakdown" :thesis="nodeA.thesis" />

      <h3 class="sub">荷属东印度档案片段（OA）</h3>
      <div class="clip-row">
        <ScrollVideo :src="supportClips.aBatavia.src" kind="oa-archival" :credit="supportClips.aBatavia.credit" />
        <ScrollVideo :src="supportClips.aPriok.src" kind="oa-archival" :credit="supportClips.aPriok.credit" />
      </div>
      <div id="a-timeline" class="block">
        <h3>归还与用词时间线</h3>
        <VoCaption v-if="ret" :text="ret.zh" vo-id="a-return" />
        <ScrollTimeline :items="timeline" :horizontal="true" />
      </div>
      <p class="note">{{ nodeA.revolusiNote }}</p>
      <div class="embed-grid">
        <EmbeddedStill v-for="e in nodeA.embeds" :key="e.title" v-bind="e" />
      </div>
      <p class="elsewhere">{{ elsewhere }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.immersion-handoff {
  max-width: 920px;
  margin: 0.25rem auto 0.15rem;
  padding: 0 1.25rem;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-dim);
  opacity: 0.75;
}

h2 {
  font-size: clamp(1.75rem, 4vw, 2.55rem);
}
.sub {
  margin: 2rem 0 0.85rem;
  font-size: 1.05rem;
}
.clip-row {
  display: grid;
  gap: 1rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
}
.beat-captions {
  display: grid;
  gap: 0.5rem;
  margin-top: 0.75rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
}
.block {
  margin-top: 2.5rem;
  h3 {
    margin-bottom: 1rem;
  }
}
.note {
  margin: 1rem 0;
  font-size: 0.82rem;
  color: var(--ink-dim);
  line-height: 1.65;
}
.embed-grid {
  display: grid;
  gap: 1.25rem;
  margin-top: 1.25rem;
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
