import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./OddsRow.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function OddsRow({ children, className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-odds-row", className), children: _jsx("span", { className: cx(styles.label, "joker-odds-row__label"), children: children }) }));
}
