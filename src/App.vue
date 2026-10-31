<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ChapterNav from "./components/ui/ChapterNav.vue"
import ChapterWipe from "./components/ui/ChapterWipe.vue"
import LoadingScreen from "./components/ui/LoadingScreen.vue"
import MuteToggle from "./components/ui/MuteToggle.vue"
import ProgressBar from "./components/ui/ProgressBar.vue"
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
import { allVo } from "./content/media"
import { useAudio } from "./composables/useAudio"
import { useLenis } from "./composables/useLenis"
import { useReducedMotion } from "./composables/useReducedMotion"
import { useScrollProgress } from "./composables/useScrollProgress"

gsap.registerPlugin(ScrollTrigger)

const ready = ref(false)
const started = ref(false)
const { progress, activeId } = useScrollProgress()
const { muted, init, toggleMute, unlockAndPlay, playVo } = useAudio()
const { reduced } = useReducedMotion()
useLenis()

const voTriggers: ScrollTrigger[] = []
const playedOnce = new Set<string>()

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
  init()
  requestAnimationFrame(() => {
    ready.value = true
  })
})

onUnmounted(() => {
  voTriggers.forEach((t) => t.kill())
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
      ".section h2, .section .lead, .hero h1, .vo, .thesis",
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
</script>

<template>
  <LoadingScreen :ready="ready" @enter="onEnter" />
  <ProgressBar :progress="progress" />
  <ChapterNav :active-id="activeId">
    <MuteToggle :muted="muted" @toggle="onToggleMute" />
  </ChapterNav>
  <div class="grain" aria-hidden="true" />
  <main>
    <HeroSection />
    <ChapterWipe label="I · 概念" />
    <Act1Section />
    <ChapterWipe label="II · 六案" />
    <Act2Intro />
    <Act2A />
    <ChapterWipe />
    <Act2B />
    <ChapterWipe />
    <Act2C />
    <ChapterWipe />
    <Act2D />
    <ChapterWipe />
    <Act2E />
    <ChapterWipe />
    <Act2F />
    <Act2Support />
    <ChapterWipe label="III · 学术" />
    <Act3Section />
    <CreditsSection />
  </main>
</template>

<style scoped>
main {
  padding-top: 0;
}
</style>
