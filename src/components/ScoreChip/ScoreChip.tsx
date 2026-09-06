import styles from "./ScoreChip.module.css";
import type { ScoreChipProps } from "./ScoreChip.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ScoreChip({ children, className, ...props }: ScoreChipProps) {
  return (
    <span {...props} className={cx(styles.root, "joker-score-chip", className)}>
      <span className={cx(styles.label, "joker-score-chip__label")}>{children}</span>
    </span>
  );
}
