/**
 * canvas-dimensions.ts — Shared canvas dimensions for the dress-up game.
 *
 * The canvas is WIDER and TALLER than the body image so the model appears
 * smaller and centered with breathing room around her — especially above
 * the head, where tall hairstyles and hats need room to render.
 *
 *   ┌──────────────────────────────────────┐
 *   │                                      │
 *   │       (space for hair/hats)          │  ← BODY_OFFSET_Y
 *   │                                      │
 *   │   pad   │   body   │   pad           │
 *   │ (offX)  │ (scaled) │  (offX)         │
 *   │                                      │
 *   │       (space below feet)             │
 *   │                                      │
 *   └──────────────────────────────────────┘
 *   ←──── CANVAS_WIDTH (620) ──────────→
 *   ←──── CANVAS_HEIGHT (900) ────────→
 */

export const CANVAS_WIDTH = 620          // Wider (was 560)
export const CANVAS_HEIGHT = 900         // Taller (was 860)
export const BODY_WIDTH = 325
export const BODY_HEIGHT = 742

// Scale the body down so it appears smaller within the canvas
export const BODY_SCALE = 0.72           // Smaller (was 0.78)

// Scaled body dimensions (used to compute offsets)
export const SCALED_BODY_WIDTH = BODY_WIDTH * BODY_SCALE    // = 234
export const SCALED_BODY_HEIGHT = BODY_HEIGHT * BODY_SCALE  // = 534.24

// Center the body horizontally
export const BODY_OFFSET_X = (CANVAS_WIDTH - SCALED_BODY_WIDTH) / 2   // = 193

// Anchor the body to the BOTTOM of the canvas so the feet sit naturally on
// the "ground" of background scenes. We leave a small BOTTOM_MARGIN so the
// feet aren't touching the very edge of the frame.
const BOTTOM_MARGIN = 20
export const BODY_OFFSET_Y = CANVAS_HEIGHT - SCALED_BODY_HEIGHT - BOTTOM_MARGIN  // ≈ 345.76

// The space above the head (used by hair/hats) = BODY_OFFSET_Y
export const HEAD_SPACE_ABOVE = BODY_OFFSET_Y

// The complete SVG transform string for the body group
// (applied as: <g transform={BODY_TRANSFORM}>)
export const BODY_TRANSFORM = `translate(${BODY_OFFSET_X}, ${BODY_OFFSET_Y}) scale(${BODY_SCALE})`

/** The SVG viewBox string for the full canvas */
export const CANVAS_VIEWBOX = `0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`

/** The aspect ratio string for CSS (e.g. "620 / 900") */
export const CANVAS_ASPECT_RATIO = `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}`
