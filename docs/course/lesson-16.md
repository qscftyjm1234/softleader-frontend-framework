<!-- Author: cindy -->

# 第十六課:資料格式化工具

本課程介紹專案內建的 `useFormatter` 和 `useDateTime`，讓您不必手寫正規表達式來處理資料。

## 1. 數字與金額 (useFormatter)

```vue
<script setup lang="ts">
const { formatNumber, formatCurrency, formatPercent, formatFileSize } = useFormatter()
</script>

<template>
  <div class="space-y-4">
    <!-- 千分位: 1,234,567 -->
    <p>數字: {{ formatNumber(1234567) }}</p>

    <!-- 金額: NT$ 1,234,567 -->
    <p>金額: {{ formatCurrency(1234567) }}</p>
    <p>美金: {{ formatCurrency(1234567, 'USD') }}</p>

    <!-- 百分比: 85.00% -->
    <p>進度: {{ formatPercent(0.85) }}</p>

    <!-- 檔案大小: 1.50 MB -->
    <p>大小: {{ formatFileSize(1572864) }}</p>
  </div>
</template>
```

---

## 2. 日期與時間 (useDateTime)

```vue
<script setup lang="ts">
const {
  formatDate, // YYYY-MM-DD
  formatDateTime, // YYYY-MM-DD HH:mm:ss
  formatRelative, // 3 分鐘前
  today,
  add
} = useDateTime()

const now = new Date()
</script>

<template>
  <div class="space-y-4">
    <p>日期: {{ formatDate(now) }}</p>
    <p>時間: {{ formatDateTime(now) }}</p>

    <!-- 如果是昨天的時間，會顯示 "1 天前" -->
    <p>相對: {{ formatRelative(add(now, -1, 'day')) }}</p>

    <!-- 取得下週日期 -->
    <p>截止: {{ formatDate(add(now, 7, 'day')) }}</p>
  </div>
</template>
```

---

## 3. 個資遮罩與字串處理

保護使用者隱私，自動遮蔽敏感資訊。

```vue
<script setup lang="ts">
const { maskPhone, maskEmail, formatTaiwanId, truncate } = useFormatter()
</script>

<template>
  <div class="space-y-4">
    <!-- 手機: 0912-***-789 -->
    <p>手機: {{ maskPhone('0912345678') }}</p>

    <!-- Email: ci***@example.com -->
    <p>Email: {{ maskEmail('cindy@example.com') }}</p>

    <!-- 身分證: A123456789 (自動轉大寫) -->
    <p>ID: {{ formatTaiwanId('a123456789') }}</p>

    <!-- 截斷: 這是一段很長... -->
    <p>摘要: {{ truncate('這是一段很長很長的文章內容', 6) }}</p>
  </div>
</template>
```

---

## 4. 小結

| 分類     | 常用函式         | 範例結果        |
| :------- | :--------------- | :-------------- |
| **金額** | `formatCurrency` | NT$ 1,000       |
| **日期** | `formatDate`     | 2023-12-25      |
| **相對** | `formatRelative` | 剛剛            |
| **遮罩** | `maskPhone`      | 0912-\*\*\*-789 |
| **檔案** | `formatFileSize` | 2.5 MB          |

---

[上一課:檔案上傳實戰](./lesson-15.md) | [下一課:資料列表與分頁](./lesson-17.md) | [回首頁](../../README.md)
