'use client'

/**
 * AlignmentPanel.tsx — Interactive alignment tool.
 *
 * Lets the user adjust the X, Y, and scale of the currently-selected
 * item using arrow keys or +/- buttons. The adjusted values are shown
 * live and can be copied to the clipboard so the user can paste them
 * back to the developer.
 *
 * Includes an in-game controls reference table so the user can see
 * all the keyboard shortcuts while aligning.
 */

import { useState, useEffect, useCallback } from 'react'

export interface AlignmentValues {
  x: number
  y: number
  scale: number
}

interface AlignmentPanelProps {
  activeCategory: string
  selectedItemId: string | null
  values: AlignmentValues
  onValuesChange: (values: AlignmentValues) => void
  onReset: () => void
}

export function AlignmentPanel({
  activeCategory,
  selectedItemId,
  values,
  onValuesChange,
  onReset,
}: AlignmentPanelProps) {
  const [copied, setCopied] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // All categories are alignable EXCEPT background (which fills the entire canvas)
  const isAlignable = activeCategory !== 'background'

  // Keyboard arrow controls
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isAlignable || !selectedItemId) return

      const step = e.shiftKey ? 10 : 1
      let { x, y, scale } = values

      switch (e.key) {
        case 'ArrowUp':
          y -= step
          e.preventDefault()
          break
        case 'ArrowDown':
          y += step
          e.preventDefault()
          break
        case 'ArrowLeft':
          x -= step
          e.preventDefault()
          break
        case 'ArrowRight':
          x += step
          e.preventDefault()
          break
        case '+':
        case '=':
          scale = Math.min(2, scale + (e.shiftKey ? 0.2 : 0.02))
          e.preventDefault()
          break
        case '-':
        case '_':
          scale = Math.max(0.3, scale - (e.shiftKey ? 0.2 : 0.02))
          e.preventDefault()
          break
        default:
          return
      }

      onValuesChange({ x, y, scale })
    },
    [isAlignable, selectedItemId, values, onValuesChange],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const handleCopy = useCallback(async () => {
    const text = `${selectedItemId}: { x: ${values.x}, y: ${values.y}, scale: ${values.scale} }`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy these values:', text)
    }
  }, [selectedItemId, values])

  if (!isAlignable) {
    return (
      <div className="shrink-0 rounded-md border border-amber-300 bg-amber-50 p-2 text-[10px] text-amber-700">
        🔧 Alignment mode is active. Select any clothing category to adjust its position.
      </div>
    )
  }

  if (!selectedItemId) {
    return (
      <div className="shrink-0 rounded-md border border-amber-300 bg-amber-50 p-2 text-[10px] text-amber-700">
        🔧 Select an item to align it.
      </div>
    )
  }

  const nudge = (dx: number, dy: number, ds: number) => {
    onValuesChange({
      x: values.x + dx,
      y: values.y + dy,
      scale: Math.max(0.3, Math.min(2, values.scale + ds)),
    })
  }

  return (
    <div className="shrink-0 rounded-md border-2 border-amber-400 bg-amber-50 p-2.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wide text-amber-800">
          🔧 Aligning: {selectedItemId}
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setShowHelp(!showHelp)}
            className="rounded bg-amber-200 px-1.5 py-0.5 text-[9px] font-medium text-amber-800 hover:bg-amber-300"
          >
            ? Help
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded bg-amber-200 px-1.5 py-0.5 text-[9px] font-medium text-amber-800 hover:bg-amber-300"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-3 gap-1 text-center text-[10px]">
        <div className="rounded bg-white px-1 py-0.5">
          <div className="text-[8px] text-gray-500">X</div>
          <div className="font-mono font-bold text-amber-800">{values.x}</div>
        </div>
        <div className="rounded bg-white px-1 py-0.5">
          <div className="text-[8px] text-gray-500">Y</div>
          <div className="font-mono font-bold text-amber-800">{values.y}</div>
        </div>
        <div className="rounded bg-white px-1 py-0.5">
          <div className="text-[8px] text-gray-500">Scale</div>
          <div className="font-mono font-bold text-amber-800">{values.scale.toFixed(2)}</div>
        </div>
      </div>

      <div className="mb-2 flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <button type="button" onClick={() => nudge(0, -1, 0)} className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100">↑</button>
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => nudge(-1, 0, 0)} className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100">←</button>
          <button type="button" onClick={() => nudge(0, 1, 0)} className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100">↓</button>
          <button type="button" onClick={() => nudge(1, 0, 0)} className="flex h-6 w-6 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100">→</button>
        </div>
        <div className="mt-1 flex gap-1">
          <button type="button" onClick={() => nudge(0, 0, -0.05)} className="flex h-6 w-8 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100">−</button>
          <button type="button" onClick={() => nudge(0, 0, 0.05)} className="flex h-6 w-8 items-center justify-center rounded bg-white text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100">+</button>
        </div>
      </div>

      {showHelp && (
        <div className="mb-2 rounded bg-white p-2 text-[9px] text-stone-700">
          <div className="mb-1 font-bold text-amber-800">⌨️ Keyboard Controls</div>
          <table className="w-full">
            <thead>
              <tr className="text-[8px] uppercase text-stone-500">
                <th className="text-left">Key</th>
                <th className="text-left">Action</th>
                <th className="text-right">Step</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>↑</td><td>Move up</td><td className="text-right">−1 Y</td></tr>
              <tr><td>↓</td><td>Move down</td><td className="text-right">+1 Y</td></tr>
              <tr><td>←</td><td>Move left</td><td className="text-right">−1 X</td></tr>
              <tr><td>→</td><td>Move right</td><td className="text-right">+1 X</td></tr>
              <tr><td>+ / =</td><td>Scale up</td><td className="text-right">+0.02</td></tr>
              <tr><td>− / _</td><td>Scale down</td><td className="text-right">−0.02</td></tr>
              <tr className="border-t border-stone-200"><td>Shift + ↑↓←→</td><td>Fast move</td><td className="text-right">×10</td></tr>
              <tr><td>Shift + +/−</td><td>Fast scale</td><td className="text-right">×10</td></tr>
            </tbody>
          </table>
        </div>
      )}

      <button
        type="button"
        onClick={handleCopy}
        className="w-full rounded bg-amber-600 px-2 py-1.5 text-[10px] font-bold text-white shadow-sm hover:bg-amber-700"
      >
        {copied ? '✓ Copied!' : '📋 Copy Values'}
      </button>
    </div>
  )
}

export default AlignmentPanel
