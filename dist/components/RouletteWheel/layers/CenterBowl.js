import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouletteWheelContext } from "../RouletteWheelContext";
export function CenterBowl() {
    const { paintIds, geometry } = useRouletteWheelContext();
    const { x: bowlX, y: bowlY } = geometry.bowlCenter;
    const bowlR = geometry.bowlRadius;
    return (_jsxs("g", { className: "joker-roulette-wheel__center-bowl", children: [_jsx("circle", { cx: bowlX, cy: bowlY, r: bowlR, fill: `url(#${paintIds.bowlFill})` }), _jsx("circle", { cx: bowlX, cy: bowlY, r: bowlR - 1, fill: "none", stroke: "rgba(255,255,255,0.06)", strokeWidth: "1.6" })] }));
}
