<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  blocks: [
    {
      type: 'SmartTable',
      props: {
        title: '保單清單',
        columns: [
          {
            label: '保單號碼',
            field: 'no'
          },
          {
            label: '要保人',
            field: 'applicant'
          }
        ],
        data: []
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
