import type { HTMLAttributes, ReactNode } from "react";
export type ChipVariant = "start" | "skip" | "win" | "loss";
export type ChipProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: ChipVariant;
    children?: ReactNode;
};
//# sourceMappingURL=Chip.types.d.ts.map