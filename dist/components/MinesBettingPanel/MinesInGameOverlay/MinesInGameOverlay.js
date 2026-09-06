import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CashoutFooter } from "../../surfaces/BettingPanelSurface/footers/CashoutFooter.js";
import styles from "./MinesInGameOverlay.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function MinesInGameOverlay({ children, cashoutLabel = "Cashout", className = "", layout = "desktop", showCashout = true, onCashout, }) {
    const isMobileLayout = layout === "mobile";
    const rootClassName = cx(styles.root, isMobileLayout ? styles.rootMobile : styles.rootDesktop, "joker-mines-betting-ingame-actions joker-mines-betting-ingame-overlay-root", isMobileLayout
        ? "joker-mines-betting-ingame-actions--mobile"
        : "joker-mines-betting-ingame-actions--desktop", className);
    const cashout = showCashout ? (_jsx(CashoutFooter, { label: cashoutLabel, onCashout: onCashout })) : null;
    const stackClassName = cx(styles.stack, "joker-mines-betting-ingame-stack");
    const stack = isMobileLayout ? (_jsxs("div", { className: stackClassName, children: [cashout, children] })) : (_jsxs("div", { className: stackClassName, children: [_jsx("div", { className: cx(styles.cardSlot, "joker-mines-betting-ingame-overlay"), children: children }), cashout] }));
    return (_jsxs("div", { className: rootClassName, children: [_jsx("span", { className: cx(styles.scrim, "joker-mines-betting-ingame-scrim"), "aria-hidden": "true" }), _jsx("div", { className: styles.focus, children: stack })] }));
}
