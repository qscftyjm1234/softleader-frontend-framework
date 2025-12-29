<script setup lang="ts">
import { ref } from 'vue'
import DataPreview from '../components/DataPreview.vue'

const {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhone,
  formatTaiwanId,
  formatCreditCard,
  capitalize,
  capitalizeWords,
  uppercase,
  lowercase,
  truncate,
  trim,
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
  icon: 'mdi-format-text'
})
</script>

<template>
  <div class="inspector-container">
    <div class="page-header">
      <div class="header-main">
        <router-link
          to="/showcase"
          class="back-link"
        >
          返回
        </router-link>
        <h1 class="page-title">資料格式化系統 (Formatter System)</h1>
      </div>
      <p class="page-desc">完整的資料格式化模組，支援數字、字串、電話號碼等格式化功能。</p>
    </div>

    <section class="module-section">
      <h2 class="section-title">
        <span class="icon">🎮</span>
        Interactive Demo
      </h2>
      <div class="card-content">
        <div class="demo-stack">
          <!-- Number Formatting -->
          <div class="demo-item">
            <h3>數字格式化</h3>
            <input
              v-model.number="demoNumber"
              type="number"
              class="input-field"
            />
            <DataPreview
              title="Results"
              :data="{
                formatNumber: formatNumber(demoNumber, 2),
                formatCurrency: formatCurrency(demoNumber, 'NT$', 0),
                formatPercent: formatPercent(demoNumber / 100, 2),
                formatFileSize: formatFileSize(demoNumber)
              }"
            />
          </div>

          <!-- Phone Formatting -->
          <div class="demo-item">
            <h3>電話號碼格式化</h3>
            <input
              v-model="demoPhone"
              type="text"
              class="input-field"
            />
            <DataPreview
              title="Results"
              :data="{
                formatted: formatPhone(demoPhone),
                masked: maskPhone(demoPhone)
              }"
            />
          </div>

          <!-- String Formatting -->
          <div class="demo-item">
            <h3>字串格式化</h3>
            <input
              v-model="demoText"
              type="text"
              class="input-field"
            />
            <DataPreview
              title="Results"
              :data="{
                capitalize: capitalize(demoText),
                capitalizeWords: capitalizeWords(demoText),
                uppercase: uppercase(demoText),
                lowercase: lowercase(demoText),
                truncate: truncate(demoLongText, 20)
              }"
            />
          </div>

          <!-- Masking -->
          <div class="demo-item">
            <h3>遮罩</h3>
            <input
              v-model="demoEmail"
              type="email"
              class="input-field"
            />
            <DataPreview
              title="Results"
              :data="{
                original: demoEmail,
                masked: maskEmail(demoEmail),
                customMask: mask(demoEmail, 2, 8, '*')
              }"
            />
          </div>

          <!-- JSON Formatting -->
          <div class="demo-item">
            <h3>JSON 格式化</h3>
            <DataPreview
              title="Formatted JSON"
              :data="formatJson(demoJson)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.inspector-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
  color: #333;
}

.page-header {
  margin-bottom: 2rem;
}

.header-main {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.back-link {
  text-decoration: none;
  color: #666;
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #e0e0e0;
}

.page-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
}

.page-desc {
  color: #666;
  margin-left: 0.5rem;
  line-height: 1.5;
}

.module-section {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-title {
  padding: 1rem 1.5rem;
  background: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 0.5rem;
}

.card-content {
  padding: 1.5rem;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.demo-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  background: #fafafa;
}

.demo-item h3 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: #2c3e50;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
}
</style>
