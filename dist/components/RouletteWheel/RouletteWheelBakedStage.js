import { jsx as _jsx } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from "react";
import { applyRouletteWheelSpinFrame } from "../../utils/rouletteWheelImperativeFrame";
import { assembleRouletteWheelBakedStage, } from "./rouletteWheelBakedAssembly";
import { ROULETTE_WHEEL_BAKED_SVG } from "./rouletteWheelBakedSvg";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
/** Lightweight wheel stage — one baked SVG split into spin layers (no procedural PocketRing). */
export function RouletteWheelBakedStage({ wheelRotation = 0, ballPosition, ballBounceScale = 1, ballBounceLift = 0, showBall = false, className, style, }) {
    const hostRef = useRef(null);
    const assemblyRef = useRef(null);
    if (ballPosition == null) {
        throw new Error("RouletteWheelBakedStage requires `ballPosition`.");
    }
    useLayoutEffect(() => {
        const host = hostRef.current;
        if (!host) {
            return;
        }
        if (!assemblyRef.current) {
            const assembly = assembleRouletteWheelBakedStage(ROULETTE_WHEEL_BAKED_SVG, host);
            if (!assembly) {
                return;
            }
            assemblyRef.current = assembly;
        }
        const wheelRoot = host.closest(".joker-roulette-wheel");
        if (!wheelRoot) {
            return;
        }
        applyRouletteWheelSpinFrame(wheelRoot, {
            wheelRotation,
            ballPosition,
            ballBounceScale,
            ballBounceLift,
        });
        const ball = wheelRoot.querySelector(".joker-roulette-wheel__ball");
        if (ball) {
            ball.style.visibility = showBall ? "visible" : "hidden";
        }
    }, [wheelRotation, ballPosition, ballBounceScale, ballBounceLift, showBall]);
    return _jsx("div", { ref: hostRef, className: cx("joker-roulette-wheel__stage", className), style: style });
}
