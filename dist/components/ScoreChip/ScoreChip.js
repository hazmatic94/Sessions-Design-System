import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./ScoreChip.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function ScoreChip({ children, className, ...props }) {
    return (_jsx("span", { ...props, className: cx(styles.root, "joker-score-chip", className), children: _jsx("span", { className: cx(styles.label, "joker-score-chip__label"), children: children }) }));
}
