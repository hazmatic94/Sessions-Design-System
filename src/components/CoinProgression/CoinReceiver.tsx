import { useEffect, useRef, useState, type CSSProperties } from "react";
import { playCoinReceiverLossSound, playCoinReceiverWinSound } from "../../utils/coinReceiverSounds.js";
import {
  resetCoinReceiverSplit,
  setCoinReceiverSplitResting,
} from "../../utils/coinReceiverSplit.js";
import {
  COIN_RECEIVER_LOCK_TIMING,
  COIN_RECEIVER_LOSS_TIMING,
  getCoinReceiverLockTotalMs,
  getCoinReceiverLossSettleAtMs,
  getCoinReceiverLossTotalMs,
  getCoinReceiverSealAtMs,
} from "./coinReceiverLock.js";
import { CoinReceiverCoinCrack } from "./CoinReceiverCoinCrack.js";
import { CoinReceiverEmblem } from "./CoinReceiverEmblem.js";
import type {
  CoinReceiverLockPhase,
  CoinReceiverLossPhase,
  CoinReceiverProps,
} from "./CoinReceiver.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CoinReceiver({
  size = 88,
  state = "inactive",
  locking = false,
  onLockComplete,
  onLockPhaseChange,
  losing = false,
  onLossComplete,
  onLossPhaseChange,
  soundEnabled = true,
  className,
  style,
  children,
  ...props
}: CoinReceiverProps) {
  const [lockPhase, setLockPhase] = useState<CoinReceiverLockPhase>("idle");
  const [lossPhase, setLossPhase] = useState<CoinReceiverLossPhase>("idle");
  const completedLockRef = useRef(false);
  const completedLossRef = useRef(false);
  const mountRef = useRef<HTMLDivElement>(null);
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
    ...(style as CSSProperties),
    "--coin-receiver-size": `${size}px`,
    "--coin-progression-chip-rise-duration": `${COIN_RECEIVER_LOCK_TIMING.chipRiseMs}ms`,
    "--coin-receiver-loss-press-ms": `${COIN_RECEIVER_LOSS_TIMING.pressMs}ms`,
    "--coin-receiver-loss-flash-ms": `${COIN_RECEIVER_LOSS_TIMING.flashMs}ms`,
    "--coin-receiver-loss-dust-ms": `${COIN_RECEIVER_LOSS_TIMING.dustMs}ms`,
    "--coin-receiver-loss-charcoal-ms": `${COIN_RECEIVER_LOSS_TIMING.charcoalMs}ms`,
    "--coin-receiver-loss-settle-ms": `${COIN_RECEIVER_LOSS_TIMING.settleMs}ms`,
  } as CSSProperties;

  const isWinSealed = state === "completed" || lockPhase === "celebrating" || lockPhase === "sealed";
  const isCelebrating = lockPhase === "celebrating";
  const isLossSealed = state === "loss" || lossPhase === "sealed";
  const isLossAnimating = lossPhase !== "idle" && lossPhase !== "sealed";
  const isLossBehindBowl = lossPhase === "charcoal" || lossPhase === "settling";
  const isLossRim =
    lossPhase === "pressing" ||
    lossPhase === "flashing" ||
    lossPhase === "splitting" ||
    lossPhase === "charcoal" ||
    lossPhase === "settling" ||
    lossPhase === "sealed" ||
    state === "loss";
  const isCoinSplit =
    lossPhase === "splitting" ||
    lossPhase === "charcoal" ||
    lossPhase === "settling" ||
    lossPhase === "sealed" ||
    state === "loss";

  return (
    <div
      {...props}
      className={cx(
        "joker-coin-receiver",
        state === "active" && "is-active",
        state === "completed" && "is-completed",
        state === "inactive" && "is-inactive",
        state === "loss" && "is-loss",
        isWinSealed && "is-sealed",
        isLossSealed && "is-loss-sealed",
        isCelebrating && "is-celebrating",
        locking && "is-locking",
        lockPhase === "chipRising" && "is-chip-rising",
        losing && "is-losing",
        lossPhase === "pressing" && "is-loss-pressing",
        lossPhase === "flashing" && "is-loss-flashing",
        lossPhase === "splitting" && "is-loss-splitting",
        lossPhase === "charcoal" && "is-loss-charcoal",
        lossPhase === "settling" && "is-loss-settling",
        isLossBehindBowl && "is-loss-behind-bowl",
        isLossRim && "is-loss-rim",
        isCoinSplit && "is-loss-split",
        isLossAnimating && "is-loss-animating",
        className,
      )}
      style={receiverStyle}
    >
      <div className="joker-coin-receiver__surface" aria-hidden="true">
        <div className="joker-coin-receiver__active-fx" aria-hidden="true">
          <div className="joker-coin-receiver__active-glow" />
          <div className="joker-coin-receiver__active-sweep" />
          <div className="joker-coin-receiver__active-shimmer">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="joker-coin-receiver__bowl">
          <div className="joker-coin-receiver__base">
            <CoinReceiverEmblem className="joker-coin-receiver__emblem" />
          </div>
          <div className="joker-coin-receiver__loss-dent" aria-hidden="true" />
          <div className="joker-coin-receiver__sealed-ring" />
        </div>
        <div className="joker-coin-receiver__celebrate-fx" aria-hidden="true">
          <div className="joker-coin-receiver__celebrate-burst">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="joker-coin-receiver__celebrate-dust">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="joker-coin-receiver__loss-fx" aria-hidden="true">
          <div className="joker-coin-receiver__loss-flash" />
          <div className="joker-coin-receiver__loss-smoke">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="joker-coin-receiver__loss-embers">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="joker-coin-receiver__mount" ref={mountRef}>
        <div className="joker-coin-receiver__coin-wrap">
          <div className="joker-coin-receiver__coin-intact">{children}</div>
          <CoinReceiverCoinCrack />
          <div className="joker-coin-receiver__loss-dust" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="joker-coin-receiver__coin-split" aria-hidden="true">
            <div className="joker-coin-receiver__coin-half joker-coin-receiver__coin-half--left" />
            <div className="joker-coin-receiver__coin-half joker-coin-receiver__coin-half--right" />
          </div>
        </div>
      </div>
    </div>
  );
}
