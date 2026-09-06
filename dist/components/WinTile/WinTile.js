import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Chip } from "../Chip/index.js";
import goldBarsSrc from "../../../assets/goldBars.webp";
import { playMineGoldSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import styles from "./WinTile.module.css";
const PARTICLE_INDEXES = Array.from({ length: 10 }, (_, index) => index);
const REVEAL_DURATION_MS = 720;
const CHIP_ENTER_MS = 220;
const CHIP_VISIBLE_MS = 1200;
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function WinTile({ className, revealed: revealedProp, defaultRevealed = true, multiplier, soundOnReveal = true, stackIndex, style, onRevealedChange, onClick, ...props }) {
    const isControlled = revealedProp !== undefined;
    const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
    const isRevealed = isControlled ? revealedProp : internalRevealed;
    const [isRevealing, setIsRevealing] = useState(false);
    const [chipPhase, setChipPhase] = useState("hidden");
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
        if (soundOnReveal) {
            playMineGoldSound();
        }
        setIsRevealing(true);
        queueRevealTimer(() => setIsRevealing(false), REVEAL_DURATION_MS);
        if (multiplier == null || multiplier === "") {
            setChipPhase("hidden");
            return;
        }
        setChipPhase("entering");
        queueRevealTimer(() => setChipPhase("visible"), CHIP_ENTER_MS);
        queueRevealTimer(() => setChipPhase("hidden"), CHIP_ENTER_MS + CHIP_VISIBLE_MS);
    }, [clearRevealTimers, multiplier, queueRevealTimer, soundOnReveal]);
    useEffect(() => {
        if (isRevealed && !wasRevealedRef.current) {
            triggerReveal();
        }
        wasRevealedRef.current = isRevealed;
    }, [isRevealed, triggerReveal]);
    useEffect(() => clearRevealTimers, [clearRevealTimers]);
    const handleClick = (event) => {
        if (!isRevealed) {
            setRevealed(true);
        }
        onClick?.(event);
    };
    const showMultiplier = chipPhase !== "hidden" && multiplier != null && multiplier !== "";
    const isOpened = isRevealed && !isRevealing && chipPhase === "hidden";
    return (_jsxs("div", { ...props, onClick: handleClick, style: mergeTileStackStyle(stackIndex, style), className: cx(styles.root, "joker-win-tile", isRevealed && styles.revealed, isRevealed && "joker-win-tile--revealed", isRevealing && styles.isRevealing, isRevealing && "joker-win-tile--revealing", showMultiplier && styles.hasMultiplier, showMultiplier && "joker-win-tile--has-multiplier", isOpened && styles.opened, isOpened && "joker-win-tile--opened", !isRevealed && styles.unrevealed, className), role: !isRevealed ? "button" : props.role, tabIndex: !isRevealed ? 0 : props.tabIndex, "aria-hidden": props["aria-hidden"] ?? (isRevealed ? true : undefined), onKeyDown: (event) => {
            if (!isRevealed && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                setRevealed(true);
            }
            props.onKeyDown?.(event);
        }, children: [isRevealing ? (_jsx("span", { className: cx(styles.particles, "joker-win-tile-particles"), "aria-hidden": "true", children: PARTICLE_INDEXES.map((index) => (_jsx("span", { className: cx(styles.particle, "joker-win-tile-particle") }, index))) })) : null, _jsx("img", { className: cx(styles.icon, "joker-win-tile-icon", isRevealed && styles.iconRevealed, isRevealing && styles.iconRevealing), src: goldBarsSrc, alt: "" }), showMultiplier ? (_jsx(Chip, { variant: "win", className: cx(styles.multiplier, "joker-win-tile-multiplier", chipPhase === "entering" && styles.multiplierEntering, chipPhase === "entering" && "joker-win-tile-multiplier--entering", chipPhase === "visible" && styles.multiplierVisible, chipPhase === "visible" && "joker-win-tile-multiplier--visible"), children: multiplier })) : null] }));
}
