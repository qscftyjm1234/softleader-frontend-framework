<!-- Author: cindy -->

# 第八課:全域狀態管理 (Pinia)

本課程教您如何使用 **Pinia** 來管理跨頁面的資料 (Global State)。

最常見的情境：登入資訊 (User)、購物車 (Cart)、全域設定 (AppConfig)。

## 1. 什麼是 Store?

Store 就像是一個「雲端資料夾」，任何頁面都可以存取它，且**資料會自動同步**。

- **State**: 變數 (如 `cartItems`)
- **Getters**: 計算屬性 (如 `totalPrice`)
- **Actions**: 函式 (如 `addToCart`)

---

## 2. 實戰範例：購物車 (CartStore)

我們來建立一個購物車 Store，包含商品清單、計算總金額、新增商品功能。

### 步驟 1: 定義 Store (`stores/cart.ts`)

```typescript
// stores/cart.ts
export const useCartStore = defineStore('cart', () => {
  // 1. State (資料)
  const items = ref<any[]>([])

  // 2. Getters (計算屬性)
  const totalAmount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price, 0)
  })

  const itemCount = computed(() => items.value.length)

  // 3. Actions (動作)
  function addItem(product: any) {
    items.value.push(product)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    totalAmount,
    itemCount,
    addItem,
    clearCart
  }
})
```

### 步驟 2: 在頁面使用

```vue
<script setup lang="ts">
const cartStore = useCartStore()

// ❌ 錯誤：直接解構會失去響應性 (不會自動更新)
// const { itemCount, totalAmount } = cartStore

// ✅ 正確：使用 storeToRefs 保持響應性
const { itemCount, totalAmount } = storeToRefs(cartStore)

function buy() {
  // Action 直接呼叫即可
  cartStore.addItem({ name: 'iPhone 15', price: 30000 })
}
</script>

<template>
  <div class="p-4 border rounded">
    <h2>購物車資訊</h2>
    <p>目前商品數：{{ itemCount }}</p>
    <p>總金額：${{ totalAmount }}</p>

    <IButton @click="buy">加入 iPhone ($30000)</IButton>
    <IButton
      variant="outline"
      @click="cartStore.clearCart"
    >
      清空
    </IButton>
  </div>
</template>
```

---

## 3. 重要觀念：解構陷阱

初學者最常犯的錯，就是直接解構 Store，導致資料不會更新。

| 類型                | 處理方式             | 原因                                   |
| :------------------ | :------------------- | :------------------------------------- |
| **State / Getters** | 必須用 `storeToRefs` | 因為它是 `Ref`，直接解構會變成普通變數 |
| **Actions**         | 直接解構             | 因為它是 `Function`，不會有響應性問題  |

```typescript
// 假設 store.count = 0

// ❌ 壞掉的寫法
const { count } = store
// 此時 count 變成單純的 number 0，store 變了它也不會變

// ✅ 正確寫法
const { count } = storeToRefs(store)
// 此時 count 是 Ref<number>，會跟著 store 連動
```

---

## 4. 小結

1.  **State** = `ref()`
2.  **Getters** = `computed()`
3.  **Actions** = `function()`
4.  **Destructure**: 取資料記得用 `storeToRefs()`。

---

[上一課:API 串接與資料層](./lesson-7.md) | [下一課:Git 提交與工作流](./lesson-9.md) | [回首頁](../../README.md)
