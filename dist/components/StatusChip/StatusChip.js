import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./StatusChip.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function formatMatchLabel(matchCount) {
    const safeCount = Math.max(0, matchCount);
    const noun = safeCount === 1 ? "Match" : "Matches";
    return `${safeCount} ${noun} Available`;
}
export function StatusChip({ matchCount, className, ...props }) {
    const label = formatMatchLabel(matchCount);
    return (_jsxs("span", { ...props, className: cx(styles.root, "joker-status-chip", className), children: [_jsx("span", { className: cx(styles.dot, "joker-status-chip-dot"), "aria-hidden": "true" }), _jsx("span", { className: cx(styles.label, "joker-status-chip-label"), children: label })] }));
}
