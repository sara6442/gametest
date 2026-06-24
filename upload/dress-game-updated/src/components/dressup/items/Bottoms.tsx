'use client'

/**
 * Bottoms.tsx — Lower-body clothing.
 *
 * Each bottom PNG is 325×742. The alignment values (x, y, scale) were
 * manually adjusted by the user using the alignment tool and baked
 * in here as defaults.
 */

export interface ClothProps {
  color?: string
  trim?: string
}

interface BottomAlignment {
  x: number
  y: number
  scale: number
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG bottom with alignment transform                */
/* ------------------------------------------------------------------ */
function makePngBottom(src: string, align: BottomAlignment): React.FC<ClothProps> {
  const { x, y, scale } = align
  return function PngBottom() {
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
/* Bottoms 1–8 — with alignment values                                 */
/* ------------------------------------------------------------------ */
export const Bottom1: React.FC<ClothProps> = makePngBottom('/bottom1.png', { x:   0, y:   0, scale: 1.00 })  // black plaid skirt
export const Bottom2: React.FC<ClothProps> = makePngBottom('/bottom2.png', { x:   0, y:  -7, scale: 1.00 })  // maroon pleated skirt (user-aligned)
export const Bottom3: React.FC<ClothProps> = makePngBottom('/bottom3.png', { x:   0, y:   0, scale: 1.00 })  // pink ruffled skirt
export const Bottom4: React.FC<ClothProps> = makePngBottom('/bottom4.png', { x:   0, y:   0, scale: 1.00 })  // blue striped skirt
export const Bottom5: React.FC<ClothProps> = makePngBottom('/bottom5.png', { x:   0, y:   0, scale: 1.00 })  // light blue skirt
export const Bottom6: React.FC<ClothProps> = makePngBottom('/bottom6.png', { x:   0, y:   0, scale: 1.00 })  // beige buttoned skirt
export const Bottom7: React.FC<ClothProps> = makePngBottom('/bottom7.png', { x:  -9, y: -40, scale: 1.05 })  // brown pleated skirt (user-aligned)
export const Bottom8: React.FC<ClothProps> = makePngBottom('/bottom8.png',  { x:   0, y:   0, scale: 1.00 })  // white tailored skirt
export const Bottom9: React.FC<ClothProps> = makePngBottom('/bottom9.png',  { x:   0, y:   0, scale: 1.00 })  // brown plaid maxi skirt
export const Bottom10: React.FC<ClothProps> = makePngBottom('/bottom10.png', { x:   0, y:   0, scale: 1.00 }) // denim button maxi
export const Bottom11: React.FC<ClothProps> = makePngBottom('/bottom11.png', { x:   0, y:   0, scale: 1.00 }) // pink flared skirt
export const Bottom12: React.FC<ClothProps> = makePngBottom('/bottom12.png', { x:   0, y:   0, scale: 1.00 }) // blue tiered skirt
export const Bottom13: React.FC<ClothProps> = makePngBottom('/bottom13.png', { x:   0, y:   0, scale: 1.00 }) // olive wrap skirt
export const Bottom14: React.FC<ClothProps> = makePngBottom('/bottom14.png', { x:   0, y:   0, scale: 1.00 }) // olive/sage pencil skirt
export const Bottom15: React.FC<ClothProps> = makePngBottom('/bottom15.png', { x:   0, y:   0, scale: 1.00 }) // teal floral ruffle skirt
export const Bottom16: React.FC<ClothProps> = makePngBottom('/bottom16.png', { x:   0, y:   0, scale: 1.00 }) // red ruched ruffle skirt
export const Bottom17: React.FC<ClothProps> = makePngBottom('/bottom17.png', { x:   0, y:   0, scale: 1.00 }) // coral diagonal pleated midi
export const Bottom18: React.FC<ClothProps> = makePngBottom('/bottom18.png', { x:   0, y:   0, scale: 1.00 }) // dark grey wrap midi with bow
export const Bottom19: React.FC<ClothProps> = makePngBottom('/bottom19.png', { x:   0, y:   0, scale: 1.00 }) // blue-grey asymmetric wrap skirt
export const Bottom20: React.FC<ClothProps> = makePngBottom('/bottom20.png', { x:   0, y:   0, scale: 1.00 }) // camel maxi flared skirt
export const Bottom21: React.FC<ClothProps> = makePngBottom('/bottom21.png', { x:   0, y:   0, scale: 1.00 }) // black circle skirt

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface BottomItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
}

export const BOTTOM_ITEMS: BottomItem[] = [
  { id: 'bottom1', name: 'Black Plaid',     Component: Bottom1 },
  { id: 'bottom2', name: 'Maroon Pleated',  Component: Bottom2 },
  { id: 'bottom3', name: 'Pink Ruffled',    Component: Bottom3 },
  { id: 'bottom4', name: 'Blue Striped',    Component: Bottom4 },
  { id: 'bottom5', name: 'Light Blue',      Component: Bottom5 },
  { id: 'bottom6', name: 'Beige Buttoned',  Component: Bottom6 },
  { id: 'bottom7', name: 'Brown Pleated',   Component: Bottom7 },
  { id: 'bottom8',  name: 'White Tailored',  Component: Bottom8  },
  { id: 'bottom9',  name: 'Brown Plaid',     Component: Bottom9  },
  { id: 'bottom10', name: 'Denim Button',    Component: Bottom10 },
  { id: 'bottom11', name: 'Pink Flared',     Component: Bottom11 },
  { id: 'bottom12', name: 'Blue Tiered',     Component: Bottom12 },
  { id: 'bottom13', name: 'Olive Wrap',         Component: Bottom13 },
  { id: 'bottom14', name: 'Sage Pencil',         Component: Bottom14 },
  { id: 'bottom15', name: 'Teal Floral Ruffle',  Component: Bottom15 },
  { id: 'bottom16', name: 'Red Ruched Ruffle',   Component: Bottom16 },
  { id: 'bottom17', name: 'Coral Pleated Midi',  Component: Bottom17 },
  { id: 'bottom18', name: 'Grey Wrap Bow',       Component: Bottom18 },
  { id: 'bottom19', name: 'Blue Asymmetric',     Component: Bottom19 },
  { id: 'bottom20', name: 'Camel Maxi Flared',   Component: Bottom20 },
  { id: 'bottom21', name: 'Black Circle Skirt',  Component: Bottom21 },
]

export default BOTTOM_ITEMS
