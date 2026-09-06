import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./BetSlipRow.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CloseIcon() {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "M18 6 6 18M6 6l12 12", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2" }) }));
}
export function BetSlipRow({ teamName, odds, marketType, selection, matchup, onRemove, removeLabel = "Remove selection", className, ...props }) {
    return (_jsxs("div", { ...props, className: cx(styles.root, "joker-bet-slip-row", className), children: [_jsx("button", { type: "button", className: cx(styles.remove, "joker-bet-slip-row__remove"), onClick: onRemove, "aria-label": removeLabel, children: _jsx(CloseIcon, {}) }), _jsxs("div", { className: cx(styles.body, "joker-bet-slip-row__body"), children: [_jsxs("div", { className: cx(styles.topRow, "joker-bet-slip-row__top-row"), children: [_jsx("span", { className: cx(styles.teamName, "joker-bet-slip-row__team-name"), children: teamName }), _jsx("span", { className: cx(styles.odds, "joker-bet-slip-row__odds"), children: odds })] }), _jsxs("p", { className: cx(styles.market, "joker-bet-slip-row__market"), children: [_jsx("span", { className: cx(styles.marketType, "joker-bet-slip-row__market-type"), children: marketType }), _jsx("span", { className: cx(styles.divider, "joker-bet-slip-row__divider"), "aria-hidden": "true" }), _jsx("span", { className: cx(styles.selection, "joker-bet-slip-row__selection"), children: selection })] }), _jsx("p", { className: cx(styles.matchup, "joker-bet-slip-row__matchup"), children: matchup })] })] }));
}
