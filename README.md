# AIM for Pathology

AIM for Pathology 团队网站，基于 Next.js + Tailwind CSS + Contentlayer 构建，部署在 GitHub Pages。

**线上地址**: https://zhaolin-yu.github.io/aim-pathology/

## 技术栈

- **框架**: Next.js 15 (Static Export)
- **样式**: Tailwind CSS 4
- **内容**: Contentlayer (MDX)
- **部署**: GitHub Pages (GitHub Actions 自动构建)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:3000

## 构建

```bash
# 标准构建
npm run build

# 静态导出构建（与 GitHub Pages 部署一致）
npm run build:export
```

构建产物输出到 `out/` 目录。

## 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动触发构建（`.github/workflows/pages.yml`）
3. 构建完成后自动部署到 GitHub Pages

**手动触发**: 也可以在 GitHub 仓库的 Actions 页面手动触发 `workflow_dispatch`。

### 部署配置说明

| 配置项        | 值               | 说明                         |
| ------------- | ---------------- | ---------------------------- |
| `EXPORT`      | `1`              | 启用 Next.js 静态导出        |
| `UNOPTIMIZED` | `1`              | 禁用图片优化（静态部署需要） |
| `BASE_PATH`   | `/aim-pathology` | GitHub Pages 子路径          |
| Node.js       | `22`             | 构建环境 Node 版本           |

### GitHub Pages 设置

确保仓库设置中：

- **Settings → Pages → Source** 选择 `GitHub Actions`

## 项目结构

```
├── app/                  # Next.js App Router 页面
│   ├── Main.tsx          # 首页主组件
│   └── publications/     # Research 详情页
├── components/           # 可复用组件
├── data/
│   ├── headerNavLinks.ts # 导航链接配置
│   ├── teamData.ts       # 团队成员数据
│   └── publication/      # 研究项目 MDX 文件
├── public/static/images/ # 图片资源
└── .github/workflows/    # CI/CD 配置
```

## 内容管理

### 添加研究项目

在 `app/Main.tsx` 的 `EXTRA_PROJECTS` 数组中添加新条目：

```ts
{
  slug: '_project-id',
  title: '项目标题',
  date: '2026-01-01',
  dateLabel: '2026.01',
  venue: '发表位置',
  authors: ['作者名'],
  tags: [] as string[],
  image: '/static/images/project-image.png',
  noLink: true,
},
```

图片放到 `public/static/images/`，建议压缩到 300px 宽度。同时在 `Main.tsx` 中添加对应的 import 和 `LOCAL_IMAGE_MAP` 映射。

### 添加团队成员

在 `data/teamData.ts` 的 `TEAM_MEMBERS` 数组中添加，按 PhD → Master → Bachelor 顺序，同级别按姓名 A-Z 排列。
