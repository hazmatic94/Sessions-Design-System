import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import dynamiteSrc from "../../../assets/dynamite.webp";
import shieldSrc from "../../../assets/shield.webp";
import { playBombSound, playShieldSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import styles from "./SafeTile.module.css";
import type { SafeTileProps } from "./SafeTile.types";

const SMOKE_INDEXES = Array.from({ length: 8 }, (_, index) => index);
const PULSE_RING_INDEXES = Array.from({ length: 3 }, (_, index) => index);
const BOMB_TO_SHIELD_DELAY_MS = 500;
const SHIELD_REVEAL_DURATION_MS = 880;

type SafeRevealStage = "hidden" | "bomb" | "shield" | "settled";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getInitialStage(revealed: boolean): SafeRevealStage {
  return revealed ? "settled" : "hidden";
}

export function SafeTile({
  className,
  revealed: revealedProp,
  defaultRevealed = true,
  stackIndex,
  style,
  onRevealedChange,
  onClick,
  ...props
}: SafeTileProps) {
  const isControlled = revealedProp !== undefined;
  const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
  const isRevealed = isControlled ? revealedProp : internalRevealed;
  const [stage, setStage] = useState<SafeRevealStage>(() => getInitialStage(isRevealed));
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
    } else if (!isRevealed && wasRevealedRef.current) {
      clearRevealTimers();
      setStage("hidden");
    }
    wasRevealedRef.current = isRevealed;
  }, [clearRevealTimers, isRevealed, triggerReveal]);

  useEffect(() => () => clearRevealTimers(), [clearRevealTimers]);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
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

  return (
    <div
      {...props}
      onClick={handleClick}
      style={mergeTileStackStyle(stackIndex, style)}
      className={cx(
        styles.root,
        "joker-safe-tile",
        isSettled && styles.settled,
        isSettled && "joker-safe-tile--settled",
        stage !== "hidden" && styles.revealed,
        stage !== "hidden" && "joker-safe-tile--revealed",
        isBombStage && styles.isBombRevealing,
        isBombStage && "joker-safe-tile--bomb-revealing",
        isShieldStage && styles.isShieldRevealing,
        isShieldStage && "joker-safe-tile--shield-revealing",
        isAnimating && styles.isRevealing,
        isAnimating && "joker-safe-tile--revealing",
        isOpened && styles.opened,
        isOpened && "joker-safe-tile--opened",
        stage === "hidden" && styles.unrevealed,
        className,
      )}
      role={stage === "hidden" ? "button" : props.role}
      tabIndex={stage === "hidden" ? 0 : props.tabIndex}
      aria-hidden={props["aria-hidden"] ?? (stage === "hidden" ? undefined : true)}
      onKeyDown={(event) => {
        if (stage === "hidden" && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          setRevealed(true);
        }
        props.onKeyDown?.(event);
      }}
    >
      {isBombStage ? (
        <span className={cx(styles.smoke, "joker-safe-tile-smoke")} aria-hidden="true">
          {SMOKE_INDEXES.map((index) => (
            <span key={index} className={cx(styles.smokePuff, "joker-safe-tile-smoke-puff")} />
          ))}
        </span>
      ) : null}
      {showBomb ? (
        <img
          className={cx(
            styles.bombIcon,
            "joker-safe-tile-bomb-icon",
            isBombStage && styles.bombIconRevealing,
            isBombStage && "joker-safe-tile-bomb-icon--revealing",
            (isShieldStage || isSettled) && styles.bombIconSettled,
            (isShieldStage || isSettled) && "joker-safe-tile-bomb-icon--settled",
          )}
          src={dynamiteSrc}
          alt=""
        />
      ) : null}
      {isShieldStage ? (
        <>
          <span className={cx(styles.glow, "joker-safe-tile-glow")} aria-hidden="true" />
          <span className={cx(styles.pulses, "joker-safe-tile-pulses")} aria-hidden="true">
            {PULSE_RING_INDEXES.map((index) => (
              <span key={index} className={cx(styles.pulseRing, "joker-safe-tile-pulse-ring")} />
            ))}
          </span>
        </>
      ) : null}
      <span
        className={cx(
          styles.overlay,
          "joker-safe-tile-overlay",
          showOverlay && styles.overlayVisible,
          showOverlay && "joker-safe-tile-overlay--visible",
        )}
        aria-hidden="true"
      />
      {showShield ? (
        <img
          className={cx(
            styles.shieldIcon,
            "joker-safe-tile-icon",
            isSettled && styles.shieldIconVisible,
            isSettled && "joker-safe-tile-icon--revealed",
            isShieldStage && styles.shieldIconRevealing,
            isShieldStage && "joker-safe-tile-icon--revealing",
          )}
          src={shieldSrc}
          alt=""
        />
      ) : null}
    </div>
  );
}
