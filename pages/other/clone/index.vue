<script setup>
import { useDeepClone } from '~/utils/common/useDeepClone'
/**
 * @功能 無使用深拷貝
 */
const noDeppCloneOriginal = reactive({
  bulid: { name: '全球人壽第二大樓', height: 4 }
})

const noDeppCloned = noDeppCloneOriginal
noDeppCloneOriginal.bulid.name = '全球人壽第三大樓'

console.log(`無做拷貝拷貝目標：${noDeppCloned.bulid.name}`) // 全球人壽第三大樓 ❌ 會受影響

/**
 * @功能 使用JSON.parse(JSON.stringify(obj))
 */
const jsonCloneOriginal = reactive({
  bulid: { name: '全球人壽第二大樓', height: 4 }
})

const jsonCloned = JSON.parse(JSON.stringify(jsonCloneOriginal))
jsonCloneOriginal.bulid.name = '全球人壽第三大樓'

console.log(`JSON.stringify拷貝目標：${jsonCloned.bulid.name}`) // 全球人壽第二大樓 ✅ 不受影響

// ❌ 缺點
// # 無法拷貝函式、undefined、Symbol
// #　日期 (Date)、正則 (RegExp) 會變成字串

/**
 * @功能 使用深拷貝套件
 */
const original = reactive({
  user: { name: 'John', age: 30 }
})
const cloned = useDeepClone(original)

original.user.age = 99
console.log(`useDeepClone拷貝目標：${cloned.user.age}`) // 30 ✅ 不受影響

// 碰到undefind不會錯
const undefinedClone = ref(undefined)
const getUndefinedClone = useDeepClone(undefinedClone) // 30 ✅ No error
</script>

<template>
  <v-card title="使用useDeepClone套件" class="pa-4">
    <pre>

    <code>
      /**
      * @功能 無使用深拷貝
      */
      const noDeppCloneOriginal = reactive({
        bulid: { name: '全球人壽第二大樓', height: 4 }
      })

      const noDeppCloned = noDeppCloneOriginal
      noDeppCloneOriginal.bulid.name = '全球人壽第三大樓'

      console.log(noDeppCloned.bulid.name) // 全球人壽第三大樓 ❌ 會受影響

      <hr />
      /**
      * @功能 使用JSON.parse(JSON.stringify(obj))
      */
      const jsonCloneOriginal = reactive({
        bulid: { name: '全球人壽第二大樓', height: 4 }
      })

      const jsonCloned = JSON.parse(JSON.stringify(jsonCloneOriginal))
      jsonCloneOriginal.bulid.name = '全球人壽第三大樓'

      console.log(jsonCloned.bulid.name) // 全球人壽第二大樓 ✅ 不受影響

      // ❌ 缺點
      // # 無法拷貝函式、undefined、Symbol
      // #　日期 (Date)、正則 (RegExp) 會變成字串

      <hr />
      /**
      * @功能 使用深拷貝套件
      */
      const original = reactive({
        user: { name: 'John', age: 30 }
      })
      const cloned = useDeepClone(original)

      original.user.age = 99
      console.log(cloned.user.age) // 30 ✅ 不受影響

      // 碰到undefind不會錯
      const undefinedClone = ref(undefined) // undefined ✅ No error
      const getUndefinedClone = useDeepClone(undefinedClone) // 30 ✅ No error
    </code>
  </pre>
  </v-card>
</template>
