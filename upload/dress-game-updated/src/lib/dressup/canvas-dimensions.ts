/**
 * canvas-dimensions.ts — Shared canvas dimensions for the dress-up game.
 *
 * The canvas fills most of the viewport (header is now slim, no footer).
 * The body is scaled up to fill more of the frame, with enough space
 * above the head for hair/hats.
 */

export const CANVAS_WIDTH = 560          // Canvas width
export const CANVAS_HEIGHT = 880         // Canvas height (tall, fills viewport)
export const BODY_WIDTH = 325
export const BODY_HEIGHT = 742

// Scale the body UP so it fills more of the frame
export const BODY_SCALE = 0.85           // Larger body

// Scaled body dimensions
export const SCALED_BODY_WIDTH = BODY_WIDTH * BODY_SCALE    // = 276.25
export const SCALED_BODY_HEIGHT = BODY_HEIGHT * BODY_SCALE  // = 630.7

// Center the body horizontally
export const BODY_OFFSET_X = (CANVAS_WIDTH - SCALED_BODY_WIDTH) / 2   // ≈ 141.88

// Anchor the body to the BOTTOM of the canvas so the feet sit on the ground
const BOTTOM_MARGIN = 15
export const BODY_OFFSET_Y = CANVAS_HEIGHT - SCALED_BODY_HEIGHT - BOTTOM_MARGIN  // ≈ 234.3

// Space above the head (for hair/hats)
export const HEAD_SPACE_ABOVE = BODY_OFFSET_Y

// The complete SVG transform string for the body group
export const BODY_TRANSFORM = `translate(${BODY_OFFSET_X}, ${BODY_OFFSET_Y}) scale(${BODY_SCALE})`

/** The SVG viewBox string for the full canvas */
export const CANVAS_VIEWBOX = `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`

/** The aspect ratio string for CSS */
export const CANVAS_ASPECT_RATIO = `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`
