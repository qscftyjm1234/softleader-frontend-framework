import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Breadcrumb {
  label: string
  to: string
  current: boolean
}

/**
 * useBreadcrumbs - 動態產生麵包屑的 Composable
 *
 * 根據路由路徑與 meta.title 自動生成導航連結
 */
export const useBreadcrumbs = () => {
  const route = useRoute()

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const path = route.path
    const segments = path.split('/').filter(Boolean)

    const items: Breadcrumb[] = [
      {
        label: '首頁',
        to: '/',
        current: path === '/'
      }
    ]

    let currentPath = ''

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`

      // 邏輯上首頁 (/) 就代表了展間中心，因此跳過 '/showcase' 這個中介路徑節點
      if (segment === 'showcase') {
        return
      }

      const isLast = index === segments.length - 1

      // 嘗試從路由元資料中獲取標題
      const matchedRoute = route.matched.find((r) => r.path === currentPath)
      let label = matchedRoute?.meta?.title as string

      if (!label) {
        // 預設行為：首字母大寫
        label = segment.charAt(0).toUpperCase() + segment.slice(1)
      }

      items.push({
        label,
        to: currentPath,
        current: isLast
      })
    })

    return items
  })

  return {
    breadcrumbs
  }
}
