import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import dynamiteSrc from "../../../assets/dynamite.webp";
import { playBombSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import styles from "./LossTile.module.css";
import type { LossTileProps } from "./LossTile.types";

const SMOKE_INDEXES = Array.from({ length: 8 }, (_, index) => index);
const REVEAL_DURATION_MS = 720;
const SMOKE_DURATION_MS = 920;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LossTile({
  className,
  revealed: revealedProp,
  defaultRevealed = true,
  soundOnReveal = true,
  stackIndex,
  style,
  onRevealedChange,
  onClick,
  ...props
}: LossTileProps) {
  const isControlled = revealedProp !== undefined;
  const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
  const isRevealed = isControlled ? revealedProp : internalRevealed;
  const [isRevealing, setIsRevealing] = useState(false);
  const wasRevealedRef = useRef(isRevealed);
  const revealTimersRef = useRef<number[]>([]);

  const clearRevealTimers = useCallback(() => {
    revealTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    revealTimersRef.current = [];
  }, []);

  const queueRevealTimer = useCallback((callback: () => void, delay: number) => {
    const timerId = window.setTimeout(callback, delay);
    revealTimersRef.current.push(timerId);
  }, []);

  const setRevealed = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalRevealed(next);
      }
      onRevealedChange?.(next);
    },
    [isControlled, onRevealedChange],
  );

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

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!isRevealed) {
      setRevealed(true);
    }
    onClick?.(event);
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      style={mergeTileStackStyle(stackIndex, style)}
      className={cx(
        styles.root,
        "joker-loss-tile",
        isRevealed && styles.revealed,
        isRevealed && "joker-loss-tile--revealed",
        isRevealing && styles.isRevealing,
        isRevealing && "joker-loss-tile--revealing",
        !isRevealed && styles.unrevealed,
        className,
      )}
      role={!isRevealed ? "button" : props.role}
      tabIndex={!isRevealed ? 0 : props.tabIndex}
      aria-hidden={props["aria-hidden"] ?? (isRevealed ? true : undefined)}
      onKeyDown={(event) => {
        if (!isRevealed && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          setRevealed(true);
        }
        props.onKeyDown?.(event);
      }}
    >
      {isRevealing ? (
        <span className={cx(styles.smoke, "joker-loss-tile-smoke")} aria-hidden="true">
          {SMOKE_INDEXES.map((index) => (
            <span key={index} className={cx(styles.smokePuff, "joker-loss-tile-smoke-puff")} />
          ))}
        </span>
      ) : null}
      <img
        className={cx(
          styles.icon,
          "joker-loss-tile-icon",
          isRevealed && styles.iconRevealed,
          isRevealing && styles.iconRevealing,
        )}
        src={dynamiteSrc}
        alt=""
      />
    </div>
  );
}
