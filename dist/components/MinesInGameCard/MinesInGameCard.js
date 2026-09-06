import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./MinesInGameCard.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function CoinIcon() {
    return _jsx("span", { className: styles.coin, "aria-hidden": "true" });
}
function ChevronIcon() {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "m9 5 7 7-7 7", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
export function MinesInGameCard({ currentProfitLabel = "Current profit", currentProfit = "800", nextLabel = "Next", nextValue = "1050", currentMultiplier = "8.0x", nextMultiplier = "10.5x", className, ...props }) {
    return (_jsxs("div", { ...props, className: cx(styles.card, "joker-mines-ingame-card", className), children: [_jsxs("div", { className: styles.top, children: [_jsxs("div", { className: styles.stack, children: [_jsx("span", { className: styles.label, children: currentProfitLabel }), _jsxs("span", { className: cx(styles.value, styles.profit), children: [_jsx(CoinIcon, {}), _jsx("span", { children: currentProfit })] })] }), _jsx("span", { className: styles.chevron, children: _jsx(ChevronIcon, {}) }), _jsxs("div", { className: styles.stack, children: [_jsx("span", { className: styles.label, children: nextLabel }), _jsxs("span", { className: cx(styles.value, styles.next), children: [_jsx(CoinIcon, {}), _jsx("span", { children: nextValue })] })] })] }), _jsxs("div", { className: styles.bottom, children: [_jsx("span", { className: cx(styles.multiplier, styles.profit), children: currentMultiplier }), _jsx("span", { className: styles.divider, "aria-hidden": "true" }), _jsx("span", { className: styles.multiplier, children: nextMultiplier })] })] }));
}
