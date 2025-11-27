<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  "type": "Page",
  "blocks": [
    {
      "type": "SmartCard",
      "props": {
        "title": "保險總覽",
        "subtitle": "各項保險業務統計",
        "icon": "mdi-chart-bar",
        "color": "info"
      }
    }
  ]
}
</script>

<template>
  <div>
    <SchemaRenderer 
      v-for="(block, i) in pageSchema.blocks" 
      :key="i" 
      :schema="block" 
    />
  </div>
</template>
