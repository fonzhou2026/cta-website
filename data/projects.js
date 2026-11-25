/* ==========================================================
   CTA 项目参考数据 / Project references
   - 新增项目：复制一个对象，按格式填写即可（中英文都要填）
   - type: bypass | ceiling | shaft | distributed | pilot | gas
   - region: norway | europe | asia
   - flow: 总处理风量 (m³/s)，未知填 null
   - featured: true 会出现在“旗舰项目”大卡片中（需要 image）
   - page: 项目详情页路径（有则卡片和表格可点进去）
   ========================================================== */
window.CTA_PROJECTS = [
  {
    id: "ckr", featured: true, region: "asia", type: "bypass",
    image: "assets/img/projects/ckr.webp", page: "projects/central-kowloon-route.html",
    years: "2025", flow: 2250, stations: 9,
    name:  { en: "Central Kowloon Route (Yau Ma Tei Section)", zh: "中九龙绕道（油麻地段）" },
    place: { en: "Hong Kong, China", zh: "中国香港" },
    spec:  { en: "Dual three-lane carriageway, approx. 4,700 m · opened Dec 2025", zh: "双向六车道，全长约 4,700 米 · 2025 年 12 月通车" },
    note:  { en: "CTA's largest project — 9 air purification stations in 3 ventilation buildings.", zh: "CTA 规模最大的项目——3 座通风大楼内共 9 座净化站。" }
  },
  {
    id: "t2", featured: true, region: "asia", type: "bypass",
    image: "assets/img/projects/t2.webp", page: "projects/kowloon-bay-t2.html",
    years: "—", flow: 230,
    name:  { en: "Kowloon Bay Section (Trunk Road T2)", zh: "九龙湾段（T2 主干路）" },
    place: { en: "Hong Kong, China", zh: "中国香港" },
    spec:  { en: "Dual two-lane tunnel, 3,100 m", zh: "双向四车道隧道，全长 3,100 米" },
    note:  { en: "The final link of Route 6 — CTA's system in the West Ventilation Building.", zh: "六号干线的最后一段——CTA 系统位于西通风大楼。" }
  },
  {
    id: "m30", featured: true, region: "europe", type: "gas",
    image: "assets/img/hero-m30.webp",
    years: "—", flow: 1094, stations: 2,
    name:  { en: "M30 Madrid Calle 30", zh: "马德里 M30 环城隧道" },
    place: { en: "Madrid, Spain", zh: "西班牙 马德里" },
    spec:  { en: "Gas cleaning + ESP filters, southern section", zh: "南段：气体净化 + 静电除尘" },
    note:  { en: "Two stations of 694 m³/s and 400 m³/s — the 694 m³/s station is the world's largest single APS by airflow.", zh: "两座净化站，分别为 694 m³/s 与 400 m³/s，其中 694 m³/s 为全球单站风量最大。" }
  },
  {
    id: "laerdal", featured: true, region: "norway", type: "bypass",
    image: "assets/img/hero-laerdal.webp",
    years: "2000–2001", flow: 180, stations: 1,
    name:  { en: "Lærdal Tunnel", zh: "洛达尔隧道（Lærdal）" },
    place: { en: "Sogn og Fjordane, Norway", zh: "挪威 松恩-菲尤拉讷" },
    spec:  { en: "Two lanes, 24.5 km — the world's longest road tunnel", zh: "双车道，全长 24.5 公里——世界最长公路隧道" },
    note:  { en: "The longest rock tunnel equipped with an air cleaning system.", zh: "配备空气净化系统的最长岩石隧道。" }
  },
  {
    id: "festning", featured: true, region: "norway", type: "shaft",
    image: "assets/img/hero-festning.webp", thumb: "assets/img/projects/festning-thumb.webp",
    years: "1989–1990", flow: 600, stations: 1,
    name:  { en: "Festning Tunnel", zh: "Festning 隧道" },
    place: { en: "Oslo, Norway", zh: "挪威 奥斯陆" },
    spec:  { en: "Three lanes, 1,800 m", zh: "三车道，全长 1,800 米" },
    note:  { en: "One of the earliest tunnels in the world equipped with air cleaning — Norway's busiest tunnel.", zh: "全球最早配备空气净化系统的隧道之一，也是挪威最繁忙的隧道。" }
  },
  {
    id: "stromsas", region: "norway", type: "ceiling",
    thumb: "assets/img/projects/stromsas-thumb.webp",
    years: "2000–2001", flow: 160, stations: 4,
    name:  { en: "Strømsås Tunnel", zh: "Strømsås 隧道" },
    place: { en: "Drammen, Norway", zh: "挪威 德拉门" },
    spec:  { en: "Two lanes, 3,600 m · 4 stations", zh: "双车道，3,600 米 · 4 座净化站" },
    note:  { en: "Ceiling-mounted with the largest axial fan, 6 m in diameter.", zh: "顶置安装，采用直径 6 米的超大轴流风机。" }
  },
  {
    id: "chinbu", region: "asia", type: "bypass",
    thumb: "assets/img/projects/chinbu-thumb.webp",
    years: "1998–1999", flow: 285,
    name:  { en: "Chinbu Tunnel", zh: "Chinbu 隧道" },
    place: { en: "South Korea", zh: "韩国" },
    spec:  { en: "Two lanes, 2,800 m", zh: "双车道，2,800 米" },
    note:  { en: "First APS with a waste-water recycling system (1998).", zh: "全球首个配备废水循环系统的净化站（1998 年）。" }
  },
  {
    id: "nygard", region: "norway", type: "ceiling",
    thumb: "assets/img/projects/nygard-thumb.webp",
    years: "1998–1999", flow: 250,
    name:  { en: "Nygård Tunnel", zh: "Nygård 隧道" },
    place: { en: "Bergen, Norway", zh: "挪威 卑尔根" },
    spec:  { en: "Two lanes, 900 m", zh: "双车道，900 米" },
    note:  { en: "", zh: "" }
  },
  {
    id: "hell", region: "norway", type: "ceiling",
    thumb: "assets/img/projects/hell-thumb.webp",
    years: "1995", flow: 95,
    name:  { en: "Hell Tunnel I / II / III", zh: "Hell 隧道 I / II / III" },
    place: { en: "Trondheim, Norway", zh: "挪威 特隆赫姆" },
    spec:  { en: "Two lanes, 3,900 m", zh: "双车道，3,900 米" },
    note:  { en: "", zh: "" }
  },
  {
    id: "elbe", region: "europe", type: "pilot",
    thumb: "assets/img/projects/elbe-thumb.webp",
    years: "1994", flow: null,
    name:  { en: "Elbe Tunnel", zh: "易北河隧道（Elbe）" },
    place: { en: "Hamburg, Germany", zh: "德国 汉堡" },
    spec:  { en: "Five lanes · pilot plant", zh: "五车道 · 示范工程" },
    note:  { en: "", zh: "" }
  },
  {
    id: "ekeberg", region: "norway", type: "bypass",
    thumb: "assets/img/projects/ekeberg-thumb.webp",
    years: "1993–1995", flow: 500,
    name:  { en: "Ekeberg Tunnel I / II", zh: "Ekeberg 隧道 I / II" },
    place: { en: "Oslo, Norway", zh: "挪威 奥斯陆" },
    spec:  { en: "Two 2-lane tunnels, 1,400 m each", zh: "两条双车道隧道，各 1,400 米" },
    note:  { en: "", zh: "" }
  },
  {
    id: "granfoss", region: "norway", type: "bypass",
    thumb: "assets/img/projects/granfoss-thumb.webp",
    years: "1991–1992", flow: 200,
    name:  { en: "Granfoss Tunnel", zh: "Granfoss 隧道" },
    place: { en: "Oslo, Norway", zh: "挪威 奥斯陆" },
    spec:  { en: "Three lanes, 2,340 m", zh: "三车道，2,340 米" },
    note:  { en: "", zh: "" }
  }
];

window.CTA_TYPES = {
  bypass:      { en: "Bypass",          zh: "旁路式" },
  ceiling:     { en: "Ceiling-mounted", zh: "顶置式" },
  shaft:       { en: "Shaft",           zh: "竖井式" },
  distributed: { en: "Distributed",     zh: "分布式" },
  pilot:       { en: "Pilot plant",     zh: "示范工程" },
  gas:         { en: "ESP + gas cleaning", zh: "除尘 + 脱硝" }
};
