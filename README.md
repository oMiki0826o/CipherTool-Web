# CipherTool Web

CipherTool Web 是 CipherTool 的瀏覽器版：把經典密碼與文字編碼整理成一個不需登入、資料不離開裝置的靜態工作台。它是獨立於原 Python 專案的 Next.js App Router 專案，適合直接部署到 GitHub Pages。

**線上網址（部署後）**：`https://omiki0826o.github.io/CipherTool-Web/`

## 功能

- 凱撒、ROT13、Atbash、維吉尼亞、仿射、欄柵密碼
- Base64、十六進位、URL、摩斯編碼
- 每個工具皆有獨立路由 `/tools/<slug>/`
- 深色／淺色主題、響應式版面、結果複製
- 純瀏覽器處理：不上傳文字、不需要帳號

這些經典密碼僅供學習與相容性用途，不是現代安全加密方案。

## 開發

```bash
npm install
npm run dev
npm run check
```

`check` 會依序執行 Vitest、TypeScript 檢查與 Next.js 靜態建置。輸出位於 `out/`。

## 架構

```text
app/                  App Router 頁面與靜態輸出
components/           工作台與主題切換元件
lib/tools/            密碼、編碼與工具註冊表
docs/superpowers/     設計規格與實作計畫
.github/workflows/    GitHub Pages 部署
```

## English

CipherTool Web is a small, static Next.js workbench for classical ciphers and text encodings. It runs entirely in the browser: no account, upload, or server-side processing is required. This project is separate from the original Python `CipherTool` repository and is intended for learning and compatibility, not modern cryptographic security.

## 授權

本專案採 MIT License。原始 CipherTool 專案與第三方資料的授權仍以各自 repository 的文件為準。
