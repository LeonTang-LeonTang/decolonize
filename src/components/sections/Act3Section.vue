<script setup lang="ts">
import {
  act3Intro,
  scholars,
  empireCriticism,
  memoryDebate,
  reflectionTable,
  openQuestions,
} from "../../content/act3"
import { jointProof, reportThesis } from "../../content/rail"
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
      <p class="lead article-prose" style="margin: 1rem 0 1.5rem; max-width: 42em">{{ act3Intro.lead }}</p>
      <VoCaption v-if="enter" :text="enter.zh" vo-id="act3-enter" />
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

      <div class="joint" aria-label="六案合证">
        <p class="eyebrow">{{ jointProof.eyebrow }}</p>
        <h3>{{ jointProof.title }}</h3>
        <p class="joint__lead">{{ jointProof.lead }}</p>
        <ul class="joint__points">
          <li v-for="pt in jointProof.points" :key="pt.title">
            <strong>{{ pt.title }}</strong>
            <p>{{ pt.body }}</p>
          </li>
        </ul>
        <p class="joint__return">{{ jointProof.returnClaim }}</p>
        <p class="joint__echo"><span>回扣论点</span>{{ reportThesis.claim }}</p>
      </div>

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

.joint {
  margin: 0 0 2.75rem;
  padding: 1.35rem 1.4rem 1.5rem;
  border: 1px solid var(--line-strong);
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(196, 165, 116, 0.08), transparent 70%);
  h3 {
    font-size: 1.35rem;
    margin: 0.35rem 0 0.75rem;
  }
}
.joint__lead {
  color: var(--ink-muted);
  max-width: 48em;
  margin-bottom: 1rem;
}
.joint__points {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.1rem;
  li {
    padding: 0.85rem 0.95rem;
    background: var(--bg-card);
    border: 1px solid var(--line);
    border-radius: 4px;
  }
  strong {
    display: block;
    font-family: var(--serif);
    color: var(--accent-soft);
    margin-bottom: 0.35rem;
  }
  p {
    font-size: 0.85rem;
    color: var(--ink-muted);
    line-height: 1.55;
  }
}
.joint__return {
  font-size: 0.92rem;
  color: var(--ink);
  line-height: 1.7;
  max-width: 48em;
  margin-bottom: 0.85rem;
}
.joint__echo {
  font-size: 0.82rem;
  color: var(--ink-dim);
  line-height: 1.65;
  max-width: 48em;
  span {
    display: inline-block;
    margin-right: 0.5rem;
    color: var(--accent);
    letter-spacing: 0.12em;
    font-size: 0.68rem;
  }
}
</style>
