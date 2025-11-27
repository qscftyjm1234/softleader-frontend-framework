<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  "type": "Page",
  "blocks": [
    {
      "type": "SmartCard",
      "props": {
        "title": "客戶全貌",
        "icon": "mdi-account-group"
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
