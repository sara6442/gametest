'use client'

/**
 * DressupGame.tsx — Main game page.
 *
 * Layout (FIXED — no page scroll):
 *   ┌──────────────────────────────────────────┬──────────────┐
 *   │  [Align] [Surprise] [Reset]              │  SIDEBAR     │
 *   ├──────────────────────────────────────────┤              │
 *   │                                          │              │
 *   │            MODEL CANVAS                  │              │
 *   │            (fills the space)             │              │
 *   │                                          │              │
 *   └──────────────────────────────────────────┴──────────────┘
 *
 * Align mode is ON by default so the user can nudge items.
 */

import { useDressup } from '@/lib/dressup/useDressup'
import { StageCanvas } from './StageCanvas'
import { Sidebar } from './Sidebar'
import { CANVAS_ASPECT_RATIO, CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/dressup/canvas-dimensions'

export function DressupGame() {
  const game = useDressup()

  // Compute the alignment override for the canvas (always active when align mode is on)
  const alignOverride = game.alignMode
    ? {
        category: game.activeCategory,
        values: game.getCurrentAlignment(),
      }
    : null

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-stone-100">
      {/* ====== COMPACT HEADER (single row, no title) ====== */}
      <header className="flex shrink-0 items-center justify-between border-b border-stone-300/60 bg-stone-50/90 px-4 py-1.5 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-lg">🪡</span>
          <span className="font-serif text-sm font-semibold tracking-wide text-stone-800">
            Atelier
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => game.setAlignMode(!game.alignMode)}
            className={
              game.alignMode
                ? 'rounded bg-amber-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-amber-600'
                : 'rounded border border-amber-400 bg-amber-50 px-3 py-1 text-[11px] font-medium text-amber-700 transition-all hover:bg-amber-100'
            }
            title="Toggle alignment mode to adjust hair/dress positions"
          >
            🔧 Align {game.alignMode ? 'ON' : 'OFF'}
          </button>
          <button
            type="button"
            onClick={game.randomize}
            className="rounded bg-gradient-to-r from-stone-700 to-stone-900 px-3 py-1 text-[11px] font-medium tracking-wide text-amber-50 shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            ✦ Surprise
          </button>
          <button
            type="button"
            onClick={game.reset}
            className="rounded border border-stone-400 bg-stone-50 px-3 py-1 text-[11px] font-medium tracking-wide text-stone-700 transition-all hover:bg-stone-100"
          >
            ↺ Reset
          </button>
        </div>
      </header>

      {/* ====== MAIN BODY (canvas + sidebar, fills the rest) ====== */}
      <main className="flex min-h-0 flex-1 gap-2 overflow-hidden p-2">
        {/* ----- LEFT: MODEL CANVAS (fills available height) ----- */}
        <section className="flex min-w-0 flex-1 items-center justify-center overflow-hidden">
          <div
            className="relative h-full max-h-full overflow-hidden rounded-sm border border-stone-300 bg-stone-50 shadow-xl"
            style={{
              aspectRatio: CANVAS_ASPECT_RATIO,
              height: `min(100%, calc((100vw - 360px) * ${CANVAS_HEIGHT} / ${CANVAS_WIDTH}))`,
            }}
          >
            <StageCanvas
              selection={game.selection}
              colors={game.colors}
              alignOverride={alignOverride}
            />
            {/* Align mode indicator overlay */}
            {game.alignMode && (
              <div className="pointer-events-none absolute left-2 top-2 rounded bg-amber-500/90 px-2 py-1 text-[10px] font-bold text-white shadow">
                🔧 ALIGN MODE — use arrow keys to nudge
              </div>
            )}
          </div>
        </section>

        {/* ----- RIGHT: SIDEBAR (tall, fixed-width) ----- */}
        <aside
          className="flex w-[340px] shrink-0 flex-col overflow-hidden rounded-sm border border-stone-300 bg-stone-50/95 shadow-xl"
        >
          <Sidebar
            selection={game.selection}
            colors={game.colors}
            activeCategory={game.activeCategory}
            onSelectCategory={game.setActiveCategory}
            onSelectItem={game.selectItem}
            onSetColor={game.setColor}
            alignMode={game.alignMode}
            currentAlignment={game.getCurrentAlignment()}
            onAlignmentChange={game.setCurrentAlignment}
            onAlignmentReset={game.resetCurrentAlignment}
          />
        </aside>
      </main>
    </div>
  )
}

export default DressupGame
