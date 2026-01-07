<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import IButton from '@/components/uiInterface/IButton.vue'
import { useFileDownload } from '~/composables/useFileDownload'

const {
  downloadFromUrl,
  downloadFromApi,
  downloadFromBase64,
  downloadFromBlob,
  downloadFromText,
  downloadFromJson
} = useFileDownload()

// 載入狀態
const isDownloadingUrl = ref(false)
const isDownloadingApi = ref(false)
const isDownloadingBase64 = ref(false)

// 演示資料
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

// 動作處理程式
const handleDownloadFromUrl = async () => {
  isDownloadingUrl.value = true
  try {
    // 使用JPG
    await downloadFromUrl(
      'https://images.pexels.com/photos/5462207/pexels-photo-5462207.jpeg?w=600&h=500&dpr=1',
      {
        filename: 'sample.jpg',
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
    // 這是演示 - 請替換為您實際的 API 端點
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
  icon: 'mdi-download',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="檔案下載系統"
    description="統一的檔案下載處理模組，支援多種下載方式與檔案類型。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <div class="component-grid">
        <ShowcaseCard
          title="基礎用法"
          description="最常見的情境：從 API 下載檔案。"
          full-width
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>API 下載:</strong>
                支援 GET/POST 與自訂 Headers
              </li>
              <li>
                <strong>多元來源:</strong>
                支援 Blob、Base64、文字、JSON
              </li>
              <li>
                <strong>自動偵測:</strong>
                自動判斷 MIME 類型（.pdf, .json, .png 等）
              </li>
            </ul>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromApi } = useFileDownload()
await downloadFromApi('/api/reports/export', { filename: 'report.xlsx' })"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection title="互動測試">
      <div class="component-grid">
        <!-- 1. downloadFromUrl -->
        <ShowcaseCard
          title="1. downloadFromUrl"
          description="從外部 URL 下載檔案。"
        >
          <div class="demo-area">
            <IButton
              :loading="isDownloadingUrl"
              class="w-full mb-4"
              @click="handleDownloadFromUrl"
            >
              下載 JPG 範例
            </IButton>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromUrl } = useFileDownload()

await downloadFromUrl(
  'https://images.pexels.com/photos/5462207/pexels-photo-5462207.jpeg?w=600&h=500&dpr=1',
  {
    filename: 'document.pdf',
    autoSuccess: true
  }
)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 1-2. 下載靜態圖片 -->
        <ShowcaseCard
          title="1-2. 下載靜態圖片"
          description="從前端 public 資料夾下載靜態檔案。"
        >
          <div class="demo-area">
            <IButton
              class="w-full mb-4"
              @click="
                () => downloadFromUrl('/favicon.jpg', { filename: 'logo.jpg', autoSuccess: true })
              "
            >
              下載網站 Logo
            </IButton>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromUrl } = useFileDownload()

// 下載 public 資料夾中的靜態檔案
await downloadFromUrl('/favicon.jpg', {
  filename: 'logo.jpg',
  autoSuccess: true
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 2. downloadFromApi -->
        <ShowcaseCard
          title="2. downloadFromApi"
          description="從 API 下載檔案（支援 GET/POST）。"
        >
          <div class="demo-area">
            <IButton
              :loading="isDownloadingApi"
              class="w-full mb-4"
              @click="handleDownloadFromApi"
            >
              從 API 下載
            </IButton>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromApi } = useFileDownload()

await downloadFromApi('/api/reports/export', {
  filename: 'report.xlsx',
  method: 'POST',
  data: { year: 2024 },
  autoSuccess: true
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 3. downloadFromBase64 -->
        <ShowcaseCard
          title="3. downloadFromBase64"
          description="從 Base64 字串下載檔案。"
        >
          <div class="demo-area">
            <IButton
              :loading="isDownloadingBase64"
              class="w-full mb-4"
              @click="handleDownloadFromBase64"
            >
              下載 Base64 圖片
            </IButton>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromBase64 } = useFileDownload()

const base64 = 'data:image/png;base64,iVBORw0KG...'

downloadFromBase64(base64, 'image.png', {
  autoSuccess: true
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 4. downloadFromText -->
        <ShowcaseCard
          title="4. downloadFromText"
          description="從文字內容建立並下載檔案。"
        >
          <div class="demo-area">
            <IButton
              class="w-full mb-4"
              @click="handleDownloadFromText"
            >
              下載文字檔案
            </IButton>
            <div class="result-text">
              <div style="font-size: 0.8rem; opacity: 0.7; white-space: pre-wrap">
                {{ demoTextContent }}
              </div>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromText } = useFileDownload()

const content = '這是文字內容\n多行文字'

downloadFromText(content, 'note.txt', {
  autoSuccess: true
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 5. downloadFromJson -->
        <ShowcaseCard
          title="5. downloadFromJson"
          description="從 JSON 物件建立並下載檔案。"
        >
          <div class="demo-area">
            <IButton
              class="w-full mb-4"
              @click="handleDownloadFromJson"
            >
              下載 JSON 檔案
            </IButton>
            <ShowcaseCodeBlock
              :code="JSON.stringify(demoJsonData, null, 2)"
              language="json"
              label="Data Preview"
              :max-height="100"
            />
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromJson } = useFileDownload()

const data = {
  name: '測試資料',
  items: [{ id: 1, value: 100 }]
}

downloadFromJson(data, 'data.json', {
  autoSuccess: true
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 6. downloadFromBlob -->
        <ShowcaseCard
          title="6. downloadFromBlob"
          description="從 Blob 物件下載檔案。"
        >
          <div class="demo-area">
            <IButton
              class="w-full mb-4"
              @click="handleDownloadFromCanvas"
            >
              下載 Canvas 圖片
            </IButton>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromBlob } = useFileDownload()

// 從 Canvas 取得 Blob
canvas.toBlob((blob) => {
  downloadFromBlob(blob, 'canvas.png', {
    autoSuccess: true
  })
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 進階功能 -->
    <ShowcaseSection
      title="進階功能"
      icon="⚙️"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Loading 狀態管理"
          description="整合全域或局部 Loading 狀態。"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>相依模組：</strong>
            </p>
            <ul class="benefit-list">
              <li>
                <strong>useLoading:</strong>
                全域 Loading 狀態管理
              </li>
              <li>
                <strong>useNotify:</strong>
                成功/失敗訊息通知
              </li>
            </ul>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromApi } = useFileDownload()
const isDownloading = ref(false)

// 方式 1：全域 Loading（整個畫面遮罩）
await downloadFromApi('/api/export', { 
  globalLoading: true  // 使用 useLoading()
})

// 方式 2：局部 Loading（只有按鈕 loading）
await downloadFromApi('/api/export', { 
  loadingRef: isDownloading  // 自訂 ref
})

// 方式 3：兩者都不用（無 loading 效果）
await downloadFromApi('/api/export')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="錯誤處理與 MIME"
          description="自動錯誤提示與類型偵測。"
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>自動通知:</strong>
                失敗時自動顯示錯誤訊息
              </li>
              <li>
                <strong>錯誤回呼:</strong>
                可自訂錯誤處理函式
              </li>
              <li>
                <strong>類型偵測:</strong>
                根據副檔名自動設定 MIME Type
              </li>
            </ul>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title="取得下載資訊"
          description="透過回呼函式取得下載結果。"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>可取得的資訊：</strong>
            </p>
            <ul class="benefit-list">
              <li>
                <strong>onSuccess:</strong>
                下載成功時回傳檔案名稱
              </li>
              <li>
                <strong>onError:</strong>
                下載失敗時回傳錯誤物件
              </li>
            </ul>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromUrl } = useFileDownload()

await downloadFromUrl(url, {
  filename: 'report.pdf',
  onSuccess: (filename) => {
    console.log('✓ 下載成功！')
    console.log('檔名:', filename)
    // 可以在這裡做後續處理
  },
  onError: (error) => {
    console.error('✗ 下載失敗:', error.message)
    // 可以在這裡做錯誤處理
  }
})"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API Reference -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="API 詳細說明"
        description="useFileDownload() 回傳方法列表"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供多種檔案下載與匯出方式，自動處理 MIME Type 與檔名編碼。
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  方法名稱 (Name)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  型別 (Type)
                </th>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm w-full"
                >
                  說明 (Description)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/50">
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  downloadFromUrl(url, opts)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  從外部 URL 用戶端直接下載檔案。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  downloadFromApi(url, opts)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  透過 API 請求 (GET/POST) 下載檔案，支援 Auth Token。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  downloadFromBase64(str, name)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  將 Base64 字串轉換為檔案下載。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  downloadFromBlob(blob, name)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  直接下載 Blob 物件。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  downloadFromText(text, name)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  建立文字檔 (.txt) 並下載。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  downloadFromJson(obj, name)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  將物件轉換為 JSON 檔並下載。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Scoped styles mainly for specific tweaks, largely relying on global Showcase styles */
.w-full {
  width: 100%;
}

/* Benefit List - Enhanced styling */
.benefit-list {
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin: 0;
}

.benefit-list li {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  font-size: 0.95rem;
  line-height: 1.7;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.benefit-list li::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.benefit-list li:hover {
  border-color: rgba(56, 189, 248, 0.3);
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.08) 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.15);
}

.benefit-list li:hover::before {
  opacity: 1;
}

.benefit-list li strong {
  color: #38bdf8;
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.3px;
}
</style>
