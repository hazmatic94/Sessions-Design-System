import { LowerCardChevronDownIcon, LowerCardDividerIcon } from "./LowerCard.icons";
import styles from "./LowerCard.module.css";
import type { LowerCardProps } from "./LowerCard.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function LowerCard({
  topLabel = "LOWER",
  bottomLabel = "SAME",
  multiplier = "X4.20",
  className,
  ...props
}: LowerCardProps) {
  return (
    <div {...props} className={cx(styles.root, "joker-lower-card", className)} aria-label={props["aria-label"] ?? "Lower card"}>
      <div className={cx(styles.inner, "joker-lower-card__inner")}>
        <div className={cx(styles.content, "joker-lower-card__content")}>
          <div className={cx(styles.top, "joker-lower-card__top")}>
            <LowerCardChevronDownIcon className={cx(styles.chevron, "joker-lower-card__chevron")} />
            <div className={cx(styles.labels, "joker-lower-card__labels")}>
              <span className={cx(styles.label, "joker-lower-card__label")}>{topLabel}</span>
              <LowerCardDividerIcon className={cx(styles.divider, "joker-lower-card__divider")} />
              <span className={cx(styles.label, "joker-lower-card__label")}>{bottomLabel}</span>
            </div>
          </div>
          <span className={cx(styles.multiplier, "joker-lower-card__multiplier")}>{multiplier}</span>
        </div>
      </div>
    </div>
  );
}
