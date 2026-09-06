import { jsx as _jsx } from "react/jsx-runtime";
import { BettingPanel } from "../BettingPanel/index.js";
import styles from "./CrashBettingPanel.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CrashBettingPanel({ className = "", ...props }) {
    return _jsx(BettingPanel, { ...props, className: cx(styles.root, "joker-crash-betting-panel", className) });
}
