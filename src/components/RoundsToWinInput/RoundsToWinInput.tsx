import { useEffect, useId, useRef, useState } from "react";
import { playButtonClickSound } from "../../utils/buttonSounds.js";
import { ODDS_SELECT_GLOW_MS } from "../OddsButtonGroup/oddsSelectGlow.js";
import styles from "./RoundsToWinInput.module.css";
import type { RoundsToWinInputProps, RoundsToWinOption } from "./RoundsToWinInput.types";

const defaultRoundsToWinOptions: RoundsToWinOption[] = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function RoundsToWinInput({
  label = "Rounds to win",
  options = defaultRoundsToWinOptions,
  value,
  defaultValue,
  onChange,
  disabled = false,
  name,
  className,
  id,
  ...props
}: RoundsToWinInputProps) {
  const generatedId = useId();
  const fieldId = id || generatedId;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [glowValue, setGlowValue] = useState<string | null>(null);
  const glowTimerRef = useRef<number | null>(null);
  const selectedValue = value ?? internalValue;

  useEffect(() => {
    return () => {
      if (glowTimerRef.current != null) {
        window.clearTimeout(glowTimerRef.current);
      }
    };
  }, []);

  const handleSelect = (option: RoundsToWinOption) => {
    if (disabled || option.disabled || option.value === selectedValue) {
      return;
    }

    if (value === undefined) {
      setInternalValue(option.value);
    }

    setGlowValue(option.value);

    if (glowTimerRef.current != null) {
      window.clearTimeout(glowTimerRef.current);
    }

    glowTimerRef.current = window.setTimeout(() => {
      setGlowValue(null);
      glowTimerRef.current = null;
    }, ODDS_SELECT_GLOW_MS);

    onChange?.(option.value, option);
  };

  return (
    <div
      {...props}
      className={cx(
        styles.field,
        "joker-rounds-to-win-field",
        disabled && styles.disabled,
        disabled && "disabled",
        className,
      )}
    >
      {label && (
        <span className={cx(styles.label, "joker-input-label", "joker-rounds-to-win-label")} id={`${fieldId}-label`}>
          {label}
        </span>
      )}
      <div
        className={cx(styles.options, "joker-rounds-to-win-options")}
        role="radiogroup"
        aria-labelledby={label ? `${fieldId}-label` : undefined}
        aria-disabled={disabled || undefined}
      >
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          const optionId = `${fieldId}-${option.value}`;

          return (
            <button
              key={option.value}
              className={cx(
                styles.option,
                isSelected && styles.selected,
                glowValue === option.value && styles.selectGlow,
                "joker-rounds-to-win-option",
                isSelected && "is-selected",
                glowValue === option.value && "is-select-glow",
              )}
              id={optionId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled || option.disabled}
              name={name}
              onClick={() => {
                playButtonClickSound();
                handleSelect(option);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
