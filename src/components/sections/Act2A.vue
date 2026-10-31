<script setup lang="ts">
import { nodeA } from "../../content/act2"
import { clipForSection, scrubClips, supportClips, voById } from "../../content/media"
import CompareSlider from "../ui/CompareSlider.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import PlaceholderStill from "../ui/PlaceholderStill.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import StickyScrubVideo from "../ui/StickyScrubVideo.vue"

const left = nodeA.paintings[0]
const right = nodeA.paintings[1]
const timeline = nodeA.timeline
const revolusiNote = nodeA.revolusiNote
const elsewhere = nodeA.elsewhere
const clip = clipForSection("act2a")
const scrub = scrubClips.a
const saleh = voById("a-saleh")
const pieneman = voById("a-pieneman")
const ret = voById("a-return")
const hint = voById("a-slider-hint")
</script>

<template>
  <section :id="nodeA.id" :data-chapter="nodeA.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ nodeA.eyebrow }}</p>
      <h2>{{ nodeA.title }}</h2>
      <VoCaption :text="nodeA.vo" vo-id="a-enter" />
      <ScrollVideo
        v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
      />
      <p class="lead" style="margin: 0 0 1.25rem; max-width: 42em">{{ nodeA.lead }}</p>
      <p class="thesis">{{ nodeA.thesis }}</p>
    </div>

    <StickyScrubVideo
      :src="scrub.src"
      :poster="scrub.poster"
      :kind="scrub.kind"
      :credit="scrub.credit"
      label="捕获 ↔ 投降"
      :height-vh="170"
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
      <PlaceholderStill
        title="Revolusi! 展场静帧"
        :description="revolusiNote"
        href="https://www.rijksmuseum.nl/en/press/revolusi-indonesia-independent"
        href-label="Rijksmuseum press（待核）"
      />
      <p class="elsewhere">{{ elsewhere }}</p>
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
.elsewhere {
  margin-top: 1.75rem;
  padding: 1rem;
  border-left: 2px solid var(--accent);
  color: var(--ink-muted);
  font-size: 0.92rem;
  background: rgba(196, 165, 116, 0.05);
}
</style>
