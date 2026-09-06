import type { ButtonHTMLAttributes, ReactNode } from "react";
export type MinesInGameOverlayLayout = "desktop" | "mobile";
export type MinesInGameOverlayProps = {
    children: ReactNode;
    cashoutLabel?: ReactNode;
    className?: string;
    layout?: MinesInGameOverlayLayout;
    /** When false, only the scrim + card render (cashout lives in the panel Place Bet slot). */
    showCashout?: boolean;
    onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};
//# sourceMappingURL=MinesInGameOverlay.types.d.ts.map