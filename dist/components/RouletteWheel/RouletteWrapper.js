import { jsx as _jsx } from "react/jsx-runtime";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
/**
 * Responsive viewport for the fixed-size roulette wheel in the game area slot.
 * Crops the wheel as the wrapper narrows or shortens; the wheel never resizes.
 */
export function RouletteWrapper({ className, children, ...props }) {
    return (_jsx("div", { ...props, className: cx("joker-roulette-wrapper", className), children: _jsx("div", { className: "joker-roulette-wrapper__wheel-slot", children: children }) }));
}
