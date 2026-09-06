import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
export type BetSlipRowProps = HTMLAttributes<HTMLDivElement> & {
    teamName: string;
    odds: ReactNode;
    marketType: string;
    selection: string;
    matchup: string;
    onRemove?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    removeLabel?: string;
};
//# sourceMappingURL=BetSlipRow.types.d.ts.map