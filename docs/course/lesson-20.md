<!-- Author: antigravity -->

# 第二十課：UI 資安防護實戰

本課程介紹如何啟用系統內建的 **UI 資安防護機制**。這套方案專注於防止前端資料外洩（如截圖、錄影、複製），並不涉及後端權限控管（ACL/RBAC）。

### 這套 UI 防護做了什麼？

當您啟用資安模式後，系統會自動啟動以下防護：

1. **禁用右鍵與複製**：防止使用者直接選取或複製網頁文字與圖片。
2. **阻擋開發者工具 (F12)**：偵測並嘗試關閉或阻擋 F12、Ctrl+Shift+I 等調整檢視。
3. **螢幕截圖偵測與模糊**：當偵測到 PrintScreen 或截圖快捷鍵時，立即將畫面模糊化並清空剪貼簿。
4. **視窗失焦保護**：當使用者切換視窗或縮小瀏覽器時，自動模糊內容，防止側錄。
5. **閒置自動鎖定**：長時間未操作時自動進入模糊狀態，需點擊才可繼續使用。
6. **數位浮水印 (Watermark)**：在背景渲染動態文字，即使被手機翻拍也能追蹤洩漏來源。

---

## 1. 啟用全域資安模式

您不需要撰寫複雜的邏輯，只需在設定檔中開啟開關即可啟用全方位的保護。

(1.) 開啟專案根目錄下的 `.env.development` 檔案。
(2.) 貼入或修改以下設定：

```ini
# 啟用全域資安防護
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true
```

> [!IMPORTANT]
> **環境變數生效時機**：修改 `.env` 相關檔案後，Nuxt 的熱重載 (Hot Reload) 可能無法完全捕捉變更。請務必手動在終端機按下 `Ctrl + C` 結束目前的 `npm run dev` 並**重新啟動**，以確保設定正確套用。

---

## 2. 實作數位浮水印

為了追蹤可能的資訊外流，我們建議在敏感頁面加上使用者的數位浮水印。

(1.) 在 `pages/` 資料夾下建立 `security-demo.vue`。
(2.) 貼入以下完整程式碼：

```vue
<template>
  <div class="p-10 min-h-screen bg-slate-50 flex items-center justify-center">
    <div
      class="max-w-2xl w-full bg-white border border-slate-100 p-12 rounded-[3rem] shadow-sm relative overflow-hidden"
    >
      <!-- 裝飾背景 -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50"
      ></div>

      <div class="relative z-10">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
        >
          <IIcon
            icon="mdi-shield-check"
            size="14"
          />
          高度機密資料
        </div>

        <h1 class="text-4xl font-black text-slate-900 mb-6 tracking-tight">機密客戶報表</h1>

        <div class="space-y-4 mb-10">
          <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <p class="text-slate-600 leading-relaxed font-bold">
              這是一份包含敏感個資的報表範例。當資安模式開啟時，系統會自動阻擋 F12
              開發者工具與右鍵選單。
            </p>
          </div>
        </div>

        <button
          @click="toggleWatermark"
          class="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
        >
          {{ showWatermark ? '隱藏數位浮水印' : '顯示數位浮水印' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 引入資安相關勾子
const { toggle, showWatermark } = useWatermark()

function toggleWatermark() {
  if (showWatermark.value) {
    toggle(false)
  } else {
    // 模擬帶入當前使用者名稱與日期
    toggle(true, {
      text: 'ANTIGRAVITY 2026-02-26 SECRET',
      color: 'rgba(0, 0, 0, 0.03)'
    })
  }
}

definePageMeta({
  title: '資安防護展示',
  layout: 'portal'
})
</script>
```

---

## 3. 小結

一
透過 `.env` 即可一鍵開啟「防截圖、防錄影、禁用 F12」等全域防護功能。
二
數位浮水印（Watermark）是保護機密資料不被手機翻拍的最後一道防線。
三
在開發模式下，建議暫時關閉此功能，以免影響偵錯效率。

---

[上一課 第十九課：檔案下載與匯出](./lesson-19.md) | [下一課 第二十一課：常見問題排解](./lesson-21.md) | [回首頁](../../README.md)
