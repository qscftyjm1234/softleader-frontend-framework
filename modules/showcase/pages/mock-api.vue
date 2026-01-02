<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

// Upload
const uploadFile = ref<File | null>(null)
const uploadLoading = ref(false)
const uploadResult = ref<any>(null)

// Export
const exportFormat = ref('csv')
const exportLoading = ref(false)

// Report
const reportType = ref('monthly')
const reportLoading = ref(false)
const reportResult = ref<any>(null)

// Logs
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

// Upload Handler
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

// Export Handler
const handleExport = async () => {
  exportLoading.value = true

  try {
    const response = await $fetch(`/api/files/export?format=${exportFormat.value}`, {
      method: 'GET'
    })

    // Create Download
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

// Report Handler
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

const clearLogs = () => {
  apiLogs.value = []
}

definePageMeta({
  title: 'Mock API 管理',
  icon: 'mdi-web',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="Mock API 管理系統"
    description="展示專案中可用的 Mock API 端點，包含檔案上傳、資料匯出與報表生成功能。"
  >
    <!-- Available APIs -->
    <ShowcaseSection
      title="Available APIs (可用端點)"
      icon="📋"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="File Upload"
          description="/api/upload"
        >
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-800"
            >
              POST
            </span>
            <span class="text-sm font-mono text-slate-300">/api/upload</span>
          </div>
          <p class="text-sm text-slate-400">單檔案上傳測試端點</p>
        </ShowcaseCard>

        <ShowcaseCard
          title="Multiple Upload"
          description="/api/upload/multiple"
        >
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-800"
            >
              POST
            </span>
            <span class="text-sm font-mono text-slate-300">/api/upload/multiple</span>
          </div>
          <p class="text-sm text-slate-400">多檔案批次上傳端點</p>
        </ShowcaseCard>

        <ShowcaseCard
          title="File Export"
          description="/api/files/export"
        >
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-800"
            >
              GET
            </span>
            <span class="text-sm font-mono text-slate-300">/api/files/export</span>
          </div>
          <p class="text-sm text-slate-400">支援 CSV/JSON/XLSX 格式匯出</p>
        </ShowcaseCard>

        <ShowcaseCard
          title="Report Export"
          description="/api/reports/export"
        >
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-800"
            >
              POST
            </span>
            <span class="text-sm font-mono text-slate-300">/api/reports/export</span>
          </div>
          <p class="text-sm text-slate-400">PDF 報表匯出功能</p>
        </ShowcaseCard>

        <ShowcaseCard
          title="Generate Report"
          description="/api/reports/generate"
        >
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 rounded text-xs font-bold bg-green-900/40 text-green-400 border border-green-800"
            >
              POST
            </span>
            <span class="text-sm font-mono text-slate-300">/api/reports/generate</span>
          </div>
          <p class="text-sm text-slate-400">動態報表資料生成</p>
        </ShowcaseCard>

        <ShowcaseCard
          title="File Download"
          description="/api/file"
        >
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 rounded text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-800"
            >
              GET
            </span>
            <span class="text-sm font-mono text-slate-300">/api/file</span>
          </div>
          <p class="text-sm text-slate-400">通用檔案下載服務</p>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Tests -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- Upload Test -->
        <ShowcaseCard
          title="檔案上傳測試"
          description="測試檔案上傳 API"
        >
          <div class="flex flex-col gap-4">
            <input
              type="file"
              class="glass-input"
              @change="(e: any) => (uploadFile = e.target.files[0])"
            />
            <button
              class="glass-btn primary w-full"
              :disabled="uploadLoading || !uploadFile"
              @click="handleUpload"
            >
              {{ uploadLoading ? '上傳中...' : '上傳檔案' }}
            </button>
            <div v-if="uploadResult">
              <ShowcaseCodeBlock
                :code="JSON.stringify(uploadResult, null, 2)"
                language="json"
                label="Result"
              />
            </div>
          </div>
        </ShowcaseCard>

        <!-- Export Test -->
        <ShowcaseCard
          title="檔案匯出測試"
          description="測試不同格式匯出"
        >
          <div class="flex flex-col gap-4">
            <select
              v-model="exportFormat"
              class="glass-input"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xlsx">XLSX</option>
            </select>
            <button
              class="glass-btn primary w-full"
              :disabled="exportLoading"
              @click="handleExport"
            >
              {{ exportLoading ? '匯出中...' : '匯出檔案' }}
            </button>
          </div>
        </ShowcaseCard>

        <!-- Report Test -->
        <ShowcaseCard
          title="報表生成測試"
          description="測試報表資料生成"
        >
          <div class="flex flex-col gap-4">
            <select
              v-model="reportType"
              class="glass-input"
            >
              <option value="daily">每日報表</option>
              <option value="weekly">每週報表</option>
              <option value="monthly">每月報表</option>
            </select>
            <button
              class="glass-btn primary w-full"
              :disabled="reportLoading"
              @click="handleGenerateReport"
            >
              {{ reportLoading ? '生成中...' : '生成報表' }}
            </button>
            <div v-if="reportResult">
              <ShowcaseCodeBlock
                :code="JSON.stringify(reportResult, null, 2)"
                language="json"
                label="Result"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API Logs -->
    <ShowcaseSection
      title="API Logs (呼叫記錄)"
      icon="📝"
    >
      <div class="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
        <div
          class="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50"
        >
          <span class="text-sm font-semibold text-slate-300">Request History</span>
          <button
            class="glass-btn text-xs py-1 px-3"
            @click="clearLogs"
          >
            清除記錄
          </button>
        </div>

        <div class="logs-container max-h-[400px] overflow-y-auto p-4 space-y-3">
          <div
            v-if="apiLogs.length === 0"
            class="text-center text-slate-500 py-8"
          >
            尚無 API 呼叫記錄
          </div>
          <div
            v-for="(log, index) in apiLogs"
            :key="index"
            class="log-item p-3 rounded bg-slate-800/30 border border-slate-700/30 text-sm"
          >
            <div class="flex items-center gap-3 mb-2">
              <span class="text-slate-500 font-mono text-xs">{{ log.time }}</span>
              <span
                class="font-bold px-1.5 py-0.5 rounded text-xs"
                :class="
                  log.method === 'GET'
                    ? 'bg-blue-900/30 text-blue-400'
                    : 'bg-green-900/30 text-green-400'
                "
              >
                {{ log.method }}
              </span>
              <span class="font-mono text-slate-300 break-all">{{ log.url }}</span>
              <span
                class="ml-auto font-bold"
                :class="log.status === 'Success' ? 'text-green-400' : 'text-red-400'"
              >
                {{ log.status }}
              </span>
            </div>
            <div
              v-if="log.data"
              class="mt-2 bg-slate-950/50 p-2 rounded overflow-x-auto"
            >
              <pre class="text-xs text-slate-400 font-mono">{{
                JSON.stringify(log.data, null, 2)
              }}</pre>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- Code Examples -->
    <ShowcaseSection
      title="Code Examples (程式範例)"
      icon="💻"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="File Upload Usage"
          description="上傳檔案程式碼範例"
          full-width
        >
          <ShowcaseCodeBlock
            code="const formData = new FormData()
formData.append('file', file)

const response = await $fetch('/api/upload', {
  method: 'POST',
  body: formData
})"
            label="TypeScript"
          />
        </ShowcaseCard>

        <ShowcaseCard
          title="File Export Usage"
          description="匯出檔案程式碼範例"
          full-width
        >
          <ShowcaseCodeBlock
            code="const response = await $fetch('/api/files/export?format=csv', {
  method: 'GET'
})

// Build download link
const blob = new Blob([response], { type: 'text/csv' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'export.csv'
a.click()"
            label="TypeScript"
          />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  width: 100%;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 600;
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

.glass-btn.primary:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.glass-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Custom Scrollbar for logs */
.logs-container {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.3) rgba(15, 23, 42, 0.4);
}
</style>
