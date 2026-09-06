import type { FormEvent, KeyboardEvent } from "react";
import { Input } from "../Input/index.js";
import styles from "./NumberOfBetsInput.module.css";
import type { NumberOfBetsInputProps } from "./NumberOfBetsInput.types";

const blockedNumberKeys = new Set(["e", "E", "+", "-", "."]);

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function NumberOfBetsInput({
  label = "Number of bets",
  placeholder = "0",
  selected = false,
  className,
  onInput,
  onKeyDown,
  min = 0,
  step = 1,
  ...props
}: NumberOfBetsInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (blockedNumberKeys.has(event.key)) {
      event.preventDefault();
    }

    onKeyDown?.(event);
  };

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
    onInput?.(event);
  };

  return (
    <Input
      {...props}
      className={cx(styles.root, selected && styles.selected, "joker-number-of-bets-input", selected && "is-selected", className)}
      label={label}
      placeholder={placeholder}
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      min={min}
      step={step}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}
