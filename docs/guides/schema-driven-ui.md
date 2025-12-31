# Schema-Driven UI 使用指南

本指南說明如何使用 Schema-Driven UI 架構來快速建立頁面。

## 核心概念

在這個架構下，頁面不再是由 HTML 堆疊而成，而是由 **JSON/JavaScript 物件 (Schema)** 描述而成。
`SchemaRenderer` 元件會負責將這些描述轉換為實際的 Vue 元件。

## 步驟 1：建立頁面

在您的模組 `pages` 目錄下建立一個 `.vue` 檔案，例如 `modules/product/pages/list.vue`。

## 步驟 2：定義 Schema

在 `<script setup>` 中定義頁面的結構。

```typescript
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  blocks: [
    // 區塊 1: 標題
    {
      type: 'div', // 使用標準 HTML 標籤
      props: { class: 'mb-4' },
      children: [
        {
          type: 'h1',
          props: { class: 'text-h4' }
          // 目前文字內容需透過子元件或特定 prop 處理，
          // 或是擴充 renderer 支援純文字節點。
          // 這裡示範用 SmartTable，它是此架構的核心。
        }
      ]
    },
    // 區塊 2: 智慧表格
    {
      type: 'SmartTable', // 使用已註冊的智慧元件
      props: {
        title: '商品列表',
        columns: [
          { label: '商品名稱', field: 'name' },
          { label: '價格', field: 'price' },
          { label: '庫存狀態', field: 'status', type: 'tag' }
        ],
        data: [
          { name: 'iPhone 15', price: '$29,900', status: 'In Stock' },
          { name: 'MacBook Pro', price: '$54,900', status: 'Low Stock' }
        ]
      }
    }
  ]
}
```

## 步驟 3：渲染頁面

在 `<template>` 中使用 `SchemaRenderer`。

```html
<template>
  <div>
    <SchemaRenderer
      v-for="(block, index) in pageSchema.blocks"
      :key="index"
      :schema="block"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>
  import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
  // ... (上面的 schema 定義)
</script>
```

## 進階：註冊新元件

如果您需要新的元件 (例如 `SmartCard` 或 `SmartForm`)：

1.  **建立元件**: 在 `components/business/` 下建立 `SmartCard.vue`。
2.  **註冊元件**: 打開 `core/schema/registry.ts`，將其加入註冊表。

```typescript
// core/schema/registry.ts
import SmartCard from '~/components/business/SmartCard.vue'

const registry = {
  // ...
  SmartCard: SmartCard
}
```

3.  **使用元件**: 在 Schema 中將 `type` 設為 `'SmartCard'`。

## 未來展望

未來我們可以將 `pageSchema` 的內容移到後端 API 或 YAML 設定檔中，這樣就能在不修改前端程式碼的情況下，動態調整頁面內容。
