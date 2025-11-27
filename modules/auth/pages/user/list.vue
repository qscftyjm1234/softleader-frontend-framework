<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  "type": "Page",
  "blocks": [
    {
      "type": "div",
      "props": {
        "class": "mb-4"
      },
      "children": [
        {
          "type": "SmartCard",
          "props": {
            "title": "會員列表",
            "subtitle": "管理所有會員資料",
            "icon": "mdi-format-list-bulleted",
            "color": "primary"
          }
        }
      ]
    },
    {
      "type": "SmartTable",
      "props": {
        "title": "會員資料表 (Dynamic Data)",
        "api": "/api/users",
        "columns": [
          {
            "label": "ID",
            "field": "id"
          },
          {
            "label": "姓名",
            "field": "name"
          },
          {
            "label": "Email",
            "field": "email"
          },
          {
            "label": "角色",
            "field": "role"
          }
        ]
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
