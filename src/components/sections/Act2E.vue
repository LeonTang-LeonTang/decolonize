<script setup lang="ts">
import { nodeE } from "../../content/act2"
import PanZoomImage from "../ui/PanZoomImage.vue"
import MapCrossfade from "../ui/MapCrossfade.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import PlaceholderStill from "../ui/PlaceholderStill.vue"
import SupportTip from "../ui/SupportTip.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
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
      <p class="thesis">{{ nodeE.thesis }}</p>

      <h3 class="sub">Dalrymple 海图 · 平移／缩放</h3>
      <PanZoomImage :src="chart.src" :alt="chart.label" :credit="chart.credit" />

      <div id="e-borders">
        <h3 class="sub">殖民分界 ↔ 苏丹国示意</h3>
        <VoCaption v-if="borders" :text="borders.zh" vo-id="e-borders" />
        <MapCrossfade :frames="borderMaps.map((m, i) => ({ ...m, id: String(i) }))" />
      </div>

      <ul class="analysis">
        <li v-for="(a, i) in nodeE.analysis" :key="i">{{ a }}</li>
      </ul>

      <div id="e-artwork">
        <VoCaption v-if="seam" :text="seam.zh" vo-id="e-seam" />
        <div class="ph-grid">
          <PlaceholderStill v-for="p in nodeE.placeholders" :key="p.title" v-bind="p" />
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
  font-size: clamp(1.6rem, 3.5vw, 2.3rem);
}
.thesis {
  max-width: 42em;
  margin: 0 0 1.75rem;
  font-size: 0.95rem;
  color: var(--ink-muted);
  border-left: 2px solid var(--accent-dim);
  padding-left: 0.9rem;
}
.sub {
  margin: 2rem 0 0.85rem;
}
.analysis {
  margin: 1.75rem 0;
  padding-left: 1.1rem;
  color: var(--ink-muted);
  li {
    margin-bottom: 0.55rem;
    line-height: 1.7;
  }
}
.ph-grid {
  display: grid;
  gap: 1rem;
  @media (min-width: 800px) {
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
