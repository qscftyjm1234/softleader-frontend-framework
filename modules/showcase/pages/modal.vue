<script setup lang="ts">
import { ref, computed, watch, markRaw } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'
import EmailInput from '~/components/uiBusiness/EmailInput.vue'
import IModal from '~/components/uiInterface/IModal.vue'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()
const { open, confirm, alert, modals, hasModal, modalCount, closeAll } = useModal()

definePageMeta({
  title: '彈窗管理核心 (Modal System)',
  layout: 'portal'
})

// Units for Sidebar
const units = ref([
  {
    id: 'intro',
    title: '單元 00：核心概念',
    icon: 'mdi-information-outline',
    description:
      '了解彈窗系統的設計初衷與 Promise 型態的操作模式。我們捨棄了傳統的 v-model 控制，改以「服務化」的方式調用。',
    useCase: '理解為什麼要使用 useModal 而非每個頁面自定義彈窗變數。'
  },
  {
    id: 'basic',
    title: '單元 01：基礎彈窗 (Open)',
    icon: 'mdi-window-maximize',
    description: '最靈活的開啟方式。可以自定義標題、內容、按鈕文字，並透過 Promise 接收結果。',
    useCase: '顯示一般性通知、成功訊息、或是需要自定義按鈕文字的場景。'
  },
  {
    id: 'confirm',
    title: '單元 02：快速確認與警告',
    icon: 'mdi-alert-circle-outline',
    description: '專為「確認/取消」與「單一警告」設計的便捷方法，簡化常見的互動流程。',
    useCase: '刪除確認、表單重置確認、系統警告通知。'
  },
  {
    id: 'advanced',
    title: '單元 03：動態元件注入',
    icon: 'mdi-puzzle-outline',
    description: ' Modal 的核心優勢在於能渲染任何 Vue 元件。支援傳入 markRaw 組件與 Props。',
    useCase: '開啟複雜表單、商品詳情檢視、多步驟精靈引導。'
  },
  {
    id: 'queue',
    title: '單元 04：狀態與佇列',
    icon: 'mdi-layers-triple-outline',
    description: '自動管理多層彈窗堆疊 (Stacking) 與 z-index。提供即時的狀態追蹤與批次關閉。',
    useCase: '處理巢狀彈窗、或是需要程式化清空所有彈窗的情境。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

// Functional States for Demos
const customTitle = ref('自訂標題')
const customContent = ref('這是自訂的內容...')
const actionResult = ref('')

const handleBasicOpen = async () => {
  const ok = await open({
    title: customTitle.value,
    content: customContent.value,
    confirmText: '瞭解了',
    cancelText: '關閉'
  })
  actionResult.value = `使用者操作結果: ${ok ? '點擊確定' : '點擊取消'}`
}

const handleQuickConfirm = async () => {
  const ok = await confirm({
    title: '確認刪除',
    content: '此操作不可復原，您確定要刪除嗎？'
  })
  actionResult.value = ok ? '✓ 已執行刪除' : '✗ 已取消操作'
}

const handleQuickAlert = async () => {
  await alert({
    title: '存檔失敗',
    content: '連線逾時，請檢查網路連線後再試一次。'
  })
  actionResult.value = '使用者已關閉警告'
}

const handleComponentInjection = async () => {
  const result = await open({
    title: '元件插入測試',
    content: '下面是一個透過 component 參數動態注入的 EmailInput 元件：',
    component: markRaw(EmailInput),
    componentProps: {
      placeholder: '請輸入信箱...',
      corporateOnly: true
    }
  })
  actionResult.value = result ? '已提交表單' : '取消提交'
}

const handleStackedModals = () => {
  open({ title: '第一層', content: 'Base Layer' })
  setTimeout(() => open({ title: '第二層', content: 'Stacked Layer' }), 400)
}

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// Code Snippets for Copy-Paste
const snippets = {
  setup: `const { open, confirm, alert, closeAll } = useModal()`,
  basic: `const handleOpen = async () => {
  const result = await open({
    title: '歡迎您的到來',
    content: '這是一個基礎的彈窗視窗內容。',
    confirmText: '我知道了',
    cancelText: '稍後再說'
  })
  
  if (result) {
    console.log('使用者點擊了確認')
  }
}`,
  confirm: `// 回傳 Boolean 的快速確認框
const ok = await confirm({
  title: '確定要刪除嗎？',
  content: '刪除後資料將無法檢索。'
})

if (ok) {
  await deleteApi()
}`,
  component: `import MyForm from '@/components/MyForm.vue'
import { markRaw } from 'vue'

const openForm = async () => {
  await open({
    title: '編輯資料',
    component: markRaw(MyForm),
    componentProps: {
      initialData: { name: 'Gino' }
    }
  })
}`
}
</script>

<template>
  <div class="vue-course-layout min-h-screen bg-white">
    <!-- Header -->
    <header
      class="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4"
    >
      <div class="max-w-[1400px] mx-auto flex items-center justify-between">
        <div class="flex items-center gap-5">
          <NuxtLink
            to="/showcase"
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all group"
          >
            <IIcon
              icon="mdi-home-outline"
              size="22"
              class="group-hover:scale-110 transition-transform"
            />
          </NuxtLink>
          <div class="h-8 w-px bg-slate-200 mx-1"></div>
          <IBreadcrumbs :items="breadcrumbItems" />
        </div>
        <div class="flex items-center gap-6">
          <div class="text-right">
            <span class="text-[10px] font-black text-blue-500 uppercase">單元章節</span>
            <div class="text-sm font-mono font-bold text-slate-600">
              {{ activeUnitIndex + 1 }} / {{ units.length }}
            </div>
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-blue-500 transition-all duration-500"
              :style="{ width: `${((activeUnitIndex + 1) / units.length) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-73px)]">
      <!-- Sidebar -->
      <aside class="lg:col-span-3 border-r border-slate-50 p-6 space-y-2 bg-slate-50/30">
        <div
          class="px-4 py-2 mb-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          單元導覽
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-sm text-blue-600 ring-1 ring-blue-50'
              : 'text-slate-500 hover:bg-slate-100/50'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeUnitIndex === index ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
            "
          >
            {{ index + 1 }}
          </div>
          <span class="text-sm font-black tracking-tight">{{ unit.title }}</span>
        </button>
      </aside>

      <!-- Main Content -->
      <div
        ref="scrollContainer"
        class="lg:col-span-9 h-full overflow-y-auto bg-slate-50/10"
      >
        <main class="max-w-4xl mx-auto p-10 space-y-12 pb-32">
          <!-- Intro Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100"
              >
                <IIcon
                  :icon="activeUnit.icon"
                  size="28"
                />
              </div>
              <div>
                <h1 class="text-4xl font-black text-slate-900 tracking-tight">
                  {{ activeUnit.title }}
                </h1>
                <p class="text-lg text-slate-500 font-medium mt-1">{{ activeUnit.description }}</p>
              </div>
            </div>
            <div
              class="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-500 shrink-0"
              >
                <IIcon
                  icon="mdi-bullseye-arrow"
                  size="24"
                />
              </div>
              <div>
                <div class="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  實戰應用 (Use Case)
                </div>
                <p class="text-sm font-bold text-slate-600">{{ activeUnit.useCase }}</p>
              </div>
            </div>
          </div>

          <!-- Unit Content -->
          <div class="space-y-10 animate-fadeIn">
            <!-- Phase 0: Intro -->
            <template v-if="activeUnit.id === 'intro'">
              <ShowcaseCard
                title="為什麼要使用管理系統？"
                description="了解傳統與規範化開發的差異"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 class="font-bold text-slate-400 mb-3 flex items-center gap-2 line-through">
                      傳統做法 (v-model)
                    </h4>
                    <ul class="text-sm text-slate-400 space-y-2 list-disc pl-4">
                      <li>
                        每個頁面都要定義
                        <code>showModal = ref(false)</code>
                      </li>
                      <li>
                        需要在 Template 中掛載
                        <code>&lt;Modal&gt;</code>
                        元件
                      </li>
                      <li>難以在多個組件間共享同個彈窗</li>
                      <li>無法透過 Promise 直接取得操作結果</li>
                    </ul>
                  </div>
                  <div class="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                    <h4 class="font-bold text-blue-900 mb-3 flex items-center gap-2 italic">
                      開發包實踐 (Global Service)
                    </h4>
                    <ul class="text-sm text-blue-800/80 space-y-2 list-disc pl-4">
                      <li>
                        一行
                        <code>useModal()</code>
                        即可調用
                      </li>
                      <li>無需在 Template 撰寫冗餘代碼</li>
                      <li>支援 Promise (async/await) 邏輯</li>
                      <li>自動處理多層堆疊與 z-index</li>
                    </ul>
                  </div>
                </div>
              </ShowcaseCard>
              <div class="space-y-4">
                <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                  起手式教學
                </h4>
                <ShowcaseCodeBlock
                  filename="MyPage.vue"
                  :code="snippets.setup"
                />
              </div>
            </template>

            <!-- Phase 1: Basic Open -->
            <template v-if="activeUnit.id === 'basic'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div class="space-y-6">
                  <ShowcaseCard
                    title="互動演示"
                    description="嘗試修改內容並開啟彈窗"
                  >
                    <div class="space-y-4 mt-4">
                      <div class="space-y-2">
                        <label class="text-xs font-black text-slate-400 uppercase">標題</label>
                        <input
                          v-model="customTitle"
                          class="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                        />
                      </div>
                      <div class="space-y-2">
                        <label class="text-xs font-black text-slate-400 uppercase">內容文字</label>
                        <textarea
                          v-model="customContent"
                          class="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 outline-none min-h-[100px]"
                        ></textarea>
                      </div>
                      <button
                        class="w-full py-4 rounded-2xl bg-blue-600 text-white font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                        @click="handleBasicOpen"
                      >
                        開啟基礎彈窗
                      </button>
                      <div
                        v-if="actionResult"
                        class="p-3 text-center rounded-xl bg-emerald-50 text-emerald-600 font-mono text-xs border border-emerald-100"
                      >
                        {{ actionResult }}
                      </div>
                    </div>
                  </ShowcaseCard>
                </div>
                <div class="space-y-6">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    直接複製貼上
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.basic" />
                </div>
              </div>
            </template>

            <!-- Phase 2: Confirm / Alert -->
            <template v-if="activeUnit.id === 'confirm'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div class="space-y-6">
                  <ShowcaseCard title="操作測試">
                    <div class="grid grid-cols-1 gap-4 mt-2">
                      <button
                        class="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 group transition-all"
                        @click="handleQuickConfirm"
                      >
                        <div>
                          <div class="font-black text-slate-800">使用 confirm()</div>
                          <div class="text-xs text-slate-400 text-left">回傳值為 Boolean</div>
                        </div>
                        <IIcon
                          icon="mdi-chevron-right"
                          class="text-slate-300 group-hover:text-blue-500"
                        />
                      </button>
                      <button
                        class="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 group transition-all"
                        @click="handleQuickAlert"
                      >
                        <div>
                          <div class="font-black text-slate-800">使用 alert()</div>
                          <div class="text-xs text-slate-400 text-left">純訊息警告，強制確定</div>
                        </div>
                        <IIcon
                          icon="mdi-chevron-right"
                          class="text-slate-300 group-hover:text-amber-500"
                        />
                      </button>
                    </div>
                    <div
                      v-if="actionResult"
                      class="mt-4 p-3 text-center rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs shadow-inner"
                    >
                      {{ actionResult }}
                    </div>
                  </ShowcaseCard>
                </div>
                <div class="space-y-6">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    實戰代碼範例
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.confirm" />
                </div>
              </div>
            </template>

            <!-- Phase 3: Advanced -->
            <template v-if="activeUnit.id === 'advanced'">
              <div class="space-y-8">
                <div
                  class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-900 rounded-[2rem] p-10 text-white"
                >
                  <div>
                    <div
                      class="inline-block px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase mb-4 tracking-widest border border-blue-500/30"
                    >
                      Feature Preview
                    </div>
                    <h3 class="text-2xl font-black mb-4">動態元件注入模式</h3>
                    <p class="text-slate-400 leading-relaxed mb-6">
                      你可以將現成的業務元件 (如 Email 輸入、甚至整個表格) 傳遞給 Modal 層渲染。透過
                      <code>markRaw</code>
                      包裝元件，能有效提升 Vue 的渲染效率。
                    </p>
                    <button
                      class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-bold transition-all"
                      @click="handleComponentInjection"
                    >
                      開啟含有動態元件的 Modal
                      <IIcon icon="mdi-arrow-right" />
                    </button>
                  </div>
                  <div class="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 space-y-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center"
                      >
                        <IIcon icon="mdi-file-code-outline" />
                      </div>
                      <div class="text-xs font-bold text-slate-300">EmailInput.vue (偵測中)</div>
                    </div>
                    <div class="h-px bg-slate-700"></div>
                    <div class="space-y-2 opacity-50">
                      <div class="w-full h-8 bg-slate-700/50 rounded"></div>
                      <div class="w-2/3 h-8 bg-slate-700/50 rounded"></div>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    開發規範代碼
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.component" />
                </div>
              </div>
            </template>

            <!-- Phase 4: Queue -->
            <template v-if="activeUnit.id === 'queue'">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ShowcaseCard title="堆疊系統狀態 (Real-time Queue)">
                  <div class="space-y-6">
                    <div class="flex gap-2">
                      <button
                        class="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
                        @click="handleStackedModals"
                      >
                        開啟兩層彈窗
                      </button>
                      <button
                        class="flex-1 py-3 rounded-xl border border-slate-200 text-slate-500 font-bold text-xs hover:bg-slate-50"
                        @click="closeAll"
                      >
                        清空所有
                      </button>
                    </div>
                    <div class="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                      <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-black text-slate-400">目前開啟數量</span>
                        <span class="text-2xl font-black text-blue-600 font-mono">
                          {{ modalCount }}
                        </span>
                      </div>
                      <div class="space-y-2">
                        <div
                          v-if="modals.length === 0"
                          class="text-center py-8 text-slate-300 text-xs italic"
                        >
                          目前沒有運作中的彈窗...
                        </div>
                        <div
                          v-for="m in modals"
                          :key="m.id"
                          class="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-xs font-mono"
                        >
                          <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          <span class="text-slate-500">ID: {{ m.id.slice(0, 8) }}</span>
                          <span class="font-black text-slate-800">[{{ m.config.title }}]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ShowcaseCard>

                <div class="space-y-6 bg-slate-50 rounded-3xl p-8 border border-slate-100">
                  <h4
                    class="text-sm font-black text-blue-600 uppercase tracking-widest flex items-center gap-2"
                  >
                    <IIcon icon="mdi-shield-crown" />
                    進階 API 教學
                  </h4>
                  <div class="space-y-4">
                    <div class="p-4 bg-white rounded-xl border border-slate-200">
                      <div class="text-xs font-black text-slate-800 mb-1">modalCount</div>
                      <p class="text-[11px] text-slate-500">
                        取得目前彈窗總數，常用於判斷是否鎖定頁面滾動。
                      </p>
                    </div>
                    <div class="p-4 bg-white rounded-xl border border-slate-200">
                      <div class="text-xs font-black text-slate-800 mb-1">hasModal</div>
                      <p class="text-[11px] text-slate-500">
                        Boolean 響應式指標，快速判斷是否有 Modal 運作中。
                      </p>
                    </div>
                    <div class="p-4 bg-white rounded-xl border border-slate-200">
                      <div class="text-xs font-black text-slate-800 mb-1">closeAll()</div>
                      <p class="text-[11px] text-slate-500">
                        強力手段，一次關閉所有佇列中的 Modal（多用於登出或全域異常時）。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>

          <!-- Bottom Navigation -->
          <div class="mt-8 border-t border-slate-100 pt-8 flex justify-between items-center">
            <button
              v-if="activeUnitIndex > 0"
              class="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex--"
            >
              <IIcon
                icon="mdi-arrow-left"
                size="18"
              />
              回到上一階段
            </button>
            <div v-else></div>

            <button
              v-if="activeUnitIndex < units.length - 1"
              class="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex++"
            >
              下一步：{{ units[activeUnitIndex + 1].title }}
              <IIcon
                icon="mdi-arrow-right"
                size="18"
              />
            </button>
            <NuxtLink
              v-else
              to="/showcase"
              class="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 font-bold text-sm active:scale-95 transition-all"
            >
              完成彈窗課程
              <IIcon
                icon="mdi-check-circle"
                size="18"
              />
            </NuxtLink>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
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

textarea {
  min-height: 200px;
}
</style>
