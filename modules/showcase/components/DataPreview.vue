<script setup lang="ts">
import { computed, ref } from 'vue'
import ICard from '@/components/uiInterface/ICard.vue'

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
  <ICard
    class="data-preview"
    variant="outlined"
    :elevation="0"
  >
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
  </ICard>
</template>

<style scoped>
.data-preview {
  margin-bottom: 1rem;
  overflow: hidden;
}

/* 覆蓋 ICard 預設內距，讓 Header 貼齊邊緣 */
.data-preview :deep(.card-content) {
  padding: 0 !important;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid transparent;
  transition: background-color 0.2s;
  min-height: 2.5rem;
}

.header:hover {
  background-color: #f0f0f0;
}

/* 當內容展開時，Header 加底線 */
.data-preview:has(.content:not([style*='display: none'])) .header {
  border-bottom: 1px solid #e0e0e0;
}

.title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #666;
  cursor: pointer;
  padding: 0;
}

.content {
  background-color: #fff;
}

/* 內容區：JSON 程式碼 */
.code-block {
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  background-color: #1e1e1e;
  color: #e0e0e0;
  max-height: 500px;
  overflow-y: auto;
}

pre {
  margin: 0;
}

code {
  font-family: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.4;
  white-space: pre;
}
</style>
