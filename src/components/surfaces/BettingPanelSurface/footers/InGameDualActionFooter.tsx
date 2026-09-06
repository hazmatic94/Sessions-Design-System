import { Button } from "../../../Button/index.js";
import styles from "./BettingPanelFooters.module.css";
import type { InGameDualActionFooterProps } from "./BettingPanelFooters.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function InGameDualActionFooter({
  cashoutLabel = "Cashout",
  className = "",
  onCashout,
  onPrimaryAction,
  primaryLabel = "Play Again",
}: InGameDualActionFooterProps) {
  return (
    <div
      className={cx(
        styles.submitGroup,
        styles.dualActionGroup,
        "joker-betting-submit-group joker-betting-ingame-dual-action-footer",
        className,
      )}
    >
      <Button
        variant="cashout"
        fullWidth
        className={cx(styles.submit, "joker-cta-preview hi-lo-skip cashout full-width")}
        onClick={onCashout}
      >
        <span className="joker-hi-lo-skip-label">{cashoutLabel}</span>
      </Button>
      <Button
        fullWidth
        className={cx(styles.submit, "joker-cta-preview default full-width joker-bet-submit")}
        onClick={onPrimaryAction}
      >
        {primaryLabel}
      </Button>
    </div>
  );
}
