import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
export type RouletteChipColor = "black" | "red" | "green";
export type RouletteChipProps = HTMLAttributes<HTMLDivElement> & {
    /** Disc diameter — defaults to 42px via CSS when omitted. */
    size?: number;
    /** Chip colour variant — defaults to black. */
    color?: RouletteChipColor;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties & {
        "--roulette-chip-size"?: string;
    };
};
//# sourceMappingURL=RouletteChip.types.d.ts.map