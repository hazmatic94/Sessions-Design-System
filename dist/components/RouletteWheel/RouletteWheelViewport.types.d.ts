import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
export type RouletteWheelViewportProps = HTMLAttributes<HTMLDivElement> & {
    /** Native wheel render size — the wheel does not scale; the viewport crops overflow. */
    wheelSize?: number;
    /** Optional downward nudge in px — defaults to 0 (top-center aligned). */
    offsetY?: number;
    children?: ReactNode;
    style?: CSSProperties & {
        "--roulette-wheel-size"?: string;
        "--roulette-wheel-viewport-pointer-bleed"?: string;
        "--roulette-wheel-viewport-offset-y"?: string;
    };
};
//# sourceMappingURL=RouletteWheelViewport.types.d.ts.map