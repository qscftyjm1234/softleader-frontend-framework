<!-- Author: antigravity -->

# 第十二課：選項數據管理

本課程介紹本專案強大的選項（Options）數據管理系統。我們不建議在各個頁面重複寫死下拉選單或核選方塊的選項，而是將其集中在 `core/options/` 中進行管理，以降低長期維護成本。

---

## 1. 定義共用選項

在本專案架構中，所有的選項資料都不是寫在 Vue 組件或 Composable 裡面的，而是統一集中在此路徑中：`core/options/common.ts`。

(1.) 開啟 `core/options/common.ts`。
(2.) 按照以下格式，新增您的選項陣列並 `export` 出來：

```typescript
import type { OptionItem } from './types'

// 1. 靜態選項：性別
export const genderOptions: OptionItem[] = [
  { label: '男性', value: 'M' },
  { label: '女性', value: 'F' }
]

// 2. 靜態選項：審核狀態 (可自帶顏色以便支援 UI 元件)
export const statusOptions: OptionItem[] = [
  { label: '審核中', value: 1, color: 'processing' },
  { label: '已通過', value: 2, color: 'success' },
  { label: '已駁回', value: 3, color: 'error' }
]
```

當您在 `common.ts` 中 `export` 出去後，系統底層的 `core/options/registry.ts` 會自動將其註冊到全域，供後續使用。

---

## 2. 在頁面中使用選項

專案內建的 `useOptions()` 鉤子，會自動讀取您剛剛在 `core` 裡面註冊好的變數，並賦予它們額外的方法（例如自動轉換 Label）。

(1.) 開啟您的頁面檔案。
(2.) 引入 `useOptions`，並直接解構出您剛剛定義的變數名稱。
(3.) 綁定到 `ISelect` 組件。

```vue
<template>
  <div class="p-10">
    <ISelect
      v-model="userStatus"
      :options="statusOptions"
      label="變更帳號狀態"
      class="w-64"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: '選項數據管理',
  layout: 'portal'
})
// 從全域選項代理中解構出您需要的選項
const { statusOptions } = useOptions()
const userStatus = ref(1)
</script>
```

---

## 3. 選項系統的進階用法

`useOptions` 取出的陣列不只是純陣列，而是一個「被代理 (Proxy) 過的超級陣列」，自帶許多強大的輔助功能：

```typescript
const { statusOptions } = useOptions()

// 1. 取得帶有「全部」的選單 (常用於搜尋列)
const optionsWithAll = statusOptions.withAll
console.log('1. 加上 [全部]:', optionsWithAll)

// 2. 取得帶有「其他」的選單 (常用於問卷表單)
const optionsWithOther = statusOptions.other
console.log('2. 加上 [其他]:', optionsWithOther)

// 3. 靠 value 自動找出對應的 label (表格顯示神器)
const displayText = statusOptions.label(2)
console.log('3. 尋找標籤 (value=2):', displayText)

// 4. 靠 value 找出完整的物件
const fullItem = statusOptions.findByValue(2)
console.log('4. 尋找物件 (value=2):', fullItem)

// 5. 排除部分選項 (常用於權限控管)
const excludedOptions = statusOptions.exclude([3])
console.log('5. 排除選項 (排除3):', excludedOptions)

// 6. 只保留特定選項
const onlyOptions = statusOptions.only([1, 2])
console.log('6. 保留選項 (保留1,2):', onlyOptions)

// 7. 取得原始的純陣列資料 (解除 Proxy，用於需要傳給特定套件時)
const rawValue = statusOptions.value
console.log('7. 取得原始純粹陣列:', rawValue)

// 8. 狀態相關 (針對非同步 API 的選項特別好用)
console.log('8. 是否載入中 (isLoading):', statusOptions.isLoading)
console.log('8. 是否已載入 (isLoaded):', statusOptions.isLoaded)

// 9. 強制重新向後端載入資料 (這是一支 Promise)
// await statusOptions.reload()
```

---

## 4. 動態與非同步 API 選項

除了靜態陣列，這套系統還支援 **動態 (Computed)** 與 **非同步 (API)** 的選項定義。只要您在 `core/options/` 中宣告好，用法完全一樣！

### 寫法 A：Vue 的 Computed 響應式選項

當選項需要根據別的變數（例如：語系切換、Store 狀態）即時變更時：

```typescript
// 在 core/options/common.ts 宣告
import { computed } from 'vue'

export const vocabularies = computed(() => {
  // 這裡可以放入需要監聽依賴的邏輯
  return [
    { label: '蘋果', value: 'apple' },
    { label: '香蕉', value: 'banana' }
  ]
})
```

### 寫法 B：非同步 API (Promise) 的選項

當下拉選單的資料必須從後端 API 取得，甚至需要傳遞參數（例如：選擇城市後，才去抓取該城市的鄉鎮區）：

```typescript
// 在 core/options/modules/geography.ts 宣告
export const townships = async (cityId?: string): Promise<OptionItem[]> => {
  if (!cityId) return []

  // 模擬呼叫 API
  const res = await api.getTownships(cityId)
  return res.map((item) => ({ label: item.name, value: item.id }))
}
```

### 🎈 對應的頁面用法

不論底層是陣列、Computed 還是 Promise，您在頁面調用 `useOptions()` 的感覺都是一模一樣的：

```vue
<template>
  <!-- UI 組件直接綁定即可，它會自己處理非同步的 Loading 狀態！ -->
  <ISelect
    :options="taipeiTownships"
    label="請選擇鄉鎮區"
  />
</template>

<script setup lang="ts">
definePageMeta({
  title: '數據管理',
  layout: 'portal'
})
const { vocabularies, townships } = useOptions()

// 1. Computed 選項：資料更新時，UI 會自動響應變更
console.log('當前語彙:', vocabularies)

// 2. API 選項 (帶參數)：用法就像呼叫 Function 一樣，但它回傳的依然是具有 .withAll 等方法的超級陣列！
const taipeiTownships = townships('TPE')
console.log('台北市的鄉鎮區 (加上全部):', taipeiTownships.withAll)

// 3. API 選項獨享的狀態
console.log('正在從 API 載入嗎？', taipeiTownships.isLoading)
</script>
```

---

## 5. 小結

一
絕對不要去改 `composables/useOptions.ts`，那是系統底層邏輯。
二
需要新增選項時，請到 `core/options/common.ts` 宣告並 `export` 陣列。
三
在 Vue 當中呼叫 `useOptions()`，它的 Proxy 機制會為您的純資料添加好用的 `.label()`, `.withAll()` 等方法，大幅簡化表格渲染與表單開發。

---

```vue
<script setup lang="ts">
definePageMeta({
  title: '資料列表範例',
  layout: 'portal'
})
</script>
```

---

[上一課 第十一課：全域狀態管理 (Pinia)](./lesson-11.md) | [下一課 第十三課：資料列表與分頁](./lesson-13.md) | [回首頁](../../README.md)
