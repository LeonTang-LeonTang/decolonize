<script setup lang="ts">
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
import { clipForSection, voById } from "../../content/media"

const chart = nodeE.charts[0]
const borderMaps = nodeE.charts.slice(1)
const clip = clipForSection("act2e")
const borders = voById("e-borders")
const seam = voById("e-seam")
</script>

<template>
  <section :id="nodeE.id" :data-chapter="nodeE.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ nodeE.eyebrow }}</p>
      <h2>{{ nodeE.title }}</h2>
      <VoCaption :text="nodeE.vo" vo-id="e-enter" />
      <ScrollVideo
        v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
      />
      <p class="lead" style="margin: 0 0 1.25rem; max-width: 42em">{{ nodeE.lead }}</p>
      <WorkCard :work="nodeE.work" />
    </div>

    <ChapterHold label="Core E · Sulu Stories" :height-vh="140">
      <img :src="nodeE.embeds[0].src" :alt="nodeE.embeds[0].title" />
      <template #caption>{{ nodeE.vo }}</template>
    </ChapterHold>

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
</style>
