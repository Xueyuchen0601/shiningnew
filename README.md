# 善昱家族办公室官网

纯静态企业官网，可直接部署到 Vercel，无需安装依赖或运行构建命令。

## 文件结构

```text
.
├─ index.html
├─ style.css
├─ script.js
├─ vercel.json
├─ favicon.svg
├─ og.png
└─ assets/
   ├─ shining-logo-wide.png
   ├─ shining-mark.png
   └─ service-media/
```

## 本地预览

在项目根目录启动任意静态 HTTP 服务，例如：

```bash
npx serve .
```

## Vercel 部署

把项目根目录推送到 GitHub 后直接导入 Vercel。Framework Preset 选择 `Other`，Build Command、Install Command 和 Output Directory 均留空。
