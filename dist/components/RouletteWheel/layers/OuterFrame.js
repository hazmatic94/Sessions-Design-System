import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import { buildAnnulusPath } from "../rouletteWheelPocketGeometry";
/** Static outer frame — never rotates. */
export function OuterFrame() {
    const { paintIds, geometry } = useRouletteWheelContext();
    const { x: cx, y: cy } = geometry.center;
    const outerR = geometry.frameOuterRadius;
    const rimWidth = 22;
    return (_jsxs("g", { className: "joker-roulette-wheel__outer-frame", children: [_jsx("ellipse", { cx: cx, cy: cy, rx: outerR + 5, ry: outerR + 5, fill: RW.rimShadow, opacity: "0.38" }), _jsx("circle", { cx: cx, cy: cy, r: outerR + 2, fill: RW.rimBaseOuter }), _jsx("circle", { cx: cx, cy: cy, r: outerR, fill: RW.rimBaseInner }), _jsx("circle", { cx: cx, cy: cy, r: outerR - rimWidth / 2, fill: "none", stroke: `url(#${paintIds.rimGold})`, strokeWidth: rimWidth }), _jsx("circle", { cx: cx, cy: cy, r: outerR - rimWidth / 2, fill: "none", stroke: `url(#${paintIds.brushedGold})`, strokeWidth: rimWidth - 5, opacity: "0.22" }), _jsx("circle", { cx: cx, cy: cy, r: outerR - 0.75, fill: "none", stroke: `url(#${paintIds.rimEdge})`, strokeWidth: "1.8" }), _jsx("circle", { cx: cx, cy: cy, r: outerR - rimWidth + 0.75, fill: "none", stroke: RW.black, strokeWidth: "1.6", opacity: "0.55" }), _jsx("circle", { cx: cx, cy: cy, r: outerR - 2, fill: `url(#${paintIds.rimSpecular})`, opacity: "0.7", style: { mixBlendMode: "screen" } }), _jsx("path", { d: buildAnnulusPath(cx, cy, outerR - rimWidth - 6, outerR - rimWidth + 2), fill: RW.black, opacity: "0.5" })] }));
}
/** @deprecated Use `OuterFrame` */
export const OuterRim = OuterFrame;
