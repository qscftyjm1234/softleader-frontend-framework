/**
 * @功能 前端安全防護 Plugin (Client Only)
 * @desc 實作各種前端防護機制，增加資料洩漏難度
 * @注意 這些措施無法 100% 阻止，但可大幅增加洩漏成本
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // ✅ 檢查是否啟用資安模式（預設關閉）
  const isSecurityEnabled =
    config.public.enableSecurityMode === true || config.public.enableSecurityMode === 'true'

  // 如果未啟用，直接返回
  if (!isSecurityEnabled) {
    console.log('[Security] 資安模式已關閉')
    return
  }

  console.log('[Security] 資安模式已啟用')
  const isProduction = config.public.env === 'production'

  // ==========================================
  // ======= 文字設定（可統一修改） =======
  // ==========================================
  const blurMessages = {
    // 截圖偵測
    screenshot: {
      icon: '⚠️',
      title: '富邦人壽資訊安全提醒',
      message: '為保護客戶資料安全，畫面擷取功能已被限制',
      action: '點擊任意處繼續'
    },
    // 視窗失焦
    visibility: {
      icon: '⚠️',
      title: '富邦人壽資訊安全提醒',
      message: '為保護客戶資料安全，畫面擷取功能已被限制',
      action: ''
    },
    // 閒置超時
    idle: {
      icon: '🔒',
      title: '畫面已鎖定',
      message: '因閒置過久，畫面已自動鎖定以保護資料安全',
      action: '點擊任意處或按任意鍵解除鎖定'
    }
  }

  /**
   * 安全防護選項
   * 可根據需求開關各項功能
   */
  const securityOptions = {
    disableContextMenu: true, // 禁用右鍵選單
    disableDevTools: true, // 禁用開發者工具快捷鍵
    disableTextSelection: false, // 禁用文字選取（依需求開啟）
    disableDragDrop: true, // 禁用拖曳
    disableConsole: isProduction, // 生產環境禁用 console
    disablePrintScreen: true, // 嘗試禁用 Print Screen
    blurOnVisibilityChange: true, // 切換視窗時模糊畫面
    blurOnPrintScreen: true, // 按下截圖鍵時模糊
    detectScreenCapture: true, // 偵測螢幕錄影/截圖並模糊
    preventMediaCapture: true, // 阻止 Media Capture API
    enableKioskMode: false, // 啟用 Kiosk 模式（全螢幕、隱藏網址列）
    disableNavigation: true, // 禁用瀏覽器導航快捷鍵
    preventBackNavigation: true, // 防止上一頁
    idleTimeoutBlur: true, // 閒置超時自動模糊
    idleTimeoutDuration: 3 * 60 * 1000 // 閒置時間（毫秒），預設 3 分鐘
  }

  // ==========================================
  // ======= 工具函式（需要在最前面定義） =======
  // ==========================================

  /**
   * 模糊層設定選項
   */
  interface BlurOverlayOptions {
    id: string // 元素 ID
    zIndex?: number // z-index 層級
    blurAmount?: number // 模糊程度（px）
    icon?: string // 圖示 emoji
    title?: string // 標題文字
    message?: string // 訊息內容
    action?: string // 動作提示文字
    clickToDismiss?: boolean // 點擊解除
    pointerEvents?: boolean // 是否可點擊（pointer-events）
    onShow?: () => void // 顯示時的回呼
    onHide?: () => void // 隱藏時的回呼
  }

  /**
   * 建立模糊遮罩（統一工廠函式）
   */
  function createBlurOverlay(options: BlurOverlayOptions) {
    const {
      id,
      zIndex = 999999,
      blurAmount = 8,
      icon = '⚠️',
      title = '',
      message = '',
      action = '',
      clickToDismiss = false,
      pointerEvents = true,
      onShow,
      onHide
    } = options

    const overlay = document.createElement('div')
    overlay.id = id
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(${blurAmount}px);
      -webkit-backdrop-filter: blur(${blurAmount}px);
      z-index: ${zIndex};
      display: none;
      ${pointerEvents ? 'cursor: pointer;' : 'pointer-events: none;'}
      justify-content: center;
      align-items: center;
    `

    // 只有在有內容時才顯示訊息框
    if (title || message || action) {
      overlay.innerHTML = `
        <div style="
          text-align: center;
          font-family: 'Microsoft JhengHei', -apple-system, sans-serif;
          background: #fff;
          padding: 28px 36px;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        ">
          ${icon ? `<div style="font-size: 32px; margin-bottom: 12px;">${icon}</div>` : ''}
          ${title ? `<div style="font-size: 15px; font-weight: 600; color: #333; margin-bottom: 8px;">${title}</div>` : ''}
          ${message ? `<div style="font-size: 13px; color: #666; margin-bottom: ${action ? '16px' : '0'};">${message}</div>` : ''}
          ${action ? `<div style="font-size: 12px; color: #999;">${action}</div>` : ''}
        </div>
      `
    }

    document.body.appendChild(overlay)

    const show = () => {
      overlay.style.display = 'flex'
      onShow?.()
    }

    const hide = () => {
      overlay.style.display = 'none'
      onHide?.()
    }

    const isVisible = () => overlay.style.display === 'flex'

    // 點擊解除
    if (clickToDismiss) {
      overlay.addEventListener('click', hide)
    }

    return {
      element: overlay,
      show,
      hide,
      isVisible
    }
  }

  /**
   * 顯示安全警告（Toast 樣式）
   */
  function showSecurityWarning(message: string) {
    const warning = document.createElement('div')
    warning.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 1000000;
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
      animation: slideDown 0.3s ease-out;
    `
    warning.textContent = `⚠️ ${message}`

    // 加入動畫樣式
    const animStyle = document.createElement('style')
    animStyle.textContent = `
      @keyframes slideDown {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
    `
    document.head.appendChild(animStyle)
    document.body.appendChild(warning)

    // 3秒後移除
    setTimeout(() => {
      warning.style.animation = 'slideDown 0.3s ease-out reverse'
      setTimeout(() => warning.remove(), 300)
    }, 3000)
  }

  // ==========================================
  // ======= 建立所有模糊層 =======
  // ==========================================

  // 截圖偵測模糊層（持續顯示，需點擊解除）
  const screenshotBlur = createBlurOverlay({
    id: 'screenshot-blur',
    zIndex: 2147483647,
    blurAmount: 8,
    icon: blurMessages.screenshot.icon,
    title: blurMessages.screenshot.title,
    message: blurMessages.screenshot.message,
    action: blurMessages.screenshot.action,
    clickToDismiss: true,
    onShow: () => {
      // 清空剪貼簿
      navigator.clipboard.writeText('').catch(() => {})
    }
  })

  // 先發制人模糊層（無訊息，純模糊）
  const preemptiveBlur = createBlurOverlay({
    id: 'preemptive-blur',
    zIndex: 2147483646,
    blurAmount: 8,
    pointerEvents: false
  })

  // 視窗失焦模糊層
  const visibilityBlur = createBlurOverlay({
    id: 'visibility-blur',
    zIndex: 999999,
    blurAmount: 8,
    icon: blurMessages.visibility.icon,
    title: blurMessages.visibility.title,
    message: blurMessages.visibility.message,
    action: blurMessages.visibility.action
  })

  // 閒置超時模糊層
  const idleBlur = createBlurOverlay({
    id: 'idle-blur',
    zIndex: 2147483645,
    blurAmount: 12,
    icon: blurMessages.idle.icon,
    title: blurMessages.idle.title,
    message: blurMessages.idle.message,
    action: blurMessages.idle.action,
    clickToDismiss: true
  })

  // ===== 1. 禁用右鍵選單 =====
  if (securityOptions.disableContextMenu) {
    document.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault()
      return false
    })
  }

  // ===== 2. 禁用開發者工具快捷鍵 =====
  if (securityOptions.disableDevTools) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+I (開發者工具)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        return false
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        return false
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        return false
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault()
        return false
      }
    })
  }

  // ===== 3. 禁用文字選取 =====
  if (securityOptions.disableTextSelection) {
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'

    const style = document.createElement('style')
    style.textContent = `
      body { user-select: none !important; -webkit-user-select: none !important; }
      .selectable { user-select: text !important; -webkit-user-select: text !important; }
    `
    document.head.appendChild(style)
  }

  // ===== 4. 禁用拖曳圖片/連結 =====
  if (securityOptions.disableDragDrop) {
    document.addEventListener('dragstart', (e: DragEvent) => {
      e.preventDefault()
      return false
    })

    document.addEventListener('drop', (e: DragEvent) => {
      e.preventDefault()
      return false
    })
  }

  // ===== 5. 生產環境移除 Console =====
  if (securityOptions.disableConsole) {
    const noop = () => {}
    console.log = noop
    console.warn = noop
    console.info = noop
    console.debug = noop
  }

  // ==========================================
  // ======= 防止截圖相關進階功能 =======
  // ==========================================

  // ===== 6. Print Screen 按鍵偵測與持續模糊 =====
  if (securityOptions.disablePrintScreen) {
    // 📌 方法1: keydown 立即模糊（盡早觸發）
    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        // PrintScreen 鍵 - 持續模糊
        if (e.key === 'PrintScreen') {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }

        // Windows + Shift + S (截圖工具) - 持續模糊
        if (e.shiftKey && e.metaKey && e.key.toLowerCase() === 's') {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }

        // Alt + PrintScreen (截取當前視窗)
        if (e.key === 'PrintScreen' && e.altKey) {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }

        // MacOS: Cmd + Shift + 3/4/5
        if (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) {
          screenshotBlur.show()
          e.preventDefault()
          return false
        }
      },
      true
    ) // 使用 capture: true 更早捕獲

    // 📌 方法2: keyup 也觸發（補救）
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        screenshotBlur.show()
      }
    })

    // 📌 方法3: 「先發制人」策略 - 在截圖前就模糊
    // 因為 Win+Shift+S 是系統級快捷鍵，必須在用戶完成按鍵組合前就模糊
    let blurTimeout: ReturnType<typeof setTimeout> | null = null
    let isPreemptiveBlur = false

    // 顯示先發制人模糊
    const showQuickBlur = () => {
      preemptiveBlur.show()
      isPreemptiveBlur = true
    }

    // 隱藏先發制人模糊
    const hideQuickBlur = () => {
      preemptiveBlur.hide()
      isPreemptiveBlur = false
    }

    // 🔑 核心：當 Shift 按下時立即模糊
    document.addEventListener(
      'keydown',
      (e: KeyboardEvent) => {
        // 清除之前的計時器
        if (blurTimeout) {
          clearTimeout(blurTimeout)
          blurTimeout = null
        }

        // 當 Shift 鍵按下時，立即顯示模糊
        // 這會在用戶完成 Win+Shift+S 組合之前就模糊
        if (e.key === 'Shift') {
          showQuickBlur()
          console.log('[Security] Shift 按下，先發制人模糊')

          // 500ms 後如果沒有失焦（沒有截圖），則解除模糊
          blurTimeout = setTimeout(() => {
            if (isPreemptiveBlur && document.hasFocus()) {
              hideQuickBlur()
              console.log('[Security] 500ms 無截圖，解除模糊')
            }
          }, 500)
        }
      },
      true
    )

    // Shift 放開時，延遲解除模糊（給一點時間偵測是否有截圖）
    document.addEventListener(
      'keyup',
      (e: KeyboardEvent) => {
        if (e.key === 'Shift') {
          setTimeout(() => {
            if (isPreemptiveBlur && document.hasFocus()) {
              hideQuickBlur()
            }
          }, 300)
        }
      },
      true
    )

    // 視窗失焦時（確認是截圖），顯示持續模糊
    window.addEventListener('blur', () => {
      if (isPreemptiveBlur) {
        // 確認是截圖行為，顯示持續模糊層
        hideQuickBlur()
        screenshotBlur.show()
        console.warn('[Security] 確認截圖行為，顯示持續模糊')
      }
    })

    window.addEventListener('focus', () => {
      // 回到焦點時，清除先發制人模糊
      hideQuickBlur()
    })
  }

  // ===== 7. 視窗失焦時模糊畫面 =====
  if (securityOptions.blurOnVisibilityChange) {
    // 頁面切換到背景時
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        visibilityBlur.show()
      } else {
        // 延遲移除，避免截圖
        setTimeout(() => visibilityBlur.hide(), 300)
      }
    })

    // 視窗失焦時
    window.addEventListener('blur', () => {
      visibilityBlur.show()
    })

    window.addEventListener('focus', () => {
      setTimeout(() => visibilityBlur.hide(), 300)
    })
  }

  // ===== 8. 偵測螢幕錄影 (Screen Capture Detection) =====
  if (securityOptions.detectScreenCapture) {
    // 使用 getDisplayMedia 權限偵測
    // 如果有人嘗試螢幕分享/錄影，會觸發持續模糊
    const detectDisplayMedia = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        // 攔截 getDisplayMedia
        const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(
          navigator.mediaDevices
        )
        navigator.mediaDevices.getDisplayMedia = async (constraints) => {
          console.warn('[Security] Screen capture attempt detected - showing blur')
          screenshotBlur.show()
          // 清空剪貼簿
          navigator.clipboard.writeText('⚠️ 螢幕錄影已被偵測').catch(() => {})
          return originalGetDisplayMedia(constraints)
        }
      }
    }
    detectDisplayMedia()
  }

  // ===== 9. 阻止 Media Capture API =====
  if (securityOptions.preventMediaCapture) {
    // 攔截 canvas.toDataURL 和 canvas.toBlob
    // 防止使用 canvas 截取畫面，並顯示模糊
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL
    const originalToBlob = HTMLCanvasElement.prototype.toBlob

    HTMLCanvasElement.prototype.toDataURL = function (...args) {
      // 可選擇性允許某些 canvas
      if (this.dataset.allowCapture !== 'true') {
        console.warn('[Security] Canvas capture attempt - showing blur')
        screenshotBlur.show()
        // 回傳空白圖片
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      }
      return originalToDataURL.apply(this, args)
    }

    HTMLCanvasElement.prototype.toBlob = function (callback, ...args) {
      if (this.dataset.allowCapture !== 'true') {
        console.warn('[Security] Canvas toBlob attempt - showing blur')
        screenshotBlur.show()
        // 回傳空白圖片的 blob
        const emptyCanvas = document.createElement('canvas')
        emptyCanvas.width = 1
        emptyCanvas.height = 1
        return originalToBlob.apply(emptyCanvas, [callback, ...args])
      }
      return originalToBlob.apply(this, [callback, ...args])
    }
  }

  // ===== 10. 偵測開發者工具開啟 =====
  if (isProduction) {
    let devToolsOpen = false
    const threshold = 160

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold

      if (widthThreshold || heightThreshold) {
        if (!devToolsOpen) {
          devToolsOpen = true
          console.warn('[Security] DevTools may be open')
          // 可在此顯示警告或採取其他行動
        }
      } else {
        devToolsOpen = false
      }
    }

    setInterval(checkDevTools, 1000)
  }

  // ===== 11. CSS 防護：列印時隱藏內容 =====
  const printProtectionStyle = document.createElement('style')
  printProtectionStyle.textContent = `
    @media print {
      body * {
        visibility: hidden !important;
      }
      body::after {
        content: "列印功能已被禁用";
        visibility: visible;
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 24px;
        color: #666;
      }
    }
  `
  document.head.appendChild(printProtectionStyle)

  // ===== 12. 禁用瀏覽器導航快捷鍵 =====
  if (securityOptions.disableNavigation) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // Alt + Left Arrow (上一頁)
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault()
        return false
      }

      // Alt + Right Arrow (下一頁)
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault()
        return false
      }

      // Backspace (部分瀏覽器上一頁)
      if (
        e.key === 'Backspace' &&
        !(e.target as HTMLElement).matches('input, textarea, [contenteditable]')
      ) {
        e.preventDefault()
        return false
      }

      // F5 / Ctrl+R (重新整理)
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault()
        return false
      }

      // Ctrl+L / Alt+D / F6 (聚焦網址列)
      if ((e.ctrlKey && e.key === 'l') || (e.altKey && e.key === 'd') || e.key === 'F6') {
        e.preventDefault()
        return false
      }

      // Ctrl+T (新分頁)
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault()
        return false
      }

      // Ctrl+W (關閉分頁)
      if (e.ctrlKey && e.key === 'w') {
        e.preventDefault()
        return false
      }

      // Ctrl+N (新視窗)
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault()
        return false
      }
    })
  }

  // ===== 13. 防止上一頁（History API） =====
  if (securityOptions.preventBackNavigation) {
    // 方法1: 覆蓋 history state
    history.pushState(null, '', location.href)

    window.addEventListener('popstate', () => {
      history.pushState(null, '', location.href)
    })

    // 方法2: beforeunload 警告
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    })
  }

  // ===== 14. 閒置超時自動模糊 =====
  if (securityOptions.idleTimeoutBlur) {
    let idleTimer: ReturnType<typeof setTimeout> | null = null

    // 重置閒置計時器
    const resetIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer)
      }
      idleTimer = setTimeout(() => {
        idleBlur.show()
        console.log('[Security] 閒置超時，畫面已鎖定')
      }, securityOptions.idleTimeoutDuration)
    }

    // 按鍵解除模糊並重置計時器
    document.addEventListener('keydown', () => {
      if (idleBlur.isVisible()) {
        idleBlur.hide()
      }
      resetIdleTimer()
    })

    // 監聽使用者活動事件
    const activityEvents = ['mousemove', 'mousedown', 'scroll', 'touchstart', 'touchmove']
    activityEvents.forEach((event) => {
      document.addEventListener(
        event,
        () => {
          if (!idleBlur.isVisible()) {
            // 只有在未鎖定時才重置計時器，避免滑鼠微動解除鎖定
            resetIdleTimer()
          }
        },
        { passive: true }
      )
    })

    // 點擊解除後也重置計時器
    idleBlur.element.addEventListener('click', resetIdleTimer)

    // 初始化計時器
    resetIdleTimer()
    console.log(
      `[Security] 閒置超時模糊已啟用，閒置 ${securityOptions.idleTimeoutDuration / 1000} 秒後將鎖定畫面`
    )
  }

  // ===== 15. Kiosk 模式（全螢幕，隱藏網址列） =====
  if (securityOptions.enableKioskMode) {
    // 進入全螢幕的函式
    const enterFullscreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen()
        }
      } catch (err) {
        console.warn('[Security] Fullscreen request failed:', err)
      }
    }

    // 首次點擊時進入全螢幕
    const handleFirstClick = () => {
      enterFullscreen()
      document.removeEventListener('click', handleFirstClick)
    }
    document.addEventListener('click', handleFirstClick)

    // 監聽 ESC 退出全螢幕，自動重新進入
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        // 使用者按 ESC 退出，提示重新進入
        setTimeout(() => {
          if (confirm('為了安全考量，請維持全螢幕模式。點擊確定重新進入。')) {
            enterFullscreen()
          }
        }, 100)
      }
    })
  }

  // ===== 16. 在新視窗開啟（隱藏網址列）的工具函式 =====
  // 可在登入後呼叫，開啟無網址列的視窗
  ;(window as any).openSecureWindow = (url: string = location.href) => {
    const width = screen.availWidth
    const height = screen.availHeight

    const features = [
      `width=${width}`,
      `height=${height}`,
      'top=0',
      'left=0',
      'menubar=no', // 隱藏選單列
      'toolbar=no', // 隱藏工具列
      'location=no', // 隱藏網址列
      'status=no', // 隱藏狀態列
      'resizable=yes',
      'scrollbars=yes'
    ].join(',')

    const secureWindow = window.open(url, '_blank', features)

    if (secureWindow) {
      // 關閉原視窗
      window.close()
    } else {
      alert('請允許彈出視窗以使用安全模式')
    }

    return secureWindow
  }
})
