# 技术设计文档 (TECH_DESIGN)

## 一、 技术栈选择
- **前端核心**：语义化 HTML5 + 现代 CSS（CSS 变量 / Grid / Flexbox） + 原生 JavaScript (ES6+)
- **数据存储与 API 层**：基于浏览器 `localStorage` 封装统一的数据读写接口层（`StoreAPI`），实现前后台数据实时同步，无需额外部署后端服务器即可在 GitHub Pages 完整运行[cite: 15]。
- **部署平台**：GitHub Pages（基于 `/docs` 目录分支部署）。

## 二、 项目目录结构
personal-website/
├── PRD.md                 # 产品需求文档[cite: 6]
├── TECH_DESIGN.md         # 技术设计文档[cite: 13]
├── AGENTS.md              # AI 代理开发规范[cite: 13]
└── docs/                  # GitHub Pages 静态发布根目录
    ├── index.html         # 前台个人展示与后台管理一体化单页应用
    ├── style.css          # 深色星空主题与响应式样式表
    └── app.js             # 统一 API 数据层、星空 Canvas 引擎与前后台交互逻辑

## 三、 核心数据模型 (Data Schema)
```json
{
  "profile": {
    "name": "Donk",
    "role": "全栈开发工程师 / 计算机科学",
    "bio": "热衷于底层系统、Web 全栈开发与 AI 工程化实践。",
    "email": "donk@example.com"
  },
  "skills": [{ "id": 1, "name": "JavaScript / TypeScript", "level": 90 }],
  "projects": [{ "id": 1, "title": "电商图片提取插件", "desc": "Manifest V3 批量下载工具", "tag": "Chrome Extension" }],
  "posts": [{ "id": 1, "title": "如何使用 AI 驱动项目开发", "date": "2026-10-19", "summary": "基于 PRD、TECH_DESIGN 与 AGENTS 的标准化流程。" }]
}