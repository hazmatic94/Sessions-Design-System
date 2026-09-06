import { jsx as _jsx } from "react/jsx-runtime";
import { ROULETTE_WHEEL_NATIVE_WIDTH, rouletteWheelPointerBleedPx } from "./rouletteWheelPaths";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
/** Crop container — wheel stays top-center inside the area below the 40px animation inset. */
export function RouletteWheelViewport({ wheelSize = ROULETTE_WHEEL_NATIVE_WIDTH, offsetY, className, style, children, ...props }) {
    const pointerBleed = rouletteWheelPointerBleedPx(wheelSize);
    const slotOffsetY = offsetY ?? 0;
    const viewportStyle = {
        "--roulette-wheel-size": `${wheelSize}px`,
        "--roulette-wheel-viewport-pointer-bleed": `${pointerBleed}px`,
        "--roulette-wheel-viewport-offset-y": `${slotOffsetY}px`,
        ...style,
    };
    return (_jsx("div", { ...props, className: cx("joker-roulette-wheel-viewport", className), style: viewportStyle, children: _jsx("div", { className: "joker-roulette-wheel-viewport__slot", children: children }) }));
}
