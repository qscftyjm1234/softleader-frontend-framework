# 第四課：API 串接與資料層規範

在這一課，我們將學習如何依循專案規範 (Repository Pattern) 來串接後端 API。

## 步驟 1: 建立 Repository 模組

專案將所有 API 呼叫封裝在 `repositories` 資料夾中。
在 `repositories/modules` 中建立新檔案 `tutorial.ts`：

```typescript
// repositories/modules/tutorial.ts
import { useClient } from '~/composables/useApi'
import type { UseFetchOptions } from 'nuxt/app'

// 定義回傳資料的型別 (依照後端 API 規格)
interface TutorialData {
  id: number
  title: string
  content: string
}

// 建立 Client 實例 (設定 API 子路徑)
const api = useClient('/tutorial')

export default {
  /**
   * 取得教學資料列表
   * @returns List of tutorials
   */
  getList(options: UseFetchOptions<TutorialData[]> = {}) {
    return api.get<TutorialData[]>('/list', options)
  },

  /**
   * 根據 ID 取得教學資料
   * @param id - 資料 ID
   */
  getDetail(id: number) {
    return api.get<TutorialData>(`/${id}`)
  }
}
```

## 步驟 2: 註冊 Repository (自動)

專案通常已設定自動匯入，但我們需要確認 `repositories/index.ts` 有整合這個新模組。
如果 `repositories/index.ts` 是自動掃描的，則不需額外動作；若為手動註冊，請記得加入。
(本專案主要使用 Composables `useRepository` 來存取，通常不需要手動修改 index，視專案架構而定。)

## 步驟 3: 在頁面中使用 API

修改我們的詳情頁 `pages/tutorial/[id].vue`，改為從 API 獲取資料。

```vue
<!-- pages/tutorial/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const { $repos } = useNuxtApp() // 或使用 useRepository()

const id = Number(route.params.id)

// 使用 useAsyncData 搭配 Repository 獲取資料
const {
  data: tutorial,
  pending,
  error
} = await useAsyncData(`tutorial-${id}`, () => $repos.tutorial.getDetail(id))
</script>

<template>
  <div class="detail-page">
    <div v-if="pending">載入中...</div>
    <div v-else-if="error">發生錯誤: {{ error.message }}</div>

    <div v-else-if="tutorial">
      <h1>{{ tutorial.title }}</h1>
      <p>{{ tutorial.content }}</p>
    </div>
  </div>
</template>
```

> **注意**: 如果沒有真實後端，請確保 `.env` 中開啟了 Mock 模式 (`NUXT_PUBLIC_FEATURE_API_MOCK=true`) 或自行建立 Mock Server。

---

[上一課：頁面導航與路由](./lesson-3.md) | [回首頁](../../README.md) | [下一課：全域狀態管理](./lesson-5.md)
