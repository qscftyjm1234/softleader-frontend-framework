# 第五課：全域狀態管理 (Pinia)

當多個頁面需要共用同一份資料時 (例如使用者登入狀態、購物車內容)，我們會使用 Pinia。

## 步驟 1: 建立 Store

在 `stores` 資料夾中建立 `demo.ts`：

```typescript
// stores/demo.ts
import { defineStore } from 'pinia'

export const useDemoStore = defineStore('demo', () => {
  // State (資料)
  const counter = ref(0)
  const lastUpdated = ref<Date | null>(null)

  // Getters (計算屬性)
  const doubleCount = computed(() => counter.value * 2)

  // Actions (方法)
  function increment() {
    counter.value++
    lastUpdated.value = new Date()
  }

  function reset() {
    counter.value = 0
    lastUpdated.value = null
  }

  return {
    counter,
    lastUpdated,
    doubleCount,
    increment,
    reset
  }
})
```

## 步驟 2: 在頁面中使用 Store

我們可以在任何頁面使用這個 Store。讓我們修改 `pages/demo/index.vue` 來顯示計數器。

```vue
<!-- pages/demo/index.vue -->
<script setup lang="ts">
import { useDemoStore } from '~/stores/demo'

const store = useDemoStore()
</script>

<template>
  <div class="demo-page">
    <!-- ... 其他內容 ... -->

    <ICard class="mt-4 p-4 bg-blue-50">
      <h3>全域計數器</h3>
      <p>目前數值: {{ store.counter }}</p>
      <p>雙倍數值: {{ store.doubleCount }}</p>

      <div class="flex gap-2 mt-2">
        <IButton
          variant="success"
          size="small"
          @click="store.increment"
        >
          +1
        </IButton>
        <IButton
          variant="danger"
          size="small"
          @click="store.reset"
        >
          重置
        </IButton>
      </div>
    </ICard>
  </div>
</template>
```

## 恭喜！

您已經完成了基礎開發課程！您現在已經學會了：

1. 建立頁面與佈局
2. 使用介面元件
3. 處理路由導航
4. 串接 API
5. 管理全域狀態

接下來，您可以參考 [開發手冊](../guides/development-manual.md) 深入了解更多進階主題。

---

[上一課：API 串接與資料層](./lesson-4.md) | [回首頁](../../README.md)
