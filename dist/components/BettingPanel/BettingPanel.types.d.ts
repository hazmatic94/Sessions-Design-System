import type { ButtonHTMLAttributes, ChangeEventHandler } from "react";
export type BettingPanelMode = "manual" | "auto";
export type BettingPanelProps = {
    layout?: "desktop" | "mobile";
    mode?: BettingPanelMode;
    onModeChange?: (mode: BettingPanelMode) => void;
    onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    betAmount?: string | number;
    defaultBetAmount?: string | number;
    onBetAmountChange?: ChangeEventHandler<HTMLInputElement>;
    disablePlaceBetUntilBetAmount?: boolean;
    numberOfBets?: string | number;
    defaultNumberOfBets?: string | number;
    onNumberOfBetsChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
};
//# sourceMappingURL=BettingPanel.types.d.ts.map