<script setup lang="ts">
import { ref } from 'vue'
import ShowcasePage from '../components/ShowcasePage.vue'
import ShowcaseSection from '../components/ShowcaseSection.vue'
import ShowcaseCard from '../components/ShowcaseCard.vue'
import ShowcaseCodeBlock from '../components/ShowcaseCodeBlock.vue'

const {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhone,
  capitalize,
  capitalizeWords,
  uppercase,
  lowercase,
  truncate,
  mask,
  maskEmail,
  maskPhone,
  formatJson,
  formatFileSize
} = useFormatter()

// Demo data
const demoNumber = ref(1234567.89)
const demoPhone = ref('0912345678')
const demoEmail = ref('user@example.com')
const demoText = ref('hello world')
const demoLongText = ref('This is a very long text that needs to be truncated')
const demoJson = ref({ name: '測試', value: 123, nested: { key: 'value' } })

definePageMeta({
  title: '資料格式化 (Formatter)',
  icon: 'mdi-format-text',
  layout: 'portal'
})
</script>

<template>
  <ShowcasePage
    title="資料格式化系統 (Formatter System)"
    description="完整的資料格式化模組，支援數字、字串、電話號碼等格式化功能。"
  >
    <!-- Interactive Demo -->
    <ShowcaseSection
      title="Interactive Demo"
      icon="🎮"
    >
      <div class="component-grid">
        <!-- Number Formatting -->
        <ShowcaseCard
          title="數字格式化"
          description="數值、貨幣與百分比處理"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Input Number</label>
              <input
                v-model.number="demoNumber"
                type="number"
                class="glass-input w-full"
              />
            </div>
            <ShowcaseCodeBlock
              :code="`formatNumber: ${formatNumber(demoNumber, 2)}
formatCurrency: ${formatCurrency(demoNumber, 'NT$', 0)}
formatPercent: ${formatPercent(demoNumber / 100, 2)}
formatFileSize: ${formatFileSize(demoNumber)}`"
              label="Results"
              :max-height="200"
            />
          </div>
        </ShowcaseCard>

        <!-- Phone Formatting -->
        <ShowcaseCard
          title="電話號碼格式化"
          description="自動格式化與遮罩"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Phone Number</label>
              <input
                v-model="demoPhone"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <div class="result-text">
              <div class="flex justify-between mb-2">
                <span class="text-gray-400">Formatted:</span>
                <span class="text-sky-300 font-mono">{{ formatPhone(demoPhone) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Masked:</span>
                <span class="text-sky-300 font-mono">{{ maskPhone(demoPhone) }}</span>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- String Formatting -->
        <ShowcaseCard
          title="字串格式化"
          description="大小寫轉換與截斷"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Input Text</label>
              <input
                v-model="demoText"
                type="text"
                class="glass-input w-full"
              />
            </div>
            <ShowcaseCodeBlock
              :code="`Capitalize: ${capitalize(demoText)}
Words: ${capitalizeWords(demoText)}
UPPER: ${uppercase(demoText)}
lower: ${lowercase(demoText)}
Truncate: ${truncate(demoLongText, 20)}`"
              label="Transformed"
              :max-height="200"
            />
          </div>
        </ShowcaseCard>

        <!-- Masking -->
        <ShowcaseCard
          title="隱私遮罩"
          description="Email 與自訂遮罩"
        >
          <div class="demo-area">
            <div class="input-group mb-4">
              <label>Email Address</label>
              <input
                v-model="demoEmail"
                type="email"
                class="glass-input w-full"
              />
            </div>
            <div class="result-text">
              <div class="flex justify-between mb-2">
                <span class="text-gray-400">Original:</span>
                <span>{{ demoEmail }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-400">Masked Email:</span>
                <span class="text-emerald-400 font-mono">{{ maskEmail(demoEmail) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Custom Mask:</span>
                <span class="text-emerald-400 font-mono">{{ mask(demoEmail, 2, 8, '*') }}</span>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <!-- JSON Formatting -->
        <ShowcaseCard
          title="JSON 格式化"
          description="物件資料視覺化"
          full-width
        >
          <div class="demo-area">
            <ShowcaseCodeBlock
              :code="formatJson(demoJson)"
              language="json"
              label="Formatted Output"
            />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>

<style scoped>
.input-group label {
  display: block;
  color: #94a3b8;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
}

.glass-input {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #f1f5f9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.glass-input:focus {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.w-full {
  width: 100%;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}

.flex {
  display: flex;
}
.justify-between {
  justify-content: space-between;
}

.text-gray-400 {
  color: #94a3b8;
}
.text-sky-300 {
  color: #7dd3fc;
}
.text-emerald-400 {
  color: #34d399;
}
.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
</style>
