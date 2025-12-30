/**
 * 自定義 ESLint 規則：檢查 Vue Ref<boolean> 的命名
 *
 * 檢查以下情況：
 * - ref<boolean>()
 * - computed<boolean>()
 * - reactive({ prop: boolean })
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description: '強制 Vue 響應式布林值變數使用正確的命名前綴',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      invalidBooleanRefName: '布林值響應式變數 "{{name}}" 必須以 {{prefixes}} 開頭'
    },
    schema: [
      {
        type: 'object',
        properties: {
          prefixes: {
            type: 'array',
            items: { type: 'string' },
            default: ['is', 'has', 'should', 'can', 'will', 'did']
          }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const options = context.options[0] || {}
    const prefixes = options.prefixes || ['is', 'has', 'should', 'can', 'will', 'did']

    /**
     * 檢查變數名稱是否符合布林值命名規則
     * @param name
     */
    function hasValidPrefix(name) {
      // 允許底線開頭（私有變數）
      const cleanName = name.startsWith('_') ? name.slice(1) : name
      return prefixes.some((prefix) => cleanName.startsWith(prefix))
    }

    /**
     * 檢查是否為布林值類型的 ref 或 computed
     * @param node
     */
    function isBooleanRef(node) {
      // 檢查 ref<boolean>() 或 computed<boolean>()
      if (
        node.callee &&
        (node.callee.name === 'ref' || node.callee.name === 'computed') &&
        node.typeParameters &&
        node.typeParameters.params.length > 0
      ) {
        const typeParam = node.typeParameters.params[0]
        // 檢查類型是否為 boolean
        if (typeParam.type === 'TSBooleanKeyword') {
          return true
        }
      }

      // 檢查 ref(true/false) - 從初始值推斷
      if (
        node.callee &&
        (node.callee.name === 'ref' || node.callee.name === 'computed') &&
        node.arguments.length > 0
      ) {
        const arg = node.arguments[0]

        // ref(true) 或 ref(false)
        if (arg.type === 'Literal' && typeof arg.value === 'boolean') {
          return true
        }

        // computed(() => true)
        if (
          node.callee.name === 'computed' &&
          (arg.type === 'ArrowFunctionExpression' || arg.type === 'FunctionExpression')
        ) {
          // 簡單檢查：如果返回 true/false
          if (arg.body.type === 'Literal' && typeof arg.body.value === 'boolean') {
            return true
          }
        }
      }

      return false
    }

    return {
      VariableDeclarator(node) {
        // 只檢查 const 宣告
        if (node.parent.kind !== 'const') {
          return
        }

        // 檢查是否為 ref 或 computed 呼叫
        if (node.init && node.init.type === 'CallExpression' && isBooleanRef(node.init)) {
          // 取得變數名稱
          if (node.id.type === 'Identifier') {
            const varName = node.id.name

            // 檢查命名是否符合規則
            if (!hasValidPrefix(varName)) {
              context.report({
                node: node.id,
                messageId: 'invalidBooleanRefName',
                data: {
                  name: varName,
                  prefixes: prefixes.join(', ')
                }
              })
            }
          }
        }
      }
    }
  }
}
