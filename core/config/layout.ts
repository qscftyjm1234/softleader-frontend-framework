export interface MenuItem {
  title?: string
  icon?: string
  to?: string
  action?: string
  divider?: boolean
  color?: string
  badge?: string
}

export interface LayoutConfig {
  branding: {
    logo: {
      icon: string
      image?: string
    }
    title: string
    subtitle: string
  }
  header: {
    visible: boolean
    height: number
    breadcrumbs: boolean
    search: boolean
    searchPlaceholder: string
    notifications: boolean
    userMenu: {
      visible: boolean
      items: MenuItem[]
    }
    themeToggle: boolean
    actions: MenuItem[]
  }
  sidebar: {
    visible: boolean
    width: number
    collapsible: boolean
    mainMenuTitle: string
    proCard: {
      visible: boolean
      title: string
      subtitle: string
      badge: string
    }
  }
  footer: {
    visible: boolean
    fixed: boolean
    content: string
  }
  theme: {
    defaultTheme: 'light' | 'dark'
    primaryColor: string
  }
}

export const defaultLayoutConfig: LayoutConfig = {
  branding: {
    logo: {
      icon: 'mdi-rocket-launch'
    },
    title: '松凌科技樣板系統',
    subtitle: 'SoftLeader System'
  },
  header: {
    visible: true,
    height: 64,
    breadcrumbs: true,
    search: true,
    searchPlaceholder: '搜尋全站...',
    notifications: true,
    userMenu: {
      visible: true,
      items: [
        { title: '個人設定', icon: 'mdi-account-cog', action: 'profile' },
        { title: '系統設定', icon: 'mdi-cog', action: 'settings' },
        { divider: true },
        { title: '登出系統', icon: 'mdi-logout', action: 'logout', color: 'error' }
      ]
    },
    themeToggle: true,
    actions: []
  },
  sidebar: {
    visible: true,
    width: 280,
    collapsible: true,
    mainMenuTitle: 'MAIN MENU',
    proCard: {
      visible: true,
      title: '富邦升級專業版',
      subtitle: '解鎖更多功能',
      badge: 'Pro'
    }
  },
  footer: {
    visible: true,
    fixed: false,
    content: '© 2026 富邦產險系統 保留所有權利.'
  },
  theme: {
    defaultTheme: 'light',
    primaryColor: '#1976D2'
  }
}
