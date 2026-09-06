import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../Button/index.js";
import { RouletteChip } from "../RouletteChip/index.js";
function ChevronIcon({ direction }) {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: direction === "up" ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }) }));
}
export function OddsButton({ label = "Lower / Same", odds = "76.39%", direction = "down", sideIcon, fullWidth = true, showOdds = false, showDirection = true, selected = false, selectGlow = false, className, type = "button", ...props }) {
    const isDirectionOnly = !sideIcon && showDirection && !showOdds;
    const isLabelOnly = !sideIcon && !showOdds && !showDirection;
    return (_jsx(Button, { ...props, type: type, variant: "odds", fullWidth: fullWidth, selected: selected, selectGlow: selectGlow, className: [
            sideIcon ? "has-side-icon" : "",
            isLabelOnly ? "is-label-only" : "",
            isDirectionOnly ? "is-direction-only" : "",
            className,
        ]
            .filter(Boolean)
            .join(" ") || undefined, children: sideIcon ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "joker-hi-lo-label", children: label }), sideIcon === "black" || sideIcon === "green" || sideIcon === "red" ? (_jsx(RouletteChip, { color: sideIcon, size: 16, className: `joker-hi-lo-side-icon joker-hi-lo-side-icon--${sideIcon} joker-hi-lo-side-icon--roulette-chip`, "aria-hidden": true })) : (_jsx("span", { className: `joker-hi-lo-side-icon joker-hi-lo-side-icon--${sideIcon}`, "aria-hidden": "true" }))] })) : isDirectionOnly ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "joker-hi-lo-label", children: label }), _jsx("span", { className: direction === "up" ? "joker-hi-lo-chevron is-up" : "joker-hi-lo-chevron", "aria-hidden": "true", children: _jsx(ChevronIcon, { direction: direction }) })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { className: "joker-hi-lo-label", children: label }), showDirection || showOdds ? (_jsxs("span", { className: "joker-hi-lo-odds", children: [showDirection ? (_jsx("span", { className: direction === "up" ? "joker-hi-lo-chevron is-up" : "joker-hi-lo-chevron", "aria-hidden": "true", children: _jsx(ChevronIcon, { direction: direction }) })) : null, showOdds ? _jsx("span", { children: odds }) : null] })) : null] })) }));
}
