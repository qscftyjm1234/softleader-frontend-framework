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
    title="分頁管理系統"
    description="完整的分頁邏輯處理，支援頁碼計算、範圍管理與陣列分頁。包含自訂頁碼按鈕、每頁筆數切換與資料切片功能。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="分頁系統的核心特色"
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
  // 狀態
  currentPage,   // 目前頁碼
  pageSize,      // 每頁筆數
  total,         // 總筆數
  info,          // 分頁資訊 (hasNext, hasPrev, totalPages...)
  
  // 操作
  goToPage,      // 跳轉頁碼
  prevPage,      // 上一頁
  nextPage,      // 下一頁
  firstPage,     // 第一頁
  lastPage,      // 最後一頁
  setPageSize,   // 設定每頁筆數
  setTotal,      // 設定總筆數
  
  // 輔助
  getPageRange,  // 取得頁碼按鈕陣列
  paginateArray  // 純前端陣列分頁
} = usePagination()"
            label="usePagination() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>完整狀態管理:</strong>
              自動計算總頁數、起訖項目索引
            </li>
            <li>
              <strong>彈性操作:</strong>
              支援前後翻頁、指定頁碼、每頁筆數調整
            </li>
            <li>
              <strong>UI 輔助:</strong>
              自動生成頁碼按鈕陣列 (如: 1, 2, ..., 10)
            </li>
            <li>
              <strong>雙模式:</strong>
              支援後端分頁 (API) 與前端分頁 (Array)
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { currentPage, total, goToPage } = usePagination({
  currentPage: 1,
  pageSize: 20,
  total: 100
})

// 切換下一頁
nextPage()"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- Controls & Config -->
        <ShowcaseCard
          title="設定與設定"
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

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. 狀態與資訊"
          description="分頁核心資料"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>屬性：</strong>
              currentPage, pageSize, total, info
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// info 物件內容
{
  totalPages: 10,
  hasPrev: false,
  hasNext: true,
  startItem: 1,
  endItem: 10
}"
              label="info 結構"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. 頁面操作"
          description="導航控制"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              goToPage, prevPage, nextPage, firstPage, lastPage
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 跳轉到第 5 頁
goToPage(5)

// 上一頁 (會自動檢查邊界)
prevPage()

// 最後一頁
lastPage()"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. 參數設定"
          description="動態調整設定"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              setPageSize, setTotal
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 改變每頁顯示 50 筆
setPageSize(50)

// 更新總筆數 (如 API 回傳後)
setTotal(apiResponse.total)"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="4. 輔助功能"
          description="UI 生成與資料處理"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              getPageRange, paginateArray
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 產生頁碼按鈕 (最多顯示 7 個)
// [1, 2, 3, 4, 5, '...', 10]
const buttons = getPageRange(7)

// 前端陣列分頁
const pageItems = paginateArray(allData)"
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
