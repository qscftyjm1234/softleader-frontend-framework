[← 返回文件導覽](../index.md)

# Scripts 工具腳本

本資料夾包含專案的工具腳本，用於建置時期的配置載入與處理。

---

## 📁 檔案列表

### product-loader.ts

**用途**: 產品設定檔載入器

**功能說明**:

- 載入 `configs/` 目錄下的 JSON 產品設定檔
- 支援透過環境變數切換不同產品配置
- 提供型別安全的設定介面

---

## 🔧 product-loader.ts 詳細說明

### 核心功能

這個腳本負責在建置時期 (Build Time) 載入產品專屬的設定檔，讓專案可以根據不同產品需求進行客製化。

### 設定檔位置

```
configs/
└── default.json      # 預設設定 (必須存在)
```

### 使用方式

#### 1. 在程式碼中使用

```typescript
import { productConfig } from '~/scripts/product-loader'

console.log(productConfig.meta?.title) // 取得產品標題
```

#### 2. 環境變數切換

透過 `PRODUCT_CONFIG` 環境變數指定要載入的設定檔 (預設載入 `default`)：

```bash
# 載入 configs/default.json
npm run dev

# 若有其他設定檔 (如 configs/client-a.json)
PRODUCT_CONFIG=client-a npm run dev
```

### 設定檔範例 (`configs/default.json`)

```json
{
  "name": "Default Product",
  "description": "Standard configuration enabling all modules",
  "modules": ["showcase"],
  "theme": {
    "primary": "#1976D2"
  },
  "meta": {
    "title": "SoftLeader",
    "description": "SoftLeader",
    "favicon": "/favicon.jpg",
    "themeColor": "#ffffff"
  }
}
```

---

## 🎯 使用場景

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
