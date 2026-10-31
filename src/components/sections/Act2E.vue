<script setup lang="ts">
import SlideChapter from "../ui/SlideChapter.vue"
import EvidenceStrip from "../ui/EvidenceStrip.vue"
import { stripForSection } from "../../content/evidencePanels"
import { slideById } from "../../content/slides"
import { nodeE } from "../../content/act2"
import WorkCard from "../ui/WorkCard.vue"
import PanZoomImage from "../ui/PanZoomImage.vue"
import MapCrossfade from "../ui/MapCrossfade.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import EmbeddedStill from "../ui/EmbeddedStill.vue"
import AnalysisPanel from "../ui/AnalysisPanel.vue"
import SupportTip from "../ui/SupportTip.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import ChapterHold from "../ui/ChapterHold.vue"
import { directorForSection } from "../../content/holdBeats"
import ChapterPortal from "../webgl/ChapterPortal.vue"
import { clipForSection, voById } from "../../content/media"

const chart = nodeE.charts[0]
const borderMaps = nodeE.charts.slice(1)
const evidenceStrip = stripForSection("act2e")
const holdDirector = directorForSection("act2e")
const clip = clipForSection("act2e")
const borders = voById("e-borders")
const seam = voById("e-seam")
</script>

<template>
  <section :id="nodeE.id" :data-chapter="nodeE.id" class="section chapter">
    <SlideChapter :slide="slideById.act2e" />
    <EvidenceStrip v-if="evidenceStrip" :strip="evidenceStrip" />
    <p class="slide-evidence-label">证据层 · Core E 展厅／作品读解</p>
    <div class="section-inner evidence-body">
      <p class="eyebrow">{{ nodeE.eyebrow }}</p>
      <h2 class="sr-only">{{ nodeE.title }}</h2>
      <p v-if="nodeE.railCallback" class="rail-callback">{{ nodeE.railCallback }}</p>

      <p class="lead article-prose" style="margin: 0.75rem 0 1rem; max-width: 42em">{{ nodeE.lead }}</p>
      <p class="thesis-block"><span class="thesis-block__label">本证论点</span>{{ nodeE.thesis }}</p>
      <WorkCard :work="nodeE.work" />
      <VoCaption :text="nodeE.vo" vo-id="e-enter" />
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
      portal="coreE-gallery"
      label="Core E · 群岛与苏禄室"
      hint="滚动进入展室：群岛／barangay 与历史地图帧。"
      :height-vh="150"
    >
      <p>{{ nodeE.vo }}</p>
    </ChapterPortal>

    <div class="section-inner">
      <h3 class="sub">Dalrymple 海图 · 平移／缩放</h3>
      <PanZoomImage :src="chart.src" :alt="chart.label" :credit="chart.credit" />

      <div id="e-borders">
        <h3 class="sub">殖民分界 ↔ 苏丹国示意</h3>
        <VoCaption v-if="borders" :text="borders.zh" vo-id="e-borders" />
        <MapCrossfade :frames="borderMaps.map((m, i) => ({ ...m, id: String(i) }))" />
      </div>

      <AnalysisPanel :items="nodeE.breakdown" :thesis="nodeE.thesis" />

      <div id="e-artwork">
        <VoCaption v-if="seam" :text="seam.zh" vo-id="e-seam" />
        <div class="embed-grid">
          <EmbeddedStill v-for="e in nodeE.embeds" :key="e.title" v-bind="e" />
        </div>
      </div>

      <SupportTip :text="nodeE.supportTip.text" />

      <div class="block">
        <h3>时间线</h3>
        <ScrollTimeline :items="nodeE.timeline" horizontal />
      </div>
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
}
.embed-grid {
  display: grid;
  gap: 1.25rem;
  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
}
.block {
  margin-top: 2.25rem;
  h3 {
    margin-bottom: 1rem;
  }
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
