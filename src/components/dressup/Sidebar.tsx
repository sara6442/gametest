'use client'

/**
 * Sidebar.tsx — Right-side control panel.
 *
 * Includes:
 *   - Category list (scrollable)
 *   - Alignment panel (when align mode is on)
 *   - Item grid with mini previews (scrollable)
 *   - "None" tile for clearable categories
 *   - "Default" tile for tops & bottoms (restores the modesty default)
 */

import { CATEGORIES, ITEMS_BY_CATEGORY, type CategoryId } from '@/lib/dressup/items'
import { CANVAS_VIEWBOX, BODY_TRANSFORM } from '@/lib/dressup/canvas-dimensions'
import { Body } from './items/Body'
import { AlignmentPanel, type AlignmentValues } from './AlignmentPanel'
import { cn } from '@/lib/utils'

interface SidebarProps {
  selection: Record<CategoryId, string | null>
  colors: Record<CategoryId, string>
  activeCategory: CategoryId
  onSelectCategory: (id: CategoryId) => void
  onSelectItem: (categoryId: CategoryId, itemId: string | null) => void
  onSetColor: (categoryId: CategoryId, color: string) => void
  alignMode: boolean
  currentAlignment: AlignmentValues
  onAlignmentChange: (values: AlignmentValues) => void
  onAlignmentReset: () => void
}

export function Sidebar({
  selection,
  colors,
  activeCategory,
  onSelectCategory,
  onSelectItem,
  onSetColor,
  alignMode,
  currentAlignment,
  onAlignmentChange,
  onAlignmentReset,
}: SidebarProps) {
  const activeCat = CATEGORIES.find((c) => c.id === activeCategory)!
  const items = ITEMS_BY_CATEGORY[activeCategory]
  const selectedItemId = selection[activeCategory]
  const activeColor = colors[activeCategory]

  return (
    <div className="flex h-full w-full flex-col gap-3 p-3">
      {/* ====== CATEGORY LIST (scrollable) ====== */}
      <div className="shrink-0">
        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">
          Categories
        </div>
        <div className="max-h-[140px] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategory
              const hasItem = selection[cat.id] !== null
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={cn(
                    'relative flex items-center gap-2 rounded-md border px-2.5 py-2 text-left text-xs font-medium tracking-wide transition-all',
                    isActive
                      ? 'border-stone-700 bg-stone-200/80 text-stone-900 shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400 hover:bg-stone-50',
                  )}
                >
                  <span className="text-base leading-none">{cat.icon}</span>
                  <span className="flex-1 truncate">{cat.label}</span>
                  {hasItem && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-700" aria-hidden />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ====== ALIGNMENT PANEL (only shown in align mode) ====== */}
      {alignMode && (
        <AlignmentPanel
          activeCategory={activeCategory}
          selectedItemId={selectedItemId}
          values={currentAlignment}
          onValuesChange={onAlignmentChange}
          onReset={onAlignmentReset}
        />
      )}

      {/* ====== ITEM GRID (mini previews, scrollable) ====== */}
      <div className="flex min-h-0 flex-1 flex-col rounded-md border border-stone-300 bg-white p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-stone-500">
            {activeCat.label} Styles
          </span>
          {selectedItemId && (
            <button
              type="button"
              onClick={() => onSelectItem(activeCategory, null)}
              className="rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-stone-500 hover:bg-stone-100 hover:text-stone-700"
            >
              Remove
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-3 gap-2">
            {/* "None" / "Default" tile
                - For background, hair, accessory, dress, shoe, decoration, coat:
                  "None" clears the category
                - For top & bottom: "Default" restores the modesty DEFAULT
                  (the model is never naked). Highlighted when current = default. */}
            {(() => {
              const isTopOrBottom = activeCategory === 'top' || activeCategory === 'bottom'
              const defaultId = isTopOrBottom
                ? (activeCategory === 'top' ? 'top4' : 'bottom8')
                : null
              const isDefaultSelected = isTopOrBottom && selectedItemId === defaultId
              const isNoneSelected = !isTopOrBottom && selectedItemId === null

              return (
                <button
                  type="button"
                  onClick={() => onSelectItem(activeCategory, null)}
                  className={cn(
                    'flex aspect-square flex-col items-center justify-center rounded-md border text-[10px] font-medium tracking-wide transition-all',
                    (isDefaultSelected || isNoneSelected)
                      ? 'border-stone-700 bg-stone-100 text-stone-800'
                      : 'border-dashed border-stone-300 bg-stone-50 text-stone-400 hover:border-stone-500',
                  )}
                  title={isTopOrBottom ? 'Restore default' : 'Remove (None)'}
                >
                  <span className="text-lg leading-none">{isTopOrBottom ? '↺' : '∅'}</span>
                  <span className="mt-1">{isTopOrBottom ? 'Default' : 'None'}</span>
                </button>
              )
            })()}

            {items.map((item) => {
              const isSelected = selectedItemId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(activeCategory, item.id)}
                  className={cn(
                    'group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-md border bg-gradient-to-b from-white to-stone-50/60 p-1 transition-all',
                    isSelected
                      ? 'border-stone-800 ring-1 ring-stone-500'
                      : 'border-stone-200 hover:border-stone-500 hover:shadow-md',
                  )}
                  title={item.name}
                >
                  {/* Mini SVG preview */}
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      viewBox={CANVAS_VIEWBOX}
                      className="h-full w-full"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      {activeCategory === 'background' ? (
                        // Background: show as full-bleed mini scene (fills entire canvas)
                        <item.Component />
                      ) : (
                        // All non-background items: wrap in transform to scale & center body
                        <g transform={BODY_TRANSFORM}>
                          {activeCategory !== 'hair' && (
                            <Body />
                          )}
                          {activeCategory === 'hair' ? (
                            // Hair: show back+front combined for preview
                            <>
                              {(() => {
                                const HairStyle = HAIR_STYLES_LOOKUP[item.id]
                                return HairStyle ? (
                                  <>
                                    <HairStyle.back color={activeColor} />
                                    <Body />
                                    <HairStyle.front color={activeColor} />
                                  </>
                                ) : null
                              })()}
                            </>
                          ) : (
                            <item.Component
                              color={activeColor}
                              trim={getTrimFor(activeColor)}
                            />
                          )}
                        </g>
                      )}
                    </svg>
                  </div>
                  {/* Name label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/85 px-1 py-0.5 text-center text-[9px] font-medium tracking-wide text-stone-700 backdrop-blur-sm">
                    {item.name}
                  </div>
                  {isSelected && (
                    <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-800 text-[9px] text-amber-50 shadow">
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper: lookup hair style by id (for thumbnails that combine back+front)
import { HAIR_STYLES } from '@/lib/dressup/items'
const HAIR_STYLES_LOOKUP = Object.fromEntries(
  HAIR_STYLES.map((h) => [h.id, h]),
) as Record<string, (typeof HAIR_STYLES)[number]>

// Helper: produce a slightly darker trim color from a base color
function getTrimFor(color: string): string {
  if (color.startsWith('#') && color.length === 7) {
    const r = Math.max(0, parseInt(color.slice(1, 3), 16) - 40)
    const g = Math.max(0, parseInt(color.slice(3, 5), 16) - 40)
    const b = Math.max(0, parseInt(color.slice(5, 7), 16) - 40)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
  return color
}

export default Sidebar
