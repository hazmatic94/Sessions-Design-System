import minusControlSrc from "../../../assets/minus-control.svg";
import plusControlSrc from "../../../assets/plus-control.svg";
import styles from "./PlusMinusInput.module.css";
import type { PlusMinusInputProps } from "./PlusMinusInput.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PlusMinusInput({
  value,
  min,
  max,
  minusLabel = "Decrease",
  plusLabel = "Increase",
  onMinusClick,
  onPlusClick,
  minusDisabled = false,
  plusDisabled = false,
  className,
  ...props
}: PlusMinusInputProps) {
  const hasValue = value != null && String(value) !== "";
  const numericValue = typeof value === "number" ? value : Number(value);
  const canUseBounds = hasValue && Number.isFinite(numericValue);
  const isMinusDisabled = minusDisabled || (canUseBounds && min != null && numericValue <= min);
  const isPlusDisabled = plusDisabled || (canUseBounds && max != null && numericValue >= max);

  return (
    <div
      {...props}
      className={cx(styles.root, "joker-plus-minus-input", hasValue && "is-with-value", className)}
      role={hasValue ? "group" : undefined}
      aria-label={hasValue ? "Adjust value" : undefined}
    >
      <button
        className={cx(styles.control, "joker-plus-minus-input-control")}
        type="button"
        aria-label={minusLabel}
        disabled={isMinusDisabled}
        onClick={onMinusClick}
      >
        <img className={cx(styles.icon, "joker-plus-minus-input-icon")} src={minusControlSrc} alt="" />
      </button>
      {hasValue ? (
        <span
          className={cx(styles.value, "joker-plus-minus-input__value")}
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
        </span>
      ) : null}
      <button
        className={cx(styles.control, "joker-plus-minus-input-control")}
        type="button"
        aria-label={plusLabel}
        disabled={isPlusDisabled}
        onClick={onPlusClick}
      >
        <img className={cx(styles.icon, "joker-plus-minus-input-icon")} src={plusControlSrc} alt="" />
      </button>
    </div>
  );
}
