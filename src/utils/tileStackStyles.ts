import type { CSSProperties } from "react";

export function mergeTileStackStyle(
  stackIndex: number | undefined,
  style?: CSSProperties,
): CSSProperties | undefined {
  if (stackIndex == null) {
    return style;
  }

  return {
    ...style,
    "--tile-stack-index": stackIndex,
  } as CSSProperties;
}

/** Earlier tiles get a higher stack so overflow (e.g. win multipliers) stays visible in grids. */
export function getTileStackIndex(index: number, total: number) {
  return total - index;
}
