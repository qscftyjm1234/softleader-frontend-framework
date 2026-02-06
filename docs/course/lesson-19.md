<!-- Author: cindy -->

# 第十九課:選項數據管理

本課程介紹如何使用 `useOptions` 統一管理下拉選單 (Select)、核取方塊 (Checkbox) 等選項數據。

## 1. 為什麼要統一管理?

- **寫死在頁面 (Bad)**: 每個頁面都要重複寫 `[{ label: '男生', value: 1 }]`，維護困難。
- **統一管理 (Good)**: 改一個地方，全站更新。

---

## 2. 靜態選項 (Static Options)

最簡單的固定選項，例如狀態、性別。

### 定義 (composables/useOptions.ts)

```typescript
export const useOptions = () => {
  // 狀態選項
  const statusOptions = [
    { label: '啟用', value: 1, color: 'success' }, // 可以加顏色
    { label: '停用', value: 0, color: 'error' },
    { label: '暫存', value: 2, color: 'warning' }
  ]

  // 性別選項
  const genderOptions = [
    { label: '男', value: 'M' },
    { label: '女', value: 'F' }
  ]

  return {
    statusOptions,
    genderOptions
  }
}
```

### 使用方式

```vue
<script setup lang="ts">
const { statusOptions } = useOptions()
const currentStatus = ref(1)
</script>

<template>
  <!-- 在 Select 使用 -->
  <ISelect
    v-model="currentStatus"
    :options="statusOptions"
    label="狀態"
  />

  <!-- 在 Table 顯示轉換 (把 1 轉成 '啟用') -->
  <ITag :color="statusOptions.find((o) => o.value === 1)?.color">
    {{ statusOptions.find((o) => o.value === 1)?.label }}
  </ITag>
</template>
```

---

## 3. 動態選項 (Dynamic Options)

選項來自後端 API，例如「部門列表」、「角色列表」。

```vue
<script setup lang="ts">
// 定義一個響應式變數
const deptOptions = ref([])

// 呼叫 API 取得資料並轉換格式
async function fetchDepartments() {
  const { data } = await api.getDepartments()
  // 假設後端回傳 [{ deptId: 1, deptName: '研發部' }]
  // 必須轉換成 UI 組件看得懂的 { label, value } 格式
  deptOptions.value = data.value.map((item) => ({
    label: item.deptName,
    value: item.deptId
  }))
}

onMounted(fetchDepartments)
</script>

<template>
  <ISelect
    :options="deptOptions"
    placeholder="請選擇部門"
  />
</template>
```

---

## 4. 進階技巧: Map 映射

有時候我們只有 `value` (例如 `1`)，想要快速查出 `label` (例如 `啟用`)，用 `array.find` 效能較差。我們可以使用 Map。

### 定義 Map

```typescript
// useOptions.ts

// 1. 定義常數
export const STATUS_MAP = {
  1: { text: '啟用', color: 'green' },
  0: { text: '停用', color: 'red' }
}

export const useOptions = () => {
  // 2. 自動轉成 Options 陣列 (如果懶得手寫陣列)
  const statusOptions = Object.entries(STATUS_MAP).map(([key, val]) => ({
    label: val.text,
    value: Number(key),
    color: val.color
  }))

  return { statusOptions }
}
```

### 快速查找

```vue
<template>
  <!-- 直接用 Map 查，O(1) 複雜度 -->
  <Tag :color="STATUS_MAP[item.status].color">
    {{ STATUS_MAP[item.status].text }}
  </Tag>
</template>
```

---

## 5. 小結

1. **靜態選項**: 寫在 `useOptions` 裡，固定不變。
2. **動態選項**: API 取得後，`map` 轉成 `{ label, value }`。
3. **Map 技巧**: 善用 Object Map 做快速查找與狀態顯示。

---

[上一課:搜尋與防抖](./lesson-18.md) | [下一課:檔案下載與匯出](./lesson-20.md) | [回首頁](../../README.md)
