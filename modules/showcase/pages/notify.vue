<script setup lang="ts">
import IButton from '@/components/uiInterface/IButton.vue'

definePageMeta({
  title: 'Notify 通知展示',
  layout: 'default'
})

const { success, error, warning, info } = useNotify()

const handleSuccess = () => success('操作成功！資料已儲存。')
const handleError = () => error('發生錯誤：無法連線至伺服器 (500)')
const handleWarning = () => warning('注意：您的連線似乎不穩定。')
const handleInfo = () => info('提示：您有一則新訊息。')
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
        <h1 class="page-title">全域通知系統 (Notify System)</h1>
      </div>
      <p class="page-desc">
        提供全域的輕量級通知訊息 (Toast/Snackbar)，透過 Composable 呼叫，無須手動引入元件。
      </p>
    </div>

    <!-- Usage Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        Basic Usage (基本用法)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          Notify 系統設計為 "Fire and Forget"，你只需要呼叫 helper function 即可。
        </p>

        <div class="usage-block">
          <div class="block-header">Example Code</div>
          <div class="code-content">
            <pre><code>// 1. 取得 helper (Nuxt Auto Import)
const { success, error, warning, info } = useNotify()

// 2. 觸發通知
success('操作成功') 
error('發生錯誤')
warning('警告訊息')
info('一般提示')</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Demo (互動式演示)
      </h2>
      <div class="card-content">
        <div class="demo-grid">
          <div class="action-item">
            <span class="label">Success</span>
            <IButton
              variant="success"
              @click="handleSuccess"
            >
              觸發成功通知
            </IButton>
          </div>

          <div class="action-item">
            <span class="label">Error</span>
            <IButton
              variant="danger"
              @click="handleError"
            >
              觸發錯誤通知
            </IButton>
          </div>

          <div class="action-item">
            <span class="label">Warning</span>
            <IButton
              variant="warning"
              @click="handleWarning"
            >
              觸發警告通知
            </IButton>
          </div>

          <div class="action-item">
            <span class="label">Info</span>
            <IButton
              variant="info"
              @click="handleInfo"
            >
              觸發提示通知
            </IButton>
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

/* Code Block Styles */
.usage-block {
  display: flex;
  flex-direction: column;
}

.block-header {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #888;
  margin-bottom: 0.15rem;
  font-weight: 600;
}

.code-content {
  background: #282c34;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #e06c75;
  line-height: 1.25;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

/* Demo Grid */
.demo-grid {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.action-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

.label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #555;
  text-transform: uppercase;
}
</style>
