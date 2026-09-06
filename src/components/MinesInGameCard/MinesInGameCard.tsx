import styles from "./MinesInGameCard.module.css";
import type { MinesInGameCardProps } from "./MinesInGameCard.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CoinIcon() {
  return <span className={styles.coin} aria-hidden="true" />;
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MinesInGameCard({
  currentProfitLabel = "Current profit",
  currentProfit = "800",
  nextLabel = "Next",
  nextValue = "1050",
  currentMultiplier = "8.0x",
  nextMultiplier = "10.5x",
  className,
  ...props
}: MinesInGameCardProps) {
  return (
    <div {...props} className={cx(styles.card, "joker-mines-ingame-card", className)}>
      <div className={styles.top}>
        <div className={styles.stack}>
          <span className={styles.label}>{currentProfitLabel}</span>
          <span className={cx(styles.value, styles.profit)}>
            <CoinIcon />
            <span>{currentProfit}</span>
          </span>
        </div>

        <span className={styles.chevron}>
          <ChevronIcon />
        </span>

        <div className={styles.stack}>
          <span className={styles.label}>{nextLabel}</span>
          <span className={cx(styles.value, styles.next)}>
            <CoinIcon />
            <span>{nextValue}</span>
          </span>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={cx(styles.multiplier, styles.profit)}>{currentMultiplier}</span>
        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.multiplier}>{nextMultiplier}</span>
      </div>
    </div>
  );
}
