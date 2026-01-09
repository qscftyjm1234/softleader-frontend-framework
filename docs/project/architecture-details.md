# 系統架構文件 (Architecture Documentation)

本章節記錄了系統的高層次設計與架構決策。

## 核心概念：設定檔驅動架構 (Config-Driven Architecture)

為了達成高度的「產品化」與「多租戶/多客戶」彈性，本專案採用 **設定檔驅動 (Config-Driven)** 的架構設計，而非傳統的「依客戶分資料夾」模式。

### 1. 設計理念 (Philosophy)

- **Modules 是樂高積木**: 所有的功能 (Auth, CRM, Shop) 都是獨立的模組，統一放置於 `modules/` 目錄。
- **Config 是組裝說明書**: 每個產品或客戶由一個 `JSON/YAML` 設定檔定義，該檔案決定了要「組裝」哪些積木。
- **單一程式碼庫 (Monorepo-like)**: 不為客戶建立專屬的程式碼資料夾，而是透過設定來決定行為，確保核心程式碼的一致性與可維護性。

### 2. 資料夾結構規劃 (Directory Structure)

```
root/
├── modules/                  # [積木庫] 所有功能模組
│   ├── auth/                 # 登入模組
│   │   ├── pages/
│   │   ├── components/
│   │   └── config.ts         # 模組預設設定 (權限 key, 選單結構)
│   ├── crm/                  # CRM 模組
│   └── e-commerce/           # 電商模組
│
├── configs/                  # [組裝說明書] 定義產品/客戶
│   ├── default.yaml          # 預設配置
│   └── custom.yaml           # 自訂配置範例
│
├── nuxt.config.ts            # [組裝工廠] 讀取 Config -> 載入對應 Modules
└── .env                      # 指定當前要建置哪個 Config
```

### 3. 運作機制 (Mechanism)

#### A. 建置階段 (Build Time) - 決定「包含什麼」

在 `nuxt.config.ts` 中，系統會讀取指定的設定檔 (如 `default.yaml`)。

- **模組載入**: 僅掃描並載入設定檔中啟用的模組 (Modules)。
- **瘦身優化**: 未被啟用的模組程式碼不會被打包進最終產物，確保應用程式輕量化且安全。

#### B. 執行階段 (Runtime) - 決定「能用什麼」

前端應用程式啟動後，權限與選單由後端資料控制。

- **動態選單**: Sidebar 不寫死，而是由各 Module 註冊 `routes`。
- **權限控制**: 登入後，根據後端回傳的權限列表 (Permissions)，動態過濾 Sidebar 選單項目。

### 4. 客製化策略 (Customization Strategy)

當特定客戶需要客製化邏輯時，不應複製整個模組。

- **策略模式 (Strategy Pattern)**: 在模組內預留 Hook 或 Slot。
- **參數控制**: 在配置檔中開啟特殊參數 (例如 `crm.customCalculation: true`) 來啟用特定邏輯。

---

## 關鍵文件 (Key Documents)

_(在此處新增連結至其他詳細架構文件)_
