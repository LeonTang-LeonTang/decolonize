<script setup lang="ts">
import SlideChapter from "../ui/SlideChapter.vue"
import EvidenceStrip from "../ui/EvidenceStrip.vue"
import { stripForSection } from "../../content/evidencePanels"
import { slideById } from "../../content/slides"
import { nodeF } from "../../content/act2"
import WorkCard from "../ui/WorkCard.vue"
import MapCrossfade from "../ui/MapCrossfade.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import EmbeddedStill from "../ui/EmbeddedStill.vue"
import AnalysisPanel from "../ui/AnalysisPanel.vue"
import SupportTip from "../ui/SupportTip.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import ChapterHold from "../ui/ChapterHold.vue"
import ChapterPortal from "../webgl/ChapterPortal.vue"
import { clipForSection, voById } from "../../content/media"

const evidenceStrip = stripForSection("act2f")
const clip = clipForSection("act2f")
const pan = voById("f-pan")
const portrait = voById("f-portrait")
const empire = voById("f-empire")
const invisible = voById("f-invisible")
</script>

<template>
  <section :id="nodeF.id" :data-chapter="nodeF.id" class="section chapter">
    <SlideChapter :slide="slideById.act2f" />
    <EvidenceStrip v-if="evidenceStrip" :strip="evidenceStrip" />
    <p class="slide-evidence-label">证据层 · Core F 展厅／作品读解</p>
    <div class="section-inner evidence-body">
      <p class="eyebrow">{{ nodeF.eyebrow }}</p>
      <h2 class="sr-only">{{ nodeF.title }}</h2>
      <p v-if="nodeF.railCallback" class="rail-callback">{{ nodeF.railCallback }}</p>

      <p class="lead article-prose" style="margin: 0.75rem 0 1rem; max-width: 42em">{{ nodeF.lead }}</p>
      <p class="thesis-block"><span class="thesis-block__label">本证论点</span>{{ nodeF.thesis }}</p>
      <WorkCard :work="nodeF.work" :contrast="nodeF.workContrast" />
      <VoCaption :text="nodeF.vo" vo-id="f-enter" />
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
      portal="coreF-gallery"
      label="Core F · 帝国展览室"
      hint="滚动进入展室：Tate／纪念装置静帧。收束论证，不替代正文。"
      :height-vh="150"
    >
      <p>{{ nodeF.vo }}</p>
    </ChapterPortal>

    <ChapterHold :exit-stinger="0" exit-vo-id="f-enter" label="Core F · 展览与纪念装置" :height-vh="100">
      <img :src="nodeF.statue.src" :alt="nodeF.statue.alt" />
      <template #caption>{{ nodeF.vo }}</template>
    </ChapterHold>

    <div class="section-inner">
      <figure id="f-statue" class="hero">
        <VoCaption v-if="pan" :text="pan.zh" vo-id="f-pan" />
        <img :src="nodeF.statue.src" :alt="nodeF.statue.alt" />
        <figcaption>
          {{ nodeF.statue.credit }}
          <span>{{ nodeF.statue.note }}</span>
        </figcaption>
      </figure>

      <div id="f-portrait">
        <h3 class="sub">肖像 dissolve</h3>
        <VoCaption v-if="portrait" :text="portrait.zh" vo-id="f-portrait" />
        <MapCrossfade
          :frames="[
            ...nodeF.portraits.map((p, i) => ({ ...p, id: 'p' + i })),
            { id: 'front', src: nodeF.statue.front, label: '河畔正面像', credit: nodeF.statue.frontCredit },
          ]"
          auto
        />
      </div>

      <AnalysisPanel :items="nodeF.breakdown" :thesis="nodeF.thesis" />

      <div id="f-duel">
        <h3 class="sub">标题对决 · Tate vs NGS</h3>
        <VoCaption v-if="empire" :text="empire.zh" vo-id="f-empire" />
        <div class="duel">
          <article v-for="d in nodeF.titleDuel" :key="d.side">
            <p class="side">{{ d.side }}</p>
            <h4>{{ d.title }}</h4>
            <p class="subttl">{{ d.subtitle }}</p>
            <p>{{ d.critique }}</p>
          </article>
        </div>
      </div>

      <aside id="f-invisible" class="invisible">
        <h3>{{ nodeF.invisible2019.title }}</h3>
        <VoCaption v-if="invisible" :text="invisible.zh" vo-id="f-invisible" />
        <p class="invisible__body">{{ nodeF.invisible2019.body }}</p>
      </aside>

      <div class="embed-grid">
        <EmbeddedStill v-for="e in nodeF.embeds" :key="e.title" v-bind="e" />
      </div>

      <SupportTip :text="nodeF.supportTip.text" :href="nodeF.supportTip.href" label="Taring Padi 声明" />

      <div class="block">
        <h3>时间线</h3>
        <ScrollTimeline :items="nodeF.timeline" horizontal />
      </div>
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
    max-height: 75vh;
    object-fit: cover;
    border: 1px solid var(--line);
    border-radius: 4px;
  }
  figcaption {
    margin-top: 0.45rem;
    font-size: 0.68rem;
    color: var(--ink-dim);
    display: grid;
    gap: 0.25rem;
    span {
      color: var(--accent-dim);
    }
  }
}
.sub {
  margin: 2rem 0 0.85rem;
}
.duel {
  display: grid;
  gap: 1rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  article {
    padding: 1.1rem 1.2rem;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: var(--bg-card);
  }
  .side {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    color: var(--accent);
    margin-bottom: 0.45rem;
  }
  h4 {
    font-size: 1.15rem;
  }
  .subttl {
    font-family: var(--serif);
    color: var(--accent-soft);
    margin: 0.35rem 0 0.75rem;
    font-size: 0.95rem;
  }
  p:last-child {
    color: var(--ink-muted);
    font-size: 0.9rem;
    line-height: 1.7;
  }
}
.invisible {
  margin-top: 2rem;
  padding: 1.1rem 1.2rem;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: rgba(196, 165, 116, 0.04);
  h3 {
    margin-bottom: 0.85rem;
    font-size: 1.05rem;
  }
  &__body {
    color: var(--ink-muted);
    font-size: 0.92rem;
    line-height: 1.75;
  }
}
.embed-grid {
  display: grid;
  gap: 1.25rem;
  margin: 1.5rem 0 0;
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
