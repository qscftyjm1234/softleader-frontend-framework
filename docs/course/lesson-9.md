<!-- Author: antigravity -->

# 第九課：資料格式化工具

本課程教您如何使用專案內建的格式化工具來處理常見的資料顯示需求，例如千分位金額、日期格式以及隱私遮罩。

---

## 1. 準備格式化測試頁面

我們建立一個頁面來展示各種格式化工具的使用效果。

(1.) 在 `pages/` 資料夾下建立 `format-demo.vue`。
(2.) 準備好要測試的原始資料。

---

## 2. 引入完整程式碼

這裡展示了如何使用 `useFormatter` 與 `useDateTime` 勾子來美化資料呈現。

(3.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div class="max-w-xl w-full bg-white border border-slate-100 p-12 rounded-[3rem] shadow-sm">
      <h1 class="text-3xl font-black text-slate-900 mb-8 px-2 tracking-tight">資料美化與格式化</h1>

      <div class="space-y-6">
        <!-- 金額與數字 -->
        <div class="p-6 bg-blue-50/50 border border-blue-100/50 rounded-2xl">
          <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">
            財務金額展示
          </p>
          <div class="flex justify-between items-end">
            <span class="text-slate-500 font-bold">訂單總加：</span>
            <span class="text-2xl font-black text-blue-600">{{ formatCurrency(1234567.89) }}</span>
          </div>
        </div>

        <!-- 日期與時間 -->
        <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            時間紀錄
          </p>
          <div class="flex justify-between items-center text-sm">
            <span class="text-slate-500 font-bold">更新時間：</span>
            <span class="text-slate-900 font-black">{{ formatDateTime(new Date()) }}</span>
          </div>
        </div>

        <!-- 隱私遮罩 -->
        <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
            隱私資訊保護
          </p>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500 font-bold">聯絡手機：</span>
              <span class="text-slate-900 font-black">{{ maskPhone('0912345678') }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500 font-bold">電子郵件：</span>
              <span class="text-slate-900 font-black">
                {{ maskEmail('antigravity@example.com') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入格式化工具勾子
const { formatCurrency, maskPhone, maskEmail } = useFormatter()
const { formatDateTime } = useDateTime()

definePageMeta({
  title: '格式化功能展示',
  layout: 'portal'
})
</script>
```

---

## 3. 小結

一
使用 `useFormatter` 可以處理大部分的金額與遮罩需求。
二
日期處理則統一交給 `useDateTime`，它底層整合了高效的處理邏輯。
三
在呈現機密個資時，務必先經過遮罩處理再將資料渲染到畫面上。

---

[上一課 第八課：客製化圖示系統](./lesson-8.md) | [下一課 第十課：API 串接與資料層](./lesson-10.md) | [回首頁](../../README.md)
