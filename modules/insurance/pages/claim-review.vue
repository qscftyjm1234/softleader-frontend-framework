<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  "type": "Page",
  "blocks": [
    {
      "type": "SmartCard",
      "props": {
        "title": "理賠審核",
        "icon": "mdi-gavel",
        "color": "warning"
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
