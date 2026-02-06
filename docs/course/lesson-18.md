<!-- Author: cindy -->

# 第十八課:搜尋與防抖

本課程教您如何實作搜尋功能並加入防抖 (Debounce) 機制。

## 1. 為什麼需要防抖?

當使用者輸入搜尋關鍵字時，如果每個字都發送 API 請求，會造成伺服器負擔。
防抖可以讓程式在使用者「停止輸入」一段時間後才發送請求。

## 2. 使用 watchDebounced

Nuxt (VueUse) 提供了 `watchDebounced`。

### 範例

```vue
<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

const keyword = ref('')

watchDebounced(
  keyword,
  (newVal) => {
    console.log('搜尋:', newVal)
    // 呼叫 API
    fetchData(newVal)
  },
  { debounce: 500 } // 延遲 500ms
)
</script>

<template>
  <IInput
    v-model="keyword"
    placeholder="搜尋..."
  />
</template>
```

---

## 3. 小結

1. **工具**: `watchDebounced`
2. **目的**: 減少 API 請求
3. **延遲**: 通常設定 300ms - 500ms

---

[上一課:資料列表與分頁](./lesson-17.md) | [下一課:選項數據管理](./lesson-19.md) | [回首頁](../../README.md)
