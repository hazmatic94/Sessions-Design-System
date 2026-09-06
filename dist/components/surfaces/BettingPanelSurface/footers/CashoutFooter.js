import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "../../../Button/index.js";
import styles from "./BettingPanelFooters.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CashoutFooter({ className = "", label = "Cashout", onCashout, }) {
    return (_jsx("div", { className: cx(styles.submitGroup, "joker-betting-submit-group joker-betting-cashout-footer", className), children: _jsx(Button, { variant: "cashout", fullWidth: true, className: cx(styles.submit, "joker-cta-preview hi-lo-skip cashout full-width"), onClick: onCashout, children: _jsx("span", { className: "joker-hi-lo-skip-label", children: label }) }) }));
}
