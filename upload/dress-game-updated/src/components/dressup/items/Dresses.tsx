'use client'

/**
 * Dresses.tsx — Full-body dresses.
 *
 * Each dress PNG is 325×742. The alignment values (x, y, scale) were
 * manually adjusted by the user using the alignment tool and baked
 * in here as defaults.
 *
 * dress4 — REMOVED by user request
 *
 * Sleeve lengths are recorded for the coat logic (see useDressup.ts):
 *   - 'long'  → selecting a coat will switch to default top
 *   - 'short' → selecting a coat keeps the dress
 */

export interface ClothProps {
  color?: string
  trim?: string
}

interface DressAlignment {
  x: number
  y: number
  scale: number
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG dress with alignment transform                 */
/* ------------------------------------------------------------------ */
function makePngDress(src: string, align: DressAlignment): React.FC<ClothProps> {
  const { x, y, scale } = align
  return function PngDress() {
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        <image
          href={src}
          x={0}
          y={0}
          width={325}
          height={742}
          preserveAspectRatio="xMidYMid meet"
        />
      </g>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Dresses — with alignment values                                     */
/* ------------------------------------------------------------------ */

// dress1 (Tie-Dye): natural position
export const Dress1: React.FC<ClothProps> = makePngDress('/dress1.png', { x:   0, y:    0, scale: 1.00 })

// dress2 (Green A-Line): user-aligned
export const Dress2: React.FC<ClothProps> = makePngDress('/dress2.png', { x: -22, y:  -41, scale: 1.10 })

// dress3 (Blue Puff): user-aligned
export const Dress3: React.FC<ClothProps> = makePngDress('/dress3.png', { x: -43, y: -168, scale: 1.25 })

// dress4 (Cream Floral): REMOVED by user request

// dress5 (White Buttoned): user-aligned
export const Dress5: React.FC<ClothProps> = makePngDress('/dress5.png', { x:   8, y:    4, scale: 0.95 })

// dress6 (Black Ballgown): user-aligned
export const Dress6: React.FC<ClothProps> = makePngDress('/dress6.png', { x: -46, y: -156, scale: 1.30 })

// dress7 (Red Midi): natural position
export const Dress7: React.FC<ClothProps> = makePngDress('/dress7.png', { x:   0, y:    0, scale: 1.00 })

// dress8 (Cream V-Neck): user-aligned
export const Dress8: React.FC<ClothProps> = makePngDress('/dress8.png', { x:   6, y:  -23, scale: 1.15 })

// dress9 (Tan Midi): user-aligned
export const Dress9: React.FC<ClothProps> = makePngDress('/dress9.png',  { x:   0, y:    1, scale: 1.00 })

// dress10 (Blue-Grey Full Skirt)
export const Dress10: React.FC<ClothProps> = makePngDress('/dress10.png', { x:   0, y:    0, scale: 1.00 })

// dress11 (Teal Ballgown with Gold Embroidery)
export const Dress11: React.FC<ClothProps> = makePngDress('/dress11.png', { x:   0, y:    0, scale: 1.00 })

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface DressItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const DRESS_ITEMS: DressItem[] = [
  { id: 'dress1', name: 'Tie-Dye',           Component: Dress1, sleeveLength: 'short' },
  { id: 'dress2', name: 'Green A-Line',      Component: Dress2, sleeveLength: 'short' },
  { id: 'dress3', name: 'Blue Puff',         Component: Dress3, sleeveLength: 'short' },
  { id: 'dress5', name: 'White Buttoned',    Component: Dress5, sleeveLength: 'long' },
  { id: 'dress6', name: 'Black Ballgown',    Component: Dress6, sleeveLength: 'long' },
  { id: 'dress7', name: 'Red Midi',          Component: Dress7, sleeveLength: 'short' },
  { id: 'dress8', name: 'Cream V-Neck',      Component: Dress8, sleeveLength: 'short' },
  { id: 'dress9',  name: 'Tan Midi',           Component: Dress9,  sleeveLength: 'short' },
  { id: 'dress10', name: 'Blue-Grey Skirt',    Component: Dress10, sleeveLength: 'short' },
  { id: 'dress11', name: 'Teal Ballgown',      Component: Dress11, sleeveLength: 'short' },
]

export default DRESS_ITEMS
