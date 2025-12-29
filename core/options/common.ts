import { computed } from 'vue' // Added missing import
import type { OptionItem } from './types'

/** 性別 - 基本 */
export const gender: OptionItem[] = [
  { label: '男', value: 'MALE' },
  { label: '女', value: 'FEMALE' }
]

/** 性別 - 擴充（繼承 gender） */
export const genderExtended: OptionItem[] = [...gender, { label: '未知', value: 'UNKNOWN' }]

/** 是否 */
export const yesNo: OptionItem[] = [
  { label: '是', value: 'Y' },
  { label: '否', value: 'N' }
]

/** 狀態（啟用/停用） */
export const status: OptionItem[] = [
  { label: '啟用', value: 'ACTIVE', color: 'green' },
  { label: '停用', value: 'INACTIVE', color: 'red' }
]

/** 作業狀態 */
export const opStatus: OptionItem[] = [
  { label: '草稿', value: 'DRAFT', color: 'grey' },
  { label: '生效', value: 'EFFECTIVE', color: 'green' },
  { label: '生效編輯中', value: 'EFF_EDIT', color: 'orange' },
  { label: '失效', value: 'INACTIVE', color: 'red' },
  { label: '待生效', value: 'PENDING', color: 'blue' }
]

/** 假資料：響應式選項 (Computed 範例) */
export const vocabularies = computed(() => {
  // 模擬： userId 透過 store異動等等
  return [
    { label: '蘋果', value: 'apple' },
    { label: '香蕉', value: 'banana' }
  ]
})
