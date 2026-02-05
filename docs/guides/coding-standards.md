[← 返回 README.md](../../README.md)

# 開發與發布指引 (Development Guidelines)

本文件說明如何在本專案中保持「程式碼整潔」，同時維護完整的「修改歷史」與「自動化文件」。

## 1. 程式碼註解規範 (Code Comments)

**原則：程式碼是給電腦看的，註解是給人看的。**
**禁止：不要在程式碼中寫「修改歷史」或「修改人」。**

### 好的做法 (Do)

- 使用 **JSDoc** 描述 API、函式參數與回傳值 (ESLint 會強制檢查)。
- 註解解釋 **"Why"** (為什麼要這樣寫)，特別是複雜邏輯或特殊 Workaround。
- 針對重大架構變更，使用 `@see` 連結到 Changelog。

```typescript
/**
 * 計算用戶稅率
 * @param income - 用戶年收入
 * @returns 稅率 (0-1)
 *
 * @see {@link ../CHANGELOG.md#1.2.0} - v1.2.0 因應 2024 法規調整級距
 */
function calculateTax(income: number): number {
  // 因為舊系統精度問題，這裡必須先轉字串再轉數字
  return Number(String(income)) * 0.05
}
```

### 壞的做法 (Don't)

- 不要寫修改人與日期 (Git 已經有紀錄了)。
- 不要保留被註解掉的舊程式碼 (Dead Code)。

```typescript
// 2024-12-24 Gino: 改成 0.05
// function calculateTax(income) { return income * 0.03 } <-- 刪掉它！
function calculateTax(income: number): number { ... }
```

---

## 2. 歷史追溯與查詢 (Traceability)

我們使用雙層機制來追蹤修改歷史：

### 第一層：日常查詢 (GitLens)

我們強烈建議安裝 VS Code **GitLens** 擴充套件。

- **功能**：每一行程式碼後面會自動顯示最後修改的 Commit 資訊。
- **用法**：滑鼠懸停在該行，即可看到完整的 Commit Message 和修改原因。

### 第二層：重大變更 (Changelog Link)

對於需要特別說明的重大變更，請在 JSDoc 中加入連結：

- 使用 `@see {@link ../CHANGELOG.md#版本號}`
- 在 VS Code 中按住 `Ctrl` (或 `Cmd`) + 點擊連結，即可直接開啟 Changelog 並跳轉到該版本說明。

---

## 3. 自動化版本發布 (Release Workflow)

本專案使用 `standard-version` 自動化發布流程。

### 什麼時候執行？

當你完成了幾個功能 (feat) 或修復 (fix)，準備發布新版本時。

### 如何執行？

在終端機輸入：

```bash
npm run release
```

### 這個指令會自動做什麼？

1. **升級版本號**：根據你的 Commit 內容，自動判斷是升級大版號、小版號還是修訂號 (Semantic Versioning)。
   - `feat` -> `1.1.0` (Minor)
   - `fix` -> `1.0.1` (Patch)
   - `BREAKING CHANGE` -> `2.0.0` (Major)
2. **產生/更新 CHANGELOG.md**：自動抓取 Git Commit，產生繁體中文的修改日誌。
3. **建立 Git Tag**：例如 `v1.1.0`。

### 執行後該做什麼？

```bash
git push --follow-tags origin main
```

將產生的 Tag 和 Changelog 推送到遠端。

---

## 4. Commit 規範 (Commit Convention)

為了讓自動化工具運作，我們必須遵守 Commit 規範。
請使用 `npm run commit` 來提交程式碼，它會引導你完成標準格式：

- **feat**: 新功能
- **fix**: 錯誤修復
- **docs**: 文件修改
- **style**: 代碼格式 (不影響邏輯)
- **refactor**: 重構 (既不是新功能也不是修Bug)
- **perf**: 效能優化
- **test**: 增加測試
- **chore**: 建置過程或輔助工具的變動
