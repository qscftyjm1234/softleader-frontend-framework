<script setup lang="ts">
// 設定頁面 Meta 資訊，用於生成路由與選單
definePageMeta({
  title: 'Showcase 首頁', // 頁面標題
  icon: 'mdi-view-dashboard' // 頁面圖示 (注意：Icon 系統可能需要調整，暫保留字串)
})
</script>

<template>
  <div class="showcase-container">
    <header class="showcase-header">
      <h1 class="title">Showcase 模組</h1>
      <p class="description">
        歡迎來到開發展示區。這裡主要用於展示各模組的 **資料結構 (Data Structures)** 與 **輸出成果
        (Outputs)**，幫助新進開發者快速理解系統運作。
      </p>
    </header>

    <div class="showcase-grid">
      <!-- 導航卡片：前往資料檢視器 -->
      <router-link
        to="/showcase/data-inspector"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">🔍</span>
          資料檢視器 (Data Inspector)
        </div>
        <div class="card-text">
          查看各模組 (Auth, Insurance, Product) 的 Mock Data 與 JSON 輸出格式。
        </div>
      </router-link>

      <!-- 導航卡片：前往選項系統 -->
      <router-link
        to="/showcase/options"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📋</span>
          選項系統 (Options)
        </div>
        <div class="card-text">
          展示集中管理的選項數據 (如性別、狀態) 及其輔助方法 (findByValue, excludes 等)。
        </div>
      </router-link>

      <!-- 導航卡片：前往檔案上傳 -->
      <router-link
        to="/showcase/file-upload"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📤</span>
          檔案上傳 (File Upload)
        </div>
        <div class="card-text">展示檔案上傳介面與預覽功能，支援拖放、驗證與進度追蹤。</div>
      </router-link>

      <!-- 導航卡片：前往檔案下載 -->
      <router-link
        to="/showcase/file-download"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">💾</span>
          檔案下載 (File Download)
        </div>
        <div class="card-text">展示檔案下載功能，支援 PDF、Excel、圖片等多種檔案類型。</div>
      </router-link>

      <!-- 導航卡片：前往日期時間 -->
      <router-link
        to="/showcase/datetime"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📅</span>
          日期時間 (DateTime)
        </div>
        <div class="card-text">展示日期時間處理功能，包含格式化、計算、比較與驗證。</div>
      </router-link>

      <!-- 導航卡片：前往表單驗證 -->
      <router-link
        to="/showcase/validation"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">✅</span>
          表單驗證 (Validation)
        </div>
        <div class="card-text">展示表單驗證功能，包含 Email、電話、身分證等常用驗證規則。</div>
      </router-link>

      <!-- 導航卡片：前往資料格式化 -->
      <router-link
        to="/showcase/formatter"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">🎨</span>
          資料格式化 (Formatter)
        </div>
        <div class="card-text">展示資料格式化功能，包含數字、貨幣、電話號碼、字串等格式化。</div>
      </router-link>

      <!-- 導航卡片：前往本地儲存 -->
      <router-link
        to="/showcase/storage"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">💾</span>
          本地儲存 (Storage)
        </div>
        <div class="card-text">
          展示本地儲存功能，包含 LocalStorage/SessionStorage 封裝與響應式儲存。
        </div>
      </router-link>

      <!-- 導航卡片：前往防抖/節流 -->
      <router-link
        to="/showcase/debounce"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">⏱️</span>
          防抖/節流 (Debounce)
        </div>
        <div class="card-text">展示防抖與節流功能，用於效能優化與減少函數執行頻率。</div>
      </router-link>

      <!-- 導航卡片：前往分頁管理 -->
      <router-link
        to="/showcase/pagination"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📄</span>
          分頁管理 (Pagination)
        </div>
        <div class="card-text">展示分頁管理功能，包含頁碼計算、範圍管理與陣列分頁。</div>
      </router-link>

      <!-- 導航卡片：前往權限管理 -->
      <router-link
        to="/showcase/permission"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">🛡️</span>
          權限管理 (Permission)
        </div>
        <div class="card-text">展示權限管理功能，包含角色驗證、功能權限控制與多重權限檢查。</div>
      </router-link>

      <!-- 導航卡片：前往彈窗管理 -->
      <router-link
        to="/showcase/modal"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">🪟</span>
          彈窗管理 (Modal)
        </div>
        <div class="card-text">展示彈窗管理功能，包含統一彈窗控制、多層彈窗管理與確認對話框。</div>
      </router-link>

      <!-- 導航卡片：前往加密工具 -->
      <router-link
        to="/showcase/encryption"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">🔐</span>
          加密工具 (Encryption)
        </div>
        <div class="card-text">
          展示加密工具功能，包含 Base64 編碼/解碼、AES 加密/解密與雜湊函數。
        </div>
      </router-link>

      <!-- 導航卡片：前往日誌系統 -->
      <router-link
        to="/showcase/logger"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📋</span>
          日誌系統 (Logger)
        </div>
        <div class="card-text">展示日誌系統功能，包含分級日誌、效能追蹤與環境區分。</div>
      </router-link>

      <!-- 導航卡片：前往錯誤處理 -->
      <router-link
        to="/showcase/error-handler"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">⚠️</span>
          錯誤處理 (Error Handler)
        </div>
        <div class="card-text">展示錯誤處理功能，包含錯誤捕捉、分類、記錄與重試機制。</div>
      </router-link>

      <!-- 導航卡片：前往網路狀態 -->
      <router-link
        to="/showcase/network"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📡</span>
          網路狀態 (Network)
        </div>
        <div class="card-text">展示網路狀態監控，包含線上/離線狀態、網路類型與速度偵測。</div>
      </router-link>

      <!-- 導航卡片：前往閒置偵測 -->
      <router-link
        to="/showcase/idle"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">⏱️</span>
          閒置偵測 (Idle)
        </div>
        <div class="card-text">展示閒置偵測功能，包含活動監控、自動登出與暫停/恢復機制。</div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
/* 容器樣式 */
.showcase-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

/* 標頭區域 */
.showcase-header {
  margin-bottom: 3rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 300;
}

.description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

/* 網格佈局 */
.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* 卡片樣式 */
.card {
  display: block;
  text-decoration: none;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  color: inherit;
}

.card.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: #bbb;
}

.card-title {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1.2em;
}

.card-text {
  color: #555;
  line-height: 1.5;
}
</style>
