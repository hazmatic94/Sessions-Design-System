import { useId } from "react";
import styles from "./Input.module.css";
import type { InputProps, InputStatus } from "./Input.types";

const statusClasses: Record<InputStatus, string> = {
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Input({
  label,
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  leftIcon,
  rightIcon,
  prefix,
  suffix,
  className,
  disabled,
  id,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const messageId = `${inputId}-message`;
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;
  const leadingIcon = leftIcon || prefix;
  const trailingIcon = rightIcon || suffix;

  return (
    <label
      className={cx(
        styles.field,
        "joker-input-field",
        resolvedStatus && statusClasses[resolvedStatus],
        resolvedStatus,
        disabled && styles.disabled,
        disabled && "disabled",
        fullWidth && styles.fullWidth,
        fullWidth && "full-width",
        className,
      )}
      htmlFor={inputId}
    >
      {label && <span className={cx(styles.label, "joker-input-label")}>{label}</span>}
      <span className={cx(styles.control, "joker-input-control")}>
        {leadingIcon && <span className={cx(styles.icon, "joker-input-icon")}>{leadingIcon}</span>}
        <input
          {...props}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-describedby={visibleMessage ? messageId : undefined}
          aria-invalid={resolvedStatus === "error" || undefined}
        />
        {trailingIcon && <span className={cx(styles.icon, styles.trailing, "joker-input-icon trailing")}>{trailingIcon}</span>}
      </span>
      {visibleMessage && (
        <span
          className={cx(styles.message, "joker-input-message")}
          id={messageId}
          role={resolvedStatus === "error" ? "alert" : undefined}
        >
          {visibleMessage}
        </span>
      )}
    </label>
  );
}
