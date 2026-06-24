'use client'

/**
 * useDressup.ts — Client state for the dress-up game.
 *
 * MODESTY DEFAULTS:
 *   The model is never shown naked. When the game starts, she wears
 *   the default top (top4) and default bottom (bottom1). If the player
 *   removes the top, the default top is restored. Same for the bottom.
 *
 * DRESS ↔ TOP/BOTTOM LOGIC:
 *   - If the player chooses a dress → top and bottom are cleared (dress
 *     replaces both).
 *   - If the player chooses a top while wearing a dress → the dress is
 *     cleared AND the bottom is restored to its default (bottom1), so
 *     the model is never naked.
 *   - If the player chooses a bottom while wearing a dress → the dress
 *     is cleared AND the top is restored to its default (top4).
 *   - If the player chooses "None" for the top while NOT wearing a
 *     dress → the top is restored to its default (top4).
 *   - If the player chooses "None" for the bottom while NOT wearing a
 *     dress → the bottom is restored to its default (bottom1).
 */

import { useCallback, useState } from 'react'
import { CATEGORIES, type CategoryId } from './items'

/** Default item ids — used to keep the model modest at all times */
export const DEFAULT_TOP_ID = 'top4'
export const DEFAULT_BOTTOM_ID = 'bottom1'

interface DressupState {
  background: string | null
  hair: string | null
  top: string | null
  bottom: string | null
  dress: string | null
  shoe: string | null
  accessory: string | null
  decoration: string | null
}

interface ColorState {
  background: string
  hair: string
  top: string
  bottom: string
  dress: string
  shoe: string
  accessory: string
  decoration: string
}

// Colors are kept in state for backwards compatibility, but the color
// picker UI is now hidden (see items.ts → supportsColor: false for all).
const DEFAULT_COLORS: ColorState = {
  background: '#E8DCC8',
  hair: '#3A2418',
  top: '#E8DDCB',
  bottom: '#2C2C3E',
  dress: '#6B2737',
  shoe: '#3A2418',
  accessory: '#C19A6B',
  decoration: '#A8D888',
}

const DEFAULT_STATE: DressupState = {
  background: 'white',                  // Default white background
  hair: null,
  top: DEFAULT_TOP_ID,                  // Modesty default: always wear a top
  bottom: DEFAULT_BOTTOM_ID,            // Modesty default: always wear a bottom
  dress: null,
  shoe: null,
  accessory: null,
  decoration: null,
}

export function useDressup() {
  const [selection, setSelection] = useState<DressupState>(DEFAULT_STATE)
  const [colors, setColors] = useState<ColorState>(DEFAULT_COLORS)
  const [activeCategory, setActiveCategory] = useState<CategoryId>('background')

  const selectItem = useCallback((categoryId: CategoryId, itemId: string | null) => {
    setSelection((prev) => {
      const next = { ...prev }

      if (categoryId === 'dress') {
        // === DRESS CATEGORY ===
        if (itemId !== null) {
          // Choosing a dress → clear top & bottom (dress replaces both)
          next.dress = itemId
          next.top = null
          next.bottom = null
        } else {
          // Removing the dress → restore modesty defaults
          next.dress = null
          next.top = DEFAULT_TOP_ID
          next.bottom = DEFAULT_BOTTOM_ID
        }
      } else if (categoryId === 'top') {
        // === TOP CATEGORY ===
        if (prev.dress) {
          // Switching from a dress to a top → clear dress, restore default bottom
          next.dress = null
          next.top = itemId !== null ? itemId : DEFAULT_TOP_ID
          next.bottom = DEFAULT_BOTTOM_ID
        } else {
          // Already in top+bottom mode
          // Choosing "None" → restore default top (never naked)
          next.top = itemId !== null ? itemId : DEFAULT_TOP_ID
        }
      } else if (categoryId === 'bottom') {
        // === BOTTOM CATEGORY ===
        if (prev.dress) {
          // Switching from a dress to a bottom → clear dress, restore default top
          next.dress = null
          next.bottom = itemId !== null ? itemId : DEFAULT_BOTTOM_ID
          next.top = DEFAULT_TOP_ID
        } else {
          // Already in top+bottom mode
          // Choosing "None" → restore default bottom (never naked)
          next.bottom = itemId !== null ? itemId : DEFAULT_BOTTOM_ID
        }
      } else {
        // === OTHER CATEGORIES (background, hair, shoe, accessory, decoration) ===
        next[categoryId] = itemId
      }

      return next
    })
  }, [])

  const setColor = useCallback((categoryId: CategoryId, color: string) => {
    setColors((prev) => ({ ...prev, [categoryId]: color }))
  }, [])

  const getRandomColorFor = useCallback((categoryId: CategoryId) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId)
    if (!cat || !cat.supportsColor) return null
    return cat.palette[Math.floor(Math.random() * cat.palette.length)]
  }, [])

  const randomize = useCallback(() => {
    setSelection((prev) => ({
      ...prev,
      background: 'white',
      hair: null,
      top: DEFAULT_TOP_ID,
      bottom: DEFAULT_BOTTOM_ID,
      dress: null,
      shoe: null,
      accessory: null,
      decoration: null,
    }))
  }, [])

  const reset = useCallback(() => {
    setSelection(DEFAULT_STATE)
    setColors(DEFAULT_COLORS)
  }, [])

  return {
    selection,
    colors,
    activeCategory,
    setActiveCategory,
    selectItem,
    setColor,
    getRandomColorFor,
    randomize,
    reset,
  }
}

export type UseDressupReturn = ReturnType<typeof useDressup>
