import type { CSSProperties } from "react";
export declare function mergeTileStackStyle(stackIndex: number | undefined, style?: CSSProperties): CSSProperties | undefined;
/** Earlier tiles get a higher stack so overflow (e.g. win multipliers) stays visible in grids. */
export declare function getTileStackIndex(index: number, total: number): number;
//# sourceMappingURL=tileStackStyles.d.ts.map