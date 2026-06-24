'use client'

/**
 * Dresses.tsx — Full-body dresses.
 *
 * Contains the user's uploaded dresses as PNG images.
 *
 * IMPORTANT — ALIGNMENT:
 * Each dress PNG is 325×742, but the actual dress artwork within each
 * PNG does NOT fill the entire frame (there's transparent padding).
 * The body image, by contrast, DOES fill its entire 325×742 frame.
 * So if we just draw a dress at 325×742, the dress won't align with
 * the body — it'll be shifted or the wrong size.
 *
 * FIX: Each dress has its own TRANSFORM that:
 *   1. Crops to the artwork's bounding box (via the source rectangle)
 *   2. Scales the artwork to match where it should sit on the body
 *   3. Positions it at the right (x, y) within the 325×742 body frame
 *
 * The bounding boxes were found by scripts/find_dress_bbox.py.
 *
 * WIDER DRESSES: The destination rectangles now use the dress's natural
 * width (preserving the dress's aspect ratio) so the dresses look full
 * and natural, not thin/narrow.
 *
 * A dress replaces both top AND bottom. When a dress is selected,
 * the top & bottom layers are hidden.
 */

export interface ClothProps {
  color?: string
  trim?: string
}

/* ------------------------------------------------------------------ */
/* Body reference landmarks (within the 325 × 742 body frame)         */
/* ------------------------------------------------------------------ */
// Head top:      y = 25
// Chin:          y = 110
// Shoulders:     y = 135  (X 85–239)
// Bust:          y = 165
// Waist:         y = 240
// Hip:           y = 335
// Knee:          y = 540
// Ankle:         y = 670
// Feet:          y = 730

/* ------------------------------------------------------------------ */
/* Helper: render a PNG dress with a custom transform                */
/*                                                                    */
/* Each dress's artwork sits at (srcX0, srcY0)–(srcX1, srcY1) within  */
/* its 325×742 PNG. We render that sub-rectangle scaled to fit a      */
/* target (dstX0, dstY0)–(dstX1, dstY1) rectangle in the body frame.  */
/* ------------------------------------------------------------------ */
interface DressAlignment {
  src: { x0: number; y0: number; x1: number; y1: number }
  dst: { x0: number; y0: number; x1: number; y1: number }
}

function makeAlignedDress(src: string, align: DressAlignment): React.FC<ClothProps> {
  return function AlignedDress() {
    const { src: s, dst: d } = align
    const srcW = s.x1 - s.x0
    const srcH = s.y1 - s.y0
    const dstW = d.x1 - d.x0
    const dstH = d.y1 - d.y0
    const scaleX = dstW / srcW
    const scaleY = dstH / srcH
    return (
      <g>
        <g transform={`translate(${d.x0}, ${d.y0}) scale(${scaleX}, ${scaleY})`}>
          <image
            href={src}
            x={-s.x0}
            y={-s.y0}
            width={325}
            height={742}
            preserveAspectRatio="none"
          />
        </g>
      </g>
    )
  }
}

/* ------------------------------------------------------------------ */
/* Dresses                                                            */
/* ------------------------------------------------------------------ */

// dress1 (Tie-Dye): bbox (38,131,284,646) — fits well, no fix needed
export const Dress1: React.FC<ClothProps> = () => (
  <g>
    <image href="/dress1.png" x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
  </g>
)

// dress2 (Green A-Line): bbox (9,166,325,562) — 316×396
// Wider destination: x=20 to x=305 (width 285), y=135 to y=545 (knee length)
export const Dress2: React.FC<ClothProps> = makeAlignedDress('/dress2.png', {
  src: { x0: 9, y0: 166, x1: 325, y1: 562 },
  dst: { x0: 20, y0: 135, x1: 305, y1: 545 },
})

// dress3 (Blue Puff): bbox (7,230,318,659) — 311×429
// Wider destination: x=15 to x=310 (width 295), y=135 to y=670 (floor length)
export const Dress3: React.FC<ClothProps> = makeAlignedDress('/dress3.png', {
  src: { x0: 7, y0: 230, x1: 318, y1: 659 },
  dst: { x0: 15, y0: 135, x1: 310, y1: 670 },
})

// dress4 (Cream Floral): bbox (15,265,320,584) — 305×319
// Wider destination: x=20 to x=305 (width 285), y=135 to y=560 (mid-calf)
export const Dress4: React.FC<ClothProps> = makeAlignedDress('/dress4.png', {
  src: { x0: 15, y0: 265, x1: 320, y1: 584 },
  dst: { x0: 20, y0: 135, x1: 305, y1: 560 },
})

// dress5 (White Buttoned): bbox (44,118,278,557) — 234×439 — fits OK
export const Dress5: React.FC<ClothProps> = () => (
  <g>
    <image href="/dress5.png" x={0} y={0} width={325} height={742} preserveAspectRatio="xMidYMid meet" />
  </g>
)

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface DressItem {
  id: string
  name: string
  Component: React.FC<ClothProps>
}

export const DRESS_ITEMS: DressItem[] = [
  { id: 'dress1', name: 'Tie-Dye', Component: Dress1 },
  { id: 'dress2', name: 'Green A-Line', Component: Dress2 },
  { id: 'dress3', name: 'Blue Puff', Component: Dress3 },
  { id: 'dress4', name: 'Cream Floral', Component: Dress4 },
  { id: 'dress5', name: 'White Buttoned', Component: Dress5 },
]

export default DRESS_ITEMS
