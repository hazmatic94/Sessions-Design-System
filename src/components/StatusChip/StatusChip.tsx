import styles from "./StatusChip.module.css";
import type { StatusChipProps } from "./StatusChip.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function formatMatchLabel(matchCount: number) {
  const safeCount = Math.max(0, matchCount);
  const noun = safeCount === 1 ? "Match" : "Matches";
  return `${safeCount} ${noun} Available`;
}

export function StatusChip({ matchCount, className, ...props }: StatusChipProps) {
  const label = formatMatchLabel(matchCount);

  return (
    <span {...props} className={cx(styles.root, "joker-status-chip", className)}>
      <span className={cx(styles.dot, "joker-status-chip-dot")} aria-hidden="true" />
      <span className={cx(styles.label, "joker-status-chip-label")}>{label}</span>
    </span>
  );
}
