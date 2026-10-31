export type TimelineItem = { year: string; event: string; mediaHint?: string }

export type AnalysisAxis = {
  axis: string
  title: string
  body: string
}

export type MediaEmbed = {
  src: string
  title: string
  caption?: string
  credit: string
  href?: string
  hrefLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  fullBleed?: boolean
}

export type WorkSpine = {
  title: string
  artist?: string
  medium: string
  venue: string
  year: string
  see: string
}

/** 四轴：作品优先；历史仅作辅线 */
export const ANALYSIS_AXES = [
  "作品与展场",
  "解殖民视觉机制",
  "形式与装置读法",
  "历史与地缘线索（辅）",
] as const

export const act2Intro = {
  eyebrow: "Ⅱ · 论证路径",
  title: "我们将用六个作品／展览作为证据",
  lead:
    "定义已立。以下不是六段互不相关的「案例集」，而是一条加压链：每一案都回应「展示与回收」，并承接上一案刚打开的问题。作品／展览是脊柱；历史只作短脚手架。",
  orderNote:
    "阅读顺序即推理顺序：A 画题对决 → B 命名装置 → C 省略伦理 → D 纪念碑 → E 档案接缝 → F 展览与纪念工程。章与章之间的桥句会标明逻辑跳跃。",
}

export const nodeA = {
  id: "act2a",
  eyebrow: "例证 A · 印尼 ↔ 荷兰",
  title: "两幅画：投降与捕获的视觉对决",
  vo: "先看两幅画：同一场面，一边叫投降，一边叫捕获——标题本身就是观看装置。",
  railCallback: "本证回扣：画题与构图是第一层「展示」装置——谁命名场面，谁分配道德位置。",
  thesis:
    "解殖民发生在画题与构图的对决里：Pieneman 把扣押仪式化为「投降」；Saleh 改写为「捕获」。归还与展墙用词，是这套视觉政权在馆藏时间里的延长。",
  lead:
    "先并置两幅油画：Nicolaas Pieneman《迪波内格罗亲王向德·科克将军投降》（约 1835，Rijksmuseum）与 Raden Saleh《捕获迪波内格罗亲王》（1857，现藏雅加达总统府）。看见什么：一边是将军接受「和平屈服」的仪式构图，一边是亲王被骗／被扣的身体距离与手势。历史（爪哇战争）只说明这是同一事件的两种画法。",
  work: {
    title: "捕获迪波内格罗亲王 / Penangkapan Diponegoro",
    artist: "Raden Saleh（萨勒赫）",
    medium: "布面油画",
    venue: "现藏雅加达总统府（Istana Negara）；1978 自荷兰归还",
    year: "1857",
    see: "谈判现场被画成「被捕」：亲王与荷军官的距离、手势与围观者，拒绝「和平投降」的道德外观。",
  } as WorkSpine,
  workContrast: {
    title: "迪波内格罗亲王向德·科克将军投降",
    artist: "Nicolaas Pieneman（皮内曼）",
    medium: "布面油画（德·科克委托）",
    venue: "阿姆斯特丹国立博物馆（Rijksmuseum），1907 入藏",
    year: "约 1835",
    see: "将军一侧的仪式化「接受投降」：殖民秩序被画成可观看的正当性。",
  } as WorkSpine,
  paintings: [
    {
      id: "saleh",
      src: "/media/a/saleh.jpg",
      detail: "/media/a/saleh-detail.jpg",
      title: "捕获迪波内格罗亲王",
      artist: "Raden Saleh（萨勒赫）",
      year: "1857",
      caption: "爪哇视角：谈判中的扣押被画成「被捕」。献给威廉三世；1978 年由荷兰政府归还，现藏雅加达总统府。",
      credit:
        "Raden Saleh, Penangkapan Diponegoro, 1857. Istana Negara, Jakarta. Image: Wikimedia Commons (public domain).",
    },
    {
      id: "pieneman",
      src: "/media/a/pieneman.jpg",
      detail: "/media/a/pieneman-detail.jpg",
      title: "迪波内格罗亲王向德·科克将军投降",
      artist: "Nicolaas Pieneman（皮内曼）",
      year: "1835（短名单口径 1830–35）",
      caption: "殖民者视角：和平屈服。由德·科克委托，1907 年入藏阿姆斯特丹国立博物馆。",
      credit:
        "Nicolaas Pieneman, The Submission of Prince Dipo Negoro…, 1835. Rijksmuseum. Image: Wikimedia Commons (public domain).",
    },
  ],
  breakdown: [
    {
      axis: "作品与展场",
      title: "双画 compare：同一事件，两套观看合同",
      body:
        "本 Core 的脊柱是两幅可并置的油画。滑杆默认 50%：左 Saleh、右 Pieneman。展场语境跨雅加达总统府与 Rijksmuseum——同一视觉记忆被两套馆藏制度托管。2022《Revolusi!》把「谁来写标签」推回展墙，是画题政治的当代延长，而非另开史章。",
    },
    {
      axis: "解殖民视觉机制",
      title: "标题即权力：投降 ↔ 捕获",
      body:
        "解殖民在此首先是视觉命名战：谁命名画面，谁分配道德位置。Saleh 用「捕获」拒绝殖民者的「投降」语法；却仍献给威廉三世——回收不等于脱离帝国交换链。三次归还与 bersiap 用词之争，证明画题政治会渗进标签、新闻稿与借展协议。",
    },
    {
      axis: "形式与装置读法",
      title: "构图、身体距离、委托关系",
      body:
        "读法落在画面：Pieneman 的仪式接受姿势 vs Saleh 的扣押张力；detail crop 逼近手势与目光。委托—献画—入藏构成装置链：将军要一幅「秩序画」，贵族画家要一幅「被捕画」，博物馆要一幅「可叙述的国族物件」。本站用 compare slider＋OA 档案片段承载这套读法。",
    },
    {
      axis: "历史与地缘线索（辅）",
      title: "爪哇战争只说明「同一天」",
      body:
        "辅线极短：1825–1830 爪哇战争、谈判扣押；荷兰握馆藏决定权，雅加达接象征。不必展开战争全史——历史只用来证明两画画的是同一场面，从而凸显画法差异才是解殖民现场。",
    },
  ] as AnalysisAxis[],
  timeline: [
    { year: "1835", event: "Pieneman《投降》完成（德·科克委托）" },
    { year: "1857", event: "Saleh《捕获》完成并献威廉三世" },
    { year: "1907", event: "Pieneman 画入藏 Rijksmuseum" },
    { year: "1978", event: "Saleh 画归还雅加达总统府" },
    { year: "2020-03", event: "kris 归还；遗物展（馆藏叙述延长）" },
    { year: "2022", event: "Revolusi! 展墙用词／bersiap 争议" },
  ] as TimelineItem[],
  elsewhere: "展场另一端：阿姆斯特丹／莱顿的收藏与标签权。",
  revolusiNote:
    "《Revolusi!》作为展览节点：联合策展把叙述权部分交还；此处读的是展墙装置，不是独立战争编年。",
  embeds: [
    {
      src: "/media/a/saleh.jpg",
      title: "Saleh《捕获》全幅（公版）",
      caption: "先看画面：被捕的构图，而非战争年表。",
      credit: "Raden Saleh, 1857. Wikimedia Commons (public domain).",
      href: "https://commons.wikimedia.org/wiki/File:Raden_Saleh_-_Diponegoro_arrest.jpg",
      hrefLabel: "Wikimedia",
      fullBleed: true,
    },
  ] as MediaEmbed[],
}

export const nodeB = {
  id: "act2b",
  eyebrow: "例证 B · 新加坡 ↔ 英国／日本",
  title: "何子彦：把「东南亚」拆成可观看的词典与旅馆",
  vo: "先看何子彦的作品：词典在重排，旅馆里叠着幽灵——「东南亚」被做成可观看的知识装置。",
  railCallback: "本证回扣：从单幅画题放大到区域之名——命名权本身可被做成可观看的知识装置。",
  thesis:
    "Utama／CDOSEA／Hotel Aporia 把区域命名与帝国思想史拆成影像、算法词典与场地装置；解殖民是观看知识如何被生产，而非背诵地名沿革。",
  lead:
    "脊柱三件：①《Utama—Every Name in History Is I》（2003，The Substation）——同一演员换脸扮演「发现者」；②《东南亚批判词典》CDOSEA（2012—／2017—算法视频）——词条不断重排；③《Hotel Aporia》（2019，爱知三年展喜乐亭）——六频把京都学派与特攻空间叠进旅馆。战区图只作命名时代的视觉脚手架。",
  work: {
    title: "CDOSEA / Hotel Aporia / Utama（作品簇）",
    artist: "Ho Tzu Nyen（何子彦）",
    medium: "录像＋肖像装置；算法视频／词典平台；六频场地装置",
    venue: "The Substation（2003）→ 爱知三年展喜乐亭（2019）→ SAM／MOT 等",
    year: "2003–2019（主轴）",
    see: "可替换的「发现者」脸、不断漂移的词条界面、旅馆里的多重投影与声响——名称与思想史变成可进入的展演。",
  } as WorkSpine,
  maps: [
    {
      id: "1941",
      src: "/media/b/pacific-war-se-asia-1941.jpg",
      label: "太平洋战争 · 东南亚 1941（辅：命名时代视觉）",
      credit: "Pacific War — Southeast Asia, 1941. Wikimedia Commons (public domain).",
    },
    {
      id: "1942",
      src: "/media/b/pacific-war-southern-asia-1942.jpg",
      label: "太平洋战争 · 南方亚洲 1942（辅）",
      credit: "Pacific War — Southern Asia, 1942. Wikimedia Commons (public domain).",
    },
  ],
  empireMaps: [
    {
      src: "/media/b/japanese-empire-1942.svg",
      label: "日帝疆域示意 1942（辅）",
      credit: "Japanese Empire, 1942. Wikimedia Commons (CC BY-SA 3.0).",
    },
    {
      src: "/media/b/greater-east-asia-co-prosperity.png",
      label: "大东亚共荣圈示意（辅）",
      credit: "Greater East Asia Co-Prosperity Sphere. Wikimedia Commons (CC BY-SA 3.0).",
    },
  ],
  wordChips: [
    { key: "Utama", hint: "作品", reveal: "同一身体扮演 Sang Nila Utama 与莱佛士等：发现语法可换脸——解殖民发生在肖像装置里。" },
    { key: "CDOSEA", hint: "作品", reveal: "词典重排图像与声音：区域形状漂移，是可观看的知识生产，不是正确定义。" },
    { key: "tiger", hint: "词条形式", reveal: "字母词条把「工具／意象」做成可点读的展演单元。" },
    { key: "theodolite", hint: "词条形式", reveal: "测量器械入词典：殖民视觉工具本身成为展项。" },
    { key: "Hotel Aporia", hint: "装置", reveal: "喜乐亭六频：京都学派与特攻空间叠合——思想史被场地化。" },
    { key: "SEAC", hint: "辅线", reveal: "盟军命名「东南亚」：解放外观与旧宗主联盟同体——只为解锁作品里的命名问题。" },
    { key: "Southern", hint: "辅线", reveal: "日帝「南方」话语：Hotel Aporia 回收的幽灵来源之一。" },
    { key: "Aichi tip", hint: "展场旁注", reveal: "同届「表现的不自由」关展：解殖民展亦可成权力场（半句）。" },
  ],
  breakdown: [
    {
      axis: "作品与展场",
      title: "三件一组：肖像／词典／旅馆",
      body:
        "先认作品：Utama 的换脸肖像、CDOSEA 的算法词典界面、Hotel Aporia 的喜乐亭多频。展场从 Substation 白盒到大正旅馆遗址，再到 SAM／MOT——场地本身参与叙事。本站嵌入馆方／ART iT 静帧，词条芯片只模拟「重排」手感，不盗官方算法。",
    },
    {
      axis: "解殖民视觉机制",
      title: "拆掉「发现」与「定义」的自然外观",
      body:
        "Utama 让创始神话可替换，拒绝莱佛士／乌塔马二选一的本质主义。CDOSEA 拒绝给出正确东南亚定义，把百科权威交给漂移。Hotel Aporia 把「大东亚」解放修辞做成可进入的幽灵基础设施——解殖民是拆视觉与声响里的帝国语法。",
    },
    {
      axis: "形式与装置读法",
      title: "换脸、词条抽卡、多频叠影",
      body:
        "形式手法：同一演员／肖像系列；字母词条作为交互单元；六频投影＋声响＋场地自动控制系统。读法问：谁在说话？哪一层影像盖住另一层？词典点开后是否仍在「定义」？装置让观众意识到自己也在生产区域知识。",
    },
    {
      axis: "历史与地缘线索（辅）",
      title: "SEAC／「南方」只开一把锁",
      body:
        "辅线：盟军 SEAC 命名流行、日帝南方话语、京都学派——各一句，用来听懂 Hotel Aporia 与词典里的幽灵，不写作战史。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/b/utama-mot.jpg",
      title: "Utama — Every Name in History Is I",
      caption: "先看换脸装置：发现者可以是任何人。",
      credit: "Installation/work view via ART iT photo report (MOT A for Agents context). Educational fair-use still.",
      href: "https://www.hotzunyen.com/",
      hrefLabel: "艺术家官网",
      secondaryHref: "https://www.art-it.asia/en/top_e/admin_expht_e/246876/",
      secondaryLabel: "ART iT 现场",
    },
    {
      src: "/media/stills/b/cdosea-sam.png",
      title: "CDOSEA／形状漂移的区域",
      caption: "词典界面作为作品：重排即展演。",
      credit: "Singapore Art Museum story image (Ho Tzu Nyen / shapeshifting region). Educational citation.",
      href: "https://www.singaporeartmuseum.sg/about/our-collection/stories/a-shapeshifting-region",
      hrefLabel: "SAM 藏品叙述",
    },
    {
      src: "/media/stills/b/hotel-aporia-aichi.jpg",
      title: "Hotel Aporia（2019）· 爱知三年展喜乐亭",
      caption: "场地装置：思想史被叠进旅馆空间。",
      credit: "Aichi Triennale 2019 artwork page still. Educational citation.",
      href: "https://aichitriennale2010-2019.jp/2019/en/artwork/T04.html",
      hrefLabel: "爱知三年展页",
      secondaryHref: "https://www.art-it.asia/en/top_e/admin_ed_feature_e/212453/",
      secondaryLabel: "ART iT 访谈静帧",
      fullBleed: true,
    },
  ] as MediaEmbed[],
  timeline: [
    { year: "2003", event: "《Utama》首展 The Substation" },
    { year: "2012–", event: "《东南亚批判词典》统摄创作" },
    { year: "2017–", event: "CDOSEA 算法视频／在线平台" },
    { year: "2019", event: "《Hotel Aporia》爱知三年展" },
    { year: "2021", event: "YCAM《Voice of Void》" },
    { year: "2023–24", event: "MOT《A for Agents》；SAM《Time & the Tiger》" },
  ] as TimelineItem[],
  mapNote: "战区图仅为命名辅线视觉；≠ SEAC 官方疆域图。",
}

export const nodeC = {
  id: "act2c",
  eyebrow: "例证 C · 越南 ↔ 法国",
  title: "《来自潘朗的信》：让省略在画面里出声",
  vo: "先看阮静诗的影像：书信体双声，风景与日常——她不替占族发言，只让省略自己成为可见。",
  railCallback: "本证回扣：命名之后是省略——解殖民也发生在谁可以看见／谁被写掉的镜头伦理。",
  thesis:
    "《来自潘朗的信》用书信体影像散文拒绝民族志代言；解殖民发生在「谁可以看见／谁被省略」的镜头伦理里。对照阮俊四联屏，帝国人口流动的幽灵成为另一件可并读的装置。",
  lead:
    "主作品：阮静诗（Nguyễn Trinh Thi）《来自潘朗的信》(Letters from Panduranga, 2015)——约 35 分钟单频道影像，巴黎 Jeu de Paume Satellite 8（2015-10-20—2016-01-24），后至 CAPC；M+ 藏。看见什么：男女旁白交换的书信、风景／遗迹／日常，而非控诉清单。对照：阮俊《成为祖先的幽灵》(2019，沙迦双年展 14) 四联屏。占婆史与核电只作短脚手架。",
  work: {
    title: "Letters from Panduranga / 来自潘朗的信",
    artist: "Nguyễn Trinh Thi（阮静诗）",
    medium: "单频道影像散文（约 35′，越南语，书信体旁白）",
    venue: "Jeu de Paume Satellite 8（巴黎，2015）→ CAPC；M+ 收藏",
    year: "2015",
    see: "双声书信叠在风景与日常上：省略被做成可听可见的间隙，而非替「他者」立传。",
  } as WorkSpine,
  workContrast: {
    title: "The Specter of Ancestors Becoming / 成为祖先的幽灵",
    artist: "Tuan Andrew Nguyen（阮俊）",
    medium: "四联屏视频装置",
    venue: "沙迦双年展 14（2019）；后于 RAW 等重演",
    year: "2019",
    see: "跨洋家庭肖像逐渐替换帝国档案：南—南幽灵在多屏空间里擦肩。",
  } as WorkSpine,
  maps: [
    {
      src: "/media/c/champa-seasia-1000-1100.png",
      label: "中南半岛约 1000–1100 CE（辅：潘朗曾在地图上）",
      credit: "Mainland SE Asia c.1000–1100 CE. Wikimedia Commons (CC0).",
    },
    {
      src: "/media/c/indianized-kingdoms-indochina.jpg",
      label: "印度化王国历史图（辅）",
      credit: "Indianized kingdoms in Indochina. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/c/champa-locator.png",
      label: "占婆定位图（辅·角标）",
      credit: "Champa locator. Wikimedia Commons (CC BY-SA 3.0).",
    },
  ],
  breakdown: [
    {
      axis: "作品与展场",
      title: "先外展的影像散文",
      body:
        "脊柱是《来自潘朗的信》本身：书信体、双声、风景优先。展场先在巴黎 Jeu de Paume／CAPC——国际艺术场成为「可说」的出口。对照件阮俊四联屏在沙迦首展，方法并置而非题材等价。本站嵌入 Jeu de Paume 与 MoMA post／RAW 静帧。",
    },
    {
      axis: "解殖民视觉机制",
      title: "拒绝代言；回收省略",
      body:
        "解殖民在镜头伦理：不替占族发言，让官方史的空白与土地并置出声。后殖民国家叙事本身可接棒殖民删除——因此不能只瞄准旧宗主国档案。阮俊对照把法帝国征用的跨洋身体做成「幽灵」，补一条南—南视觉线索。",
    },
    {
      axis: "形式与装置读法",
      title: "书信双声、前景／背景滑动、多屏擦肩",
      body:
        "形式：男／女旁白交换；亲密肖像与远景风景对切；拒绝清单式控诉。阮俊：四联屏迫使身体转向，唇形与声音错位，家庭相册替换档案。读法问：观众站在哪一层「可说」的许可里？",
    },
    {
      axis: "历史与地缘线索（辅）",
      title: "1832／核电／奠边府各一句",
      body:
        "辅线：1832 明命帝吞并潘朗（官方史多省略）；宁顺核电计划曾落笔（后搁置）；1954 法军撤离为阮俊背景。历史只解锁「土地为何可被重新命名」，不写国族长文。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/c/letters-panduranga.jpg",
      title: "Letters from Panduranga (2015)",
      caption: "先看作品静帧：书信体影像的风景与间隙。",
      credit: "Still via Jeu de Paume exhibition materials / artist. Educational citation for class report.",
      href: "https://jeudepaume.org/en/evenement/nguyen-trinh-thi-2/",
      hrefLabel: "Jeu de Paume",
      secondaryHref: "https://www.mplus.org.hk/en/collection/objects/letters-from-panduranga-2018371/",
      secondaryLabel: "M+ 藏品",
      fullBleed: true,
    },
    {
      src: "/media/stills/c/tuan-specter.png",
      title: "对照 · 阮俊《成为祖先的幽灵》(2019)",
      caption: "四联屏装置：幽灵在多通道里成为形式。",
      credit: "Installation view © Kerry Etola Viderot / RAW Material Company; via MoMA post. Educational citation.",
      href: "https://post.moma.org/slender-threads-tuan-andrew-nguyens-the-specter-of-ancestors-becoming/",
      hrefLabel: "MoMA post",
      secondaryHref: "https://trans-seatriennial.gzarts.edu.cn/info/1040/1208.htm",
      secondaryLabel: "三年展中文页",
    },
  ] as MediaEmbed[],
  timeline: [
    { year: "2015", event: "《来自潘朗的信》；Jeu de Paume → CAPC" },
    { year: "2019", event: "阮俊《成为祖先的幽灵》沙迦双年展 14" },
    { year: "2022", event: "阮静诗文献展十五节点" },
    { year: "（辅）1832", event: "潘朗被吞并——解锁「省略」母题" },
  ] as TimelineItem[],
  elsewhere: "展场链：巴黎／波尔多；对照链：沙迦／达喀尔。",
}

export const nodeD = {
  id: "act2d",
  eyebrow: "例证 D · 泰国 ↔ 德国／日本",
  title: "朗姜：把纪念碑复制进文献展",
  vo: "先看文献展里的翼板与数字标题：纪念碑被做成可检验的物件，日期变成可读的形式。",
  railCallback: "本证回扣：可见性推到公共神圣物——复制纪念碑，就是拆解纪念装置。",
  thesis:
    "「246247… 无人生还」以复制翼板、肖像、访客簿与视频，把国家纪念的神圣性抽空；解殖民读法落在装置如何改写纪念碑，而非泰缅铁路史（短名单误系已纠错）。",
  lead:
    "作品：阿林·朗姜「246247596248914102516 … 无人生还」(2017)，为 documenta 14 创作（卡塞尔 Neue Neue Galerie 等）。看见什么：等比民主纪念碑翼板复制、大使肖像油画、访客簿复制、约 46 分钟视频。曼谷民主纪念碑照片是母题现场，不是另一部战争史的入口。",
  work: {
    title: "246247596248914102516 … And then there were none",
    artist: "Arin Rungjang（阿林·朗姜）",
    medium: "雕塑复制＋油画＋档案复制＋单频道视频（约 46′）",
    venue: "documenta 14，卡塞尔（2017）；Gallery VER 曼谷个展",
    year: "2017",
    see: "翼板离开广场、进入展厅：神圣尺度变成可绕行、可对照肖像与录像的物件。",
  } as WorkSpine,
  hero: {
    src: "/media/d/democracy-monument-bangkok.jpg",
    alt: "曼谷民主纪念碑（作品母题现场）",
    credit:
      "Democracy Monument, Phra Nakhon, Bangkok (2016). Wikimedia Commons (CC BY-SA 4.0).",
  },
  digits: [
    { digit: "24", note: "形式：1932-06-24 被编码进翼高象征——点读的是标题美学" },
    { digit: "62", note: "形式：佛／泰历与尺度叙事交错（Ha Thuc 解码线索）" },
    { digit: "47", note: "形式：日期串续位，革命被写成可读字符串" },
    { digit: "59", note: "形式：数字把仪式时间变成展题" },
    { digit: "…", note: "形式：长标题本身是装置的一部分" },
    { digit: "无人生还", note: "借克里斯蒂书名谱系——命名暴力进入作品标题层" },
  ],
  breakdown: [
    {
      axis: "作品与展场",
      title: "文献展里的纪念碑复制",
      body:
        "脊柱是 documenta 14 装置整体：翼板、肖像、玻璃柜档案、视频。卡塞尔白墙抽空户外纪念的崇拜感。本站以民主纪念碑 CC 照片作母题入口，嵌入 artpress／ShanghART 装置静帧。",
    },
    {
      axis: "解殖民视觉机制",
      title: "拆神圣性；暴露删除",
      body:
        "复制＝去光环：国家「民主」象征变成可检验的物件。视频把课本鲜少出现的泰—轴心通道与家族创伤叠进同一装置——解殖民是让被删的视觉通道重新可见，不是另写铁路苦役史。",
    },
    {
      axis: "形式与装置读法",
      title: "数字标题、等比复制、口述＋档案",
      body:
        "读标题字符串如读纪念碑尺度；绕行翼板如绕行一座被搬进室内的「假神圣」。肖像与访客簿复制提供物证美学；视频开场口述把微观身体接上宏观象征。诗学优先于史家举证链（Ha Thuc）。",
    },
    {
      axis: "历史与地缘线索（辅）",
      title: "1932／轴心／柏林各一句",
      body:
        "辅线：立宪革命日、泰日同盟与朱辛／地堡访客簿、父亲在柏林遇害。足够听懂装置，不写二战编年。死亡铁路＝误系，仅纠错卡。",
    },
  ] as AnalysisAxis[],
  correction: {
    title: "纠错｜短名单曾误系「死亡铁路」",
    body: "本作品主题是民主纪念碑装置与泰—轴心删除史，不是泰缅死亡铁路。铁路图仅纠错可视化。",
    mapSrc: "/media/d/death-railway-map.png",
    mapCredit:
      "Map of the Burma–Siam «Death Railway». Wikimedia Commons (CC BY-SA 3.0). 【仅纠错页】",
    powSrc: "/media/d/pow-camps-siam-burma-railway.jpg",
    powCredit:
      "POW camps along the Siam–Burma railway. Wikimedia Commons (CC BY-SA 4.0). 【仅旁注】",
  },
  embeds: [
    {
      src: "/media/stills/d/arin-install-artpress.jpg",
      title: "documenta 14 装置静帧",
      caption: "先看展场：翼板与物件，而非铁路地图。",
      credit: "Installation view, courtesy of the artist; via artpress (2018). Educational citation.",
      href: "https://www.documenta14.de/en/artists/13599/arin-rungjang",
      hrefLabel: "documenta 14",
      secondaryHref: "https://trans-seatriennial.gzarts.edu.cn/info/1040/1206.htm",
      secondaryLabel: "Ha Thuc 专文",
      fullBleed: true,
    },
    {
      src: "/media/stills/d/arin-shanghart.jpg",
      title: "ShanghART／展览叙述配图",
      caption: "装置作为研究型拼图的视觉证据。",
      credit: "ShanghART gallery archive image. Educational citation.",
      href: "https://www.shanghartgallery.com/galleryarchive/texts/id/11438",
      hrefLabel: "ShanghART 文本",
    },
  ] as MediaEmbed[],
  timeline: [
    { year: "2017", event: "documenta 14 呈现本作品；Gallery VER 个展" },
    { year: "2013", event: "威尼斯双年展泰国馆《金色泪珠》（背景作品）" },
    { year: "（辅）1932-06-24", event: "立宪日——标题数字源" },
  ] as TimelineItem[],
  elsewhere: "展场：卡塞尔／雅典；母题现场：曼谷民主纪念碑。",
}

export const nodeE = {
  id: "act2e",
  eyebrow: "例证 E · 马来西亚／苏禄海 ↔ 西／美／英",
  title: "Yee I-Lann《苏禄故事》：档案接缝留在画面上",
  vo: "先看数码拼贴：海天与殖民档案并置——解殖民发生在接缝，不在复原一个更纯的过去。",
  railCallback: "本证回扣：神圣被拆后，档案分类权仍留在画面接缝——形式即论证。",
  thesis:
    "《苏禄故事》用数码并置撕开殖民海图与民族志摄影的分类权；形式本身就是解殖民论证。海图只作帝国凝视的辅线入口。",
  lead:
    "作品系列：Yee I-Lann《苏禄故事》(Sulu Stories, 2005)，数码拼贴／档案色素喷墨。森美术馆藏《群岛》(The Archipelago)、《Barangay》等。看见什么：群岛风景与殖民档案碎片的可见接缝。Dalrymple 海图是「帝国怎么画海」的辅线对照，不是正文。",
  work: {
    title: "Sulu Stories（《群岛》《Barangay》等）",
    artist: "Yee I-Lann",
    medium: "数码拼贴／档案色素喷墨",
    venue: "森美术馆等收藏；SAM 等有系列叙述",
    year: "2005",
    see: "接缝外露的并置：档案相机的分类权被留在画面表面，供观看者拆解。",
  } as WorkSpine,
  charts: [
    {
      src: "/media/e/dalrymple-borneo-sulu-1769.jpg",
      label: "Dalrymple 1769 海图（辅：帝国凝视对照）",
      credit:
        "Alexander Dalrymple, map of part of Borneo and the Sooloo Archipelago, 1769. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/e/sulu-1848-1899.jpg",
      label: "苏禄相关历史图 1848–1899（辅）",
      credit: "Historical map related to Sulu, 1848–1899. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/e/moro-sultanates.jpg",
      label: "摩洛苏丹国示意（辅）",
      credit: "Moro sultanates schematic. Wikimedia Commons (CC BY-SA 4.0).",
    },
  ],
  breakdown: [
    {
      axis: "作品与展场",
      title: "系列作品进白墙认证",
      body:
        "脊柱是 2005 系列本身；森美／SAM 收藏把解殖民图像再次框进全球机构。本站嵌入 Universes 公开教育静帧，海图仅作对照层。",
    },
    {
      axis: "解殖民视觉机制",
      title: "改写凝视，不装回纯洁起源",
      body:
        "用殖民档案「原料」做解殖民图像：风险是再美学化，策略是把接缝留白——真实性被做成可见问题。群岛／barangay 语法对抗国境中心叙事。",
    },
    {
      axis: "形式与装置读法",
      title: "数码并置、长条构图、档案碎片",
      body:
        "横向长幅迫使扫视如读海图；拼贴边缘不修干净。读法：哪一块是「风景」，哪一块是「档案」？观众的分类动作本身被作品预演。",
    },
    {
      axis: "历史与地缘线索（辅）",
      title: "国界切割海洋——一句够用",
      body:
        "辅线：西／美／英殖民层与马—菲国境切开苏禄跨海世界。只为听懂为何「群岛」是形式政治，不写海事编年。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/e/archipelago.jpg",
      title: "《群岛》The Archipelago (2005)",
      caption: "先看作品：接缝在画面上。",
      credit: "Yee I-Lann, The Archipelago, 2005. Photo: Yee I-Lann / via Universes in Universe. Educational citation.",
      href: "https://www.mori.art.museum/en/collection/2380/index.html",
      hrefLabel: "森美藏品",
      fullBleed: true,
    },
    {
      src: "/media/stills/e/barangay.jpg",
      title: "《Barangay》(2005)",
      caption: "群岛／社区单位作为形式选择。",
      credit: "Yee I-Lann, Barangay, 2005. Photo: Yee I-Lann / via Universes in Universe. Educational citation.",
      href: "https://www.mori.art.museum/en/collection/2379/index.html",
      hrefLabel: "森美藏品",
    },
  ] as MediaEmbed[],
  supportTip: {
    text: "Support 脚注｜Khvay Samnang「通往神灵之路」：土地／仪式线另案，不占本 Core 作品脊柱。",
  },
  timeline: [
    { year: "2005", event: "《苏禄故事》系列（《群岛》《Barangay》）" },
    { year: "（辅）1769", event: "Dalrymple 海图——帝国凝视对照" },
  ] as TimelineItem[],
}

export const nodeF = {
  id: "act2f",
  eyebrow: "例证 F · 新加坡 ↔ 英国",
  title: "《艺术家与帝国》与莱佛士像：展览与纪念碑装置",
  vo: "先看展览标题与河边雕像：谁在「面对」帝国，谁把零点做成可争议的纪念装置。",
  railCallback: "本证回扣：个人拼贴之上是机构展示——展览副标题与官方纪念工程完成加压链。",
  thesis:
    "展览副标题从伦敦「Facing」到新加坡「(En)countering」是策展语法战；2019 官方「隐形」莱佛士是国家收编解殖民外观的视觉工程。雕像与展墙才是脊柱。",
  lead:
    "脊柱两端：① 泰特《Artist and Empire: Facing Britain’s Imperial Past》（2015–16）与新加坡国家美术馆版 *(En)countering Colonial Legacies*（2016–17）；② 河畔莱佛士像（常见为 1972 复制品）及 2019 二百周年「隐形」＋《Arrival》先驱并置。读的是展览与纪念装置，不是建国编年。",
  work: {
    title: "Artist and Empire（Tate → NGS）",
    artist: "策展：Alison Smith 等／Low Sze Wee、Melinda Susanto 等",
    medium: "大型主题展（馆藏＋当代回应）",
    venue: "Tate Britain（2015–16）→ 新加坡国家美术馆（2016–17）",
    year: "2015–2017",
    see: "同一展览品牌，两种副标题语法：面对 vs（En）counter——谁的藏品、谁的当代补丁。",
  } as WorkSpine,
  workContrast: {
    title: "莱佛士河畔像与 2019「隐形」／Arrival",
    medium: "公共纪念雕塑＋官方委托视觉工程",
    venue: "新加坡河 Raffles Landing Site",
    year: "1887／1972 复制；2019 二百周年干预",
    see: "复制品比「真身」更常被看见；涂装隐形与旁置先驱把反思做成可管理的景观。",
  } as WorkSpine,
  statue: {
    src: "/media/f/raffles-statue-singapore-river.jpg",
    front: "/media/f/raffles-statue-front.jpg",
    alt: "新加坡河畔莱佛士像（多为 1972 复制品视觉）",
    credit:
      "Statue of Stamford Raffles at the Singapore River. Photo: Calvin Teo / Wikimedia Commons (CC BY-SA 3.0).",
    frontCredit:
      "Stamford Raffles statue, Singapore. Wikimedia Commons (CC BY-SA 2.0).",
    note: "河畔常见视觉多为 1972 聚合大理石复制品；1887 Woolner 铜像为原作——勿写成「真身在此」。",
  },
  portraits: [
    {
      src: "/media/f/raffles-portrait-stamford.jpeg",
      label: "莱佛士历史肖像（辅：绅士形象）",
      credit: "Portrait of Stamford Raffles. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/f/raffles-portrait-joseph.jpg",
      label: "George Francis Joseph 肖像（辅）",
      credit:
        "George Francis Joseph, portrait of Sir Thomas Stamford Bingley Raffles. Wikimedia Commons (public domain).",
    },
  ],
  titleDuel: [
    {
      side: "泰特不列颠 2015–16",
      title: "Artist and Empire",
      subtitle: "Facing Britain’s Imperial Past",
      critique: "策展语法：「面对」若只动员宗主国馆藏，易成自我独白。",
    },
    {
      side: "新加坡国家美术馆 2016–17",
      title: "Artist and Empire",
      subtitle: "(En)countering Colonial Legacies",
      critique: "增补东南亚与当代回应；亦被批宣传／再现有「再殖民」意味——展览本身成争议场。",
    },
  ],
  invisible2019: {
    title: "2019｜官方「隐形」与 Arrival（纪念装置）",
    body: "委托涂装使莱佛士融入背景，旁置 Sang Nila Utama 等先驱雕像——解殖民外观被收编进建国仪式。下方静帧见证并置工程；不 AI 伪造涂装效果。",
  },
  breakdown: [
    {
      axis: "作品与展场",
      title: "双城展览＋公共雕像",
      body:
        "脊柱是展览双城版本与河畔纪念装置。馆舍占据前殖民司法／市政建筑——展场建筑即遗产。本站嵌泰特展览图像与 Wikimedia 二百周年先驱雕像。",
    },
    {
      axis: "解殖民视觉机制",
      title: "副标题战争；消失也是展示",
      body:
        "Facing vs (En)countering＝谁拥有帝国叙事的视觉权。官方「隐形」是可见性管理：反思被景观化。与 Core B Utama 互文：同一莱佛士神话，一边被拆成可替换脸，一边被做成周年视觉工程。",
    },
    {
      axis: "形式与装置读法",
      title: "标题对位、肖像 dissolve、并置先驱",
      body:
        "UI 对位两城副标题；肖像与河畔复制像 dissolve 追问「真身」；Arrival 群像构图稀释／重组零点。读法：消失、并置、复制——三种纪念形式策略。",
    },
    {
      axis: "历史与地缘线索（辅）",
      title: "1819 零点叙事一句",
      body:
        "辅线：1819 登陆／条约被写成现代零点。足够理解雕像政治；建国全史不下沉。Support：documenta15／Taring Padi 撤展＝另一场展览记忆秩序翻车。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/f/artist-empire-tate-1.jpg",
      title: "Artist and Empire · Tate 展览视觉",
      caption: "先看展览如何「面对」——藏品与语法。",
      credit: "Tate Britain exhibition imagery. Educational citation.",
      href: "https://www.tate.org.uk/whats-on/tate-britain/artist-and-empire",
      hrefLabel: "Tate 展览页",
      fullBleed: true,
    },
    {
      src: "/media/stills/f/pioneers-arrival-2019.jpg",
      title: "2019 · Arrival 先驱雕像群",
      caption: "纪念装置：并置作为策展／国家视觉。",
      credit:
        "Statues of Singaporean pioneers at Raffles' Landing Site. Wikimedia Commons (CC). Educational citation.",
      href: "https://commons.wikimedia.org/wiki/File:Statues_of_Singaporean_Pioneers_at_the_Raffles%27_Landing_Site_-_three-quarter_front_view.jpg",
      hrefLabel: "Wikimedia",
    },
    {
      src: "/media/stills/f/sang-nila-utama-2019.jpg",
      title: "Sang Nila Utama 像（二百周年现场）",
      caption: "与 Utama 作品互文：神话进入公共雕塑。",
      credit:
        "Statue of Sang Nila Utama at Raffles Landing Site. Wikimedia Commons (CC). Educational citation.",
      href: "https://commons.wikimedia.org/wiki/File:Statue_of_Sang_Nila_Utama_at_the_Raffles_Landing_Site_(front_view).jpg",
      hrefLabel: "Wikimedia",
    },
  ] as MediaEmbed[],
  supportTip: {
    text: "Support｜documenta fifteen／Taring Padi：解殖民大展亦可在记忆秩序里翻车——展览装置本身成现场。",
    href: "https://documenta-fifteen.de/en/press-releases/statement-by-taring-padi-on-dismantling-peoples-justice/",
  },
  timeline: [
    { year: "2015–16", event: "泰特《艺术家与帝国》" },
    { year: "2016–17", event: "新加坡版 (En)countering Colonial Legacies" },
    { year: "2019-01", event: "二百周年：隐形＋ Arrival" },
    { year: "1972", event: "河畔复制像——今日常见视觉" },
  ] as TimelineItem[],
}

export const supportStrip = {
  id: "act2support",
  eyebrow: "Support · 非 Core 短笺",
  title: "下放与旁注",
  lead: "不进主滚动作品脊柱；仅保留与东南亚艺术场相关的极短 Support。",
  items: [
    {
      title: "documenta fifteen／Taring Padi",
      body: "《人民的正义》撤展：展览记忆秩序——已在 Core F 角标。",
    },
    {
      title: "Khvay Samnang",
      body: "「通往神灵之路」——已在 Core E 脚注。",
    },
    {
      title: "爱知「表现的不自由」",
      body: "仅在 Core B Hotel Aporia 旁半句桥。",
    },
    {
      title: "台展／陈界仁／兽首／曾灶财",
      body: "已从主滚动切除。",
    },
  ],
}
