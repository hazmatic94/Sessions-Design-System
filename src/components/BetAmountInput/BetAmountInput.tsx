import { useId, type ChangeEventHandler } from "react";
import { formatBetAmountDisplay, sanitizeBetAmount } from "../../utils/betAmountFormat.js";
import styles from "./BetAmountInput.module.css";
import type { BetAmountInputProps } from "./BetAmountInput.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function BetAmountInput({
  label = "Bet amount",
  placeholder = "0",
  fullWidth = false,
  leftIcon,
  prefix,
  helperText,
  error,
  message,
  status,
  className,
  disabled,
  id,
  required,
  value,
  defaultValue,
  onChange,
  onValueChange,
  ...props
}: BetAmountInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const visibleMessage = error || message || helperText;
  const leadingIcon = leftIcon || prefix;
  const isControlled = value !== undefined;
  const resolvedRaw = isControlled ? String(value) : defaultValue !== undefined ? String(defaultValue) : "";
  const displayValue = formatBetAmountDisplay(resolvedRaw);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const nextRaw = sanitizeBetAmount(event.currentTarget.value);
    const nextDisplay = formatBetAmountDisplay(nextRaw);

    event.currentTarget.value = nextDisplay;
    event.currentTarget.dataset.rawValue = nextRaw;

    onChange?.(event);
    onValueChange?.(nextRaw);
  };

  return (
    <div
      className={cx(
        styles.field,
        "joker-input-field live prefix currency joker-bet-field",
        status,
        disabled && styles.disabled,
        disabled && "disabled",
        fullWidth && styles.fullWidth,
        fullWidth && "full-width",
        className,
      )}
    >
      {label && <label className={cx(styles.label, "joker-input-label")} htmlFor={inputId}>{label}</label>}
      <span className={cx(styles.control, "joker-input-control")}>
        {leadingIcon && <span className={cx(styles.icon, "joker-input-icon")}>{leadingIcon}</span>}
        <input
          {...props}
          id={inputId}
          className={styles.input}
          disabled={disabled}
          required={required}
          type="text"
          inputMode="decimal"
          pattern="[0-9,]*[.]?[0-9]*"
          placeholder={placeholder}
          value={isControlled ? displayValue : undefined}
          defaultValue={!isControlled ? displayValue : undefined}
          onChange={handleChange}
          data-bet-amount-input
          data-raw-value={sanitizeBetAmount(resolvedRaw)}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={error || status === "error" ? true : undefined}
        />
      </span>
      {visibleMessage && (
        <span
          className={cx(styles.message, "joker-input-message")}
          id={messageId}
          role={error || status === "error" ? "alert" : undefined}
        >
          {visibleMessage}
        </span>
      )}
    </div>
  );
}
