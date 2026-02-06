<!-- Author: cindy -->

# 第九課:Git 提交與工作流

本課程教您如何使用 Git 提交程式碼,並遵循專案的提交規範。

## 1. Conventional Commits 格式

本專案使用 Conventional Commits 格式來撰寫提交訊息。

### 基本格式

```
<類型>(<範圍>): <簡短描述>

<詳細說明>
```

### 範例

```
feat(user): 新增使用者列表頁面

- 實作使用者查詢功能
- 加入分頁功能
- 整合 MOCK 資料
```

---

## 2. 使用 Commitizen

專案已經設定好 Commitizen,可以用互動式介面來建立提交訊息。

### 如何使用

1. 先將檔案加入暫存區:

```bash
git add .
```

2. 使用 Commitizen 提交:

```bash
npm run commit
```

3. 依照提示選擇:
   - 提交類型 (feat, fix, docs 等)
   - 影響範圍 (user, api, ui 等)
   - 簡短描述
   - 詳細說明 (可選)

---

## 3. 提交類型

### feat (新功能)

新增功能時使用:

```
feat(user): 新增使用者編輯功能
feat(api): 新增商品查詢 API
```

### fix (修復)

修復 Bug 時使用:

```
fix(login): 修正登入失敗的問題
fix(table): 修復分頁顯示錯誤
```

### docs (文件)

更新文件時使用:

```
docs(readme): 更新安裝說明
docs(api): 補充 API 使用範例
```

### style (格式)

調整程式碼格式 (不影響功能):

```
style(user): 調整程式碼縮排
style: 移除多餘空白
```

### refactor (重構)

重構程式碼 (不新增功能也不修 Bug):

```
refactor(api): 重構 API 呼叫邏輯
refactor(utils): 簡化日期格式化函式
```

### test (測試)

新增或修改測試:

```
test(user): 新增使用者列表測試
test(api): 補充 API 錯誤處理測試
```

### chore (雜項)

其他不影響程式碼的修改:

```
chore: 更新套件版本
chore(deps): 升級 Vue 到 3.4
```

---

## 4. 實際範例

### 範例 1: 新增功能

```bash
# 1. 修改檔案
# 2. 加入暫存區
git add pages/users/list.vue

# 3. 提交
npm run commit

# 選擇:
# - Type: feat
# - Scope: user
# - Subject: 新增使用者列表頁面
# - Body: 實作使用者查詢和分頁功能
```

### 範例 2: 修復 Bug

```bash
git add components/IButton.vue
npm run commit

# 選擇:
# - Type: fix
# - Scope: ui
# - Subject: 修正按鈕 loading 狀態
# - Body: 修復按鈕在 loading 時仍可點擊的問題
```

### 範例 3: 更新文件

```bash
git add docs/course/lesson-6.md
npm run commit

# 選擇:
# - Type: docs
# - Scope: course
# - Subject: 更新 API 串接課程
# - Body: 改用 Repository 模式說明
```

---

## 5. 提交範圍建議

### 功能模組

- `user` - 使用者相關
- `product` - 商品相關
- `order` - 訂單相關
- `auth` - 認證相關

### 技術層面

- `api` - API 相關
- `ui` - UI 組件
- `utils` - 工具函式
- `store` - 狀態管理

### 其他

- `docs` - 文件
- `test` - 測試
- `config` - 設定檔

---

## 6. 好的提交訊息

### ✅ 好的範例

```
feat(user): 新增使用者搜尋功能

- 實作即時搜尋
- 加入防抖處理
- 整合 useOptions 模組
```

```
fix(api): 修正分頁參數錯誤

修復 API 呼叫時 page 參數從 0 開始的問題,
改為從 1 開始以符合後端規格。
```

### ❌ 不好的範例

```
update
```

```
修改一些東西
```

```
WIP
```

---

## 7. 常見實戰問題與解決

### 1. 提交訊息寫錯了 (Amend)

如果不小心打錯字，或漏了檔案:

```bash
git add .                  # 如果有漏檔案，先 add
git commit --amend        # 修改上一次提交
```

### 2. 進度暫存 (Stash)

寫到一半需要切換分支修 Bug，但不想提交目前的半成品:

```bash
git stash                 # 暫存目前進度
git checkout fix/login    # 去修 Bug
# ... 修完回來 ...
git checkout feature/user
git stash pop             # 取回暫存進度
```

### 3. 取消上一次提交 (Reset)

提交後發現完全做錯了，想退回提交前的狀態 (檔案保留):

```bash
# 情境 A: 還沒 Push (只是 Local Commit)
git reset HEAD~1          # 退回上一個版本 (檔案保留在工作區)
```

**情境 B: 已經 Push 出去了 (Remote Commit)**

> ❌ **絕對不能用 reset**，因為會改變歷史紀錄，影響其他人。

請改用 `revert`，它會產生一個「反向操作」的新 commit：

```bash
git revert HEAD           # 產生一個新的 commit 來抵銷最後一次 commit
git push origin main      # 推送還原紀錄
```

### 4. 放棄檔案修改 (Checkout/Restore)

改壞了，想還原某個檔案到原始狀態:

```bash
git checkout -- pages/index.vue
# 或新版 Git
git restore pages/index.vue
```

### 5. 解決衝突 (Conflict)

`git merge` 或 `git rebase` 時發生衝突:

1. 打開衝突檔案，會看到 `<<<<<<<`, `=======`, `>>>>>>>`
2. 決定要保留哪部分程式碼，刪除標記符號
3. 存檔後加入暫存區:
   ```bash
   git add .
   ```
4. 繼續合併/Rebase:
   ```bash
   git commit            # 如果是 merge
   git rebase --continue # 如果是 rebase
   ```

### 6. 強制提交 (略過檢查)

有時候 commit 檢查 (如 Lint) 太嚴格，緊急情況下需要略過:

```bash
git commit -m "fix: urgent fix" --no-verify
# 或簡寫
git commit -m "fix: urgent fix" -n
```

> **注意**: 除非必要，否則不建議使用，因為會繞過程式碼品質檢查。

---

## 8. 小結

1. **使用 Commitizen**: `npm run commit`
2. **選擇類型**: feat, fix, docs, style, refactor, test, chore
3. **填寫範圍**: user, api, ui 等
4. **簡短描述**: 清楚說明做了什麼
5. **詳細說明**: 補充重要資訊 (可選)

---

[上一課:全域狀態管理](./lesson-8.md) | [下一課:資安與權限控管](./lesson-10.md) | [回首頁](../../README.md)
