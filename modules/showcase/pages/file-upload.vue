<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IIcon from '~/components/uiInterface/IIcon.vue'
import IButton from '~/components/uiInterface/IButton.vue'
import IBreadcrumbs from '~/components/uiInterface/layout/IBreadcrumbs.vue'
import { useBreadcrumbs } from '~/composables/useBreadcrumbs'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const { breadcrumbs: breadcrumbItems } = useBreadcrumbs()

definePageMeta({
  title: '文件上傳核心 (File Upload)',
  layout: 'portal'
})

const units = ref([
  {
    id: 'process',
    title: '單元 00：核心流程',
    icon: 'mdi-file-outline',
    description: '文件上傳不只是選擇檔案，它包含：選取、校驗、上傳中、成功/失敗四個關鍵生命週期。',
    useCase: '理解企業級上傳組件如何透過狀態機管理複雜的異常情境。'
  },
  {
    id: 'dropzone',
    title: '單元 01：拖拽上傳',
    icon: 'mdi-tray-arrow-up',
    description: '提供直觀的 Drag & Drop 區域，支援單檔案、多檔案以及點擊觸發原生選取器。',
    useCase: '後台表單、附件上傳、圖片庫管理。'
  },
  {
    id: 'validation',
    title: '單元 02：文件校驗',
    icon: 'mdi-shield-check-outline',
    description: '在進入上傳隊列前，自動檢查檔案格式 (Accept)、大小限制 (MaxSize) 與數量限制。',
    useCase: '嚴格限制上傳圖片格式（如僅限 PNG/JPG）或限制檔案不得超過 5MB。'
  },
  {
    id: 'feedback',
    title: '單元 03：進度反饋',
    icon: 'mdi-progress-upload',
    description: '展示文件上傳的實時進度，並提供「取消上傳」與「重新嘗試」的互動能力。',
    useCase: '大型文件上傳（如影片、壓縮包）的用戶體驗優化。'
  },
  {
    id: 'advanced',
    title: '單元 04：進階應用',
    icon: 'mdi-cog-outline',
    description:
      '使用 `useFileUpload` Composables 自定義上傳邏輯，或整合到現有的表單 Submitting 流程。',
    useCase: '多步驟表單中的文件預處理 or 異步對接第三方雲存儲 (S3/OSS)。'
  }
])

const activeUnitIndex = ref(0)
const activeUnit = computed(() => units.value[activeUnitIndex.value])

const scrollContainer = ref<HTMLElement | null>(null)
watch(activeUnitIndex, () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

// File State Simulation
const files = ref<any[]>([])
const isDragging = ref(false)
const uploadProgress = ref(0)
const isUploading = ref(false)

const simulateUpload = () => {
  if (files.value.length === 0) return
  isUploading.value = true
  uploadProgress.value = 0
  const interval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      isUploading.value = false
      files.value = files.value.map((f) => ({ ...f, status: 'success' }))
    }
  }, 200)
}

const addFiles = (newFiles: FileList | null) => {
  if (!newFiles) return
  const mapped = Array.from(newFiles).map((f) => ({
    name: f.name,
    size: `${(f.size / 1024 / 1024).toFixed(2)} MB`,
    status: 'pending'
  }))
  files.value = [...files.value, ...mapped]
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}

// Snippets
const snippets = {
  basic: `<template>\n  <IDropzone @change="handleFiles" />\n</template>\n\n<script setup>\nconst handleFiles = (files) => {\n  console.log('Selected:', files)\n}\n<\/script>`,
  validation: `<IDropzone \n  :accept="['image/png', 'image/jpeg']"\n  :max-size="5" \n  :max-count="3"\n/>`,
  composite: `const { upload, abort, progress, status } = useFileUpload({\n  url: '/api/upload',\n  headers: { Authorization: 'Bearer ...' }\n})`
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
            class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition-all group"
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
            <span class="text-[10px] font-black text-emerald-500 uppercase">單元進度</span>
            <div class="text-sm font-mono font-bold text-slate-600">
              {{ activeUnitIndex + 1 }} / {{ units.length }}
            </div>
          </div>
          <div class="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              class="h-full bg-emerald-500 transition-all duration-500"
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
          課程單元
        </div>
        <button
          v-for="(unit, index) in units"
          :key="unit.id"
          class="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group"
          :class="
            activeUnitIndex === index
              ? 'bg-white shadow-sm text-emerald-600 ring-1 ring-emerald-50'
              : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
          "
          @click="activeUnitIndex = index"
        >
          <div
            class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors"
            :class="
              activeUnitIndex === index
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-400'
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
                class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm"
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
                <p class="text-lg text-slate-500 font-medium mt-1 leading-relaxed">
                  {{ activeUnit.description }}
                </p>
              </div>
            </div>
            <div
              class="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 flex items-start gap-4"
            >
              <div
                class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500 shrink-0"
              >
                <IIcon
                  icon="mdi-shield-check"
                  size="24"
                />
              </div>
              <div>
                <div class="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  實戰應用 (Use Case)
                </div>
                <p class="text-sm font-bold text-slate-600">{{ activeUnit.useCase }}</p>
              </div>
            </div>
          </div>

          <!-- Unit Content -->
          <div class="space-y-10 animate-fadeIn">
            <!-- Unit 00: Core Process -->
            <template v-if="activeUnit.id === 'process'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ShowcaseCard
                  title="生命週期視覺化"
                  description="好的上傳體驗在於狀態的管理。"
                >
                  <div class="relative py-10 flex justify-between items-center px-4">
                    <div class="flex flex-col items-center gap-2">
                      <div
                        class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-black"
                      >
                        1
                      </div>
                      <span class="text-[10px] font-bold text-slate-400">Idle</span>
                    </div>
                    <div class="h-px bg-slate-200 flex-1 mx-2"></div>
                    <div class="flex flex-col items-center gap-2">
                      <div
                        class="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black"
                      >
                        2
                      </div>
                      <span class="text-[10px] font-bold text-emerald-600">Active</span>
                    </div>
                    <div class="h-px bg-slate-200 flex-1 mx-2"></div>
                    <div class="flex flex-col items-center gap-2">
                      <div
                        class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs font-black"
                      >
                        3
                      </div>
                      <span class="text-[10px] font-bold text-slate-400">Stable</span>
                    </div>
                  </div>
                  <p class="text-xs text-slate-400 text-center mt-4">
                    狀態機確保了 UI 與文件實體始終保持同步。
                  </p>
                </ShowcaseCard>
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    核心組件職責
                  </h4>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>選取器隔離</strong>
                        ：隱藏原生的
                        <code>&lt;input type="file"&gt;</code>
                        ，透過 API 觸發點擊。
                      </p>
                    </li>
                    <li class="flex items-start gap-3">
                      <div class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                      <p class="text-slate-600 text-sm leading-relaxed">
                        <strong>隊列管理</strong>
                        ：支援異步且併發的上傳流程。
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>

            <!-- Unit 01: Dropzone -->
            <template v-if="activeUnit.id === 'dropzone'">
              <div class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="space-y-4">
                    <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                      交互預覽
                    </h4>
                    <div
                      class="relative h-64 border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center transition-all cursor-pointer group"
                      :class="
                        isDragging
                          ? 'bg-emerald-50 border-emerald-400'
                          : 'bg-slate-50 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                      "
                      @dragover.prevent="isDragging = true"
                      @dragleave="isDragging = false"
                      @drop.prevent="
                        () => {
                          isDragging = false
                          addFiles($event.dataTransfer.files)
                        }
                      "
                    >
                      <input
                        type="file"
                        class="absolute inset-0 opacity-0 cursor-pointer"
                        multiple
                        @change="addFiles($event.target.files)"
                      />
                      <div
                        class="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 group-hover:scale-110 transition-all mb-4"
                      >
                        <IIcon
                          icon="mdi-cloud-upload-outline"
                          size="32"
                        />
                      </div>
                      <div class="text-sm font-bold text-slate-600">
                        拖拽文件至此 或
                        <span class="text-emerald-600 underline">點擊上傳</span>
                      </div>
                      <div class="text-[10px] text-slate-400 mt-2 font-medium">
                        支援 JPG, PNG, PDF (Max 5MB)
                      </div>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                      實作代碼
                    </h4>
                    <ShowcaseCodeBlock :code="snippets.basic" />
                  </div>
                </div>

                <!-- File List -->
                <div
                  v-if="files.length > 0"
                  class="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm space-y-4 animate-fadeIn"
                >
                  <div class="flex items-center justify-between px-2">
                    <h5 class="text-sm font-black text-slate-700">
                      待上傳清單 ({{ files.length }})
                    </h5>
                    <IButton
                      v-if="!isUploading"
                      size="small"
                      color="primary"
                      @click="simulateUpload"
                    >
                      開始上傳
                    </IButton>
                  </div>
                  <div class="grid grid-cols-1 gap-3">
                    <div
                      v-for="(file, idx) in files"
                      :key="idx"
                      class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group"
                    >
                      <div class="flex items-center gap-4">
                        <div
                          class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 border border-slate-100"
                        >
                          <IIcon
                            :icon="
                              file.status === 'success'
                                ? 'mdi-check-circle'
                                : 'mdi-file-document-outline'
                            "
                            :color="file.status === 'success' ? 'success' : 'currentColor'"
                          />
                        </div>
                        <div>
                          <div class="text-sm font-bold text-slate-700">{{ file.name }}</div>
                          <div class="text-[10px] font-bold text-slate-400 uppercase">
                            {{ file.size }}
                          </div>
                        </div>
                      </div>
                      <button
                        class="w-8 h-8 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors flex items-center justify-center"
                        @click="removeFile(idx)"
                      >
                        <IIcon
                          icon="mdi-close"
                          size="18"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- Unit 02: Validation -->
            <template v-if="activeUnit.id === 'validation'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    校驗策略庫
                  </h4>
                  <div class="space-y-4">
                    <div
                      class="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-emerald-200 transition-all"
                    >
                      <div
                        class="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 flex items-center justify-center transition-all"
                      >
                        <IIcon
                          icon="mdi-file-eye-outline"
                          size="24"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-extrabold text-slate-700 uppercase tracking-tight">
                          MimeType Check
                        </div>
                        <p class="text-xs text-slate-500 mt-1">
                          只過濾特定後綴的檔案（如 .zip, .csv）。
                        </p>
                      </div>
                    </div>
                    <div
                      class="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-4 group hover:border-emerald-200 transition-all"
                    >
                      <div
                        class="w-12 h-12 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 flex items-center justify-center transition-all"
                      >
                        <IIcon
                          icon="mdi-weight-kilogram"
                          size="24"
                        />
                      </div>
                      <div>
                        <div class="text-sm font-extrabold text-slate-700 uppercase tracking-tight">
                          Size Guard
                        </div>
                        <p class="text-xs text-slate-500 mt-1">
                          防止用戶上傳過大文件耗盡服務器帶寬。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                    屬性配置
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.validation" />
                </div>
              </div>
            </template>

            <!-- Unit 03: Feedback -->
            <template v-if="activeUnit.id === 'feedback'">
              <ShowcaseCard
                title="動態上傳反饋"
                description="點擊下方按鈕觀察進度條平滑動畫。"
              >
                <div class="py-6 space-y-8 max-w-md mx-auto">
                  <div class="space-y-3">
                    <div class="flex justify-between items-end px-1">
                      <div>
                        <div class="text-[10px] font-black text-emerald-600 uppercase">
                          Uploading Status
                        </div>
                        <div class="text-sm font-bold text-slate-700">Project_Final_v2.zip</div>
                      </div>
                      <div class="text-sm font-mono font-bold text-slate-900">
                        {{ uploadProgress }}%
                      </div>
                    </div>
                    <div class="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-emerald-500 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        :style="{ width: `${uploadProgress}%` }"
                      ></div>
                    </div>
                    <div
                      class="flex items-center gap-2 text-[10px] text-slate-400 font-bold justify-end"
                    >
                      <span v-if="uploadProgress < 100">剩餘約 5 秒...</span>
                      <span
                        v-else
                        class="text-emerald-500"
                      >
                        上傳成功！
                      </span>
                    </div>
                  </div>
                  <div class="flex justify-center gap-4">
                    <IButton
                      v-if="!isUploading && uploadProgress < 100"
                      color="primary"
                      @click="simulateUpload"
                    >
                      啟動模擬上傳
                    </IButton>
                    <IButton
                      v-if="isUploading"
                      color="error"
                      variant="text"
                      @click="
                        () => {
                          isUploading = false
                          uploadProgress = 0
                        }
                      "
                    >
                      取消
                    </IButton>
                    <IButton
                      v-if="uploadProgress === 100"
                      variant="outlined"
                      @click="uploadProgress = 0"
                    >
                      重置測試
                    </IButton>
                  </div>
                </div>
              </ShowcaseCard>
            </template>

            <!-- Unit 04: Advanced -->
            <template v-if="activeUnit.id === 'advanced'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-6 pt-2">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest">
                    Composables 指南
                  </h4>
                  <p class="text-slate-600 text-sm leading-relaxed font-medium">
                    對於不使用 Dropzone UI 的場景（例如按鈕觸發、自定義列表），可以直接使用
                    <code>useFileUpload</code>
                    。
                  </p>
                  <ul class="space-y-4">
                    <li class="flex items-start gap-3">
                      <div
                        class="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0"
                      >
                        <IIcon
                          icon="mdi-code-json"
                          size="18"
                        />
                      </div>
                      <p class="text-slate-600 text-sm leading-relaxed mt-1">
                        <strong>多實例並行</strong>
                        ：在同個頁面創建多組上傳鉤子而互不干擾。
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="text-sm font-black text-slate-400 uppercase tracking-widest px-1">
                    Composables 範例
                  </h4>
                  <ShowcaseCodeBlock :code="snippets.composite" />
                </div>
              </div>
            </template>
          </div>

          <!-- Footer Navigation -->
          <div class="mt-12 border-t border-slate-100 pt-8 flex justify-between items-center">
            <button
              v-if="activeUnitIndex > 0"
              class="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex--"
            >
              <IIcon
                icon="mdi-arrow-left"
                size="18"
              />
              上一章節
            </button>
            <div v-else></div>

            <button
              v-if="activeUnitIndex < units.length - 1"
              class="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl transition-all text-sm font-bold active:scale-95"
              @click="activeUnitIndex++"
            >
              前進單元：{{ units[activeUnitIndex + 1].title.split('：')[1] }}
              <IIcon
                icon="mdi-arrow-right"
                size="18"
              />
            </button>
            <NuxtLink
              v-else
              to="/showcase"
              class="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-200 font-bold text-sm active:scale-95 transition-all"
            >
              完成上傳課程
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
</style>
