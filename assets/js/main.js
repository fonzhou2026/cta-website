/* Clean Tunnel Air International AS — site behaviour (multi-page) */
(function () {
  "use strict";
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ROOT = window.CTA_ROOT || "";
  var url = function (p) { return !p || /^(https?:|\/|#|mailto:|tel:)/.test(p) ? p : ROOT + p; };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };

  /* ---------- "today" for date-gated content (?asof=YYYY-MM-DD to preview) ---------- */
  var asof = (location.search.match(/[?&]asof=(\d{4}-\d{2}-\d{2})/) || [])[1];
  if (!asof) { var now = new Date(); asof = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2); }
  $$("[data-show-from]").forEach(function (el) { el.hidden = el.getAttribute("data-show-from") > asof; });
  $$("[data-hide-from]").forEach(function (el) { el.hidden = el.getAttribute("data-hide-from") <= asof; });
  $$("[data-done-from]").forEach(function (el) { el.classList.toggle("is-done", el.getAttribute("data-done-from") <= asof); });

  /* ---------- language ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var qsLang = (location.search.match(/[?&]lang=(en|zh)/) || [])[1];
  var lang = qsLang || store.get("cta-lang") || (/^zh/i.test(navigator.language || "") ? "zh" : "en");
  var t = function (o) { return o ? (o[lang] || o.en || "") : ""; };
  var L = function (en, zh) { return lang === "zh" ? zh : en; };
  var renderers = [];

  function setLang(l) {
    lang = l;
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l === "zh" ? "zh-CN" : "en");
    var tm = document.querySelector('meta[name="cta-title-' + l + '"]'); if (tm) document.title = tm.content;
    renderers.forEach(function (fn) { fn(); });
  }
  $(".lang-toggle").addEventListener("click", function () {
    var n = lang === "en" ? "zh" : "en";
    store.set("cta-lang", n);
    setLang(n);
  });

  /* ---------- header ---------- */
  var header = $(".site-header");
  var hero = $(".hero, .page-hero, .detail-hero");
  var mobileMenu = $("#mobile-menu");
  var menuBtn = $(".menu-toggle");
  function onScroll() {
    // 首页大图：滚过大图再变白底；子页面页头较短：一滚动就变白底，避免导航压在标题上
    var limit = hero && hero.classList.contains("hero") ? hero.offsetHeight - 90 : 24;
    header.classList.toggle("is-solid", window.scrollY > limit || !mobileMenu.hidden);
  }
  menuBtn.addEventListener("click", function () {
    var open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
    onScroll();
  });
  $$("#mobile-menu a").forEach(function (a) {
    a.addEventListener("click", function () { menuBtn.setAttribute("aria-expanded", "false"); mobileMenu.hidden = true; onScroll(); });
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- hero slideshow (home) ---------- */
  var slides = $$(".hero-slide");
  if (slides.length) {
    var dotsBox = $(".hero-dots");
    var cur = 0, timer = null;
    slides.forEach(function (s, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Slide " + (i + 1));
      b.addEventListener("click", function () { go(i, true); });
      dotsBox.appendChild(b);
    });
    var dots = $$("button", dotsBox);
    var caption = function () {
      var s = slides[cur];
      $(".hc-title").textContent = s.getAttribute("data-title-" + lang);
      $(".hc-cap").textContent = s.getAttribute("data-cap-" + lang);
    };
    var go = function (i, user) {
      slides[cur].classList.remove("is-active");
      dots[cur].classList.remove("is-active");
      cur = (i + slides.length) % slides.length;
      slides[cur].classList.add("is-active");
      void dots[cur].offsetWidth;
      dots[cur].classList.add("is-active");
      dots.forEach(function (d, k) { d.setAttribute("aria-selected", String(k === cur)); });
      caption();
      if (user) start();
    };
    var start = function () {
      clearInterval(timer);
      if (!reduce) timer = setInterval(function () { go(cur + 1); }, 6500);
    };
    dots[0].classList.add("is-active");
    renderers.push(caption);
    start();
    document.addEventListener("visibilitychange", function () { document.hidden ? clearInterval(timer) : start(); });
  }

  /* ---------- reveal + counters ---------- */
  function countUp(el) {
    var to = +el.getAttribute("data-to");
    var plain = el.hasAttribute("data-plain");
    var fmt = function (n) { return plain ? String(n) : n.toLocaleString("en-US"); };
    if (reduce) { el.textContent = fmt(to); return; }
    var from = plain ? to - 37 : 0, t0 = null, dur = 1600;
    (function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        $$(".count", e.target).forEach(countUp);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    window.__observeReveal = function (els) { els.forEach(function (el, i) { if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add("is-in"); return; } el.classList.add("pre"); el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms"; io.observe(el); }); };
  } else {
    window.__observeReveal = function (els) { els.forEach(function (el) { el.classList.add("is-in"); }); };
  }

  /* ---------- technology stages ---------- */
  var steps = $$(".flow-step"), stages = $$(".stage");
  function showStage(i) {
    steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); s.setAttribute("aria-selected", String(k === i)); s.tabIndex = k === i ? 0 : -1; });
    stages.forEach(function (s, k) { s.hidden = k !== i; s.classList.toggle("is-active", k === i); });
  }
  steps.forEach(function (s, i) {
    s.addEventListener("click", function () { showStage(i); });
    s.addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
      if (!d) return;
      var n = (i + d + steps.length) % steps.length;
      showStage(n); steps[n].focus();
    });
  });

  /* ---------- projects ---------- */
  var P = window.CTA_PROJECTS || [], TYPES = window.CTA_TYPES || {};
  var pins = [
    { x: 14.61, y: 17.01, en: "Norway · HQ Trondheim", zh: "挪威 · 特隆赫姆总部", sub: { en: "7 tunnels since 1989", zh: "7 条隧道 · 始于 1989" }, hq: true, always: true },
    { x: 14.67, y: 22.1 }, { x: 11.78, y: 21.4 }, { x: 12.9, y: 20.36 }, { x: 14.39, y: 22.35 },
    { x: 14.48, y: 31.62, en: "Hamburg", zh: "汉堡", sub: { en: "Elbe Tunnel", zh: "易北河隧道" } },
    { x: 6.77, y: 52.2, en: "Madrid", zh: "马德里", sub: { en: "M30 · 694 m³/s", zh: "M30 · 694 m³/s" } },
    { x: 86.46, y: 56.68, en: "South Korea", zh: "韩国", sub: { en: "Chinbu Tunnel", zh: "Chinbu 隧道" }, side: "left" },
    { x: 81.11, y: 81.4, en: "Hong Kong", zh: "香港", sub: { en: "Route 6 · CKR · T2", zh: "六号干线 · 中九龙 · T2" }, side: "left", always: true }
  ];
  function renderMap() {
    var box = $(".map-pins");
    if (!box) return;
    box.innerHTML = pins.map(function (p) {
      var label = p.en ? '<span>' + esc(L(p.en, p.zh)) + '<small>' + esc(t(p.sub)) + '</small></span>' : "";
      return '<div class="pin' + (p.hq ? " is-hq" : "") + (p.side === "left" ? " left" : "") + (p.always ? " always" : "") + '" style="left:' + p.x + '%;top:' + p.y + '%"><i></i>' + label + '</div>';
    }).join("");
    var legend = $(".map-legend") || document.createElement("div");
    legend.className = "map-legend";
    legend.innerHTML = '<span class="hq"><i></i>' + L("Headquarters", "总部") + '</span><span><i></i>' + L("Project references", "项目业绩") + '</span>';
    $(".map").appendChild(legend);
  }
  function metric(p) {
    if (p.flow) return '<b>' + p.flow.toLocaleString("en-US") + '</b><span>m³/s' + (p.stations > 1 ? " · " + p.stations + " " + L("stations", "座净化站") : "") + '</span>';
    return '<b>' + esc(t(TYPES[p.type])) + '</b>';
  }
  function renderFeatured() {
    var box = $("#featured-projects");
    if (!box) return;
    var badges = { ckr: L("Largest CTA project", "CTA 最大项目"), m30: L("Largest single station", "单站风量最大"), laerdal: L("World's longest road tunnel", "世界最长公路隧道"), festning: L("Since 1989", "始于 1989") };
    box.innerHTML = P.filter(function (p) { return p.featured; }).map(function (p) {
      var inner = '<img src="' + esc(url(p.image)) + '" alt="' + esc(t(p.name)) + '" loading="lazy">' +
        (badges[p.id] ? '<span class="fcard-badge">' + esc(badges[p.id]) + '</span>' : "") +
        '<div class="fcard-body"><span class="fcard-place">' + esc(t(p.place)) + '</span><h3>' + esc(t(p.name)) + '</h3><p>' + esc(t(p.note) || t(p.spec)) + '</p>' +
        '<div class="fcard-metric">' + metric(p) + '</div>' + (p.page ? '<span class="fcard-more">' + L("Project story →", "项目故事 →") + '</span>' : "") + '</div>';
      return p.page ? '<a class="fcard reveal" href="' + esc(url(p.page)) + '">' + inner + '</a>' : '<article class="fcard reveal">' + inner + '</article>';
    }).join("");
    window.__observeReveal($$(".fcard", box));
  }
  var filter = "all";
  function renderTable() {
    var body = $("#ref-body");
    if (!body) return;
    var rows = P.filter(function (p) { return filter === "all" || p.region === filter; });
    body.innerHTML = rows.map(function (p) {
      var img = p.thumb || p.image;
      var name = esc(t(p.name));
      if (p.page) name = '<a class="ref-link" href="' + esc(url(p.page)) + '">' + name + ' →</a>';
      return '<tr><td><div class="ref-name">' + (img ? '<img src="' + esc(url(img)) + '" alt="" loading="lazy">' : '<span class="ph"></span>') +
        '<div>' + name + '<small>' + esc(t(p.spec)) + '</small></div></div></td>' +
        '<td>' + esc(t(p.place)) + '</td>' +
        '<td><span class="type-badge">' + esc(t(TYPES[p.type])) + '</span></td>' +
        '<td class="num">' + (p.flow ? p.flow.toLocaleString("en-US") + " m³/s" : '<span class="dim">—</span>') + '</td>' +
        '<td class="' + (p.years === "—" ? "dim" : "") + '">' + esc(p.years || "—") + '</td></tr>';
    }).join("");
  }
  $$(".chip").forEach(function (c) {
    c.addEventListener("click", function () {
      filter = c.getAttribute("data-filter");
      $$(".chip").forEach(function (x) { x.classList.toggle("is-active", x === c); });
      renderTable();
    });
  });

  /* ---------- newsroom & documentary ---------- */
  // ?demo=1 且页面加载了 data/news.sample.js 时，用示例数据预览版式
  var N = (/[?&]demo=1/.test(location.search) && window.CTA_NEWS_SAMPLE) || window.CTA_NEWS || { documentary: null, items: [] };
  var PAGES = window.CTA_NEWS_PAGES || [];
  var TAGS = { project: { en: "Project", zh: "项目动态" }, documentary: { en: "Documentary", zh: "纪录片" }, event: { en: "Event", zh: "活动展会" }, company: { en: "Company", zh: "公司新闻" } };
  var playIcon = '<svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
  function fmtDate(d) {
    var dt = new Date(d + "T00:00:00");
    if (isNaN(dt)) return esc(d);
    return lang === "zh" ? dt.getFullYear() + " 年 " + (dt.getMonth() + 1) + " 月 " + dt.getDate() + " 日"
      : dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function renderDoc() {
    var d = N.documentary, box = $("#doc-feature");
    if (!box) return;
    if (d) {
      var eps = (d.episodes || []).map(function (e, i) {
        return '<button class="ep" type="button" data-ep="' + i + '"><img src="' + esc(url(e.poster || d.poster)) + '" alt="" loading="lazy"><span><b>' + esc(t(e.title)) + '</b><small>' + esc(e.length || "") + '</small></span></button>';
      }).join("");
      box.innerHTML = '<div class="doc"><button class="doc-hero" type="button" data-ep="-1"><img src="' + esc(url(d.poster)) + '" alt="" loading="lazy"><span class="doc-play">' + playIcon + '</span>' +
        '<span class="doc-info"><span class="doc-kicker">' + L("Documentary", "纪录片") + (d.meta ? " · " + esc(t(d.meta)) : "") + '</span><h3>' + esc(t(d.title)) + '</h3><p>' + esc(t(d.subtitle)) + '</p></span></button>' +
        (eps ? '<div class="doc-side"><h4>' + L("Episodes & clips", "分集与花絮") + '</h4>' + eps + '</div>' : "") + '</div>'
      if (d.link) box.innerHTML += '<p class="doc-link"><a class="text-link" href="' + esc(d.link) + '" target="_blank" rel="noopener">' + L("Watch on YouTube ↗", "在 YouTube 观看 ↗") + '</a></p>';
      $$("[data-ep]", box).forEach(function (b) {
        b.addEventListener("click", function () {
          var i = +b.getAttribute("data-ep");
          var src = i < 0 ? d : (d.episodes[i] || {});
          openVideo(src.video || d.video, src.embed || d.embed);
        });
      });
    } else {
      box.innerHTML = '<div class="doc-empty"><div class="doc-empty-media"><img src="' + esc(url("assets/img/esp-hall.webp")) + '" alt="" loading="lazy"></div><div class="doc-empty-body">' +
        '<span class="soon">' + L("In production", "摄制中") + '</span><h3>' + L("A documentary about the people who keep tunnel air clean.", "一部关于守护隧道空气之人的纪录片。") + '</h3>' +
        '<p>' + L("We are documenting our tunnel projects — from engineering and installation to the cities they protect. Episodes and behind-the-scenes clips will premiere here.", "我们正在记录 CTA 的隧道项目——从工程设计、现场安装，到它们守护的城市。正片与幕后花絮将在这里首发。") + '</p>' +
        '<a class="btn btn-light" href="' + esc(url("about.html#contact")) + '" style="justify-self:start;width:fit-content">' + L("Media enquiries", "媒体合作") + '</a></div></div>';
    }
  }
  // publishFrom（可选，YYYY-MM-DD）：未到日期的条目不显示
  function newsItems() {
    return (N.items || []).filter(function (n) { return !n.publishFrom || n.publishFrom <= asof; })
      .sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
  }
  function renderNewsGrids() {
    $$(".news-grid").forEach(function (grid) {
      var items = newsItems();
      var proj = grid.getAttribute("data-project"), limit = +grid.getAttribute("data-limit") || 0;
      var skip = grid.getAttribute("data-skip");
      if (proj) items = items.filter(function (n) { return n.project === proj; });
      if (skip) items = items.filter(function (n) { return n.id !== skip; });
      if (limit) items = items.slice(0, limit);
      grid.innerHTML = items.map(function (n) {
        var tag = TAGS[n.tag] ? t(TAGS[n.tag]) : "";
        var internal = n.id && PAGES.indexOf(n.id) > -1;
        var href = internal ? url("news/" + n.id + ".html") : n.link;
        var inner = (n.image ? '<img src="' + esc(url(n.image)) + '" alt="" loading="lazy">' : "") +
          '<div class="news-body"><div class="news-meta">' + (tag ? '<span class="news-tag">' + esc(tag) + '</span>' : "") + '<time datetime="' + esc(n.date) + '">' + fmtDate(n.date) + '</time></div>' +
          '<h3>' + esc(t(n.title)) + '</h3><p>' + esc(t(n.summary)) + '</p>' + (href ? '<span class="news-more">' + L("Read more →", "阅读全文 →") + '</span>' : "") + '</div>';
        if (!href) return '<article class="news">' + inner + '</article>';
        return '<a class="news" href="' + esc(href) + '"' + (internal ? "" : ' target="_blank" rel="noopener"') + '>' + inner + '</a>';
      }).join("");
      var sec = grid.closest("[data-hide-if-empty]");
      if (sec) sec.hidden = !items.length;
    });
  }
  $$("time[data-fmt]").forEach(function (el) { renderers.push(function () { el.textContent = fmtDate(el.getAttribute("datetime")); }); });

  /* ---------- video: lightbox + inline players ---------- */
  var lb = $("#lightbox"), lbBody = $(".lightbox-body", lb), lastFocus = null;
  function openVideo(video, embed) {
    lastFocus = document.activeElement;
    if (embed) lbBody.innerHTML = '<iframe src="' + esc(embed) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    else if (video) lbBody.innerHTML = '<video src="' + esc(video) + '" controls autoplay playsinline></video>';
    else lbBody.innerHTML = '<div class="lightbox-msg">' + L("The video will be available soon.", "视频即将上线，敬请期待。") + '</div>';
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lightbox-close", lb).focus();
  }
  function closeVideo() { lb.hidden = true; lbBody.innerHTML = ""; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  $(".lightbox-close", lb).addEventListener("click", closeVideo);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeVideo(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !lb.hidden) closeVideo(); });
  // 页面内嵌播放：<button class="video-poster" data-embed="..."> 点击后原地换成 iframe
  $$(".video-poster[data-embed]").forEach(function (b) {
    b.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = b.getAttribute("data-embed") + (b.getAttribute("data-embed").indexOf("?") > -1 ? "&" : "?") + "autoplay=1";
      f.allow = "autoplay; fullscreen; picture-in-picture";
      f.setAttribute("allowfullscreen", "");
      f.title = b.getAttribute("aria-label") || "Video";
      b.parentNode.replaceChild(f, b);
    });
  });

  /* ---------- contact form (mailto) ---------- */
  var form = $("#contact-form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, ok = true;
    ["name", "email", "message"].forEach(function (n) {
      var el = f.elements[n], bad = !el.value.trim() || (n === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.classList.toggle("is-invalid", bad);
      if (bad && ok) { el.focus(); ok = false; }
    });
    if (!ok) return;
    var subject = "Website enquiry — " + f.elements.name.value + (f.elements.company.value ? " (" + f.elements.company.value + ")" : "");
    var body = f.elements.message.value + "\n\n—\n" + f.elements.name.value + "\n" + f.elements.company.value + "\n" + f.elements.email.value;
    var st = $(".form-status", f) || f.appendChild(document.createElement("p"));
    st.className = "form-status";
    st.innerHTML = L("Your email app should open with the message filled in. If it doesn't, write to <b>Johan@cta.no</b>.", "将打开您的邮件客户端并填好内容；如未打开，请直接发邮件至 <b>Johan@cta.no</b>。");
    location.href = "mailto:Johan@cta.no?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  });

  $("#year").textContent = new Date().getFullYear();

  /* ---------- sub-page hero: animated airflow ----------
     尾气颗粒（暖灰）从左随气流进入，穿过右侧的静电除尘段（淡蓝光带）：
     大部分被捕获（闪一下消失），少数变成蓝色洁净气流继续流走。
     页头不在视野内或标签页隐藏时暂停；prefers-reduced-motion 只画一帧。 */
  function heroFx(hero) {
    var c = document.createElement("canvas");
    c.className = "hero-fx";
    c.setAttribute("aria-hidden", "true");
    hero.insertBefore(c, hero.firstChild);
    var ctx = c.getContext && c.getContext("2d");
    if (!ctx) return;
    var W = 0, H = 0, fx = 0, parts = [], flashes = [], t = 0, raf = 0, visible = true;
    function spawn(initial) {
      var keep = Math.random() < 0.2;
      var x = initial ? (keep ? Math.random() * W : Math.random() * fx) : -8 - Math.random() * 40;
      return { x: x, y: Math.random() * H, v: 0.35 + Math.random() * 0.85, r: 1.1 + Math.random() * 1.7, keep: keep, wob: Math.random() * 6.28, passed: x > fx };
    }
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth; H = hero.clientHeight;
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fx = W < 700 ? W * 0.8 : W * 0.66;
      var n = Math.round(Math.max(30, Math.min(170, (W * H) / 5200)));
      parts = []; flashes = [];
      for (var i = 0; i < n; i++) parts.push(spawn(true));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var k, x, y;
      // 气流线
      ctx.lineWidth = 1;
      for (k = 0; k < 6; k++) {
        var y0 = H * (0.16 + k * 0.14);
        ctx.beginPath();
        for (x = 0; x <= W + 24; x += 24) {
          y = y0 + Math.sin(x * 0.0045 + t * 0.006 + k * 1.3) * 9;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(90,178,255," + (k % 2 ? 0.08 : 0.055) + ")";
        ctx.stroke();
      }
      // 静电除尘段：光带 + 极板
      var g = ctx.createLinearGradient(fx - 70, 0, fx + 70, 0);
      g.addColorStop(0, "rgba(90,178,255,0)");
      g.addColorStop(0.5, "rgba(90,178,255,0.11)");
      g.addColorStop(1, "rgba(90,178,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(fx - 70, 0, 140, H);
      var pg = ctx.createLinearGradient(0, 0, 0, H); // 极板上下渐隐
      pg.addColorStop(0, "rgba(90,178,255,0)");
      pg.addColorStop(0.3, "rgba(90,178,255,0.16)");
      pg.addColorStop(0.7, "rgba(90,178,255,0.16)");
      pg.addColorStop(1, "rgba(90,178,255,0)");
      ctx.fillStyle = pg;
      for (k = -2; k <= 2; k++) ctx.fillRect(Math.round(fx + k * 12), 0, 1, H);
      // 颗粒
      for (var i = 0; i < parts.length; i++) {
        var s = parts[i];
        var quiet = Math.min(1, Math.max(0.25, s.x / (W * 0.45))); // 左侧文字区更安静
        if (!s.passed) {
          ctx.fillStyle = "rgba(220,202,176," + (0.72 * quiet).toFixed(3) + ")";
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
        } else {
          var sg = ctx.createLinearGradient(s.x - 26, 0, s.x, 0);
          sg.addColorStop(0, "rgba(90,178,255,0)");
          sg.addColorStop(1, "rgba(120,195,255,0.8)");
          ctx.strokeStyle = sg;
          ctx.lineWidth = s.r;
          ctx.lineCap = "round";
          ctx.beginPath(); ctx.moveTo(s.x - 26, s.y); ctx.lineTo(s.x, s.y); ctx.stroke();
        }
      }
      for (i = 0; i < flashes.length; i++) {
        var f = flashes[i], a = 1 - f.age / 22;
        ctx.strokeStyle = "rgba(150,210,255," + (0.75 * a).toFixed(3) + ")";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(f.x, f.y, 2 + f.age * 0.45, 0, 6.2832); ctx.stroke();
      }
    }
    function step() {
      t++;
      for (var i = 0; i < parts.length; i++) {
        var s = parts[i];
        s.x += s.v * (s.passed ? 1.8 : 1);
        s.y += Math.sin(t * 0.02 + s.wob) * 0.12;
        if (!s.passed && s.x >= fx - 20 + Math.random() * 40) {
          s.passed = true;
          if (!s.keep) { flashes.push({ x: s.x, y: s.y, age: 0 }); parts[i] = spawn(false); continue; }
        }
        if (s.x > W + 14) parts[i] = spawn(false);
      }
      for (i = flashes.length - 1; i >= 0; i--) if (++flashes[i].age > 22) flashes.splice(i, 1);
    }
    function loop() { step(); draw(); raf = requestAnimationFrame(loop); }
    function play() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); }
    function pause() { cancelAnimationFrame(raf); raf = 0; }
    size(); draw();
    if (reduce) { window.addEventListener("resize", function () { size(); draw(); }); return; }
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { size(); draw(); }, 150); });
    document.addEventListener("visibilitychange", function () { document.hidden ? pause() : play(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible ? play() : pause(); }).observe(hero);
    }
    play();
  }
  $$(".page-hero, .detail-hero").forEach(heroFx);

  /* ---------- init ---------- */
  renderers.push(renderMap, renderFeatured, renderTable, renderDoc, renderNewsGrids);
  setLang(lang);
  window.__observeReveal($$(".reveal"));
})();
