<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  meta: {
    title: '訂單詳情'
  },
  blocks: [
    {
      type: 'div',
      props: {
        class: 'pa-4'
      },
      children: [
        {
          type: 'h1',
          props: {
            class: 'text-h4 mb-4'
          },
          children: []
        },
        {
          type: 'div',
          props: {
            class: 'text-body-1'
          },
          children: []
        }
      ]
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
