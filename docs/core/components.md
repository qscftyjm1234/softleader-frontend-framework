[← 返回文件導覽](../index.md)

# 通用元件系統 (Component System)

本專案採用分層元件架構,將 UI 元件依職責分為三大類,確保程式碼可維護性與可重用性。

## 元件分類架構

```
components/
├── uiInterface/      # 純 UI 元件 (無業務邏輯)
├── uiBusiness/       # 業務 UI 元件 (含業務邏輯)
├── layout/           # 佈局元件
├── auth/             # 認證相關元件
├── auth/             # 認證相關元件

```

---

## 1. uiInterface - 純 UI 介面元件

### 設計原則

- **框架無關**: 不依賴特定 UI 框架 (Vuetify, Element Plus 等)
- **無業務邏輯**: 僅處理 UI 互動,不包含 API 呼叫或狀態管理
- **高度可重用**: 可在任何頁面、任何模組中使用
- **命名規範**: 使用 `I` 前綴 + PascalCase (例: `IButton.vue`)

### 核心元件清單

#### 表單元件

- `IInput.vue` - 基礎輸入框
- `ITextField.vue` - 文字輸入框
- `ITextarea.vue` - 多行文字框
- `ISelect.vue` - 下拉選單
- `ICheckbox.vue` - 核取方塊
- `IRadio.vue` - 單選按鈕
- `ISwitch.vue` - 開關切換
- `IDatePicker.vue` - 日期選擇器

#### 互動元件

- `IButton.vue` - 按鈕
- `ILoadingButton.vue` - 載入中按鈕
- `IModal.vue` - 彈窗
- `ISnackbar.vue` - 通知訊息
- `IAlert.vue` - 警告提示

#### 展示元件

- `ICard.vue` - 卡片
- `ISheet.vue` - 面板
- `IAvatar.vue` - 頭像
- `IChip.vue` - 標籤
- `IChipGroup.vue` - 標籤群組
- `IBadge.vue` - 徽章
- `IIcon.vue` - 圖示
- `IDivider.vue` - 分隔線

#### 資料元件

- `IDataTable.vue` - 資料表格
- `ITabs.vue` - 分頁標籤

#### 佈局元件

- `IStack.vue` - 堆疊容器
- `IAppBar.vue` - 應用程式列
- `IDrawer.vue` - 側邊抽屜
- `IBreadcrumbs.vue` - 麵包屑導航
- `IMenuItem.vue` - 選單項目

### 使用範例

```vue
<template>
  <ICard>
    <IInput
      v-model="username"
      label="使用者名稱"
      placeholder="請輸入使用者名稱"
    />

    <ILoadingButton
      :loading="isSubmitting"
      @click="handleSubmit"
    >
      送出
    </ILoadingButton>
  </ICard>
</template>

<script setup lang="ts">
const username = ref('')
const isSubmitting = ref(false)

const handleSubmit = () => {
  isSubmitting.value = true
  // 處理送出邏輯
}
</script>
```

---

## 2. uiBusiness - 業務 UI 元件

### 設計原則

- **包含業務邏輯**: 整合 API 呼叫、資料驗證、狀態管理
- **特定場景**: 為特定業務需求設計
- **可配置**: 透過 props 調整行為
- **命名規範**: 使用 PascalCase,描述業務功能 (例: `UserCard.vue`)

### 核心元件清單

#### 表單元件

- `EmailInput.vue` - Email 輸入框 (含驗證)
- `PasswordInput.vue` - 密碼輸入框 (含顯示/隱藏)
- `PhoneInput.vue` - 電話輸入框 (含格式驗證)
- `GenderRadio.vue` - 性別選擇
- `DateRangePicker.vue` - 日期區間選擇器
- `CitySelect.vue` - 城市選擇器
- `CountrySelect.vue` - 國家選擇器
- `OptionSelect.vue` - 選項選擇器

#### 業務元件

- `PolicyForm.vue` - 保單表單
- `SmartTable.vue` - 智慧表格 (含排序、篩選、分頁)
- `SmartCard.vue` - 智慧卡片
- `SmartComplexWidget.vue` - 複雜小工具

#### 互動元件

- `ApiLoadingButton.vue` - API 載入按鈕 (自動處理 loading 狀態)
- `GlobalModal.vue` - 全域彈窗
- `GlobalSnackbar.vue` - 全域通知
- `GlobalLoading.vue` - 全域載入動畫

### 使用範例

```vue
<template>
  <PolicyForm
    v-model="policyData"
    :loading="isLoading"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
const policyData = ref({})
const isLoading = ref(false)

const handleSubmit = async (data) => {
  isLoading.value = true
  // API 呼叫邏輯
}
</script>
```

---

## 3. layout - 佈局元件

### 設計原則

- **頁面結構**: 定義頁面的整體框架
- **全域共用**: 在多個頁面間共用
- **響應式**: 支援不同螢幕尺寸

### 核心元件清單

- `AppHeader.vue` - 應用程式標題列
- `AppSidebar.vue` - 側邊欄
- `PortalHeader.vue` - Portal 專用標題列
- `HeaderUserMenu.vue` - 使用者選單

### 使用範例

```vue
<template>
  <div>
    <AppHeader />
    <div class="content">
      <AppSidebar />
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
```

---

## 4. auth - 認證元件

### 核心元件清單

- `LoginForm.vue` - 登入表單

---

## 元件開發規範

### 命名規範

| 元件類型    | 命名方式         | 範例            |
| :---------- | :--------------- | :-------------- |
| uiInterface | `I` + PascalCase | `IButton.vue`   |
| uiBusiness  | PascalCase       | `UserCard.vue`  |
| layout      | PascalCase       | `AppHeader.vue` |

### Props 定義規範

```vue
<script setup lang="ts">
interface Props {
  /** 按鈕文字 */
  label: string
  /** 是否為載入中狀態 */
  loading?: boolean
  /** 按鈕類型 */
  variant?: 'primary' | 'secondary' | 'danger'
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  variant: 'primary'
})
</script>
```

### Emits 定義規範

```vue
<script setup lang="ts">
interface Emits {
  /** 點擊事件 */
  (e: 'click', event: MouseEvent): void
  /** 值改變事件 */
  (e: 'update:modelValue', value: string): void
}

const emit = defineEmits<Emits>()
</script>
```

---

## 最佳實踐

### 1. 元件職責單一

❌ **錯誤**: 一個元件做太多事

```vue
<!-- UserProfileCard.vue - 包含表單、API、驗證 -->
<template>
  <div>
    <form @submit="handleSubmit">
      <!-- 大量表單邏輯 -->
    </form>
  </div>
</template>
```

✅ **正確**: 拆分職責

```vue
<!-- UserProfileCard.vue - 僅負責佈局 -->
<template>
  <ICard>
    <UserProfileForm @submit="handleSubmit" />
  </ICard>
</template>
```

### 2. 使用 Composables 封裝邏輯

❌ **錯誤**: 業務邏輯寫在元件內

```vue
<script setup>
const fetchUsers = async () => {
  const response = await fetch('/api/users')
  // 大量處理邏輯
}
</script>
```

✅ **正確**: 使用 Composable

```vue
<script setup>
const { users, fetchUsers, loading } = useUsers()
</script>
```

### 3. Props 向下,Events 向上

```vue
<!-- 父元件 -->
<template>
  <UserCard
    :user="userData"
    @update="handleUpdate"
  />
</template>

<!-- 子元件 -->
<script setup>
const props = defineProps<{ user: User }>()
const emit = defineEmits<{ update: [user: User] }>()
</script>
```

---

## 相關文件

- [佈局系統](./layout.md)
- [開發規範](../guides/development.md)
- [資料夾結構](../project/folder-structure.md)
