<script setup lang="ts">
import { ref } from 'vue'

const files = ref<File[]>([])
const dragging = ref(false)

const handleDrop = (e: DragEvent) => {
  dragging.value = false
  if (e.dataTransfer?.files) {
    files.value = [...files.value, ...Array.from(e.dataTransfer.files)]
  }
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    files.value = [...files.value, ...Array.from(input.files)]
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return '🖼️'
  if (file.type.startsWith('video/')) return '🎥'
  if (file.type.includes('pdf')) return '📄'
  return '📁'
}

definePageMeta({
  title: '媒體上傳 (Media)',
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
        <h1 class="page-title">媒體上傳 (Media Upload)</h1>
      </div>
      <p class="page-desc">檔案上傳展示區，包含拖放 (Drag & Drop) 與即時預覽功能。</p>
    </div>

    <!-- Upload Area -->
    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🚀</span>
        File Drop Zone (上傳區)
      </h2>
      <div class="card-content">
        <div
          class="upload-area"
          :class="{ dragging }"
          @dragover.prevent="dragging = true"
          @dragleave.prevent="dragging = false"
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
      </div>
    </section>

    <!-- Preview Area -->
    <section
      v-if="files.length > 0"
      class="module-section mt-8"
    >
      <h2 class="section-title">
        <span class="icon">👀</span>
        Preview & Management (預覽與管理)
      </h2>
      <div class="card-content">
        <div class="file-grid">
          <div
            v-for="(file, index) in files"
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
              <div class="file-meta">{{ (file.size / 1024).toFixed(1) }} KB</div>
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

/* Upload Area Styles */
.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  cursor: default;
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
</style>
