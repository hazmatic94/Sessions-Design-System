import { jsx as _jsx } from "react/jsx-runtime";
import { ROULETTE_WHEEL_VIEWPORT_AREA_INSET_TOP } from "./rouletteWheelPaths";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
/** Fills the parent box — 40px top inset, wheel cropped top-center below it. */
export function RouletteWheelArea({ insetTop = ROULETTE_WHEEL_VIEWPORT_AREA_INSET_TOP, className, style, children, ...props }) {
    const areaStyle = {
        "--roulette-wheel-viewport-area-inset-top": `${insetTop}px`,
        ...style,
    };
    return (_jsx("div", { ...props, className: cx("joker-roulette-wheel-area", className), style: areaStyle, children: children }));
}
