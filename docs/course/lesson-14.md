<!-- Author: antigravity -->

# 第十四課：搜尋與防抖

本課程教您如何實作高效的搜尋功能。透過防抖機制，我們可以避免使用者在連續輸入時產生過多的 API 請求，進而優化伺服器負擔與使用者體驗。

---

## 1. 建立搜尋展示頁面

(1.) 在 `pages/` 資料夾下建立 `search-demo.vue`。
(2.) 準備好搜尋關鍵字的響應式變數。

---

## 2. 引入完整程式碼

這裡展示了如何使用 `watchDebounced` 來實作搜尋延遲觸發的完整版本。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div class="max-w-xl w-full bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-sm">
      <h1 class="text-3xl font-black text-slate-900 mb-2">即時搜尋引擎</h1>
      <p class="text-slate-400 mb-10 font-bold">具備 500ms 智能防抖延遲</p>

      <div class="space-y-8">
        <!-- 搜尋輸入框 -->
        <IInput
          v-model="keyword"
          placeholder="輸入關鍵字開始搜尋..."
          icon="mdi-magnify"
          class="shadow-sm"
        />

        <!-- 搜尋狀態展示 -->
        <div class="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 text-center">
          <div
            v-if="isSearching"
            class="flex flex-col items-center gap-3"
          >
            <div
              class="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"
            ></div>
            <p class="text-sm font-black text-slate-400 uppercase tracking-widest">正在搜尋中</p>
          </div>
          <div v-else>
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              最後搜尋結果
            </div>
            <p class="text-2xl font-black text-blue-600">{{ keyword || '尚無內容' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'

const keyword = ref('')
const isSearching = ref(false)

// 監聽關鍵字變化，並加入 500ms 的防抖延遲
watchDebounced(
  keyword,
  async (newVal) => {
    if (!newVal) return

    isSearching.value = true
    // 模擬 API 搜尋延遲
    await new Promise((resolve) => setTimeout(resolve, 1000))
    isSearching.value = false

    console.log('正式對後端發送搜尋請求：', newVal)
  },
  { debounce: 500 }
)

definePageMeta({
  title: '搜尋防抖範例',
  layout: 'portal'
})
</script>
```

---

## 3. 小結

一
直接使用監聽器（watch）會讓每次按鍵都發送請求，對效能不利。
二
使用 `watchDebounced` 可以確保使用者「停止輸入」一段時間後才執行邏輯。
三
合適的延遲時間通常設定在 300 毫秒至 500 毫秒之間。

---

## 4. 延伸資源

一
[VueUse 實用組合式函式庫](https://vueuse.org/)

---

[上一課 第十三課：資料列表與分頁](./lesson-13.md) | [下一課 第十五課：表單處理與驗證](./lesson-15.md) | [回首頁](../../README.md)
