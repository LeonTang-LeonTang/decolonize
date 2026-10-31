/** Framed stills hung in the scroll museum — real public/media only (no AI fakes). */

export type GalleryFrame = {
  id: string
  core: "A" | "B" | "C" | "D" | "E" | "F" | "intro"
  src: string
  title: string
  credit: string
  /** Aspect W/H; used to size the plane */
  aspect?: number
}

/** Corridor hang order for Act2Intro portal (overview museum). */
export const museumCorridor: GalleryFrame[] = [
  {
    id: "a-saleh",
    core: "A",
    src: "/media/a/saleh.jpg",
    title: "捕获迪波内格罗亲王 · Saleh",
    credit: "Raden Saleh, 1857. Wikimedia Commons / Istana Negara.",
    aspect: 1.35,
  },
  {
    id: "a-pieneman",
    core: "A",
    src: "/media/a/pieneman.jpg",
    title: "投降 · Pieneman",
    credit: "Nicolaas Pieneman, 1835. Rijksmuseum / Wikimedia Commons.",
    aspect: 1.4,
  },
  {
    id: "b-utama",
    core: "B",
    src: "/media/stills/b/utama-mot.jpg",
    title: "Ho Tzu Nyen · Utama",
    credit: "Educational still · see CREDITS.",
    aspect: 1.6,
  },
  {
    id: "b-hotel",
    core: "B",
    src: "/media/stills/b/hotel-aporia-aichi.jpg",
    title: "Hotel Aporia",
    credit: "Educational still · see CREDITS.",
    aspect: 1.5,
  },
  {
    id: "c-letters",
    core: "C",
    src: "/media/stills/c/letters-panduranga.jpg",
    title: "Letters from Panduranga",
    credit: "Educational still · see CREDITS.",
    aspect: 1.4,
  },
  {
    id: "d-arin",
    core: "D",
    src: "/media/stills/d/arin-install-artpress.jpg",
    title: "Arin Rungjang installation",
    credit: "Educational still · see CREDITS.",
    aspect: 1.5,
  },
  {
    id: "e-archipelago",
    core: "E",
    src: "/media/stills/e/archipelago.jpg",
    title: "Archipelago / barangay",
    credit: "Educational still · see CREDITS.",
    aspect: 1.55,
  },
  {
    id: "f-tate",
    core: "F",
    src: "/media/stills/f/artist-empire-tate-1.jpg",
    title: "Artist and Empire · Tate",
    credit: "Educational still · see CREDITS.",
    aspect: 1.5,
  },
]

/** Core A dual-painting room (portal focus). */
export const coreARoom: GalleryFrame[] = [
  museumCorridor[0],
  museumCorridor[1],
  {
    id: "a-saleh-detail",
    core: "A",
    src: "/media/a/saleh-detail.jpg",
    title: "Saleh · detail",
    credit: "Detail crop · Wikimedia Commons.",
    aspect: 1.2,
  },
  {
    id: "a-pieneman-detail",
    core: "A",
    src: "/media/a/pieneman-detail.jpg",
    title: "Pieneman · detail",
    credit: "Detail crop · Wikimedia Commons.",
    aspect: 1.2,
  },
]

/** Boat-like layered evidence-wall textures per core (parallax planes). */
export const evidenceWalls: Record<string, string[]> = {
  act2a: ["/media/a/saleh.jpg", "/media/a/pieneman.jpg", "/media/a/saleh-detail.jpg"],
  act2b: [
    "/media/stills/b/utama-mot.jpg",
    "/media/stills/b/hotel-aporia-still.jpg",
    "/media/stills/b/cdosea-sam.png",
  ],
  act2c: ["/media/stills/c/letters-panduranga.jpg", "/media/stills/c/tuan-specter.png"],
  act2d: [
    "/media/stills/d/arin-install-artpress.jpg",
    "/media/stills/d/arin-shanghart.jpg",
    "/media/d/democracy-monument-bangkok.jpg",
  ],
  act2e: [
    "/media/stills/e/archipelago.jpg",
    "/media/stills/e/barangay.jpg",
    "/media/e/dalrymple-borneo-sulu-1769.jpg",
  ],
  act2f: [
    "/media/stills/f/artist-empire-tate-1.jpg",
    "/media/stills/f/pioneers-arrival-2019.jpg",
    "/media/f/raffles-statue-singapore-river.jpg",
  ],
}
