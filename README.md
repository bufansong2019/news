# 软考通 · 软考备考资讯站

一个轻量级的软考备考资讯站，记录学习进度、分享备考资料。基于 React + shadcn/ui + Vite 构建。

## 功能

- **资讯文章** — Markdown 编写，支持分类、标签、置顶、精华标记
- **资料库** — PDF 资料在线阅读与下载（基于 Cloudflare R2）
- **全文搜索** — 客户端实时搜索文章和资料
- **备考倒计时** — 根据考试日期自动计算剩余天数
- **三态主题** — 浅色 / 深色 / 跟随系统
- **SEO** — 每页独立 meta 标题和描述

## 技术栈

| 工具 | 用途 |
|------|------|
| React 19 + TypeScript | 前端框架 |
| Vite 6 | 构建工具 |
| shadcn/ui + Tailwind CSS 3 | UI 组件库与样式 |
| react-router-dom v7 | 路由 |
| MiniSearch | 客户端搜索 |
| react-markdown + remark-gfm | Markdown 渲染 |
| react-helmet-async | SEO Meta 标签 |
| Cloudflare Pages | 部署平台 |
| Cloudflare R2 | PDF 存储 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务
npm run dev

# 构建生产版本
npm run build
```

## 内容管理

### 文章

在 `src/contents/<分类名>/` 下创建 `.md` 文件：

```yaml
---
title: 文章标题
date: 2026-06-05
category: 情报速递       # 情报速递 | 备考攻略 | 知识精粹 | 实战论文
tags: [标签1, 标签2]
description: 摘要文字
sticky: true             # 可选，置顶
featured: true           # 可选，精华
---
```

### 资料

编辑 `src/lib/resources.ts`，添加 PDF 文件名、大小、分类等信息。PDF 文件上传到 R2 桶的 `news/` 目录下。

## 部署

项目部署于 Cloudflare Pages，连接 GitHub 仓库后推送自动部署。

```bash
# 构建
npm run build

# 推送到 GitHub 触发自动部署
git push
```

## 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `VITE_EXAM_DATE` | 软考考试日期 | `2026-11-07` |

## 目录结构

```
src/
├── components/
│   ├── ui/            # 通用 UI 组件
│   ├── layout/        # 页头、页脚、布局外壳
│   ├── home/          # 首页组件
│   ├── article/       # 文章相关组件
│   └── resource/      # 资料相关组件
├── pages/             # 页面组件
├── lib/               # 逻辑层（内容加载、搜索、主题...）
├── content/           # Markdown 文章源文件
└── types/             # TypeScript 类型定义
```
