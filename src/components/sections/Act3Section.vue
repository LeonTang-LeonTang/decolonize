<script setup lang="ts">
import {
  act3Intro,
  scholars,
  empireCriticism,
  memoryDebate,
  reflectionTable,
  openQuestions,
} from "../../content/act3"
import { clipForSection, voById } from "../../content/media"
import VoCaption from "../ui/VoCaption.vue"
import ScrollVideo from "../ui/ScrollVideo.vue"

const clip = clipForSection("act3")
const enter = voById("act3-enter")
const scholarsVo = voById("act3-scholars")
const empireVo = voById("act3-empire")
</script>

<template>
  <section id="act3" data-chapter="act3" class="section act3">
    <div class="section-inner">
      <p class="eyebrow">{{ act3Intro.eyebrow }}</p>
      <h2>{{ act3Intro.title }}</h2>
      <VoCaption v-if="enter" :text="enter.zh" vo-id="act3-enter" />
      <ScrollVideo
        v-if="clip"
        :src="clip.src"
        :poster="clip.poster"
        :kind="clip.kind"
        :credit="clip.credit"
      />
      <p class="lead" style="margin: 1rem 0 2rem; max-width: 42em">{{ act3Intro.lead }}</p>

      <div id="act3-scholars">
        <VoCaption v-if="scholarsVo" :text="scholarsVo.zh" vo-id="act3-scholars" />
        <div class="scholars">
          <article v-for="s in scholars" :key="s.name">
            <h3>{{ s.name }} <small>{{ s.en }}</small></h3>
            <p class="work">{{ s.work }}</p>
            <p>{{ s.thesis }}</p>
            <p class="q">{{ s.question }}</p>
          </article>
        </div>
      </div>

      <div id="act3-empire" class="block">
        <h3>《艺术家与帝国》批评链</h3>
        <VoCaption v-if="empireVo" :text="empireVo.zh" vo-id="act3-empire" />
        <div class="empire">
          <article v-for="e in empireCriticism" :key="e.title">
            <h4>{{ e.title }}</h4>
            <p>{{ e.body }}</p>
          </article>
        </div>
      </div>

      <div class="block memory">
        <h3>{{ memoryDebate.title }}</h3>
        <p>{{ memoryDebate.body }}</p>
      </div>

      <div class="block">
        <h3>早期看法 → 晚近反思</h3>
        <div class="table-wrap" role="region" aria-label="反思对照表" tabindex="0">
          <table>
            <thead>
              <tr>
                <th>议题</th>
                <th>早期</th>
                <th>晚近</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in reflectionTable" :key="row.topic">
                <th scope="row">{{ row.topic }}</th>
                <td>{{ row.early }}</td>
                <td>{{ row.later }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="block">
        <h3>开放问题</h3>
        <ol class="open">
          <li v-for="(q, i) in openQuestions" :key="i">{{ q }}</li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.7rem, 3.8vw, 2.4rem);
}
.scholars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  article {
    border: 1px solid var(--line);
    padding: 1.2rem;
    background: var(--bg-card);
    border-radius: 4px;
  }
  h3 {
    font-size: 1.15rem;
    small {
      display: block;
      font-family: var(--sans);
      font-weight: 400;
      font-size: 0.75rem;
      color: var(--ink-dim);
      margin-top: 0.2rem;
    }
  }
  .work {
    font-size: 0.8rem;
    color: var(--accent);
    margin: 0.5rem 0;
  }
  p {
    font-size: 0.88rem;
    color: var(--ink-muted);
  }
  .q {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--line);
    color: var(--accent-soft) !important;
    font-family: var(--serif);
  }
}
.block {
  margin-top: 2.75rem;
  h3 {
    margin-bottom: 1rem;
  }
}
.empire {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.85rem;
  article {
    padding: 1rem;
    background: var(--bg-elevated);
    border: 1px solid var(--line);
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
.memory {
  padding: 1.25rem 1.4rem;
  border: 1px solid var(--line-strong);
  background: linear-gradient(135deg, rgba(184, 92, 74, 0.08), rgba(196, 165, 116, 0.05));
  p {
    color: var(--ink-muted);
    max-width: 48em;
  }
}
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 4px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  th,
  td {
    padding: 0.75rem 0.9rem;
    border-bottom: 1px solid var(--line);
    text-align: left;
    vertical-align: top;
  }
  thead th {
    background: var(--bg-elevated);
    color: var(--accent-soft);
    font-family: var(--serif);
    font-weight: 600;
  }
  tbody th {
    color: var(--ink);
    font-weight: 500;
    white-space: nowrap;
  }
  td {
    color: var(--ink-muted);
  }
  tr:last-child th,
  tr:last-child td {
    border-bottom: none;
  }
}
.open {
  padding-left: 1.2rem;
  color: var(--ink-muted);
  li {
    margin-bottom: 0.65rem;
  }
}
</style>
