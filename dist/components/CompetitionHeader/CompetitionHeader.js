import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./CompetitionHeader.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CompetitionHeader({ children, className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-competition-header", className), children: _jsx("span", { className: cx(styles.label, "joker-competition-header__label"), children: children }) }));
}
