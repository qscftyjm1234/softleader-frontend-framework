[← 返回文件導覽](../index.md)

# 套件清單

本文件列出專案所有依賴套件的功能說明與版本資訊。

> ⚠️ **重要政策**：關於離線環境部署與版本鎖定策略，請參閱 **[套件管理與離線部署政策](./dependency-policy.md)**。

---

## 生產環境依賴

### 核心框架與 UI

| 套件名稱    | 版本   | 功能說明                                                             | 安裝指令                       |
| ----------- | ------ | -------------------------------------------------------------------- | ------------------------------ |
| `nuxt`      | 3.14.0 | Nuxt 3 核心框架,提供 SSR、檔案系統路由、自動 Import、TypeScript 支援 | `npm install nuxt@3.14.0`      |
| `vuetify`   | 3.9.3  | Material Design UI 元件庫,提供 100+ 現成元件、響應式網格、主題客製化 | `npm install vuetify@3.9.3`    |
| `@mdi/font` | 7.4.47 | Material Design Icons 圖示集,7000+ 圖示,Vuetify 預設圖示庫           | `npm install @mdi/font@7.4.47` |

### 狀態管理

| 套件名稱      | 版本   | 功能說明                                                      | 安裝指令                         |
| ------------- | ------ | ------------------------------------------------------------- | -------------------------------- |
| `pinia`       | 3.0.3  | Vue 官方狀態管理庫,輕量級、TypeScript 完整支援、DevTools 整合 | `npm install pinia@3.0.3`        |
| `@pinia/nuxt` | 0.11.2 | Pinia 的 Nuxt 整合模組,提供 SSR 支援、自動 Import Stores      | `npm install @pinia/nuxt@0.11.2` |

### 工具函式

| 套件名稱           | 版本    | 功能說明                                                                          | 安裝指令                             |
| ------------------ | ------- | --------------------------------------------------------------------------------- | ------------------------------------ |
| `@vueuse/nuxt`     | 13.6.0  | Vue 實用工具集合,200+ Composition API 工具函式 (localStorage, fetch, debounce...) | `npm install @vueuse/nuxt@13.6.0`    |
| `dayjs`            | 1.11.13 | 輕量級日期處理庫 (僅 2KB),與 moment.js 相容的 API,支援多語系                      | `npm install dayjs@1.11.13`          |
| `lodash.clonedeep` | 4.5.0   | 深層複製物件,處理複雜物件結構,避免引用問題                                        | `npm install lodash.clonedeep@4.5.0` |

### 多語系與裝置偵測

| 套件名稱         | 版本   | 功能說明                                             | 安裝指令                           |
| ---------------- | ------ | ---------------------------------------------------- | ---------------------------------- |
| `@nuxtjs/i18n`   | 10.0.3 | 國際化 (i18n) 支援,多語言切換、路由國際化、SEO 友善  | `npm install @nuxtjs/i18n@10.0.3`  |
| `@nuxtjs/device` | 3.2.4  | 裝置偵測,判斷手機/平板/桌面,SSR 支援,User-Agent 解析 | `npm install @nuxtjs/device@3.2.4` |

---

## 開發環境依賴

### TypeScript 與型別定義

| 套件名稱                  | 版本   | 功能說明                                      | 安裝指令                                       |
| ------------------------- | ------ | --------------------------------------------- | ---------------------------------------------- |
| `typescript`              | 5.9.3  | TypeScript 編譯器,靜態型別檢查,提升程式碼品質 | `npm install -D typescript@5.9.3`              |
| `vue-tsc`                 | 3.2.1  | Vue 檔案的 TypeScript 型別檢查工具            | `npm install -D vue-tsc@3.2.1`                 |
| `@types/node`             | 25.0.3 | Node.js 的 TypeScript 型別定義                | `npm install -D @types/node@25.0.3`            |
| `@types/lodash.clonedeep` | 4.5.9  | lodash.clonedeep 的 TypeScript 型別定義       | `npm install -D @types/lodash.clonedeep@4.5.9` |

### 程式碼品質工具

| 套件名稱                           | 版本   | 功能說明                                                                    | 安裝指令                                                 |
| ---------------------------------- | ------ | --------------------------------------------------------------------------- | -------------------------------------------------------- |
| `eslint`                           | 9.39.2 | JavaScript/TypeScript 程式碼檢查工具,語法錯誤檢查、程式碼風格檢查、自動修復 | `npm install -D eslint@9.39.2`                           |
| `@nuxt/eslint`                     | 1.12.1 | Nuxt 官方 ESLint 配置,整合 Nuxt 專案最佳實踐規則與 Vue 3 規則               | `npm install -D @nuxt/eslint@1.12.1`                     |
| `@typescript-eslint/eslint-plugin` | 8.50.1 | TypeScript ESLint 插件,提供 TypeScript 專用檢查規則                         | `npm install -D @typescript-eslint/eslint-plugin@8.50.1` |
| `@typescript-eslint/parser`        | 8.50.1 | TypeScript ESLint 解析器,解析 TypeScript 語法                               | `npm install -D @typescript-eslint/parser@8.50.1`        |
| `eslint-plugin-jsdoc`              | 61.5.0 | JSDoc 註解檢查,強制 JSDoc 格式、檢查參數與回傳值描述                        | `npm install -D eslint-plugin-jsdoc@61.5.0`              |
| `prettier`                         | 3.6.2  | 程式碼格式化工具,自動排版、統一程式碼風格                                   | `npm install -D prettier@3.6.2`                          |
| `eslint-plugin-prettier`           | 5.5.4  | 整合 Prettier 與 ESLint,將 Prettier 規則作為 ESLint 規則                    | `npm install -D eslint-plugin-prettier@5.5.4`            |
| `eslint-config-prettier`           | 9.1.2  | 關閉與 Prettier 衝突的 ESLint 規則                                          | `npm install -D eslint-config-prettier@9.1.2`            |

### Git 工作流工具

| 套件名稱                          | 版本   | 功能說明                                                   | 安裝指令                                                |
| --------------------------------- | ------ | ---------------------------------------------------------- | ------------------------------------------------------- |
| `husky`                           | 9.1.7  | Git Hooks 管理工具,Commit 前自動檢查,防止不符規範的 Commit | `npm install -D husky@9.1.7`                            |
| `lint-staged`                     | 16.2.7 | 只對暫存區檔案執行檢查,加速 Lint 速度,與 Husky 搭配使用    | `npm install -D lint-staged@16.2.7`                     |
| `@commitlint/cli`                 | 20.2.0 | Commit 訊息格式檢查工具                                    | `npm install -D @commitlint/cli@20.2.0`                 |
| `@commitlint/config-conventional` | 20.2.0 | Conventional Commits 規範配置                              | `npm install -D @commitlint/config-conventional@20.2.0` |
| `commitizen`                      | 4.3.1  | 互動式 Commit 訊息產生器,使用 `npm run commit` 啟動        | `npm install -D commitizen@4.3.1`                       |
| `cz-customizable`                 | 7.5.1  | Commitizen 自訂配置擴充套件                                | `npm install -D cz-customizable@7.5.1`                  |

### 其他開發工具

| 套件名稱         | 版本  | 功能說明                                           | 安裝指令                              |
| ---------------- | ----- | -------------------------------------------------- | ------------------------------------- |
| `@nuxt/devtools` | 3.1.1 | Nuxt 開發者工具,提供視覺化除錯、效能分析、路由檢視 | `npm install -D @nuxt/devtools@3.1.1` |

---

## 套件統計

| 類別         | 數量      | 總大小 (估計) |
| ------------ | --------- | ------------- |
| 生產環境依賴 | 10 個     | ~15 MB        |
| 開發環境依賴 | 23 個     | ~80 MB        |
| **總計**     | **33 個** | **~95 MB**    |

---

## 版本控制策略

本專案採用 **Strict Versioning** (嚴格版本控制)，所有依賴版本皆已鎖定 (無 `^` 或 `~` 前綴)。

- **目的**：確保開發、測試、生產環境的依賴完全一致，避免 "It works on my machine" 問題。
- **詳情**：請參閱 **[套件管理與離線部署政策](./dependency-policy.md)**。

---

## 快速安裝

```bash
# 安裝所有依賴
npm install

# 或使用 pnpm (更快)
pnpm install
```

---

## 套件檢查清單

### 必須套件 (缺一不可)

- nuxt
- vuetify
- pinia
- @pinia/nuxt
- @vueuse/nuxt
- dayjs
- typescript
- eslint
- prettier

### 重要套件 (強烈建議)

- @mdi/font
- @nuxtjs/i18n
- @nuxtjs/device
- husky
- lint-staged
- @commitlint/cli

### 可選套件 (可替換)

- @mdi/font (可用其他圖示庫)
- lodash.clonedeep (可用原生 `structuredClone`)
- @nuxtjs/i18n (如不需多語系可移除)

---

## 依賴關係圖

```
專案根目錄
├── 核心框架
│   ├── nuxt (核心)
│   ├── vuetify (UI 元件)
│   └── @mdi/font (圖示)
│
├── 狀態管理
│   ├── pinia (狀態管理)
│   └── @pinia/nuxt (Nuxt 整合)
│
├── 工具函式
│   ├── @vueuse/nuxt (工具集)
│   ├── dayjs (日期處理)
│   └── lodash.clonedeep (深拷貝)
│
├── 多語系與裝置
│   ├── @nuxtjs/i18n (國際化)
│   └── @nuxtjs/device (裝置偵測)
│
└── 開發工具
    ├── TypeScript 相關
    │   ├── typescript
    │   ├── vue-tsc
    │   └── @types/*
    │
    ├── 程式碼品質
    │   ├── eslint
    │   ├── prettier
    │   └── 相關插件
    │
    └── Git 工作流
        ├── husky
        ├── lint-staged
        └── commitlint
```

---

## 相關文件

- [開發手冊](./development-manual.md) - 環境需求與系統套件
- [專案檔案說明](../project/file-reference.md) - 配置檔案說明
