import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatMatchMinutes } from "../../utils/formatMatchMinutes.js";
import styles from "./DateRow.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function DateRow({ children, variant = "default", minutesPlayed = 0, className, ...props }) {
    if (variant === "live") {
        return (_jsxs("div", { ...props, className: cx(styles.root, styles.live, "joker-date-row", "joker-date-row--live", className), children: [_jsx("span", { className: cx(styles.livePrefix, "joker-date-row__live-prefix"), children: "Playing for" }), _jsx("span", { className: cx(styles.liveTime, "joker-date-row__live-time"), children: formatMatchMinutes(minutesPlayed) })] }));
    }
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-date-row", className), children: _jsx("span", { className: cx(styles.label, "joker-date-row__label"), children: children }) }));
}
