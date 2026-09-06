import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { playCoinReceiverLossSound, playCoinReceiverWinSound } from "../../utils/coinReceiverSounds.js";
import { resetCoinReceiverSplit, setCoinReceiverSplitResting, } from "../../utils/coinReceiverSplit.js";
import { COIN_RECEIVER_LOCK_TIMING, COIN_RECEIVER_LOSS_TIMING, getCoinReceiverLockTotalMs, getCoinReceiverLossSettleAtMs, getCoinReceiverLossTotalMs, getCoinReceiverSealAtMs, } from "./coinReceiverLock.js";
import { CoinReceiverCoinCrack } from "./CoinReceiverCoinCrack.js";
import { CoinReceiverEmblem } from "./CoinReceiverEmblem.js";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CoinReceiver({ size = 88, state = "inactive", locking = false, onLockComplete, onLockPhaseChange, losing = false, onLossComplete, onLossPhaseChange, soundEnabled = true, className, style, children, ...props }) {
    const [lockPhase, setLockPhase] = useState("idle");
    const [lossPhase, setLossPhase] = useState("idle");
    const completedLockRef = useRef(false);
    const completedLossRef = useRef(false);
    const mountRef = useRef(null);
    const onLockCompleteRef = useRef(onLockComplete);
    const onLockPhaseChangeRef = useRef(onLockPhaseChange);
    const onLossCompleteRef = useRef(onLossComplete);
    const onLossPhaseChangeRef = useRef(onLossPhaseChange);
    useEffect(() => {
        onLockCompleteRef.current = onLockComplete;
    }, [onLockComplete]);
    useEffect(() => {
        onLockPhaseChangeRef.current = onLockPhaseChange;
    }, [onLockPhaseChange]);
    useEffect(() => {
        onLossCompleteRef.current = onLossComplete;
    }, [onLossComplete]);
    useEffect(() => {
        onLossPhaseChangeRef.current = onLossPhaseChange;
    }, [onLossPhaseChange]);
    useEffect(() => {
        onLockPhaseChangeRef.current?.(lockPhase);
    }, [lockPhase]);
    useEffect(() => {
        onLossPhaseChangeRef.current?.(lossPhase);
    }, [lossPhase]);
    useEffect(() => {
        if (!locking) {
            if (state !== "completed" && lockPhase !== "sealed") {
                setLockPhase("idle");
                completedLockRef.current = false;
            }
            return;
        }
        if (completedLockRef.current) {
            return;
        }
        setLockPhase("chipRising");
        const clinkTimer = window.setTimeout(() => {
            if (soundEnabled) {
                playCoinReceiverWinSound();
            }
        }, COIN_RECEIVER_LOCK_TIMING.clinkAtMs);
        const celebrateTimer = window.setTimeout(() => {
            setLockPhase("celebrating");
        }, getCoinReceiverSealAtMs());
        const sealedTimer = window.setTimeout(() => {
            setLockPhase("sealed");
            completedLockRef.current = true;
            onLockCompleteRef.current?.();
        }, getCoinReceiverLockTotalMs());
        return () => {
            window.clearTimeout(clinkTimer);
            window.clearTimeout(celebrateTimer);
            window.clearTimeout(sealedTimer);
        };
    }, [locking, state, soundEnabled]);
    useEffect(() => {
        if (!losing) {
            if (state !== "loss" && lossPhase !== "sealed") {
                setLossPhase("idle");
                completedLossRef.current = false;
            }
            return;
        }
        if (completedLossRef.current) {
            return;
        }
        setLossPhase("pressing");
        if (soundEnabled) {
            playCoinReceiverLossSound();
        }
        const flashTimer = window.setTimeout(() => {
            setLossPhase("flashing");
        }, COIN_RECEIVER_LOSS_TIMING.pressMs);
        const splitTimer = window.setTimeout(() => {
            setLossPhase("splitting");
        }, COIN_RECEIVER_LOSS_TIMING.pressMs + COIN_RECEIVER_LOSS_TIMING.flashMs);
        const charcoalTimer = window.setTimeout(() => {
            setLossPhase("charcoal");
        }, COIN_RECEIVER_LOSS_TIMING.pressMs +
            COIN_RECEIVER_LOSS_TIMING.flashMs +
            COIN_RECEIVER_LOSS_TIMING.dustMs);
        const settleTimer = window.setTimeout(() => {
            setLossPhase("settling");
        }, getCoinReceiverLossSettleAtMs());
        const sealedTimer = window.setTimeout(() => {
            setLossPhase("sealed");
            completedLossRef.current = true;
            onLossCompleteRef.current?.();
        }, getCoinReceiverLossTotalMs());
        return () => {
            window.clearTimeout(flashTimer);
            window.clearTimeout(splitTimer);
            window.clearTimeout(charcoalTimer);
            window.clearTimeout(settleTimer);
            window.clearTimeout(sealedTimer);
        };
    }, [losing, state, soundEnabled]);
    useEffect(() => {
        if (!losing && lossPhase === "idle" && state !== "loss") {
            resetCoinReceiverSplit(mountRef.current);
        }
    }, [losing, lossPhase, state]);
    useEffect(() => {
        if (state === "loss" && !losing && lossPhase === "idle") {
            setCoinReceiverSplitResting(mountRef.current);
        }
    }, [state, losing, lossPhase, children]);
    const receiverStyle = {
        ...style,
        "--coin-receiver-size": `${size}px`,
        "--coin-progression-chip-rise-duration": `${COIN_RECEIVER_LOCK_TIMING.chipRiseMs}ms`,
        "--coin-receiver-loss-press-ms": `${COIN_RECEIVER_LOSS_TIMING.pressMs}ms`,
        "--coin-receiver-loss-flash-ms": `${COIN_RECEIVER_LOSS_TIMING.flashMs}ms`,
        "--coin-receiver-loss-dust-ms": `${COIN_RECEIVER_LOSS_TIMING.dustMs}ms`,
        "--coin-receiver-loss-charcoal-ms": `${COIN_RECEIVER_LOSS_TIMING.charcoalMs}ms`,
        "--coin-receiver-loss-settle-ms": `${COIN_RECEIVER_LOSS_TIMING.settleMs}ms`,
    };
    const isWinSealed = state === "completed" || lockPhase === "celebrating" || lockPhase === "sealed";
    const isCelebrating = lockPhase === "celebrating";
    const isLossSealed = state === "loss" || lossPhase === "sealed";
    const isLossAnimating = lossPhase !== "idle" && lossPhase !== "sealed";
    const isLossBehindBowl = lossPhase === "charcoal" || lossPhase === "settling";
    const isLossRim = lossPhase === "pressing" ||
        lossPhase === "flashing" ||
        lossPhase === "splitting" ||
        lossPhase === "charcoal" ||
        lossPhase === "settling" ||
        lossPhase === "sealed" ||
        state === "loss";
    const isCoinSplit = lossPhase === "splitting" ||
        lossPhase === "charcoal" ||
        lossPhase === "settling" ||
        lossPhase === "sealed" ||
        state === "loss";
    return (_jsxs("div", { ...props, className: cx("joker-coin-receiver", state === "active" && "is-active", state === "completed" && "is-completed", state === "inactive" && "is-inactive", state === "loss" && "is-loss", isWinSealed && "is-sealed", isLossSealed && "is-loss-sealed", isCelebrating && "is-celebrating", locking && "is-locking", lockPhase === "chipRising" && "is-chip-rising", losing && "is-losing", lossPhase === "pressing" && "is-loss-pressing", lossPhase === "flashing" && "is-loss-flashing", lossPhase === "splitting" && "is-loss-splitting", lossPhase === "charcoal" && "is-loss-charcoal", lossPhase === "settling" && "is-loss-settling", isLossBehindBowl && "is-loss-behind-bowl", isLossRim && "is-loss-rim", isCoinSplit && "is-loss-split", isLossAnimating && "is-loss-animating", className), style: receiverStyle, children: [_jsxs("div", { className: "joker-coin-receiver__surface", "aria-hidden": "true", children: [_jsxs("div", { className: "joker-coin-receiver__active-fx", "aria-hidden": "true", children: [_jsx("div", { className: "joker-coin-receiver__active-glow" }), _jsx("div", { className: "joker-coin-receiver__active-sweep" }), _jsxs("div", { className: "joker-coin-receiver__active-shimmer", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })] }), _jsxs("div", { className: "joker-coin-receiver__bowl", children: [_jsx("div", { className: "joker-coin-receiver__base", children: _jsx(CoinReceiverEmblem, { className: "joker-coin-receiver__emblem" }) }), _jsx("div", { className: "joker-coin-receiver__loss-dent", "aria-hidden": "true" }), _jsx("div", { className: "joker-coin-receiver__sealed-ring" })] }), _jsxs("div", { className: "joker-coin-receiver__celebrate-fx", "aria-hidden": "true", children: [_jsxs("div", { className: "joker-coin-receiver__celebrate-burst", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsxs("div", { className: "joker-coin-receiver__celebrate-dust", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })] }), _jsxs("div", { className: "joker-coin-receiver__loss-fx", "aria-hidden": "true", children: [_jsx("div", { className: "joker-coin-receiver__loss-flash" }), _jsxs("div", { className: "joker-coin-receiver__loss-smoke", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsxs("div", { className: "joker-coin-receiver__loss-embers", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] })] })] }), _jsx("div", { className: "joker-coin-receiver__mount", ref: mountRef, children: _jsxs("div", { className: "joker-coin-receiver__coin-wrap", children: [_jsx("div", { className: "joker-coin-receiver__coin-intact", children: children }), _jsx(CoinReceiverCoinCrack, {}), _jsxs("div", { className: "joker-coin-receiver__loss-dust", "aria-hidden": "true", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {})] }), _jsxs("div", { className: "joker-coin-receiver__coin-split", "aria-hidden": "true", children: [_jsx("div", { className: "joker-coin-receiver__coin-half joker-coin-receiver__coin-half--left" }), _jsx("div", { className: "joker-coin-receiver__coin-half joker-coin-receiver__coin-half--right" })] })] }) })] }));
}
