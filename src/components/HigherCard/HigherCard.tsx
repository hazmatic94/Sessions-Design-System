import { HigherCardChevronUpIcon, HigherCardDividerIcon } from "./HigherCard.icons";
import styles from "./HigherCard.module.css";
import type { HigherCardProps } from "./HigherCard.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function HigherCard({
  topLabel = "HIGHER",
  bottomLabel = "SAME",
  multiplier = "X4.20",
  className,
  ...props
}: HigherCardProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-higher-card", className)} aria-label={props["aria-label"] ?? "Higher card"}>
      <div className={cx(styles.inner, "joker-higher-card__inner")}>
        <div className={cx(styles.content, "joker-higher-card__content")}>
          <div className={cx(styles.top, "joker-higher-card__top")}>
            <HigherCardChevronUpIcon className={cx(styles.chevron, "joker-higher-card__chevron")} />
            <div className={cx(styles.labels, "joker-higher-card__labels")}>
              <span className={cx(styles.label, "joker-higher-card__label")}>{topLabel}</span>
              <HigherCardDividerIcon className={cx(styles.divider, "joker-higher-card__divider")} />
              <span className={cx(styles.label, "joker-higher-card__label")}>{bottomLabel}</span>
            </div>
          </div>
          <span className={cx(styles.multiplier, "joker-higher-card__multiplier")}>{multiplier}</span>
        </div>
      </div>
    </div>
  );
}
