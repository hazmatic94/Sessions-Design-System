import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Chip } from "../Chip/index.js";
import { RouletteChip } from "../RouletteChip/index.js";
import { ROULETTE_WIN_CHIP_ENTER_MS, ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS, ROULETTE_WIN_CHIP_PLAYBACK_MS, ROULETTE_WIN_CHIP_RING_ENTER_MS, } from "./rouletteWinChipTiming.js";
import "../../styles/roulette-win-chip.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function RouletteWinChip({ active = false, settled = false, betColor, multiplier, size = 88, className, style, onAnimationComplete, ...props }) {
    const [playing, setPlaying] = useState(false);
    const onAnimationCompleteRef = useRef(onAnimationComplete);
    useEffect(() => {
        onAnimationCompleteRef.current = onAnimationComplete;
    }, [onAnimationComplete]);
    useEffect(() => {
        if (settled) {
            setPlaying(false);
            return;
        }
        if (!active) {
            setPlaying(false);
            return;
        }
        setPlaying(false);
        const playFrame = window.requestAnimationFrame(() => {
            setPlaying(true);
        });
        const completeTimer = window.setTimeout(() => {
            onAnimationCompleteRef.current?.();
        }, ROULETTE_WIN_CHIP_PLAYBACK_MS);
        return () => {
            window.cancelAnimationFrame(playFrame);
            window.clearTimeout(completeTimer);
        };
    }, [active, settled]);
    if (!settled && !active && !playing) {
        return null;
    }
    const rootStyle = {
        "--roulette-win-chip-size": `${size}px`,
        "--roulette-win-chip-enter-duration": `${ROULETTE_WIN_CHIP_ENTER_MS}ms`,
        "--roulette-win-chip-pop-duration": `${ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS}ms`,
        "--roulette-win-chip-ring-enter-duration": `${ROULETTE_WIN_CHIP_RING_ENTER_MS}ms`,
        "--roulette-win-chip-pop-delay": `${ROULETTE_WIN_CHIP_ENTER_MS}ms`,
        "--roulette-win-chip-ring-delay": `${ROULETTE_WIN_CHIP_ENTER_MS + ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS}ms`,
        ...style,
    };
    return (_jsxs("div", { ...props, className: cx("joker-roulette-win-chip", settled && "is-settled", playing && "is-playing", className), style: rootStyle, "data-bet-color": betColor, "aria-hidden": props["aria-hidden"] ?? true, children: [_jsxs("div", { className: "joker-roulette-win-chip__receiver", children: [_jsxs("div", { className: "joker-roulette-win-chip__ring-fx", "aria-hidden": "true", children: [_jsx("div", { className: "joker-roulette-win-chip__active-glow" }), _jsx("div", { className: "joker-roulette-win-chip__active-sweep" })] }), _jsx("div", { className: "joker-roulette-win-chip__icon", "aria-hidden": "true", children: _jsx(RouletteChip, { color: betColor, className: "joker-roulette-win-chip__chip" }) })] }), _jsx(Chip, { variant: "win", className: "joker-roulette-win-chip__multiplier", children: multiplier })] }));
}
