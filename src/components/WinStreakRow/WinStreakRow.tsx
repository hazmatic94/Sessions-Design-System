import type { CSSProperties } from "react";
import { SAMPLE_WIN_STREAK_WINS } from "./createRandomWinStreakWins.js";
import type { WinStreakRowProps } from "./WinStreakRow.types.js";
import { WinStreakRowChip } from "./WinStreakRowChip.js";
import "../../styles/win-streak-row.css";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function WinStreakRow({
  wins = SAMPLE_WIN_STREAK_WINS,
  gap = 8,
  chipSize = 88,
  animateOnMount = true,
  staggerMs = 220,
  completedThrough,
  className,
  style,
  ...props
}: WinStreakRowProps) {
  const resolvedCompletedThrough =
    completedThrough ?? (animateOnMount ? -1 : wins.length - 1);

  const rowStyle = {
    "--win-streak-row-gap": `${gap}px`,
    "--win-streak-row-chip-size": `${chipSize}px`,
    ...style,
  } as CSSProperties;

  return (
    <div {...props} className={cx("joker-win-streak-row", className)} style={rowStyle}>
      <ol className="joker-win-streak-row__track" aria-label={`${wins.length} win streak`}>
        {wins.map((win, index) => {
          const initialSettled = index <= resolvedCompletedThrough;
          const playDelay = initialSettled
            ? 0
            : Math.max(0, index - (resolvedCompletedThrough + 1)) * staggerMs;

          return (
            <li key={`${win.betColor}-${win.multiplier}-${index}`} className="joker-win-streak-row__slot">
              <WinStreakRowChip
                win={win}
                chipSize={chipSize}
                initialSettled={initialSettled}
                playDelay={playDelay}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
