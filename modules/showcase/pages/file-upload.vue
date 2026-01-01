<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { uploadFiles, validate, validateMultiple, formatFileSize } = useFileUpload()

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
  icon: 'mdi-upload',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="檔案上傳系統 (File Upload System)"
    description="統一的檔案上傳處理模組，支援拖放上傳、檔案驗證與進度追蹤。"
  >
    <!-- General Usage -->
    <ShowcaseSection
      title="基礎用法"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="核心功能"
          description="全方位上傳解決方案"
          full-width
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>Smart Input:</strong>
                自動處理 `uploadFromInput`
              </li>
              <li>
                <strong>完整驗證:</strong>
                完整的大小、類型、數量驗證
              </li>
              <li>
                <strong>拖放支援:</strong>
                內建拖放支援
              </li>
              <li>
                <strong>表單資料:</strong>
                自動封裝與額外欄位處理
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
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="互動體驗區"
      icon="🚀"
    >
      <ShowcaseCard
        title="實時演示"
        description="互動式檔案上傳區塊"
        full-width
      >
        <div class="demo-area">
          <!-- Upload Area -->
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

          <!-- Settings -->
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

          <!-- File List -->
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

            <!-- Validation Status -->
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

          <!-- Results -->
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

    <!-- API Reference -->
    <ShowcaseSection
      title="API 方法"
      icon="📚"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. uploadFile"
          description="單檔上傳"
        >
          <template #footer>
            <ShowcaseCodeBlock
              code="uploadFile(file, { endpoint: '/api/upload', data: { id: 1 } })"
              label="方法簽名"
            />
          </template>
        </ShowcaseCard>
        <ShowcaseCard
          title="2. uploadFiles"
          description="多檔上傳"
        >
          <template #footer>
            <ShowcaseCodeBlock
              code="uploadFiles(files, { endpoint: '/api/multi', maxSize: 1024*1024 })"
              label="方法簽名"
            />
          </template>
        </ShowcaseCard>
        <ShowcaseCard
          title="3. uploadFromInput"
          description="Input 事件處理"
        >
          <template #footer>
            <ShowcaseCodeBlock
              code="uploadFromInput(event, { autoSuccess: true })"
              label="方法簽名"
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
</style>
