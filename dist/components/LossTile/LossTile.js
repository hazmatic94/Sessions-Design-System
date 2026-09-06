import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamiteSrc from "../../../assets/dynamite.webp";
import { playBombSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import styles from "./LossTile.module.css";
const SMOKE_INDEXES = Array.from({ length: 8 }, (_, index) => index);
const REVEAL_DURATION_MS = 720;
const SMOKE_DURATION_MS = 920;
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function LossTile({ className, revealed: revealedProp, defaultRevealed = true, soundOnReveal = true, stackIndex, style, onRevealedChange, onClick, ...props }) {
    const isControlled = revealedProp !== undefined;
    const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
    const isRevealed = isControlled ? revealedProp : internalRevealed;
    const [isRevealing, setIsRevealing] = useState(false);
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
            playBombSound();
        }
        setIsRevealing(true);
        queueRevealTimer(() => setIsRevealing(false), SMOKE_DURATION_MS);
    }, [clearRevealTimers, queueRevealTimer, soundOnReveal]);
    useEffect(() => {
        if (isRevealed && !wasRevealedRef.current) {
            triggerReveal();
        }
        wasRevealedRef.current = isRevealed;
    }, [isRevealed, triggerReveal]);
    useEffect(() => () => clearRevealTimers(), [clearRevealTimers]);
    const handleClick = (event) => {
        if (!isRevealed) {
            setRevealed(true);
        }
        onClick?.(event);
    };
    return (_jsxs("div", { ...props, onClick: handleClick, style: mergeTileStackStyle(stackIndex, style), className: cx(styles.root, "joker-loss-tile", isRevealed && styles.revealed, isRevealed && "joker-loss-tile--revealed", isRevealing && styles.isRevealing, isRevealing && "joker-loss-tile--revealing", !isRevealed && styles.unrevealed, className), role: !isRevealed ? "button" : props.role, tabIndex: !isRevealed ? 0 : props.tabIndex, "aria-hidden": props["aria-hidden"] ?? (isRevealed ? true : undefined), onKeyDown: (event) => {
            if (!isRevealed && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                setRevealed(true);
            }
            props.onKeyDown?.(event);
        }, children: [isRevealing ? (_jsx("span", { className: cx(styles.smoke, "joker-loss-tile-smoke"), "aria-hidden": "true", children: SMOKE_INDEXES.map((index) => (_jsx("span", { className: cx(styles.smokePuff, "joker-loss-tile-smoke-puff") }, index))) })) : null, _jsx("img", { className: cx(styles.icon, "joker-loss-tile-icon", isRevealed && styles.iconRevealed, isRevealing && styles.iconRevealing), src: dynamiteSrc, alt: "" })] }));
}
