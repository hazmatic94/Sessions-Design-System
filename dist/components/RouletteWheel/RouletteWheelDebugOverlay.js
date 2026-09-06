import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LANDING_SLOT, getVisiblePockets } from "./rouletteWheelLayout";
export function RouletteWheelDebugOverlay({ snapshot, wheelRotation = 0, ballPosition = null, spinProgress = 0, className, }) {
    if (snapshot == null) {
        return null;
    }
    const { targetPocket, finalWheelRotation, highlightedPocket, displayedResult, ballLandingPocket, } = snapshot;
    const visiblePockets = getVisiblePockets(targetPocket);
    const centreVisiblePocket = visiblePockets[LANDING_SLOT];
    if (typeof process !== "undefined" && process?.env?.NODE_ENV !== "production") {
        console.assert(centreVisiblePocket.value === targetPocket.value &&
            targetPocket.value === highlightedPocket.value &&
            highlightedPocket.value === ballLandingPocket.value &&
            (displayedResult == null || ballLandingPocket.value === displayedResult), "Fixed roulette landing values do not match");
    }
    const { labelPosition, ballPosition: pocketBallPosition } = targetPocket;
    return (_jsxs("div", { className: className, style: {
            margin: 0,
            padding: "10px 12px",
            borderRadius: "8px",
            background: "color-mix(in srgb, var(--joker-black-900) 82%, transparent)",
            border: "1px solid color-mix(in srgb, var(--joker-gold-400) 35%, transparent)",
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "11px",
            lineHeight: 1.5,
            color: "var(--joker-gold-300)",
            textAlign: "left",
            width: "min(100%, var(--roulette-wheel-size, 400px))",
        }, "aria-live": "polite", children: [_jsx("div", { style: { fontWeight: 600, marginBottom: "6px", color: "var(--joker-gold-400)" }, children: "Roulette debug" }), _jsxs("div", { children: ["targetPocket.value: ", targetPocket.value] }), _jsxs("div", { children: ["targetPocket.index: ", targetPocket.index] }), _jsxs("div", { children: ["visiblePockets: [", visiblePockets.map((pocket) => pocket.value).join(", "), "]"] }), _jsxs("div", { children: ["centreVisiblePocket.value: ", centreVisiblePocket.value] }), _jsxs("div", { children: ["landingSlot: ", LANDING_SLOT] }), _jsxs("div", { children: ["displayedResult: ", displayedResult ?? "—"] }), _jsxs("div", { children: ["highlightedPocket.value: ", highlightedPocket.value] }), _jsxs("div", { children: ["ballLandingPocket.value: ", ballLandingPocket.value] }), _jsxs("div", { children: ["spinProgress: ", (spinProgress * 100).toFixed(1), "%"] }), _jsxs("div", { children: ["targetPocket.centerAngle: ", targetPocket.centerAngle.toFixed(2), "\u00B0"] }), _jsxs("div", { children: ["targetPocket.labelPosition: ", labelPosition.x.toFixed(1), ", ", labelPosition.y.toFixed(1)] }), _jsxs("div", { children: ["targetPocket.ballPosition: ", pocketBallPosition.x.toFixed(1), ", ", pocketBallPosition.y.toFixed(1)] }), _jsxs("div", { children: ["wheelRotation: ", wheelRotation.toFixed(2), "\u00B0"] }), _jsxs("div", { children: ["finalWheelRotation: ", finalWheelRotation.toFixed(2), "\u00B0"] }), ballPosition ? (_jsxs("div", { children: ["ballPosition (stage): ", ballPosition.x.toFixed(1), ", ", ballPosition.y.toFixed(1)] })) : null] }));
}
