'use client'

import { useEffect, useRef } from 'react'

/** 三语轮播文案 */
const TEXTS = {
  en: 'Decoding Health with Next-Generation AI.',
  zh: '用下一代 AI 解码健康。',
  ja: '次世代AIで健康を解読する。',
}

const LANG_ORDER: (keyof typeof TEXTS)[] = ['en', 'zh', 'ja']

// ---------- 可调参数 (baffle 文档: https://camwiegert.github.io/baffle/) ----------
// characters: 混淆时显示的字符集，可改为字母/数字/符号，如 '01'、'█▓▒░'、'AaBbCc...'
// speed: 混淆动画刷新间隔(ms)，越小越闪得快
// exclude: 不参与混淆的字符，默认 [' ']，可加标点等
// REVEAL_MS: 揭示动画时长(ms)
// STAY_MS: 每种语言停留时长(ms)，不含揭示时间
const BAFFLE_OPTIONS = {
  characters: '░▒▓█▀▄▌▐',
  speed: 100,
  exclude: [' '],
}
const REVEAL_MS = 1200
const REVEAL_DELAY_MS = 0 // reveal(duration, delay) 的延迟，可做“先停再揭示”
const STAY_MS = 4000

type BaffleInstance = {
  start: () => BaffleInstance
  stop: () => BaffleInstance
  text: (fn: (prev: string) => string) => BaffleInstance
  reveal: (duration?: number, delay?: number) => BaffleInstance
  set: (opts: { characters?: string; speed?: number; exclude?: string[] }) => BaffleInstance
}

export default function BaffleSubtitle() {
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    let intervalId: ReturnType<typeof setInterval>

    const init = async () => {
      const mod = await import('baffle')
      const baffle = (mod.default || mod) as (
        sel: HTMLElement,
        opts?: { characters?: string; speed?: number; exclude?: string[] }
      ) => BaffleInstance
      if (typeof baffle !== 'function') return

      const b = baffle(el, {
        characters: BAFFLE_OPTIONS.characters,
        speed: BAFFLE_OPTIONS.speed,
        exclude: BAFFLE_OPTIONS.exclude,
      })

      // 从 1 开始，首次 cycle 切到 zh，避免「先 reveal 英文」后再轮播又播一遍英文
      let index = 1
      const cycle = () => {
        const nextLang = LANG_ORDER[index % LANG_ORDER.length]
        index += 1
        const nextText = TEXTS[nextLang]
        b.text(() => nextText).reveal(REVEAL_MS, REVEAL_DELAY_MS)
      }

      b.start().reveal(REVEAL_MS, REVEAL_DELAY_MS)
      intervalId = setInterval(cycle, REVEAL_MS + REVEAL_DELAY_MS + STAY_MS)
    }

    init()
    return () => clearInterval(intervalId)
  }, [])

  return (
    <span ref={elRef} className="inline-block min-h-[1.5em]" suppressHydrationWarning>
      {TEXTS.en}
    </span>
  )
}
