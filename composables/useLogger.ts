/**
 * useLogger - 日誌系統
 * 提供分級日誌記錄、效能追蹤和環境區分功能
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogRecord {
  /** 日誌 ID */
  id: string
  /** 日誌等級 */
  level: LogLevel
  /** 日誌訊息 */
  message: string
  /** 附加資料 */
  data?: any
  /** 來源模組 */
  source?: string
  /** 時間戳記 */
  timestamp: Date
}

export interface TimerRecord {
  /** 計時器標籤 */
  label: string
  /** 開始時間 */
  startTime: number
}

export interface UseLoggerReturn {
  /** Debug 日誌 */
  debug: (message: string, data?: any) => void
  /** Info 日誌 */
  info: (message: string, data?: any) => void
  /** Warning 日誌 */
  warn: (message: string, data?: any) => void
  /** Error 日誌 */
  error: (message: string, data?: any) => void
  /** 開始計時 */
  startTimer: (label: string) => void
  /** 結束計時 */
  endTimer: (label: string) => void
  /** 設定日誌等級 */
  setLevel: (level: LogLevel) => void
  /** 清除日誌 */
  clearLogs: () => void
  /** 日誌歷史 */
  logs: Ref<LogRecord[]>
  /** 當前日誌等級 */
  currentLevel: Ref<LogLevel>
}

// 全域日誌儲存
const logs = ref<LogRecord[]>([])
const timers = new Map<string, TimerRecord>()
const currentLevel = ref<LogLevel>('info')

// 日誌等級優先順序
const levelPriority: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
}

/**
 * 日誌系統 Composable
 * @param source - 日誌來源（模組名稱）
 * @returns 日誌管理方法和狀態
 */
export function useLogger(source?: string): UseLoggerReturn {
  /**
   * 生成唯一 ID
   * @returns 唯一 ID
   */
  const generateId = (): string => {
    return `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }

  /**
   * 記錄日誌
   * @param level - 日誌等級
   * @param message - 日誌訊息
   * @param data - 附加資料
   */
  const log = (level: LogLevel, message: string, data?: any): void => {
    // 檢查是否應該記錄此等級的日誌
    if (levelPriority[level] < levelPriority[currentLevel.value]) {
      return
    }

    const record: LogRecord = {
      id: generateId(),
      level,
      message,
      data,
      source,
      timestamp: new Date()
    }

    // 儲存到日誌歷史
    logs.value.push(record)

    // 限制日誌數量（保留最新 1000 筆）
    if (logs.value.length > 1000) {
      logs.value.shift()
    }

    // 開發環境：輸出到 console
    if (import.meta.dev) {
      const prefix = source ? `[${source}]` : '[Logger]'
      const timestamp = record.timestamp.toLocaleTimeString()

      switch (level) {
        case 'debug':
          console.debug(`${prefix} ${timestamp}`, message, data)
          break
        case 'info':
          console.info(`${prefix} ${timestamp}`, message, data)
          break
        case 'warn':
          console.warn(`${prefix} ${timestamp}`, message, data)
          break
        case 'error':
          console.error(`${prefix} ${timestamp}`, message, data)
          break
      }
    }

    // 生產環境：可以送到後端日誌服務
    // if (import.meta.prod) {
    //   sendToLogService(record)
    // }
  }

  /**
   * Debug 日誌
   * @param message - 日誌訊息
   * @param data - 附加資料
   */
  const debug = (message: string, data?: any): void => {
    log('debug', message, data)
  }

  /**
   * Info 日誌
   * @param message - 日誌訊息
   * @param data - 附加資料
   */
  const info = (message: string, data?: any): void => {
    log('info', message, data)
  }

  /**
   * Warning 日誌
   * @param message - 日誌訊息
   * @param data - 附加資料
   */
  const warn = (message: string, data?: any): void => {
    log('warn', message, data)
  }

  /**
   * Error 日誌
   * @param message - 日誌訊息
   * @param data - 附加資料
   */
  const error = (message: string, data?: any): void => {
    log('error', message, data)
  }

  /**
   * 開始計時
   * @param label - 計時器標籤
   */
  const startTimer = (label: string): void => {
    timers.set(label, {
      label,
      startTime: performance.now()
    })
    debug(`Timer started: ${label}`)
  }

  /**
   * 結束計時
   * @param label - 計時器標籤
   */
  const endTimer = (label: string): void => {
    const timer = timers.get(label)
    if (!timer) {
      warn(`Timer not found: ${label}`)
      return
    }

    const duration = performance.now() - timer.startTime
    info(`Timer ended: ${label}`, { duration: `${duration.toFixed(2)}ms` })
    timers.delete(label)
  }

  /**
   * 設定日誌等級
   * @param level - 日誌等級
   */
  const setLevel = (level: LogLevel): void => {
    currentLevel.value = level
    info(`Log level set to: ${level}`)
  }

  /**
   * 清除日誌
   */
  const clearLogs = (): void => {
    logs.value = []
    info('Logs cleared')
  }

  return {
    debug,
    info,
    warn,
    error,
    startTimer,
    endTimer,
    setLevel,
    clearLogs,
    logs,
    currentLevel
  }
}
