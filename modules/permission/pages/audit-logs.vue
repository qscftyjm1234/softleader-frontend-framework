<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  "type": "Page",
  "blocks": [
    {
      "type": "SmartTable",
      "props": {
        "title": "稽核紀錄",
        "columns": [
          {
            "label": "時間",
            "field": "time"
          },
          {
            "label": "操作",
            "field": "action"
          },
          {
            "label": "使用者",
            "field": "user"
          }
        ],
        "data": []
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
