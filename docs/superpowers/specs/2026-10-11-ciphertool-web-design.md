# CipherTool Web 設計規格

## 目標

將既有 Python CipherTool 的核心古典密碼、編碼與完整性工具，重新實作成不需後端的 Next.js 靜態網站，部署至 GitHub Pages。原始 `ciphertool/` 不修改、不搬移 Git 歷史；新專案只以其公開功能與測試作為行為參考。

## 使用者流程

使用者進入首頁後選擇工具，進入獨立 `/tools/[slug]/` 路由，輸入文字與參數，即時得到輸出；可複製、下載或清除結果。所有資料只在瀏覽器記憶體中處理，不上傳、不建立帳號、不保存密文。

## 第一版範圍

- Caesar、ROT13、Atbash、Vigenère、Affine、Rail Fence。
- Base64、Hex、URL encoding、Morse。
- SHA-256 完整性雜湊。
- 繁體中文介面，工具名稱與核心說明附英文副標。
- 深淺主題、手機版、Static Export、404、GitHub Pages 部署。

## 架構

`lib/tools/` 保存純函式與 registry；`components/` 保存共用輸入、輸出與主題元件；App Router 的工具頁只負責組合 registry 與共用 workbench。所有純函式不依賴 DOM，先由 Vitest 驗證，再由頁面使用。

## 安全與限制

古典密碼只供學習與相容性用途，不宣稱現代加密安全性。SHA-256 使用瀏覽器 Web Crypto API。頁面必須清楚顯示此限制，避免把 ROT13、Base64 或古典密碼誤當成安全加密。

## 驗收條件

1. `npm run test`、`npm run typecheck`、`npm run build` 通過。
2. Static Export 產生首頁、工具頁與 404。
3. 每個第一版工具均有純函式測試與可操作路由。
4. GitHub Actions 能以 `npm ci` 建置並部署 `out/`。
5. README 中英雙語、MIT License、治理入口與瀏覽器端資料處理說明完整。
