import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Chip } from "../Chip.js";
import {
  ROULETTE_WIN_CHIP_ENTER_MS,
  ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS,
  ROULETTE_WIN_CHIP_PLAYBACK_MS,
  ROULETTE_WIN_CHIP_RING_ENTER_MS,
} from "../RouletteWinChip/rouletteWinChipTiming.js";
import "../../styles/roulette-win-chip.css";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CoinProgressionStepProps = {
  multiplier: string;
  receiverSize: number;
  settled: boolean;
  animating: boolean;
  showChip: boolean;
  renderCoin?: () => ReactNode;
  onPlaybackComplete?: () => void;
};

function rootStyle(receiverSize: number): CSSProperties {
  return {
    "--roulette-win-chip-size": `${receiverSize}px`,
    "--roulette-win-chip-enter-duration": `${ROULETTE_WIN_CHIP_ENTER_MS}ms`,
    "--roulette-win-chip-pop-duration": `${ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS}ms`,
    "--roulette-win-chip-ring-enter-duration": `${ROULETTE_WIN_CHIP_RING_ENTER_MS}ms`,
    "--roulette-win-chip-pop-delay": `${ROULETTE_WIN_CHIP_ENTER_MS}ms`,
    "--roulette-win-chip-ring-delay": `${ROULETTE_WIN_CHIP_ENTER_MS + ROULETTE_WIN_CHIP_MULTIPLIER_POP_MS}ms`,
  } as CSSProperties;
}

export function CoinProgressionStep({
  multiplier,
  receiverSize,
  settled,
  animating,
  showChip,
  renderCoin,
  onPlaybackComplete,
}: CoinProgressionStepProps) {
  const [playing, setPlaying] = useState(false);
  const onCompleteRef = useRef(onPlaybackComplete);

  useEffect(() => {
    onCompleteRef.current = onPlaybackComplete;
  }, [onPlaybackComplete]);

  useEffect(() => {
    if (settled) {
      setPlaying(false);
      return;
    }
    if (!animating) {
      setPlaying(false);
      return;
    }

    setPlaying(false);
    const playFrame = window.requestAnimationFrame(() => setPlaying(true));
    const completeTimer = window.setTimeout(() => {
      onCompleteRef.current?.();
    }, ROULETTE_WIN_CHIP_PLAYBACK_MS);

    return () => {
      window.cancelAnimationFrame(playFrame);
      window.clearTimeout(completeTimer);
    };
  }, [animating, settled]);

  if (!settled && !animating && !playing) {
    return null;
  }

  return (
    <div
      className={cx(
        "joker-roulette-win-chip",
        "joker-roulette-win-chip--coin-mount",
        settled && "is-settled",
        playing && "is-playing",
      )}
      style={rootStyle(receiverSize)}
    >
      <div className="joker-roulette-win-chip__receiver">
        <div className="joker-roulette-win-chip__ring-fx" aria-hidden="true">
          <div className="joker-roulette-win-chip__active-glow" />
          <div className="joker-roulette-win-chip__active-sweep" />
        </div>
        <div className="joker-roulette-win-chip__icon" aria-hidden="true">
          {renderCoin?.()}
        </div>
      </div>
      {showChip ? (
        <Chip variant="win" className="joker-roulette-win-chip__multiplier">
          {multiplier}
        </Chip>
      ) : null}
    </div>
  );
}
