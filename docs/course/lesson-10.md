<!-- Author: cindy -->

# 第十課:資安與權限控管

本課程教您如何啟用專案內建的 **UI 資安防護模組**，保護系統資料安全。

## 1. UI 資安防護模組 (Security Plugin)

專案內建了一套強大的前端防護機制，包含防截圖、防錄影、浮水印等功能。

### 如何啟用

在 `.env` 檔案中設定：

```ini
# 啟用資安防護模式
NUXT_PUBLIC_ENABLE_SECURITY_MODE=true
```

### 防護功能一覽

啟用後，系統會自動執行以下防護：

1.  **防截圖/錄影**: 偵測 PrintScreen 或截圖行為時，自動模糊畫面。
2.  **閒置模糊**: 使用者太久沒動作時，自動模糊畫面保護隱私。
3.  **禁用開發者工具**: 阻擋 F12、Ctrl+Shift+I 等快捷鍵。
4.  **禁用右鍵/複製**: 防止輕易複製文字或圖片。
5.  **浮水印**: (需配合 `useWatermark` 使用)。

---

## 2. 數位浮水印 (Watermark)

使用 `useWatermark` 在頁面上壓上使用者資訊，防止資料外流時無法追溯。

### 使用方式

在 `app.vue` 或 `layouts/default.vue` 中全域使用：

```vue
<script setup lang="ts">
const { showWatermark } = useWatermark()
const { user } = useAuthStore() // 假設有 user store

onMounted(() => {
  if (user.isLoggedIn) {
    showWatermark({
      text: `${user.name} (${user.empId})`,
      color: 'rgba(0, 0, 0, 0.05)' // 淺色浮水印
    })
  }
})
</script>
```

### 參數說明

| 參數     | 說明     | 預設值           |
| :------- | :------- | :--------------- |
| `text`   | 顯示文字 | 當前時間         |
| `color`  | 文字顏色 | rgba(0,0,0,0.06) |
| `rotate` | 旋轉角度 | -25              |
| `gapX`   | 水平間距 | 180              |

---

## 3. 功能權限控制 (Permissions)

處理按鈕或頁面的存取權限。

### 使用 usePermission

```vue
<script setup lang="ts">
const { hasPermission } = usePermission()
</script>

<template>
  <!-- 只有主管能看到刪除按鈕 -->
  <IButton
    v-if="hasPermission('DELETE_USER')"
    color="error"
  >
    刪除使用者
  </IButton>
</template>
```

---

## 4. 小結

1.  **啟用防護**: 設定 `NUXT_PUBLIC_ENABLE_SECURITY_MODE=true`。
2.  **浮水印**: 使用 `showWatermark({ text: 'User Name' })`。
3.  **權限**: 使用 `hasPermission('CODE')` 控制按鈕。

---

[上一課:Git 提交與工作流](./lesson-9.md) | [下一課:環境變數設定](./lesson-11.md) | [回首頁](../../README.md)
