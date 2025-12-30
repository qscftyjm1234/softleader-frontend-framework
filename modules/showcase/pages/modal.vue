<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const { open, close, closeAll, confirm, alert, modals, hasModal, modalCount } = useModal()

// Demo state
const customTitle = ref('自訂標題')
const customContent = ref('這是自訂的彈窗內容')
const confirmResult = ref('')
const alertResult = ref('')

const handleOpenBasic = async () => {
  const result = await open({
    title: '基本彈窗',
    content: '這是一個基本的彈窗範例'
  })
  confirmResult.value = `使用者選擇: ${result ? '確認' : '取消'}`
}

const handleOpenCustom = async () => {
  const result = await open({
    title: customTitle.value,
    content: customContent.value,
    confirmText: '好的',
    cancelText: '不要'
  })
  confirmResult.value = `使用者選擇: ${result ? '確認' : '取消'}`
}

const handleConfirm = async () => {
  const result = await confirm({
    title: '確認操作',
    content: '您確定要執行此操作嗎？'
  })
  confirmResult.value = `確認結果: ${result ? '已確認' : '已取消'}`
}

const handleAlert = async () => {
  await alert({
    title: '提示',
    content: '這是一個警告訊息'
  })
  alertResult.value = '警告已顯示並關閉'
}

const handleMultipleModals = async () => {
  open({
    title: '第一層彈窗',
    content: '這是第一層彈窗'
  })

  setTimeout(() => {
    open({
      title: '第二層彈窗',
      content: '這是第二層彈窗'
    })
  }, 500)

  setTimeout(() => {
    open({
      title: '第三層彈窗',
      content: '這是第三層彈窗'
    })
  }, 1000)
}

const modalStatus = computed(() => ({
  hasModal: hasModal.value,
  modalCount: modalCount.value,
  modals: modals.value.map((m) => ({
    id: m.id,
    title: m.config.title,
    isVisible: m.isVisible
  }))
}))

definePageMeta({
  title: '彈窗管理 (Modal)',
  icon: 'mdi-window-maximize'
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
        <h1 class="page-title">彈窗管理系統 (Modal System)</h1>
      </div>
      <p class="page-desc">
        完整的彈窗管理模組，提供統一彈窗控制、多層彈窗管理和確認對話框功能。
        <br />
        核心特色：Promise 回傳、多層管理、自訂配置、狀態追蹤。
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
          最常見的情境：顯示確認對話框並等待使用者回應。
          <br />
          使用
          <code>confirm</code>
          、
          <code>alert</code>
          方法快速建立對話框。
        </p>

        <div class="demo-grid">
          <div class="usage-block">
            <div class="block-header">Example Code</div>
            <div class="code-content">
              <pre><code>&lt;script setup&gt;
// 1. 引入 composable
const { confirm, alert, open } = useModal()

// 2. 確認對話框
const result = await confirm({
  title: '確認操作',
  content: '您確定要執行此操作嗎？'
})

if (result) {
  console.log('使用者已確認')
}

// 3. 警告對話框
await alert({
  title: '提示',
  content: '這是一個警告訊息'
})

// 4. 自訂彈窗
const customResult = await open({
  title: '自訂標題',
  content: '自訂內容',
  confirmText: '好的',
  cancelText: '不要'
})
&lt;/script&gt;</code></pre>
            </div>
          </div>

          <div class="output-block">
            <DataPreview
              title="彈窗狀態"
              :data="modalStatus"
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
          <!-- 1. Basic Modal -->
          <div class="demo-card">
            <h3 class="demo-title">1. 基本彈窗</h3>
            <p class="demo-desc">開啟基本彈窗並取得使用者回應。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 開啟基本彈窗
const result = await open({
  title: '基本彈窗',
  content: '這是一個基本的彈窗範例'
})

// result 為 true (確認) 或 false (取消)</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleOpenBasic"
                >
                  開啟基本彈窗
                </button>
                <div
                  v-if="confirmResult"
                  class="result-box"
                >
                  {{ confirmResult }}
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Confirm Dialog -->
          <div class="demo-card">
            <h3 class="demo-title">2. 確認對話框</h3>
            <p class="demo-desc">顯示確認對話框，常用於刪除、提交等操作。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 確認對話框
const confirmed = await confirm({
  title: '確認操作',
  content: '您確定要執行此操作嗎？'
})

if (confirmed) {
  // 執行操作
  console.log('使用者已確認')
}</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleConfirm"
                >
                  開啟確認對話框
                </button>
                <div
                  v-if="confirmResult"
                  class="result-box"
                >
                  {{ confirmResult }}
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Alert Dialog -->
          <div class="demo-card">
            <h3 class="demo-title">3. 警告對話框</h3>
            <p class="demo-desc">顯示警告訊息，只有確認按鈕。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 警告對話框
await alert({
  title: '提示',
  content: '這是一個警告訊息'
})

// 使用者點擊確認後繼續執行
console.log('警告已關閉')</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleAlert"
                >
                  開啟警告對話框
                </button>
                <div
                  v-if="alertResult"
                  class="result-box"
                >
                  {{ alertResult }}
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Custom Modal -->
          <div class="demo-card">
            <h3 class="demo-title">4. 自訂彈窗</h3>
            <p class="demo-desc">自訂彈窗的標題、內容和按鈕文字。</p>

            <div class="control-row mb-4">
              <label>標題:</label>
              <input
                v-model="customTitle"
                type="text"
                class="input-field"
                style="width: 200px"
              />
              <label>內容:</label>
              <input
                v-model="customContent"
                type="text"
                class="input-field"
                style="width: 300px"
              />
            </div>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 自訂彈窗
await open({
  title: '{{ customTitle }}',
  content: '{{ customContent }}',
  confirmText: '好的',
  cancelText: '不要',
  showCancel: true,
  closeOnMask: true
})</code></pre>
                </div>
              </div>
              <div class="output-block">
                <button
                  class="action-btn"
                  style="margin-top: 1rem"
                  @click="handleOpenCustom"
                >
                  開啟自訂彈窗
                </button>
              </div>
            </div>
          </div>

          <!-- 5. Multiple Modals -->
          <div class="demo-card">
            <h3 class="demo-title">5. 多層彈窗管理</h3>
            <p class="demo-desc">同時開啟多個彈窗，支援層疊顯示。</p>

            <div class="demo-grid">
              <div class="usage-block">
                <div class="block-header">Usage code</div>
                <div class="code-content">
                  <pre><code>// 開啟多個彈窗
open({ title: '第一層', content: '...' })
open({ title: '第二層', content: '...' })
open({ title: '第三層', content: '...' })

// 關閉最上層彈窗
close()

// 關閉所有彈窗
closeAll()</code></pre>
                </div>
              </div>
              <div class="output-block">
                <div class="button-group">
                  <button
                    class="action-btn"
                    @click="handleMultipleModals"
                  >
                    開啟多層彈窗
                  </button>
                  <button
                    class="action-btn danger"
                    @click="closeAll"
                  >
                    關閉所有彈窗
                  </button>
                </div>
                <DataPreview
                  title="彈窗狀態"
                  :data="modalStatus"
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

.action-btn:hover {
  opacity: 0.9;
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
