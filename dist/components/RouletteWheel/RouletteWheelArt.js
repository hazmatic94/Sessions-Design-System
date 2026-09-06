import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RouletteWheelDefs, useRouletteWheelPaintIds } from "./RouletteWheelDefs";
import { mergeRouletteWheelTheme, ROULETTE_WHEEL_GEOMETRY, RouletteWheelProvider, } from "./RouletteWheelContext";
import { Ball } from "./layers/Ball";
import { BallTrack } from "./layers/BallTrack";
import { CenterBowl } from "./layers/CenterBowl";
import { OuterBallTrack } from "./layers/OuterBallTrack";
import { OuterFrame } from "./layers/OuterFrame";
import { PocketRing } from "./layers/PocketRing";
import { PocketRingOutline } from "./layers/PocketRingOutline";
import { Pointer } from "./layers/Pointer";
import { Spindle } from "./layers/Spindle";
import { StaticFrame } from "./layers/StaticFrame";
import { WheelSpinner } from "./layers/WheelSpinner";
import { RouletteWheelDebugVisual } from "./RouletteWheelDebugVisual";
import { rouletteWheelSpinOriginPercent, rouletteWheelViewBoxAttribute, } from "./rouletteWheelPaths";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function DefaultRouletteWheelLayout({ wheelRotation }) {
    return (_jsxs(_Fragment, { children: [_jsxs(StaticFrame, { children: [_jsx(OuterFrame, {}), _jsx(Pointer, {})] }), _jsxs(WheelSpinner, { wheelRotation: wheelRotation, children: [_jsx(PocketRing, {}), _jsx(BallTrack, {}), _jsx(PocketRingOutline, {}), _jsx(CenterBowl, {}), _jsx(Spindle, {}), _jsx(RouletteWheelDebugVisual, {})] }), _jsx("svg", { className: "joker-roulette-wheel__svg joker-roulette-wheel__svg--outer-track", viewBox: rouletteWheelViewBoxAttribute(), fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", children: _jsx(OuterBallTrack, {}) }), _jsx(Ball, {})] }));
}
export function RouletteWheelStage({ wheelRotation = 0, ballPosition, ballBounceScale = 1, ballBounceLift = 0, showBall = false, showDebugVisual = false, targetPocket = null, theme, children, className, style, }) {
    const paintIds = useRouletteWheelPaintIds();
    const resolvedTheme = mergeRouletteWheelTheme(theme);
    const spinOrigin = rouletteWheelSpinOriginPercent();
    if (ballPosition == null) {
        throw new Error("RouletteWheelStage requires `ballPosition`.");
    }
    const stageStyle = {
        "--roulette-spin-origin-x": spinOrigin.left,
        "--roulette-spin-origin-y": spinOrigin.top,
        ...style,
    };
    return (_jsxs("div", { className: cx("joker-roulette-wheel__stage", className), style: stageStyle, children: [_jsx("svg", { className: "joker-roulette-wheel__defs", "aria-hidden": "true", focusable: "false", children: _jsx(RouletteWheelDefs, { ids: paintIds, theme: theme }) }), _jsx(RouletteWheelProvider, { value: {
                    paintIds,
                    geometry: ROULETTE_WHEEL_GEOMETRY,
                    theme: resolvedTheme,
                    wheelRotation,
                    ballPosition,
                    ballBounceScale,
                    ballBounceLift,
                    showBall,
                    showDebugVisual,
                    targetPocket,
                }, children: children ?? _jsx(DefaultRouletteWheelLayout, { wheelRotation: wheelRotation }) })] }));
}
/** @deprecated Use `RouletteWheelStage` */
export const RouletteWheelArt = RouletteWheelStage;
export { WheelSpinner, Rotor } from "./layers/WheelSpinner";
export function RouletteWheelAssembly({ children, wheelRotation = 0, }) {
    return children ?? _jsx(DefaultRouletteWheelLayout, { wheelRotation: wheelRotation });
}
