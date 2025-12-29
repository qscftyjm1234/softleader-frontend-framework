<script setup lang="ts">
import { computed, ref } from 'vue'

// 定義元件 Props
const props = defineProps<{
  title: string // 標題
  data: any // 要展示的資料 (物件或陣列)
}>()

// 控制展開/折疊狀態
const expanded = ref(true)

/**
 * 格式化資料
 * 將資料物件轉換為格式化後的 JSON 字串，以便閱讀
 */
const formattedData = computed(() => {
  try {
    return JSON.stringify(props.data, null, 2)
  } catch {
    return String(props.data)
  }
})

/**
 * 外部控制展開狀態的方法
 * @param val
 */
const setExpanded = (val: boolean) => {
  expanded.value = val
}

// 暴露方法給父元件使用
defineExpose({
  setExpanded
})
</script>

<template>
  <div class="data-preview">
    <!-- 標題欄：包含標題與展開按鈕 -->
    <div
      class="header"
      @click="expanded = !expanded"
    >
      <h3 class="title">{{ title }}</h3>
      <button class="toggle-btn">
        {{ expanded ? '▼' : '▶' }}
      </button>
    </div>

    <!-- 內容區：JSON 程式碼 -->
    <div
      v-show="expanded"
      class="content"
    >
      <div class="code-block">
        <pre><code>{{ formattedData }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-preview {
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0.75rem; /* Reduced header padding */
  background-color: #f8f9fa;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid transparent;
  transition: background-color 0.2s;
  height: 2rem; /* Fixed low height */
}

.header:hover {
  background-color: #f0f0f0;
}

.data-preview:has(.content[style*='display: none']) .header {
  border-bottom: none;
}

.data-preview:has(.content:not([style*='display: none'])) .header {
  border-bottom: 1px solid #e0e0e0;
}

.title {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #777;
  cursor: pointer;
}

.content {
  background-color: #fff;
}

/* 內容區：JSON 程式碼 */
.code-block {
  padding: 0.5rem; /* Reduced code block padding */
  margin: 0;
  overflow-x: auto; /* 支援橫向捲動 */
  background-color: #1e1e1e; /* Dark background for better contrast */
  color: #e0e0e0; /* Light text */
  border-radius: 0 0 4px 4px;
  max-height: 720px; /* 限制最大高度，避免佔用太多版面 */
  overflow-y: auto; /* 內容過長時顯示垂直卷軸 */
}

pre {
  margin: 0;
}

code {
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem; /* Slightly smaller font */
  line-height: 1.25; /* Tighter line height */
  white-space: pre; /* Ensure correct formatting */
}
</style>
