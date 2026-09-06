import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { RouletteWinChip } from "../RouletteWinChip/index.js";
export function WinStreakRowChip({ win, chipSize, initialSettled, playDelay, }) {
    const [settled, setSettled] = useState(initialSettled);
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (initialSettled) {
            setSettled(true);
            setActive(false);
            return;
        }
        setSettled(false);
        setActive(false);
        const startTimer = window.setTimeout(() => {
            setActive(true);
        }, playDelay);
        return () => window.clearTimeout(startTimer);
    }, [initialSettled, playDelay, win.betColor, win.multiplier]);
    const handleAnimationComplete = useCallback(() => {
        setActive(false);
        setSettled(true);
    }, []);
    return (_jsx(RouletteWinChip, { active: active, settled: settled, betColor: win.betColor, multiplier: win.multiplier, size: chipSize, onAnimationComplete: handleAnimationComplete }));
}
