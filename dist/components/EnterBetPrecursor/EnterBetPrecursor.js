import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./EnterBetPrecursor.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function EnterBetPrecursor({ message = "Enter a bet amount to start playing", className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-enter-bet-precursor", className), role: "status", children: _jsx("span", { className: cx(styles.text, "joker-enter-bet-precursor-text"), children: message }) }));
}
