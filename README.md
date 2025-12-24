# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Git Workflow (Commit 規範)

本專案採用 **Conventional Commits** 規範，並設有 Husky 與 Commitlint 檢查。
為了方便產生符合規範的 Commit Message，請使用以下指令：

```bash
pnpm commit
```

執行後會出現互動式選單，請依序選擇或輸入：

1.  **Select the type of change**: 選擇變更類型 (如 `feat` 新功能, `fix` 修補錯誤, `docs` 文件修改等)。
2.  **What is the scope of this change**: 輸入影響範圍 (例如 `auth`, `components`, `readme`，可留空)。
3.  **Write a short, imperative tense description**: 輸入簡短描述 (必填)。
4.  **Provide a longer description**: 輸入詳細描述 (選填)。
5.  **Are there any breaking changes?**: 是否有破壞性變更 (通常選 No)。
6.  **Does this change affect any open issues?**: 是否關聯 Issue (通常選 No)。

完成後會自動產生 Commit 並執行檢查。

## 程式碼註解規範

本專案採用嚴格的註解規範，確保程式碼可維護性與可讀性。

### 必要規範

1. **所有 exported 函式必須包含 JSDoc 註解**
2. **使用標準標籤標記特殊註解**（TODO, FIXME, HACK, NOTE 等）
3. **商業邏輯變更必須記錄版本與時間**

### 標籤格式

```javascript
// TODO: [作者] 待辦事項說明 (YYYY-MM-DD)
// FIXME: [作者] 需要修復的問題 (YYYY-MM-DD)
// HACK: [作者] 臨時解決方案 (YYYY-MM-DD)
// NOTE: [作者] 重要說明 (YYYY-MM-DD)
```

### JSDoc 範例

```javascript
/**
 * 函式功能說明
 *
 * @param {type} paramName - 參數說明
 * @returns {type} 回傳值說明
 * @author 作者名稱
 * @since YYYY-MM-DD
 * @version 版本號
 */
```

### 詳細文件

完整的註解規範請參考：

- [註解規範文件](./docs/comment-guidelines.md)
- [註解範例](./docs/comment-examples.js)

### VSCode 擴充套件

建議安裝以下擴充套件以獲得更好的註解體驗：

- **Better Comments** - 為不同標籤提供顏色標記
- **TODO Highlight** - 高亮顯示 TODO/FIXME 等標籤

## Tooling

### Formatting

```bash
# Check format
pnpm run format

# Fix format
pnpm run format:write
```

### E2E Testing

```bash
npx playwright test --ui
```
