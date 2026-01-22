[← 返回文件導覽](../index.md)

# 邏輯放置指南 (Composables vs Utils)

本指南旨在幫助開發者正確劃分代碼邏輯。我們將其分為「核心準則」與「實務快速判斷」兩部分。

---

## 快速判斷法 (直覺導向)

如果你想在 3 秒內做出決定，請問自己：**「這個東西有沒有『記住』什麼狀態？」**

### 1. 如果它是「加工廠」➡️ 放 `utils/`

- **任務**：給它資料，它還你處理好的資料（如：格式化、運算）。
- **特性**：不管是在哪裡呼叫，只要輸入一樣，結果一定一樣。
- **例子**：遮蔽個資、日期轉換、複雜數學計算。

### 2. 如果它是「狀態管理者」 (Stateful Logic) ➡️ 放 `composables/`

- **任務**：封裝「具有狀態」的邏輯以便重用 (Encapsulate state & logic)。
- **特性**：必定使用 Vue Reactivity API (如 `ref`, `computed`, `onMounted`)。
- **例子**：`useFetch` (API 狀態)、`useMouse` (游標位置)、`useAuth` (使用者登入狀態)。

---

## 核心準則 (精確定義)

為了確保代碼的嚴謹性，請參考以下對照表：

| 比較項目     | Composables (組合式函式) | Utils (工具函式)       | Store (狀態庫)           |
| :----------- | :----------------------- | :--------------------- | :----------------------- |
| **定義**     | 封裝**具反應性**的邏輯   | 純粹的**邏輯運算**函式 | **全域狀態**與資料流管理 |
| **反應性**   | **有** (ref/computed)    | **無** (純函式)        | **有** (State/Getters)   |
| **生命週期** | 跟隨 Component           | 無                     | 全域單例 (App Level)     |
| **框架依賴** | Vue/Nuxt                 | 獨立 (JS/TS)           | Pinia                    |
| **命名慣例** | `use` 開頭 (useAuth)     | 描述性 (formatDate)    | `use` 開頭 (useUser)     |

---

## ✅ 實際程式碼對照

### Utils (純工具，無狀態)

```typescript
// utils/format/phone.ts
/** 僅處理字串加工，不涉及狀態 */
export const maskPhone = (phone: string) => {
  return phone.replace(/(\d{4})\d{3}(\d{2})/, '$1***$2')
}
```

### Composables (具狀態管理)

```typescript
// composables/useUser.ts
/** 管理使用者資料與其載入狀態 */
export const useUser = () => {
  const user = ref(null)
  const isLoading = ref(false)

  const load = async (id: string) => {
    isLoading.value = true
    user.value = await $api.get(`/users/${id}`)
    isLoading.value = false
  }

  return { user, isLoading, load }
}
```

---

## ⚠️ 開發禁忌 (Don'ts)

- **不要在 `utils` 中使用複數狀態**：如果你發現工具函式需要用到 `ref()`，請將其移動至 `composables`。
- **不要在 `composable` 中撰寫過重運算**：若有複雜的資料處理邏輯，應先寫在 `utils` 中，再由 `composable` 呼叫並存儲結果。

---

## 總結

- **加工/處理資料** ➡️ `utils/`
- **存取/管理狀態** ➡️ `composables/`
