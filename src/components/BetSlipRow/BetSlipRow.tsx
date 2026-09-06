import styles from "./BetSlipRow.module.css";
import type { BetSlipRowProps } from "./BetSlipRow.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M18 6 6 18M6 6l12 12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function BetSlipRow({
  teamName,
  odds,
  marketType,
  selection,
  matchup,
  onRemove,
  removeLabel = "Remove selection",
  className,
  ...props
}: BetSlipRowProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-bet-slip-row", className)}>
      <button
        type="button"
        className={cx(styles.remove, "joker-bet-slip-row__remove")}
        onClick={onRemove}
        aria-label={removeLabel}
      >
        <CloseIcon />
      </button>
      <div className={cx(styles.body, "joker-bet-slip-row__body")}>
        <div className={cx(styles.topRow, "joker-bet-slip-row__top-row")}>
          <span className={cx(styles.teamName, "joker-bet-slip-row__team-name")}>{teamName}</span>
          <span className={cx(styles.odds, "joker-bet-slip-row__odds")}>{odds}</span>
        </div>
        <p className={cx(styles.market, "joker-bet-slip-row__market")}>
          <span className={cx(styles.marketType, "joker-bet-slip-row__market-type")}>{marketType}</span>
          <span className={cx(styles.divider, "joker-bet-slip-row__divider")} aria-hidden="true" />
          <span className={cx(styles.selection, "joker-bet-slip-row__selection")}>{selection}</span>
        </p>
        <p className={cx(styles.matchup, "joker-bet-slip-row__matchup")}>{matchup}</p>
      </div>
    </div>
  );
}
