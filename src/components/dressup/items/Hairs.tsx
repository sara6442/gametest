'use client'

/**
 * Hairs.tsx — Hairstyle layers.
 *
 * Contains the user's uploaded hairstyles as PNG images. Each hairstyle
 * is a single PNG (325 × 742) and is rendered in FRONT of the body
 * (z=6) so the hair appears on top of the head and flows down.
 *
 * The body has a blank head (no facial features), so rendering the hair
 * in front of the body is fine — the hair covers the blank face area
 * naturally.
 *
 * Each hairstyle exports an object with `back` and `front` components
 * to maintain compatibility with the existing architecture:
 *   - back  : no-op (renders nothing) — the entire hair is drawn in front
 *   - front : renders the hair PNG at z=6
 */

import type { ComponentType } from 'react'

export interface HairProps {
  color?: string
  highlight?: string
}

/* ------------------------------------------------------------------ */
/* Helper: render a PNG hairstyle at body coordinates                 */
/* ------------------------------------------------------------------ */
function makePngHair(src: string): React.FC<HairProps> {
  return function PngHair() {
    return (
      <g>
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

/* No-op component for the back layer (we render the whole hair in front) */
const NoopBack: React.FC<HairProps> = () => null

/* ------------------------------------------------------------------ */
/* Hairstyles 1–9 — User's uploaded hair PNGs                         */
/* ------------------------------------------------------------------ */
const Hair1Front = makePngHair('/hair1.png')   // black wavy ponytail
const Hair2Front = makePngHair('/hair2.png')   // black layered wavy
const Hair3Front = makePngHair('/hair3.png')   // brown messy bun
const Hair4Front = makePngHair('/hair4.png')   // black curly
const Hair5Front = makePngHair('/hair5.png')   // blonde wavy
const Hair6Front = makePngHair('/hair6.png')
const Hair7Front = makePngHair('/hair7.png')
const Hair8Front = makePngHair('/hair8.png')
const Hair9Front = makePngHair('/hair9.png')

/* ------------------------------------------------------------------ */
/* Registry                                                          */
/* ------------------------------------------------------------------ */
export interface HairStyle {
  id: string
  name: string
  back: ComponentType<HairProps>
  front: ComponentType<HairProps>
}

export const HAIR_STYLES: HairStyle[] = [
  { id: 'hair1', name: 'Style 1', back: NoopBack, front: Hair1Front },
  { id: 'hair2', name: 'Style 2', back: NoopBack, front: Hair2Front },
  { id: 'hair3', name: 'Style 3', back: NoopBack, front: Hair3Front },
  { id: 'hair4', name: 'Style 4', back: NoopBack, front: Hair4Front },
  { id: 'hair5', name: 'Style 5', back: NoopBack, front: Hair5Front },
  { id: 'hair6', name: 'Style 6', back: NoopBack, front: Hair6Front },
  { id: 'hair7', name: 'Style 7', back: NoopBack, front: Hair7Front },
  { id: 'hair8', name: 'Style 8', back: NoopBack, front: Hair8Front },
  { id: 'hair9', name: 'Style 9', back: NoopBack, front: Hair9Front },
]

export default HAIR_STYLES
