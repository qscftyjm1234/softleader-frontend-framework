<script setup lang="ts">
interface Column {
  label: string
  field: string
  sortable?: boolean
  type?: 'text' | 'tag' | 'action'
}

interface Props {
  title?: string
  columns: Column[]
  data?: any[]
  api?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  api: '',
  data: () => []
})

// 狀態管理
const search = ref('')
const page = ref(1)
const itemsPerPage = ref(5)
const serverItems = ref<any[]>([])
const totalItems = ref(0)
const loading = ref(false)

// 轉換 columns 格式給 Vuetify
const headers = computed(() =>
  props.columns.map((col) => ({
    title: col.label,
    key: col.field,
    sortable: col.sortable !== false
  }))
)

// 載入資料函式
const loadItems = async ({ page: p, itemsPerPage: ipp }: any) => {
  if (!props.api) return

  loading.value = true
  try {
    // 使用 $fetch 而不是 useFetch，避免 Nuxt 的自動緩存/去重複機制導致資料沒更新
    const result = await $fetch(props.api, {
      params: {
        page: p,
        itemsPerPage: ipp,
        q: search.value
      }
    })

    if (result) {
      // 支援回傳格式 { items: [], total: 100 } 或直接回傳 []
      if (Array.isArray(result)) {
        serverItems.value = result
        totalItems.value = result.length
      } else {
        const res = result as any
        serverItems.value = res.items || []
        totalItems.value = res.total || 0
      }
    }
  } catch (e) {
    console.error('Failed to load items', e)
  } finally {
    loading.value = false
  }
}

// 監聽搜尋變更，重置頁碼並重新載入
let searchTimeout: ReturnType<typeof setTimeout>
watch(search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    // v-data-table-server 會自動觸發 loadItems，但有時需要手動強制更新
    // 這裡我們依賴 items-per-page 或 page 改變觸發，或者直接呼叫
  }, 500)
})

// 初始載入 (如果沒有 API，就用靜態資料)
onMounted(() => {
  if (!props.api) {
    serverItems.value = props.data
    totalItems.value = props.data.length
  }
})
</script>

<template>
  <v-card
    class="mb-4"
    elevation="0"
    border
    rounded="lg"
  >
    <v-card-title class="d-flex align-center py-3 px-4">
      <span class="text-h6 font-weight-bold">{{ title }}</span>
      <v-spacer />
      <!-- 搜尋框 -->
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="搜尋..."
        single-line
        hide-details
        density="compact"
        variant="outlined"
        style="max-width: 300px"
        class="ml-4"
        rounded="lg"
      />
    </v-card-title>

    <v-divider />

    <!-- Server Side Table -->
    <v-data-table-server
      v-if="api"
      v-model:items-per-page="itemsPerPage"
      v-model:page="page"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      class="elevation-0"
      hover
      @update:options="loadItems"
    >
      <!-- 自定義欄位渲染 -->
      <template
        v-for="col in columns"
        :key="col.field"
        #[`item.${col.field}`]="{ item }"
      >
        <!-- Tag Type -->
        <v-chip
          v-if="col.type === 'tag'"
          :color="
            item[col.field] === 'Admin'
              ? 'primary'
              : item[col.field] === 'Editor'
                ? 'success'
                : 'grey'
          "
          size="small"
          variant="flat"
        >
          {{ item[col.field] }}
        </v-chip>

        <!-- Default Text -->
        <span v-else>
          {{ item[col.field] }}
        </span>
      </template>
    </v-data-table-server>

    <!-- Static Table (Fallback) -->
    <v-data-table
      v-else
      :headers="headers"
      :items="data"
      :search="search"
      class="elevation-0"
      hover
    >
      <template
        v-for="col in columns"
        :key="col.field"
        #[`item.${col.field}`]="{ item }"
      >
        <span v-if="!col.type || col.type === 'text'">
          {{ item[col.field] }}
        </span>
      </template>
    </v-data-table>
  </v-card>
</template>
