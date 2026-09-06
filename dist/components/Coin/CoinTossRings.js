import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { startCoinTossRingAmbient } from "../../utils/coinTossRingParticles.js";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CoinTossRings({ size = 400, coinSizePx = 256, className, style, ...props }) {
    const particlesRef = useRef(null);
    useEffect(() => {
        return startCoinTossRingAmbient(particlesRef.current, size, coinSizePx);
    }, [size, coinSizePx]);
    return (_jsx("div", { ...props, className: cx("joker-coin-toss-rings", className), style: { "--coin-toss-stage-size": `${size}px`, ...style }, "aria-hidden": props["aria-hidden"] ?? true, children: _jsxs("div", { className: "joker-coin-toss-rings__surface", children: [_jsx("div", { className: "joker-coin-toss-rings__pool" }), _jsxs("div", { className: "joker-coin-toss-rings__plane", children: [_jsx("div", { className: "joker-coin-toss-rings__coin-shadow" }), _jsx("div", { className: "joker-coin-toss-rings__ring joker-coin-toss-rings__ring--outer" }), _jsx("div", { className: "joker-coin-toss-rings__ring joker-coin-toss-rings__ring--inner" })] }), _jsx("div", { className: "joker-coin-toss-rings__reflection" }), _jsx("div", { ref: particlesRef, className: "joker-coin-toss-rings__particles" })] }) }));
}
