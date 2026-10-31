<script setup lang="ts">
import { act1Intro, flipTerms, powerDevices } from "../../content/act1"
import { clipForSection, voById } from "../../content/media"
import FlipCard from "../ui/FlipCard.vue"
import VoCaption from "../ui/VoCaption.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"

const clip = clipForSection("act1")
const enter = voById("act1-enter")
const devices = voById("act1-devices")

const voFor = (id: string) => {
  const map: Record<string, string> = {
    colonialism: "act1-colonialism",
    coloniality: "act1-coloniality",
    decolonial: "act1-decolonial",
  }
  return map[id]
}
</script>

<template>
  <section id="act1" data-chapter="act1" class="section act1">
    <div class="section-inner">
      <p class="eyebrow">{{ act1Intro.eyebrow }}</p>
      <h2>{{ act1Intro.title }}</h2>
      <p class="lead narrow article-prose" style="margin: 1rem 0 1.25rem">{{ act1Intro.lead }}</p>
      <p class="setup">{{ act1Intro.argumentSetup }}</p>
      <VoCaption v-if="enter" :text="enter.zh" vo-id="act1-enter" />
      <div class="media-insert">
        <p class="media-insert__role">证据／辅叙 · 氛围影像</p>
        <ScrollVideo
          v-if="clip"
          :src="clip.src"
          :poster="clip.poster"
          :kind="clip.kind"
          :credit="clip.credit"
        />
      </div>

      <div class="cards">
        <div
          v-for="t in flipTerms"
          :id="'act1-card-' + t.id"
          :key="t.id"
          class="card-wrap"
        >
          <FlipCard :term="t" :vo-id="voFor(t.id)" />
        </div>
      </div>

      <div id="act1-devices" class="hook">
        <h3>{{ act1Intro.hookTitle }}</h3>
        <VoCaption v-if="devices" :text="devices.zh" vo-id="act1-devices" />
        <p>{{ act1Intro.hookBody }}</p>
        <div class="devices">
          <article v-for="d in powerDevices" :key="d.title">
            <h4>{{ d.title }}</h4>
            <p>{{ d.body }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
}
.setup {
  max-width: 42em;
  margin: 0 0 2.25rem;
  padding: 0.85rem 1rem;
  border: 1px dashed var(--line-strong);
  border-radius: 4px;
  font-size: 0.9rem;
  color: var(--accent-soft);
  line-height: 1.65;
  background: rgba(196, 165, 116, 0.05);
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
.hook {
  margin-top: 3.5rem;
  padding: 2rem 1.5rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(196, 165, 116, 0.04), transparent);
  h3 {
    font-size: 1.35rem;
    margin-bottom: 0.75rem;
  }
  > p {
    color: var(--ink-muted);
    max-width: 42em;
  }
}
.devices {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.75rem;
  article {
    padding: 1rem;
    background: var(--bg-elevated);
    border: 1px solid var(--line);
    border-radius: 4px;
  }
  h4 {
    font-family: var(--serif);
    color: var(--accent-soft);
    margin-bottom: 0.4rem;
  }
  p {
    font-size: 0.88rem;
    color: var(--ink-muted);
  }
}
</style>
