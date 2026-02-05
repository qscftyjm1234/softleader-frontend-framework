[← 返回 README.md](../../README.md)

# 套件管理與離線部署政策

## 1. 政策目標

本文件旨在規範專案在 **受限網路環境** (Restricted Network) 或 **高度資安管控環境** (Air-gapped Environment) 下的套件管理與部署流程，確保交付的一致性與安全性。

---

## 2. 版本鎖定機制

為了防止不同時間點安裝得到不同版本的套件，本專案採取 **嚴格版本鎖定** 策略。

### 規範

1.  **移除版本前綴**：`package.json` 中的所有依賴版本號皆已移除 `^` (caret) 或 `~` (tilde) 前綴。
    - ✅ 正確：`"nuxt": "3.15.2"`
    - ❌ 錯誤：`"nuxt": "^3.15.2"`
2.  **鎖定檔案 (Lockfile)**：必須提交 `package-lock.json` 或 `pnpm-lock.yaml` 至版本控制系統。
3.  **CI/CD 強制檢查**：CI 流程應使用 `npm ci` (Clean Install) 而非 `npm install`，確保完全依照 Lockfile 安裝。

---

## 3. 離線環境部署

針對無法連接外網的甲方環境，提供以下三種交付方案：

### 方案 A：完整打包 ⭐ 推薦

由乙方在乾淨的 CI 環境中完成安裝與建置，將 `node_modules` 或建置產物打包交付。

**交付內容：**

- `.output/` (如果是生產環境部署)
- `node_modules/` (如果需要執行時依賴)
- `package.json`
- `.env.production`

**優點**：甲方完全不需要執行 `npm install`，零外部依賴。
**缺點**：壓縮檔體積較大。

### 方案 B：離線 Tarball 安裝

預先下載所有依賴的 `.tgz` 檔案，建立本地 Registry。

1. **建立本地包**：
   ```bash
   npm pack [package-name]
   # 或使用 npm-offline-pack 工具
   ```
2. **交付**：將所有 `.tgz` 檔與專案原始碼一起交付。
3. **安裝**：
   ```bash
   npm install --offline --no-audit
   ```
   (需配合 `.npmrc` 指向本地目錄)

### 方案 C：私有 Registry 代理

若甲方有內網的 Nexus / Verdaccio：

1. 請甲方 IT 將專案依賴 (參見 `package.json`) 加入 Allowlist。
2. 設定 `.npmrc` 指向甲方私有 Registry。
3. 執行 `npm install`。

---

## 4. 新增套件審核流程

為了控制依賴數量與安全性，新增套件需經過以下流程：

1.  **提出需求**：開發者說明為何需要此套件？是否有原生方案可替代？
2.  **安全性檢查**：
    - 檢查 Weekly Downloads (需 > 10k)
    - 檢查 Last Publish (需在 1 年內)
    - 檢查 License (必須是 MIT, ISC, Apache-2.0, BSD)
    - 使用 `npm audit` 檢查已知漏洞
3.  **甲方審核 (如適用)**：若合約規定，需提交套件清單供甲方資安團隊審核。
4.  **鎖定版本**：安裝時必須使用 `--save-exact` 參數 (或是手動移除 `^`)。

---

## 5. 常見問題

### Q: 為什麼不使用 CDN？

A: 內網環境通常無法存取 CDN，且 CDN 版本變動不可控，故所有資源皆需本地化。

### Q: 發現安全性漏洞怎麼辦？

A:

1. 根據 `npm audit` 報告評估影響範圍。
2. 鎖定修復後的特定版本 (例如由 `1.2.3` 升級至 `1.2.4`)。
3. 重新打包交付給甲方。
