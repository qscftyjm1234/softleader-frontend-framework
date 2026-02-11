# Nuxt 3 開發包

一個基於 Nuxt 3 與 Ant Design Vue 的完整開發框架。

## 快速開始

### 1. 安裝相依套件

```bash
npm install
```

### 2. 環境設定

複製範例設定檔：

```bash
cp .env.example .env
```

詳細變數說明請參閱 **[環境設定指南](./docs/api/environment-setup.md)**。

### 3. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:3000` 即可看到頁面。

---

## 新手教學課程

專為新進人員設計，請依照順序完成。

- **[第一課：建立您的第一個頁面](./docs/course/lesson-1.md)**
- **[第二課：建立您的第一個元件](./docs/course/lesson-2.md)**
- **[第三課：UI 框架介紹 (AntD + Tailwind)](./docs/course/lesson-3.md)**
- **[第四課：UI 組件開發規範 (Components)](./docs/course/lesson-4.md)**
- **[第五課：客製化圖示系統 (Icons)](./docs/course/lesson-5.md)**
- **[第六課：頁面導航與路由 (Routing)](./docs/course/lesson-6.md)**
- **[第七課：API 串接與資料層 (Repository)](./docs/course/lesson-7.md)**
- **[第八課：全域狀態管理 (Pinia Store)](./docs/course/lesson-8.md)**
- **[第九課：Git 提交與工作流](./docs/course/lesson-9.md)**
- **[第十課：資安與權限控管 (Security & Watermark)](./docs/course/lesson-10.md)**
- **[第十一課：環境變數設定 (Env Variables)](./docs/course/lesson-11.md)**
- **[第十二課：進階表單處理 (Forms)](./docs/course/lesson-12.md)**
- **[第十三課：複雜對話框處理 (Complex Dialogs)](./docs/course/lesson-13.md)**
- **[第十四課：彈窗管理技巧 (Modal Management)](./docs/course/lesson-14.md)**
- **[第十五課：檔案上傳實戰 (File Upload)](./docs/course/lesson-15.md)**
- **[第十六課：資料格式化工具 (Utils)](./docs/course/lesson-16.md)**
- **[第十七課：資料列表與分頁 (Data List & Pagination)](./docs/course/lesson-17.md)**
- **[第十八課：搜尋與防抖 (Search & Debounce)](./docs/course/lesson-18.md)**
- **[第十九課：選項數據管理 (Option Management)](./docs/course/lesson-19.md)**
- **[第二十課：檔案下載與匯出 (File Download)](./docs/course/lesson-20.md)**

## 專案結構

```bash
.
├── apps/                # 應用程式目錄
│   └── template-app/    # 模板應用程式
├── layers/              # Nuxt Layers 目錄
│   └── core/            # 核心層 (Core Layer)
├── modules/             # 功能模組
│   └── showcase/        # UI 元件展示模組
├── components/          # 全域元件
├── composables/         # 業務邏輯 Hooks
├── repositories/        # API 資料層
├── stores/              # 全域狀態管理 (Pinia)
├── docs/                # 完整說明文件
├── CI.md                # 持續整合 (CI) 指南
└── CD.md                # 持續部署 (CD) 指南
```

---

## 文件索引

### 1. 核心指南 (必讀)

- **[開發手冊](./docs/guides/development-manual.md)**: 環境建置、套件說明、命名規範。
- **[Git 工作流](./docs/guides/git-workflow.md)**: Commitizen 與 Conventional Commits 規範。
- **[ESLint 規範](./docs/guides/eslint-rules.md)**: 程式碼風格標準。

### 2. 專案架構

- **[系統架構](./docs/project/architecture.md)**: 分層設計理念。
- **[專案架構與檔案說明](./docs/project/structure-reference.md)**: 包含分層設計、目錄用途與關鍵檔案說明。
- **[元件展示](./docs/guides/ui-showcase.md)**: UI Showcase 使用說明。

### 3. 核心功能

- **[通用元件](./docs/core/components.md)**: UI Interface 與 Business 元件。
- **[Composables](./docs/core/composables.md)**: 業務邏輯函式庫。
- **[狀態管理](./docs/core/stores.md)**: Pinia Store 設計。
- **[佈局系統](./docs/core/layout.md)**: Layout 與導航。
- **[多語系](./docs/core/i18n.md)**: i18n 實作。
- **[權限管理](./docs/core/security.md)**: 認證與授權。

### 4. API 與資料

- **[API 開發指南](./docs/api/guide.md)**: API 呼稱規範。
- **[Repository Pattern](./docs/api/repository-pattern.md)**: 資料層封裝。
- **[Mock Server](./docs/api/mock-server.md)**: 前端模擬資料。
- **[環境設定指南](./docs/api/environment-setup.md)**: 環境變數變更詳細說明。

### 5. 部署與運維

- **CI (持續整合, Continuous Integration)**: 頻繁地將程式碼合併到主線，並透過自動化測試與打包確保品質。
  - **[CI 流程總覽](./CI.md)**: Image 打包與 Nginx 優化。
  - **[Lazy Load 404 解決方案](./CI.md#3-部署注意事項解決-lazy-load-導致的-404-問題)**: 避免更新版本時的使用者斷網問題。
- **CD (持續部署, Continuous Deployment)**: 將打包好的 Image 自動部署至環境，確保軟體快速交付。
  - **[CD 部署架構](./CD.md)**: K8S 資源與多環境部署策略。

### 6. 開發工具

- **[VS Code 設定](./docs/tools/vscode-eslint.md)**: 編輯器推薦設定。
- **[除錯指南](./docs/guides/troubleshooting.md)**: 常見問題排除。
