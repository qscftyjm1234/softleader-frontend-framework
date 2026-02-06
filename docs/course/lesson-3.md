<!-- Author: cindy -->

# 第三課:UI 框架介紹

本課程介紹專案使用的 **Tailwind CSS** (樣式) 與 **Ant Design Vue** (組件) 的整合應用。

## 1. Ant Design Vue (底層組件)

[Ant Design Vue](https://antdv.com/) 是一套企業級的 UI 組件庫，提供了豐富且高品質的基礎元件。
本專案選用它作為底層的核心引擎，負責處理複雜的互動邏輯 (如日期選擇、表格排序、樹狀結構等)。

### 1.1 這套框架包含什麼?

雖然我們不直接使用，但您應該知道它提供了哪些強大功能：

- **通用元件**: Button, Icon, Typography
- **佈局元件**: Grid (24柵格系統), Layout, Space
- **導航元件**: Menu, Dropdown, Pagination
- **資料輸入**: Form, Input, Select, DatePicker
- **資料展示**: Table, List, Tree, Tooltip
- **反饋元件**: Modal, Message, Notification

### 1.2 核心組件展示

以下展示幾個 Ant Design Vue 最強大的組件，這些功能若要自己手刻會非常耗時，這也是我們選用它當底層的原因：

#### 1. Form 表單驗證

內建強大的驗證規則引擎，支援 async 驗證。

```html
<a-form
  :model="formState"
  @finish="onFinish"
>
  <!-- 必填、Email 格式驗證 -->
  <a-form-item
    name="email"
    label="Email"
    :rules="[{ required: true, type: 'email', message: '請輸入正確 Email' }]"
  >
    <a-input v-model:value="formState.email" />
  </a-form-item>

  <a-button html-type="submit">提交</a-button>
</a-form>
```

#### 2. Table 超級表格

支援分頁、排序、篩選、固定欄位、多選等複雜功能。

```html
<a-table
  :dataSource="data"
  :columns="columns"
  :pagination="{ pageSize: 10 }"
  :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
>
  <!-- 自訂欄位內容 (Slot) -->
  <template #bodyCell="{ column, record }">
    <template v-if="column.key === 'action'">
      <a>編輯</a>
      <a-divider type="vertical" />
      <a>刪除</a>
    </template>
  </template>
</a-table>
```

#### 3. DatePicker 日期選擇

支援多種模式：年/月/週/日選擇、區間選擇、以及時間選擇。

```html
<!-- 日期時間區間選擇 -->
<a-range-picker
  show-time
  format="YYYY-MM-DD HH:mm:ss"
  :placeholder="['開始時間', '結束時間']"
/>
```

#### 4. Tree 樹狀結構

處理階層式資料 (如部門組織圖、權限樹) 非常方便。

```html
<a-tree
  checkable
  :tree-data="treeData"
  v-model:checkedKeys="checkedKeys"
  defaultExpandAll
>
  <template #title="{ title, key }">
    <span
      v-if="key === '0-0-1'"
      style="color: #1890ff"
    >
      {{ title }}
    </span>
    <template v-else>{{ title }}</template>
  </template>
</a-tree>
```

#### 5. Select 搜尋選單

支援後端搜尋、標籤模式 (Tags)、多選。

```html
<a-select
  v-model:value="value"
  mode="multiple"
  show-search
  placeholder="請選擇標籤"
  :options="options"
  :filter-option="filterOption"
/>
```

---

## 2. Tailwind CSS (樣式排版)

Tailwind CSS 是 Utility-First 的 CSS 框架，讓您直接在 class 中寫樣式。

### 2.1 常用排版技巧

不需寫 `display: flex; justify-content: center; ...`，直接組合 class:

```vue
<template>
  <!-- 水平垂直置中 -->
  <div class="flex items-center justify-center h-screen bg-gray-50">
    <!-- 內容 -->
  </div>

  <!-- 網格佈局 (Grid) -->
  <div class="grid grid-cols-3 gap-4">
    <div class="bg-blue-100 p-4">區塊 1</div>
    <div class="bg-blue-200 p-4">區塊 2</div>
    <div class="bg-blue-300 p-4">區塊 3</div>
  </div>
</template>
```

### 2.2 狀態樣式 (Hover/Focus)

```vue
<template>
  <button
    class="
    bg-blue-500          /* 預設背景 */
    text-white           /* 文字顏色 */
    px-4 py-2            /* 內距 */
    rounded              /* 圓角 */
    hover:bg-blue-600    /* 滑鼠懸停 */
    active:bg-blue-700   /* 點擊 */
    disabled:opacity-50  /* 禁用 */
  "
  >
    按鈕範例
  </button>
</template>
```

### 2.3 響應式設計 (RWD)

Tailwind 使用前綴來控制不同螢幕大小的樣式：

- `md:` (平板 768px 以上)
- `lg:` (電腦 1024px 以上)

```vue
<template>
  <!-- 手機版垂直排列，電腦版並排 -->
  <div class="flex flex-col md:flex-row gap-4">
    <div class="w-full md:w-1/2 bg-red-100">左側</div>
    <div class="w-full md:w-1/2 bg-green-100">右側</div>
  </div>
</template>
```

---

## 3. 實戰範例: 登入卡片

結合 `IInput` (封裝組件) 與 Tailwind (樣式) 的登入介面範例。

```vue
<template>
  <div class="flex items-center justify-center min-h-[400px] bg-gray-50">
    <!-- 卡片容器 -->
    <div class="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <!-- 標題區域 -->
      <div class="mb-6 text-center">
        <h2 class="text-2xl font-bold text-gray-800">歡迎回來</h2>
        <p class="text-sm text-gray-500">請輸入您的帳號密碼</p>
      </div>

      <!-- 表單內容 -->
      <div class="space-y-4">
        <!-- 輸入框 (使用封裝組件) -->
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">帳號</label>
          <IInput placeholder="請輸入 User ID" />
        </div>

        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">密碼</label>
          <IInput
            type="password"
            placeholder="請輸入 Password"
          />
        </div>

        <!-- 按鈕 (使用封裝組件，樣式調整寬度) -->
        <IButton
          variant="primary"
          class="w-full mt-4"
        >
          登入系統
        </IButton>
      </div>

      <!-- 底部連結 -->
      <div class="mt-4 text-center text-xs text-gray-400">
        <span class="hover:text-blue-500 cursor-pointer">忘記密碼?</span>
      </div>
    </div>
  </div>
</template>
```

---

## 4. 小結

1.  **Layout**: 使用 Tailwind 的 `flex`, `grid`, `w-full`, `p-4`。
2.  **RWD**: 善用 `md:`, `lg:` 前綴。
3.  **整合**: 外層用 Tailwind 排版，內層元件使用 `uiInterface`。

---

[上一課:建立您的第一個元件](./lesson-2.md) | [下一課:UI 組件開發規範](./lesson-4.md) | [回首頁](../../README.md)
