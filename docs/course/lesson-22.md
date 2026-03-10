<!-- Author: antigravity -->

# 第二十二課：Git 提交與工作流

本課程教您如何正確地提交程式碼。我們要求所有開發者遵循標準的提交格式，這有助於自動化產生版本紀錄與追蹤問題。

---

## 1. 了解提交格式

所有的提交訊息都應具備明確的類型（Type）與範圍（Scope）。

一
`feat`：新增功能。
二
`fix`：修復臭蟲。
三
`docs`：文件更新。
四
`style`：格式調整。

---

## 2. 使用輔助工具

專案已經內建了互動式提交工具，您不必死背格式。

(1.) 打開終端機。
(2.) 先將您的變更加入暫存區：`git add .`。
(3.) 執行指令：`npm run commit`。

---

## 3. 實戰提交範例

執行指令後，您會看到互動式介面，請按照以下邏輯操作。

(1.) 選擇類型：例如 `feat (新功能)`。
(2.) 輸入範圍：例如 `user` 或 `ui`。
(3.) 填寫主旨：簡單說明您做了什麼。

```bash
# 終端機的操作流程
git add .
npm run commit

# 接下來在畫面中選擇
# ? Select the type of change: feat: A new feature
# ? What is the scope of this change: auth
# ? Write a short description: 實作登入頁面與驗證邏輯
```

---

## 4. 小結

一
嚴格禁止使用「update」或「fix」這種模糊不清的提交訊息。
二
使用 `npm run commit` 可以保證格式完全正確。
三
正確的提交紀錄能讓團隊協作更加順暢。

---

```vue
<script setup lang="ts">
definePageMeta({
  title: '資料列表範例',
  layout: 'portal'
})
</script>
```

---

[上一課 第二十一課：常見問題排解](./lesson-21.md) | [回首頁](../../README.md)
