import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Time.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function Time({ children, className, ...props }) {
    return (_jsx("span", { ...props, className: cx(styles.root, "joker-time", className), children: _jsx("span", { className: cx(styles.label, "joker-time__label"), children: children }) }));
}
