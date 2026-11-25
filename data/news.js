/* ==========================================================
   新闻与纪录片 / Newsroom & Documentary
   内容来源：企业微信群「隧道项目宣传和纪录片」（2026-11-24 整理，只读）
   ----------------------------------------------------------
   ▸ documentary：纪录片主视觉（无则保持 null，页面显示“即将上线”）
       video / embed / poster / episodes —— 见 README
   ▸ items：新闻条目，按日期倒序自动排序
       id          —— 唯一 ID，同时是详情页文件名 news/<id>.html
       tag         —— project | documentary | event | company
       project     —— 关联项目 ID（ckr / t2），项目详情页会自动列出
       publishFrom —— 可选，该日期前不显示、也不生成详情页（通车当天自动上线）
       body        —— 详情页正文，{ en: [段落...], zh: [段落...] }
       embed       —— 可选，详情页内嵌视频地址
       sources     —— 可选，外部来源链接
       link        —— 可选，无详情页时卡片直接跳转的外链
   每个文字字段都填 { en: "...", zh: "..." }
   改完运行：node build.mjs   预览未来条目：?asof=2026-12-06
   ----------------------------------------------------------
   未收录（待确认）：活性炭运输数据、报价/合同/媒体采购等内部信息。
   ========================================================== */
window.CTA_NEWS = {
  documentary: {
    poster: "assets/img/projects/ckr.webp",
    video: "",
    embed: "https://www.youtube.com/embed/wvTYudKPuQA",
    link: "https://www.youtube.com/watch?v=wvTYudKPuQA",
    title:    { en: "Central Kowloon Route (Yau Ma Tei Section)", zh: "中九龙绕道（油麻地段）" },
    subtitle: {
      en: "How the CTA team designed, manufactured and delivered the tunnel air purification system for Hong Kong's Central Kowloon Route (Yau Ma Tei Section).",
      zh: "回顾 CTA 团队为香港中九龙绕道（油麻地段）设计、制造并交付隧道空气净化系统的过程。"
    },
    meta:     { en: "Released Dec 2025 · 1 min 18 s", zh: "2025 年 12 月发布 · 约 1 分 17 秒" },
    episodes: []
  },
  items: [
    { id: "2026-12-06-route6-kowloon-bay-opens", date: "2026-12-06", publishFrom: "2026-12-06",
      tag: "project", project: "t2", image: "assets/img/projects/t2.webp",
      title: {
        en: "Hong Kong's Route 6 Fully Opens as the Kowloon Bay Section Starts Operation with a CTA Tunnel Air Purification System",
        zh: "香港六号干线全线贯通，九龙湾段启用 CTA 隧道空气净化系统"
      },
      summary: {
        en: "On 6 December 2026, the Central Kowloon Route (Kowloon Bay Section) opened to traffic, completing the 12.5 km Route 6. Its West Ventilation Building houses a tunnel air purification system designed, manufactured, installed and commissioned by CTA — the second CTA system on Route 6.",
        zh: "2026年12月6日，中九龙绕道（九龙湾段）正式通车，全长12.5公里的六号干线由此全线贯通。西通风大楼采用由 CTA 设计、生产、安装及调试的隧道空气净化系统——这是 CTA 在六号干线上交付的第二套系统。"
      },
      body: {
        en: [
          "On 6 December 2026, the Central Kowloon Route (Kowloon Bay Section) opened to traffic, completing the 12.5 km Route 6. The West Ventilation Building of the Kowloon Bay Section uses a tunnel air purification system designed, manufactured, installed and commissioned by Clean Tunnel Air International AS (CTA), a member of AirQuality Group. It is the second CTA system on Route 6, following the opening of the Yau Ma Tei Section in December 2025.",
          "Formerly known as Trunk Road T2 and the Cha Kwo Ling Tunnel, the Kowloon Bay Section is about 3.4 km long, about 3.1 km of it in tunnel, with a dual two-lane carriageway. It connects the Yau Ma Tei Section in the west with the Tseung Kwan O–Lam Tin Tunnel in the east, with West and East Ventilation Buildings along the route. Together the three sections form an east–west expressway linking West Kowloon with Tseung Kwan O. With Route 6 complete, the peak-hour journey between Tseung Kwan O town centre and Yau Ma Tei is expected to fall from about 65 minutes before the route was built to about 12 minutes.",
          "Running mostly underground through the dense districts of Kai Tak and Cha Kwo Ling, the section will carry heavy through-traffic for decades. Vehicle exhaust concentrates in long tunnels — particles, carbon monoxide, hydrocarbons and nitrogen oxides — and, released untreated through a ventilation building, would affect the people who live and work nearby. The West Ventilation Building therefore treats tunnel exhaust centrally before it is released.",
          "CTA's system follows an active-purification approach rather than relying only on dilution and dispersion. It combines high-efficiency electrostatic filtration, removal of harmful gases and automatic washing, with real-time monitoring and control that adjusts operation to traffic volume and pollutant concentration, keeping performance stable under heavy load.",
          "The project took the CTA and AQT teams five and a half years, from system design through manufacture, installation and commissioning. Team members in Shanghai, Hong Kong and Norway worked across sites with all parties to install and integrate large equipment within the limited space of the ventilation building, delivering on time and to specification. CTA will continue to provide operation, maintenance and quality assurance for the system."
        ],
        zh: [
          "2026年12月6日，香港中九龙绕道（九龙湾段）正式通车，全长12.5公里的六号干线由此全线贯通。九龙湾段的西通风大楼采用了隧道空气净化系统，由爱优特集团旗下的挪威隧道空气净化国际有限公司（CTA）负责设计、生产、安装及调试。继2025年12月中九龙绕道（油麻地段）通车之后，这是爱优特/CTA团队在六号干线上交付的又一套隧道空气净化系统。",
          "中九龙绕道（九龙湾段）前称T2主干路及茶果岭隧道，全长约3.4公里，其中约3.1公里为隧道段，采用双程双线设计。路段西接中九龙绕道（油麻地段），东连将军澳—蓝田隧道，沿线设有西、东两座通风大楼。三段共同构成一条连接西九龙与将军澳的东西向快速干道。六号干线全线通车后，繁忙时段往返将军澳市中心及油麻地的行车时间，预计将由六号干线兴建前约65分钟大幅减至约12分钟。",
          "九龙湾段以隧道为主，穿越启德、茶果岭一带的高密度城区，通车后将长期承载大量过境车流。长隧道内会聚集大量汽车尾气，主要污染物包括颗粒物、一氧化碳、碳氢化合物和氮氧化物等；若经通风大楼直接排放，将影响周边居民和上班族的呼吸健康。为此，项目在西通风大楼内配置了隧道空气净化系统，在废气排放前进行集中处理。",
          "CTA 的系统采用“主动净化”技术路径，不同于单纯依靠空气稀释和自然扩散的传统通风方式。系统集成了高效静电过滤、有害气体去除和自动清洗等核心技术，并配备实时智能监测与控制系统，可根据车流量和污染物浓度动态调整运行参数，在高负荷交通场景下保持稳定、高效的净化效果。",
          "爱优特/CTA团队为此项目投入了五年半时间，完成了系统设计、生产、安装和调试全过程。来自上海、香港和挪威的团队成员跨地协作，与各方密切配合，在通风大楼有限的空间内完成了大型设备的安装与系统联调，按时按质完成交付。此后 CTA 还将为系统提供运营维护与质量保证。"
        ]
      } },

    { id: "2025-12-21-ckr-opening", date: "2025-12-21", tag: "project", project: "ckr",
      image: "assets/img/projects/ckr.webp",
      title: {
        en: "Central Kowloon Route (Yau Ma Tei Section) Opens in Hong Kong, Equipped with CTA's Tunnel Air Purification System",
        zh: "香港中九龙绕道（油麻地段）通车，CTA 隧道空气净化系统投入运行"
      },
      summary: {
        en: "On 21 December 2025, the Central Kowloon Route (Yau Ma Tei Section) in Hong Kong opened to traffic. Nine air purification stations in three ventilation buildings — designed, manufactured and installed by CTA — treat the tunnel exhaust before it is released.",
        zh: "2025年12月21日，香港中九龙绕道（油麻地段）正式通车。3座通风大楼内共设9个空气处理站，由 CTA 设计、制造与安装，在隧道废气排放前集中处理。"
      },
      body: {
        en: [
          "On 21 December 2025, the Central Kowloon Route (Yau Ma Tei Section) in Hong Kong opened to traffic. The route is about 4.7 km long, with a dual three-lane carriageway, including a tunnel of about 3.9 km beneath the dense districts of Kowloon.",
          "Clean Tunnel Air International AS (CTA), a member of AirQuality Group, designed, manufactured and installed the tunnel's air purification system: nine air purification stations housed in three ventilation buildings, with a combined treated airflow of 2,250 m³/s — the largest project CTA has delivered.",
          "Using high-efficiency electrostatic filtration and other active purification technologies, the system treats tunnel exhaust before it is released through the ventilation buildings, reducing the impact on the neighbourhoods around them.",
          "The Yau Ma Tei Section is the western part of Route 6, an east–west expressway linking West Kowloon with Tseung Kwan O. CTA is also delivering the air purification system for Route 6's Kowloon Bay Section."
        ],
        zh: [
          "2025年12月21日，香港中九龙绕道（油麻地段）正式通车。路段全长约4.7公里，采用双程三线分隔车道，包括长约3.9公里的隧道，穿行于九龙高密度城区之下。",
          "爱优特集团旗下的挪威隧道空气净化国际有限公司（CTA）负责该隧道空气净化系统的设计、制造与安装：3座通风大楼内共设9个空气处理站，总处理风量达 2,250 m³/s，是 CTA 迄今交付规模最大的项目。",
          "系统采用高效静电过滤等主动净化技术，在隧道废气经通风大楼排放前进行集中处理，减轻对周边社区空气质量的影响。",
          "油麻地段是六号干线的西段。六号干线是一条连接西九龙与将军澳的东西向快速干道，CTA 同时承担其九龙湾段的空气净化系统。"
        ]
      },
      sources: [
        { label: { en: "Coverage on ifeng.com (22 Dec 2025)", zh: "凤凰网报道（2025-12-22）" }, url: "https://baby.ifeng.com/c/8pHnee08gtx" }
      ] },

    { id: "2025-12-21-ckr-documentary", date: "2025-12-21", tag: "documentary", project: "ckr",
      image: "assets/img/projects/ckr.webp",
      embed: "https://www.youtube.com/embed/wvTYudKPuQA",
      title: {
        en: "Short Documentary “Central Kowloon Route (Yau Ma Tei Section)” Released",
        zh: "纪录短片《中九龙绕道（油麻地段）》发布"
      },
      summary: {
        en: "In just over a minute, the film looks back at how the CTA team delivered the tunnel air purification system for the Central Kowloon Route.",
        zh: "短片用一分多钟回顾 CTA 团队为中九龙绕道交付隧道空气净化系统的过程。"
      },
      body: {
        en: [
          "To mark the opening of the Central Kowloon Route, CTA released a short documentary looking back at how the team designed, manufactured and delivered the tunnel's air purification system — three ventilation buildings and nine air purification stations.",
          "The Chinese version premiered on 21 December 2025 on WeChat Channels, Sohu, Weibo, Tencent Video and Youku. The English version is available on YouTube."
        ],
        zh: [
          "为纪念中九龙绕道通车，CTA 发布纪录短片，回顾团队为该隧道设计、制造并交付空气净化系统的过程——三座通风大楼，九个空气处理站。",
          "中文版于2025年12月21日在视频号、搜狐号、微博、腾讯视频、优酷视频等平台首发，英文版可在 YouTube 观看。"
        ]
      },
      sources: [
        { label: { en: "Watch on YouTube", zh: "在 YouTube 观看" }, url: "https://www.youtube.com/watch?v=wvTYudKPuQA" }
      ] }
  ]
};
