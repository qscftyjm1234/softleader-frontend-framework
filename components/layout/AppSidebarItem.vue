<script setup lang="ts">
import type { SidebarItem } from '~/core/sidebar/buildSidebar'

import AppSidebarItem from '~/components/layout/AppSidebarItem.vue'

defineOptions({
  name: 'AppSidebarItem'
})

const props = defineProps<{
  item: SidebarItem
}>()

// 如果沒有 icon，使用一個預設的 icon (如 mdi-circle) 但設為透明
// 這樣可以保持縮排一致
const displayIcon = computed(() => props.item.icon || 'mdi-circle-medium')
const isTransparent = computed(() => !props.item.icon)
</script>

<template>
  <!-- 如果有子選單，使用 v-list-group -->
  <v-list-group
    v-if="item.children && item.children.length > 0"
    :value="item.label"
  >
    <template #activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        :prepend-icon="displayIcon"
        :class="{ 'ghost-icon': isTransparent }"
        :title="item.label"
        rounded="lg"
        class="mb-1"
      />
    </template>

    <!-- 遞迴呼叫自己渲染子選單 -->
    <AppSidebarItem
      v-for="child in item.children"
      :key="child.label"
      :item="child"
    />
  </v-list-group>

  <!-- 如果沒有子選單，使用 v-list-item -->
  <v-list-item
    v-else
    :prepend-icon="displayIcon"
    :class="{ 'ghost-icon': isTransparent }"
    :title="item.label"
    :to="item.to"
    :value="item.to"
    :disabled="item.disabled"
    nuxt
    rounded="lg"
    class="mb-1"
    active-class="bg-primary text-white"
  />
</template>

<style scoped>
.ghost-icon :deep(.v-icon) {
  opacity: 0;
}
</style>
