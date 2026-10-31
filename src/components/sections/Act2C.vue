<script setup lang="ts">
import { nodeC } from "../../content/act2"
import MapCrossfade from "../ui/MapCrossfade.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import PlaceholderStill from "../ui/PlaceholderStill.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import { clipForSection, voById } from "../../content/media"

const clip = clipForSection("act2c")
const t1832 = voById("c-1832")
const letters = voById("c-letters")
</script>

<template>
  <section :id="nodeC.id" :data-chapter="nodeC.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ nodeC.eyebrow }}</p>
      <h2>{{ nodeC.title }}</h2>
      <VoCaption :text="nodeC.vo" vo-id="c-enter" />
      <ScrollVideo
        v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
      />
      <p class="lead" style="margin: 0 0 1.25rem; max-width: 42em">{{ nodeC.lead }}</p>
      <p class="thesis">{{ nodeC.thesis }}</p>

      <div class="hero-map">
        <img :src="nodeC.maps[0].src" :alt="nodeC.maps[0].label" />
        <figcaption>
          <strong>{{ nodeC.maps[0].label }}</strong>
          <small>{{ nodeC.maps[0].credit }}</small>
        </figcaption>
      </div>

      <div id="c-territory">
        <h3 class="sub">疆域对照</h3>
        <VoCaption v-if="t1832" :text="t1832.zh" vo-id="c-1832" />
        <MapCrossfade :frames="nodeC.maps.slice(1).map((m, i) => ({ ...m, id: String(i) }))" />
      </div>

      <ul class="analysis">
        <li v-for="(a, i) in nodeC.analysis" :key="i">{{ a }}</li>
      </ul>

      <div id="c-film">
        <VoCaption v-if="letters" :text="letters.zh" vo-id="c-letters" />
        <div class="ph-grid">
          <PlaceholderStill v-for="p in nodeC.placeholders" :key="p.title" v-bind="p" />
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
.elsewhere {
  margin-top: 1.75rem;
  padding: 1rem;
  border-left: 2px solid var(--accent);
  color: var(--ink-muted);
  font-size: 0.92rem;
  background: rgba(196, 165, 116, 0.05);
}
</style>
