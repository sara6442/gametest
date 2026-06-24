'use client'

/**
 * Tops.tsx — Upper-body clothing.
 *
 * Each top PNG is 325×742. The alignment values (x, y, scale) were
 * manually adjusted by the user using the alignment tool and baked
 * in here as defaults.
 *
 * sleeveLength: 'long' = full-length sleeves (selecting a coat will
 *               switch to default top), 'short' = short/sleeveless
 *               (coat can layer over it)
 *
 * top8 (Pink Polka Dot) — REMOVED by user request
 */

export interface ClothProps {
  color?: string
  trim?: string
}

interface TopAlignment {
  x: number
  y: number
  scale: number
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG top with alignment transform                   */
/* ------------------------------------------------------------------ */
function makePngTop(src: string, align: TopAlignment): React.FC<ClothProps> {
  const { x, y, scale } = align
  return function PngTop() {
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
/* Tops — with alignment values                                        */
/* (top8 Pink Polka Dot REMOVED by user request)                       */
/* Sleeve lengths:                                                     */
/*   top1: long (poncho), top2: long (cape), top3: short,             */
/*   top4: short, top5: short, top6: long, top7: short,              */
/*   top9: long (black bow),                                          */
/*   top10: long (peach lace flare), top11: long (white ruffle collar)*/
/*   top12: long (black sheer cape), top13: short (turquoise wrap)    */
/*   top14: short (maroon tied shirt), top15: short (black cami)      */
/* ------------------------------------------------------------------ */
export const Top1:  React.FC<ClothProps> = makePngTop('/top1.png',  { x: 0, y: 0, scale: 1.00 })
export const Top2:  React.FC<ClothProps> = makePngTop('/top2.png',  { x: 0, y: 0, scale: 1.00 })
export const Top3:  React.FC<ClothProps> = makePngTop('/top3.png',  { x: 0, y: 0, scale: 1.00 })
export const Top4:  React.FC<ClothProps> = makePngTop('/top4.png',  { x: 0, y: 0, scale: 1.00 })
export const Top5:  React.FC<ClothProps> = makePngTop('/top5.png',  { x: 0, y: 0, scale: 1.00 })
export const Top6:  React.FC<ClothProps> = makePngTop('/top6.png',  { x: 0, y: 0, scale: 1.00 })
export const Top7:  React.FC<ClothProps> = makePngTop('/top7.png',  { x: 0, y: 0, scale: 1.00 })
export const Top9:  React.FC<ClothProps> = makePngTop('/top9.png',  { x: 8, y: 7, scale: 0.95 })
export const Top10: React.FC<ClothProps> = makePngTop('/top10.png', { x: 0, y: 0, scale: 1.00 })
export const Top11: React.FC<ClothProps> = makePngTop('/top11.png', { x: 0, y: 0, scale: 1.00 })
export const Top12: React.FC<ClothProps> = makePngTop('/top12.png', { x: 0, y: 0, scale: 1.00 })
export const Top13: React.FC<ClothProps> = makePngTop('/top13.png', { x: 0, y: 0, scale: 1.00 })
export const Top14: React.FC<ClothProps> = makePngTop('/top14.png', { x: 0, y: 0, scale: 1.00 })
export const Top15: React.FC<ClothProps> = makePngTop('/top15.png', { x: 0, y: 0, scale: 1.00 })

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface TopItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
  sleeveLength: 'long' | 'short'
}

export const TOP_ITEMS: TopItem[] = [
  { id: 'top1',  name: 'Tan Poncho',        Component: Top1,  sleeveLength: 'long' },
  { id: 'top2',  name: 'Maroon Cape',       Component: Top2,  sleeveLength: 'long' },
  { id: 'top3',  name: 'White Shirt',       Component: Top3,  sleeveLength: 'short' },
  { id: 'top4',  name: 'Cream Blouse',      Component: Top4,  sleeveLength: 'short' },
  { id: 'top5',  name: 'Floral Top',        Component: Top5,  sleeveLength: 'short' },
  { id: 'top6',  name: 'Ruffled Blouse',    Component: Top6,  sleeveLength: 'long' },
  { id: 'top7',  name: 'Blue Checkered',    Component: Top7,  sleeveLength: 'short' },
  { id: 'top9',  name: 'Black Bow',         Component: Top9,  sleeveLength: 'long' },
  { id: 'top10', name: 'Peach Lace',        Component: Top10, sleeveLength: 'long' },
  { id: 'top11', name: 'White Ruffle',      Component: Top11, sleeveLength: 'long' },
  { id: 'top12', name: 'Black Cape',        Component: Top12, sleeveLength: 'long' },
  { id: 'top13', name: 'Turquoise Wrap',    Component: Top13, sleeveLength: 'short' },
  { id: 'top14', name: 'Maroon Tied',       Component: Top14, sleeveLength: 'short' },
  { id: 'top15', name: 'Black Cami',        Component: Top15, sleeveLength: 'short' },
]

export default TOP_ITEMS
