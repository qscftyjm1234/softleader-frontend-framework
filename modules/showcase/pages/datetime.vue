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
    title="日期時間系統 (DateTime System)"
    description="完整的多語系日期時間處理模組，提供格式化、解析、計算與驗證功能。"
  >
    <!-- General Usage Section -->
    <ShowcaseSection
      title="General Usage"
      icon="📝"
    >
      <div class="component-grid">
        <ShowcaseCard
          title="基礎格式化"
          description="最常見的情境：格式化日期時間顯示。"
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
              label="Usage Code"
            />
          </template>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>

    <!-- Interactive Playground -->
    <ShowcaseSection
      title="Interactive Playground"
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

    <!-- Format Tokens Section -->
    <ShowcaseSection
      title="Format Tokens (格式符號)"
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
  </ShowcasePage>
</template>
