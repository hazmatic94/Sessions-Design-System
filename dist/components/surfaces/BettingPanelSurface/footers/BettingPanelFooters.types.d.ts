import type { ButtonHTMLAttributes, ReactNode } from "react";
export type PlaceBetFooterProps = {
    className?: string;
    label?: ReactNode;
    onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    showPrecursor?: boolean;
};
export type CashoutFooterProps = {
    className?: string;
    label?: ReactNode;
    onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};
export type InGameDualActionFooterProps = {
    cashoutLabel?: ReactNode;
    className?: string;
    onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onPrimaryAction?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    primaryLabel?: ReactNode;
};
//# sourceMappingURL=BettingPanelFooters.types.d.ts.map