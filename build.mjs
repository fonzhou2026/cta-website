#!/usr/bin/env node
/* ==========================================================
   CTA 官网生成脚本（无依赖，Node 18+）
   用法：node build.mjs              按今天日期生成
         node build.mjs --asof 2026-12-06   模拟某天生成（预览定时新闻）
   输入：src/layout.html、src/pages/**.html、data/*.js
   输出：根目录 *.html、projects/*.html、news/*.html、data/news-pages.js
   ========================================================== */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const r = (...p) => path.join(ROOT, ...p);
const read = (p) => fs.readFileSync(r(p), "utf8");
const write = (p, s) => { fs.mkdirSync(path.dirname(r(p)), { recursive: true }); fs.writeFileSync(r(p), s); };

const argAsof = (process.argv.join(" ").match(/--asof[= ](\d{4}-\d{2}-\d{2})/) || [])[1];
const d = new Date();
const today = argAsof || `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const version = `${today.replace(/-/g, "")}${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}`;

/* ---------- data ---------- */
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["data/projects.js", "data/news.js"]) vm.runInContext(read(f), ctx, { filename: f });
const PROJECTS = ctx.window.CTA_PROJECTS || [];
const NEWS = ctx.window.CTA_NEWS || { items: [] };

/* ---------- helpers ---------- */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const bi = (o, tag = "span") => `<${tag} class="en">${esc(o?.en)}</${tag}><${tag} class="zh">${esc(o?.zh || o?.en)}</${tag}>`;
const fmtEn = (s) => new Date(s + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const fmtZh = (s) => { const [y, m, dd] = s.split("-").map(Number); return `${y} 年 ${m} 月 ${dd} 日`; };
const TAGS = { project: { en: "Project", zh: "项目动态" }, documentary: { en: "Documentary", zh: "纪录片" }, event: { en: "Event", zh: "活动展会" }, company: { en: "Company", zh: "公司新闻" } };

const NAV = [
  ["technology", "technology.html", { en: "Technology", zh: "技术" }],
  ["applications", "applications.html", { en: "Applications", zh: "应用" }],
  ["projects", "projects.html", { en: "Projects", zh: "项目" }],
  ["news", "news.html", { en: "Newsroom", zh: "新闻与纪录片" }],
  ["about", "about.html", { en: "About", zh: "关于" }]
];
const nav = (current, root) => NAV.map(([id, href, label]) =>
  `      <a href="${root}${href}"${id === current ? ' class="is-current" aria-current="page"' : ""}>${bi(label)}</a>`).join("\n");

const ctaBand = (root) => `<section class="cta-band">
  <div class="wrap cta-inner reveal">
    <div>
      <h2 class="h2"><span class="en">Planning a tunnel? Let's talk air.</span><span class="zh">正在规划隧道项目？聊聊空气。</span></h2>
      <p><span class="en">From feasibility and concept to turnkey delivery and service — our engineers support you at every stage.</span><span class="zh">从可行性研究、方案设计到交钥匙交付与运维，我们的工程团队全程支持。</span></p>
    </div>
    <a class="btn btn-light btn-lg" href="${root}about.html#contact"><span class="en">Get in touch</span><span class="zh">联系我们</span><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
  </div>
</section>`;

/* ---------- Route 6 schematic (自绘示意图，非工程方地图) ---------- */
function route6(current) {
  // 三段长度（km）：油麻地段 4.7、九龙湾段 3.4、将军澳—蓝田隧道 3.8；按比例排布
  const x0 = 40, x1 = 960, segs = [4.7, 3.4, 3.8], total = segs.reduce((a, b) => a + b, 0);
  const xs = [x0]; segs.forEach((s) => xs.push(xs[xs.length - 1] + (s / total) * (x1 - x0)));
  const Y = 120;
  const S = [
    { id: "ckr", cta: true, name: { en: "Yau Ma Tei Section (CKR)", zh: "油麻地段（中九龙绕道）" }, sub: { en: "4.7 km · opened Dec 2025", zh: "4.7 km · 2025 年 12 月通车" }, note: { en: "9 CTA stations · 3 ventilation buildings", zh: "9 座 CTA 净化站 · 3 座通风大楼" } },
    { id: "t2", cta: true, name: { en: "Kowloon Bay Section (T2)", zh: "九龙湾段（T2）" }, sub: { en: "3.4 km · Dec 2026", zh: "3.4 km · 2026 年 12 月通车" }, note: { en: "CTA system · West ventilation building", zh: "CTA 系统 · 西通风大楼" } },
    { id: "tkolt", cta: false, name: { en: "Tseung Kwan O–Lam Tin Tunnel", zh: "将军澳—蓝田隧道" }, sub: { en: "3.8 km · opened Dec 2022", zh: "3.8 km · 2022 年 12 月通车" } }
  ];
  const nodes = [
    { en: "Yau Ma Tei", zh: "油麻地" }, { en: "Kai Tak", zh: "启德" }, { en: "Lam Tin", zh: "蓝田" }, { en: "Tseung Kwan O", zh: "将军澳" }
  ];
  const t = (o, x, y, cls, anchor = "middle") =>
    `<text x="${x.toFixed(1)}" y="${y}" text-anchor="${anchor}" class="${cls} en">${esc(o.en)}</text><text x="${x.toFixed(1)}" y="${y}" text-anchor="${anchor}" class="${cls} zh">${esc(o.zh)}</text>`;
  let g = "";
  S.forEach((s, i) => {
    const a = xs[i] + 6, b = xs[i + 1] - 6, mid = (xs[i] + xs[i + 1]) / 2;
    const cls = s.id === current ? "r6-seg is-current" : s.cta ? "r6-seg is-cta" : "r6-seg";
    g += `<line x1="${a.toFixed(1)}" y1="${Y}" x2="${b.toFixed(1)}" y2="${Y}" class="${cls}"/>`;
    g += t(s.name, mid, Y - 34, "r6-name" + (s.id === current ? " is-current" : ""));
    g += t(s.sub, mid, Y - 14, "r6-sub");
    if (s.note) g += t(s.note, mid, Y + 40, "r6-note" + (s.id === current ? " is-current" : ""));
  });
  if (current === "t2") { // 西通风大楼大致位置（示意）
    const vx = xs[1] + (xs[2] - xs[1]) * 0.22;
    g += `<rect x="${(vx - 7).toFixed(1)}" y="${Y - 7}" width="14" height="14" rx="3" class="r6-vent"/>`;
  }
  nodes.forEach((n, i) => {
    g += `<circle cx="${xs[i].toFixed(1)}" cy="${Y}" r="7" class="r6-node"/>`;
    g += t(n, xs[i], Y + 78, "r6-place", i === 0 ? "start" : i === nodes.length - 1 ? "end" : "middle");
  });
  return `<figure class="r6-map">
  <svg viewBox="0 0 1000 220" role="img" aria-label="Route 6 schematic: Yau Ma Tei Section, Kowloon Bay Section and Tseung Kwan O–Lam Tin Tunnel">${g}</svg>
  <figcaption><span class="r6-key"><i class="k-cta"></i>${bi({ en: "CTA air purification", zh: "CTA 空气净化" })}</span><span class="r6-key"><i class="k-other"></i>${bi({ en: "Other section", zh: "其他路段" })}</span><span class="r6-scale">${bi({ en: "Route 6 · about 12.5 km · schematic, not to scale", zh: "六号干线 · 全长约 12.5 公里 · 示意图，非精确比例" })}</span></figcaption>
</figure>`;
}

/* ---------- page assembly ---------- */
const layout = read("src/layout.html");
function render(body, meta, outPath) {
  const depth = outPath.split("/").length - 1;
  const root = "../".repeat(depth);
  body = body
    .replace(/\{\{include ([\w./-]+)\}\}/g, (_, f) => read("src/partials/" + f).trim())
    .replace(/\{\{cta_band\}\}/g, ctaBand(root))
    .replace(/\{\{route6_map (\w+)\}\}/g, (_, id) => route6(id))
    .replace(/\{\{root\}\}/g, root);
  // 旧单页切出来的片段里是相对根目录的 assets/ 路径，子目录页面需补前缀
  if (depth) body = body.replace(/(src|href)="assets\//g, `$1="${root}assets/`);
  const html = layout
    .replace(/\{\{nav\}\}/g, nav(meta.nav, root))
    .replace(/\{\{body\}\}/g, () => body)
    .replace(/\{\{title_en\}\}/g, esc(meta.title_en))
    .replace(/\{\{title_zh\}\}/g, esc(meta.title_zh || meta.title_en))
    .replace(/\{\{description\}\}/g, esc(meta.description || ""))
    .replace(/\{\{og_image\}\}/g, meta.og_image || "assets/img/hero-laerdal.jpg")
    .replace(/\{\{body_class\}\}/g, meta.body_class || "")
    .replace(/\{\{version\}\}/g, version)
    .replace(/\{\{root\}\}/g, root);
  write(outPath, html);
  return outPath;
}

const out = [];
function walk(dir) {
  for (const f of fs.readdirSync(r(dir))) {
    const p = path.posix.join(dir, f);
    if (fs.statSync(r(p)).isDirectory()) { walk(p); continue; }
    if (!f.endsWith(".html")) continue;
    const src = read(p);
    const m = src.match(/^<!--page (\{[\s\S]*?\}) -->\s*/);
    if (!m) throw new Error(`${p}: 缺少 <!--page {...} --> 头信息`);
    out.push(render(src.slice(m[0].length), JSON.parse(m[1]), p.replace(/^src\/pages\//, "")));
  }
}
walk("src/pages");

/* ---------- news detail pages ---------- */
const published = (NEWS.items || []).filter((n) => n.id && n.body && (!n.publishFrom || n.publishFrom <= today));
const projectById = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));
fs.rmSync(r("news"), { recursive: true, force: true }); // news/ 目录完全由脚本生成
for (const n of published) {
  const p = n.project && projectById[n.project];
  const paras = (lang) => (n.body[lang] || n.body.en).map((x) => `<p>${esc(x)}</p>`).join("\n        ");
  const media = n.embed
    ? `<div class="video-frame"><button class="video-poster" type="button" data-embed="${esc(n.embed)}" aria-label="Play video"><img src="{{root}}${esc(n.image)}" alt=""><span class="doc-play"><svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></button></div>`
    : n.image ? `<figure class="article-figure"><img src="{{root}}${esc(n.image)}" alt=""></figure>` : "";
  const sources = (n.sources || []).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${bi(s.label)} ↗</a></li>`).join("");
  const body = `<section class="page-hero article-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="{{root}}news.html">${bi({ en: "Newsroom", zh: "新闻与纪录片" })}</a><span aria-hidden="true">/</span>${bi(TAGS[n.tag] || TAGS.company)}</nav>
    <h1 class="article-title">${bi(n.title)}</h1>
    <p class="article-date"><time datetime="${n.date}"><span class="en">${fmtEn(n.date)}</span><span class="zh">${fmtZh(n.date)}</span></time></p>
  </div>
</section>
<section class="section article">
  <div class="wrap article-grid">
    <div class="article-main">
      ${media}
      <div class="article-body">
        <div class="en">
        ${paras("en")}
        </div>
        <div class="zh">
        ${paras("zh")}
        </div>
      </div>
      ${sources ? `<div class="article-sources"><h2 class="h5">${bi({ en: "Sources & links", zh: "来源与链接" })}</h2><ul>${sources}</ul></div>` : ""}
    </div>
    <aside class="article-aside">
      ${p && p.page ? `<a class="aside-project" href="{{root}}${p.page}">${p.image && p.image !== n.image ? `<img src="{{root}}${esc(p.image)}" alt="" loading="lazy">` : ""}<span class="aside-kicker">${bi({ en: "Project", zh: "相关项目" })}</span><b>${bi(p.name)}</b><span class="aside-more">${bi({ en: "Read the project story →", zh: "查看项目故事 →" })}</span></a>` : ""}
      <a class="btn btn-primary" href="{{root}}news.html">${bi({ en: "← All news", zh: "← 全部新闻" })}</a>
    </aside>
  </div>
</section>
<section class="section section-paper" data-hide-if-empty>
  <div class="wrap">
    <div class="section-head reveal"><p class="eyebrow">${bi({ en: "More news", zh: "更多新闻" })}</p></div>
    <div class="news-grid news-grid-light" data-limit="3" data-skip="${n.id}"></div>
  </div>
</section>`;
  const title = (l) => `${(n.title[l] || n.title.en)}${l === "zh" ? "｜" : " — "}Clean Tunnel Air International AS`;
  out.push(render(body, { title_en: title("en"), title_zh: title("zh"), description: n.summary?.en || "", nav: "news", og_image: n.image, body_class: "page-sub page-article" }, `news/${n.id}.html`));
}
write("data/news-pages.js", `/* 由 build.mjs 生成，勿手改：已生成详情页的新闻 ID */\nwindow.CTA_NEWS_PAGES = ${JSON.stringify(published.map((n) => n.id))};\n`);

console.log(`asof ${today} · version ${version}`);
console.log(out.map((p) => "  " + p).join("\n"));
const pending = (NEWS.items || []).filter((n) => n.publishFrom && n.publishFrom > today);
if (pending.length) console.log(`定时新闻（未到日期，未生成详情页）：\n${pending.map((n) => `  ${n.publishFrom}  ${n.id}`).join("\n")}\n  → 到期当天重新运行 node build.mjs 并上传`);
