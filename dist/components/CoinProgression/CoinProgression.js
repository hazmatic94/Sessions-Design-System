import { jsx as _jsx } from "react/jsx-runtime";
import { CoinProgressionStep } from "./CoinProgressionStep.js";
import "../../styles/coin-progression.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CoinProgression({ steps, activeIndex, completedThrough = -1, lockingIndex = null, receiverSize = 88, gap = 8, onLockComplete, renderCoin, className, style, ...props }) {
    const rowStyle = {
        "--win-streak-row-gap": `${gap}px`,
        "--win-streak-row-chip-size": `${receiverSize}px`,
        ...style,
    };
    return (_jsx("div", { ...props, className: cx("joker-coin-progression", className), style: rowStyle, children: _jsx("ol", { className: "joker-coin-progression__track", "aria-label": `${steps.length} coin progression steps`, children: steps.map((step, index) => {
                const isLocking = lockingIndex === index;
                const isCompleted = index <= completedThrough;
                const settled = isCompleted && !isLocking;
                const showChip = isCompleted || isLocking;
                return (_jsx("li", { className: "joker-coin-progression__slot", children: _jsx(CoinProgressionStep, { multiplier: step.multiplier, receiverSize: receiverSize, settled: settled, animating: isLocking, showChip: showChip, renderCoin: renderCoin && showChip ? () => renderCoin(index) : undefined, onPlaybackComplete: () => onLockComplete?.(index) }) }, `${step.multiplier}-${index}`));
            }) }) }));
}
