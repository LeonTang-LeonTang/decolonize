<script setup lang="ts">
import { act2Intro } from "../../content/act2"
import { evidenceChain, bridgeByTo } from "../../content/rail"
import BridgeCaption from "../ui/BridgeCaption.vue"

const steps = evidenceChain
const intoA = bridgeByTo["act2a"]
</script>

<template>
  <section id="act2intro" data-chapter="act2intro" class="section">
    <div class="section-inner narrow">
      <p class="eyebrow">{{ act2Intro.eyebrow }}</p>
      <h2>{{ act2Intro.title }}</h2>
      <p class="lead" style="margin-top: 1rem">{{ act2Intro.lead }}</p>
      <p class="order">{{ act2Intro.orderNote }}</p>

      <ol class="chain" aria-label="六案证据链">
        <li v-for="s in steps" :key="s.letter">
          <span class="chain__letter">{{ s.letter }}</span>
          <div>
            <strong>{{ s.title }}</strong>
            <p>{{ s.claim }}</p>
          </div>
        </li>
      </ol>

      <BridgeCaption
        v-if="intoA"
        :wipe="intoA.wipe"
        :move="intoA.move"
        :why="intoA.why"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  font-size: clamp(1.6rem, 3.5vw, 2.3rem);
}
.order {
  margin-top: 0.85rem;
  font-size: 0.88rem;
  color: var(--ink-muted);
  line-height: 1.65;
}
.chain {
  list-style: none;
  margin: 1.75rem 0 1.5rem;
  display: grid;
  gap: 0.55rem;
  li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.75rem;
    align-items: start;
    padding: 0.65rem 0.75rem;
    border: 1px solid var(--line);
    border-radius: 4px;
    background: var(--bg-card);
  }
  strong {
    font-family: var(--serif);
    color: var(--ink);
  }
  p {
    font-size: 0.82rem;
    color: var(--ink-muted);
    margin-top: 0.15rem;
  }
}
.chain__letter {
  font-family: var(--serif);
  color: var(--accent);
  font-size: 1.1rem;
  min-width: 1.4rem;
}
</style>
