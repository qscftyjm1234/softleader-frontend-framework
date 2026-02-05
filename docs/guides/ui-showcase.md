[← 返回 README.md](../../README.md)

# 功能展示與範例使用指南

## 什麼是 Showcase?

本專案內建了一個 **功能展示介面 (Showcase)**,它是開發者的實戰手冊。它不只展示 **UI 元件**,還包含了:

- **UI 元件庫**: 基礎 UI 與業務元件的視覺呈現與 Props 說明。
- **模組實作範例**: 展示 Auth、User 等模組如何封裝與使用。
- **業務流程演示**: 包含表單驗證、API 串接、狀態管理等實戰邏輯。
- **開發範本**: 提供可以直接複製貼上的程式碼結構。

## 如何開啟 Showcase

### 1. 啟動開發伺服器

```bash
npm run dev
```

### 2. 開啟瀏覽器

前往 `http://localhost:3000/showcase`

在這裡你可以看到專案所有的「範例程式碼」與「實際運作效果」,是新人加入專案後最快了解系統的方式。

## 展示內容分類

### 1. UI 元件 (Interface & Business)

展示現有的 UI 元件,包含如何傳入參數 (Props) 以及元件輸出的事件 (Events)。

### 2. API 與資料互動 (Data Handling)

展示如何呼叫 Repositories、處理 Loading 狀態、資料分頁與錯誤提示。

### 3. 模組化開發 (Module Pattern)

展示如何依照模組結構組織程式碼,包含路由設定、佈局切換與權限控制。

### 4. 實戰範本 (Scaffold)

提供常見的頁面樣板 (如: 列表頁、編輯頁、詳情頁),這些樣板可以直接作為開發基礎。

---

### 瀏覽元件

1. 在左側選單選擇元件分類
2. 點擊想查看的元件
3. 查看元件的即時預覽
4. 查看程式碼範例

### 複製程式碼

每個元件展示頁面都會提供:

- 元件的引入方式
- Props 參數說明
- 使用範例程式碼

直接複製程式碼到你的專案中即可使用。

## 新增元件到 Showcase

如果你開發了新的元件,想加入 Showcase 展示:

### 1. 在 showcase 模組建立頁面

在 `modules/showcase/pages/` 下建立新的展示頁面,例如 `my-feature.vue`。

### 2. 加入路由 (自動化)

系統會透過 `router/routes-scanner.ts` 自動掃描並產生路由。新增的頁面會自動對應到:
`http://localhost:3000/showcase/my-feature`

### 3. 更新 Showcase 儀表板 (手動維護)

為了讓新功能出現在 `/showcase` 的主頁面上,你需要修改 Dashbaord 的清單:

編輯 [`modules/showcase/components/ShowcaseDashboard.vue`](../../modules/showcase/components/ShowcaseDashboard.vue):

在對應的清單 (如 `componentsList` 或 `functionsList`) 中加入新項目:

```typescript
const functionsList = [
  // ... 其他項目
  {
    title: '我的新功能',
    desc: '功能簡介與使用範例',
    icon: 'mdi-star', // 使用 Material Design Icons
    to: '/showcase/my-feature',
    color: '#FFD700'
  }
]
```

## 最佳實踐

### 1. 保持展示頁面簡潔

- 一個頁面展示一個元件
- 提供清楚的使用說明
- 包含常見的使用情境

### 2. 提供完整的程式碼範例

- 包含引入語句
- 包含 Props 說明
- 包含事件處理範例

### 3. 即時更新

- 開發新元件時,同步更新 Showcase
- 修改元件時,同步更新展示頁面
- 確保展示內容與實際元件一致

## 常見問題

### Q: Showcase 頁面無法開啟?

**解決方法**:

1. 確認開發伺服器正在運行
2. 檢查 `modules/showcase` 目錄是否存在
3. 查看終端機是否有錯誤訊息

### Q: 新增的元件沒有出現在 Showcase?

**解決方法**:

1. 確認檔案放在 `modules/showcase/pages/` 下
2. 檔案名稱使用 kebab-case (例如: `my-component.vue`)
3. 重新啟動開發伺服器

### Q: 如何自訂 Showcase 的樣式?

**解決方法**:

- 在 `modules/showcase/components/` 建立共用的佈局元件
- 使用專案的設計系統樣式
- 保持與主應用程式一致的視覺風格

## 延伸閱讀

- [元件說明](../core/components.md) - 了解元件的設計原則
- [資料夾結構](../project/folder-structure.md) - 了解專案目錄結構
