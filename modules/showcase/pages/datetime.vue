<script setup lang="ts">
import { ref, computed } from 'vue'
import DataPreview from '../components/DataPreview.vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import IStack from '@/components/uiInterface/IStack.vue'
import IInput from '@/components/uiInterface/IInput.vue'
import ISelect from '@/components/uiInterface/ISelect.vue'
import ICard from '@/components/uiInterface/ICard.vue'

const {
  formatDate,
  formatTime,
  formatDateTime,
  formatRelative,
  add,
  subtract,
  diff,
  isBefore,
  isAfter,
  isSameDay,
  isToday,
  isWeekend,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  today,
  yesterday,
  tomorrow,
  isValid,
  getDateRange,
  getTimezone,
  toISO,
  toTimestamp,
  DEFAULT_FORMATS
} = useDateTime()

// Demo state
const demoDate = ref(new Date())
const demoDate2 = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // 7 days ago
const demoFormat = ref('YYYY-MM-DD HH:mm:ss')
const demoAmount = ref(7)
const demoUnit = ref<'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'>('day')
const demoDateString = ref('2024-12-25')

const unitOptions = [
  { label: '年', value: 'year' },
  { label: '月', value: 'month' },
  { label: '週', value: 'week' },
  { label: '天', value: 'day' },
  { label: '小時', value: 'hour' },
  { label: '分鐘', value: 'minute' },
  { label: '秒', value: 'second' }
]

// Computed examples
const formattedDate = computed(() => formatDate(demoDate.value, demoFormat.value))
const formattedTime = computed(() => formatTime(demoDate.value))
const formattedDateTime = computed(() => formatDateTime(demoDate.value))
const relativeTime = computed(() => formatRelative(demoDate2.value))

const addedDate = computed(() => add(demoDate.value, demoAmount.value, demoUnit.value))
const subtractedDate = computed(() => subtract(demoDate.value, demoAmount.value, demoUnit.value))
const dateDiff = computed(() => diff(demoDate.value, demoDate2.value, demoUnit.value))

const comparisonResults = computed(() => ({
  isBefore: isBefore(demoDate2.value, demoDate.value),
  isAfter: isAfter(demoDate.value, demoDate2.value),
  isSameDay: isSameDay(demoDate.value, demoDate2.value)
}))

const boundaryTimes = computed(() => ({
  startOfDay: formatDateTime(startOfDay(demoDate.value)),
  endOfDay: formatDateTime(endOfDay(demoDate.value)),
  startOfWeek: formatDateTime(startOfWeek(demoDate.value)),
  endOfWeek: formatDateTime(endOfWeek(demoDate.value)),
  startOfMonth: formatDateTime(startOfMonth(demoDate.value)),
  endOfMonth: formatDateTime(endOfMonth(demoDate.value))
}))

const shortcuts = computed(() => ({
  today: formatDate(today()),
  yesterday: formatDate(yesterday()),
  tomorrow: formatDate(tomorrow())
}))

const validationResult = computed(() => ({
  isValid: isValid(demoDateString.value),
  isToday: isToday(demoDate.value),
  isWeekend: isWeekend(demoDate.value)
}))

definePageMeta({
  title: '日期時間 (DateTime)',
  icon: 'mdi-calendar-clock',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="日期時間系統"
    description="完整的多語系日期時間處理模組，提供格式化、解析、計算與驗證功能。"
  >
    <!-- 基礎用法 -->
    <ShowcaseSection title="基礎用法">
      <ShowcaseCard
        title="核心功能"
        description="日期時間系統的核心特色"
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
  // 格式化
  formatDate,      // 日期格式化
  formatTime,      // 時間格式化
  formatDateTime,  // 日期時間格式化
  formatRelative,  // 相對時間
  
  // 計算
  add,             // 增加時間
  subtract,        // 減少時間
  diff,            // 計算差異
  
  // 比較
  isBefore,        // 檢查是否在之前
  isAfter,         // 檢查是否在之後
  isSameDay,       // 檢查是否同日
  
  // 輔助
  isValid,          // 驗證有效性
  startOfDay,       // 當天開始時間
  endOfDay          // 當天結束時間
} = useDateTime()"
            label="useDateTime() 提供的方法"
          />

          <p
            class="method-desc"
            style="margin-top: 1.5rem; margin-bottom: 1rem"
          >
            <strong>核心特色：</strong>
          </p>
          <ul class="benefit-list">
            <li>
              <strong>多語系支援:</strong>
              自動整合 i18n，支援多國語言格式
            </li>
            <li>
              <strong>強大計算:</strong>
              輕鬆處理日期的加減與比較
            </li>
            <li>
              <strong>相對時間:</strong>
              支援「幾分鐘前」、「幾天後」等相對描述
            </li>
            <li>
              <strong>邊界處理:</strong>
              快速取得日/週/月的開始與結束時間
            </li>
          </ul>
        </div>
        <template #footer>
          <ShowcaseCodeBlock
            code="const { formatDate, add } = useDateTime()

// 格式化當前日期
formatDate(new Date()) // '2024-01-01'

// 計算 7 天後
add(new Date(), 7, 'day') // Date Object"
            label="快速開始"
          />
        </template>
      </ShowcaseCard>
    </ShowcaseSection>

    <!-- 格式化展示 -->
    <ShowcaseSection
      title="基礎格式化"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="常用格式"
          description="最常見的日期時間格式化。"
        >
          <div class="demo-area">
            <div class="result-text">
              <span class="label">預設格式:</span>
              <span class="value">{{ DEFAULT_FORMATS }}</span>
            </div>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="formatDate(new Date(), 'YYYY-MM-DD')"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="互動測試"
      icon="🎮"
    >
      <!-- Control Panel -->
      <ShowcaseCard
        title="Control Panel"
        full-width
      >
        <div class="demo-area">
          <IStack
            gap="1"
            wrap="wrap"
          >
            <!-- Date Inputs -->
            <div style="flex: 1; min-width: 200px">
              <IInput
                v-model="demoDate"
                type="datetime-local"
                label="測試日期 1"
              />
            </div>
            <div style="flex: 1; min-width: 200px">
              <IInput
                v-model="demoDate2"
                type="datetime-local"
                label="測試日期 2"
              />
            </div>
            <div style="flex: 1; min-width: 200px">
              <IInput
                v-model="demoFormat"
                label="格式字串"
                placeholder="YYYY-MM-DD HH:mm:ss"
              />
            </div>
          </IStack>
        </div>
      </ShowcaseCard>

      <!-- Method Demos Grid -->
      <div class="component-grid mt-6">
        <!-- 1. Format Methods -->
        <ShowcaseCard
          title="1. 格式化方法"
          description="將日期轉換為指定格式的字串。"
        >
          <div class="demo-area">
            <DataPreview
              title="Output Results"
              :data="{
                formatDate: formattedDate,
                formatTime: formattedTime,
                formatDateTime: formattedDateTime,
                formatRelative: relativeTime
              }"
            />
          </div>
        </ShowcaseCard>

        <!-- 2. Calculation Methods -->
        <ShowcaseCard
          title="2. 計算方法"
          description="新增、減少時間或計算時間差。"
        >
          <div class="demo-area">
            <IStack
              gap="0.5"
              class="mb-4"
              align="flex-end"
            >
              <div style="flex: 1">
                <IInput
                  v-model.number="demoAmount"
                  type="number"
                  label="數量"
                />
              </div>
              <div style="flex: 1">
                <ISelect
                  v-model="demoUnit"
                  :options="unitOptions"
                  label="單位"
                />
              </div>
            </IStack>
            <DataPreview
              title="Output Results"
              :data="{
                original: formatDateTime(demoDate),
                added: formatDateTime(addedDate),
                subtracted: formatDateTime(subtractedDate),
                diff: `${dateDiff} ${demoUnit}`
              }"
            />
          </div>
        </ShowcaseCard>

        <!-- 3. Comparison Methods -->
        <ShowcaseCard
          title="3. 比較方法"
          description="比較兩個日期的先後關係。"
        >
          <div class="demo-area">
            <DataPreview
              title="Comparison Results"
              :data="comparisonResults"
            />
          </div>
        </ShowcaseCard>

        <!-- 4. Boundary Times -->
        <ShowcaseCard
          title="4. 邊界時間"
          description="取得一天、一週、一月的開始或結束時間。"
        >
          <div class="demo-area">
            <DataPreview
              title="Boundary Times"
              :data="boundaryTimes"
            />
          </div>
        </ShowcaseCard>

        <!-- 5. Shortcuts -->
        <ShowcaseCard
          title="5. 快捷方法"
          description="快速取得常用的日期。"
        >
          <div class="demo-area">
            <DataPreview
              title="Shortcuts"
              :data="shortcuts"
            />
          </div>
        </ShowcaseCard>

        <!-- 6. Validation -->
        <ShowcaseCard
          title="6. 驗證方法"
          description="驗證日期字串或判斷日期特性。"
        >
          <div class="demo-area">
            <IInput
              v-model="demoDateString"
              label="測試字串"
              placeholder="2024-12-25"
              class="mb-4"
            />
            <DataPreview
              title="Validation Results"
              :data="validationResult"
            />
          </div>
        </ShowcaseCard>

        <!-- 7. Utility Methods -->
        <ShowcaseCard
          title="7. 工具方法"
          description="其他實用的日期處理方法。"
        >
          <div class="demo-area">
            <DataPreview
              title="Utility Results"
              :data="{
                timezone: getTimezone(),
                iso: toISO(demoDate),
                timestamp: toTimestamp(demoDate),
                dateRange: getDateRange(yesterday(), tomorrow()).map((d) => formatDate(d))
              }"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- 格式符號 -->
    <ShowcaseSection
      title="格式符號"
      icon="📋"
    >
      <IStack
        wrap="wrap"
        gap="1"
      >
        <ICard
          v-for="tokenGroup in [
            { title: '年份', items: ['YYYY (2024)', 'YY (24)'] },
            { title: '月份', items: ['MM (01-12)', 'M (1-12)'] },
            { title: '日期', items: ['DD (01-31)', 'D (1-31)'] },
            { title: '小時', items: ['HH (00-23)', 'hh (01-12)'] },
            { title: '分鐘', items: ['mm (00-59)', 'm (0-59)'] },
            { title: '秒數', items: ['ss (00-59)', 's (0-59)'] },
            { title: '上下午', items: ['A (AM/PM)', 'a (am/pm)'] }
          ]"
          :key="tokenGroup.title"
          :title="tokenGroup.title"
          style="flex: 1; min-width: 150px"
        >
          <ul style="padding-left: 1.2rem; margin: 0">
            <li
              v-for="item in tokenGroup.items"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </ICard>
      </IStack>
    </ShowcaseSection>

    <!-- API 參考 -->
    <ShowcaseSection
      title="API 參考"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="1. 格式化方法"
          description="日期與時間顯示"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              formatDate, formatTime, formatDateTime, formatRelative
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 日期
formatDate(date) // '2024-01-01'

// 時間
formatTime(date) // '12:00:00'

// 相對時間
formatRelative(date) // '2 小時前'"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="2. 計算方法"
          description="日期運算"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              add, subtract, diff
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 增加 7 天
add(date, 7, 'day')

// 減少 1 個月
subtract(date, 1, 'month')

// 計算差異 (天數)
diff(date1, date2, 'day') // 5"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="3. 比較與驗證"
          description="邏輯判斷"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              isBefore, isAfter, isSameDay, isValid
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="isBefore(date1, date2) // true
isSameDay(date1, date2) // false
isValid('invalid-date') // false"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>

        <ShowcaseCard
          title="4. 邊界與快捷"
          description="快速取得特定時間"
        >
          <div class="demo-area">
            <p class="method-desc">
              <strong>方法：</strong>
              startOfDay, endOfMonth, today, yesterday
            </p>
          </div>
          <template #footer>
            <ShowcaseCodeBlock
              code="// 今天的開始時間
startOfDay(today())

// 本月最後一刻
endOfMonth(today())"
              label="使用範例"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
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

.label {
  color: #94a3b8;
  margin-right: 0.5rem;
}
.value {
  color: #f1f5f9;
  font-family: monospace;
}
</style>
