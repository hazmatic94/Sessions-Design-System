import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import { buildAnnulusPath } from "../rouletteWheelPocketGeometry";
/** Thin inner transition lip between pocket wells and center bowl. */
export function BallTrack() {
    const { geometry } = useRouletteWheelContext();
    const { x: bowlX, y: bowlY } = geometry.bowlCenter;
    const trackR = geometry.ballTrackRadius;
    const lipInner = trackR - 18;
    const lipOuter = trackR - 10;
    return (_jsxs("g", { className: "joker-roulette-wheel__ball-track", children: [_jsx("path", { d: buildAnnulusPath(bowlX, bowlY, lipInner, lipOuter), fill: RW.black, opacity: "0.38" }), _jsx("circle", { cx: bowlX, cy: bowlY, r: lipOuter, fill: "none", stroke: RW.trackInnerHighlight, strokeWidth: "0.7", opacity: "0.45" })] }));
}
