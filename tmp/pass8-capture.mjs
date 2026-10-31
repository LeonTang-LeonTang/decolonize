import puppeteer from "puppeteer-core"
import { mkdirSync } from "fs"

const outDir = "/workspace/decolonial-mvp/tmp/pass8-shots"
mkdirSync(outDir, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--window-size=1440,900",
    "--use-gl=angle",
    "--enable-webgl",
    "--ignore-gpu-blocklist",
  ],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
})

const page = await browser.newPage()
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }])
await page.goto("http://127.0.0.1:4175/", { waitUntil: "networkidle0", timeout: 90000 })
await new Promise((r) => setTimeout(r, 700))

await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("button")]
  const enter = buttons.find((b) => /进入|enter|开始|启/i.test(b.textContent || ""))
  ;(enter || buttons[0])?.click()
})
await new Promise((r) => setTimeout(r, 2500))

async function meta() {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas.museum-gl")
    return {
      y: Math.round(window.scrollY),
      mode: document.documentElement.dataset.viewMode,
      estrip: !!document.querySelector(".estrip__stage"),
      parallax: !!document.querySelector(".parallax__layer"),
      holdMulti: !!document.querySelector(".hold--multi"),
      beat: document.querySelector(".hold")?.getAttribute("data-beat"),
      beatLabel: document.querySelector(".hold__beat-idx")?.textContent?.slice(0, 40),
      strip: document.querySelector(".thesis-strip__body")?.textContent?.slice(0, 70),
      badge: document.querySelector(".museum-badge")?.textContent,
      museumActive: canvas?.classList.contains("museum-gl--active"),
      canvasOpacity: canvas ? getComputedStyle(canvas).opacity : null,
      portal: canvas?.dataset?.portal,
      portalT: canvas?.dataset?.portalT,
      immersion: canvas?.dataset?.immersion,
    }
  })
}

async function shot(name, fn) {
  if (fn) await fn()
  await new Promise((r) => setTimeout(r, 1000))
  await page.screenshot({ path: `${outDir}/${name}`, fullPage: false })
  console.log("shot", name, await meta())
}

await page.evaluate(() => {
  ;[...document.querySelectorAll("button")].find((b) => /阅读模式/.test(b.textContent || ""))?.click()
  localStorage.setItem("decolonial-view-mode", "reading")
})
await new Promise((r) => setTimeout(r, 400))

await shot("01-coreA-slide-reading.png", async () => {
  await page.evaluate(() => {
    document.getElementById("act2a")?.scrollIntoView({ behavior: "instant", block: "start" })
  })
  await page.evaluate(() => window.scrollBy(0, 40))
})

await shot("02-coreA-parallax-strip.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector("#act2a .estrip")
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top + el.offsetHeight * 0.38 - 60)
  })
  for (let i = 0; i < 6; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), 45)
    await new Promise((r) => setTimeout(r, 180))
  }
})

await shot("03-coreA-multibeat-claim.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector("#act2a .hold")
    if (!el) return
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + 30)
  })
})

await shot("04-coreA-multibeat-artwork.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector("#act2a .hold")
    if (!el) return
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.38)
  })
  for (let i = 0; i < 15; i++) {
    const info = await page.evaluate(() => document.querySelector("#act2a .hold")?.dataset?.beat)
    if (info === "1") break
    await page.evaluate((d) => window.scrollBy(0, d), info === "0" ? 40 : -30)
    await new Promise((r) => setTimeout(r, 100))
  }
})

await shot("05-coreA-multibeat-effect.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector("#act2a .hold")
    if (!el) return
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.72)
  })
  for (let i = 0; i < 5; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), 40)
    await new Promise((r) => setTimeout(r, 150))
  }
})

await page.evaluate(() => {
  ;[...document.querySelectorAll("button")].find((b) => /展厅模式/.test(b.textContent || ""))?.click()
  localStorage.setItem("decolonial-view-mode", "museum")
})
await page.waitForFunction(() => !!window.__museumApp, { timeout: 15000 })

await shot("06-coreA-portal-visible.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector('[data-portal="coreA-gallery"]')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      const h = el.offsetHeight
      window.scrollTo(0, top + Math.max(80, (h - window.innerHeight) * 0.45))
    }
  })
  for (let i = 0; i < 12; i++) {
    const t = 0.55 + i * 0.01
    await page.evaluate((portalT) => {
      window.__museumApp?.setState({
        portal: "coreA-gallery",
        portalT,
        immersionScale: 1,
        viewMode: "museum",
        activeChapter: "act2a",
      })
    }, t)
    await new Promise((r) => setTimeout(r, 80))
  }
})

await shot("07-coreD-portal-democracy.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector('[data-portal="coreD-gallery"]')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      const h = el.offsetHeight
      window.scrollTo(0, top + Math.max(80, (h - window.innerHeight) * 0.5))
    }
  })
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => {
      window.__museumApp?.setState({
        portal: "coreD-gallery",
        portalT: 0.58,
        immersionScale: 1,
        viewMode: "museum",
        activeChapter: "act2d",
      })
    })
    await new Promise((r) => setTimeout(r, 80))
  }
})

await shot("08-coreD-multibeat.png", async () => {
  await page.evaluate(() => {
    window.__museumApp?.setState({ portal: null, portalT: 0 })
    const el = document.querySelector("#act2d .hold")
    if (!el) return
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.35)
  })
  for (let i = 0; i < 6; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), 50)
    await new Promise((r) => setTimeout(r, 160))
  }
})

await shot("09-coreB-parallax-reading.png", async () => {
  await page.evaluate(() => {
    ;[...document.querySelectorAll("button")].find((b) => /阅读模式/.test(b.textContent || ""))?.click()
    localStorage.setItem("decolonial-view-mode", "reading")
  })
  await new Promise((r) => setTimeout(r, 400))
  await page.evaluate(() => {
    const el = document.querySelector("#act2b .estrip")
    if (!el) return
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.4 - 60)
  })
  for (let i = 0; i < 5; i++) {
    await page.evaluate((d) => window.scrollBy(0, d), 48)
    await new Promise((r) => setTimeout(r, 170))
  }
})

await page.evaluate(() => {
  ;[...document.querySelectorAll("button")].find((b) => /展厅模式/.test(b.textContent || ""))?.click()
})
await shot("10-thesis-strip-mid-portal.png", async () => {
  await page.evaluate(() => {
    const el = document.querySelector('[data-portal="coreA-gallery"]')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, top + Math.max(40, (el.offsetHeight - window.innerHeight) * 0.35))
    }
  })
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => {
      window.__museumApp?.setState({
        portal: "coreA-gallery",
        portalT: 0.5,
        immersionScale: 1,
        viewMode: "museum",
        activeChapter: "act2a",
      })
    })
    await new Promise((r) => setTimeout(r, 50))
  }
})

await browser.close()
console.log("done", outDir)
