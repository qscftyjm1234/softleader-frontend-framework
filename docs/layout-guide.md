# 框架無關 Layout 系統使用指南

## 概述

本專案的 Layout 系統完全不依賴任何 UI 框架 (如 Vuetify, Element Plus 等),使用純 HTML + CSS 實現,可輕鬆整合到任何技術棧中。

## 核心特性

- ✅ **框架無關**: 不依賴任何 UI 框架
- ✅ **完整功能**: Header, Sidebar, Footer, Breadcrumbs, Notifications 等
- ✅ **響應式設計**: 支援手機、平板、桌面
- ✅ **CSS Variables**: 完整的設計令牌系統,易於自訂
- ✅ **輕量級**: 純 HTML + CSS,無額外依賴

## 快速開始

### 1. 使用 Layout

在任何頁面中設定 `layout` 即可:

```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div>
    <h1>你的頁面內容</h1>
  </div>
</template>
```

### 2. 自訂樣式

所有樣式都使用 CSS Variables 定義在 `assets/css/layout.css` 中,可輕鬆覆寫:

```css
:root {
  --color-primary: #1976d2;
  --color-success: #4caf50;
  --header-height: 64px;
  --sidebar-width: 280px;
  /* ... 更多變數 */
}
```

### 3. 使用 Utility Classes

提供了常用的 utility classes:

```html
<!-- Container -->
<div class="container">內容會自動置中,最大寬度 1280px</div>
<div class="container-fluid">全寬容器</div>

<!-- Flexbox -->
<div class="flex items-center justify-between">
  <div>左側</div>
  <div>右側</div>
</div>

<!-- Responsive -->
<div class="hidden-mobile">桌面版顯示</div>
<div class="hidden-desktop">手機版顯示</div>

<!-- Buttons -->
<button class="btn btn-primary">主要按鈕</button>
<button class="btn-icon">圖標按鈕</button>

<!-- Badges -->
<span class="badge">3</span>
<span class="badge badge-dot"></span>
```

## 展示頁面

訪問以下頁面查看完整範例:

- `/layout-demo` - 展示首頁
- `/layout-demo/basic` - 基本頁面範例
- `/layout-demo/form` - 表單頁面範例
- `/layout-demo/components` - UI 組件範例

## 檔案結構

```
layouts/
  └── default.vue              # 主要 Layout

components/
  ├── layout/
  │   ├── AppHeader.vue        # 頁首
  │   ├── AppSidebar.vue       # 側邊欄
  │   ├── AppFooter.vue        # 頁尾
  │   ├── AppSidebarItem.vue   # 側邊欄項目 (支援巢狀)
  │   └── header/
  │       ├── HeaderBreadcrumbs.vue    # 麵包屑
  │       ├── HeaderSearch.vue         # 搜尋欄
  │       ├── HeaderLanguage.vue       # 語言選擇器
  │       ├── HeaderNotifications.vue  # 通知中心
  │       ├── HeaderUserMenu.vue       # 使用者選單
  │       └── HeaderActions.vue        # 動作按鈕
  └── common/
      └── GlobalSnackbar.vue   # 全域通知

assets/
  └── css/
      ├── layout.css           # Layout 樣式系統
      └── main.css             # 主要樣式檔案
```

## 自訂範例

### 修改主題色

```css
/* 在你的 CSS 檔案中覆寫 */
:root {
  --color-primary: #ff5722;
  --color-primary-dark: #e64a19;
  --color-primary-light: #ff8a65;
}
```

### 調整 Layout 尺寸

```css
:root {
  --header-height: 72px;
  --sidebar-width: 320px;
  --footer-height: 80px;
}
```

### 使用自訂字體

```css
body {
  font-family:
    'Your Custom Font',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}
```

## 整合其他 UI 框架

由於本 Layout 系統完全框架無關,你可以輕鬆整合任何 UI 框架:

### 整合 Vuetify

```vue
<template>
  <div>
    <!-- Layout 提供的結構 -->
    <h1>頁面標題</h1>

    <!-- 使用 Vuetify 組件 -->
    <v-btn color="primary">Vuetify 按鈕</v-btn>

    <!-- 使用原生 HTML + Layout CSS -->
    <button class="btn btn-primary">原生按鈕</button>
  </div>
</template>
```

### 整合 Element Plus

```vue
<template>
  <div>
    <!-- 混合使用 -->
    <el-button type="primary">Element Plus 按鈕</el-button>
    <button class="btn btn-primary">原生按鈕</button>
  </div>
</template>
```

## 常見問題

### Q: 如何隱藏 Sidebar?

在 `appStore` 中設定:

```typescript
appStore.config.sidebar.visible = false
```

### Q: 如何自訂 Header 高度?

修改 CSS Variable:

```css
:root {
  --header-height: 80px;
}
```

### Q: 如何新增自訂的 Header 按鈕?

在 `appStore.config.header.actions` 中新增:

```typescript
appStore.config.header.actions.push({
  icon: 'custom-icon',
  title: '自訂按鈕',
  action: 'customAction'
})
```

## 技術細節

- **CSS Grid**: Layout 使用 CSS Grid 實現,確保靈活性
- **CSS Variables**: 所有設計令牌都使用 CSS Variables,支援動態主題
- **Semantic HTML**: 使用語義化 HTML 標籤 (`<header>`, `<nav>`, `<main>`, `<footer>`)
- **Accessibility**: 包含適當的 ARIA 屬性和鍵盤導航支援
- **Mobile First**: 響應式設計從手機版開始,逐步增強

## 瀏覽器支援

- Chrome / Edge (最新版)
- Firefox (最新版)
- Safari (最新版)
- 支援所有現代瀏覽器 (支援 CSS Variables 和 Grid)

## 授權

MIT License
