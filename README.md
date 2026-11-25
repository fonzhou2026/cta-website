# Clean Tunnel Air International AS 官网（cta.no 重建版）

多页静态网站：HTML + CSS + 原生 JS，**无框架、无依赖**。页面由 `build.mjs` 从 `src/` 生成，生成结果就是可直接上传的静态文件（现有主机、OSS/S3、Netlify、Vercel、Cloudflare Pages 均可）。

## 页面
| 网址 | 内容 |
|---|---|
| `index.html` | 首页：轮播、关键数字、三条入口、六号干线专题、纪录片、最新新闻 |
| `technology.html` | 为什么需要净化 + 七个处理环节 |
| `applications.html` | 四种安装方式 |
| `projects.html` | 地图、精选项目、全部业绩表 |
| `projects/central-kowloon-route.html` | 项目故事：中九龙绕道（油麻地段） |
| `projects/kowloon-bay-t2.html` | 项目故事：九龙湾段（T2） |
| `news.html` | 纪录片 + 全部新闻 |
| `news/<id>.html` | 新闻详情（由 `data/news.js` 自动生成） |
| `about.html` | 公司、爱优特集团、联系方式与表单 |

中英双语：所有文字成对写 `<span class="en">` / `<span class="zh">`，右上角切换；`?lang=zh` / `?lang=en` 可直达。

## 目录
```
build.mjs             生成脚本（改完 src/ 或 data/ 后运行）
src/layout.html       公共框架：页头、导航、页脚、脚本
src/pages/            各页面正文（文件头 <!--page {...} --> 写标题/描述/导航高亮）
src/legacy-single-page.html   旧单页原版，仅作参考，不参与生成
data/projects.js      项目业绩（page 字段 = 有详情页）
data/news.js          新闻与纪录片
data/news-pages.js    生成文件，勿手改
assets/css/main.css   样式
assets/js/main.js     交互：轮播、技术流程、地图/筛选、新闻、视频、表单、按日期显示
_notes/               内部整理笔记——不要上传
```

## 日常更新
```bash
cd cta-website
node build.mjs                 # 生成全部页面（需要 Node 18+）
python3 -m http.server 8080    # 本地预览 http://localhost:8080
```
- **加新闻**：在 `data/news.js` 的 `items` 里加一条（`id`、`date`、`tag`、`title`、`summary`、`body`，可选 `project` / `embed` / `sources` / `publishFrom`），然后运行 `node build.mjs`
- **定时新闻**：写 `publishFrom: "YYYY-MM-DD"`。列表在该日期自动出现；详情页要在当天或之后**重新运行 build 并上传**才会生成
- **按日期切换的页面文字**：给元素加 `data-show-from="日期"`（该日起显示）、`data-hide-from="日期"`（该日起隐藏）、`data-done-from="日期"`（时间线打勾）。预览某一天：网址加 `?asof=2026-12-06`
- **加项目详情页**：复制 `src/pages/projects/kowloon-bay-t2.html` 改内容，再在 `data/projects.js` 对应项目加 `page`
- 每次 build 会给 CSS/JS 加新版本号，老访客不会拿到旧缓存

## 发布
- **GitHub Pages（预览站）**：仓库 `fonzhou2026/cta-website`，`main` 分支根目录直接发布。改完运行 `node build.mjs`，再 `git commit` + `git push`，一两分钟后生效
  - 预览站带 `noindex` 和 `robots.txt`，不会被搜索引擎收录；正式上线到 cta.no 时删掉 `src/layout.html` 里的 robots 那行和 `robots.txt`
- **其他主机**：上传除 `src/`、`_notes/`、`build.mjs`、`README.md`、`HANDOFF.md` 之外的全部文件
- `_notes/`、`HANDOFF.md` 和工程方版权图已写进 `.gitignore`，不会进仓库

## 上线前待办
- [ ] 高清原片：横幅图仅 2000×600，项目图仅 500px 宽，详情页和视频封面偏糊
- [ ] 核实中文译名与项目年份（M30、T2 原站未写年份）
- [ ] 联系表单目前通过邮件客户端发送（mailto），如需后台收件可接入 Formspree / 自有接口
