<script setup lang="ts">
import ApiLoadingButton from '@/components/business/ApiLoadingButton.vue'

definePageMeta({
  title: 'Loading 展示',
  layout: 'default'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">全域 Loading 展示 (Queue 模式)</h1>
      </div>
      <p class="page-desc">
        展示 useLoading Composable 的計數器機制。
        <br />
        核心特色：支援多重請求堆疊 (Stack/Queue)，確保 Loading
        遮罩在所有請求完成後才消失，避免畫面閃爍。
      </p>
    </div>

    <!-- Description Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">ℹ️</span>
        測試說明
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          請嘗試快速點擊下方的按鈕多次，你會發現 Loading 遮罩會持續顯示，直到
          <b>所有的</b>
          API 都回來為止。
        </p>
        <ul class="feature-list">
          <li>每個按鈕會觸發一個延遲 2 秒的 Mock API。</li>
          <li>
            如果你在 1 秒內點了 3 次，Loading 不會閃爍，而是會持續顯示約 2~3
            秒，直到最後一個請求結束。
          </li>
        </ul>
      </div>
    </section>

    <!-- Demo Section -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Demo (互動式演示)
      </h2>
      <div class="card-content">
        <div class="demo-actions">
          <div class="action-card">
            <h3>API 請求 1</h3>
            <ApiLoadingButton label="發送請求 A (2s)" />
          </div>

          <div class="action-card">
            <h3>API 請求 2</h3>
            <ApiLoadingButton label="發送請求 B (2s)" />
          </div>

          <div class="action-card">
            <h3>API 請求 3</h3>
            <ApiLoadingButton label="發送請求 C (2s)" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inspector-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
  line-height: 1.5;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.section-title {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.card-content {
  padding: 1.5rem;
}

.demo-desc {
  color: #666;
  font-size: 1rem;
  margin: 0 0 1rem 0;
  line-height: 1.6;
}

.feature-list {
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #555;
  margin-bottom: 0;
}

.feature-list li {
  margin-bottom: 0.5rem;
}

.demo-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  background: #fcfcfc;
  transition: all 0.2s;
}

.action-card:hover {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.action-card h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #444;
}
</style>
