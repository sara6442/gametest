/**
 * items.ts — Central registry of all dress-up categories and items.
 *
 * Each category has:
 *   - id           : stable identifier used in state
 *   - label        : human-readable name shown in the sidebar
 *   - icon         : emoji shown next to the label
 *   - supportsColor: whether the color picker applies to this category
 *   - palette      : mature, elegant color palette (no neon brights)
 *
 * Each item Component shares the same 325 × 742 SVG viewBox so they
 * overlay the body image perfectly. Color is supplied via props.
 */

import type { ComponentType } from 'react'
import type { ClothProps, TopItem } from '@/components/dressup/items/Tops'
import type { ClothProps as BottomClothProps, BottomItem } from '@/components/dressup/items/Bottoms'
import type { ClothProps as DressClothProps, DressItem } from '@/components/dressup/items/Dresses'
import type { HairProps, HairStyle } from '@/components/dressup/items/Hairs'
import type { BackgroundProps, BackgroundItem } from '@/components/dressup/items/Backgrounds'
import type { AccessoryProps, AccessoryItem } from '@/components/dressup/items/Accessories'
import type { ShoeProps, ShoeItem } from '@/components/dressup/items/Shoes'
import type { DecorationProps, DecorationItem } from '@/components/dressup/items/Decorations'

import { TOP_ITEMS } from '@/components/dressup/items/Tops'
import { BOTTOM_ITEMS } from '@/components/dressup/items/Bottoms'
import { DRESS_ITEMS } from '@/components/dressup/items/Dresses'
import { HAIR_STYLES } from '@/components/dressup/items/Hairs'
import { BACKGROUND_ITEMS } from '@/components/dressup/items/Backgrounds'
import { ACCESSORY_ITEMS } from '@/components/dressup/items/Accessories'
import { SHOE_ITEMS } from '@/components/dressup/items/Shoes'
import { DECORATION_ITEMS } from '@/components/dressup/items/Decorations'

export type CategoryId =
  | 'background'
  | 'hair'
  | 'top'
  | 'bottom'
  | 'dress'
  | 'accessory'
  | 'shoe'
  | 'decoration'

/** Mature, elegant color palette — deep jewel tones, muted neutrals, no neon */
const ELEGANT_PALETTE = {
  // Deep jewel tones
  burgundy: '#6B2737',
  wine: '#722F37',
  emerald: '#2D4A3A',
  forest: '#1E3A2A',
  navy: '#1E2A47',
  midnight: '#0E1A2A',
  plum: '#5A3A4A',
  // Muted neutrals
  cream: '#E8DDCB',
  ivory: '#F5F2EC',
  pearl: '#F0EDE5',
  champagne: '#E5D5B7',
  camel: '#C19A6B',
  // Earth tones
  chocolate: '#3A2418',
  cocoa: '#5A4A3A',
  taupe: '#A89888',
  slate: '#5A6B7A',
  charcoal: '#2C2C3E',
  // Soft accent tones (muted, not neon)
  dustyRose: '#B58B8B',
  mauve: '#8B6A7A',
  sage: '#A8B5A0',
  // Pure neutrals
  black: '#1A1A1A',
  white: '#FFFFFF',
}

export interface Category {
  id: CategoryId
  label: string
  icon: string
  supportsColor: boolean
  /** Default palette shown for this category */
  palette: string[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'background',
    label: 'Background',
    icon: '🏛️',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'hair',
    label: 'Hairstyle',
    icon: '💇‍♀️',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'top',
    label: 'Tops',
    icon: '👚',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'bottom',
    label: 'Bottoms',
    icon: '👖',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'dress',
    label: 'Dresses',
    icon: '👗',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'shoe',
    label: 'Shoes',
    icon: '👟',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'accessory',
    label: 'Accessories',
    icon: '✨',
    supportsColor: false,
    palette: [],
  },
  {
    id: 'decoration',
    label: 'Decorations',
    icon: '🌷',
    supportsColor: false,
    palette: [],
  },
]

export interface AnyItem {
  id: string
  name: string
  Component: ComponentType<{ color?: string; trim?: string; highlight?: string }>
}

/** Flat lookup of all items per category */
export const ITEMS_BY_CATEGORY: Record<CategoryId, AnyItem[]> = {
  background: BACKGROUND_ITEMS as unknown as AnyItem[],
  hair: HAIR_STYLES.map((h: HairStyle) => ({
    id: h.id,
    name: h.name,
    Component: h.front as unknown as AnyItem['Component'],
  })),
  top: TOP_ITEMS as unknown as TopItem[] as unknown as AnyItem[],
  bottom: BOTTOM_ITEMS as unknown as BottomItem[] as unknown as AnyItem[],
  dress: DRESS_ITEMS as unknown as DressItem[] as unknown as AnyItem[],
  shoe: SHOE_ITEMS as unknown as ShoeItem[] as unknown as AnyItem[],
  accessory: ACCESSORY_ITEMS as unknown as AccessoryItem[] as unknown as AnyItem[],
  decoration: DECORATION_ITEMS as unknown as DecorationItem[] as unknown as AnyItem[],
}

/** For the actual stage rendering, hair needs both back+front components. */
export { HAIR_STYLES, TOP_ITEMS, BOTTOM_ITEMS, DRESS_ITEMS, BACKGROUND_ITEMS, ACCESSORY_ITEMS, SHOE_ITEMS, DECORATION_ITEMS }

export interface ClothPropsType { color?: string; trim?: string; highlight?: string }
export interface HairPropsType { color?: string; highlight?: string }
export interface BackgroundPropsType { color?: string }

// Re-export prop types for convenience
export type { ClothProps, BottomClothProps, DressClothProps, HairProps, BackgroundProps, AccessoryProps, ShoeProps, DecorationProps }
