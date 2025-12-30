<script setup lang="ts">
/**
 * Mock API 展示頁面
 *
 * 展示如何使用專案中的 Mock API
 */

// 上傳相關
const uploadFile = ref<File | null>(null)
const uploadLoading = ref(false)
const uploadResult = ref<any>(null)

// 檔案匯出相關
const exportFormat = ref('csv')
const exportLoading = ref(false)

// 報表生成相關
const reportType = ref('monthly')
const reportLoading = ref(false)
const reportResult = ref<any>(null)

// API 呼叫記錄
const apiLogs = ref<any[]>([])

const addLog = (method: string, url: string, status: string, data?: any) => {
  apiLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    method,
    url,
    status,
    data
  })
}

// 單檔案上傳
const handleUpload = async () => {
  if (!uploadFile.value) {
    alert('請選擇檔案')
    return
  }

  uploadLoading.value = true
  uploadResult.value = null

  try {
    const formData = new FormData()
    formData.append('file', uploadFile.value)

    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    uploadResult.value = response
    addLog('POST', '/api/upload', 'Success', response)
  } catch (error: any) {
    addLog('POST', '/api/upload', 'Error', error.message)
  } finally {
    uploadLoading.value = false
  }
}

// 檔案匯出
const handleExport = async () => {
  exportLoading.value = true

  try {
    const response = await $fetch(`/api/files/export?format=${exportFormat.value}`, {
      method: 'GET'
    })

    // 建立下載
    const blob = new Blob([response as string], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `export.${exportFormat.value}`
    a.click()
    URL.revokeObjectURL(url)

    addLog('GET', `/api/files/export?format=${exportFormat.value}`, 'Success')
  } catch (error: any) {
    addLog('GET', `/api/files/export`, 'Error', error.message)
  } finally {
    exportLoading.value = false
  }
}

// 報表生成
const handleGenerateReport = async () => {
  reportLoading.value = true
  reportResult.value = null

  try {
    const response = await $fetch('/api/reports/generate', {
      method: 'POST',
      body: {
        type: reportType.value,
        startDate: '2024-01-01',
        endDate: '2024-12-31'
      }
    })

    reportResult.value = response
    addLog('POST', '/api/reports/generate', 'Success', response)
  } catch (error: any) {
    addLog('POST', '/api/reports/generate', 'Error', error.message)
  } finally {
    reportLoading.value = false
  }
}

// 清除記錄
const clearLogs = () => {
  apiLogs.value = []
}

definePageMeta({
  title: 'Mock API 展示',
  icon: 'mdi-api'
})
</script>

<template>
  <div class="mock-api-page">
    <!-- 頁面標題 -->
    <div class="page-header">
      <router-link
        to="/showcase"
        class="back-link"
      >
        ← 返回
      </router-link>
      <h1 class="page-title">🔌 Mock API 展示</h1>
      <p class="page-desc">展示專案中可用的 Mock API 端點及其使用方式</p>
    </div>

    <!-- API 列表 -->
    <section class="section">
      <h2 class="section-title">📋 可用的 Mock API</h2>
      <div class="api-grid">
        <div class="api-card">
          <div class="api-method post">POST</div>
          <div class="api-info">
            <h3>/api/upload</h3>
            <p>單檔案上傳</p>
          </div>
        </div>
        <div class="api-card">
          <div class="api-method post">POST</div>
          <div class="api-info">
            <h3>/api/upload/multiple</h3>
            <p>多檔案上傳</p>
          </div>
        </div>
        <div class="api-card">
          <div class="api-method get">GET</div>
          <div class="api-info">
            <h3>/api/files/export</h3>
            <p>檔案匯出 (CSV/JSON/XLSX)</p>
          </div>
        </div>
        <div class="api-card">
          <div class="api-method post">POST</div>
          <div class="api-info">
            <h3>/api/reports/export</h3>
            <p>報表匯出 (PDF)</p>
          </div>
        </div>
        <div class="api-card">
          <div class="api-method post">POST</div>
          <div class="api-info">
            <h3>/api/reports/generate</h3>
            <p>報表生成</p>
          </div>
        </div>
        <div class="api-card">
          <div class="api-method get">GET</div>
          <div class="api-info">
            <h3>/api/file</h3>
            <p>通用檔案下載</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 互動測試 -->
    <section class="section">
      <h2 class="section-title">🧪 互動測試</h2>

      <div class="test-grid">
        <!-- 檔案上傳測試 -->
        <div class="test-card">
          <h3>📤 檔案上傳</h3>
          <div class="test-content">
            <input
              type="file"
              @change="(e: any) => (uploadFile = e.target.files[0])"
            />
            <button
              class="btn btn-primary"
              :disabled="uploadLoading || !uploadFile"
              @click="handleUpload"
            >
              {{ uploadLoading ? '上傳中...' : '上傳檔案' }}
            </button>
            <div
              v-if="uploadResult"
              class="result-box success"
            >
              <strong>✅ 上傳成功</strong>
              <pre>{{ JSON.stringify(uploadResult, null, 2) }}</pre>
            </div>
          </div>
        </div>

        <!-- 檔案匯出測試 -->
        <div class="test-card">
          <h3>📥 檔案匯出</h3>
          <div class="test-content">
            <select v-model="exportFormat">
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xlsx">XLSX</option>
            </select>
            <button
              class="btn btn-primary"
              :disabled="exportLoading"
              @click="handleExport"
            >
              {{ exportLoading ? '匯出中...' : '匯出檔案' }}
            </button>
          </div>
        </div>

        <!-- 報表生成測試 -->
        <div class="test-card">
          <h3>📊 報表生成</h3>
          <div class="test-content">
            <select v-model="reportType">
              <option value="daily">每日報表</option>
              <option value="weekly">每週報表</option>
              <option value="monthly">每月報表</option>
            </select>
            <button
              class="btn btn-primary"
              :disabled="reportLoading"
              @click="handleGenerateReport"
            >
              {{ reportLoading ? '生成中...' : '生成報表' }}
            </button>
            <div
              v-if="reportResult"
              class="result-box success"
            >
              <strong>✅ 生成成功</strong>
              <pre>{{ JSON.stringify(reportResult, null, 2) }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- API 呼叫記錄 -->
    <section class="section">
      <div class="section-header">
        <h2 class="section-title">📝 API 呼叫記錄</h2>
        <button
          class="btn btn-secondary"
          @click="clearLogs"
        >
          清除記錄
        </button>
      </div>
      <div class="logs-container">
        <div
          v-if="apiLogs.length === 0"
          class="empty-state"
        >
          尚無 API 呼叫記錄
        </div>
        <div
          v-for="(log, index) in apiLogs"
          :key="index"
          class="log-item"
          :class="log.status.toLowerCase()"
        >
          <div class="log-time">{{ log.time }}</div>
          <div class="log-method">{{ log.method }}</div>
          <div class="log-url">{{ log.url }}</div>
          <div class="log-status">{{ log.status }}</div>
          <div
            v-if="log.data"
            class="log-data"
          >
            <pre>{{ JSON.stringify(log.data, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 使用範例 -->
    <section class="section">
      <h2 class="section-title">💻 使用範例</h2>
      <div class="code-examples">
        <div class="code-example">
          <h3>檔案上傳</h3>
          <pre><code>const formData = new FormData()
formData.append('file', file)

const response = await $fetch('/api/upload', {
  method: 'POST',
  body: formData
})</code></pre>
        </div>

        <div class="code-example">
          <h3>檔案匯出</h3>
          <pre><code>const response = await $fetch('/api/files/export?format=csv', {
  method: 'GET'
})

// 建立下載
const blob = new Blob([response], { type: 'text/csv' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'export.csv'
a.click()</code></pre>
        </div>

        <div class="code-example">
          <h3>報表生成</h3>
          <pre><code>const response = await $fetch('/api/reports/generate', {
  method: 'POST',
  body: {
    type: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  }
})</code></pre>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.mock-api-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  margin-bottom: 3rem;
}

.back-link {
  display: inline-block;
  color: #3498db;
  text-decoration: none;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.back-link:hover {
  text-decoration: underline;
}

.page-title {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.page-desc {
  font-size: 1.1rem;
  color: #7f8c8d;
  margin: 0;
}

.section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.75rem;
  margin: 0 0 1.5rem 0;
  color: #2c3e50;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* API 卡片 */
.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.api-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.api-method {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.75rem;
  height: fit-content;
}

.api-method.get {
  background: #e3f2fd;
  color: #1976d2;
}

.api-method.post {
  background: #e8f5e9;
  color: #388e3c;
}

.api-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: #2c3e50;
  font-family: 'Fira Code', monospace;
}

.api-info p {
  margin: 0;
  font-size: 0.875rem;
  color: #7f8c8d;
}

/* 測試卡片 */
.test-grid {
  display: grid;
  gap: 1.5rem;
}

.test-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

.test-card h3 {
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.test-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.test-content input,
.test-content select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background: #7f8c8d;
}

.result-box {
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
}

.result-box.success {
  background: #e8f5e9;
  border: 1px solid #4caf50;
}

.result-box strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #2e7d32;
}

.result-box pre {
  margin: 0;
  font-size: 0.875rem;
  overflow-x: auto;
}

/* 記錄 */
.logs-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  max-height: 400px;
  overflow-y: auto;
}

.empty-state {
  padding: 2rem;
  text-align: center;
  color: #999;
}

.log-item {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: 100px 80px 1fr 100px;
  gap: 1rem;
  align-items: center;
}

.log-item:last-child {
  border-bottom: none;
}

.log-item.success {
  background: #f1f8f4;
}

.log-item.error {
  background: #fef5f5;
}

.log-time {
  font-size: 0.875rem;
  color: #999;
}

.log-method {
  font-weight: 600;
  font-size: 0.875rem;
}

.log-url {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
}

.log-status {
  font-weight: 500;
}

.log-item.success .log-status {
  color: #4caf50;
}

.log-item.error .log-status {
  color: #f44336;
}

.log-data {
  grid-column: 1 / -1;
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  overflow-x: auto;
}

.log-data pre {
  margin: 0;
}

/* 程式碼範例 */
.code-examples {
  display: grid;
  gap: 1.5rem;
}

.code-example {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.code-example h3 {
  margin: 0;
  padding: 1rem;
  background: #f5f5f5;
  color: #2c3e50;
  font-size: 1rem;
}

.code-example pre {
  margin: 0;
  padding: 1rem;
  background: #282c34;
  overflow-x: auto;
}

.code-example code {
  color: #abb2bf;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}
</style>
