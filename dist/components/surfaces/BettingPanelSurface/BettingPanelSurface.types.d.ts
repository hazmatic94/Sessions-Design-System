import type { ButtonHTMLAttributes, ChangeEventHandler, ReactNode } from "react";
export type BettingPanelSurfaceLayout = "desktop" | "mobile";
export type BettingPanelSurfaceProps = {
    ariaLabel?: string;
    betAmount?: string | number;
    children?: ReactNode;
    className?: string;
    defaultBetAmount?: string | number;
    disablePlaceBetUntilBetAmount?: boolean;
    footer?: ReactNode;
    inGame?: boolean;
    layout?: BettingPanelSurfaceLayout;
    onBetAmountChange?: ChangeEventHandler<HTMLInputElement>;
    onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    submitLabel?: string;
};
//# sourceMappingURL=BettingPanelSurface.types.d.ts.map