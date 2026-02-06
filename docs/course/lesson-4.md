<!-- Author: cindy -->

# 第四課:UI 組件開發規範

本課程說明本專案的 UI 開發規範。**主旨：一律使用 `uiInterface` 封裝組件。**

## 1. 黃金原則 (The Golden Rule)

開發頁面 (`pages/`) 或業務組件 (`components/business/`) 時：

> ✅ **只能使用 `I` 開頭的組件 (e.g., `<IButton>`)**
> ❌ **嚴禁使用 `a-` 開頭的原生組件 (e.g., `<a-button>`)**

---

## 2. 快速對照表

| 功能         | ❌ 禁止寫法  | ✅ 正確寫法    |
| :----------- | :----------- | :------------- |
| **按鈕**     | `<a-button>` | `<IButton>`    |
| **輸入框**   | `<a-input>`  | `<IInput>`     |
| **表格**     | `<a-table>`  | `<IDataTable>` |
| **彈窗**     | `<a-modal>`  | `<IModal>`     |
| **下拉選單** | `<a-select>` | `<ISelect>`    |

---

## 3. 常見情境 (FAQ)

### Q1: 我想修改按鈕顏色或樣式？

請優先使用組件提供的 `props`，排版距離則用 Tailwind CSS。

```vue
<!-- ✅ 正確 -->
<IButton
  variant="primary"    <!-- 決定顏色風格 -->
  size="large"         <!-- 決定大小 -->
  class="mt-4 w-full"  <!-- 決定位置與寬度 -->
>
  送出
</IButton>
```

### Q2: 介面組件 (`ISelect`) 少了我要的功能 (如搜尋) 怎辦？

> **千萬不要因為少一個功能就回去用 `<a-select>`！**

請直接去修改 `components/uiInterface/ISelect.vue`，把功能補上。

**修改範例 (ISelect.vue):**

```vue
<script setup lang="ts">
// 1. 在 Props 新增 showSearch
defineProps<{
  showSearch?: boolean
}>()
</script>

<template>
  <!-- 2. 透傳給底層 -->
  <a-select :show-search="showSearch">
    <slot />
  </a-select>
</template>
```

這樣這擴充的功能，全專案都能受惠。

---

## 4. 常用組件參數速查

這些是經過封裝後，您最常會用到的參數：

### IButton

- `variant`: "primary" | "outline" | "text" | "danger"
- `icon`: MDI 圖示名稱 (如 "mdi-check")
- `loading`: true/false (自動轉圈)

### IDataTable

- `data`: 資料陣列
- `columns`: 欄位設定 (同 AntD)
- `pagination`: 分頁物件 (配合 `usePagination`)

### IModal

- `v-model:open`: 開關
- `title`:標題
- `width`: 寬度 (預設 520px)

---

## 5. 如何設計介面組件 (Interface Design)

如果您需要自己封裝新的組件 (例如 `ICheckbox`)，請依照以下三個簡單步驟：

### 步驟 1: 定義 Props (接收外部參數)

使用 `defineProps` 接收業務需要的資料。

```typescript
// components/uiInterface/ICheckbox.vue
const props = defineProps<{
  label?: string
  checked?: boolean
  disabled?: boolean
}>()
```

### 步驟 2: 透傳給底層 (Binding)

將接收到的 Props 傳給底層 Ant Design 組件 (`a-checkbox`)。

```vue
<template>
  <a-checkbox
    :checked="checked"
    :disabled="disabled"
    @update:checked="(val) => $emit('update:checked', val)"
  >
    {{ label }}
  </a-checkbox>
</template>
```

### 步驟 3: 加上統一外觀 (Styling)

使用 Tailwind CSS 加上專案統一的樣式 (例如文字顏色、邊距)。

```vue
<template>
  <a-checkbox class="text-gray-700 font-medium px-2">
    <!-- ... -->
  </a-checkbox>
</template>
```

---

## 6. 如果包含業務邏輯? (Business Components)

如果您的組件不僅是「長相」，還包含「呼叫 API」或「特定業務規則」，**請不要放在 `uiInterface`**。

請改放到 `components/business/` 目錄。

### 範例: 使用者選取器 (UserSelect)

這不是單純的 Select，它需要「自動去後端抓使用者清單」。

```vue
<!-- components/business/UserSelect.vue -->
<script setup lang="ts">
// 1. 處理業務邏輯 (Call API)
const { data } = await useApi.getUsers()

// 2. 轉換資料格式
const options = computed(() => data.value.map((u) => ({ label: u.name, value: u.id })))
</script>

<template>
  <!-- 3. 組合介面組件 (ISelect) -->
  <ISelect
    :options="options"
    placeholder="請選擇員工"
    class="w-64"
  />
</template>
```

### 分工原則

| 類型         | 目錄           | 職責                   | 能不能 Call API? |
| :----------- | :------------- | :--------------------- | :--------------- |
| **介面組件** | `uiInterface/` | 只管長相、互動 (純 UI) | ❌ 禁止          |
| **業務組件** | `business/`    | 管資料來源、商業邏輯   | ✅ 可以          |

---

## 7. 小結

記住一句話就好：**看到 UI 就打 `I`，不要打 `a`。**
功能不夠就去改 `I`，不要繞過去用 `a`。

---

[上一課:UI 框架介紹](./lesson-3.md) | [下一課:客製化圖示系統](./lesson-5.md) | [回首頁](../../README.md)
