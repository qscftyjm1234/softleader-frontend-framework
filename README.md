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
