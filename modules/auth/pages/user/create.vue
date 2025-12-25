<script setup lang="ts">
import SchemaRenderer from '~/components/renderer/SchemaRenderer.vue'
import type { PageSchema } from '~/core/schema/types'

const pageSchema: PageSchema = {
  type: 'Page',
  blocks: [
    {
      type: 'SmartCard',
      props: {
        subtitle: '建立新的會員帳號',
        icon: 'mdi-account-plus',
        color: 'success'
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
