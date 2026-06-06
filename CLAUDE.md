# 软考通 — 软考备考资讯站

## 技术栈

- React 19 + TypeScript + Vite 6
- shadcn/ui v4（基于 @base-ui/react）
- Tailwind CSS 3 + CSS 变量主题
- lucide-react（图标，零 emoji）
- react-router-dom v7（路由）
- MiniSearch（客户端全文搜索）
- react-markdown + remark-gfm（Markdown 渲染）
- react-helmet-async（页面 SEO）
- tw-animate-css（CSS 动画）

## 项目结构

```
src/
├── components/
│   ├── ui/          # shadcn 组件 + 自建公共组件
│   │   ├── button.tsx, card.tsx, badge.tsx, input.tsx ...
│   │   ├── FilterPills.tsx    # 分类筛选按钮组
│   │   ├── DetailBreadcrumb.tsx  # 详情页面包屑 + 返回按钮
│   │   ├── PageHeader.tsx     # 页面标题头
│   │   ├── PaginationBar.tsx  # 分页栏
│   │   └── SEO.tsx            # 页面 Meta/Helmet
│   ├── layout/     # 布局组件
│   │   ├── Header.tsx   # 顶部导航（grid-cols-3 布局）
│   │   ├── Footer.tsx   # 页脚
│   │   └── Layout.tsx   # 整体布局外壳
│   ├── home/       # 首页组件
│   │   ├── WelcomeBanner.tsx   # 欢迎横幅 + 倒计时
│   │   ├── RecentArticles.tsx  # 最新资讯列表
│   │   ├── SiteActivity.tsx    # 备考指南（三阶段时间线）
│   │   ├── SidebarWidgets.tsx  # 侧栏（倒计时卡片 + 标签云 + 热门下载）
│   │   └── TagCloud.tsx        # 标签云
│   ├── article/
│   │   └── ArticleCard.tsx     # 文章列表行
│   └── resource/
│       └── ResourceCard.tsx    # 资料卡片
├── pages/          # 页面组件（按路由命名）
│   ├── HomePage.tsx
│   ├── CategoryPage.tsx
│   ├── ArticlePage.tsx
│   ├── SearchPage.tsx
│   ├── ResourceListPage.tsx
│   ├── ResourceDetailPage.tsx
│   └── AboutPage.tsx
├── lib/            # 逻辑层
│   ├── content.ts  # 文章内容加载、排序、分类、标签、分页
│   ├── resources.ts # 资料数据
│   ├── search.ts   # MiniSearch 搜索
│   ├── theme.tsx   # 三态主题（light/dark/system）
│   └── utils.ts    # 工具函数（cn）
└── types/
    └── content.ts  # Article / ArticleFrontmatter 类型
```

## 约定

### 文章（Markdown）

放在 `src/content/<分类名>/<文件名>.md`，frontmatter 格式：

```yaml
---
title: 文章标题
date: 2026-06-05
category: 情报速递        # 必须匹配 categorySlugMap 的值
tags: [标签1, 标签2]      # 用于搜索和标签云
description: 摘要文字     # 用于列表展示和 SEO
sticky: true              # 可选，置顶文章
featured: true            # 可选，精华文章
pdf: /path/to/file.pdf    # 可选，附件
---
```

### 资料（静态数据）

编辑 `src/lib/resources.ts`，添加 `ResourceInfo` 对象和 `resourceDetailMap` 条目。

### 路由规则

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | HomePage | 首页 |
| `/category` | CategoryPage | 资讯列表 |
| `/category/:slug` | CategoryPage | 按分类筛选 |
| `/category/:catSlug/:articleSlug` | ArticlePage | 文章详情 |
| `/article/:slug` | ArticlePage | 文章详情（旧格式） |
| `/resources` | ResourceListPage | 资料库列表 |
| `/resources/category/:catSlug` | ResourceListPage | 按分类筛选 |
| `/resources/:id` | ResourceDetailPage | 资料详情 |
| `/search?q=xxx` | SearchPage | 搜索 |
| `/about` | AboutPage | 关于 |

### 排序规则

- `getSortedArticles()` — 置顶优先 → 按日期倒序（用于分类页）
- `getDateSortedArticles()` — 纯按日期倒序（用于首页最新资讯）
- `getArticlesByCategory()` — 置顶优先 → 按日期倒序

### 主题

三态切换：light → dark → system。CSS 变量在 `globals.css` 的 `:root` 和 `.dark` 中定义。

### 图片 / 资源引用

- favicon: `/vite.svg`（替换 `public/vite.svg`）
- PDF: 通过 `/api/pdf/<filename>` 访问（需 R2 后端配合）

### 环境变量

- `VITE_EXAM_DATE` — 考试日期（默认 `2026-11-07`），在 `wrangler.toml` 中配置
