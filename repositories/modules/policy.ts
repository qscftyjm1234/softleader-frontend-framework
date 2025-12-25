import { useClient } from '~/composables/useApi'

// ==========================================
// 最棒的管理模式：Smart Client + Dynamic Paths
// ==========================================

// 1. 基底 Client (只鎖定到 Service 層級)
const api = useClient('/jasmine-mar')

export default {
  // === 針對不同業務別 (qot, pos, mod) 的通用方法 ===

  /**
   * 取得保單/報價單詳情
   * 範例:
   * - getDetail('qot', '123') => GET /jasmine-mar/qot/policies/detail/123
   * - getDetail('pos', '456') => GET /jasmine-mar/pos/policies/detail/456
   * @param type
   * @param id
   */
  getDetail(type: 'qot' | 'pos' | 'mod', id: string) {
    // 技巧：利用 Template Literal 直接組裝動態路徑
    // 這種寫法比定義三個分開的 function 更具彈性且好維護
    return api.get(`${type}/policies/detail/${id}`)
  },

  // === 如果某些業務有特殊的列表搜尋，也可以分開寫 ===

  // GET /jasmine-mar/mar/policy/qot (假設這還是舊的路徑結構)
  // 如果新結構是 /qot/policies/list，那就改成 api.get('/qot/policies/list', { query: params })
  getQotList(params?: any) {
    return api.get('/mar/policy/qot', { query: params })
  },

  getPosList(params?: any) {
    return api.get('/mar/policy/pos', { query: params })
  }
}
