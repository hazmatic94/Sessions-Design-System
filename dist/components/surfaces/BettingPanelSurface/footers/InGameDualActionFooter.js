import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../Button/index.js";
import styles from "./BettingPanelFooters.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function InGameDualActionFooter({ cashoutLabel = "Cashout", className = "", onCashout, onPrimaryAction, primaryLabel = "Play Again", }) {
    return (_jsxs("div", { className: cx(styles.submitGroup, styles.dualActionGroup, "joker-betting-submit-group joker-betting-ingame-dual-action-footer", className), children: [_jsx(Button, { variant: "cashout", fullWidth: true, className: cx(styles.submit, "joker-cta-preview hi-lo-skip cashout full-width"), onClick: onCashout, children: _jsx("span", { className: "joker-hi-lo-skip-label", children: cashoutLabel }) }), _jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit"), onClick: onPrimaryAction, children: primaryLabel })] }));
}
