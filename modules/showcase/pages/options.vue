<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useOptions } from '~/composables/useOptions'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const options = useOptions()
// keys including static, functional (API), and computed options
const keys = ['gender', 'status', 'countries', 'townships', 'vocabularies']

// Interactive Playground State
const selectedKey = ref('gender')
const demoValue = ref<any>('MALE')
const demoExcludes = ref<any[]>(['other'])
const demoOnly = ref<any[]>(['MALE', 'FEMALE'])
const demoCity = ref('TPE') // For townships example
const demoSelection = ref('') // For select demos

// Computed Results based on selectedKey
const currentOptions = computed(() => {
  if (selectedKey.value === 'townships') {
    return options.townships(demoCity.value)
  }
  return options[selectedKey.value]
})

// 1. Array usage (v-for)
const resultArray = computed(() => currentOptions.value)

// 2. .isLoading
const resultIsLoading = computed(() => currentOptions.value.isLoading)

// 3. .isLoaded
const resultIsLoaded = computed(() => currentOptions.value.isLoaded)

// 4. .withAll
const resultWithAll = computed(() => currentOptions.value.withAll)

// 5. .other
const resultOther = computed(() => currentOptions.value.other)

// 6. .label(val)
const resultLabel = computed(() => currentOptions.value.label(demoValue.value))

// 7. .findByValue(val)
const resultFindByValue = computed(() => currentOptions.value.findByValue(demoValue.value))

// 8. .exclude(vals)
const resultExclude = computed(() => currentOptions.value.exclude(demoExcludes.value))

// 9. .only(vals)
const resultOnly = computed(() => currentOptions.value.only(demoOnly.value))

// Actions
const handleReload = async () => {
  await currentOptions.value.reload()
}

// --- Smart Defaults & Dynamic Snippets ---

// 自動更新測試數值：當選項切換且資料載入後，自動選取第一筆資料
watch(
  () => currentOptions.value,
  (newOpts) => {
    // 簡單判斷：若有資料且目前 demoValue 不在其中，則重設為第一筆
    if (newOpts && newOpts.length > 0) {
      const firstVal = newOpts[0].value
      const currentValExists = newOpts.some((o) => o.value === demoValue.value)
      if (!currentValExists) {
        demoValue.value = firstVal
        // 同步更新陣列類型的測試值
        demoExcludes.value = [firstVal]
        demoOnly.value = [firstVal]
      }
    }
  },
  { deep: true, immediate: true }
)

// 動態產生程式碼前綴，例如: options.status 或 options.townships('TPE')
const usageCodePrefix = computed(() => {
  if (selectedKey.value === 'townships') {
    return `options.townships('${demoCity.value}')`
  }
  return `options.${selectedKey.value}`
})

definePageMeta({
  title: '選項系統 (Options)',
  icon: 'mdi-format-list-bulleted',
  layout: 'portal'
})

onMounted(() => {
  console.log(options.status.value)
})
</script>

<template>
  <ShowcasePage
    title="選項系統 (Options System)"
    description="集中管理的選項資料庫，提供一致的選項定義與輔助方法。核心特色包含 Proxy 代理、自動快取、統一擴充方法。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="選項系統的核心特色"
        full-width
      >
        <div class="demo-area">
          <p
            class="method-desc"
            style="margin-bottom: 1.5rem"
          >
            <strong>可用方法與屬性：</strong>
          </p>
          <ShowcaseCodeBlock
            code="const options = useOptions()

// 1. 取得代理物件 (Proxy Object)
// 用途：傳遞引用、或者用來呼叫 API (options.status.reload())
// ⚠️ 注意：console.log(options.status) 只會印出 Proxy 函式，看不到資料！
const proxy = options.status

// 2. 迴圈迭代 (v-for)
// ⚠️ 注意：為什麼要加 .value？
// 因為 options.status 是「可呼叫的 Proxy 函式」(為了支援 options.townships('TPE'))
// Vue Template 只會自動解包 Ref，但不會執行 Function，所以必須顯式讀取 .value
options.status.value             // [推薦] 取得原始陣列
options.status.get()             // [替代] 取得原始陣列

// 3. 輔助屬性
options.status.isLoading  // 載入中狀態
options.status.isLoaded   // 載入完成狀態
options.status.withAll    // 自動加上 'All' 選項
options.status.other      // 自動加上 'Other' 選項

// 4. 輔助方法
options.status.label('ACTIVE')      // 取得標籤
options.status.findByValue('ACTIVE') // 取得完整物件
options.status.exclude(['DELETED']) // 排除特定選項
options.status.only(['ACTIVE'])     // 只保留特定選項
options.status.reload()             // 強制重新載入"
            label="useOptions() 功能總覽"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>集中管理:</strong>
              統一管理所有下拉選單資料，避免散落在各處
            </li>
            <li>
              <strong>自動快取:</strong>
              API 請求自動快取，避免重複呼叫
            </li>
            <li>
              <strong>Proxy 代理:</strong>
              直接存取屬性即可觸發載入，使用體驗極佳
            </li>
            <li>
              <strong>豐富輔助:</strong>
              內建標籤轉換、過濾、排除等常用功能
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code='&lt;!-- Template Usage --&gt;
&lt;select v-model="form.status"&gt;
  &lt;!-- 關鍵：v-for 迭代請使用 .value --&gt;
  &lt;option v-for="opt in options.status.value" :value="opt.value"&gt;
    {{ opt.label }}
  &lt;/option&gt;
&lt;/select&gt;'
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API Examples Section -->
    <ShowcaseSection
      title="API Examples (非同步載入範例)"
      icon="🌐"
    >
      <div class="text-slate-400 mb-4 leading-relaxed">
        以下選項來自模擬 API，展示非同步載入與
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          isLoading
        </code>
        狀態。
      </div>

      <div class="component-grid">
        <!-- 1. Countries API -->
        <ShowcaseCard
          title="Countries (國家列表)"
          description="無參數的 async API 範例"
        >
          <div
            class="bg-slate-900/50 border border-slate-700/30 rounded p-2 mb-3 inline-flex items-center text-sm"
          >
            <span class="text-slate-400 mr-2">載入狀態：</span>
            <strong :class="options.countries.isLoading ? 'text-amber-400' : 'text-emerald-400'">
              {{ options.countries.isLoading }}
            </strong>
          </div>
          <ShowcaseCodeBlock
            :code="JSON.stringify(options.countries, null, 2)"
            language="json"
            label="輸出結果"
          />
          <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
            <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
            <select
              v-model="demoSelection"
              class="glass-input"
            >
              <option
                v-for="item in options.countries.value"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 從 API 取得國家列表
const countries = options.countries

// 檢查載入狀態
const isLoading = countries.isLoading"
              label="使用代碼"
            />
          </template>
        </ShowcaseCard>

        <!-- 2. Currencies API -->
        <ShowcaseCard
          title="Currencies (幣別列表)"
          description="無參數的 async API 範例"
        >
          <div
            class="bg-slate-900/50 border border-slate-700/30 rounded p-2 mb-3 inline-flex items-center text-sm"
          >
            <span class="text-slate-400 mr-2">載入狀態：</span>
            <strong :class="options.currencies.isLoading ? 'text-amber-400' : 'text-emerald-400'">
              {{ options.currencies.isLoading }}
            </strong>
          </div>
          <ShowcaseCodeBlock
            :code="JSON.stringify(options.currencies, null, 2)"
            language="json"
            label="輸出結果"
          />
          <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
            <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
            <select
              v-model="demoSelection"
              class="glass-input"
            >
              <option
                v-for="item in options.currencies.value"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 從 API 取得幣別列表
const currencies = options.currencies

// 檢查載入狀態
const isLoading = currencies.isLoading"
              label="使用代碼"
            />
          </template>
        </ShowcaseCard>

        <!-- 3. Townships API (with parameter) -->
        <ShowcaseCard
          title="Townships (鄉鎮區列表)"
          description="帶參數的 async API - townships(cityId)"
        >
          <div class="flex items-center gap-2 mb-4">
            <label class="font-bold text-slate-300">City:</label>
            <select
              v-model="demoCity"
              class="glass-input"
            >
              <option value="TPE">TPE (台北)</option>
              <option value="KHH">KHH (高雄)</option>
            </select>
          </div>
          <div
            class="bg-slate-900/50 border border-slate-700/30 rounded p-2 mb-3 inline-flex items-center text-sm"
          >
            <span class="text-slate-400 mr-2">載入狀態：</span>
            <strong
              :class="options.townships(demoCity).isLoading ? 'text-amber-400' : 'text-emerald-400'"
            >
              {{ options.townships(demoCity).isLoading }}
            </strong>
          </div>
          <ShowcaseCodeBlock
            :code="JSON.stringify(options.townships(demoCity), null, 2)"
            language="json"
            label="輸出結果"
          />
          <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
            <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
            <select
              v-model="demoSelection"
              class="glass-input"
            >
              <option
                v-for="item in options.townships(demoCity).value"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              :code="`// 帶參數呼叫 API
const townships = options.townships('${demoCity}')

// 檢查載入狀態
const isLoading = townships.isLoading`"
              label="使用代碼"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 1. 一般使用範例 (General Usage) -->
    <!-- 1. 一般使用範例 -->
    <ShowcaseSection
      title="一般使用範例"
      icon="📝"
    >
      <div class="text-slate-400 mb-4 leading-relaxed">
        最常見的情境：將選項綁定到 Select 選單。 由於
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          options.xxx
        </code>
        本身就是陣列，可以直接使用
        <code class="bg-slate-800/50 px-1.5 py-0.5 rounded text-sky-300 font-mono text-sm">
          v-for
        </code>
        。
      </div>

      <div class="component-grid">
        <ShowcaseCard
          title="基礎 Select 整合"
          description="選項綁定範例"
          full-width
        >
          <div class="flex gap-4 flex-col lg:flex-row">
            <div class="flex-1">
              <ShowcaseCodeBlock
                code='&lt;script setup&gt;
// 1. 引入 composable
const options = useOptions()
const form = reactive({ status: &apos;ACTIVE&apos; })
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 2. v-for 使用 .value 取得陣列 --&gt;
  &lt;select v-model="form.status"&gt;
    &lt;option
      v-for="item in options.status.value"
      :key="item.value"
      :value="item.value"
    &gt;
      {{ item.label }}
    &lt;/option&gt;
  &lt;/select&gt;
&lt;/template&gt;'
                label="實作範例"
              />
            </div>
            <div class="flex-1">
              <ShowcaseCodeBlock
                :code="JSON.stringify(options.status, null, 2)"
                language="json"
                label="輸出結果 (options.status)"
              />
            </div>
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 2. 全功能演示 -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <ShowcaseCard
        title="功能測試區"
        description="測試 Options 系統的各項特性"
        full-width
      >
        <!-- A. 選擇操作對象 -->
        <div class="bg-slate-800/40 p-6 rounded-xl border border-slate-700/10 mb-6">
          <div class="flex flex-col gap-2">
            <label class="text-slate-300 font-medium">選擇測試對象：</label>
            <select
              v-model="selectedKey"
              class="glass-input w-full"
            >
              <option
                v-for="k in keys"
                :key="k"
                :value="k"
              >
                {{ k }}
              </option>
            </select>
          </div>

          <!-- Special input for townships -->
          <div
            v-if="selectedKey === 'townships'"
            class="flex flex-col gap-2 mt-4"
          >
            <label class="text-slate-300 font-medium">城市參數 (如 TPE, KHH)：</label>
            <select
              v-model="demoCity"
              class="glass-input w-full"
            >
              <option value="TPE">TPE (台北)</option>
              <option value="KHH">KHH (高雄)</option>
            </select>
          </div>
        </div>

        <div class="component-grid">
          <!-- 1. Array Property -->
          <ShowcaseCard
            title="1. Array 陣列用法"
            description="直接存取陣列內容"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultArray, null, 2)"
              language="json"
              label="輸出結果"
            />
            <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
              <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
              <select
                v-model="demoSelection"
                class="glass-input"
              >
                <option
                  v-for="item in resultArray.value"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 像普通陣列一樣使用
const list = ${usageCodePrefix}

// v-for usage
<li v-for=&quot;item in list&quot; :key=&quot;item.value&quot;>
  {{ item.label }}
</li>`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 2. isLoading -->
          <ShowcaseCard
            title="2. .isLoading (載入狀態)"
            description="檢查資料是否正在載入中"
          >
            <div class="font-mono text-lg p-2 bg-slate-900/50 rounded inline-block text-sky-400">
              {{ resultIsLoading }}
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// API 載入狀態
const loading = ${usageCodePrefix}.isLoading`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 3. isLoaded -->
          <ShowcaseCard
            title="3. .isLoaded (完成狀態)"
            description="檢查資料是否已經載入完成"
          >
            <div class="font-mono text-lg p-2 bg-slate-900/50 rounded inline-block text-sky-400">
              {{ resultIsLoaded }}
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// API 載入完成狀態
const loaded = ${usageCodePrefix}.isLoaded`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 4. withAll -->
          <ShowcaseCard
            title="4. .withAll (包含全部)"
            description="取得包含「全部」選項的新陣列"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultWithAll, null, 2)"
              language="json"
              label="輸出結果"
            />
            <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
              <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
              <select
                v-model="demoSelection"
                class="glass-input"
              >
                <option
                  v-for="item in resultWithAll"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 自動加上 'All' 選項
// 此屬性直接回傳陣列，v-for 不需加 .value
const allList = ${usageCodePrefix}.withAll`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 5. other -->
          <ShowcaseCard
            title="5. .other (包含其他)"
            description="取得包含「其他」選項的新陣列"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultOther, null, 2)"
              language="json"
              label="輸出結果"
            />
            <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
              <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
              <select
                v-model="demoSelection"
                class="glass-input"
              >
                <option
                  v-for="item in resultOther"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 自動加上 'Other' 選項
// 此屬性直接回傳陣列，v-for 不需加 .value
const otherList = ${usageCodePrefix}.other`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 6. label(val) -->
          <ShowcaseCard
            title="6. .label(value) 取得標籤"
            description="輸入 value 取得對應的 label"
          >
            <div class="mb-4">
              <label class="text-slate-300 mr-2">測試數值：</label>
              <input
                v-model="demoValue"
                class="glass-input"
                placeholder="輸入測試值..."
              />
            </div>
            <div class="font-mono text-lg p-2 bg-slate-900/50 rounded inline-block text-sky-400">
              "{{ resultLabel }}"
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 轉換顯示文字
const label = ${usageCodePrefix}.label('${demoValue}')`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 7. findByValue(val) -->
          <ShowcaseCard
            title="7. .findByValue(value) 取得物件"
            description="輸入 value 取得完整的選項物件"
          >
            <div class="mb-4">
              <label class="text-slate-300 mr-2">測試數值：</label>
              <input
                v-model="demoValue"
                class="glass-input"
                placeholder="輸入測試值..."
              />
            </div>
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultFindByValue, null, 2)"
              language="json"
              label="輸出結果"
            />
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 尋找完整物件
const item = ${usageCodePrefix}.findByValue('${demoValue}')`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 8. exclude(vals) -->
          <ShowcaseCard
            title="8. .exclude([values]) 排除"
            description="排除指定的 values"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultExclude, null, 2)"
              language="json"
              label="輸出結果"
            />
            <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
              <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
              <select
                v-model="demoSelection"
                class="glass-input"
              >
                <option
                  v-for="item in resultExclude"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 排除特定選項
// 回傳原始陣列，v-for 不需加 .value
const filtered = ${usageCodePrefix}.exclude(${JSON.stringify(demoExcludes)})`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 9. only(vals) -->
          <ShowcaseCard
            title="9. .only([values]) 保留"
            description="只保留指定的 values"
          >
            <ShowcaseCodeBlock
              :code="JSON.stringify(resultOnly, null, 2)"
              language="json"
              label="輸出結果"
            />
            <div class="mt-6 mb-4 pt-4 border-t border-slate-700/50 flex items-center">
              <label class="text-slate-400 text-sm mr-2">下拉選單範例：</label>
              <select
                v-model="demoSelection"
                class="glass-input"
              >
                <option
                  v-for="item in resultOnly"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 只保留特定選項
// 回傳原始陣列，v-for 不需加 .value
const filtered = ${usageCodePrefix}.only(${JSON.stringify(demoOnly)})`"
                label="使用代碼"
              />
            </template>
          </ShowcaseCard>

          <!-- 10. reload() -->
          <ShowcaseCard
            title="10. .reload() 強制重載"
            description="強制重新載入 API 資料 (Bypass Cache)"
          >
            <div class="mb-4">
              <button
                class="glass-btn primary"
                @click="handleReload"
              >
                執行 .reload()
              </button>
            </div>
            <div class="p-4 bg-slate-800 rounded font-mono text-sm text-slate-200">
              載入中： {{ resultIsLoading }}
              <br />
              最後更新： {{ new Date().toLocaleTimeString() }}
            </div>
            <template #footer>
              <ShowcaseCodeBlock
                :code="`// 強制刷新資料
await ${usageCodePrefix}.reload()`"
                label="Usage Code"
              />
            </template>
          </ShowcaseCard>
        </div>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <ShowcaseCard
        title="API 詳細說明"
        description="useOptions() 回傳物件屬性與方法"
        full-width
      >
        <div class="mb-4 text-slate-400 text-sm leading-relaxed">
          除了基本的陣列存取外，Options 物件還提供了豐富的輔助屬性與操作方法。
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse border border-slate-700">
            <thead>
              <tr>
                <th
                  class="p-4 border border-slate-600 bg-slate-800/50 text-slate-400 font-medium text-sm text-nowrap"
                >
                  屬性/方法 (Name)
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
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  options.[key]
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Proxy</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  存取選項資料 (支援靜態與 API)。可直接作為陣列使用 (需
                  <code class="text-sky-300">.value</code>
                  或
                  <code class="text-sky-300">.get()</code>
                  )。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  .value
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Array</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得原始選項陣列 (Vue Template 中若為 Proxy 物件需顯式呼叫)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  .isLoading
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  檢查非同步資料是否正在載入中。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  .isLoaded
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Boolean</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  檢查資料是否已經載入完成。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  .withAll
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Array</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得自動加上 'All' (全部) 選項的新陣列。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-sky-300 font-medium">
                  .other
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Array</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  取得自動加上 'Other' (其他) 選項的新陣列。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-fuchsia-300 font-medium">
                  .label(val)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  傳入 value，回傳對應的 label 文字。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  .findByValue(val)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  傳入 value，回傳完整的選項物件 (Option Object)。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  .exclude(vals)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  傳入要排除的 values 陣列，回傳過濾後的新陣列。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-indigo-300 font-medium">
                  .only(vals)
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  傳入要保留的 values 陣列，回傳過濾後的新陣列。
                </td>
              </tr>
              <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="p-4 border border-slate-700/50 font-mono text-pink-300 font-medium">
                  .reload()
                </td>
                <td class="p-4 border border-slate-700/50 text-slate-400 text-sm">Function</td>
                <td class="p-4 border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
                  強制重新載入 API 資料 (忽略快取)。
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
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
  min-width: 200px;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.glass-btn {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
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
