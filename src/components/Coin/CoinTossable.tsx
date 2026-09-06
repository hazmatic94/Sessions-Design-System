import { useEffect, useRef, useState, type CSSProperties } from "react";
import { burstCoinTossParticles } from "../../utils/coinTossParticles.js";
import { playCoinFlipSound, playCoinWhooshSound } from "../../utils/coinTossSounds.js";
import {
  COIN_TOSS_DURATION_MS,
  computeTossEndRotation,
  createTossTiltZ,
  getCoinTossLaunchDelayMs,
  normalizeTossRestRotation,
  runCoinTossAnimation,
} from "../../utils/coinTossAnimation.js";
import type { CoinTossFrame } from "./coinTossAnimation";
import { CoinTossFaces } from "./CoinTossFaces";
import { CoinTossRings } from "./CoinTossRings";
import type { CoinTossableProps } from "./Coin.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const REST_FRAME: Omit<CoinTossFrame, "rotateX"> = {
  progress: 1,
  translateY: 0,
  scaleX: 1,
  scaleY: 1,
  rotateZ: 0,
  shadowScale: 1,
  shadowOpacity: 0,
  shadowBlur: 1,
  specularShift: 0,
  specularOpacity: 0,
  motionBlur: 0,
};

function applyTossFrame(
  motionEl: HTMLElement | null,
  coinEl: HTMLElement | null,
  shadowEl: HTMLElement | null,
  frame: CoinTossFrame,
) {
  if (motionEl) {
    motionEl.style.setProperty("--coin-toss-translate-y", `${frame.translateY}px`);
    motionEl.style.setProperty("--coin-toss-scale-x", String(frame.scaleX));
    motionEl.style.setProperty("--coin-toss-scale-y", String(frame.scaleY));
    motionEl.style.setProperty("--coin-toss-motion-blur", String(frame.motionBlur ?? 0));
  }

  if (coinEl) {
    coinEl.style.setProperty("--coin-toss-rotate-x", `${frame.rotateX}deg`);
    coinEl.style.setProperty("--coin-toss-rotate-z", `${frame.rotateZ}deg`);
    coinEl.style.setProperty("--coin-toss-specular-shift", `${frame.specularShift}%`);
    coinEl.style.setProperty("--coin-toss-specular-opacity", String(frame.specularOpacity));
  }

  if (shadowEl) {
    shadowEl.style.setProperty("--coin-toss-shadow-scale", String(frame.shadowScale));
    shadowEl.style.setProperty("--coin-toss-shadow-opacity", String(frame.shadowOpacity));
    shadowEl.style.setProperty("--coin-toss-shadow-blur", String(frame.shadowBlur));
  }
}

export function CoinTossable({
  side = "heads",
  tossPhase = "idle",
  tossOutcome,
  onTossEnd,
  tossDurationMs = COIN_TOSS_DURATION_MS,
  stageSizePx,
  tapHint,
  tapHintVisible = true,
  soundEnabled = true,
  className,
  style,
  ...props
}: CoinTossableProps) {
  const motionRef = useRef<HTMLDivElement>(null);
  const coinRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(normalizeTossRestRotation(side));
  const tossRunRef = useRef(0);
  const activeTossRef = useRef(false);
  const onTossEndRef = useRef(onTossEnd);

  useEffect(() => {
    onTossEndRef.current = onTossEnd;
  }, [onTossEnd]);
  const [isTossing, setIsTossing] = useState(false);
  const [pauseSheen, setPauseSheen] = useState(false);

  const styleVars = style as (CSSProperties & Record<string, string | number | undefined>) | undefined;
  const coinSizePx =
    typeof styleVars?.["--coin-size"] === "string"
      ? Number.parseFloat(String(styleVars["--coin-size"]).replace("px", "")) || 256
      : 256;

  const resolvedStageSizePx =
    typeof styleVars?.["--coin-toss-stage-size"] === "string"
      ? Number.parseFloat(String(styleVars["--coin-toss-stage-size"]).replace("px", "")) ||
        stageSizePx ||
        coinSizePx
      : stageSizePx ?? coinSizePx;

  const arenaStyle = {
    ...(style as CSSProperties),
    "--coin-size": `${coinSizePx}px`,
    "--coin-toss-stage-size": `${resolvedStageSizePx}px`,
  } as CSSProperties;

  const liftPx = Math.round(coinSizePx * 0.47);

  useEffect(() => {
    if (tossPhase !== "idle") {
      return;
    }

    const restRotation = normalizeTossRestRotation(side);
    rotationRef.current = restRotation;
    applyTossFrame(motionRef.current, coinRef.current, shadowRef.current, {
      ...REST_FRAME,
      rotateX: restRotation,
    });
    setPauseSheen(false);
    setIsTossing(false);
  }, [tossPhase, side]);

  useEffect(() => {
    if (tossPhase !== "tossing") {
      activeTossRef.current = false;
      return;
    }

    if (!tossOutcome || activeTossRef.current) {
      return;
    }

    activeTossRef.current = true;
    const runId = tossRunRef.current + 1;
    tossRunRef.current = runId;
    const outcome = tossOutcome;

    const reducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const startRotateX = rotationRef.current;
    const endRotateX = computeTossEndRotation(startRotateX, outcome);
    const tiltZ = createTossTiltZ();

    setIsTossing(true);
    setPauseSheen(true);
    if (soundEnabled) {
      playCoinWhooshSound();
    }
    burstCoinTossParticles(particlesRef.current, coinSizePx);

    const flipSoundDelayMs = getCoinTossLaunchDelayMs(tossDurationMs);
    const flipSoundTimer = window.setTimeout(() => {
      if (tossRunRef.current === runId && soundEnabled) {
        playCoinFlipSound();
      }
    }, flipSoundDelayMs);

    const finishToss = (rotateX: number) => {
      if (tossRunRef.current !== runId) {
        return;
      }

      rotationRef.current = rotateX;
      applyTossFrame(motionRef.current, coinRef.current, shadowRef.current, {
        ...REST_FRAME,
        rotateX,
      });
      setIsTossing(false);
      setPauseSheen(false);
      onTossEndRef.current?.();
    };

    if (reducedMotion) {
      finishToss(normalizeTossRestRotation(outcome));
      return;
    }

    runCoinTossAnimation({
      durationMs: tossDurationMs,
      startRotateX,
      endRotateX,
      tiltZ,
      liftPx,
      onUpdate: (frame: CoinTossFrame) => {
        if (tossRunRef.current !== runId) {
          return;
        }
        applyTossFrame(motionRef.current, coinRef.current, shadowRef.current, frame);
      },
    }).then(() => {
      finishToss(normalizeTossRestRotation(outcome));
    });

    return () => {
      window.clearTimeout(flipSoundTimer);
      if (tossRunRef.current === runId) {
        tossRunRef.current += 1;
      }
    };
  }, [tossPhase, tossOutcome, tossDurationMs, coinSizePx, liftPx, soundEnabled]);

  return (
    <div className="joker-coin-toss__arena" style={arenaStyle}>
      <CoinTossRings size={resolvedStageSizePx} coinSizePx={coinSizePx} />
      <div className={cx("joker-coin-toss__playfield", isTossing && "is-tossing")}>
        {tapHint != null ? (
          <p className={cx("joker-coin-toss-demo__hint", !tapHintVisible && "is-faded")}>{tapHint}</p>
        ) : null}
        <div className="joker-coin-toss__ground" aria-hidden="true">
          <div ref={shadowRef} className="joker-coin-toss__shadow" />
        </div>
        <div className="joker-coin-toss__stage">
          <div ref={motionRef} className={cx("joker-coin-toss__motion", isTossing && "is-tossing")}>
            <div className="joker-coin-toss__trail" aria-hidden="true" />
            <div className="joker-coin-toss__glow" aria-hidden="true" />
            <div ref={particlesRef} className="joker-coin-toss__particles" aria-hidden="true" />
            <div className="joker-coin-toss__coin-shadow" aria-hidden="true" />
            <div
              {...props}
              ref={coinRef}
              className={cx("joker-coin", "joker-coin--tossable", isTossing && "is-tossing", className)}
              style={{ "--coin-size": `${coinSizePx}px` } as CSSProperties}
              aria-hidden={props["aria-hidden"] ?? true}
            >
              <CoinTossFaces pauseSheen={pauseSheen} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
