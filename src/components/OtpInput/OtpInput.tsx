import { type ChangeEvent, useId, useState } from "react";
import inputStyles from "../Input/Input.module.css";
import styles from "./OtpInput.module.css";
import type { OtpInputProps } from "./OtpInput.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function OtpInput({
  label = "Verification code",
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  length = 4,
  value = "",
  defaultValue = "",
  mask = false,
  onChange,
  className,
  disabled,
  id,
  ...props
}: OtpInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;
  const digits = Array.from({ length }, (_, index) => currentValue[index] ?? "");
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;

  const updateDigit = (index: number, nextDigit: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = nextDigit.slice(-1);
    const nextValue = nextDigits.join("").trim();
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div
      className={cx(
        inputStyles.field,
        styles.root,
        "joker-input-field otp",
        resolvedStatus && inputStyles[resolvedStatus],
        resolvedStatus,
        disabled && inputStyles.disabled,
        disabled && "disabled",
        fullWidth && inputStyles.fullWidth,
        fullWidth && "full-width",
        className,
      )}
    >
      {label && <label className={cx(inputStyles.label, "joker-input-label")} htmlFor={`${inputId}-0`}>{label}</label>}
      <div className={cx(styles.group, "joker-otp-group")} aria-label={typeof label === "string" ? label : "Verification code"}>
        {Array.from({ length }).map((_, index) => {
          const digit = digits[index] || "";

          return (
            <input
              {...props}
              id={`${inputId}-${index}`}
              key={index}
              type={mask ? "password" : "text"}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              disabled={disabled}
              data-filled={digit ? "true" : undefined}
              aria-label={`Digit ${index + 1}`}
              aria-describedby={visibleMessage ? messageId : undefined}
              aria-invalid={resolvedStatus === "error" || undefined}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updateDigit(index, event.target.value)}
            />
          );
        })}
      </div>
      {visibleMessage && (
        <span
          className={cx(inputStyles.message, "joker-input-message")}
          id={messageId}
          role={resolvedStatus === "error" ? "alert" : undefined}
        >
          {visibleMessage}
        </span>
      )}
    </div>
  );
}
