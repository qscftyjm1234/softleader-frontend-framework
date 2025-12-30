# 開發包架構說明

## 核心理念:框架無關

本開發包採用 **Headless Components** 設計模式,提供完整的業務邏輯,但不綁定任何 UI 框架。

## 架構層次

```
┌─────────────────────────────────────────┐
│  使用者選擇的 UI 框架                      │
│  (Vuetify / Element Plus / Ant Design)  │
└─────────────────────────────────────────┘
              ↓ 使用
┌─────────────────────────────────────────┐
│  Headless Components (邏輯層)            │
│  - DataTable.vue                        │
│  - Pagination.vue                       │
│  - Modal.vue                            │
└─────────────────────────────────────────┘
              ↓ 使用
┌─────────────────────────────────────────┐
│  Composables (業務邏輯)                   │
│  - useDataTable                         │
│  - usePagination                        │
│  - useForm                              │
└─────────────────────────────────────────┘
```

## 目錄結構

```
nuxt3-test/
├── core/
│   ├── composables/       # 25+ 業務 composables
│   ├── headless/          # Headless Components
│   ├── utils/             # 工具函數
│   └── types/             # TypeScript 類型
│
├── examples/              # 多框架範例
│   ├── native/            # 原生 HTML 範例
│   ├── vuetify/           # Vuetify 範例 (計劃中)
│   └── element/           # Element Plus 範例 (計劃中)
│
├── pages/
│   ├── layout-demo/       # Layout 系統展示
│   └── headless-demo.vue  # Headless Components 展示
│
└── docs/                  # 文件
```

## 使用方式

### 1. 使用 Composables (推薦)

```typescript
import { useDataTable } from '~/composables'

const { data, loading, fetchData } = useDataTable({
  apiEndpoint: '/api/users'
})

// 用任何 UI 框架渲染
```

### 2. 使用 Headless Components

```vue
<DataTable :data="data" :columns="columns">
  <template #default="{ data, onSort }">
    <!-- 用您選擇的 UI 框架渲染 -->
  </template>
</DataTable>
```

## 查看範例

- `/layout-demo` - 框架無關的 Layout 系統
- `/headless-demo` - Headless Components 展示

## 下一步

查看 `examples/` 目錄了解如何在不同 UI 框架中使用本開發包。
