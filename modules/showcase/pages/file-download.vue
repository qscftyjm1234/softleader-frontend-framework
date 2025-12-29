<script setup lang="ts">
import { ref } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const {
  downloadFromUrl,
  downloadFromApi,
  downloadFromBase64,
  downloadFromBlob,
  downloadFromText,
  downloadFromJson
} = useFileDownload()

// Loading states
const isDownloadingUrl = ref(false)
const isDownloadingApi = ref(false)
const isDownloadingBase64 = ref(false)

// Demo data
const demoBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
const demoJsonData = {
  name: '測試資料',
  items: [
    { id: 1, name: '項目 1', value: 100 },
    { id: 2, name: '項目 2', value: 200 }
  ],
  timestamp: new Date().toISOString()
}
const demoTextContent = '這是一個測試文字檔案\n包含多行內容\n用於展示文字檔案下載功能'

// Action handlers
const handleDownloadFromUrl = async () => {
  isDownloadingUrl.value = true
  try {
    // Using a real public PDF for demo
    await downloadFromUrl(
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      {
        filename: 'sample.pdf',
        autoSuccess: true,
        autoError: true
      }
    )
  } finally {
    isDownloadingUrl.value = false
  }
}

const handleDownloadFromApi = async () => {
  isDownloadingApi.value = true
  try {
    // This is a demo - replace with your actual API endpoint
    await downloadFromApi('/api/files/export', {
      filename: 'export.xlsx',
      method: 'GET',
      autoSuccess: true,
      autoError: true
    })
  } finally {
    isDownloadingApi.value = false
  }
}

const handleDownloadFromBase64 = () => {
  isDownloadingBase64.value = true
  try {
    downloadFromBase64(demoBase64, 'sample.png', {
      autoSuccess: true,
      autoError: true
    })
  } finally {
    isDownloadingBase64.value = false
  }
}

const handleDownloadFromText = () => {
  downloadFromText(demoTextContent, 'test.txt', {
    autoSuccess: true,
    autoError: true
  })
}

const handleDownloadFromJson = () => {
  downloadFromJson(demoJsonData, 'data.json', {
    autoSuccess: true,
    autoError: true
  })
}

const handleDownloadFromCanvas = () => {
  // 建立一個簡單的 Canvas
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // 繪製一些內容
    ctx.fillStyle = '#4CAF50'
    ctx.fillRect(0, 0, 200, 200)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '20px Arial'
    ctx.fillText('Hello World', 40, 100)

    // 轉換為 Blob 並下載
    canvas.toBlob((blob) => {
      if (blob) {
        downloadFromBlob(blob, 'canvas.png', {
          autoSuccess: true,
          autoError: true
        })
      }
    })
  }
}

definePageMeta({
  title: '檔案下載 (File Download)',
  icon: 'mdi-download'
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
        <h1 class="page-title">檔案下載系統 (File Download System)</h1>
      </div>
      <p class="page-desc">
        統一的檔案下載處理模組，支援多種下載方式與檔案類型。
        <br />
        核心特色：自動 MIME Type 偵測、Loading 狀態管理、完整錯誤處理。
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
          最常見的情境：從 API 下載檔案。
          <br />
          使用
          <code>downloadFromApi</code>
          方法，自動處理 Loading 狀態與錯誤訊息。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const { downloadFromApi } = useFileDownload()
const isDownloading = ref(false)

// 2. 下載檔案
const handleDownload = async () => {
  await downloadFromApi('/api/reports/export', {
    filename: 'report.xlsx',
    loadingRef: isDownloading,
    method: 'GET'
  })
}
&lt;/script&gt;

&lt;template&gt;
  &lt;button 
    @click="handleDownload"
    :disabled="isDownloading"
  &gt;
    <span v-pre>{{ isDownloading ? '下載中...' : '下載報表' }}</span>
  &lt;/button&gt;
&lt;/template&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="支援的檔案類型"
              :data="{
                documents: ['PDF', 'DOC', 'DOCX'],
                spreadsheets: ['XLS', 'XLSX', 'CSV'],
                images: ['JPG', 'PNG', 'GIF', 'BMP', 'WEBP', 'SVG'],
                archives: ['ZIP', 'RAR', '7Z'],
                others: ['TXT', 'JSON', 'XML', 'MP4', 'MP3']
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
        Interactive Playground (全功能演示)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <!-- 1. downloadFromUrl -->
          <div class="demo-card">
            <h3 class="demo-title">1. downloadFromUrl(url, options)</h3>
            <p class="demo-desc">從外部 URL 下載檔案。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                :disabled="isDownloadingUrl"
                @click="handleDownloadFromUrl"
              >
                {{ isDownloadingUrl ? '下載中...' : '下載 PDF 範例' }}
              </button>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 從外部 URL 下載檔案
await downloadFromUrl(
  'https://example.com/sample.pdf',
  {
    filename: 'sample.pdf',
    globalLoading: true,
    autoSuccess: true
  }
)</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Method Signature"
                  :data="{
                    method: 'downloadFromUrl',
                    params: {
                      url: 'string',
                      options: {
                        filename: 'string (optional)',
                        globalLoading: 'boolean (optional)',
                        loadingRef: 'Ref<boolean> (optional)',
                        autoSuccess: 'boolean (optional)',
                        autoError: 'boolean (optional)',
                        onSuccess: '(filename: string) => void (optional)',
                        onError: '(error: Error) => void (optional)'
                      }
                    },
                    returns: 'Promise<void>'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 2. downloadFromApi -->
          <div class="demo-card">
            <h3 class="demo-title">2. downloadFromApi(apiUrl, options)</h3>
            <p class="demo-desc">從 API 下載檔案（支援 GET/POST）。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                :disabled="isDownloadingApi"
                @click="handleDownloadFromApi"
              >
                {{ isDownloadingApi ? '下載中...' : '從 API 下載' }}
              </button>
              <span class="note">（此為示範，需要實際 API 端點）</span>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// GET 方法
await downloadFromApi('/api/files/export', {
  filename: 'export.xlsx',
  method: 'GET'
})

// POST 方法帶參數
await downloadFromApi('/api/reports/generate', {
  filename: 'report.pdf',
  method: 'POST',
  body: {
    startDate: '2024-01-01',
    endDate: '2024-12-31'
  }
})</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Method Signature"
                  :data="{
                    method: 'downloadFromApi',
                    params: {
                      apiUrl: 'string',
                      options: {
                        filename: 'string (optional)',
                        method: 'GET | POST (optional, default: GET)',
                        body: 'any (optional)',
                        '...other options': 'same as downloadFromUrl'
                      }
                    },
                    returns: 'Promise<void>'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. downloadFromBase64 -->
          <div class="demo-card">
            <h3 class="demo-title">3. downloadFromBase64(base64, filename, options)</h3>
            <p class="demo-desc">從 Base64 字串下載檔案。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                @click="handleDownloadFromBase64"
              >
                下載 Base64 圖片
              </button>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 支援帶 data URI 前綴或純 Base64
const base64 = 'data:image/png;base64,iVBORw0KG...'

downloadFromBase64(
  base64,
  'image.png',
  { autoSuccess: true }
)</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Demo Base64 Data"
                  :data="{
                    base64: demoBase64.substring(0, 50) + '...',
                    length: demoBase64.length,
                    type: 'image/png'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 4. downloadFromText -->
          <div class="demo-card">
            <h3 class="demo-title">4. downloadFromText(content, filename, options)</h3>
            <p class="demo-desc">從文字內容建立並下載檔案。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                @click="handleDownloadFromText"
              >
                下載文字檔案
              </button>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 建立並下載文字檔案
const content = '這是一個測試文字檔案'

downloadFromText(
  content,
  'test.txt',
  { autoSuccess: true }
)</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Demo Text Content"
                  :data="demoTextContent"
                />
              </div>
            </div>
          </div>

          <!-- 5. downloadFromJson -->
          <div class="demo-card">
            <h3 class="demo-title">5. downloadFromJson(data, filename, options)</h3>
            <p class="demo-desc">從 JSON 物件建立並下載檔案。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                @click="handleDownloadFromJson"
              >
                下載 JSON 檔案
              </button>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 自動格式化 JSON 並下載
const data = {
  name: '測試資料',
  items: [...]
}

downloadFromJson(
  data,
  'data.json',
  { autoSuccess: true }
)</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Demo JSON Data"
                  :data="demoJsonData"
                />
              </div>
            </div>
          </div>

          <!-- 6. downloadFromBlob -->
          <div class="demo-card">
            <h3 class="demo-title">6. downloadFromBlob(blob, filename, options)</h3>
            <p class="demo-desc">從 Blob 物件下載檔案（例如：Canvas 轉圖片）。</p>

            <div class="control-row mb-4">
              <button
                class="action-btn"
                @click="handleDownloadFromCanvas"
              >
                下載 Canvas 圖片
              </button>
            </div>

            <div class="demo-grid">
              <!-- Usage -->
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 從 Canvas 建立 Blob 並下載
const canvas = document.createElement('canvas')
// ... 繪製內容 ...

canvas.toBlob((blob) => {
  if (blob) {
    downloadFromBlob(blob, 'canvas.png')
  }
})</code></pre>
                </div>
              </div>
              <!-- Output -->
              <div class="output-block">
                <DataPreview
                  title="Use Cases"
                  :data="{
                    canvas: 'Canvas 轉圖片',
                    screenshot: '螢幕截圖',
                    generated: '動態生成的檔案',
                    cropped: '裁切後的圖片'
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advanced Features -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">⚙️</span>
        Advanced Features (進階功能)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <!-- Loading States -->
          <div class="demo-card">
            <h3 class="demo-title">Loading 狀態管理</h3>
            <p class="demo-desc">支援全域 Loading 和自訂 Loading Ref。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 全域 Loading（使用 Loading Store）
await downloadFromApi('/api/file', {
  globalLoading: true
})

// 自訂 Loading Ref（用於按鈕狀態）
const isDownloading = ref(false)
await downloadFromApi('/api/file', {
  loadingRef: isDownloading
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Loading Options"
                  :data="{
                    globalLoading: '使用全域 Loading Store',
                    loadingRef: '綁定到特定按鈕或元件',
                    both: '可同時使用兩者'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- Error Handling -->
          <div class="demo-card">
            <h3 class="demo-title">錯誤處理</h3>
            <p class="demo-desc">完整的錯誤處理機制，支援自訂錯誤回調。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 自訂錯誤處理
await downloadFromUrl('https://invalid-url.com/file.pdf', {
  autoError: false, // 關閉自動錯誤訊息
  onError: (error) => {
    console.error('下載失敗:', error)
    // 自訂錯誤處理邏輯
  }
})

// 使用 try-catch
try {
  await downloadFromApi('/api/file')
} catch (error) {
  // 額外的錯誤處理
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Error Handling Options"
                  :data="{
                    autoError: '自動顯示錯誤訊息（預設：true）',
                    onError: '自訂錯誤回調函數',
                    tryCatch: '支援標準 try-catch 語法'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- MIME Type Detection -->
          <div class="demo-card">
            <h3 class="demo-title">自動 MIME Type 偵測</h3>
            <p class="demo-desc">根據檔案副檔名自動設定正確的 MIME Type。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Supported MIME Types</div>
                <div class="code-content">
                  <pre><code>// 文件類型
.pdf  → application/pdf
.doc  → application/msword
.docx → application/vnd.openxmlformats...

// 試算表類型
.xls  → application/vnd.ms-excel
.xlsx → application/vnd.openxmlformats...
.csv  → text/csv

// 圖片類型
.jpg  → image/jpeg
.png  → image/png
.gif  → image/gif
.svg  → image/svg+xml

// 其他類型
.zip  → application/zip
.json → application/json
.txt  → text/plain</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Auto Detection"
                  :data="{
                    feature: '自動偵測',
                    fallback: 'application/octet-stream',
                    customizable: '可擴充支援更多類型'
                  }"
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

.demo-desc {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
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

.control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.mb-4 {
  margin-bottom: 0.5rem;
}

.mt-8 {
  margin-top: 2rem;
}

.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: #0b5ed7;
}

.action-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.action-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}

.note {
  font-size: 0.85rem;
  color: #666;
  font-style: italic;
}
</style>
