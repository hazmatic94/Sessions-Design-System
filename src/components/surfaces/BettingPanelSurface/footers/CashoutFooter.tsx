import { Button } from "../../../Button/index.js";
import styles from "./BettingPanelFooters.module.css";
import type { CashoutFooterProps } from "./BettingPanelFooters.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CashoutFooter({
  className = "",
  label = "Cashout",
  onCashout,
}: CashoutFooterProps) {
  return (
    <div className={cx(styles.submitGroup, "joker-betting-submit-group joker-betting-cashout-footer", className)}>
      <Button
        variant="cashout"
        fullWidth
        className={cx(styles.submit, "joker-cta-preview hi-lo-skip cashout full-width")}
        onClick={onCashout}
      >
        <span className="joker-hi-lo-skip-label">{label}</span>
      </Button>
    </div>
  );
}
