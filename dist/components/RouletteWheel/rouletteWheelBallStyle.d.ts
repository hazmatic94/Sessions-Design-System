import type { CSSProperties } from "react";
import type { RoulettePoint } from "./rouletteWheelLayout";
export declare function rouletteBallCssPositionFromPoint(point: RoulettePoint): CSSProperties;
/** @deprecated Use `rouletteBallCssPositionFromPoint` with pocket `ballPosition`. */
export declare function rouletteBallPosition(angleDeg: number, dropOffset?: number): {
    x: number;
    y: number;
};
/** @deprecated Use `rouletteBallCssPositionFromPoint`. */
export declare function rouletteBallCssPosition(angleDeg: number, dropOffset?: number): CSSProperties;
/** @deprecated Use `dropOffset` — positive values move the ball outward into the pocket. */
export declare function rouletteBallPositionFromInset(angleDeg: number, dropInset?: number): {
    x: number;
    y: number;
};
//# sourceMappingURL=rouletteWheelBallStyle.d.ts.map