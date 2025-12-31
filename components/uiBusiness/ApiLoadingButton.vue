<script setup lang="ts">
/**
 *ApiLoadingButton - 業務邏輯層
 *
 * 用途：
 * 1. 封裝 API 呼叫邏輯
 * 2. 自動處理 Global Loading (透過 useApi)
 * 3. 觸發延遲 Mock API
 */

import ILoadingButton from '@/components/uiInterface/ILoadingButton.vue'

interface Props {
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: '發送 API 請求'
})

// 使用 useApi，它內部已經整合了 useLoading
const api = useApi

const handleClick = async () => {
  try {
    // 呼叫我們剛剛建立的 Mock API
    // globalLoading: true (預設值) 會觸發全域 Loading
    await api('/api/mock/delay', {
      globalLoading: true,
      autoSuccess: true // 自動顯示成功訊息
    })
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <ILoadingButton
    variant="primary"
    @click="handleClick"
  >
    {{ label }}
  </ILoadingButton>
</template>
