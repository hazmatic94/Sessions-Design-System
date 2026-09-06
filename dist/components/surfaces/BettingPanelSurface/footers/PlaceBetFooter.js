import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../../../Button/index.js";
import { EnterBetPrecursor } from "../../../EnterBetPrecursor/index.js";
import styles from "./BettingPanelFooters.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function PlaceBetFooter({ className = "", label = "Place Bet", onPlaceBet, showPrecursor = false, }) {
    return (_jsxs("div", { className: cx(styles.submitGroup, "joker-betting-submit-group joker-betting-place-bet-footer", showPrecursor && "is-pending-bet", className), children: [_jsx(Button, { fullWidth: true, className: cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit", showPrecursor && "is-pending-bet"), onClick: onPlaceBet, children: label }), showPrecursor && _jsx(EnterBetPrecursor, {})] }));
}
