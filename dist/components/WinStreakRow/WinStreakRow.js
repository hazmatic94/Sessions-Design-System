import { jsx as _jsx } from "react/jsx-runtime";
import { SAMPLE_WIN_STREAK_WINS } from "./createRandomWinStreakWins.js";
import { WinStreakRowChip } from "./WinStreakRowChip.js";
import "../../styles/win-streak-row.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function WinStreakRow({ wins = SAMPLE_WIN_STREAK_WINS, gap = 8, chipSize = 88, animateOnMount = true, staggerMs = 220, completedThrough, className, style, ...props }) {
    const resolvedCompletedThrough = completedThrough ?? (animateOnMount ? -1 : wins.length - 1);
    const rowStyle = {
        "--win-streak-row-gap": `${gap}px`,
        "--win-streak-row-chip-size": `${chipSize}px`,
        ...style,
    };
    return (_jsx("div", { ...props, className: cx("joker-win-streak-row", className), style: rowStyle, children: _jsx("ol", { className: "joker-win-streak-row__track", "aria-label": `${wins.length} win streak`, children: wins.map((win, index) => {
                const initialSettled = index <= resolvedCompletedThrough;
                const playDelay = initialSettled
                    ? 0
                    : Math.max(0, index - (resolvedCompletedThrough + 1)) * staggerMs;
                return (_jsx("li", { className: "joker-win-streak-row__slot", children: _jsx(WinStreakRowChip, { win: win, chipSize: chipSize, initialSettled: initialSettled, playDelay: playDelay }) }, `${win.betColor}-${win.multiplier}-${index}`));
            }) }) }));
}
