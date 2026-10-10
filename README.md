# CipherTool Web

CipherTool Web 是 CipherTool 的瀏覽器版：把經典密碼與文字編碼整理成一個不需登入、資料不離開裝置的靜態工作台。它是獨立於原 Python 專案的 Next.js App Router 專案，適合直接部署到 GitHub Pages。

**線上網址（部署後）**：`https://omiki0826o.github.io/CipherTool-Web/`

## 功能

- 25 個古典密碼、換位密碼與文字編碼工具，支援工具獨立頁面。
- 工具各自保留輸入參數，避免在切換工具時沿用其他工具的關鍵字。
- 分開呈現轉換結果與輸入錯誤，並提供複製、下載 TXT、清除輸入。
- 深色／淺色主題、手機版排版及基本鍵盤操作支援。
- 內容在瀏覽器端處理，無須登入。

### 演算法與格式限制

- Enigma I：固定 I-II-III 轉輪、反射器 B、環位 AAA、無插線板，採用歷史轉輪進位位置；不是可設定所有硬體參數的模擬器。
- Alberti：目前僅提供位移式教學示意，不等同歷史阿爾貝蒂密碼盤。
- Pigpen：採用 26 個 Unicode 符號示意，不等同標準豬圈密碼圖形字型。
- Cardano：固定 4×4 旋轉格柵，每次處理最多 16 個 Unicode 字元，未滿 16 個補 X；解密不會自動去除補字。
- Playfair：合併 I/J，必要時加入 X 或 Q，解密不會自動判定補字。
- Hill：非字母會移除，奇數長度補 X，必須使用可逆矩陣。
- 這些古典密碼**不適合保護真實敏感資料**。

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
