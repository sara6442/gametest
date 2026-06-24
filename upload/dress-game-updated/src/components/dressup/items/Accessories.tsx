'use client'

/**
 * Accessories.tsx — Hats, glasses, necklaces, etc.
 *
 * Currently EMPTY. The user will upload their own accessory files later.
 * Add them to the ACCESSORY_ITEMS array below to populate this category.
 *
 * Drawn on the TOP layer (z=7), above hair, body, and clothes.
 */

export interface AccessoryProps {
  color?: string
  trim?: string
}

export interface AccessoryItem {
  id: string
  name: string
  Component: React.FC<AccessoryProps>
}

export const ACCESSORY_ITEMS: AccessoryItem[] = []

export default ACCESSORY_ITEMS
