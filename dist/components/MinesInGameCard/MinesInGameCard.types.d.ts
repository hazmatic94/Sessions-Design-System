import type { HTMLAttributes, ReactNode } from "react";
export type MinesInGameCardProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    currentProfitLabel?: ReactNode;
    currentProfit?: ReactNode;
    nextLabel?: ReactNode;
    nextValue?: ReactNode;
    currentMultiplier?: ReactNode;
    nextMultiplier?: ReactNode;
};
//# sourceMappingURL=MinesInGameCard.types.d.ts.map