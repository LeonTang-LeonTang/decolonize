<script setup lang="ts">
import { ref } from "vue"
import { nodeD } from "../../content/act2"
import DigitDecode from "../ui/DigitDecode.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import PlaceholderStill from "../ui/PlaceholderStill.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import { clipForSection, voById } from "../../content/media"

const clip = clipForSection("act2d")
const digits = voById("d-digits")
const correction = voById("d-correction")
const showCorrection = ref(true)
</script>

<template>
  <section :id="nodeD.id" :data-chapter="nodeD.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ nodeD.eyebrow }}</p>
      <h2>{{ nodeD.title }}</h2>
      <VoCaption :text="nodeD.vo" vo-id="d-enter" />
      <ScrollVideo
        v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
      />
      <p class="lead" style="margin: 0 0 1.25rem; max-width: 42em">{{ nodeD.lead }}</p>
      <p class="thesis">{{ nodeD.thesis }}</p>

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

      <ul class="analysis">
        <li v-for="(a, i) in nodeD.analysis" :key="i">{{ a }}</li>
      </ul>

      <PlaceholderStill v-for="p in nodeD.placeholders" :key="p.title" v-bind="p" />

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
.analysis {
  margin: 1.75rem 0;
  padding-left: 1.1rem;
  color: var(--ink-muted);
  li {
    margin-bottom: 0.55rem;
    line-height: 1.7;
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
</style>
