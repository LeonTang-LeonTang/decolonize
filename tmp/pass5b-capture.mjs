import puppeteer from "puppeteer-core"
import { mkdirSync } from "fs"

const outDir = "/workspace/decolonial-mvp/tmp/pass5b-shots"
mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--window-size=1440,900"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
})

const page = await browser.newPage()
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }])
await page.goto("http://127.0.0.1:4175/", { waitUntil: "domcontentloaded", timeout: 60000 })
await new Promise((r) => setTimeout(r, 800))

await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button")]
  const enter = buttons.find((b) => /进入|enter|开始|启/i.test(b.textContent || ""))
  ;(enter || buttons[0])?.click()
})
await new Promise((r) => setTimeout(r, 2000))
await page.screenshot({ path: `${outDir}/01-after-enter.png`, fullPage: false })

// Wait for museum canvas ready
for (let i = 0; i < 30; i++) {
  const ready = await page.evaluate(() => !!document.querySelector("canvas.museum-gl.museum-gl--ready"))
  if (ready) break
  await new Promise((r) => setTimeout(r, 200))
}

// Enter coreB portal mid-hold
const info = await page.evaluate(() => {
  const el = document.querySelector('[data-portal="coreB-gallery"]')
  if (!el) return { ok: false }
  const top = el.getBoundingClientRect().top + window.scrollY
  const h = el.getBoundingClientRect().height || el.offsetHeight
  // Scroll so sticky stage is pinned and portal progress ~0.45
  const target = top + h * 0.45 - 80
  window.scrollTo(0, target)
  return { ok: true, top, h, target }
})
console.log("scroll info", info)

// Nudge scroll to fire ScrollTrigger updates
for (let i = 0; i < 8; i++) {
  await page.evaluate((d) => window.scrollBy(0, d), i % 2 === 0 ? 24 : -12)
  await new Promise((r) => setTimeout(r, 200))
}
await new Promise((r) => setTimeout(r, 1500))

const read = () =>
  page.evaluate(() => {
    const canvas = document.querySelector("canvas.museum-gl")
    const badge = document.querySelector(".museum-badge")
    const xr = document.querySelector(".museum-xr")
    return {
      className: canvas?.className,
      opacity: canvas ? getComputedStyle(canvas).opacity : null,
      dataset: { ...(canvas?.dataset || {}) },
      badge: badge?.textContent?.trim() || null,
      xr: xr?.textContent?.trim() || null,
      scrollY: window.scrollY,
    }
  })

let state = await read()
console.log("coreB state", state)
await page.screenshot({ path: `${outDir}/02-coreB-portal.png`, fullPage: false })

// Try intro portal
await page.evaluate(() => {
  const el = document.querySelector('[data-portal="intro-museum"]')
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  const h = el.offsetHeight
  window.scrollTo(0, top + h * 0.4 - 80)
})
for (let i = 0; i < 6; i++) {
  await page.evaluate((d) => window.scrollBy(0, d), 20)
  await new Promise((r) => setTimeout(r, 180))
}
await new Promise((r) => setTimeout(r, 1200))
state = await read()
console.log("intro state", state)
await page.screenshot({ path: `${outDir}/03-intro-portal.png`, fullPage: false })

// coreA
await page.evaluate(() => {
  const el = document.querySelector('[data-portal="coreA-gallery"]')
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY
  const h = el.offsetHeight
  window.scrollTo(0, top + h * 0.5 - 80)
})
for (let i = 0; i < 6; i++) {
  await page.evaluate((d) => window.scrollBy(0, d), 18)
  await new Promise((r) => setTimeout(r, 180))
}
await new Promise((r) => setTimeout(r, 1200))
state = await read()
console.log("coreA state", state)
await page.screenshot({ path: `${outDir}/04-coreA-portal.png`, fullPage: false })

await browser.close()
console.log("shots written to", outDir)
