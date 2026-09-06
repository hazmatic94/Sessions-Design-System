import { Button } from "../Button/index.js";
import { RouletteChip } from "../RouletteChip/index.js";
import type { OddsButtonProps } from "./OddsButton.types.js";

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d={direction === "up" ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OddsButton({
  label = "Lower / Same",
  odds = "76.39%",
  direction = "down",
  sideIcon,
  fullWidth = true,
  showOdds = false,
  showDirection = true,
  selected = false,
  selectGlow = false,
  className,
  type = "button",
  ...props
}: OddsButtonProps) {
  const isDirectionOnly = !sideIcon && showDirection && !showOdds;
  const isLabelOnly = !sideIcon && !showOdds && !showDirection;

  return (
    <Button
      {...props}
      type={type}
      variant="odds"
      fullWidth={fullWidth}
      selected={selected}
      selectGlow={selectGlow}
      className={
        [
          sideIcon ? "has-side-icon" : "",
          isLabelOnly ? "is-label-only" : "",
          isDirectionOnly ? "is-direction-only" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ") || undefined
      }
    >
      {sideIcon ? (
        <>
          <span className="joker-hi-lo-label">{label}</span>
          {sideIcon === "black" || sideIcon === "green" || sideIcon === "red" ? (
            <RouletteChip
              color={sideIcon}
              size={16}
              className={`joker-hi-lo-side-icon joker-hi-lo-side-icon--${sideIcon} joker-hi-lo-side-icon--roulette-chip`}
              aria-hidden
            />
          ) : (
            <span
              className={`joker-hi-lo-side-icon joker-hi-lo-side-icon--${sideIcon}`}
              aria-hidden="true"
            />
          )}
        </>
      ) : isDirectionOnly ? (
        <>
          <span className="joker-hi-lo-label">{label}</span>
          <span
            className={direction === "up" ? "joker-hi-lo-chevron is-up" : "joker-hi-lo-chevron"}
            aria-hidden="true"
          >
            <ChevronIcon direction={direction} />
          </span>
        </>
      ) : (
        <>
          <span className="joker-hi-lo-label">{label}</span>
          {showDirection || showOdds ? (
            <span className="joker-hi-lo-odds">
              {showDirection ? (
                <span className={direction === "up" ? "joker-hi-lo-chevron is-up" : "joker-hi-lo-chevron"} aria-hidden="true">
                  <ChevronIcon direction={direction} />
                </span>
              ) : null}
              {showOdds ? <span>{odds}</span> : null}
            </span>
          ) : null}
        </>
      )}
    </Button>
  );
}
