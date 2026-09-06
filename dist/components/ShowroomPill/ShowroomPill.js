import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ShowroomPill.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function ShowroomPill({ children, className, icon, label, selected = false, type = "button", ...props }) {
    const content = children ?? label;
    return (_jsxs("button", { ...props, className: cx(styles.pill, "joker-showroom-pill", selected && styles.selected, selected && "is-selected", className), type: type, "aria-pressed": props["aria-pressed"] ?? selected, children: [icon && (_jsx("span", { className: cx(styles.icon, "joker-showroom-pill-icon"), "aria-hidden": "true", children: icon })), _jsx("span", { children: content })] }));
}
