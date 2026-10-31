export type TimelineItem = { year: string; event: string; mediaHint?: string }

export const act2Intro = {
  eyebrow: "第二幕 · 现象",
  title: "展示与回收：东南亚六案",
  lead:
    "六个锁定节点 A–F。每个案例从一个地方出发，答案却牵出另一个地方。媒体优先：Tier1 公版图内嵌；当代作品未获许可处用「待许可」框＋机构链。",
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
    "Revolusi! 展场静帧属 Tier2【待核许可】。此处只保留展名与 bersiap 争论文字节点。",
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
  placeholders: [
    {
      title: "Utama — Every Name in History Is I (2003)",
      description: "同一张脸：乌塔马，也是莱佛士。首展 The Substation。静帧待机构／画廊许可。",
      href: "https://www.hotzunyen.com/",
      hrefLabel: "艺术家官网",
    },
    {
      title: "CDOSEA 在线平台／算法视频",
      description: "未核 iframe 许可前，本站以自做词条芯片模拟「词典在重排」，不嵌未知许可的官方界面。",
      href: "https://www.singaporeartmuseum.sg/about/our-collection/stories/a-shapeshifting-region",
      hrefLabel: "SAM 藏品叙述",
    },
    {
      title: "Hotel Aporia (2019)",
      description: "爱知三年展喜乐亭六频装置。静帧待许可。",
      href: "https://aichitriennale2010-2019.jp/2019/en/artwork/T04.html",
      hrefLabel: "爱知三年展页",
    },
  ],
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
  analysis: [
    "官方史省略＝展示的负片：土地可被重新命名为「宁顺／核电基地」。",
    "法殖→美战→后殖民开发：核电被读作对占族土地的再侵占与毒性遗产延续。",
    "先外展后国内：政治敏感作品先在巴黎 Jeu de Paume 亮相——国际艺术场成为「可说」的出口。",
    "书信体双声拒绝「替占族发言」的民族志权威。",
  ],
  placeholders: [
    {
      title: "Letters from Panduranga (2015)",
      description: "约 35 分钟越南语影像。Jeu de Paume 2015-10-20—2016-01-24；M+ 藏。静帧待许可。",
      href: "https://jeudepaume.org/en/evenement/nguyen-trinh-thi-2/",
      hrefLabel: "Jeu de Paume",
      secondaryHref: "https://www.mplus.org.hk/en/collection/objects/letters-from-panduranga-2018371/",
      secondaryLabel: "M+ 藏品",
    },
    {
      title: "对照 · 阮俊《成为祖先的幽灵》(2019)",
      description: "四联屏；沙迦双年展 14。法军塞内加尔步枪兵与越南女性／混血后代的跨洋记忆。静帧待许可。",
      href: "https://post.moma.org/slender-threads-tuan-andrew-nguyens-the-specter-of-ancestors-becoming/",
      hrefLabel: "MoMA post",
    },
  ],
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
  analysis: [
    "国家象征的数字美学：谁记住数字，谁拥有仪式时间。",
    "轴心同盟的删除：泰日结盟与朱辛仰慕希特勒的段落在泰国课本中鲜少出现。",
    "帝国—种族暴力的长尾：父亲作为在德水手被新纳粹殴打致死。",
    "复制翼板进文献展：抽空户外纪念的神圣性，变成可检验的物件。",
  ],
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
  placeholders: [
    {
      title: "documenta 14 装置／视频静帧",
      description: "卡塞尔：纪念碑翼板复制、大使肖像、约 46 分钟视频。静帧待艺术家／馆方许可。",
      href: "https://www.documenta14.de/en/artists/13599/arin-rungjang",
      hrefLabel: "documenta 14",
      secondaryHref: "https://trans-seatriennial.gzarts.edu.cn/info/1040/1206.htm",
      secondaryLabel: "Ha Thuc 专文",
    },
  ],
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
  analysis: [
    "民族志／殖民摄影凝视：档案相机先于民族国家边界把群岛写成可治理对象。",
    "国界切割海洋：英／西／美殖民继承与马／菲国境，把苏禄苏丹国式跨海社会切成边防问题。",
    "数码并置把档案的接缝留在画面上——改写凝视，不是装回一个更纯的过去。",
  ],
  placeholders: [
    {
      title: "《群岛》The Archipelago (2005)",
      description: "森美术馆藏。作品静帧待许可——此处不嵌当代全图。",
      href: "https://www.mori.art.museum/en/collection/2380/index.html",
      hrefLabel: "森美藏品",
    },
    {
      title: "《Barangay》(2005)",
      description: "森美术馆藏。静帧待许可。",
      href: "https://www.mori.art.museum/en/collection/2379/index.html",
      hrefLabel: "森美藏品",
    },
  ],
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
    body: "政府办公室委托 Teng Kai Wei 将莱佛士像涂成与背景融合；Hong Hai Arts《Arrival》旁立 Sang Nila Utama 等另四位「先驱」。新闻照属 Tier2【待核】——此处用常态雕像＋文字说明，禁止 AI 伪造「涂装隐形」效果图。",
  },
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
