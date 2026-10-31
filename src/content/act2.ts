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

export const act2Intro = {
  eyebrow: "第二幕 · 现象",
  title: "展示与回收：东南亚六案",
  lead:
    "六个锁定节点 A–F。每个案例从一个地方出发，答案却牵出另一个地方。媒体优先：公版图、博物馆／展览／新闻静帧内嵌；分析按解殖民机制、国家与地方、文化与展演、媒体装置四轴展开。",
}

export const nodeA = {
  id: "act2a",
  eyebrow: "Core A · 印尼 ↔ 荷兰",
  title: "一场战争，两幅画，三次归还",
  vo: "同一天、同一人：一边叫投降，一边叫捕获。标题本身，就是权力。",
  thesis:
    "同一场爪哇战争被两幅画写成「投降」与「捕获」；三次归还与 bersiap 之争证明：馆藏与展墙用词仍是殖民权力的现役装置。",
  lead:
    "爪哇战争（1825—1830）以迪波内格罗亲王在谈判中被扣押告终。荷兰视角的皮内曼把事件画成「投降」；爪哇贵族画家萨勒赫（1857）改写成「捕获」。标题即权力。",
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
      axis: "解殖民机制",
      title: "标题即权力：投降 ↔ 捕获",
      body:
        "同一谈判扣押被写成两种道德语法。Pieneman（约 1835，德·科克委托）把暴力仪式化为「和平屈服」；Saleh（1857）改写为「被捕」。解殖民首先发生在命名层——谁命名事件，谁分配观看者的道德位置。献画给威廉三世又说明：爪哇叙事进入帝国宫廷交换链，回收不等于脱离回路。",
    },
    {
      axis: "国家与地方",
      title: "雅加达总统府 ↔ 阿姆斯特丹／莱顿",
      body:
        "1978 画归还、2020-03 kris（圣剑）自莱顿世界博物馆交还、2022 Rijksmuseum《Revolusi!》联合策展——三次「归还」都在荷兰决策场与印尼象征资本之间穿梭。收藏权移动，叙述权也在移动，但不自动等于解殖民完成。跨地方两端是 Istana Negara／国家博物馆 ↔ Rijksmuseum／Volkenkunde。",
    },
    {
      axis: "文化与展演效应",
      title: "bersiap 成为展墙战场",
      body:
        "2022-01-10 Bonnie Triyana 在《NRC》说明停用 bersiap 笼统指称；01-21 KUKB／Jeffry Pondaag 报案指控种族主义与集体诽谤。同年 Rutte 就殖民战争暴力道歉。解殖民展览自身成为记忆秩序战场：停用一个荷语创伤标签，被另一批记忆政治主体读成抹杀。",
    },
    {
      axis: "媒体装置",
      title: "委托—入藏—标签—新闻稿",
      body:
        "Pieneman 由将军委托 → 殖民自我正当性可视化；Saleh 长期留荷至 1978；展墙用词、总统府借展与新闻稿构成现役装置。本站以双画 compare slider＋OA 档案片段承载机制；Revolusi! 展场以馆方 press 链与时间线节点呈现，不伪造展场写真。",
    },
  ] as AnalysisAxis[],
  timeline: [
    { year: "1825–1830", event: "爪哇战争；以亲王被扣押告终" },
    { year: "1835", event: "Pieneman《投降》；德·科克委托" },
    { year: "1857", event: "Saleh《捕获》完成并献威廉三世" },
    { year: "1907", event: "Pieneman 画入藏 Rijksmuseum" },
    { year: "1978", event: "第一次归还：Saleh 画回到雅加达总统府" },
    { year: "2020-03", event: "第二次归还：亲王圣剑（kris）交还；国家博物馆遗物展" },
    { year: "2022-01", event: "Triyana《NRC》停用 bersiap；KUKB 报案——用词成战场" },
    { year: "2022-02–06", event: "第三次节点：Rijksmuseum《革命！独立的印度尼西亚》" },
  ] as TimelineItem[],
  elsewhere: "牵出的另一个地方：荷兰——收藏、归还决定与展墙用词的争吵都在那里。",
  revolusiNote:
    "Revolusi!（2022-02-11—06-05）把独立战争叙述权部分交还给印尼联合策展人；展场商业摄影未全量镜像，节点以时间线＋馆方 press 链接呈现。",
  embeds: [
    {
      src: "/media/a/saleh.jpg",
      title: "Saleh《捕获》全幅（公版）",
      caption: "1978 归还后藏雅加达总统府——回家亦进入国家象征资本。",
      credit: "Raden Saleh, 1857. Wikimedia Commons (public domain).",
      href: "https://commons.wikimedia.org/wiki/File:Raden_Saleh_-_Diponegoro_arrest.jpg",
      hrefLabel: "Wikimedia",
      fullBleed: true,
    },
  ] as MediaEmbed[],
}

export const nodeB = {
  id: "act2b",
  eyebrow: "Core B · 新加坡 ↔ 英国／日本",
  title: "先有作战区，才有「东南亚」这个名字",
  vo: "先有作战区，才有「东南亚」这个名字。盟军与帝国，都在给这片海陆贴标签。",
  thesis:
    "「东南亚」不是地理自明，而是盟军 SEAC／冷战区域研究与日帝「南方」话语共同锻造的命名装置；何子彦把名称与帝国思想史拆成可观看的知识生产现场。",
  lead:
    "何子彦（Ho Tzu Nyen）以《东南亚批判词典》(CDOSEA)、《Utama》与《Hotel Aporia》追问：一个从未被单一语言、宗教或政治统一的地区，凭什么叫「东南亚」？",
  maps: [
    {
      id: "1941",
      src: "/media/b/pacific-war-se-asia-1941.jpg",
      label: "太平洋战争 · 东南亚 1941",
      credit: "Pacific War — Southeast Asia, 1941. Wikimedia Commons (public domain).",
    },
    {
      id: "1942",
      src: "/media/b/pacific-war-southern-asia-1942.jpg",
      label: "太平洋战争 · 南方亚洲 1942",
      credit: "Pacific War — Southern Asia, 1942. Wikimedia Commons (public domain).",
    },
  ],
  empireMaps: [
    {
      src: "/media/b/japanese-empire-1942.svg",
      label: "日帝疆域示意 1942",
      credit: "Japanese Empire, 1942. Wikimedia Commons (CC BY-SA 3.0).",
    },
    {
      src: "/media/b/greater-east-asia-co-prosperity.png",
      label: "大东亚共荣圈示意",
      credit: "Greater East Asia Co-Prosperity Sphere. Wikimedia Commons (CC BY-SA 3.0).",
    },
  ],
  wordChips: [
    { key: "SEAC", hint: "盟军司令部", reveal: "South East Asia Command（约 1943）把「解放」写成再进入的许可——命名的道德外观与旧宗主联盟同体。" },
    { key: "Southern", hint: "日帝「南方」", reveal: "盟军叫它东南亚，帝国叫它南方——两边都在命名，区域没有内生统一。" },
    { key: "Utama", hint: "创始神话", reveal: "同一演员扮演 Sang Nila Utama 与莱佛士等「发现者」：发现语法可换脸，权力结构不变。" },
    { key: "tiger", hint: "CDOSEA 词条", reveal: "词典不断重排图像与声音——区域形状漂移，而非给出正确定义。" },
    { key: "theodolite", hint: "测量器械", reveal: "测量与制图把热带写成可治理对象；词典把「工具」本身做成词条。" },
    { key: "Hotel Aporia", hint: "爱知 2019", reveal: "京都学派、特攻旅馆与「南方」宣传班叠在同一喜乐亭——日帝话语的幽灵基础设施。" },
    { key: "Voice of Void", hint: "YCAM 2021", reveal: "重演京都学派「世界史的立场与日本」座谈：思想史被做成可进入的空洞。" },
    { key: "Aichi tip", hint: "半句旁注", reveal: "同届「表现的不自由」关展＝解殖民展亦可成权力场（详交同学；此处不占主轴）。" },
  ],
  breakdown: [
    {
      axis: "解殖民机制",
      title: "名称先于统一；发现者可换脸",
      body:
        "「东南亚」流行与盟军 SEAC（约 1943-11）相关：解放外观与旧殖民宗主联盟同体。Utama（2003，The Substation）用同一身体扮演 Sang Nila Utama 与莱佛士等发现者——创始神话的可替换性被做成影像。CDOSEA（2012—；2017—算法视频）不以正确词条替换错误词条，而以无限重组暴露区域的形状漂移。",
    },
    {
      axis: "国家与地方",
      title: "盟军司令部／冷战区域学 ↔ 日帝「南方」",
      body:
        "英国帝国命名与莱佛士神话、日本占领／京都学派／爱知—YCAM—MOT 展出场、美国冷战「东南亚研究」共同固化此名。跨地方结构：名称的两端在盟军司令部与日本帝国话语，不在「本地自然地理」。",
    },
    {
      axis: "文化与展演效应",
      title: "幽灵旅馆与算法词典",
      body:
        "Hotel Aporia（2019，爱知三年展喜乐亭）：六频装置叠京都学派、小津、横山隆一「南方」宣传班与特攻队——思想史被做成可进入的旅馆。同届「表现的不自由」关展半句旁注：解殖民展亦可成权力场。算法词典看似去中心，仍由艺术家选材与展制托管。",
    },
    {
      axis: "媒体装置",
      title: "战区图、词条芯片、馆方静帧",
      body:
        "本站以 1941↔1942 战区图 crossfade＋日帝疆域图层承担命名时代视觉（战区图≠SEAC 官方疆域）；CDOSEA 以自做词条芯片模拟重排；Utama／Hotel Aporia 嵌入 MOT／ART iT／爱知三年展公开静帧与 SAM 叙述图，标注教育引用。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/b/utama-mot.jpg",
      title: "Utama — Every Name in History Is I（展场／作品视觉）",
      caption: "同一张脸：乌塔马，也是莱佛士。首展 2003 The Substation；后入新加坡国家美术馆等收藏叙述。",
      credit: "Installation/work view via ART iT photo report (MOT A for Agents context). Educational fair-use still.",
      href: "https://www.hotzunyen.com/",
      hrefLabel: "艺术家官网",
      secondaryHref: "https://www.art-it.asia/en/top_e/admin_expht_e/246876/",
      secondaryLabel: "ART iT 现场",
    },
    {
      src: "/media/stills/b/cdosea-sam.png",
      title: "CDOSEA／形状漂移的区域",
      caption: "新加坡美术馆藏品叙述页配图：词典不断重排，区域没有固定形状。",
      credit: "Singapore Art Museum story image (Ho Tzu Nyen / shapeshifting region). Educational citation.",
      href: "https://www.singaporeartmuseum.sg/about/our-collection/stories/a-shapeshifting-region",
      hrefLabel: "SAM 藏品叙述",
    },
    {
      src: "/media/stills/b/hotel-aporia-aichi.jpg",
      title: "Hotel Aporia（2019）· 爱知三年展喜乐亭",
      caption: "京都学派、特攻旅馆与「南方」宣传班叠在同一空间——日帝话语的幽灵基础设施。",
      credit: "Aichi Triennale 2019 artwork page still. Educational citation.",
      href: "https://aichitriennale2010-2019.jp/2019/en/artwork/T04.html",
      hrefLabel: "爱知三年展页",
      secondaryHref: "https://www.art-it.asia/en/top_e/admin_ed_feature_e/212453/",
      secondaryLabel: "ART iT 访谈静帧",
      fullBleed: true,
    },
  ] as MediaEmbed[],
  timeline: [
    { year: "1299 / 1819", event: "Sang Nila Utama 传说登陆与莱佛士登陆：两个创始神话" },
    { year: "1941–42", event: "太平洋战争东南亚／南方战区成形" },
    { year: "1943-11", event: "盟军 SEAC 相关建制；「东南亚」命名流行节点【待核精确日】" },
    { year: "2003", event: "《Utama》首展 The Substation" },
    { year: "2012–", event: "《东南亚批判词典》统摄创作" },
    { year: "2017–", event: "CDOSEA 算法视频／在线平台" },
    { year: "2019", event: "《Hotel Aporia》；同届「表现的不自由」关展＝半句旁注" },
    { year: "2021", event: "YCAM《Voice of Void》" },
    { year: "2023–24", event: "MOT《A for Agents》；SAM《Time & the Tiger》" },
  ] as TimelineItem[],
  mapNote: "战区图≠ SEAC 官方疆域图；VO／字幕口头区分。",
}

export const nodeC = {
  id: "act2c",
  eyebrow: "Core C · 越南 ↔ 法国",
  title: "地图上有过潘朗；国史里被写掉",
  vo: "地图上有过潘朗；国史里被写掉。占婆末疆，在官方叙事里成了空白。",
  thesis:
    "《来自潘朗的信》把官方史对占婆／潘朗的省略与宁顺核电计划叠在同一土地上；对照阮俊，解殖民必须同时对准宗主国档案与本国删除。",
  lead:
    "阮静诗《来自潘朗的信》(2015)：书信体影像散文。宁顺旧称潘朗，为古占婆末疆；1832 年明命帝吞并一事被官方史叙省略。核电计划曾落笔于此（后搁置）。",
  maps: [
    {
      src: "/media/c/champa-seasia-1000-1100.png",
      label: "中南半岛约 1000–1100 CE（含占婆）",
      credit: "Mainland SE Asia c.1000–1100 CE. Wikimedia Commons (CC0).",
    },
    {
      src: "/media/c/indianized-kingdoms-indochina.jpg",
      label: "印度化王国历史图（含占婆）",
      credit: "Indianized kingdoms in Indochina. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/c/champa-locator.png",
      label: "占婆定位图（角标尺度）",
      credit: "Champa locator. Wikimedia Commons (CC BY-SA 3.0).",
    },
  ],
  breakdown: [
    {
      axis: "解殖民机制",
      title: "官方史省略＝展示的负片",
      body:
        "占婆／潘朗从国族时间线消失，土地便可被重新命名为「宁顺／核电基地」——省略是现役装置，不是过去的疏忽。阮静诗以书信体双声（男／女旁白交换）拒绝「替占族发言」的民族志权威；回收的是省略本身，而非发明完整替代国史。",
    },
    {
      axis: "国家与地方",
      title: "潘朗可见性往往先在巴黎被允许",
      body:
        "作品政治敏感，故先在巴黎 Jeu de Paume（2015-10-20—2016-01-24）与波尔多 CAPC 亮相——国际艺术场成为「可说」的出口，国内叙事场仍握删除权。对照阮俊《成为祖先的幽灵》（2019，沙迦双年展 14）：法军塞内加尔步枪兵与越南女性／混血后代的跨洋记忆——幽灵在达喀尔与潘朗两端共振。",
    },
    {
      axis: "文化与展演效应",
      title: "发展话语下的再侵占；南—南幽灵",
      body:
        "核电＝发展外观承接殖民测量与冷战基础设施逻辑。反讽：后殖民国家官方史同样省略他者（占婆）——解殖民不能只瞄准旧宗主国。阮俊线索：被殖民者被征去镇压另一被殖民者，家庭肖像逐渐替换帝国档案。",
    },
    {
      axis: "媒体装置",
      title: "地图 overlay × 影片静帧 × 四联屏对照",
      body:
        "本站以占婆历史地图高亮潘朗／宁顺；嵌入 Jeu de Paume 公开静帧与 MoMA post／RAW 装置照作为教育引用；双屏方法对照（书信 VO 句 ↔ 幽灵一句），非等价作品。禁止 AI 伪造占族肖像或伪电影静帧。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/c/letters-panduranga.jpg",
      title: "Letters from Panduranga (2015) · Jeu de Paume 公开静帧",
      caption: "约 35 分钟越南语影像散文。Satellite 8；M+ 藏。她不替占族发言；她让省略自己出声。",
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
      caption: "四联屏；沙迦双年展 14。法军塞内加尔步枪兵与越南女性／混血后代的跨洋记忆。",
      credit: "Installation view © Kerry Etola Viderot / RAW Material Company; via MoMA post. Educational citation.",
      href: "https://post.moma.org/slender-threads-tuan-andrew-nguyens-the-specter-of-ancestors-becoming/",
      hrefLabel: "MoMA post",
      secondaryHref: "https://trans-seatriennial.gzarts.edu.cn/info/1040/1208.htm",
      secondaryLabel: "三年展中文页",
    },
  ] as MediaEmbed[],
  timeline: [
    { year: "c.1000–1100", event: "占婆等印度化王国并存（地图视觉节点）" },
    { year: "1832", event: "明命帝吞并占婆末疆潘朗；官方史叙多省略" },
    { year: "1954", event: "奠边府／日内瓦；法军撤离——阮俊对照背景" },
    { year: "2015", event: "《来自潘朗的信》；Jeu de Paume → CAPC" },
    { year: "2019", event: "阮俊《成为祖先的幽灵》沙迦双年展 14" },
    { year: "2022", event: "阮静诗出现于文献展十五节点" },
  ] as TimelineItem[],
  elsewhere: "牵出的另一个地方：法国（展出场与法殖人口流动）、美国（越战毒性遗产）、塞内加尔／沙迦（阮俊）。",
}

export const nodeD = {
  id: "act2d",
  eyebrow: "Core D · 泰国 ↔ 德国／日本",
  title: "先看见纪念碑的数字，再听见谁被删掉",
  vo: "先看见纪念碑的数字，再听见谁被删掉。日期做成高度，仪式时间被编码进尺度。",
  thesis:
    "朗姜把民主纪念碑的数字象征、泰—轴心删除史与父亲死于新纳粹的微观创伤编进文献展装置；研究型艺术回收的是被课本抹去的通道——而非（短名单误写的）死亡铁路。",
  lead:
    "阿林·朗姜「246247596248914102516 … 无人生还」(2017)，为 documenta 14 创作。母题是曼谷民主纪念碑、1932 立宪革命、泰—轴心／驻德大使朱辛与希特勒地堡访客簿，以及艺术家父亲在柏林被新纳粹殴打致死。",
  hero: {
    src: "/media/d/democracy-monument-bangkok.jpg",
    alt: "曼谷民主纪念碑",
    credit:
      "Democracy Monument, Phra Nakhon, Bangkok (2016). Wikimedia Commons (CC BY-SA 4.0).",
  },
  digits: [
    { digit: "24", note: "1932-06-24 立宪革命之日；翼高常被读作 24 米象征【待核馆方标牌原文】" },
    { digit: "62", note: "佛历／泰历换算与纪念碑尺度叙事的交错节点（Ha Thuc 解码线索）" },
    { digit: "47", note: "日期串的续位：革命被量成可朗读的权力公式" },
    { digit: "59", note: "数字美学把国家仪式时间编码进尺度" },
    { digit: "…", note: "标题长串继续延伸；点读不必穷尽每一位，关键是「日期做成高度」" },
    { digit: "无人生还", note: "借克里斯蒂书名谱系——连通俗小说命名也是殖民种族主义残留" },
  ],
  breakdown: [
    {
      axis: "解殖民机制",
      title: "数字美学与删除史",
      body:
        "民主纪念碑把 1932-06-24 革命日期编码进尺度——谁记住数字，谁拥有仪式时间。泰日结盟／轴心与驻德大使朱辛仰慕希特勒、地堡访客簿泰名等段落在泰国课本中鲜少出现。复制翼板进文献展，抽空户外纪念的神圣性，变成可检验的物件。",
    },
    {
      axis: "国家与地方",
      title: "曼谷纪念碑的另一端在卡塞尔与柏林",
      body:
        "documenta 14（卡塞尔／雅典）：翼板复制、大使肖像、访客簿复制、约 46 分钟视频。德国是源地（地堡、父亲遇害、新纳粹），日本是占领与泰日同盟的另一极。跨地方：泰国民主象征必须穿过卡塞尔白墙才被全球看见。",
    },
    {
      axis: "文化与展演效应",
      title: "研究型≠学术论文；短名单也会误命名",
      body:
        "Ha Thuc 强调诗学优先于举证：家族口述 × 访客簿 × 回忆录 × 纪念碑复制。短名单曾误系「死亡铁路」——提醒研究型艺术的传播本身也会被错误命名。标题借用克里斯蒂书名的殖民种族主义史，连通俗小说命名都是帝国残留。",
    },
    {
      axis: "媒体装置",
      title: "纪念碑写真 × 装置静帧 × 纠错卡",
      body:
        "主视觉锁定曼谷民主纪念碑 CC 照片；嵌入 artpress／ShanghART／YouTube 公开装置与视频静帧；死亡铁路图仅出现在红字纠错页，禁止作作品证据。",
    },
  ] as AnalysisAxis[],
  correction: {
    title: "纠错｜短名单曾误系「死亡铁路」",
    body: "三年展 Ha Thuc 专文与 documenta／ShanghART 叙述显示：本作品主题不是泰缅死亡铁路。死亡铁路是另一条二战苦役史，可作同区域基础设施暴力旁注，但禁止作本作品主视觉。",
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
      title: "documenta 14 装置静帧 · 246247… And then there were none",
      caption: "卡塞尔：纪念碑翼板复制、大使肖像、档案与视频。神圣性被抽走，变成可检验的物件。",
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
      caption: "画廊文本把卡塞尔装置读作国族象征与微观创伤的拼图。",
      credit: "ShanghART gallery archive image. Educational citation.",
      href: "https://www.shanghartgallery.com/galleryarchive/texts/id/11438",
      hrefLabel: "ShanghART 文本",
    },
  ] as MediaEmbed[],
  timeline: [
    { year: "1932-06-24", event: "暹罗立宪革命；民主纪念碑日后以数字尺度编码此日" },
    { year: "1939–45", event: "朱辛任驻德大使；泰日同盟／轴心；地堡访客簿出现泰名" },
    { year: "1945-04-30", event: "希特勒自杀；访客簿叙事终点锚" },
    { year: "童年", event: "父亲在柏林被新纳粹殴打致死——视频开场口述" },
    { year: "2013", event: "威尼斯双年展泰国馆《金色泪珠》" },
    { year: "2017", event: "documenta 14 呈现本作品；Gallery VER 曼谷个展" },
  ] as TimelineItem[],
  elsewhere: "牵出的另一个地方：德国（documenta、地堡、父亲遇害）、日本（占领与泰日同盟）。",
}

export const nodeE = {
  id: "act2e",
  eyebrow: "Core E · 马来西亚／苏禄海 ↔ 西／美／英",
  title: "先看见帝国怎么画这片海",
  vo: "先看见帝国怎么画这片海。测量与制图，先于国界，把群岛写成可治理对象。",
  thesis:
    "《苏禄故事》用数码并置撕开殖民海图与民族志摄影对群岛的分类权——解殖民发生在档案接缝，而非另造一个纯洁起源。",
  lead:
    "Yee I-Lann《苏禄故事》(2005)：数码拼贴／档案色素喷墨，把苏禄海风景与殖民档案图像并置。现代马—菲国界无法穷尽的跨海世界。",
  charts: [
    {
      src: "/media/e/dalrymple-borneo-sulu-1769.jpg",
      label: "Dalrymple 1769 婆罗洲—苏禄海图",
      credit:
        "Alexander Dalrymple, map of part of Borneo and the Sooloo Archipelago, 1769. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/e/sulu-1848-1899.jpg",
      label: "苏禄相关历史图 1848–1899",
      credit: "Historical map related to Sulu, 1848–1899. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/e/moro-sultanates.jpg",
      label: "摩洛苏丹国示意",
      credit: "Moro sultanates schematic. Wikimedia Commons (CC BY-SA 4.0).",
    },
  ],
  breakdown: [
    {
      axis: "解殖民机制",
      title: "档案相机先于国界",
      body:
        "民族志／殖民摄影凝视把群岛写成可治理对象；英／西／美殖民继承与马／菲国境把苏禄苏丹国式跨海社会切成边防问题。Yee 的数码并置把档案接缝留在画面上——改写凝视，不是装回一个更纯的过去。",
    },
    {
      axis: "国家与地方",
      title: "苏禄海两端：殖民海图 ↔ 东京／新加坡白墙",
      body:
        "西班牙／美国（菲南）、英国（北婆罗洲／砂拉越档案）、日本（森美收藏）、新加坡（SAM）共同构成视觉记忆回路。群岛抵抗国界，但作品流通仍依赖民族国家护照与双年展签证制度。",
    },
    {
      axis: "文化与展演效应",
      title: "群岛语法 vs 大陆—国境中心",
      body:
        "以群岛／barangay 等单位思考，对抗大陆中心叙事。用殖民档案「原料」做解殖民图像——回收可能被读成再美学化暴力。当代政治（沙巴主权声索、海盗叙事）使「故事」无法停留在怀旧。",
    },
    {
      axis: "媒体装置",
      title: "海图缓推 → 数码作品静帧",
      body:
        "进入用 Dalrymple 1769 海图；分界用 1848–1899 图 ↔ 摩洛苏丹国示意；作品嵌入 Universes／森美公开教育静帧（《群岛》《Barangay》），标注来源，不 AI 仿作拼贴。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/e/archipelago.jpg",
      title: "《群岛》The Archipelago (2005)",
      caption: "森美术馆藏。她把档案的接缝留在画面上。",
      credit: "Yee I-Lann, The Archipelago, 2005. Photo: Yee I-Lann / via Universes in Universe. Educational citation.",
      href: "https://www.mori.art.museum/en/collection/2380/index.html",
      hrefLabel: "森美藏品",
      fullBleed: true,
    },
    {
      src: "/media/stills/e/barangay.jpg",
      title: "《Barangay》(2005)",
      caption: "森美术馆藏。群岛／社区单位对抗国境中心叙事。",
      credit: "Yee I-Lann, Barangay, 2005. Photo: Yee I-Lann / via Universes in Universe. Educational citation.",
      href: "https://www.mori.art.museum/en/collection/2379/index.html",
      hrefLabel: "森美藏品",
    },
  ] as MediaEmbed[],
  supportTip: {
    text: "Support 脚注｜Khvay Samnang「通往神灵之路」：土地／仪式／开发线另案，不占本 Core 主轴。",
  },
  timeline: [
    { year: "1769", event: "Dalrymple 婆罗洲—苏禄海图：帝国测量目光" },
    { year: "1848–1899", event: "苏禄相关历史地图时段：殖民切割与苏丹国并存" },
    { year: "19–20 c.", event: "西／美／英殖民层与马—菲国境覆盖苏禄海世界" },
    { year: "2005", event: "《苏禄故事》系列（含《群岛》《Barangay》）" },
  ] as TimelineItem[],
}

export const nodeF = {
  id: "act2f",
  eyebrow: "Core F · 新加坡 ↔ 英国",
  title: "城市的零点，站在河边",
  vo: "城市的零点，站在河边。莱佛士像成为现代新加坡的起点叙事——也是可争议的纪念装置。",
  thesis:
    "《艺术家与帝国》从伦敦「面对」到新加坡「（En）counter」仍争议谁拥有帝国叙事；2019 官方把莱佛士涂到隐形，证明后殖民国家能把解殖民外观收编进建国仪式。",
  lead:
    "新加坡国家美术馆承接泰特《艺术家与帝国》并改写为 *(En)countering Colonial Legacies*。2019 建国二百周年：官方委托把莱佛士河畔像「隐形」，旁置其他先驱——反思，也是管理。",
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
      label: "莱佛士历史肖像",
      credit: "Portrait of Stamford Raffles. Wikimedia Commons (public domain).",
    },
    {
      src: "/media/f/raffles-portrait-joseph.jpg",
      label: "George Francis Joseph 肖像",
      credit:
        "George Francis Joseph, portrait of Sir Thomas Stamford Bingley Raffles. Wikimedia Commons (public domain).",
    },
  ],
  titleDuel: [
    {
      side: "泰特不列颠 2015–16",
      title: "Artist and Empire",
      subtitle: "Facing Britain’s Imperial Past",
      critique: "被批主要用英国馆藏，缺少殖民地一方（尤其东南亚）当代观点。",
    },
    {
      side: "新加坡国家美术馆 2016–17",
      title: "Artist and Empire",
      subtitle: "(En)countering Colonial Legacies",
      critique: "增补东南亚与当代回应；又有评论指宣传／女王形象再现有「再殖民」意味。",
    },
  ],
  invisible2019: {
    title: "2019｜官方「隐形」与 Arrival",
    body: "政府办公室委托 Teng Kai Wei 将莱佛士像涂成与背景融合；Hong Hai Arts《Arrival》旁立 Sang Nila Utama 等另四位「先驱」。下方嵌入二百周年现场先驱雕像公版照片——见证「并置」工程；不 AI 伪造涂装隐形效果图。",
  },
  breakdown: [
    {
      axis: "解殖民机制",
      title: "面对＝自我独白？消失也是展示",
      body:
        "若「面对帝国」只动员宗主国馆藏，则面对＝自我独白。雕像把 1819 写成绝对零点；1972 复制品证明纪念可工业再生。2019 官方让莱佛士隐形＝最精致的可见性管理：消失也是展示，国家吸纳批判外观。",
    },
    {
      axis: "国家与地方",
      title: "谁在伦敦面对，谁在新加坡（En）counter",
      body:
        "泰特不列颠（2015-11-25—2016-04-10）↔ 新加坡国家美术馆（2016-10-06—2017-03-26）。馆舍占据前殖民司法／市政建筑——展示解殖民的场所本身是帝国遗留空间。Support：documenta15／Taring Padi 撤展＝另一场记忆秩序翻车。",
    },
    {
      axis: "文化与展演效应",
      title: "资产负债表式的先驱并置",
      body:
        "四个「先驱」并置可能稀释、而非拆除莱佛士神话。与 Core B Utama 互文：同一莱佛士神话，一边被何子彦拆成可替换脸，一边被国家做成周年视觉工程。评论链（Riello、ArtAsiaPacific、Faris Joraimi）把展览写成持续争议。",
    },
    {
      axis: "媒体装置",
      title: "河畔像 × 泰特展图 × 二百周年先驱雕像",
      body:
        "嵌入泰特《Artist and Empire》公开展览图像与 Wikimedia 二百周年 Arrival／Sang Nila Utama 雕像；标题对决 UI 对位伦敦／新加坡副标题。禁止 AI 合成「涂白隐形」伪新闻图。",
    },
  ] as AnalysisAxis[],
  embeds: [
    {
      src: "/media/stills/f/artist-empire-tate-1.jpg",
      title: "Artist and Empire · Tate Britain 展览视觉",
      caption: "「面对英国的帝国过去」——若只动员宗主国馆藏，面对可能变成自我独白。",
      credit: "Tate Britain exhibition imagery. Educational citation.",
      href: "https://www.tate.org.uk/whats-on/tate-britain/artist-and-empire",
      hrefLabel: "Tate 展览页",
      fullBleed: true,
    },
    {
      src: "/media/stills/f/pioneers-arrival-2019.jpg",
      title: "2019 二百周年 · Raffles Landing Site 先驱雕像群",
      caption: "官方《Arrival》旁置 Sang Nila Utama 等先驱——反思外观与建国仪式同体。",
      credit:
        "Statues of Singaporean pioneers at Raffles' Landing Site. Wikimedia Commons (CC). Educational citation.",
      href: "https://commons.wikimedia.org/wiki/File:Statues_of_Singaporean_Pioneers_at_the_Raffles%27_Landing_Site_-_three-quarter_front_view.jpg",
      hrefLabel: "Wikimedia",
    },
    {
      src: "/media/stills/f/sang-nila-utama-2019.jpg",
      title: "Sang Nila Utama 像（二百周年现场）",
      caption: "与 Core B Utama 互文：同一创始神话，一边被拆成可替换脸，一边被做成周年装置。",
      credit:
        "Statue of Sang Nila Utama at Raffles Landing Site. Wikimedia Commons (CC). Educational citation.",
      href: "https://commons.wikimedia.org/wiki/File:Statue_of_Sang_Nila_Utama_at_the_Raffles_Landing_Site_(front_view).jpg",
      hrefLabel: "Wikimedia",
    },
  ] as MediaEmbed[],
  supportTip: {
    text: "Support｜documenta fifteen／Taring Padi《人民的正义》：解殖民大展亦可因跨文化伤害与德国记忆秩序撤展——展览自身成现场。",
    href: "https://documenta-fifteen.de/en/press-releases/statement-by-taring-padi-on-dismantling-peoples-justice/",
  },
  timeline: [
    { year: "1819", event: "莱佛士登陆／条约叙事成为「现代零点」" },
    { year: "1887", event: "Woolner 莱佛士铜像" },
    { year: "1972", event: "聚合大理石复制像——今日河畔常见视觉" },
    { year: "2015", event: "新加坡国家美术馆开馆（前最高法院与市政厅）" },
    { year: "2015–16", event: "泰特《艺术家与帝国》：面对英国的帝国过去" },
    { year: "2016–17", event: "新加坡版 (En)countering Colonial Legacies" },
    { year: "2019-01", event: "二百周年：雕像「隐形」＋ Arrival 四先驱" },
  ] as TimelineItem[],
}

export const supportStrip = {
  id: "act2support",
  eyebrow: "Support · 非 Core 短笺",
  title: "下放与旁注",
  lead: "东亚／东北亚深挖交同学；下列仅保留与东南亚主轴相关的极短 Support，不进主滚动深挖。",
  items: [
    {
      title: "documenta fifteen／Taring Padi",
      body: "《人民的正义》撤展：解殖民展与德国记忆秩序对撞——已在 Core F 角标一句。",
    },
    {
      title: "Khvay Samnang",
      body: "「通往神灵之路」：土地／仪式／开发线——已在 Core E 脚注。",
    },
    {
      title: "爱知「表现的不自由」",
      body: "下放同学；仅在 Core B Hotel Aporia 旁半句桥。",
    },
    {
      title: "台展／陈界仁／兽首／曾灶财",
      body: "已从主滚动切除；如需课堂对照可另开附录页，不在本站主轴展开。",
    },
  ],
}
