import { useEffect, useRef, useState } from "react";
import { playButtonClickSound } from "../../utils/buttonSounds.js";
import { OddsButton } from "../OddsButton/index.js";
import { ODDS_SELECT_GLOW_MS } from "./oddsSelectGlow.js";
import styles from "./OddsButtonGroup.module.css";
import type { OddsButtonGroupOption, OddsButtonGroupProps } from "./OddsButtonGroup.types.js";

const defaultOptions: OddsButtonGroupOption[] = [
  { value: "heads", label: "Heads", sideIcon: "heads" },
  { value: "tails", label: "Tails", sideIcon: "tails" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function OddsButtonGroup({
  label = "Odds",
  options = defaultOptions,
  value,
  defaultValue,
  onValueChange,
  layout = "stacked",
  showOdds = false,
  showDirection = true,
  disabled = false,
  className = "",
  ariaLabel = "Odds choices",
}: OddsButtonGroupProps) {
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

  const handleSelect = (option: OddsButtonGroupOption) => {
    if (selectedValue === option.value) {
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

    onValueChange?.(option.value, option);
  };

  return (
    <div className={cx(styles.field, "joker-odds-button-group-field", className)}>
      {label && <span className={cx(styles.label, "joker-input-label")}>{label}</span>}
      <div
        className={cx(
          styles.root,
          layout === "inline" && styles.inline,
          "joker-odds-button-group",
          layout === "inline" && "is-inline",
          layout === "inline" && options.length === 3 && "is-three-up",
        )}
        role="group"
        aria-label={ariaLabel}
      >
        {options.map((option) => (
          <OddsButton
            key={option.value}
            label={option.label}
            odds={option.odds}
            direction={option.direction}
            sideIcon={option.sideIcon}
            showOdds={option.sideIcon ? false : showOdds}
            showDirection={showDirection}
            disabled={disabled || option.disabled}
            selected={selectedValue === option.value}
            selectGlow={glowValue === option.value}
            onClick={(event) => {
              playButtonClickSound();
              handleSelect(option);
              option.onClick?.(event);
            }}
          />
        ))}
      </div>
    </div>
  );
}
