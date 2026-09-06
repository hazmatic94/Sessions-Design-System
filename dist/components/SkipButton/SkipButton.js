import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./SkipButton.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function ChevronRightIcon({ className }) {
    return (_jsx("svg", { className: className, viewBox: "0 0 8 8", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "M2 1.5 5.5 4 2 6.5" }) }));
}
export function SkipButton({ className, type = "button", ...props }) {
    return (_jsx("button", { ...props, type: type, className: cx(styles.root, "joker-skip-button", className), "aria-label": props["aria-label"] ?? "Skip", children: _jsxs("span", { className: cx(styles.icon, "joker-skip-button__icon"), "aria-hidden": "true", children: [_jsx(ChevronRightIcon, { className: cx(styles.chevron, "joker-skip-button__chevron") }), _jsx(ChevronRightIcon, { className: cx(styles.chevron, "joker-skip-button__chevron") })] }) }));
}
