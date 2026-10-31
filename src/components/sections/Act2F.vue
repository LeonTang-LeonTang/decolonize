<script setup lang="ts">
import { nodeF } from "../../content/act2"
import MapCrossfade from "../ui/MapCrossfade.vue"
import ScrollTimeline from "../ui/ScrollTimeline.vue"
import VoCaption from "../ui/VoCaption.vue"
import SupportTip from "../ui/SupportTip.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"
import { clipForSection, voById } from "../../content/media"

const clip = clipForSection("act2f")
const pan = voById("f-pan")
const portrait = voById("f-portrait")
const empire = voById("f-empire")
const invisible = voById("f-invisible")
</script>

<template>
  <section :id="nodeF.id" :data-chapter="nodeF.id" class="section chapter">
    <div class="section-inner">
      <p class="eyebrow">{{ nodeF.eyebrow }}</p>
      <h2>{{ nodeF.title }}</h2>
      <VoCaption :text="nodeF.vo" vo-id="f-enter" />
      <ScrollVideo
        v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
      />
      <p class="lead" style="margin: 0 0 1.25rem; max-width: 42em">{{ nodeF.lead }}</p>
      <p class="thesis">{{ nodeF.thesis }}</p>

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
        <div class="invisible__row">
          <img :src="nodeF.statue.front" alt="莱佛士像常态视觉（非 2019 涂装新闻照）" />
          <p>{{ nodeF.invisible2019.body }}</p>
        </div>
      </aside>

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
  &__row {
    display: grid;
    gap: 1rem;
    @media (min-width: 800px) {
      grid-template-columns: 200px 1fr;
      align-items: start;
    }
    img {
      width: 100%;
      border: 1px solid var(--line);
      border-radius: 4px;
    }
    p {
      color: var(--ink-muted);
      font-size: 0.92rem;
      line-height: 1.75;
    }
  }
}
.block {
  margin-top: 2.25rem;
  h3 {
    margin-bottom: 1rem;
  }
}
</style>
