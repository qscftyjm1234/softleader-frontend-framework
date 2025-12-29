<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const {
  uploadFile,
  uploadFiles,
  uploadFromInput,
  validate,
  validateMultiple,
  formatFileSize,
  FILE_TYPE_GROUPS
} = useFileUpload()

// State
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadResults = ref<any[]>([])

// Demo validation options
const maxFileSize = ref(5 * 1024 * 1024) // 5MB
const acceptedTypes = ref<string[]>(['image/*', '.pdf'])
const maxFilesCount = ref(5)

// Computed
const totalSize = computed(() => {
  return selectedFiles.value.reduce((sum, file) => sum + file.size, 0)
})

const validationSummary = computed(() => {
  if (selectedFiles.value.length === 0) return null

  const result = validateMultiple(selectedFiles.value, {
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value,
    maxFiles: maxFilesCount.value
  })

  return result
})

// File icon helper
const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return '🖼️'
  if (file.type.startsWith('video/')) return '🎥'
  if (file.type.includes('pdf')) return '📄'
  if (file.type.includes('word')) return '📝'
  if (file.type.includes('excel') || file.type.includes('spreadsheet')) return '📊'
  if (file.type.startsWith('audio/')) return '🎵'
  return '📁'
}

// Handlers
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  if (e.dataTransfer?.files) {
    selectedFiles.value = [...selectedFiles.value, ...Array.from(e.dataTransfer.files)]
  }
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    selectedFiles.value = [...selectedFiles.value, ...Array.from(input.files)]
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const clearAll = () => {
  selectedFiles.value = []
  uploadResults.value = []
}

// Upload actions
const handleUploadSingle = async () => {
  if (selectedFiles.value.length === 0) return

  const file = selectedFiles.value[0]
  const result = await uploadFile(file, {
    endpoint: '/api/upload',
    loadingRef: isUploading,
    autoSuccess: true,
    autoError: true,
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value,
    data: {
      category: 'demo',
      timestamp: new Date().toISOString()
    }
  })

  uploadResults.value.push({
    file: file.name,
    result
  })
}

const handleUploadMultiple = async () => {
  if (selectedFiles.value.length === 0) return

  const results = await uploadFiles(selectedFiles.value, {
    endpoint: '/api/upload/multiple',
    loadingRef: isUploading,
    autoSuccess: true,
    autoError: true,
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value
  })

  uploadResults.value.push({
    files: selectedFiles.value.map((f) => f.name),
    results
  })
}

const handleValidateOnly = () => {
  selectedFiles.value.forEach((file) => {
    const result = validate(file, {
      maxSize: maxFileSize.value,
      accept: acceptedTypes.value
    })

    if (!result.valid) {
      useNotify().error(`${file.name}: ${result.error}`)
    } else {
      useNotify().success(`${file.name}: 驗證通過`)
    }
  })
}

definePageMeta({
  title: '檔案上傳 (File Upload)',
  icon: 'mdi-upload'
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
        <h1 class="page-title">檔案上傳系統 (File Upload System)</h1>
      </div>
      <p class="page-desc">
        統一的檔案上傳處理模組，支援拖放上傳、檔案驗證與進度追蹤。
        <br />
        核心特色：完整驗證、Loading 狀態管理、FormData 自動處理。
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
          最常見的情境：從 input 元素上傳檔案。
          <br />
          使用
          <code>uploadFromInput</code>
          方法，自動處理檔案選擇與上傳。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const { uploadFromInput } = useFileUpload()
const isUploading = ref(false)

// 2. 處理檔案上傳
const handleUpload = async (event: Event) => {
  const result = await uploadFromInput(event, {
    endpoint: '/api/upload',
    loadingRef: isUploading,
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ['image/*', '.pdf'],
    autoSuccess: true
  })
}
&lt;/script&gt;

&lt;template&gt;
  &lt;input 
    type="file" 
    @change="handleUpload"
    :disabled="isUploading"
  &gt;
&lt;/template&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="支援的功能"
              :data="{
                validation: '檔案大小、類型、數量驗證',
                loading: '全域 Loading 或自訂 Loading Ref',
                formData: '自動建立 FormData，支援額外欄位',
                callbacks: 'onSuccess、onError、onProgress',
                multipleFiles: '支援單檔或多檔上傳'
              }"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Interactive Upload Area -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🚀</span>
        Interactive Upload Demo (互動式上傳演示)
      </h2>
      <div class="card-content">
        <!-- Upload Area -->
        <div
          class="upload-area"
          :class="{ dragging: isDragging }"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <input
            id="file-upload"
            type="file"
            multiple
            class="hidden-input"
            @change="handleFileSelect"
          />
          <label
            for="file-upload"
            class="upload-label"
          >
            <div class="upload-icon">☁️</div>
            <p class="upload-text">點擊此處 或 將檔案拖曳至此</p>
            <p class="upload-hint">支援各種格式圖片與文件</p>
          </label>
        </div>

        <!-- Validation Settings -->
        <div class="settings-panel">
          <h3 class="settings-title">驗證設定</h3>
          <div class="settings-grid">
            <div class="setting-item">
              <label>檔案大小限制</label>
              <select v-model.number="maxFileSize">
                <option :value="1 * 1024 * 1024">1 MB</option>
                <option :value="5 * 1024 * 1024">5 MB</option>
                <option :value="10 * 1024 * 1024">10 MB</option>
                <option :value="50 * 1024 * 1024">50 MB</option>
              </select>
            </div>
            <div class="setting-item">
              <label>檔案數量限制</label>
              <input
                v-model.number="maxFilesCount"
                type="number"
                min="1"
                max="20"
              />
            </div>
          </div>
        </div>

        <!-- Selected Files Preview -->
        <div
          v-if="selectedFiles.length > 0"
          class="files-section"
        >
          <div class="files-header">
            <h3>已選擇的檔案 ({{ selectedFiles.length }})</h3>
            <div class="files-actions">
              <button
                class="action-btn secondary"
                @click="handleValidateOnly"
              >
                驗證檔案
              </button>
              <button
                class="action-btn"
                :disabled="isUploading"
                @click="handleUploadSingle"
              >
                {{ isUploading ? '上傳中...' : '上傳第一個' }}
              </button>
              <button
                class="action-btn"
                :disabled="isUploading"
                @click="handleUploadMultiple"
              >
                {{ isUploading ? '上傳中...' : '上傳全部' }}
              </button>
              <button
                class="action-btn danger"
                @click="clearAll"
              >
                清除全部
              </button>
            </div>
          </div>

          <!-- Validation Summary -->
          <div
            v-if="validationSummary"
            class="validation-summary"
            :class="{ valid: validationSummary.valid, invalid: !validationSummary.valid }"
          >
            <strong>驗證結果:</strong>
            {{ validationSummary.valid ? '✓ 所有檔案驗證通過' : `✗ ${validationSummary.error}` }}
          </div>

          <div class="files-info">
            <span>總大小: {{ formatFileSize(totalSize) }}</span>
          </div>

          <div class="file-grid">
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="file-card fade-in"
            >
              <div class="file-icon">{{ getFileIcon(file) }}</div>
              <div class="file-info">
                <div
                  class="file-name"
                  :title="file.name"
                >
                  {{ file.name }}
                </div>
                <div class="file-meta">
                  {{ formatFileSize(file.size) }}
                  <span class="file-type">{{ file.type || 'unknown' }}</span>
                </div>
              </div>
              <button
                class="remove-btn"
                title="Remove"
                @click="removeFile(index)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <!-- Upload Results -->
        <div
          v-if="uploadResults.length > 0"
          class="results-section"
        >
          <h3>上傳結果</h3>
          <DataPreview
            title="Results"
            :data="uploadResults"
          />
        </div>
      </div>
    </section>

    <!-- API Methods Section -->
    <section class="module-section mt-8">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        API Methods (方法說明)
      </h2>
      <div class="card-content">
        <div class="method-demos">
          <!-- 1. uploadFile -->
          <div class="demo-card">
            <h3 class="demo-title">1. uploadFile(file, options)</h3>
            <p class="demo-desc">上傳單個檔案。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 上傳單個檔案
const result = await uploadFile(file, {
  endpoint: '/api/upload',
  fieldName: 'file',
  data: { userId: '123' },
  maxSize: 5 * 1024 * 1024,
  accept: ['image/*'],
  onProgress: (progress) => {
    console.log(`進度: ${progress}%`)
  }
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Options"
                  :data="{
                    endpoint: 'API 端點 (default: /api/upload)',
                    method: 'HTTP 方法 (default: POST)',
                    fieldName: 'FormData 欄位名稱 (default: file)',
                    data: '額外的表單資料',
                    maxSize: '檔案大小限制（bytes）',
                    accept: '允許的檔案類型',
                    loadingRef: '自訂 Loading Ref',
                    globalLoading: '使用全域 Loading'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 2. uploadFiles -->
          <div class="demo-card">
            <h3 class="demo-title">2. uploadFiles(files, options)</h3>
            <p class="demo-desc">上傳多個檔案。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 上傳多個檔案
const results = await uploadFiles(files, {
  endpoint: '/api/upload/multiple',
  fieldName: 'files',
  maxSize: 10 * 1024 * 1024,
  accept: ['image/*', '.pdf']
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Return Type"
                  :data="{
                    type: 'Promise<UploadResult[]>',
                    UploadResult: {
                      success: 'boolean',
                      data: 'any (response data)',
                      error: 'string (error message)'
                    }
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 3. uploadFromInput -->
          <div class="demo-card">
            <h3 class="demo-title">3. uploadFromInput(inputElement, options)</h3>
            <p class="demo-desc">從 input 元素上傳（自動判斷單檔或多檔）。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 從 input 元素上傳
const handleChange = async (event: Event) => {
  const result = await uploadFromInput(event, {
    endpoint: '/api/upload',
    autoSuccess: true,
    autoError: true
  })
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Features"
                  :data="{
                    autoDetect: '自動判斷單檔或多檔',
                    validation: '自動驗證檔案',
                    convenient: '最方便的上傳方式'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 4. validate -->
          <div class="demo-card">
            <h3 class="demo-title">4. validate(file, options)</h3>
            <p class="demo-desc">驗證單個檔案（不上傳）。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 驗證檔案
const result = validate(file, {
  maxSize: 5 * 1024 * 1024,
  accept: ['image/jpeg', 'image/png']
})

if (!result.valid) {
  console.error(result.error)
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Validation Result"
                  :data="{
                    valid: 'boolean',
                    error: 'string (if invalid)'
                  }"
                />
              </div>
            </div>
          </div>

          <!-- 5. FILE_TYPE_GROUPS -->
          <div class="demo-card">
            <h3 class="demo-title">5. FILE_TYPE_GROUPS (常數)</h3>
            <p class="demo-desc">預定義的檔案類型分類。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 使用預定義的檔案類型
const { FILE_TYPE_GROUPS } = useFileUpload()

// 只接受圖片
accept: FILE_TYPE_GROUPS.image

// 接受圖片和文件
accept: [...FILE_TYPE_GROUPS.image, ...FILE_TYPE_GROUPS.document]</code></pre>
                </div>
              </div>
              <div class="output-block">
                <DataPreview
                  title="Available Groups"
                  :data="FILE_TYPE_GROUPS"
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

/* Upload Area Styles */
.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  cursor: default;
  margin-bottom: 1.5rem;
}

.upload-area:hover {
  border-color: #94a3b8;
  background-color: #f1f5f9;
}

.upload-area.dragging {
  border-color: #3b82f6;
  background-color: #eff6ff;
  transform: scale(1.01);
}

.hidden-input {
  display: none;
}

.upload-label {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 100%;
}

.upload-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.upload-text {
  font-size: 1.2rem;
  color: #334155;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.upload-hint {
  color: #94a3b8;
  font-size: 0.9rem;
}

/* Settings Panel */
.settings-panel {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.settings-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.setting-item label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
}

.setting-item select,
.setting-item input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

/* Files Section */
.files-section {
  margin-top: 1.5rem;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.files-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.files-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.files-info {
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* Validation Summary */
.validation-summary {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.validation-summary.valid {
  background: #d1fae5;
  color: #065f46;
  border-left: 3px solid #10b981;
}

.validation-summary.invalid {
  background: #fee2e2;
  color: #991b1b;
  border-left: 3px solid #ef4444;
}

/* File Grid Styles */
.file-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.file-card {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  background: white;
  transition: all 0.2s;
}

.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.file-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.file-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #334155;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
}

.file-meta {
  font-size: 0.8rem;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-type {
  font-size: 0.75rem;
  color: #cbd5e1;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  line-height: 1;
}

.remove-btn:hover {
  color: #ef4444;
}

/* Action Buttons */
.action-btn {
  background: #0d6efd;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
  font-size: 0.9rem;
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

.action-btn.secondary {
  background: #6c757d;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #5a6268;
}

.action-btn.danger {
  background: #dc3545;
}

.action-btn.danger:hover:not(:disabled) {
  background: #c82333;
}

/* Method Demos */
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

/* Results Section */
.results-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.results-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.mt-8 {
  margin-top: 2rem;
}
</style>
