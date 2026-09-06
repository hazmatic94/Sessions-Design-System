import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Chip.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
const variantClassName = {
    start: styles.start,
    skip: styles.skip,
    win: styles.win,
    loss: styles.loss,
};
const defaultLabel = {
    start: "Start",
    skip: "Skip",
    win: "1.57x",
    loss: "0.00x",
};
export function Chip({ variant = "start", children, className, ...props }) {
    return (_jsx("span", { ...props, className: cx(styles.root, "joker-chip", `joker-chip--${variant}`, variantClassName[variant], className), children: children ?? defaultLabel[variant] }));
}
