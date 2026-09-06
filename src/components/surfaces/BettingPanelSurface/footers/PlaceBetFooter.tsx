import { Button } from "../../../Button/index.js";
import { EnterBetPrecursor } from "../../../EnterBetPrecursor/index.js";
import styles from "./BettingPanelFooters.module.css";
import type { PlaceBetFooterProps } from "./BettingPanelFooters.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PlaceBetFooter({
  className = "",
  label = "Place Bet",
  onPlaceBet,
  showPrecursor = false,
}: PlaceBetFooterProps) {
  return (
    <div
      className={cx(
        styles.submitGroup,
        "joker-betting-submit-group joker-betting-place-bet-footer",
        showPrecursor && "is-pending-bet",
        className,
      )}
    >
      <Button
        fullWidth
        className={cx(
          styles.submit,
          "joker-cta-preview default full-width joker-bet-submit",
          showPrecursor && "is-pending-bet",
        )}
        onClick={onPlaceBet}
      >
        {label}
      </Button>
      {showPrecursor && <EnterBetPrecursor />}
    </div>
  );
}
