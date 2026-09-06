/**
 * Roulette wheel palette mapped to joker design tokens.
 * Runtime values use --roulette-* aliases (see roulette-wheel.css).
 * Hex values mirror src/styles/tokens.css for static SVG export.
 */
export const ROULETTE_WHEEL_HEX = {
  white: "#ffffff",
  black: "#000000",

  pocketRedLight: "#e73540",
  pocketRed: "#d0202c",
  pocketRedDark: "#931420",

  pocketBlackLight: "#242424",
  pocketBlack: "#171717",
  pocketBlackDark: "#0b0b0b",

  pocketGreenLight: "#22a147",
  pocketGreen: "#0e8632",
  pocketGreenDark: "#06511f",

  goldLip0: "#ffe4b8",
  goldLip22: "#ffdea8",
  goldLip55: "#bba072",
  goldLip82: "#8e7348",
  goldLip100: "#65512f",

  bronzeWall0: "#65512f",
  bronzeWall45: "#382e23",
  bronzeWall100: "#1d1811",

  track0: "#262626",
  track35: "#1f1f1f",
  track68: "#171717",
  track100: "#000000",

  bowl0: "#212121",
  bowl58: "#1b1b1b",
  bowl100: "#000000",

  spindle0: "#3d3d3d",
  spindle55: "#212121",
  spindle100: "#171717",

  spindleCap0: "#ffe4b8",
  spindleCap55: "#a88c5d",
  spindleCap100: "#65512f",

  pointerFill: "#ffdea8",
  pointerOutline: "#bba072",

  ball0: "#ffffff",
  ball55: "#f0f0f0",
  ball100: "#cfcfcf",
  ballSpecular: "#ffffff",
  ballShade: "#3d3d3d",

  rimShadow: "#000000",
  rimBaseOuter: "#000000",
  rimBaseMid: "#131313",
  rimBaseInner: "#171717",

  rimGoldTopEdge: "#ffe9ad",
  rimGoldTop: "#f6d27c",
  rimGoldUpper: "#e0af52",
  rimGoldMid: "#b98b3e",
  rimGoldLower: "#7d5a26",
  rimGoldBottom: "#57391b",
  rimEdgeLight: "#fff3cd",
  rimEdgeBottom: "#c9a35a",

  groove: "#000000",
  bowlRim: "#1b1b1b",

  goldAmbientShadow: "#bba072",
  bronzeShadow: "#382e23",

  number: "#ffffff",
  spindleHighlight: "#ffdea8",
} as const;

/** CSS variable references scoped to .joker-roulette-wheel */
export const RW = {
  white: "var(--roulette-white)",
  black: "var(--roulette-black)",

  pocketRedLight: "var(--roulette-pocket-red-light)",
  pocketRed: "var(--roulette-pocket-red)",
  pocketRedDark: "var(--roulette-pocket-red-dark)",

  pocketBlackLight: "var(--roulette-pocket-black-light)",
  pocketBlack: "var(--roulette-pocket-black)",
  pocketBlackDark: "var(--roulette-pocket-black-dark)",

  pocketGreenLight: "var(--roulette-pocket-green-light)",
  pocketGreen: "var(--roulette-pocket-green)",
  pocketGreenDark: "var(--roulette-pocket-green-dark)",

  goldLip0: "var(--roulette-gold-lip-0)",
  goldLip22: "var(--roulette-gold-lip-22)",
  goldLip55: "var(--roulette-gold-lip-55)",
  goldLip82: "var(--roulette-gold-lip-82)",
  goldLip100: "var(--roulette-gold-lip-100)",

  bronzeWall0: "var(--roulette-bronze-wall-0)",
  bronzeWall45: "var(--roulette-bronze-wall-45)",
  bronzeWall100: "var(--roulette-bronze-wall-100)",

  track0: "var(--roulette-track-0)",
  track35: "var(--roulette-track-35)",
  track68: "var(--roulette-track-68)",
  track100: "var(--roulette-track-100)",

  bowl0: "var(--roulette-bowl-0)",
  bowl58: "var(--roulette-bowl-58)",
  bowl100: "var(--roulette-bowl-100)",

  spindle0: "var(--roulette-spindle-0)",
  spindle55: "var(--roulette-spindle-55)",
  spindle100: "var(--roulette-spindle-100)",

  spindleCap0: "var(--roulette-spindle-cap-0)",
  spindleCap55: "var(--roulette-spindle-cap-55)",
  spindleCap100: "var(--roulette-spindle-cap-100)",

  pointerFill: "var(--roulette-pointer-fill)",
  pointerOutline: "var(--roulette-pointer-outline)",

  ball0: "var(--roulette-ball-0)",
  ball55: "var(--roulette-ball-55)",
  ball100: "var(--roulette-ball-100)",
  ballSpecular: "var(--roulette-ball-specular)",
  ballShade: "var(--roulette-ball-shade)",

  rimShadow: "var(--roulette-rim-shadow)",
  rimBaseOuter: "var(--roulette-rim-base-outer)",
  rimBaseMid: "var(--roulette-rim-base-mid)",
  rimBaseInner: "var(--roulette-rim-base-inner)",

  rimGoldTopEdge: "var(--roulette-rim-gold-top-edge)",
  rimGoldTop: "var(--roulette-rim-gold-top)",
  rimGoldUpper: "var(--roulette-rim-gold-upper)",
  rimGoldMid: "var(--roulette-rim-gold-mid)",
  rimGoldLower: "var(--roulette-rim-gold-lower)",
  rimGoldBottom: "var(--roulette-rim-gold-bottom)",
  rimEdgeLight: "var(--roulette-rim-edge-light)",
  rimEdgeBottom: "var(--roulette-rim-edge-bottom)",

  groove: "var(--roulette-groove)",
  bowlRim: "var(--roulette-bowl-rim)",

  goldAmbientShadow: "var(--roulette-gold-ambient-shadow)",
  bronzeShadow: "var(--roulette-bronze-shadow)",

  number: "var(--roulette-number)",
  spindleHighlight: "var(--roulette-spindle-highlight)",

  pocketDivider: "var(--roulette-pocket-divider)",
  separatorGroove: "var(--roulette-separator-groove)",
  trackHighlight: "var(--roulette-track-highlight)",
  trackInnerHighlight: "var(--roulette-track-inner-highlight)",
  bowlInnerHighlight: "var(--roulette-bowl-inner-highlight)",
  spindleRing: "var(--roulette-spindle-ring)",
  spindleInnerRing: "var(--roulette-spindle-inner-ring)",
  ballShadow: "var(--roulette-ball-shadow)",
  ballStroke: "var(--roulette-ball-stroke)",
  bowlShadow: "var(--roulette-bowl-shadow)",
  spindleCapHighlight: "var(--roulette-spindle-cap-highlight)",

  pocketWellShade: "var(--roulette-pocket-well-shade)",
  pocketWellRim: "var(--roulette-pocket-well-rim)",
  pocketWellRimHighlight: "var(--roulette-pocket-well-rim-highlight)",
  pocketFretShadow: "var(--roulette-pocket-fret-shadow)",
  pocketFretHighlight: "var(--roulette-pocket-fret-highlight)",
} as const;

export const DEFAULT_POCKET_RED = [RW.pocketRedLight, RW.pocketRed, RW.pocketRedDark] as const;
export const DEFAULT_POCKET_BLACK = [RW.pocketBlackLight, RW.pocketBlack, RW.pocketBlackDark] as const;
export const DEFAULT_POCKET_GREEN = [RW.pocketGreenLight, RW.pocketGreen, RW.pocketGreenDark] as const;
