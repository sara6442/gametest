'use client'

/**
 * Decorations.tsx — Scene decorations (props, flowers, objects, etc.).
 *
 * Currently EMPTY. The user will upload their own decoration files later.
 * Add them to the DECORATION_ITEMS array below to populate this category.
 *
 * Drawn on a layer above everything else (z=9) so decorations can be
 * placed anywhere in the scene — in front of or behind the model.
 *
 * Each decoration PNG should be 325 × 742 with transparent background,
 * matching the body's coordinate system.
 */

export interface DecorationProps {
  color?: string
  trim?: string
}

export interface DecorationItem {
  id: string
  name: string
  Component: React.FC<DecorationProps>
}

export const DECORATION_ITEMS: DecorationItem[] = []

export default DECORATION_ITEMS
