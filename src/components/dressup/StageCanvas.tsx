'use client'

/**
 * StageCanvas.tsx — The layered model canvas.
 *
 * Renders every active clothing layer as an SVG <g> inside a single
 * CANVAS_WIDTH × CANVAS_HEIGHT viewBox. Layer order (back → front):
 *   z=0  background       (fills entire canvas — no offset)
 *   z=1  hair back        \
 *   z=2  body              |
 *   z=3  bottom            |  all offset by BODY_TRANSFORM to scale &
 *   z=4  top               |  center the body within the wider canvas
 *   z=5  dress             |
 *   z=6  hair front        |
 *   z=7  accessory         |
 *   z=8  shoe              |
 *   z=9  decoration       /
 */

import { Body } from './items/Body'
import {
  HAIR_STYLES,
  TOP_ITEMS,
  BOTTOM_ITEMS,
  DRESS_ITEMS,
  BACKGROUND_ITEMS,
  ACCESSORY_ITEMS,
  SHOE_ITEMS,
  DECORATION_ITEMS,
  type CategoryId,
} from '@/lib/dressup/items'
import { CANVAS_VIEWBOX, BODY_TRANSFORM } from '@/lib/dressup/canvas-dimensions'

interface StageCanvasProps {
  selection: {
    background: string | null
    hair: string | null
    top: string | null
    bottom: string | null
    dress: string | null
    shoe: string | null
    accessory: string | null
    decoration: string | null
  }
  colors: Record<CategoryId, string>
}

export function StageCanvas({ selection, colors }: StageCanvasProps) {
  const BackgroundComp = BACKGROUND_ITEMS.find((b) => b.id === selection.background)?.Component
  const HairStyle = HAIR_STYLES.find((h) => h.id === selection.hair)
  const TopComp = TOP_ITEMS.find((t) => t.id === selection.top)?.Component
  const BottomComp = BOTTOM_ITEMS.find((b) => b.id === selection.bottom)?.Component
  const DressComp = DRESS_ITEMS.find((d) => d.id === selection.dress)?.Component
  const ShoeComp = SHOE_ITEMS.find((s) => s.id === selection.shoe)?.Component
  const AccessoryComp = ACCESSORY_ITEMS.find((a) => a.id === selection.accessory)?.Component
  const DecorationComp = DECORATION_ITEMS.find((d) => d.id === selection.decoration)?.Component

  const hairColor = colors.hair
  const topColor = colors.top
  const bottomColor = colors.bottom
  const dressColor = colors.dress
  const shoeColor = colors.shoe
  const accessoryColor = colors.accessory

  return (
    <svg
      viewBox={CANVAS_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        overflow: 'visible',
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ====== z=0: BACKGROUND (fills entire canvas, no offset) ====== */}
      {BackgroundComp && <BackgroundComp />}

      {/* ====== z=1–z=9: BODY + CLOTHES + HAIR + ACCESSORIES + SHOES + DECORATIONS ====== */}
      <g transform={BODY_TRANSFORM}>
        {/* z=1: HAIR BACK */}
        {HairStyle && <HairStyle.back color={hairColor} />}

        {/* z=2: BODY */}
        <Body />

        {/* z=3: BOTTOM (skirt/pants) — only if no dress */}
        {!selection.dress && BottomComp && <BottomComp color={bottomColor} />}

        {/* z=4: TOP (shirt) — only if no dress */}
        {!selection.dress && TopComp && <TopComp color={topColor} />}

        {/* z=5: DRESS (replaces top + bottom) */}
        {selection.dress && DressComp && <DressComp color={dressColor} />}

        {/* z=6: HAIR FRONT (bangs, side framing) */}
        {HairStyle && <HairStyle.front color={hairColor} />}

        {/* z=7: ACCESSORY */}
        {AccessoryComp && <AccessoryComp color={accessoryColor} />}

        {/* z=8: SHOE */}
        {ShoeComp && <ShoeComp color={shoeColor} />}

        {/* z=9: DECORATION */}
        {DecorationComp && <DecorationComp />}
      </g>
    </svg>
  )
}

export default StageCanvas
