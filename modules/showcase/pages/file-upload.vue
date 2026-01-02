<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  uploadFile,
  uploadFiles,
  uploadFromInput,
  uploadFromBase64,
  uploadFromBlob,
  validate,
  validateMultiple,
  getSelectedFiles,
  formatFileSize
} = useFileUpload()

// 狀態
const selectedFiles = ref<File[]>([])
const isDragging = ref(false)
const isUploading = ref(false)
const uploadResults = ref<any[]>([])

// 示範驗證選項
const maxFileSize = ref(5 * 1024 * 1024) // 5MB
const acceptedTypes = ref<string[]>(['image/*', '.pdf'])
const maxFilesCount = ref(5)

const validationSummary = computed(() => {
  if (selectedFiles.value.length === 0) return null

  const result = validateMultiple(selectedFiles.value, {
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value,
    maxFiles: maxFilesCount.value
  })

  return result
})

// 檔案圖示輔助函式
const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return '🖼️'
  if (file.type.startsWith('video/')) return '🎥'
  if (file.type.includes('pdf')) return '📄'
  if (file.type.includes('word')) return '📝'
  if (file.type.includes('excel') || file.type.includes('spreadsheet')) return '📊'
  if (file.type.startsWith('audio/')) return '🎵'
  return '📁'
}

// 事件處理
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = getSelectedFiles(e)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const handleFileSelect = (e: Event) => {
  const files = getSelectedFiles(e)
  selectedFiles.value = [...selectedFiles.value, ...files]
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const clearAll = () => {
  selectedFiles.value = []
  uploadResults.value = []
}

// 上傳操作

const handleUploadMultiple = async () => {
  if (selectedFiles.value.length === 0) return

  // 過濾出符合規則的檔案
  const validFiles = selectedFiles.value.filter((file) => {
    const result = validate(file, {
      maxSize: maxFileSize.value,
      accept: acceptedTypes.value
    })
    return result.valid
  })

  // 檢查是否有符合規則的檔案
  if (validFiles.length === 0) {
    useNotify().error('沒有符合規則的檔案可上傳')
    return
  }

  // 如果有檔案被過濾掉，提醒使用者
  const filteredCount = selectedFiles.value.length - validFiles.length
  if (filteredCount > 0) {
    useNotify().warning(`已過濾 ${filteredCount} 個不符合規則的檔案`)
  }

  // 上傳符合規則的檔案
  const results = await uploadFiles(validFiles, {
    endpoint: '/api/upload/multiple',
    loadingRef: isUploading,
    autoSuccess: true,
    autoError: true,
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value
  })

  uploadResults.value.push({
    files: validFiles.map((f) => f.name),
    results
  })
}

const handleValidateOnly = () => {
  const result = validateMultiple(selectedFiles.value, {
    maxSize: maxFileSize.value,
    accept: acceptedTypes.value,
    maxFiles: maxFilesCount.value
  })

  if (!result.valid) {
    useNotify().error(`驗證失敗：${result.error}`)
  } else {
    useNotify().success(`✓ 所有檔案驗證通過（共 ${selectedFiles.value.length} 個）`)
  }
}

definePageMeta({
  title: '檔案上傳 (File Upload)',
  icon: 'mdi-upload',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="檔案上傳系統"
    description="統一的檔案上傳處理模組，支援拖放上傳、檔案驗證與進度追蹤。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        full-width
      >
        <div class="demo-area">
          <ul class="benefit-list">
            <li>
              <strong>快速上傳:</strong>
              綁定 input 元素，選完即上傳
            </li>
            <li>
              <strong>智慧過濾:</strong>
              自動過濾不符合規則的檔案，只上傳有效檔案
            </li>
            <li>
              <strong>完整驗證:</strong>
              大小、類型、數量批次驗證
            </li>
            <li>
              <strong>拖放支援:</strong>
              內建拖放上傳功能
            </li>
            <li>
              <strong>自動通知:</strong>
              成功、失敗、警告自動顯示訊息
            </li>
            <li>
              <strong>表單整合:</strong>
              自動封裝 FormData 與額外欄位
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { uploadFromInput } = useFileUpload()
// <input type='file' @change='e => uploadFromInput(e, options)' />"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection title="互動測試">
      <ShowcaseCard
        title="測試"
        description="檔案上傳區塊"
        full-width
      >
        <div class="demo-area">
          <!-- 上傳區域 -->
          <div
            class="upload-dropzone"
            :class="{ 'is-dragging': isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <input
              id="file-upload"
              type="file"
              multiple
              class="hidden"
              @change="handleFileSelect"
            />
            <label
              for="file-upload"
              class="dropzone-content"
            >
              <div class="icon-wrapper">☁️</div>
              <div class="text-main">點擊此處 或 將檔案拖曳至此</div>
              <div class="text-sub">支援各種格式圖片與文件</div>
            </label>
          </div>

          <!-- 設定 -->
          <div class="settings-bar">
            <div class="setting-group">
              <label>最大檔案:</label>
              <select
                v-model.number="maxFileSize"
                class="glass-input"
              >
                <option :value="1 * 1024 * 1024">1 MB</option>
                <option :value="5 * 1024 * 1024">5 MB</option>
                <option :value="10 * 1024 * 1024">10 MB</option>
              </select>
            </div>
            <div class="setting-group">
              <label>最大數量:</label>
              <input
                v-model.number="maxFilesCount"
                type="number"
                class="glass-input"
                min="1"
                max="10"
              />
            </div>
          </div>

          <!-- 檔案清單 -->
          <div
            v-if="selectedFiles.length > 0"
            class="file-list"
          >
            <div class="list-header">
              <h3>已選檔案 ({{ selectedFiles.length }})</h3>
              <div class="actions">
                <button
                  class="glass-btn small"
                  @click="handleValidateOnly"
                >
                  驗證
                </button>
                <button
                  class="glass-btn small primary"
                  :disabled="isUploading"
                  @click="handleUploadMultiple"
                >
                  {{ isUploading ? '上傳中...' : '全部上傳' }}
                </button>
                <button
                  class="glass-btn small danger"
                  @click="clearAll"
                >
                  清除
                </button>
              </div>
            </div>

            <!-- 驗證狀態 -->
            <div
              v-if="validationSummary"
              class="status-alert"
              :class="validationSummary.valid ? 'success' : 'error'"
            >
              <strong>
                {{ validationSummary.valid ? '✓ 準備上傳' : '⚠ 驗證失敗' }}
              </strong>
              <span
                v-if="!validationSummary.valid"
                class="ml-2"
              >
                {{ validationSummary.error }}
              </span>
            </div>

            <div class="files-grid">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="file-item"
              >
                <div class="file-icon">{{ getFileIcon(file) }}</div>
                <div class="file-details">
                  <div class="name">{{ file.name }}</div>
                  <div class="meta">{{ formatFileSize(file.size) }}</div>
                </div>
                <button
                  class="delete-btn"
                  @click="removeFile(index)"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- 結果 -->
          <div
            v-if="uploadResults.length > 0"
            class="results-area"
          >
            <h3>上傳結果</h3>
            <ShowcaseCodeBlock
              :code="JSON.stringify(uploadResults, null, 2)"
              language="json"
              label="伺服器回應"
            />
          </div>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection title="API 方法">
      <div class="component-grid">
        <!-- uploadFile -->
        <ShowcaseCard
          title="1. uploadFile"
          description="上傳單一檔案（一次傳一個）"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              上傳單一檔案，支援進度追蹤、自動驗證與錯誤處理。
            </p>
            <div class="param-list">
              <div class="param-item">
                <code>endpoint</code>
                <span>API 路徑（預設 '/api/upload'）</span>
              </div>
              <div class="param-item">
                <code>method</code>
                <span>HTTP 方法（預設 'POST'，可選 'PUT', 'PATCH'）</span>
              </div>
              <div class="param-item">
                <code>fieldName</code>
                <span>檔案欄位名稱（預設 'file'）</span>
              </div>
              <div class="param-item">
                <code>data</code>
                <span>額外資料（會一起送給後端）</span>
              </div>
              <div class="param-item">
                <code>globalLoading</code>
                <span>是否顯示全域 Loading（預設 false）</span>
              </div>
              <div class="param-item">
                <code>loadingRef</code>
                <span>自訂 Loading 狀態的 Ref</span>
              </div>

              <div class="param-item">
                <code>onSuccess</code>
                <span>成功後的回呼函式</span>
              </div>
              <div class="param-item">
                <code>onError</code>
                <span>失敗後的回呼函式</span>
              </div>
              <div class="param-item">
                <code>autoSuccess</code>
                <span>成功時自動顯示通知（預設 true）</span>
              </div>
              <div class="param-item">
                <code>autoError</code>
                <span>失敗時自動顯示通知（預設 true）</span>
              </div>
              <div class="param-item">
                <code>maxSize</code>
                <span>檔案大小限制（單位：bytes）</span>
              </div>
              <div class="param-item">
                <code>accept</code>
                <span>允許的檔案類型（如 ['image/*', '.pdf']）</span>
              </div>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { uploadFile } = useFileUpload()

// 最簡單用法（使用預設值）
await uploadFile(file)

// 自訂 API 路徑
await uploadFile(file, {
  endpoint: '/api/my-upload'
})

// 完整選項
await uploadFile(file, {
  endpoint: '/api/upload',
  data: { userId: 123 },
  maxSize: 5 * 1024 * 1024,  // 5MB
  accept: ['image/*'],
  onSuccess: (res) => console.log(res)
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- uploadFiles -->
        <ShowcaseCard
          title="2. uploadFiles"
          description="批次上傳多個檔案（一次傳多個）"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              一次上傳多個檔案，自動處理 FormData 封裝。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { uploadFiles } = useFileUpload()

await uploadFiles(fileArray, {
  endpoint: '/api/upload/multiple',
  maxSize: 10 * 1024 * 1024,
  accept: ['image/*', '.pdf']
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- uploadFromInput -->
        <ShowcaseCard
          title="3. uploadFromInput"
          description="從 Input 元素直接上傳"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              綁定到
              <code>&lt;input type="file"&gt;</code>
              ，選完即上傳。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { uploadFromInput } = useFileUpload()

// 在 template 中
<input 
  type='file' 
  @change='e => uploadFromInput(e, { 
    endpoint: '/api/upload',
    autoSuccess: true 
  })' 
/>"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- validate -->
        <ShowcaseCard
          title="4. validate"
          description="驗證單一檔案"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              檢查檔案大小、類型是否符合規則，不執行上傳。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { validate } = useFileUpload()

const result = validate(file, {
  maxSize: 5 * 1024 * 1024,  // 5MB
  accept: ['image/*', '.pdf']
})

if (!result.valid) {
  console.error(result.error)
}"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- validateMultiple -->
        <ShowcaseCard
          title="5. validateMultiple"
          description="驗證多個檔案"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              批次驗證檔案陣列，檢查數量、大小、類型。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { validateMultiple } = useFileUpload()

const result = validateMultiple(files, {
  maxFiles: 5,
  maxSize: 10 * 1024 * 1024,
  accept: ['image/*']
})

if (result.valid) {
  // 全部通過驗證
}"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- formatFileSize -->
        <ShowcaseCard
          title="6. formatFileSize"
          description="格式化檔案大小"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              將位元組數轉換為人類可讀的格式（KB、MB、GB）。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { formatFileSize } = useFileUpload()

formatFileSize(1024)        // '1 KB'
formatFileSize(1048576)     // '1 MB'
formatFileSize(5242880)     // '5 MB')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- getSelectedFiles -->
        <ShowcaseCard
          title="7. getSelectedFiles"
          description="從事件提取檔案"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              自動判斷 Input 或 Drag 事件，提取檔案陣列。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { getSelectedFiles } = useFileUpload()

// Input change 事件
const handleChange = (e) => {
  const files = getSelectedFiles(e)
  console.log(files)  // File[]
}

// Drag drop 事件
const handleDrop = (e) => {
  const files = getSelectedFiles(e)
  selectedFiles.value = files
}"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- uploadFromBase64 -->
        <ShowcaseCard
          title="8. uploadFromBase64"
          description="從 Base64 字串上傳"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              將 Base64 編碼的資料轉換為檔案並上傳（常用於圖片編輯、Canvas 匯出）。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { uploadFromBase64 } = useFileUpload()

// 從 Canvas 或圖片編輯器取得 Base64
const base64Data = canvas.toDataURL('image/png')

await uploadFromBase64(base64Data, 'screenshot.png', {
  endpoint: '/api/upload'
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- uploadFromBlob -->
        <ShowcaseCard
          title="9. uploadFromBlob"
          description="從 Blob 物件上傳"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              將 Blob 物件轉換為檔案並上傳（常用於錄音、錄影、API 回傳的二進位資料）。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { uploadFromBlob } = useFileUpload()

// 從 MediaRecorder 或其他來源取得 Blob
const blob = new Blob([audioData], { type: 'audio/wav' })

await uploadFromBlob(blob, 'recording.wav', {
  endpoint: '/api/upload'
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.upload-dropzone {
  border: 2px dashed rgba(148, 163, 184, 0.4);
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: rgba(30, 41, 59, 0.3);
  cursor: pointer;
  margin-bottom: 1.5rem;
  position: relative;
}

.upload-dropzone:hover,
.upload-dropzone.is-dragging {
  border-color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.1);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
}

.dropzone-content {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.2));
}

.text-main {
  font-size: 1.2rem;
  color: #f1f5f9;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.text-sub {
  color: #94a3b8;
  font-size: 0.9rem;
}

.hidden {
  display: none;
}

/* Settings Bar */
.settings-bar {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(15, 23, 42, 0.4);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.1);
}

.setting-group {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.setting-group label {
  color: #cbd5e1;
  font-size: 0.9rem;
  font-weight: 500;
}

.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

/* Glass Buttons */
.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.glass-btn:hover {
  background: rgba(51, 65, 85, 0.8);
  border-color: #94a3b8;
}

.glass-btn.primary {
  background: rgba(56, 189, 248, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
}

.glass-btn.primary:hover {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn.danger {
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.3);
  background: rgba(248, 113, 113, 0.1);
}

.glass-btn.danger:hover {
  background: rgba(248, 113, 113, 0.2);
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* File List */
.file-list {
  margin-top: 2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.list-header h3 {
  color: #f1f5f9;
  font-size: 1.1rem;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.status-alert {
  padding: 0.8rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.status-alert.success {
  background: rgba(22, 163, 74, 0.15);
  border: 1px solid rgba(22, 163, 74, 0.3);
  color: #4ade80;
}

.status-alert.error {
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #f87171;
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.file-item {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.file-icon {
  font-size: 1.8rem;
}

.file-details {
  flex: 1;
  overflow: hidden;
}

.name {
  color: #e2e8f0;
  font-weight: 500;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta {
  color: #94a3b8;
  font-size: 0.8rem;
  margin-top: 0.2rem;
}

.delete-btn {
  background: none;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: #2563eb;
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.action-btn.secondary {
  background: #64748b;
}

.action-btn.secondary:hover:not(:disabled) {
  background: #475569;
}

.action-btn.danger {
  background: #ef4444;
}

.action-btn.danger:hover:not(:disabled) {
  background: #dc2626;
}

/* Method Demos */
.method-demos {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-card {
  padding: 1.5rem;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #eee;
}

.demo-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: #2c3e50;
  font-family: 'Fira Code', monospace;
}

/* Animation */
.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

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

/* Benefit List - Consistent with other showcase pages */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
}

.benefit-list li {
  background: rgba(255, 255, 255, 0.03);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  flex: 1;
  min-width: 200px;
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.25rem;
  font-size: 1.1em;
}

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.method-desc strong {
  color: #38bdf8;
  font-weight: 600;
}

.method-desc code {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  color: #e2e8f0;
}

/* Parameter List */
.param-list {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.param-item {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-left: 2px solid #38bdf8;
  border-radius: 4px;
}

.param-item code {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 120px;
  flex-shrink: 0;
}

.param-item span {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
