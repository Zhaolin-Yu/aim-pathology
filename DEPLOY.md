# 部署到 GitHub Pages (github.io) — 操作步骤

按下面步骤做完，每次推送到 `main` 后会自动构建并发布到 github.io。

---

## 第一步：在 GitHub 上建仓库

1. 打开 [github.com/new](https://github.com/new)。
2. **Repository name** 二选一：
   - **项目站点**（推荐）：填 `aim-health-site`，最后访问地址为 `https://你的用户名.github.io/aim-health-site`。
   - **用户站点**：填 `你的用户名.github.io`，最后访问地址为 `https://你的用户名.github.io`（根路径）。
3. 选 **Public**，不勾选 “Add a README”（本地已有代码）。
4. 点 **Create repository**。

---

## 第二步：把本地项目推到你的仓库

在终端里进入项目目录，执行（把 `你的用户名` 换成你的 GitHub 用户名，仓库名与上一步一致）：

```bash
cd /home/zhaolin/Project/aim-health-site

# 若还没做过首次提交，先提交
git add -A
git commit -m "feat: initial commit for aim-health-site"

# 把原来的 origin 改名为 upstream（保留原仓库引用，可选）
git remote rename origin upstream

# 添加你自己的仓库为 origin
git remote add origin https://github.com/你的用户名/aim-health-site.git

# 推送到 GitHub（首次推送并设置上游分支）
git push -u origin main
```

如果是**用户站点**（仓库名为 `你的用户名.github.io`），把上面命令里的 `aim-health-site` 换成 `你的用户名.github.io`。

---

## 第三步：开启 GitHub Pages 并选 Actions 部署

1. 打开你的仓库页面，点 **Settings**。
2. 左侧点 **Pages**。
3. 在 **Build and deployment** 里：
   - **Source** 选 **GitHub Actions**。
4. 无需再点 Save（选完即生效）。

---

## 第四步：触发一次部署

- 若你刚完成 **第二步** 的 `git push`，Actions 会自动跑一次。
- 也可在仓库页顶栏点 **Actions**，选中 **GitHub Pages** workflow，点 **Run workflow** 再 **Run workflow** 手动跑一次。

等 workflow 变绿（约 2～5 分钟）后，在 **Settings → Pages** 里会看到类似 “Your site is live at …” 的地址。

---

## 访问地址

| 建仓方式       | 访问地址 |
|----------------|----------|
| 项目站点       | `https://你的用户名.github.io/aim-health-site` |
| 用户站点       | `https://你的用户名.github.io` |

---

## 之后更新网站

改完代码后执行：

```bash
git add -A
git commit -m "fix: 你的修改说明"
git push
```

推送后 Actions 会自动重新构建并部署，几分钟后刷新页面即可看到更新。

---

## 若构建失败

1. 打开仓库 **Actions** 页，点进失败的那次运行。
2. 点 **build** 或 **Deploy** 任务，查看红色报错。
3. 常见原因：依赖安装失败（可尝试在 workflow 里把 `yarn install --frozen-lockfile` 改为 `yarn install`）、Node 版本不匹配（workflow 里是 Node 20）。

当前仓库里的 `.github/workflows/pages.yml` 已配置好：  
使用 **configure-pages** 自动区分项目站点/用户站点并设置 `BASE_PATH`，无需再改 workflow。
