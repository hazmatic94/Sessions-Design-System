import type { CSSProperties, HTMLAttributes } from "react";
import type { RouletteWinChipBetColor } from "../RouletteWinChip/RouletteWinChip.types.js";
export type WinStreakSlot = {
    betColor: RouletteWinChipBetColor;
    multiplier: string;
};
export type WinStreakRowProps = HTMLAttributes<HTMLDivElement> & {
    /** Settled win chips shown left-to-right. Defaults to five varied sample wins. */
    wins?: WinStreakSlot[];
    /** Gap between chips in px. */
    gap?: number;
    /** Receiver diameter — matches `RouletteWinChip` default (88px). */
    chipSize?: number;
    /** Play the full `RouletteWinChip` enter sequence on mount. */
    animateOnMount?: boolean;
    /** Delay between each chip's win animation when `animateOnMount` is true. */
    staggerMs?: number;
    /** Indices at or below this value render settled; later slots play the win animation. */
    completedThrough?: number;
    className?: string;
    style?: CSSProperties & {
        "--win-streak-row-gap"?: string;
        "--win-streak-row-chip-size"?: string;
    };
};
//# sourceMappingURL=WinStreakRow.types.d.ts.map