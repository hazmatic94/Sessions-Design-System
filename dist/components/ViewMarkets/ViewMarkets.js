import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ViewMarkets.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function ChevronRightIcon({ className }) {
    return (_jsx("svg", { className: className, viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "m9 18 6-6-6-6" }) }));
}
export function ViewMarkets({ children = "View markets", className, type = "button", ...props }) {
    return (_jsxs("button", { ...props, type: type, className: cx(styles.root, "joker-view-markets", className), children: [_jsx("span", { className: cx(styles.label, "joker-view-markets__label"), children: children }), _jsx("span", { className: cx(styles.chevron, "joker-view-markets__chevron"), "aria-hidden": "true", children: _jsx(ChevronRightIcon, {}) })] }));
}
