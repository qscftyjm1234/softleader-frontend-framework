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
    title="彈窗管理系統 (Modal System)"
    description="完整的彈窗管理模組，提供統一彈窗控制、多層彈窗管理和確認對話框功能。支援 Promise 回傳與狀態追蹤。"
  >
    <!-- Interactive Demo -->
    <ShowcaseSection
      title="Interactive Playground (互動式演示)"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- Basic Usage -->
        <ShowcaseCard
          title="Basic & Alerts"
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

        <!-- Custom Modal -->
        <ShowcaseCard
          title="Custom Configuration"
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

        <!-- Multiple Modals -->
        <ShowcaseCard
          title="Multiple Modals"
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

    <!-- Usage Examples -->
    <ShowcaseSection
      title="Usage Examples (使用範例)"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="Common Methods"
          description="常用方法範例"
          full-width
        >
          <ShowcaseCodeBlock
            code="// 1. 引入 composable
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
})"
            label="Composition API"
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
</style>
