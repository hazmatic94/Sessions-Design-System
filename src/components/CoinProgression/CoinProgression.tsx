import type { CSSProperties } from "react";
import { CoinProgressionStep } from "./CoinProgressionStep.js";
import type { CoinProgressionProps } from "./CoinProgression.types.js";
import "../../styles/coin-progression.css";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CoinProgression({
  steps,
  activeIndex,
  completedThrough = -1,
  lockingIndex = null,
  receiverSize = 88,
  gap = 8,
  onLockComplete,
  renderCoin,
  className,
  style,
  ...props
}: CoinProgressionProps) {
  const rowStyle = {
    "--win-streak-row-gap": `${gap}px`,
    "--win-streak-row-chip-size": `${receiverSize}px`,
    ...style,
  } as CSSProperties;

  return (
    <div {...props} className={cx("joker-coin-progression", className)} style={rowStyle}>
      <ol className="joker-coin-progression__track" aria-label={`${steps.length} coin progression steps`}>
        {steps.map((step, index) => {
          const isLocking = lockingIndex === index;
          const isCompleted = index <= completedThrough;
          const settled = isCompleted && !isLocking;
          const showChip = isCompleted || isLocking;

          return (
            <li key={`${step.multiplier}-${index}`} className="joker-coin-progression__slot">
              <CoinProgressionStep
                multiplier={step.multiplier}
                receiverSize={receiverSize}
                settled={settled}
                animating={isLocking}
                showChip={showChip}
                renderCoin={renderCoin && showChip ? () => renderCoin(index) : undefined}
                onPlaybackComplete={() => onLockComplete?.(index)}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
