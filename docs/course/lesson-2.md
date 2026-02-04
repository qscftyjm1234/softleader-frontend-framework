# 第二課：使用介面元件與 Props

在這一課，我們將深入了解前端的核心概念：**元件 (Component)**。
我們將學習如何像堆積木一樣，利用專案中現有的基礎元件，組合成更複雜的業務元件。

---

## 1. 觀念介紹：什麼是元件？

### 給後端開發者的比喻

如果您熟悉後端開發 (Java/C#)，可以這樣理解：

- **Component (元件)** = **Class (類別)**
  - 它封裝了 **HTML (結構)**、**CSS (樣式)** 與 **JavaScript (邏輯)**。
  - 就像 Class 有封裝性，元件內部的實作細節不需要被外部知道。

- **Props (屬性)** = **Method Parameters (函式參數)** 或 **Constructor Arguments**
  - 元件透過 Props 接收外部傳入的資料。
  - 就像呼叫函式 `printUser(name, role)`，我們在 HTML 中使用 `<UserCard name="Gino" role="Admin" />` 把資料傳進去。

### 積木理論 (Atomic Design)

我們採用 **Atomic Design (原子設計)** 的概念：

1.  **原子 (Atoms)**: 最基礎的元件，如按鈕、輸入框、圖示。
    - _本專案位置_: `components/uiInterface` (開頭都是 `I`)
2.  **分子/組織 (Molecules/Organisms)**: 由原子組合而成的複合元件，如「使用者卡片」、「登入表單」。
    - _本專案位置_: `components/uiBusiness` 或 `components/tutorial`

---

## 2. 專案架構：元件分層

為了避免架構混亂，我們嚴格區分兩種元件：

| 類型       | 資料夾        | 命名                       | 用途                                                 | 比喻            |
| :--------- | :------------ | :------------------------- | :--------------------------------------------------- | :-------------- |
| **介面層** | `uiInterface` | `I` 開頭 (如 `IButton`)    | **純 UI 展示**，不含業務邏輯。只在乎「長什麼樣子」。 | 樂高積木 (磚塊) |
| **業務層** | `uiBusiness`  | PascalCase (如 `UserCard`) | **含業務邏輯**，通常由多個介面層元件組合而成。       | 樂高城堡 (成品) |

**本課目標**：使用 `uiInterface` 的積木 (`ICard`, `IAvatar`)，組合成一個業務元件 `UserInfoCard`。

---

## 3. 實作步驟：建立 UserInfoCard

讓我們來建立一個顯示使用者頭像、姓名與職稱的卡片。

### Step 1: 建立檔案與骨架

在 `components/tutorial` 資料夾下建立 `UserInfoCard.vue`。

Vue 檔案由三個區塊組成：

```vue
<!-- components/tutorial/UserInfoCard.vue -->

<!-- 1. Script: 邏輯層 (JS/TS) -->
<script setup lang="ts">
// 這裡寫 TypeScript 程式碼
</script>

<!-- 2. Template: 視圖層 (HTML) -->
<template>
  <div class="user-info-card">
    <!-- 這裡寫 HTML 結構 -->
  </div>
</template>

<!-- 3. Style: 樣式層 (CSS) -->
<style scoped>
/* 這裡寫 CSS，scoped 代表樣式只會影響這個元件 */
</style>
```

### Step 2: 定義資料接口 (Props)

我們需要告訴這個元件：「你需要接收什麼資料？」。這就像定義 Java Interface 或 DTO。

在 `<script setup>` 中使用 `defineProps`：

```vue
<script setup lang="ts">
// 定義資料介面
interface Props {
  name: string // 必填：名字
  role: string // 必填：職稱
  avatarUrl?: string // 選填：頭像網址 (? 代表可有可無)
}

// 接收資料，並設定預設值
withDefaults(defineProps<Props>(), {
  avatarUrl: '' // 如果沒傳頭像，預設為空字串
})
</script>
```

### Step 3: 使用基礎元件組合畫面

現在我們使用 `uiInterface` 中的 `ICard` (卡片容器) 與 `IAvatar` (頭像) 來組合畫面。

```vue
<template>
  <!-- ICard: 專案統一的卡片樣式 -->
  <ICard class="user-info-card">
    <div class="card-content">
      <!-- IAvatar: 專案統一的頭像元件 -->
      <!-- :src 是 v-bind:src 的縮寫，代表屬性值是變數而非字串 -->
      <IAvatar
        :src="avatarUrl"
        :alt="name"
        size="large"
        class="mr-4"
      />

      <!-- 文字資訊 -->
      <div class="text-content">
        <!-- {{ }} 用於在 HTML 中顯示變數 -->
        <h3 class="name">{{ name }}</h3>
        <p class="role">{{ role }}</p>
      </div>
    </div>
  </ICard>
</template>
```

### Step 4: 加上樣式

使用 CSS 美化排版。

```vue
<style scoped>
.card-content {
  display: flex; /* 彈性佈局，讓頭像跟文字並排 */
  align-items: center; /* 垂直置中 */
  padding: 16px;
}

.name {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.role {
  color: #6b7280; /* 灰色文字 */
  font-size: 0.875rem;
}
</style>
```

---

## 4. 在頁面中使用元件

現在我們的「積木」做好了，回到頁面 (`pages/tutorial/index.vue`) 把這塊積木放上去。

```vue
<!-- pages/tutorial/index.vue -->
<script setup lang="ts">
// 引入我們剛做的元件 (Nuxt 通常會自動引入，但手動引入可以更明確)
// import UserInfoCard from '~/components/tutorial/UserInfoCard.vue'

// 準備要在卡片上顯示的資料
const engineer = {
  name: '王小明',
  role: '資深後端工程師',
  photo: 'https://i.pravatar.cc/150?img=11'
}

const manager = {
  name: '李大華',
  role: '專案經理' // 沒照片，會用預設值
}
</script>

<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">團隊成員</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 第一張卡片：傳入所有資料 -->
      <!-- :name="engineer.name" 代表把變數值傳進去 -->
      <UserInfoCard
        :name="engineer.name"
        :role="engineer.role"
        :avatar-url="engineer.photo"
      />

      <!-- 第二張卡片：不傳 avatarUrl，測試預設值 -->
      <UserInfoCard
        :name="manager.name"
        :role="manager.role"
      />
    </div>
  </div>
</template>
```

## 5. 課後重點整理

1.  **分層架構**：我們不從零刻 HTML，而是先看 `uiInterface` 有沒有現成的積木 (`IButton`, `IInput` 等)。
2.  **Props**：父元件透過 Props 把資料向下傳遞給子元件 (Data Down)。
3.  **v-bind (:)**：在 HTML 屬性前加冒號 `:`，代表後面接的是**程式變數**；沒加冒號，後面接的就是**純字串**。

---

[上一課：建立您的第一個頁面](./lesson-1.md) | [回首頁](../../README.md) | [下一課：頁面導航與路由](./lesson-3.md)
