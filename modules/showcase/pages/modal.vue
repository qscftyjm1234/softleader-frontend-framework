<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { open, closeAll, confirm, alert, modals, hasModal, modalCount } = useModal()

// 演示狀態
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
  icon: 'mdi-window-maximize',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="彈窗管理系統"
    description="完整的彈窗管理模組，提供統一彈窗控制、多層彈窗管理和確認對話框功能。支援 Promise 回傳與狀態追蹤。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="彈窗管理的核心特色"
        full-width
      >
        <div class="demo-area">
          <p
            class="method-desc"
            style="margin-bottom: 1.5rem"
          >
            <strong>可用方法：</strong>
          </p>
          <ShowcaseCodeBlock
            code="const {
  // 彈窗方法
  open,        // 開啟自訂彈窗
  confirm,     // 確認對話框
  alert,       // 警告對話框
  closeAll,    // 關閉所有彈窗
  
  // 狀態追蹤
  modals,      // 所有彈窗列表
  hasModal,    // 是否有彈窗開啟
  modalCount   // 彈窗數量
} = useModal()"
            label="useModal() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>Promise 回傳:</strong>
              支援 async/await，輕鬆處理使用者選擇
            </li>
            <li>
              <strong>多層堆疊:</strong>
              自動管理多個彈窗的顯示順序
            </li>
            <li>
              <strong>狀態追蹤:</strong>
              即時追蹤所有彈窗的開啟狀態
            </li>
            <li>
              <strong>自訂內容:</strong>
              靈活設定標題、內容、按鈕文字
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { open, confirm, alert } = useModal()

// 快速使用
await confirm({ title: '確認', content: '確定執行？' })"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 互動測試 -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- 基本彈窗 -->
        <ShowcaseCard
          title="1. 基本彈窗"
          description="基本彈窗與警告對話框"
        >
          <div class="flex flex-col gap-3">
            <button
              class="glass-btn primary"
              @click="handleOpenBasic"
            >
              開啟基本彈窗
            </button>
            <button
              class="glass-btn"
              @click="handleAlert"
            >
              開啟警告對話框
            </button>
            <button
              class="glass-btn"
              @click="handleConfirm"
            >
              開啟確認對話框
            </button>
            <div
              v-if="confirmResult || alertResult"
              class="p-3 bg-slate-900/40 border border-slate-700/20 rounded-md text-slate-400 text-sm text-center"
            >
              <div v-if="confirmResult">{{ confirmResult }}</div>
              <div v-if="alertResult">{{ alertResult }}</div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- 自訂彈窗 -->
        <ShowcaseCard
          title="2. 自訂彈窗"
          description="自訂彈窗內容與按鈕"
        >
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs text-slate-400 block">標題</label>
              <input
                v-model="customTitle"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs text-slate-400 block">內容</label>
              <input
                v-model="customContent"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <button
              class="glass-btn primary w-full"
              @click="handleOpenCustom"
            >
              開啟自訂彈窗
            </button>
          </div>
        </ShowcaseCard>

        <!-- 多層彈窗 -->
        <ShowcaseCard
          title="3. 多層彈窗"
          description="多層彈窗堆疊管理"
          full-width
        >
          <div class="flex gap-4 items-start">
            <div class="flex flex-col gap-3 w-48">
              <button
                class="glass-btn primary"
                @click="handleMultipleModals"
              >
                開啟多層彈窗
              </button>
              <button
                class="glass-btn danger"
                @click="closeAll"
              >
                關閉所有彈窗
              </button>
            </div>
            <div class="flex-1">
              <ShowcaseCodeBlock
                :code="JSON.stringify(modalStatus, null, 2)"
                language="json"
                label="Modal Status Store"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <!-- open() -->
        <ShowcaseCard
          title="1. open()"
          description="開啟自訂彈窗"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              開啟一個可自訂的彈窗，支援確認/取消按鈕。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { open } = useModal()

const result = await open({
  title: '自訂標題',
  content: '自訂內容',
  confirmText: '確定',
  cancelText: '取消'
})

if (result) {
  console.log('使用者點擊確定')
} else {
  console.log('使用者點擊取消')
}"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- confirm() -->
        <ShowcaseCard
          title="2. confirm()"
          description="確認對話框"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              快速開啟確認對話框，預設按鈕為「確認」和「取消」。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { confirm } = useModal()

const result = await confirm({
  title: '確認操作',
  content: '您確定要刪除此項目嗎？'
})

if (result) {
  // 執行刪除
  deleteItem()
}"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- alert() -->
        <ShowcaseCard
          title="3. alert()"
          description="警告對話框"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              顯示警告訊息，只有一個「確定」按鈕。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { alert } = useModal()

await alert({
  title: '提示',
  content: '操作已完成！'
})

console.log('使用者已關閉警告')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- closeAll() -->
        <ShowcaseCard
          title="4. closeAll()"
          description="關閉所有彈窗"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              一次關閉所有開啟的彈窗（用於多層彈窗情境）。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { closeAll } = useModal()

// 開啟多個彈窗後
open({ title: '彈窗 1', content: '...' })
open({ title: '彈窗 2', content: '...' })
open({ title: '彈窗 3', content: '...' })

// 一次全部關閉
closeAll()"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <!-- 狀態追蹤 -->
        <ShowcaseCard
          title="5. 狀態追蹤"
          description="即時追蹤彈窗狀態"
          full-width
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>用途：</strong>
              取得目前所有彈窗的狀態資訊。
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="const { hasModal, modalCount, modals } = useModal()

// hasModal: 是否有彈窗開啟
console.log(hasModal.value)  // true/false

// modalCount: 彈窗數量
console.log(modalCount.value)  // 0, 1, 2...

// modals: 所有彈窗的詳細資訊
console.log(modals.value)  // [{ id, config, isVisible }]"
              label="使用範例"
            />
          </template>
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
  padding: 0.6rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
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
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  color: #ef4444;
}

.glass-btn.danger:hover {
  background: rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
}

/* Benefit List */
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

/* Method Description */
.method-desc {
  color: #cbd5e1;
  font-size: 0.95rem;
  line-height: 1.7;
  margin: 0;
}
</style>
