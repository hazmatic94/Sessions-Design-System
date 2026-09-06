import type { CSSProperties, HTMLAttributes } from "react";
export type RouletteWinChipBetColor = "red" | "black" | "green";
export type RouletteWinChipProps = HTMLAttributes<HTMLDivElement> & {
    /** Fires the appear + multiplier rise sequence on false → true. */
    active?: boolean;
    /** Resting state after the win animation — chip, multiplier, and active ring stay visible. */
    settled?: boolean;
    betColor: RouletteWinChipBetColor;
    multiplier: string;
    /** Matches coin progression receiver size. */
    size?: number;
    className?: string;
    style?: CSSProperties & {
        "--roulette-win-chip-size"?: string;
    };
    onAnimationComplete?: () => void;
};
//# sourceMappingURL=RouletteWinChip.types.d.ts.map