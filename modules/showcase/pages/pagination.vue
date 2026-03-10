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
            code="usePagination({
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

    <ShowcaseSection title="整合模式 (Integration Patterns)">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left: Backend Mode -->
        <div class="space-y-4">
          <div class="border-l-4 border-sky-500 pl-4">
            <h3 class="text-xl font-bold text-sky-400">模式 A：後端分頁</h3>
            <p class="text-slate-200 mt-1 font-medium">API 負責切割資料，前端只管頁碼。</p>
            <p class="text-xs text-sky-300/70 mt-1 uppercase tracking-wider font-bold">
              適用：1000+ 筆海量資料
            </p>
          </div>

          <ShowcaseCodeBlock
            code="// 1. 初始化
usePagination()

// 2. 監聽並請求 API
watch([currentPage, pageSize], async () => {
  const res = await api.getUsers({
    page: currentPage.value,
    size: pageSize.value
  })
  
  users.value = res.data
  setTotal(res.total) // 更新總數
}, { immediate: true })"
            label="Backend Integration Code"
          />
        </div>

        <!-- Right: Frontend Mode -->
        <div class="space-y-4">
          <div class="border-l-4 border-pink-500 pl-4">
            <h3 class="text-xl font-bold text-pink-400">模式 B：前端分頁</h3>
            <p class="text-slate-200 mt-1 font-medium">一次撈回全部，前端負責 Array Slice。</p>
            <p class="text-xs text-pink-300/70 mt-1 uppercase tracking-wider font-bold">
              適用：選單、設定檔等小型列表
            </p>
          </div>

          <ShowcaseCodeBlock
            code="// 1. 初始化 (傳入總數)
const allData = ref([...])
usePagination({ 
  total: allData.value.length 
})

// 2. 切割資料
const currentItems = computed(() => {
  return paginateArray(allData.value)
})"
            label="Frontend Slice Code"
          />
        </div>
      </div>
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
          <!-- Data Table with Ant Design -->
          <div class="bg-slate-800/20 rounded-xl p-4 border border-slate-700/50">
            <a-table
              :columns="[
                { title: '編號 (#ID)', dataIndex: 'id', width: 120 },
                { title: '名稱 (Name)', dataIndex: 'name' },
                { title: '數值 (Value)', dataIndex: 'value', align: 'right' }
              ]"
              :data-source="currentItems"
              :pagination="{
                current: currentPage,
                pageSize: pageSize,
                total: total,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50'],
                showTotal: (t) => `共 ${t} 筆`,
                onChange: (page, size) => {
                  goToPage(page)
                  setPageSize(size)
                }
              }"
              row-key="id"
              size="middle"
              :scroll="{ x: 600 }"
            >
              <!-- 自訂欄位渲染 -->
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'id'">
                  <span class="font-mono text-sky-400">#{{ record.id }}</span>
                </template>
                <template v-if="column.dataIndex === 'value'">
                  <a-tag color="blue">{{ record.value }}</a-tag>
                </template>
              </template>
            </a-table>
          </div>
        </ShowcaseCard>

        <!-- Debug Info -->
        <ShowcaseCard
          title="內部狀態 (Debug State)"
          description="Hook 自動計算的唯讀屬性"
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
      <ShowcaseCard
        title="API 詳細說明"
        description="usePagination() 回傳欄位與方法"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          提供分頁狀態管理、頁碼計算與陣列分頁 helper。
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  名稱 (Name)
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
              <!-- State -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  currentPage
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Number&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  目前頁碼 (唯讀，請用
                  <code class="text-sky-300">goToPage</code>
                  修改)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  pageSize
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Number&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  每頁顯示筆數。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  total
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">
                  Ref&lt;Number&gt;
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  資料總筆數。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-amber-300 font-medium">
                  info
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Computed</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  分頁資訊 (
                  <code class="text-amber-300">totalPages</code>
                  ,
                  <code class="text-amber-300">hasNext</code>
                  ,
                  <code class="text-amber-300">hasPrev</code>
                  ,
                  <code class="text-amber-300">startItem</code>
                  ,
                  <code class="text-amber-300">endItem</code>
                  )。
                </td>
              </tr>

              <!-- Actions -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  goToPage(page)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  跳轉至指定頁碼 (會自動檢查邊界)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  prevPage / nextPage
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  前往 上一頁 / 下一頁。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  firstPage / lastPage
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  前往 第一頁 / 最後一頁。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  setPageSize(size)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  設定每頁筆數 (會自動維持在合理的頁碼)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  setTotal(count)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  設定總筆數 (通常在 API 回傳時同步呼叫)。
                </td>
              </tr>

              <!-- Helpers -->
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  getPageRange(n)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  產生頁碼按鈕陣列。例如：
                  <code class="text-emerald-300">[3, 4, 5, 6, 7]</code>
                  。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-emerald-300 font-medium">
                  paginateArray(arr)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  純前端陣列分頁 helper，回傳切割後的陣列。
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
