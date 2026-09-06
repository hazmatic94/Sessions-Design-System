import { type ChangeEvent, useId, useState } from "react";
import inputStyles from "../Input/Input.module.css";
import styles from "./MultiplierInput.module.css";
import type { MultiplierInputProps } from "./MultiplierInput.types";

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  const path = direction === "up" ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={path} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function clamp(value: number, min?: number, max?: number) {
  if (typeof min === "number" && value < min) return min;
  if (typeof max === "number" && value > max) return max;
  return value;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MultiplierInput({
  label = "Cash out at",
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  value,
  defaultValue = 1,
  min,
  max,
  step = 0.1,
  suffix = "x",
  onChange,
  className,
  disabled,
  id,
  ...props
}: MultiplierInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const numericValue = value ?? internalValue;
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;

  const commitValue = (nextValue: number) => {
    const clampedValue = clamp(nextValue, min, max);
    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = Number(event.target.value.replace(suffix, ""));
    if (!Number.isNaN(nextValue)) commitValue(nextValue);
  };

  return (
    <label
      className={cx(
        inputStyles.field,
        styles.root,
        "joker-input-field multiplier",
        resolvedStatus && inputStyles[resolvedStatus],
        resolvedStatus,
        disabled && inputStyles.disabled,
        disabled && "disabled",
        fullWidth && inputStyles.fullWidth,
        fullWidth && "full-width",
        className,
      )}
      htmlFor={inputId}
    >
      {label && <span className={cx(inputStyles.label, "joker-input-label")}>{label}</span>}
      <span className={cx(inputStyles.control, styles.control, "joker-input-control joker-multiplier-control")}>
        <input
          {...props}
          id={inputId}
          type="text"
          inputMode="decimal"
          value={`${numericValue}${suffix}`}
          disabled={disabled}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={resolvedStatus === "error" || undefined}
          onChange={handleInputChange}
        />
        <span className={cx(styles.actions, "joker-multiplier-actions")} aria-label="Cash out controls">
          <button className={cx(styles.button, "joker-multiplier-button")} type="button" disabled={disabled} aria-label="Increase cash out value" onClick={() => commitValue(numericValue + step)}>
            <ChevronIcon direction="up" />
          </button>
          <button className={cx(styles.button, "joker-multiplier-button")} type="button" disabled={disabled} aria-label="Decrease cash out value" onClick={() => commitValue(numericValue - step)}>
            <ChevronIcon direction="down" />
          </button>
        </span>
      </span>
      {visibleMessage && (
        <span
          className={cx(inputStyles.message, "joker-input-message")}
          id={messageId}
          role={resolvedStatus === "error" ? "alert" : undefined}
        >
          {visibleMessage}
        </span>
      )}
    </label>
  );
}
