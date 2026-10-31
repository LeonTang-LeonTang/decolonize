<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ChapterNav from "./components/ui/ChapterNav.vue"
import ChapterWipe from "./components/ui/ChapterWipe.vue"
import BridgeCaption from "./components/ui/BridgeCaption.vue"
import LoadingScreen from "./components/ui/LoadingScreen.vue"
import MuteToggle from "./components/ui/MuteToggle.vue"
import ProgressBar from "./components/ui/ProgressBar.vue"
import ModeToggle from "./components/ui/ModeToggle.vue"
import DeckProgress from "./components/ui/DeckProgress.vue"
import ThesisStrip from "./components/ui/ThesisStrip.vue"
import WebGLMuseumLayer from "./components/webgl/WebGLMuseumLayer.vue"
import Act1Section from "./components/sections/Act1Section.vue"
import Act2A from "./components/sections/Act2A.vue"
import Act2B from "./components/sections/Act2B.vue"
import Act2C from "./components/sections/Act2C.vue"
import Act2D from "./components/sections/Act2D.vue"
import Act2E from "./components/sections/Act2E.vue"
import Act2F from "./components/sections/Act2F.vue"
import Act2Intro from "./components/sections/Act2Intro.vue"
import Act2Support from "./components/sections/Act2Support.vue"
import Act3Section from "./components/sections/Act3Section.vue"
import CreditsSection from "./components/sections/CreditsSection.vue"
import HeroSection from "./components/sections/HeroSection.vue"
import { bridgeByTo } from "./content/rail"
import { allVo } from "./content/media"
import { useAudio } from "./composables/useAudio"
import { useLenis } from "./composables/useLenis"
import { useReducedMotion } from "./composables/useReducedMotion"
import { useScrollProgress } from "./composables/useScrollProgress"
import { useViewMode, hydrateViewMode } from "./composables/useViewMode"
import { useDeckNav } from "./composables/useDeckNav"
import { getMuseumApp } from "./composables/useMuseumWebGL"

gsap.registerPlugin(ScrollTrigger)

const ready = ref(false)
const started = ref(false)
const museumActive = ref(false)
const { progress, activeId } = useScrollProgress()
const { muted, init, toggleMute, unlockAndPlay, playVo } = useAudio()
const { reduced } = useReducedMotion()
const { mode } = useViewMode()
const { page, total, jumpTo } = useDeckNav(activeId)
useLenis()

const voTriggers: ScrollTrigger[] = []
const playedOnce = new Set<string>()
let museumPoll = 0

const wireVoScroll = () => {
  voTriggers.forEach((t) => t.kill())
  voTriggers.length = 0
  for (const line of allVo) {
    if (line.interaction || !line.section) continue
    const el = document.querySelector(line.section)
    if (!el) continue
    const st = ScrollTrigger.create({
      trigger: el,
      start: line.start || "top 62%",
      onEnter: () => {
        if (playedOnce.has(line.id) && muted.value) return
        playedOnce.add(line.id)
        playVo(line.id, { text: line.zh })
      },
      onEnterBack: () => {
        playVo(line.id, { text: line.zh })
      },
    })
    voTriggers.push(st)
  }
}

onMounted(() => {
  hydrateViewMode()
  init()
  requestAnimationFrame(() => {
    ready.value = true
  })
  museumPoll = window.setInterval(() => {
    const app = getMuseumApp()
    const canvas = document.querySelector("canvas.museum-gl") as HTMLCanvasElement | null
    if (!app || !canvas) {
      museumActive.value = false
      return
    }
    const st = app.getState()
    museumActive.value =
      canvas.dataset.museumActive === "1" || (!!st.portal && st.portalT > 0.02)
  }, 150)
})

onUnmounted(() => {
  voTriggers.forEach((t) => t.kill())
  if (museumPoll) window.clearInterval(museumPoll)
})

watch(mode, () => {
  // Re-push scale when museum app becomes ready later (portal-aware)
  const m = mode.value
  const app = getMuseumApp()
  if (!app) return
  const inPortal = !!app.getState().portal
  app.setState({
    viewMode: m,
    immersionScale: inPortal ? (m === "reading" ? 0.94 : 1) : m === "reading" ? 0.42 : 1,
  })
  // Pass 9: portal height changes with mode — refresh ST so Core D etc. stay claimable
  requestAnimationFrame(() => ScrollTrigger.refresh())
})

const onEnter = async () => {
  started.value = true
  unlockAndPlay()
  await nextTick()
  wireVoScroll()
  const hero = allVo.find((l) => l.id === "hero-enter")
  if (hero) playVo(hero.id, { text: hero.zh, force: true })

  if (!reduced.value) {
    const targets = gsap.utils.toArray<HTMLElement>(
      ".section h2, .section .lead, .hero h1, .vo, .thesis, .bridge, .slide__claim",
    )
    targets.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      )
    })
  }
  ScrollTrigger.refresh()
}

const onToggleMute = () => {
  toggleMute()
}

const b = bridgeByTo
</script>

<template>
  <LoadingScreen :ready="ready" @enter="onEnter" />
  <ProgressBar :progress="progress" :active-id="activeId" />
  <ChapterNav :active-id="activeId">
    <ModeToggle />
    <MuteToggle :muted="muted" @toggle="onToggleMute" />
  </ChapterNav>
  <DeckProgress :active-id="activeId" :page="page" :total="total" @jump="jumpTo" />
  <ThesisStrip :active-id="activeId" :museum-active="museumActive" />
  <!-- WebGL scroll museum — evidence layer behind article -->
  <WebGLMuseumLayer />
  <div class="grain" aria-hidden="true" />
  <main class="article-rail" :data-view-mode="mode">
    <HeroSection />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act1']?.wipe || 'Ⅰ · 定义'" />
      <BridgeCaption
        v-if="b['act1']"
        :wipe="b['act1'].wipe"
        :move="b['act1'].move"
        :why="b['act1'].why"
      />
    </div>
    <Act1Section />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act2intro']?.wipe || 'Ⅱ · 论证'" />
      <BridgeCaption
        v-if="b['act2intro']"
        :wipe="b['act2intro'].wipe"
        :move="b['act2intro'].move"
        :why="b['act2intro'].why"
      />
    </div>
    <Act2Intro />

    <Act2A />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act2b']?.wipe || '例证 B'" />
      <BridgeCaption
        v-if="b['act2b']"
        :wipe="b['act2b'].wipe"
        :move="b['act2b'].move"
        :why="b['act2b'].why"
      />
    </div>
    <Act2B />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act2c']?.wipe || '例证 C'" />
      <BridgeCaption
        v-if="b['act2c']"
        :wipe="b['act2c'].wipe"
        :move="b['act2c'].move"
        :why="b['act2c'].why"
      />
    </div>
    <Act2C />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act2d']?.wipe || '例证 D'" />
      <BridgeCaption
        v-if="b['act2d']"
        :wipe="b['act2d'].wipe"
        :move="b['act2d'].move"
        :why="b['act2d'].why"
      />
    </div>
    <Act2D />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act2e']?.wipe || '例证 E'" />
      <BridgeCaption
        v-if="b['act2e']"
        :wipe="b['act2e'].wipe"
        :move="b['act2e'].move"
        :why="b['act2e'].why"
      />
    </div>
    <Act2E />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act2f']?.wipe || '例证 F'" />
      <BridgeCaption
        v-if="b['act2f']"
        :wipe="b['act2f'].wipe"
        :move="b['act2f'].move"
        :why="b['act2f'].why"
      />
    </div>
    <Act2F />

    <Act2Support />

    <div class="rail-bridge">
      <ChapterWipe :label="b['act3']?.wipe || 'Ⅳ · 总结'" />
      <BridgeCaption
        v-if="b['act3']"
        :wipe="b['act3'].wipe"
        :move="b['act3'].move"
        :why="b['act3'].why"
      />
    </div>
    <Act3Section />
    <CreditsSection />
  </main>
</template>

<style scoped>
.article-rail {
  position: relative;
  z-index: 1;
  padding-top: 0;
  /* room for deck progress under nav */
  padding-bottom: 3.5rem;
}
.rail-bridge {
  padding: 0 1.25rem;
  max-width: 920px;
  margin: 0 auto;
}
</style>
