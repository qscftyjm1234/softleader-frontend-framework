/**
 * 系統級全域日誌工具 (Logger)
 *
 * 特點：
 * 1. 自動判斷環境：預設只在開發環境 (Development) 輸出 Log，正式環境自動靜音。
 * 2. 統一格式：自動加上時間戳記與標籤。
 * 3. 無需引入：直接在任何地方使用 `Logger.info(...)`。
 */
export const logger = {
  /**
   * 一般資訊 (Info)
   * 只在開發環境顯示
   * @param message
   * @param {...any} args
   */
  info(message: any, ...args: any[]) {
    if (import.meta.dev) {
      console.log(
        `%c[INFO] %c${new Date().toLocaleTimeString()}`,
        'color: #3b82f6; font-weight: bold;',
        'color: #9ca3af;',
        message,
        ...args
      )
    }
  },

  /**
   * 成功訊息 (Success)
   * 只在開發環境顯示
   * @param message
   * @param {...any} args
   */
  success(message: any, ...args: any[]) {
    if (import.meta.dev) {
      console.log(
        `%c[SUCCESS] %c${new Date().toLocaleTimeString()}`,
        'color: #10b981; font-weight: bold;',
        'color: #9ca3af;',
        message,
        ...args
      )
    }
  },

  /**
   * 警告訊息 (Warn)
   * 在所有環境都會顯示
   * @param message
   * @param {...any} args
   */
  warn(message: any, ...args: any[]) {
    console.warn(
      `%c[WARN] %c${new Date().toLocaleTimeString()}`,
      'color: #f59e0b; font-weight: bold;',
      'color: #9ca3af;',
      message,
      ...args
    )
  },

  /**
   * 錯誤訊息 (Error)
   * 在所有環境都會顯示
   * @param message
   * @param {...any} args
   */
  error(message: any, ...args: any[]) {
    console.error(
      `%c[ERROR] %c${new Date().toLocaleTimeString()}`,
      'color: #ef4444; font-weight: bold;',
      'color: #9ca3af;',
      message,
      ...args
    )
  },

  /**
   * 除錯訊息 (Debug)
   * 只有在開啟 debug 模式時顯示
   * @param message
   * @param {...any} args
   */
  debug(message: any, ...args: any[]) {
    const config = useRuntimeConfig()
    if (config.public.app?.debug) {
      console.debug(
        `%c[DEBUG] %c${new Date().toLocaleTimeString()}`,
        'color: #8b5cf6; font-weight: bold;',
        'color: #9ca3af;',
        message,
        ...args
      )
    }
  }
}
