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
    // 使用真實的公開 PDF 進行演示
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
    title="檔案下載系統 (File Download System)"
    description="統一的檔案下載處理模組，支援多種下載方式與檔案類型。"
  >
    <!-- General Usage -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="基礎用法"
          description="最常見的情境：從 API 下載檔案。"
          full-width
        >
          <div class="demo-area">
            <ul class="benefit-list">
              <li>
                <strong>API Download:</strong>
                支援 GET/POST 與自訂 Headers
              </li>
              <li>
                <strong>Blob/Base64:</strong>
                支援前端生成的內容下載
              </li>
              <li>
                <strong>Auto MIME:</strong>
                自動偵測並設定正確的 MIME Type
              </li>
            </ul>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { downloadFromApi } = useFileDownload()
await downloadFromApi('/api/reports/export', { filename: 'report.xlsx' })"
              label="Composable Usage"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground"
      icon="🎮"
    >
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
              下載 PDF 範例
            </IButton>
            <div class="result-text">
              <span class="label">Method:</span>
              <span class="value">downloadFromUrl(url, options)</span>
            </div>
          </div>
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
            <div class="result-text">
              <span class="label">Method:</span>
              <span class="value">downloadFromApi(apiUrl, options)</span>
            </div>
          </div>
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
            <div class="result-text">
              <span class="label">Input Size:</span>
              <span class="value">{{ demoBase64.length }} chars</span>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 4. downloadFromText -->
        <ShowcaseCard
          title="4. downloadFromText"
          description="從文字內容建立並下載檔案。"
        >
          <div class="demo-area">
            <IButton
              variant="outlined"
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
        </ShowcaseCard>

        <!-- 5. downloadFromJson -->
        <ShowcaseCard
          title="5. downloadFromJson"
          description="從 JSON 物件建立並下載檔案。"
        >
          <div class="demo-area">
            <IButton
              variant="outlined"
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
        </ShowcaseCard>

        <!-- 6. downloadFromBlob -->
        <ShowcaseCard
          title="6. downloadFromBlob"
          description="從 Blob 物件下載檔案。"
        >
          <div class="demo-area">
            <IButton
              variant="outlined"
              class="w-full mb-4"
              @click="handleDownloadFromCanvas"
            >
              下載 Canvas 圖片
            </IButton>
            <div class="result-text">
              <span class="value">Sources: Canvas, Screenshot, Generated Content</span>
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Advanced Features -->
    <ShowcaseSection
      title="Advanced Features"
      icon="⚙️"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Loading 狀態管理"
          description="整合全域或局部 Loading 狀態。"
        >
          <template #footer>
            <ShowcaseCodeBlock
              code="// 全域 Loading
await downloadFromApi('/url', { globalLoading: true })

// 局部 Loading Ref
await downloadFromApi('/url', { loadingRef: myRef })"
              label="Configuration"
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
                <strong>autoError:</strong>
                自動顯示 Snackbar 錯誤
              </li>
              <li>
                <strong>onError:</strong>
                自訂錯誤回呼函數
              </li>
              <li>
                <strong>MIME:</strong>
                自動判斷 .pdf, .json, .png 等類型
              </li>
            </ul>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
/* Scoped styles mainly for specific tweaks, largely relying on global Showcase styles */
.w-full {
  width: 100%;
}
</style>
