[← 返回 README.md](../../README.md)

# 工具腳本

本資料夾包含專案的工具腳本，用於建置時期的配置載入與處理。

---

## 檔案列表

### NPM Scripts (`package.json`)

以下是專案中常用的指令：

| 指令                       | 用途             | 說明                                                                |
| :------------------------- | :--------------- | :------------------------------------------------------------------ |
| `npm run dev`              | 開發環境         | 啟動 Nuxt 開發伺服器，支援 Hot Reload。                             |
| `npm run build`            | 專案建置         | 編譯專案並準備生產環境部署檔案。                                    |
| `npm run build:staging`    | Staging 建置     | 指定 `NODE_ENV=staging` 進行建置。                                  |
| `npm run generate`         | 靜態生成         | 生成靜態 HTML 檔案 (SSG)。                                          |
| `npm run generate:staging` | Staging 靜態生成 | 指定 `NODE_ENV=staging` 進行靜態生成。                              |
| `npm run preview`          | 預覽建置         | 在本地啟動伺服器預覽已建置的內容。                                  |
| `npm run lint`             | 程式碼檢查       | 使用 ESLint 檢查並自動修復常見的程式碼規範問題。                    |
| `npm run format`           | 格式檢查         | 使用 Prettier 檢查程式碼格式是否符合規範。                          |
| `npm run format:write`     | 格式修復         | 使用 Prettier 自動修復所有程式碼格式問題。                          |
| `npm run commit`           | 規範提交         | 啟動 Commitizen 引導式介面，生成符合規範的 Commit Message。         |
| `npm run clone`            | 複製專案         | 執行 `clone-project.bat` 腳本，快速複製排除 `node_modules` 的專案。 |
| `npm run package-filter`   | 套件篩選         | 根據公司需求 (`package-clients.json`) 產生客製化的 `package.json`。 |

---

### product-loader.ts

**用途**: 產品設定檔載入器

**功能說明**:

- 載入 `configs/` 目錄下的 JSON 產品設定檔
- 支援透過環境變數切換不同產品配置
- 提供型別安全的設定介面

---

## 🔧 product-loader.ts 詳細說明

### 核心功能

這個腳本是專案的「配置中樞」。它負責在專案啟動或建置時，根據環境變數讀取對應的產品設定檔，實現「一套程式碼，多種配置輸出」的效果。

### 什麼時機會用到？（使用場景）

1.  **品牌貼牌 (White-labeling)**:
    當你需要將同一個系統交付給不同客戶，且每個客戶需要不同的標題、Favicon 或主題顏色時，可以建立 `configs/client-a.json` 與 `configs/client-b.json`。

2.  **功能開關 (Feature Toggling)**:
    透過 `modules` 屬性，你可以決定該產品是否要載入特定的功能模組（如：核保、報表）。未在 `modules` 列表中的路由將不會產生，達到代碼層級的隔離。

3.  **環境隔離**:
    在不同的主機環境（Dev / Staging / Prod）中，如果 API 位址或特定功能需要微調，可以透過切換配置檔來達成，而不需要改動任何主程式。

### 運作原理

1.  **讀取順序**:
    - 系統會優先查找環境變數 `PRODUCT_CONFIG` 的值。
    - 若無設定，預設讀取 `configs/default.json`。
2.  **型別安全**:
    - 腳本定義了 `ProductConfig` 介面，確保配置檔內容符合格式規範。
3.  **防錯處理**:
    - 如果指定的 JSON 不存在，腳本會報警告並回傳預設的空配置，確保程式不會因為讀不到設定而當機。

### 設定檔位置與結構

資料夾位置：`configs/`

```json
{
  "modules": ["showcase", "uw"], // 控制要開啟的功能模組
  "meta": {
    "title": "專案標題", // 瀏覽器標題
    "favicon": "/logo.png" // 網頁圖示
  },
  "customSetting": "any-value" // 也可以放置任何自定義的業務設定
}
```

### 如何啟動特定配置

使用 `cross-env` 指定產品名稱即可：

```bash
# 啟動 Client-A 的開發環境
PRODUCT_CONFIG=client-a npm run dev

# 進行 Staging 環境的正式打包
PRODUCT_CONFIG=staging npm run build
```

---

## 其他工具

### clone-project.bat

**用途**: 快速複製專案 (排除 `node_modules` 等不必要檔案)

**使用方式**:

1. **直接執行**:
   在檔案總管中雙擊 `clone-project.bat`。

2. **透過指令啟動**:
   ```bash
   npm run clone
   ```

**功能說明**:

- 自動排除 `node_modules`, `.nuxt`, `.output`, `.git`, `.agent`, `.gemini` 等資料夾。
- 排除 `pnpm-lock.yaml`, `*.log` 等建置產生的檔案。
- 會提示輸入目標路徑，並在目標路徑已存在時請求確認。

---

## 使用場景

### 多產品/多環境部署

當專案需要為不同客戶或環境 (如 Dev/Staging/Prod) 提供不同配置時，可以建立對應的 JSON 檔案並透過環境變數切換。

例如建立 `configs/staging.json`，然後執行：

```bash
PRODUCT_CONFIG=staging npm run build
```

---

## 相關文件

- [專案檔案說明](../project/file-reference.md)
- [開發手冊](./development-manual.md)

---

### package-filter.mjs

**用途**: 客製化 Package 依賴管理工具

**使用方式**:

```bash
npm run package-filter
```

**功能說明**:

- **Source of Truth**: 以 `package.master.json` 作為唯一真理來源。
- **Client Policy**: 讀取 `package-clients.json` 定義的各公司政策（白名單/黑名單）。
- **自動修剪**: 根據選擇的公司政策，自動移除不允許或不需要的 `dependencies` 與 `scripts`。
- **防止漂移**: 每次執行都會強制重置 `package.json`，確保專案依賴完全符合政策規範。

**設定檔範例 (`package-clients.json`)**:

```json
{
  "Fubon": {
    "exclude": ["@nuxtjs/device", "@commitlint/cli"],
    "description": "富邦銀行不使用 device 套件與 Git 開發工具"
  }
}
```
