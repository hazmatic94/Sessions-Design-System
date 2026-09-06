import type { ButtonHTMLAttributes, ChangeEventHandler, ReactNode } from "react";
export type HiLoBettingPanelProps = {
    layout?: "desktop" | "mobile";
    onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onLowerSame?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onHigherSame?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    betAmount?: string | number;
    defaultBetAmount?: string | number;
    onBetAmountChange?: ChangeEventHandler<HTMLInputElement>;
    lowerLabel?: ReactNode;
    higherLabel?: ReactNode;
    lowerOdds?: ReactNode;
    higherOdds?: ReactNode;
    placeBetLabel?: ReactNode;
    cashoutLabel?: ReactNode;
    skipLabel?: ReactNode;
    inGame?: boolean;
    onSkipCard?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    disablePlaceBetUntilBetAmount?: boolean;
    selectedOddsValue?: string;
    className?: string;
};
//# sourceMappingURL=HiLoBettingPanel.types.d.ts.map