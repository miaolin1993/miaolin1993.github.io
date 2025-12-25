---
date: 2025-03-18 14:30:00
title: Github Action一键部署博客
link: /blog/github-action
---
# {{ $frontmatter.title }}

大概原理是提供一个ci脚本，供github action监听到对应分支的push操作时，调用执行，存放位置在项目根目录

```.github/workflows/deploy.yml```

## 本地项目里配置

脚本参照这个, 具体根据使用场景调整

```yml
name: Deploy to GitHub Pages

on:
  # 每次推送到 master 分支时触发
  push:
    branches: [master]
  
  # 也允许手动触发
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 不是必需的，但有助于获取完整的 git 历史
      
      - name: Install pnpm
        run: npm install -g pnpm@latest

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22.20.0
          cache: pnpm # 或者 yarn, pnpm 根据你使用的包管理器调整

      - name: Setup Pages
        uses: actions/configure-pages@v3
      
      - name: Install dependencies
        run: pnpm install # 或者 npm install, yarn install, pnpm install
      
      - name: Build with VitePress
        run: pnpm run docs:build # 根据你的 package.json 脚本调整
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

之后确认下项目base路径是否正确，github.io默认就是根路径/

检查下package.json里脚本是否正确

## 远程仓库操作

检查远程仓库
``` git remote -v ```

创建远程仓库
``` git remote add origin <新的远程仓库URL> ```

修改远程仓库
``` git remote set-url origin <新的远程仓库URL> ```

## github网站操作

1.提交代码进入仓库

2.在Settings -> Pages的Build and deployment -> Source中选择GitHub Actions

之后本地git push就会生成ci流水线了

遇到构建错误可以去github actions查看具体错误日志，排查即可

