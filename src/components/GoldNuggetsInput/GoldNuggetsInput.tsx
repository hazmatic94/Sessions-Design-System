import { useId } from "react";
import goldBarSrc from "../../../assets/goldBar.png";
import inputStyles from "../Input/Input.module.css";
import styles from "./GoldNuggetsInput.module.css";
import type { GoldNuggetsInputProps } from "./GoldNuggetsInput.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GoldNuggetsInput({
  label = "Gold bars",
  value = "0",
  fullWidth = false,
  className,
  ...props
}: GoldNuggetsInputProps) {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;

  return (
    <div
      {...props}
      className={cx(
        inputStyles.field,
        styles.root,
        "joker-input-field joker-gold-nuggets-input joker-gold-nuggets-display",
        fullWidth && inputStyles.fullWidth,
        fullWidth && "full-width",
        className,
      )}
    >
      {label && <span className={cx(inputStyles.label, styles.label, "joker-input-label")} id={labelId}>{label}</span>}
      <span className={cx(inputStyles.control, "joker-input-control")} role="status" aria-labelledby={label ? labelId : undefined}>
        <img className={cx(styles.icon, "joker-gold-nuggets-icon")} src={goldBarSrc} alt="" />
        <span className={cx(styles.value, "joker-gold-nuggets-value")}>{value}</span>
      </span>
    </div>
  );
}
