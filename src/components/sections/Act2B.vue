<script setup lang="ts">
import { nodeB } from "../../content/act2"
import WorkCard from "../ui/WorkCard.vue"
import MapCrossfade from "../ui/MapCrossfade.vue"
import WordChips from "../ui/WordChips.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import EmbeddedStill from "../ui/EmbeddedStill.vue"
import AnalysisPanel from "../ui/AnalysisPanel.vue"
import SupportTip from "../ui/SupportTip.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import StickyScrubVideo from "../ui/StickyScrubVideo.vue"
import ChapterHold from "../ui/ChapterHold.vue"
import { clipForSection, scrubClips, supportClips, voById } from "../../content/media"

const clip = clipForSection("act2b")
const scrub = scrubClips.b
const naming = voById("b-naming")
const cdosea = voById("b-cdosea")
</script>

<template>
  <section :id="nodeB.id" :data-chapter="nodeB.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ nodeB.eyebrow }}</p>
      <h2>{{ nodeB.title }}</h2>
      <p v-if="nodeB.railCallback" class="rail-callback">{{ nodeB.railCallback }}</p>

      <p class="lead article-prose" style="margin: 0.75rem 0 1rem; max-width: 42em">{{ nodeB.lead }}</p>
      <p class="thesis-block"><span class="thesis-block__label">本证论点</span>{{ nodeB.thesis }}</p>
      <WorkCard :work="nodeB.work" />
      <VoCaption :text="nodeB.vo" vo-id="b-enter" />
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

    <ChapterHold label="Core B · 何子彦作品簇" :height-vh="100">
      <img :src="nodeB.maps[1].src" :alt="nodeB.maps[1].label" />
      <template #caption>{{ nodeB.vo }}</template>
    </ChapterHold>

    <StickyScrubVideo
      :src="scrub.src"
      :poster="scrub.poster"
      :kind="scrub.kind"
      :credit="scrub.credit"
      label="作战区先于名字"
      :height-vh="100"
    />

    <div class="section-inner">
      <h3 class="sub">1941 ↔ 1942 战区图</h3>
      <div id="b-maps">
        <VoCaption v-if="naming" :text="naming.zh" vo-id="b-naming" />
        <ScrollVideo :src="supportClips.bMaps.src" kind="generated-atmosphere" :credit="supportClips.bMaps.credit" />
        <MapCrossfade :frames="nodeB.maps" auto />
      </div>
      <ScrollVideo :src="supportClips.bPhilippines.src" kind="oa-archival" :credit="supportClips.bPhilippines.credit" />
      <p class="note">{{ nodeB.mapNote }}</p>

      <h3 class="sub">命名／帝国图层</h3>
      <MapCrossfade :frames="nodeB.empireMaps.map((m, i) => ({ ...m, id: String(i) }))" />

      <AnalysisPanel :items="nodeB.breakdown" :thesis="nodeB.thesis" />

      <div id="b-chips">
        <h3 class="sub">CDOSEA 词条芯片（自做 UI）</h3>
        <VoCaption v-if="cdosea" :text="cdosea.zh" vo-id="b-cdosea" />
        <p class="hint">点击芯片展开——模拟词典重排，非官方算法界面嵌套。</p>
        <WordChips :cards="nodeB.wordChips" />
      </div>

      <div class="embed-grid">
        <EmbeddedStill v-for="e in nodeB.embeds" :key="e.title" v-bind="e" />
      </div>

      <SupportTip text="半句桥｜爱知 2019「表现的不自由」关展：解殖民展亦可成权力场（详交同学）。" />

      <div class="block">
        <h3>时间线</h3>
        <ScrollTimeline :items="nodeB.timeline" />
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
  font-size: 1.1rem;
}
.note,
.hint {
  margin-top: 0.55rem;
  font-size: 0.78rem;
  color: var(--ink-dim);
}
.embed-grid {
  display: grid;
  gap: 1.25rem;
  margin-top: 2rem;
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
