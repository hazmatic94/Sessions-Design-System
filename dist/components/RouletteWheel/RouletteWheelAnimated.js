import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { Button } from "../Button";
import { RouletteWheel } from "./RouletteWheel";
import { RouletteWheelViewport } from "./RouletteWheelViewport";
import { RouletteWheelArea } from "./RouletteWheelArea";
import { ROULETTE_WHEEL_FILL_CONTAINER_SIZE, ROULETTE_WHEEL_NATIVE_WIDTH } from "./rouletteWheelPaths";
import { RouletteWheelDebugOverlay } from "./RouletteWheelDebugOverlay";
import { useRouletteWheelSpin } from "./useRouletteWheelSpin";
export function RouletteWheelAnimated({ size, spinDurationMs, soundEnabled = true, onSpinComplete, showSpinButton = true, spinButtonLabel = "Spin", showDebugOverlay = false, fillContainer = false, insetTop, className, style, ...props }) {
    const resolvedSize = size ?? (fillContainer ? ROULETTE_WHEEL_FILL_CONTAINER_SIZE : ROULETTE_WHEEL_NATIVE_WIDTH);
    const wheelRootRef = useRef(null);
    const { wheelRotation, ballPosition, ballBounceScale, ballBounceLift, showBall, isSpinning, spinProgress, targetPocket, snapshot, spin, } = useRouletteWheelSpin({
        durationMs: spinDurationMs,
        soundEnabled,
        wheelRootRef,
        onSpinComplete: (result) => onSpinComplete?.(result.targetPocket.value),
    });
    const rootStyle = {
        display: "grid",
        justifyItems: "center",
        gap: "16px",
        ...style,
    };
    const wheel = (_jsx(RouletteWheel, { ...props, ref: wheelRootRef, size: resolvedSize, wheelRotation: wheelRotation, ballPosition: ballPosition, ballBounceScale: ballBounceScale, ballBounceLift: ballBounceLift, showBall: showBall, showDebugVisual: showDebugOverlay, targetPocket: targetPocket, "aria-hidden": props["aria-hidden"] ?? false, performanceMode: fillContainer ? true : props.performanceMode }));
    const controls = (_jsxs(_Fragment, { children: [showDebugOverlay ? (_jsx(RouletteWheelDebugOverlay, { snapshot: snapshot, wheelRotation: wheelRotation, ballPosition: ballPosition, spinProgress: spinProgress })) : null, showSpinButton ? (_jsx(Button, { type: "button", variant: "ghost", onClick: () => spin(), disabled: isSpinning, children: isSpinning ? "Spinning…" : spinButtonLabel })) : null] }));
    if (fillContainer) {
        return (_jsxs(_Fragment, { children: [_jsx(RouletteWheelArea, { insetTop: insetTop, className: className, style: style, children: _jsx(RouletteWheelViewport, { wheelSize: resolvedSize, children: wheel }) }), controls] }));
    }
    return (_jsxs("div", { className: className, style: rootStyle, children: [wheel, controls] }));
}
