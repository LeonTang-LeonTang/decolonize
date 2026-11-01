import puppeteer from "puppeteer-core"
import { mkdirSync } from "fs"

const outDir = "/workspace/decolonial-mvp/tmp/pass6-shots"
mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--window-size=1440,900"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
})

const page = await browser.newPage()
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }])
await page.goto("http://127.0.0.1:4175/", { waitUntil: "networkidle0", timeout: 90000 })
await new Promise((r) => setTimeout(r, 600))

// Enter narrative
await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button")]
  const enter = buttons.find((b) => /进入|enter|开始|启/i.test(b.textContent || ""))
  ;(enter || buttons[0])?.click()
})
await new Promise((r) => setTimeout(r, 1800))

// Ensure reading mode (default)
await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")]
  const reading = btns.find((b) => /阅读模式/.test(b.textContent || ""))
  reading?.click()
  localStorage.setItem("decolonial-view-mode", "reading")
})
await new Promise((r) => setTimeout(r, 400))

async function shot(name, fn) {
  if (fn) await fn()
  await new Promise((r) => setTimeout(r, 900))
  await page.screenshot({ path: `${outDir}/${name}`, fullPage: false })
  console.log("shot", name, await page.evaluate(() => ({
    y: Math.round(window.scrollY),
    mode: document.documentElement.dataset.viewMode,
    slide: document.querySelector(".slide.is-on, .slide__claim")?.textContent?.slice(0, 40),
    strip: document.querySelector(".thesis-strip__body")?.textContent?.slice(0, 60),
    badge: document.querySelector(".museum-badge")?.textContent,
  })))
}

// (a) 定义 as clear slide
await shot("01-slide-define-reading.png", async () => {
  await page.evaluate(() => {
    document.getElementById("act1")?.scrollIntoView({ behavior: "instant", block: "start" })
  })
  await new Promise((r) => setTimeout(r, 400))
  // nudge into sticky slide stage
  await page.evaluate(() => window.scrollBy(0, 40))
})

// Also 论证 slide
await shot("01b-slide-argue-reading.png", async () => {
  await page.evaluate(() => {
    document.getElementById("act2intro")?.scrollIntoView({ behavior: "instant", block: "start" })
  })
  await page.evaluate(() => window.scrollBy(0, 60))
})

// (b) Core A with thesis strip + gallery evidence
await shot("02-coreA-slide-thesis.png", async () => {
  await page.evaluate(() => {
    document.getElementById("act2a")?.scrollIntoView({ behavior: "instant", block: "start" })
  })
  await page.evaluate(() => window.scrollBy(0, 80))
})

await shot("02b-coreA-gallery-thesis-strip.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector('[data-portal="coreA-gallery"]')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const h = el.offsetHeight
    window.scrollTo(0, top + h * 0.42 - 80)
  })
  for (let i = 0; i < 6; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), i % 2 === 0 ? 20 : -10)
    await new Promise((r) => setTimeout(r, 180))
  }
})

// Core B gallery + strip
await shot("02c-coreB-gallery-thesis-strip.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector('[data-portal="coreB-gallery"]')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const h = el.offsetHeight
    window.scrollTo(0, top + h * 0.45 - 80)
  })
  for (let i = 0; i < 6; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), i % 2 === 0 ? 18 : -8)
    await new Promise((r) => setTimeout(r, 160))
  }
})

// (c) reading vs museum mode comparison on same Core A portal
await shot("03-reading-mode-coreA.png", async () => {
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")]
    btns.find((b) => /阅读模式/.test(b.textContent || ""))?.click()
    const el = document.querySelector('[data-portal="coreA-gallery"]')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const h = el.offsetHeight
    window.scrollTo(0, top + h * 0.4 - 80)
  })
  await new Promise((r) => setTimeout(r, 500))
})

await shot("03b-museum-mode-coreA.png", async () => {
  await page.evaluate(() => {
    const btns = [...document.querySelectorAll("button")]
    btns.find((b) => /展厅模式/.test(b.textContent || ""))?.click()
  })
  await new Promise((r) => setTimeout(r, 800))
  await page.evaluate(() => {
    const el = document.querySelector('[data-portal="coreA-gallery"]')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const h = el.offsetHeight
    window.scrollTo(0, top + h * 0.45 - 80)
  })
  for (let i = 0; i < 5; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), 15)
    await new Promise((r) => setTimeout(r, 150))
  }
})

// Hero slide
await shot("00-hero-slide.png", async () => {
  await page.evaluate(() => window.scrollTo(0, 0))
})

// Deck chrome close-up (define)
await shot("04-deck-progress-chrome.png", async () => {
  await page.evaluate(() => {
    document.getElementById("act1")?.scrollIntoView({ behavior: "instant", block: "start" })
  })
})

console.log("done", outDir)
await browser.close()
