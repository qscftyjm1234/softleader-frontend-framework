<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  blocks: [
    {
      type: 'SmartTable',
      props: {
        title: '系統權限列表',
        columns: [
          {
            label: '代碼',
            field: 'code'
          },
          {
            label: '名稱',
            field: 'name'
          }
        ],
        data: [
          {
            code: 'user.view',
            name: '查看會員'
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
