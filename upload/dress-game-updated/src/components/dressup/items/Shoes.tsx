'use client'

/**
 * Shoes.tsx — Footwear (shoes, boots, heels, sneakers, etc.).
 *
 * Currently EMPTY. The user will upload their own shoe files later.
 * Add them to the SHOE_ITEMS array below to populate this category.
 *
 * Drawn on a layer above bottoms/dresses (z=8) so shoes appear on top
 * of pant cuffs and dress hems.
 *
 * Each shoe PNG should be 325 × 742 with transparent background,
 * matching the body's coordinate system. The shoe artwork should be
 * positioned at the body's feet (around y=670–730).
 */

export interface ShoeProps {
  color?: string
  trim?: string
}

export interface ShoeItem {
  id: string
  name: string
  Component: React.FC<ShoeProps>
}

export const SHOE_ITEMS: ShoeItem[] = []

export default SHOE_ITEMS
