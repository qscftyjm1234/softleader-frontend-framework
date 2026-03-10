import { ref } from 'vue'

const isWatermarkVisible = ref(false)

/**
 * @功能 浮水印 Composable
 * @description 在頁面上繪製浮水印，用於追溯資料來源
 */

interface WatermarkOptions {
  /** 浮水印文字（預設：使用者帳號 + 時間） */
  text?: string
  /** 字體大小（預設：16） */
  fontSize?: number
  /** 字體顏色（預設：rgba(255, 255, 255, 0.15)） */
  color?: string
  /** 旋轉角度（預設：-25） */
  rotate?: number
  /** 水平間距（預設：200） */
  gapX?: number
  /** 垂直間距（預設：150） */
  gapY?: number
  /** z-index（預設：9999） */
  zIndex?: number
}
/**
 *
 */
export function useWatermark() {
  const watermarkId = 'app-watermark'
  // Removed: let watermarkEl: HTMLDivElement | null = null

  /**
   * 建立浮水印 Canvas
   * @param options
   */
  const createWatermarkCanvas = (options: Required<WatermarkOptions>): string => {
    const { text, fontSize, color, rotate, gapX, gapY } = options

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    ctx.font = `bold ${fontSize}px "Microsoft JhengHei", "PingFang TC", sans-serif`
    const textWidth = ctx.measureText(text).width

    canvas.width = textWidth + gapX
    canvas.height = fontSize + gapY

    // 極致美化：加入白色發光效果
    ctx.font = `bold ${fontSize}px "Microsoft JhengHei", "PingFang TC", sans-serif`
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)'
    ctx.shadowBlur = 4
    ctx.fillStyle = color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((rotate * Math.PI) / 180)
    ctx.fillText(text, 0, 0)

    return canvas.toDataURL('image/png')
  }

  /**
   * 執行渲染浮水印 (內部使用)
   * @param options
   */
  const render = (options: WatermarkOptions = {}) => {
    // 徹底清除現有的所有浮水印，防止重複疊加
    document.querySelectorAll(`[id="${watermarkId}"]`).forEach((el) => el.remove())

    const defaultOptions: Required<WatermarkOptions> = {
      text: options.text || `${new Date().toLocaleDateString()}`,
      fontSize: options.fontSize ?? 16,
      color: options.color ?? 'rgba(255, 255, 255, 0.2)', // 預設使用半透明白
      rotate: options.rotate ?? -25,
      gapX: options.gapX ?? 220,
      gapY: options.gapY ?? 160,
      zIndex: options.zIndex ?? 9999
    }

    const watermarkImage = createWatermarkCanvas(defaultOptions)

    const watermarkEl = document.createElement('div')
    watermarkEl.id = watermarkId
    watermarkEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: ${defaultOptions.zIndex};
      background-image: url('${watermarkImage}');
      background-repeat: repeat;
      backdrop-filter: blur(1px); /* 輕微模糊背景提升質感 */
      -webkit-backdrop-filter: blur(1px);
    `

    document.body.appendChild(watermarkEl)
  }

  /**
   * 切換浮水印狀態
   * @param visible 是否顯示
   * @param options 配置項目
   */
  const toggle = (visible: boolean, options?: WatermarkOptions) => {
    isWatermarkVisible.value = visible
    if (visible) {
      render(options)
    } else {
      document.querySelectorAll(`[id="${watermarkId}"]`).forEach((el) => el.remove())
    }
  }

  return {
    showWatermark: isWatermarkVisible,
    toggle,
    // Removed: 保持舊版相容性 (如果有其他地方使用的話)
    // Removed: renderWatermark: render,
    hideWatermark: () => toggle(false)
  }
}
