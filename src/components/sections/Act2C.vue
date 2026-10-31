<script setup lang="ts">
import SlideChapter from "../ui/SlideChapter.vue"
import EvidenceStrip from "../ui/EvidenceStrip.vue"
import { stripForSection } from "../../content/evidencePanels"
import { slideById } from "../../content/slides"
import { nodeC } from "../../content/act2"
import WorkCard from "../ui/WorkCard.vue"
import MapCrossfade from "../ui/MapCrossfade.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import EmbeddedStill from "../ui/EmbeddedStill.vue"
import AnalysisPanel from "../ui/AnalysisPanel.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import ChapterHold from "../ui/ChapterHold.vue"
import { directorForSection } from "../../content/holdBeats"
import ChapterPortal from "../webgl/ChapterPortal.vue"
import { clipForSection, voById } from "../../content/media"

const evidenceStrip = stripForSection("act2c")
const holdDirector = directorForSection("act2c")
const clip = clipForSection("act2c")
const t1832 = voById("c-1832")
const letters = voById("c-letters")
</script>

<template>
  <section :id="nodeC.id" :data-chapter="nodeC.id" class="section chapter">
    <SlideChapter :slide="slideById.act2c" />
    <EvidenceStrip v-if="evidenceStrip" :strip="evidenceStrip" />
    <p class="slide-evidence-label">证据层 · Core C 展厅／作品读解</p>
    <div class="section-inner evidence-body">
      <p class="eyebrow">{{ nodeC.eyebrow }}</p>
      <h2 class="sr-only">{{ nodeC.title }}</h2>
      <p v-if="nodeC.railCallback" class="rail-callback">{{ nodeC.railCallback }}</p>

      <p class="lead article-prose" style="margin: 0.75rem 0 1rem; max-width: 42em">{{ nodeC.lead }}</p>
      <p class="thesis-block"><span class="thesis-block__label">本证论点</span>{{ nodeC.thesis }}</p>
      <WorkCard :work="nodeC.work" :contrast="nodeC.workContrast" />
      <VoCaption :text="nodeC.vo" vo-id="c-enter" />
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
      portal="coreC-gallery"
      label="Core C · 潘杜兰加书信室"
      hint="滚动进入展室：书信与幽灵帧对墙。正文优先。"
      :height-vh="150"
    >
      <p>{{ nodeC.vo }}</p>
    </ChapterPortal>

    <ChapterHold
      v-if="holdDirector"
      :beats="holdDirector.beats"
      :label="holdDirector.label"
      :exit-vo-id="holdDirector.exitVoId"
      :exit-stinger="holdDirector.exitStinger"
      :height-vh="120"
    />

    <div class="section-inner">
      <div class="hero-map">
        <img :src="nodeC.maps[0].src" :alt="nodeC.maps[0].label" />
        <figcaption>
          <strong>{{ nodeC.maps[0].label }}</strong>
          <small>{{ nodeC.maps[0].credit }}</small>
        </figcaption>
      </div>

      <div id="c-territory">
        <h3 class="sub">辅线 · 地图脚手架（潘朗曾在图上）</h3>
        <VoCaption v-if="t1832" :text="t1832.zh" vo-id="c-1832" />
        <MapCrossfade :frames="nodeC.maps.slice(1).map((m, i) => ({ ...m, id: String(i) }))" />
      </div>

      <AnalysisPanel :items="nodeC.breakdown" :thesis="nodeC.thesis" />

      <div id="c-film">
        <VoCaption v-if="letters" :text="letters.zh" vo-id="c-letters" />
        <div class="embed-grid">
          <EmbeddedStill v-for="e in nodeC.embeds" :key="e.title" v-bind="e" />
        </div>
      </div>

      <div class="block">
        <h3>时间线</h3>
        <ScrollTimeline :items="nodeC.timeline" horizontal />
      </div>
      <p class="elsewhere">{{ nodeC.elsewhere }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.75rem, 4vw, 2.55rem);
}
.hero-map {
  margin: 1.5rem 0;
  img {
    width: 100%;
    max-height: 70vh;
    object-fit: contain;
    background: #0a0908;
    border: 1px solid var(--line);
    border-radius: 4px;
  }
  figcaption {
    margin-top: 0.5rem;
    display: grid;
    gap: 0.2rem;
    strong {
      font-size: 0.85rem;
      color: var(--accent-soft);
    }
    small {
      font-size: 0.68rem;
      color: var(--ink-dim);
    }
  }
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
