import { useId, useMemo, useState } from "react";
import inputStyles from "../Input/Input.module.css";
import styles from "./Select.module.css";
import type { SelectProps } from "./Select.types";

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  );
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Select({
  label,
  helperText,
  error,
  message,
  status,
  fullWidth = false,
  leftIcon,
  options,
  value,
  defaultValue,
  placeholder = "Select",
  renderValue,
  onChange,
  className,
  disabled,
  id,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;
  const messageId = `${selectId}-message`;
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const selectedValue = value ?? internalValue;
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );
  const visibleMessage = error || message || helperText;
  const resolvedStatus = error ? "error" : status;

  const handleSelect = (nextValue: string) => {
    setInternalValue(nextValue);
    setIsOpen(false);
    onChange?.(nextValue);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <div
      className={cx(
        inputStyles.field,
        styles.dropdown,
        "joker-input-field dropdown",
        isOpen && styles.open,
        isOpen && "is-open",
        resolvedStatus && inputStyles[resolvedStatus],
        resolvedStatus,
        disabled && inputStyles.disabled,
        disabled && "disabled",
        fullWidth && inputStyles.fullWidth,
        fullWidth && "full-width",
        className,
      )}
    >
      {label && <label className={cx(inputStyles.label, "joker-input-label")} id={`${selectId}-label`}>{label}</label>}
      <button
        {...props}
        className={cx(inputStyles.control, styles.control, "joker-input-control joker-dropdown-control")}
        type="button"
        disabled={disabled}
        aria-labelledby={label ? `${selectId}-label` : undefined}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-describedby={visibleMessage ? messageId : undefined}
        aria-invalid={resolvedStatus === "error" || undefined}
        onClick={(event) => {
          props.onClick?.(event);
          setIsOpen((open) => !open);
        }}
      >
        {leftIcon}
        <span className={cx(styles.value, "joker-dropdown-value")}>
          {renderValue ? renderValue(selectedOption) : (selectedOption?.label ?? placeholder)}
        </span>
        <span className={cx(inputStyles.icon, inputStyles.trailing, "joker-input-icon trailing")}><ChevronDownIcon /></span>
      </button>
      <div className={cx(styles.menu, "joker-dropdown-menu")} id={listboxId} role="listbox" aria-labelledby={label ? `${selectId}-label` : undefined}>
        {options.map((option) => (
          <button
            className={cx(styles.option, "joker-dropdown-option")}
            type="button"
            role="option"
            key={option.value}
            aria-selected={option.value === selectedValue}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
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
