<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const { captureError, handleApiError, showError, retry, errors, clearErrors } = useErrorHandler()

// Demo state
const errorMessage = ref('測試錯誤訊息')
const retryCount = ref(3)
const retryDelay = ref(1000)
const isRetrying = ref(false)
const retryResult = ref('')

// Computed
const recentErrors = computed(() => errors.value.slice(-5))

const handleCaptureError = () => {
  const error = new Error(errorMessage.value)
  captureError(error, { source: 'showcase-demo', timestamp: new Date() })
}

const handleShowError = () => {
  showError(errorMessage.value)
}

const handleRetrySuccess = async () => {
  isRetrying.value = true
  retryResult.value = ''

  try {
    let attemptCount = 0
    const result = await retry(
      async () => {
        attemptCount++
        if (attemptCount < 2) {
          throw new Error('模擬失敗')
        }
        return '成功！'
      },
      {
        maxRetries: retryCount.value,
        delay: retryDelay.value
      }
    )
    retryResult.value = `重試成功：${result}`
  } catch (error) {
    retryResult.value = `重試失敗：${(error as Error).message}`
  } finally {
    isRetrying.value = false
  }
}

const handleRetryFail = async () => {
  isRetrying.value = true
  retryResult.value = ''

  try {
    await retry(
      async () => {
        throw new Error('永遠失敗')
      },
      {
        maxRetries: retryCount.value,
        delay: retryDelay.value
      }
    )
  } catch (error) {
    retryResult.value = `所有重試都失敗：${(error as Error).message}`
  } finally {
    isRetrying.value = false
  }
}

definePageMeta({
  title: '錯誤處理 (Error Handler)',
  icon: 'mdi-alert-circle'
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
        <h1 class="page-title">錯誤處理系統 (Error Handler System)</h1>
      </div>
      <p class="page-desc">
        完整的錯誤處理模組，提供錯誤捕捉、分類、記錄和重試機制。
        <br />
        核心特色：錯誤分類、API 錯誤處理、自動重試、錯誤追蹤。
      </p>
    </div>

    <!-- General Usage Section -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">📝</span>
        General Usage (一般使用範例)
      </h2>
      <div class="card-content">
        <p class="demo-desc">
          最常見的情境：捕捉和處理應用程式中的錯誤。
          <br />
          使用
          <code>captureError</code>
          、
          <code>handleApiError</code>
          方法統一處理錯誤。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
const { captureError, handleApiError, retry } = useErrorHandler()

// 1. 捕捉錯誤
try {
  await someOperation()
} catch (error) {
  captureError(error, { context: 'operation' })
}

// 2. API 錯誤處理
handleApiError(context, true)

// 3. 重試機制
const data = await retry(() => api.call(), {
  maxRetries: 3,
  delay: 1000
})
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="當前狀態"
              :data="{
                totalErrors: errors.length,
                recentErrors: recentErrors.length
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Playground -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Playground (互動式演示)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <!-- 1. Capture Error -->
          <div class="demo-card">
            <h3 class="demo-title">1. 錯誤捕捉</h3>
            <p class="demo-desc">捕捉並記錄錯誤資訊。</p>

            <div class="control-row mb-4">
              <label>錯誤訊息:</label>
              <input
                v-model="errorMessage"
                type="text"
                class="input-field"
                style="flex: 1"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const error = new Error('{{ errorMessage }}')
captureError(error, { 
  source: 'demo',
  timestamp: new Date()
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    @click="handleCaptureError"
                  >
                    捕捉錯誤
                  </button>
                  <button
                    class="action-btn secondary"
                    @click="handleShowError"
                  >
                    顯示錯誤訊息
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Retry Mechanism -->
          <div class="demo-card">
            <h3 class="demo-title">2. 重試機制</h3>
            <p class="demo-desc">自動重試失敗的操作，支援指數退避。</p>

            <div class="control-row mb-4">
              <label>重試次數:</label>
              <input
                v-model.number="retryCount"
                type="number"
                class="input-field"
                style="width: 100px"
              />
              <label>延遲時間 (ms):</label>
              <input
                v-model.number="retryDelay"
                type="number"
                class="input-field"
                style="width: 100px"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>const result = await retry(
  () => api.call(),
  {
    maxRetries: {{ retryCount }},
    delay: {{ retryDelay }},
    backoff: 2
  }
)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    :disabled="isRetrying"
                    @click="handleRetrySuccess"
                  >
                    {{ isRetrying ? '重試中...' : '測試重試（成功）' }}
                  </button>
                  <button
                    class="action-btn danger"
                    :disabled="isRetrying"
                    @click="handleRetryFail"
                  >
                    {{ isRetrying ? '重試中...' : '測試重試（失敗）' }}
                  </button>
                </div>
                <div
                  v-if="retryResult"
                  class="result-box"
                >
                  {{ retryResult }}
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Error History -->
          <div class="demo-card">
            <h3 class="demo-title">3. 錯誤歷史</h3>
            <p class="demo-desc">查看最近的錯誤記錄。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 取得所有錯誤
const { errors } = useErrorHandler()

// 清除錯誤
clearErrors()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn danger"
                  style="margin-bottom: 1rem"
                  @click="clearErrors"
                >
                  清除錯誤歷史
                </button>
                <DataPreview
                  title="最近 5 筆錯誤"
                  :data="recentErrors"
                />
              </div>
            </div>
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
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.control-row label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  flex: 1;
}

.method-demos {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.demo-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.demo-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.15rem 0;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.demo-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1.1em;
  background: #3498db;
  margin-right: 0.5rem;
  border-radius: 2px;
}

.demo-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.usage-block,
.output-block {
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
  max-height: 360px;
}

.code-content pre {
  margin: 0;
}

.code-content code {
  color: #abb2bf;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.action-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: #6c757d;
}

.action-btn.danger {
  background: #dc3545;
}

.button-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.result-box {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
