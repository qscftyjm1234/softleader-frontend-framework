<script setup lang="ts">
import { ref, computed } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  currentPage,
  pageSize,
  total,
  info,
  goToPage,
  prevPage,
  nextPage,
  firstPage,
  lastPage,
  setPageSize,
  setTotal,
  getPageRange,
  paginateArray
} = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

// Demo data
const allItems = ref(
  Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 1000)
  }))
)

const currentItems = computed(() => paginateArray(allItems.value))
const pageButtons = computed(() => getPageRange(7))

definePageMeta({
  title: '分頁管理 (Pagination)',
  icon: 'mdi-page-layout-footer',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="分頁管理 (Pagination)"
    description="完整的分頁邏輯處理，支援頁碼計算、範圍管理與陣列分頁。包含自訂頁碼按鈕、每頁筆數切換與資料切片功能。"
  >
    <ShowcaseSection
      title="Interactive Demo"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- Controls & Config -->
        <ShowcaseCard
          title="設定與配置"
          description="調整分頁參數"
          full-width
        >
          <div class="flex flex-col gap-6">
            <div class="flex gap-4 flex-wrap">
              <div class="flex flex-col gap-2 min-w-[200px]">
                <label class="text-slate-400 text-xs uppercase tracking-wide">Total Items</label>
                <input
                  v-model.number="total"
                  type="number"
                  class="glass-input"
                  @change="setTotal(total)"
                />
              </div>
              <div class="flex flex-col gap-2 min-w-[200px]">
                <label class="text-slate-400 text-xs uppercase tracking-wide">Page Size</label>
                <select
                  v-model.number="pageSize"
                  class="glass-input"
                  @change="setPageSize(pageSize)"
                >
                  <option :value="5">5 items / page</option>
                  <option :value="10">10 items / page</option>
                  <option :value="20">20 items / page</option>
                  <option :value="50">50 items / page</option>
                </select>
              </div>
            </div>

            <!-- Data Table -->
            <div class="border border-slate-700/30 rounded-lg overflow-hidden">
              <table class="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      ID
                    </th>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      Name
                    </th>
                    <th
                      class="bg-slate-800/60 p-3 text-left text-slate-400 font-semibold text-sm border-b border-slate-700/30"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in currentItems"
                    :key="item.id"
                    class="hover:bg-slate-700/10 transition-colors"
                  >
                    <td class="p-3 border-b border-slate-700/10 text-slate-200">#{{ item.id }}</td>
                    <td class="p-3 border-b border-slate-700/10 text-slate-200">{{ item.name }}</td>
                    <td class="p-3 border-b border-slate-700/10 font-mono text-sky-400">
                      {{ item.value }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination Controls -->
            <div class="flex justify-center flex-wrap gap-2 items-center">
              <button
                :disabled="!info.hasPrev"
                class="glass-btn"
                @click="firstPage"
              >
                First
              </button>
              <button
                :disabled="!info.hasPrev"
                class="glass-btn"
                @click="prevPage"
              >
                Prev
              </button>

              <div class="flex gap-1">
                <button
                  v-for="page in pageButtons"
                  :key="page"
                  class="glass-btn min-w-[40px]"
                  :class="{ active: page === currentPage }"
                  @click="goToPage(page as number)"
                >
                  {{ page }}
                </button>
              </div>

              <button
                :disabled="!info.hasNext"
                class="glass-btn"
                @click="nextPage"
              >
                Next
              </button>
              <button
                :disabled="!info.hasNext"
                class="glass-btn"
                @click="lastPage"
              >
                Last
              </button>
            </div>

            <div class="text-center mt-4 text-slate-400 text-sm">
              Showing
              <span class="text-slate-100">{{ info.startItem }}</span>
              to
              <span class="text-slate-100">{{ info.endItem }}</span>
              of
              <span class="text-slate-100">{{ info.total }}</span>
              items
            </div>
          </div>
        </ShowcaseCard>

        <!-- Debug Info -->
        <ShowcaseCard
          title="Pagination Info"
          description="內部狀態檢視"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="JSON.stringify(info, null, 2)"
              language="json"
              label="Current State"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.glass-input option {
  background: #0f172a;
  color: #f1f5f9;
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 40px;
}

.glass-btn:hover:not(:disabled) {
  background: rgba(56, 189, 248, 0.1);
  border-color: #38bdf8;
  color: #38bdf8;
}

.glass-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.glass-btn.active {
  background: rgba(56, 189, 248, 0.2);
  border-color: #38bdf8;
  color: #38bdf8;
}
</style>
