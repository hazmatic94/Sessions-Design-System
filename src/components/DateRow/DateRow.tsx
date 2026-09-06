import { formatMatchMinutes } from "../../utils/formatMatchMinutes.js";
import styles from "./DateRow.module.css";
import type { DateRowProps } from "./DateRow.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function DateRow({
  children,
  variant = "default",
  minutesPlayed = 0,
  className,
  ...props
}: DateRowProps) {
  if (variant === "live") {
    return (
      <div
        {...props}
        className={cx(styles.root, styles.live, "joker-date-row", "joker-date-row--live", className)}
      >
        <span className={cx(styles.livePrefix, "joker-date-row__live-prefix")}>Playing for</span>
        <span className={cx(styles.liveTime, "joker-date-row__live-time")}>
          {formatMatchMinutes(minutesPlayed)}
        </span>
      </div>
    );
  }

  return (
    <div {...props} className={cx(styles.root, "joker-date-row", className)}>
      <span className={cx(styles.label, "joker-date-row__label")}>{children}</span>
    </div>
  );
}
