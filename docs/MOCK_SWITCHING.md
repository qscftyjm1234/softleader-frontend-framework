# Mock API 切換指南

## 🎯 快速切換

你可以隨時在 **Mock API** 和 **真實 API** 之間切換，只需要修改一個環境變數！

## 📝 切換方式

### 方式 1：使用 Mock API（假資料）

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

**效果**：

- ✅ 所有 API 請求返回假資料
- ✅ 不需要後端伺服器
- ✅ 可以模擬網路延遲
- ✅ Console 會顯示：`Mock API 攔截: /api/users`

**適用場景**：

- 開發環境（前端獨立開發）
- Demo 模式（展示給客戶看）
- 後端還沒完成

---

### 方式 2：使用真實 API

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

**效果**：

- ✅ 所有 API 請求發送到真實後端
- ✅ 使用真實資料
- ✅ Console 不會顯示 Mock 攔截訊息

**適用場景**：

- 測試環境（測試真實 API）
- 正式環境（正常使用）
- 後端已完成

---

## 🔄 實際操作步驟

### 從 Mock 切換到真實 API

1. **修改 `.env` 檔案**：

   ```bash
   # 改這一行
   NUXT_PUBLIC_FEATURE_API_MOCK=false

   # 設定真實 API URL
   NUXT_PUBLIC_API_BASE_URL=https://your-api-url.com
   ```

2. **重啟開發伺服器**：

   ```bash
   # 停止目前的伺服器 (Ctrl+C)
   # 重新啟動
   npm run dev
   ```

3. **驗證**：
   - 打開瀏覽器 Console
   - 應該**看不到** `Mock API 攔截` 訊息
   - Network 面板應該看到真實的 API 請求

---

### 從真實 API 切換到 Mock

1. **修改 `.env` 檔案**：

   ```bash
   # 改這一行
   NUXT_PUBLIC_FEATURE_API_MOCK=true

   # 設定延遲時間（可選）
   NUXT_PUBLIC_MOCK_DELAY=500
   ```

2. **重啟開發伺服器**：

   ```bash
   npm run dev
   ```

3. **驗證**：
   - 打開瀏覽器 Console
   - 應該**看到** `Mock API 攔截: /api/users`
   - 看到假資料

---

## 💡 常見使用情境

### 情境 1：本地開發（後端還沒做）

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=500
```

### 情境 2：本地開發（連接測試環境後端）

```bash
# .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://test-api.yourapp.com
```

### 情境 3：部署到測試站（Demo 模式）

```bash
# 測試站 .env
NUXT_PUBLIC_FEATURE_API_MOCK=true
NUXT_PUBLIC_MOCK_DELAY=300
```

### 情境 4：部署到測試站（測試真實 API）

```bash
# 測試站 .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://test-api.yourapp.com
```

### 情境 5：部署到正式站

```bash
# 正式站 .env
NUXT_PUBLIC_FEATURE_API_MOCK=false
NUXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

---

## 🎨 進階：部分 API 用 Mock，部分用真實

如果你想要某些 API 用 Mock，某些用真實 API，可以修改 `utils/api/interceptors/mock.ts`：

```typescript
export async function checkMockData(url: string, options: any): Promise<any> {
  const config = useRuntimeConfig()

  // 只有啟用 Mock 才攔截
  if (config.public.featureApiMock !== 'true') {
    return null // 全部使用真實 API
  }

  // 🎯 選擇性攔截

  // User API 用 Mock
  if (url.includes('/api/users')) {
    console.log('Mock API 攔截:', url)
    await delay(500)
    return getMockDataByUrl(url, options)
  }

  // Order API 用真實 API（不攔截）
  if (url.includes('/api/orders')) {
    return null // 讓它發送真實請求
  }

  // 其他 API 用 Mock
  console.log('Mock API 攔截:', url)
  await delay(500)
  return getMockDataByUrl(url, options)
}
```

---

## 🔍 如何確認目前使用哪種模式？

### 方法 1：檢查 Console

**Mock 模式**：

```
Mock API 攔截: /api/users
Mock API 攔截: /api/orders
```

**真實 API 模式**：

```
（沒有 Mock 攔截訊息）
```

### 方法 2：檢查 Network 面板

**Mock 模式**：

- Network 面板**看不到**請求（因為在應用層攔截）

**真實 API 模式**：

- Network 面板**看得到**請求

### 方法 3：檢查環境變數

在任何組件或 composable 中：

```typescript
const config = useRuntimeConfig()
console.log('Mock 啟用:', config.public.featureApiMock)
```

---

## ⚠️ 注意事項

### 1. 修改 `.env` 後要重啟

環境變數在啟動時載入，修改後**必須重啟**開發伺服器才會生效。

```bash
# 停止 (Ctrl+C)
# 重新啟動
npm run dev
```

### 2. 不同環境使用不同的 `.env` 檔案

```
.env.development  → 開發環境
.env.staging      → 測試環境
.env.production   → 正式環境
```

### 3. Mock 資料和真實資料的結構要一致

確保 Mock 資料的結構和真實 API 返回的結構一致，這樣切換時才不會出錯。

---

## 🎉 總結

切換 Mock 和真實 API 超級簡單：

1. **修改 `.env`**：
   - `NUXT_PUBLIC_FEATURE_API_MOCK=true` → Mock
   - `NUXT_PUBLIC_FEATURE_API_MOCK=false` → 真實 API

2. **重啟伺服器**：

   ```bash
   npm run dev
   ```

3. **完成！** 🎊

就這麼簡單！一個環境變數就能完全控制！
