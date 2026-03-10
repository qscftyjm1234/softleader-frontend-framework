<!-- Author: antigravity -->

# 第六課：UI 框架介紹與實戰 (Ant Design Vue)

本課程介紹專案如何整合 Ant Design Vue 組件庫。我們會教您如何利用這套強大的企業級 UI 框架，快速架設出專業的管理系統介面。

---

## 1. 了解核心工具

本專案深度整合了 Ant Design Vue，這是一套專為大型後台系統設計的組件庫。

一
組件豐富
提供從按鈕、輸入框到複雜表格與樹狀選單的全方位支援。
二
一致性
確保全系統的輸入規範、顏色與交互行為完全統一。

---

## 2. 建立實戰介面

我們透過一個包含多種組件的「資訊摘要卡片」，讓您熟悉基本語法與樣式控制。

(1.) 在 `pages/` 下建立 `antd-demo.vue` 檔案。

---

## 3. 貼入完整程式碼

這裡示範了如何使用卡片（a-card）、列印（a-row / a-col）以及漂亮的統計數據。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-black text-slate-900 mb-8 px-2">業務數據概覽</h1>

      <a-row :gutter="[24, 24]">
        <!-- 核心指標 1 -->
        <a-col :span="8">
          <a-card
            :bordered="false"
            class="rounded-[2rem] shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <template #title>
              <div class="flex items-center gap-2 py-1">
                <IIcon
                  icon="mdi-account-group"
                  size="20"
                  class="text-blue-500"
                />
                <span class="font-black text-slate-700">總體用戶量</span>
              </div>
            </template>
            <div class="py-2">
              <div class="text-4xl font-black text-slate-900 mb-2">1,280,000</div>
              <div class="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <IIcon
                  icon="mdi-trending-up"
                  size="14"
                />
                較昨日增長 12.5%
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 核心指標 2 -->
        <a-col :span="8">
          <a-card
            :bordered="false"
            class="rounded-[2rem] shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <template #title>
              <div class="flex items-center gap-2 py-1">
                <IIcon
                  icon="mdi-currency-usd"
                  size="20"
                  class="text-emerald-500"
                />
                <span class="font-black text-slate-700">當月應收總額</span>
              </div>
            </template>
            <div class="py-2">
              <div class="text-4xl font-black text-slate-900 mb-2">NT$ 42.5M</div>
              <div class="text-xs font-bold text-blue-500 flex items-center gap-1">
                <IIcon
                  icon="mdi-clock-outline"
                  size="14"
                />
                更新於 3 分鐘前
              </div>
            </div>
          </a-card>
        </a-col>

        <!-- 核心指標 3 -->
        <a-col :span="8">
          <a-card
            :bordered="false"
            class="rounded-[2rem] shadow-sm hover:shadow-md transition-all overflow-hidden"
          >
            <template #title>
              <div class="flex items-center gap-2 py-1">
                <IIcon
                  icon="mdi-alert-circle-outline"
                  size="20"
                  class="text-orange-500"
                />
                <span class="font-black text-slate-700">待處理異常</span>
              </div>
            </template>
            <div class="py-2">
              <div class="text-4xl font-black text-slate-900 mb-2">15</div>
              <div class="text-xs font-bold text-slate-400">目前運作狀態正常</div>
            </div>
          </a-card>
        </a-col>
      </a-row>

      <!-- 額外操作 -->
      <div class="mt-10 flex gap-4 px-2">
        <a-button
          type="primary"
          size="large"
          class="rounded-xl font-bold h-12 px-8"
        >
          匯出分析報告
        </a-button>
        <a-button
          size="large"
          class="rounded-xl font-bold h-12 px-8"
        >
          查看詳細歷史
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Ant Design 實戰',
  layout: 'portal'
})
</script>
```

---

## 4. 小結

一
所有的 Ant Design Vue 組件都以 `a-` 開頭，例如 `a-button`、`a-card`。
二
使用 `:gutter` 屬性可以輕鬆控制組件之間的間距。
三
組件通常支援插槽（Slot），例如 `#title`，能讓您自由置入圖示或自訂標題。

---

## 5. 延伸資源

一
[Ant Design Vue 官方文件](https://antdv.com/)
二
[Tailwind CSS 樣式指南](https://tailwindcss.com/)

---

[上一課 第五課：環境變數設定](./lesson-5.md) | [下一課 第七課：UI 組件開發規範](./lesson-7.md) | [回首頁](../../README.md)
