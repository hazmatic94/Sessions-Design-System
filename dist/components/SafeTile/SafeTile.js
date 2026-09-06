import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamiteSrc from "../../../assets/dynamite.webp";
import shieldSrc from "../../../assets/shield.webp";
import { playBombSound, playShieldSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import styles from "./SafeTile.module.css";
const SMOKE_INDEXES = Array.from({ length: 8 }, (_, index) => index);
const PULSE_RING_INDEXES = Array.from({ length: 3 }, (_, index) => index);
const BOMB_TO_SHIELD_DELAY_MS = 500;
const SHIELD_REVEAL_DURATION_MS = 880;
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
function getInitialStage(revealed) {
    return revealed ? "settled" : "hidden";
}
export function SafeTile({ className, revealed: revealedProp, defaultRevealed = true, stackIndex, style, onRevealedChange, onClick, ...props }) {
    const isControlled = revealedProp !== undefined;
    const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
    const isRevealed = isControlled ? revealedProp : internalRevealed;
    const [stage, setStage] = useState(() => getInitialStage(isRevealed));
    const wasRevealedRef = useRef(isRevealed);
    const revealTimersRef = useRef([]);
    const clearRevealTimers = useCallback(() => {
        revealTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
        revealTimersRef.current = [];
    }, []);
    const queueRevealTimer = useCallback((callback, delay) => {
        const timerId = window.setTimeout(callback, delay);
        revealTimersRef.current.push(timerId);
    }, []);
    const setRevealed = useCallback((next) => {
        if (!isControlled) {
            setInternalRevealed(next);
        }
        onRevealedChange?.(next);
    }, [isControlled, onRevealedChange]);
    const triggerReveal = useCallback(() => {
        clearRevealTimers();
        playBombSound();
        setStage("bomb");
        queueRevealTimer(() => {
            playShieldSound();
            setStage("shield");
        }, BOMB_TO_SHIELD_DELAY_MS);
        queueRevealTimer(() => {
            setStage("settled");
        }, BOMB_TO_SHIELD_DELAY_MS + SHIELD_REVEAL_DURATION_MS);
    }, [clearRevealTimers, queueRevealTimer]);
    useEffect(() => {
        if (isRevealed && !wasRevealedRef.current) {
            triggerReveal();
        }
        else if (!isRevealed && wasRevealedRef.current) {
            clearRevealTimers();
            setStage("hidden");
        }
        wasRevealedRef.current = isRevealed;
    }, [clearRevealTimers, isRevealed, triggerReveal]);
    useEffect(() => () => clearRevealTimers(), [clearRevealTimers]);
    const handleClick = (event) => {
        if (stage === "hidden") {
            setRevealed(true);
        }
        onClick?.(event);
    };
    const isBombStage = stage === "bomb";
    const isShieldStage = stage === "shield";
    const isSettled = stage === "settled";
    const isAnimating = isBombStage || isShieldStage;
    const showBomb = isBombStage || isShieldStage || isSettled;
    const showShield = isShieldStage || isSettled;
    const showOverlay = isShieldStage || isSettled;
    const isOpened = isSettled;
    return (_jsxs("div", { ...props, onClick: handleClick, style: mergeTileStackStyle(stackIndex, style), className: cx(styles.root, "joker-safe-tile", isSettled && styles.settled, isSettled && "joker-safe-tile--settled", stage !== "hidden" && styles.revealed, stage !== "hidden" && "joker-safe-tile--revealed", isBombStage && styles.isBombRevealing, isBombStage && "joker-safe-tile--bomb-revealing", isShieldStage && styles.isShieldRevealing, isShieldStage && "joker-safe-tile--shield-revealing", isAnimating && styles.isRevealing, isAnimating && "joker-safe-tile--revealing", isOpened && styles.opened, isOpened && "joker-safe-tile--opened", stage === "hidden" && styles.unrevealed, className), role: stage === "hidden" ? "button" : props.role, tabIndex: stage === "hidden" ? 0 : props.tabIndex, "aria-hidden": props["aria-hidden"] ?? (stage === "hidden" ? undefined : true), onKeyDown: (event) => {
            if (stage === "hidden" && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                setRevealed(true);
            }
            props.onKeyDown?.(event);
        }, children: [isBombStage ? (_jsx("span", { className: cx(styles.smoke, "joker-safe-tile-smoke"), "aria-hidden": "true", children: SMOKE_INDEXES.map((index) => (_jsx("span", { className: cx(styles.smokePuff, "joker-safe-tile-smoke-puff") }, index))) })) : null, showBomb ? (_jsx("img", { className: cx(styles.bombIcon, "joker-safe-tile-bomb-icon", isBombStage && styles.bombIconRevealing, isBombStage && "joker-safe-tile-bomb-icon--revealing", (isShieldStage || isSettled) && styles.bombIconSettled, (isShieldStage || isSettled) && "joker-safe-tile-bomb-icon--settled"), src: dynamiteSrc, alt: "" })) : null, isShieldStage ? (_jsxs(_Fragment, { children: [_jsx("span", { className: cx(styles.glow, "joker-safe-tile-glow"), "aria-hidden": "true" }), _jsx("span", { className: cx(styles.pulses, "joker-safe-tile-pulses"), "aria-hidden": "true", children: PULSE_RING_INDEXES.map((index) => (_jsx("span", { className: cx(styles.pulseRing, "joker-safe-tile-pulse-ring") }, index))) })] })) : null, _jsx("span", { className: cx(styles.overlay, "joker-safe-tile-overlay", showOverlay && styles.overlayVisible, showOverlay && "joker-safe-tile-overlay--visible"), "aria-hidden": "true" }), showShield ? (_jsx("img", { className: cx(styles.shieldIcon, "joker-safe-tile-icon", isSettled && styles.shieldIconVisible, isSettled && "joker-safe-tile-icon--revealed", isShieldStage && styles.shieldIconRevealing, isShieldStage && "joker-safe-tile-icon--revealing"), src: shieldSrc, alt: "" })) : null] }));
}
