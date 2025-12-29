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

      <!-- 導航卡片：前往媒體上傳 -->
      <router-link
        to="/showcase/media"
        class="card hover-card"
      >
        <div class="card-title">
          <span class="icon">📁</span>
          媒體上傳 (Media Upload)
        </div>
        <div class="card-text">展示檔案上傳介面與預覽功能。</div>
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
