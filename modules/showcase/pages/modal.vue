<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import EmailInput from '~/components/uiBusiness/EmailInput.vue'
import IModal from '~/components/uiInterface/IModal.vue'
import { markRaw } from 'vue'

const { open, closeAll, confirm, alert, modals, hasModal, modalCount } = useModal()

// 演示狀態
const customTitle = ref('自訂標題')
const customContent = ref('這是自訂的彈窗內容')
const confirmResult = ref('')
const alertResult = ref('')

// 局部彈窗狀態
// const showLocalModal = ref(false) // Removed

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

const handleOpenComponent = async () => {
  console.log('Opening Component Modal')
  // 使用 markRaw 避免 Vue 將組件本身變為響應式 (效能優化)
  const result = await open({
    title: '元件插入測試',
    content: '下方是一個動態插入的 EmailInput 元件：',
    component: markRaw(EmailInput),
    componentProps: {
      placeholder: '我是被插入的元件...',
      corporateOnly: true
    }
  })
  confirmResult.value = `含元件的彈窗結果: ${result ? '確認' : '取消'}`
}

// 局部彈窗狀態 (使用 Ref)
const localModalRef = ref()

const handleLocalModalOpen = async () => {
  console.log('Opening Local Modal via Ref')
  const result = await localModalRef.value.confirm({
    title: '局部彈窗 (Promise)'
  })
  confirmResult.value = `局部彈窗選擇: ${result ? '確認' : '取消'}`
}

import PolicyForm from '~/components/uiBusiness/PolicyForm.vue'

// 模擬現有保單列表 (用於 Demo Pattern 1 Table)
// 模擬資料列表 1 (Pattern 1: 內聚模式 - 組件負責存檔)
const policyList1 = ref([
  {
    id: 1,
    policyNo: 'POL-888888',
    applicant: '陳大文',
    planType: 'life',
    effectiveDate: '2024-01-01'
  },
  {
    id: 2,
    policyNo: 'POL-666666',
    applicant: '林小英',
    planType: 'medical',
    effectiveDate: '2023-05-20'
  }
])

// 模擬資料列表 2 (Pattern 2: 外據模式 - 父層負責存檔)
const policyList2 = ref([
  {
    id: 3,
    policyNo: 'POL-123456',
    applicant: '張三豐',
    planType: 'accident',
    effectiveDate: '2023-11-15'
  },
  {
    id: 4,
    policyNo: 'POL-777777',
    applicant: '李四',
    planType: 'investment',
    effectiveDate: '2024-02-01'
  }
])

// Pattern 1 Handler: 內聚模式
const handleEditPattern1 = async (item: any) => {
  const initialData = { ...item }

  const isConfirmed = await open({
    title: `編輯保單 (內聚: ${item.applicant})`,
    component: markRaw(PolicyForm),
    componentProps: {
      initialData, // 傳入初始值
      // Pattern 1 關鍵：提供 onSaved 回呼
      onSaved: (newData: any) => {
        const index = policyList1.value.findIndex((p) => p.id === item.id)
        if (index !== -1) {
          policyList1.value[index] = { ...item, ...newData }
          console.log('[Pattern 1] 列表已刷新:', newData)
        }
      }
    },
    confirmText: '儲存變更 (由組件處理)',
    cancelText: '取消'
  })

  // 這裡不需要做存檔邏輯，只負責顯示結果
  if (isConfirmed) {
    confirmResult.value = `Pattern 1 編輯結束`
  }
}

// Pattern 2 Handler: 外聚模式
const handleEditPattern2 = async (item: any) => {
  // 1. 準備 Reactive 物件 (作為與組件溝通的橋樑)
  const formData = reactive({ ...item })

  const isConfirmed = await open({
    title: `編輯保單 (外據: ${item.applicant})`,
    component: markRaw(PolicyForm),
    componentProps: {
      formData // Pattern 2 關鍵：傳入 Reactive 容器
    },
    confirmText: '確認修改 (由父層存檔)',
    cancelText: '取消'
  })

  // 2. 父層負責處理結果與存檔
  if (isConfirmed) {
    console.log('[Pattern 2] 父層收到資料，開始存檔...', formData)

    // 模擬 API 呼叫
    confirmResult.value = 'Pattern 2: 父層存檔中...'
    await new Promise((r) => setTimeout(r, 800))

    // 更新列表
    const index = policyList2.value.findIndex((p) => p.id === item.id)
    if (index !== -1) {
      policyList2.value[index] = { ...item, ...formData }
    }

    confirmResult.value = `Pattern 2: 存檔成功 (${formData.applicant})`
  }
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
    <ShowcaseSection title="互動測試 & 實戰範例">
      <div class="space-y-12">
        <!-- 1. 基本彈窗 (Basic Modal) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Demo -->
          <ShowcaseCard title="1. 基本彈窗 (Basic)">
            <div class="flex flex-col gap-4">
              <div class="text-sm text-slate-400">
                最基礎的彈窗使用方式，包含 Confirm 與 Alert。
              </div>
              <div class="flex flex-wrap gap-3">
                <button
                  class="glass-btn primary"
                  @click="handleOpenBasic"
                >
                  基本彈窗
                </button>
                <button
                  class="glass-btn danger"
                  @click="handleAlert"
                >
                  警告 Alert
                </button>
                <button
                  class="glass-btn glass-btn"
                  @click="handleConfirm"
                >
                  確認 Confirm
                </button>
              </div>
              <!-- 結果顯示 -->
              <div
                v-if="confirmResult || alertResult"
                class="p-3 bg-slate-900/50 border border-slate-700/30 rounded-lg text-emerald-400 text-sm font-mono text-center"
              >
                {{ confirmResult || alertResult }}
              </div>
            </div>
          </ShowcaseCard>

          <!-- Code -->
          <div class="space-y-2 h-full flex flex-col">
            <ShowcaseCodeBlock
              code="// 1. 使用 Composable
const { open, confirm, alert } = useModal()

// 2. 基本開啟
const handleOpen = async () => {
  const result = await open({
    title: '基本彈窗',
    content: '這是一個基本的彈窗範例'
  })
}

// 3. 確認對話框 (回傳 boolean)
const handleConfirm = async () => {
  const isConfirmed = await confirm({
    title: '確認操作',
    content: '確定要執行嗎？'
  })
  if (isConfirmed) {
    // User clicked Confirm
  }
}"
              language="typescript"
              :lines="false"
              class="flex-1"
            />
          </div>
        </div>

        <!-- 2. 自訂彈窗 (Custom Modal) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Demo -->
          <ShowcaseCard title="2. 自訂標題與內容">
            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label class="text-xs text-slate-400 font-bold uppercase">Modal Title</label>
                <input
                  v-model="customTitle"
                  type="text"
                  class="glass-input"
                  placeholder="輸入標題..."
                />
              </div>
              <div class="flex flex-col gap-2">
                <label class="text-xs text-slate-400 font-bold uppercase">Modal Content</label>
                <input
                  v-model="customContent"
                  type="text"
                  class="glass-input"
                  placeholder="輸入內容..."
                />
              </div>
              <div class="pt-2">
                <button
                  class="glass-btn primary w-full"
                  @click="handleOpenCustom"
                >
                  開啟自訂彈窗
                </button>
              </div>
            </div>
          </ShowcaseCard>

          <!-- Code -->
          <div class="space-y-2 h-full flex flex-col">
            <ShowcaseCodeBlock
              code="const handleCustom = async () => {
  await open({
    // 支援動態 Reactive 資料
    title: customTitle.value,
    content: customContent.value,
    
    // 自訂按鈕文字
    confirmText: '好的',
    cancelText: '不要'
  })
}"
              language="typescript"
              :lines="false"
              class="flex-1"
            />
          </div>
        </div>

        <!-- 多層彈窗 -->
        <!-- 3. 多層彈窗 (Stacked Modals) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Demo -->
          <ShowcaseCard title="3. 多層彈窗 (Stacking)">
            <div class="flex flex-col gap-4">
              <div class="text-sm text-slate-400">
                自動管理多個彈窗的堆疊順序 (z-index)，支援程式化關閉。
              </div>
              <div class="flex gap-4 items-start">
                <div class="flex flex-col gap-3 shrink-0">
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
                    關閉所有
                  </button>
                </div>
                <div class="flex-1 min-w-0">
                  <div
                    class="bg-slate-950/50 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 overflow-hidden"
                  >
                    <div class="flex justify-between mb-2">
                      <span class="font-bold text-slate-500">系統狀態</span>
                      <span
                        v-if="modalStatus.hasModal"
                        class="text-emerald-500"
                      >
                        運作中
                      </span>
                      <span
                        v-else
                        class="text-slate-600"
                      >
                        閒置
                      </span>
                    </div>
                    <pre>{{ JSON.stringify(modalStatus, null, 2) }}</pre>
                  </div>
                </div>
              </div>
            </div>
          </ShowcaseCard>

          <!-- Code -->
          <div class="space-y-2 h-full flex flex-col">
            <ShowcaseCodeBlock
              code="// 開啟多層彈窗 (自動堆疊)
open({ title: '第一層', content: 'Base Modal' })

setTimeout(() => {
  open({ title: '第二層', content: 'Stacked Modal' })
}, 500)

// 取得狀態
const { 
  modals,      // 彈窗佇列
  hasModal,    // 是否有開啟
  modalCount,  // 數量
  closeAll     // 強制關閉所有
} = useModal()"
              language="typescript"
              :lines="false"
              class="flex-1"
            />
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 進階應用 -->
    <ShowcaseSection title="進階應用">
      <div class="space-y-12">
        <!-- 4. 動態元件插入 (Slot) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Demo -->
          <ShowcaseCard title="4. 動態元件插入 (Slot)">
            <div class="flex flex-col gap-4">
              <div class="text-sm text-slate-400">
                透過
                <code>component</code>
                參數，將任意 Vue 元件動態注入到彈窗內容區。
              </div>
              <div class="p-4 bg-slate-950/50 rounded-lg border border-slate-800/50 border-dashed">
                <div class="text-xs text-slate-500 mb-2 uppercase font-bold">元件預覽</div>
                <div class="flex items-center gap-2 text-emerald-400">
                  <span class="i-mdi-puzzle-outline text-lg"></span>
                  <span>EmailInput.vue</span>
                </div>
              </div>
              <button
                class="glass-btn primary w-full"
                @click="handleOpenComponent"
              >
                開啟含元件彈窗
              </button>
            </div>
          </ShowcaseCard>

          <!-- Code -->
          <div class="space-y-2 h-full flex flex-col">
            <ShowcaseCodeBlock
              code="// Import Component
import EmailInput from '@/components/EmailInput.vue'

// Open with Component
open({
  title: '元件插入測試',
  // 使用 markRaw 避免非必要的響應式開銷
  component: markRaw(EmailInput),
  
  // 傳入 Props 給元件
  componentProps: {
    placeholder: '我是被插入的元件...',
    corporateOnly: true
  }
})"
              language="typescript"
              :lines="false"
              class="flex-1"
            />
          </div>
        </div>

        <!-- 5. 局部彈窗 (Local Modal) -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <!-- Demo -->
          <ShowcaseCard title="5. 局部彈窗 (Local)">
            <div class="flex flex-col gap-4">
              <div class="text-sm text-slate-400">
                不透過 Global State，直接在頁面使用
                <code>&lt;IModal&gt;</code>
                並使用 Template Ref 控制，適合簡單或獨立情境。
              </div>
              <button
                class="glass-btn primary w-full"
                @click="handleLocalModalOpen"
              >
                開啟局部彈窗 (Via Ref)
              </button>
            </div>
          </ShowcaseCard>

          <!-- Code -->
          <div class="space-y-2 h-full flex flex-col">
            <ShowcaseCodeBlock
              code="<!-- Template -->
<IModal ref='localModalRef' />

<!-- Script -->
const localModalRef = ref()

const handleOpen = async () => {
  // 直接呼叫元件方法 (Promise based)
  const result = await localModalRef.value.confirm({
    title: '局部彈窗',
    content: '這是獨立的實例'
  })
}"
              language="typescript"
              :lines="false"
              class="flex-1"
            />
          </div>
        </div>
      </div>
    </ShowcaseSection>

    <!-- 實戰：新增保單 -->
    <ShowcaseCard
      title="6. 實戰：新增保單"
      description="整合 ITextField, ISelect 等模組的複雜表單"
      full-width
    >
      <div class="flex flex-col gap-4">
        <!-- Pattern 1: 內聚模式列表 -->
        <div class="mb-8">
          <!-- Pattern 1: 內聚模式 (Internal Cohesion) -->
          <div class="space-y-4">
            <!-- Feature Block Header -->
            <div
              class="p-4 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-4"
            >
              <div class="shrink-0 p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-emerald-400 mb-1">
                  Pattern 1: 內聚模式 (Internal)
                </h4>
                <p class="text-sm text-slate-400">
                  組件自己負責 API 與驗證。父層只負責傳入
                  <code>initialData</code>
                  並監聽
                  <code>onSaved</code>
                  來刷新列表。
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <!-- Demo Column -->
              <div class="space-y-2">
                <div class="flex justify-between items-center px-1">
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    範例展示
                  </span>
                </div>

                <!-- Table -->
                <div
                  class="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-sm"
                >
                  <table class="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr class="bg-slate-950 border-b border-slate-800">
                        <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase">
                          保單號碼
                        </th>
                        <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase">
                          狀態
                        </th>
                        <th
                          class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase text-right"
                        >
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800">
                      <tr
                        v-for="item in policyList1"
                        :key="item.id"
                        class="group hover:bg-slate-800/50"
                      >
                        <td class="py-3 px-4 font-mono text-emerald-400">
                          {{ item.policyNo }}
                        </td>
                        <td class="py-3 px-4 text-slate-300">
                          <span
                            class="px-2 py-0.5 rounded text-xs border border-white/10 bg-white/5"
                          >
                            {{ item.applicant }}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-right">
                          <button
                            class="text-xs font-medium text-emerald-400 bg-emerald-400/10 hover:bg-emerald-500 hover:text-white px-3 py-1.5 rounded transition-all border border-emerald-400/20"
                            @click="handleEditPattern1(item)"
                          >
                            內聚編輯
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-[10px] text-slate-500 px-1">
                  * 點擊編輯按鈕，體驗組件內部的驗證邏輯
                </div>
              </div>

              <!-- Code Column -->
              <div class="space-y-2 h-full flex flex-col">
                <div class="flex justify-end items-center px-1">
                  <a
                    href="#"
                    class="flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300 transition-colors"
                    title="Source Location"
                  >
                    <span>原始碼:</span>
                    <code class="font-mono bg-emerald-400/10 px-1 rounded">PolicyForm.vue</code>
                  </a>
                </div>

                <ShowcaseCodeBlock
                  code="const handleEdit = async (item) => {
  // 1. 父層只負責「開」
  await open({
    title: '編輯保單',
    component: markRaw(PolicyForm),
    componentProps: {
      initialData: { ...item },
      // 2. 監聽子組件存檔完成
      onSaved: (newData) => {
        refreshList(newData)
      }
    }
  })
}"
                  language="typescript"
                  :lines="false"
                  class="flex-1"
                />
              </div>
            </div>
          </div>

          <!-- Pattern 2: 外據模式 (External Control) -->
          <div class="space-y-4 mt-12">
            <!-- Feature Block Header -->
            <div
              class="p-4 rounded-lg bg-sky-950/30 border border-sky-500/20 flex items-start gap-4"
            >
              <div class="shrink-0 p-2.5 rounded-lg bg-sky-500/10 text-sky-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-base font-bold text-sky-400 mb-1">
                  Pattern 2: 外據模式 (External)
                </h4>
                <p class="text-sm text-slate-400">
                  父層傳入 Reactive 物件綁定。所有邏輯（驗證、存檔）由父層全權控制。
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <!-- Demo Column -->
              <div class="space-y-2">
                <div class="flex justify-between items-center px-1">
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    範例展示
                  </span>
                </div>

                <!-- Table -->
                <div
                  class="w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-sm"
                >
                  <table class="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr class="bg-slate-950 border-b border-slate-800">
                        <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase">
                          保單號碼
                        </th>
                        <th class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase">
                          狀態
                        </th>
                        <th
                          class="py-3 px-4 font-semibold text-slate-400 text-xs uppercase text-right"
                        >
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800">
                      <tr
                        v-for="item in policyList2"
                        :key="item.id"
                        class="group hover:bg-slate-800/50"
                      >
                        <td class="py-3 px-4 font-mono text-sky-400">{{ item.policyNo }}</td>
                        <td class="py-3 px-4 text-slate-300">
                          <span
                            class="px-2 py-0.5 rounded text-xs border border-white/10 bg-white/5"
                          >
                            {{ item.applicant }}
                          </span>
                        </td>
                        <td class="py-3 px-4 text-right">
                          <button
                            class="text-xs font-medium text-sky-400 bg-sky-400/10 hover:bg-sky-500 hover:text-white px-3 py-1.5 rounded transition-all border border-sky-400/20"
                            @click="handleEditPattern2(item)"
                          >
                            外據編輯
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-[10px] text-slate-500 px-1">
                  * 點擊編輯按鈕，驗證與存檔都在父層觸發
                </div>
              </div>

              <!-- Code Column -->
              <div class="space-y-2 h-full flex flex-col">
                <div class="flex justify-end items-center px-1">
                  <a
                    href="#"
                    class="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300 transition-colors"
                    title="Source Location"
                  >
                    <span>原始碼:</span>
                    <code class="font-mono bg-sky-400/10 px-1 rounded">Page.vue</code>
                  </a>
                </div>

                <ShowcaseCodeBlock
                  code="const handleEdit = async (item) => {
  // 1. 父層準備 Reactive 物件
  const formData = reactive({ ...item })

  // 2. 開啟彈窗 (傳入 formData 綁定)
  const isConfirmed = await open({
    component: markRaw(PolicyForm),
    componentProps: { formData }
  })

  // 3. 父層檢查結果並存檔
  if (isConfirmed) {
    await api.save(formData)
  }
}"
                  language="typescript"
                  :lines="false"
                  class="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShowcaseCard>

    <!-- 局部彈窗實例 (直接掛在 template，使用 Ref 控制) -->
    <IModal
      ref="localModalRef"
      :model-value="false"
    >
      局部彈窗實例 (直接掛在 template，使用 Ref 控制) -
    </IModal>

    <!-- 開發規範與設計模式 (Cheat Sheet) -->
    <ShowcaseSection title="開發規範與設計模式">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Pattern 1: 內聚模式 (Internal Cohesion) -->
        <ShowcaseCard
          title="Pattern 1: 內聚模式 (Internal Cohesion)"
          description="適用於：新增、編輯、複雜表單"
          class="bg-slate-900/50"
        >
          <div class="flex flex-col gap-4">
            <!-- 核心概念 -->
            <div class="p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-lg">
              <div class="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
                <span>組件自治 (Component Autonomy)</span>
              </div>
              <p class="text-xs text-slate-400">
                表單邏輯、驗證、API 呼叫全部封裝在組件內部。外部只負責「開啟」與「接收刷新訊號」。
              </p>
            </div>

            <!-- Checklist -->
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h4 class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                開發檢核點
              </h4>
              <ul class="benefit-list grid-cols-1 gap-2">
                <li class="p-2 border-0 bg-transparent shadow-none hover:translate-y-0">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <span>
                      必備
                      <code class="text-emerald-400">defineExpose({ onConfirm })</code>
                    </span>
                  </div>
                </li>
                <li class="p-2 border-0 bg-transparent shadow-none hover:translate-y-0">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <span>
                      驗證失敗
                      <code class="text-emerald-400">return false</code>
                      攔截
                    </span>
                  </div>
                </li>
                <li class="p-2 border-0 bg-transparent shadow-none hover:translate-y-0">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <span>組件內部自行呼叫 API</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Code Template -->
            <ShowcaseCodeBlock
              code="<!-- PolicyForm.vue -->
<script setup>
const onConfirm = async () => {
  // 1. 內部驗證
  if (!valid) return false
  
  // 2. 內部存檔
  await api.save(form)
  
  // 3. 通知外部刷新
  emit('saved')
  
  return true // 允許關閉
}

// 必備：暴露給 Modal
defineExpose({ onConfirm })
</script>"
              language="vue"
              label="Component Template"
              :lines="false"
            />
          </div>
        </ShowcaseCard>

        <!-- Pattern 2: 外據模式 (External Control) -->
        <ShowcaseCard
          title="Pattern 2: 外據模式 (External Control)"
          description="適用於：簡單確認、選取器、跨組件操作"
          class="bg-slate-900/50"
        >
          <div class="flex flex-col gap-4">
            <!-- 核心概念 -->
            <div class="p-3 bg-sky-950/30 border border-sky-500/20 rounded-lg">
              <div class="flex items-center gap-2 mb-2 text-sky-400 font-bold">
                <span>父層控制 (Parent Control)</span>
              </div>
              <p class="text-xs text-slate-400">
                彈窗僅作為「UI 容器」或「純資料輸入」。驗證與 API 呼叫由開啟彈窗的父層處理。
              </p>
            </div>

            <!-- Checklist -->
            <div class="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <h4 class="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
                開發檢核點
              </h4>
              <ul class="benefit-list grid-cols-1 gap-2">
                <li class="p-2 border-0 bg-transparent shadow-none hover:translate-y-0">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <span>
                      傳入
                      <code class="text-sky-400">reactive</code>
                      物件綁定
                    </span>
                  </div>
                </li>
                <li class="p-2 border-0 bg-transparent shadow-none hover:translate-y-0">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <span>
                      父層
                      <code class="text-sky-400">await open()</code>
                      等結果
                    </span>
                  </div>
                </li>
                <li class="p-2 border-0 bg-transparent shadow-none hover:translate-y-0">
                  <div class="flex items-center gap-2 text-sm text-slate-300">
                    <span>父層負責 API 存檔</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Code Template -->
            <ShowcaseCodeBlock
              code="// Parent.vue
const handleEdit = async () => {
  // 1. 準備共用資料容器
  const formData = reactive({...})

  // 2. 開啟並傳入容器
  const confirm = await open({
    component: Form,
    componentProps: { formData }
  })
  
  // 3. 父層處理結果
  if (confirm) {
    await api.save(formData)
  }
}"
              language="typescript"
              label="父層控制"
              :lines="false"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <ShowcaseSection title="API 參考">
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

/* Glass Buttons */
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

.glass-input {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 100%;
}

.glass-input:focus {
  outline: none;
  border-color: #38bdf8;
  background: rgba(30, 41, 59, 0.6);
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
