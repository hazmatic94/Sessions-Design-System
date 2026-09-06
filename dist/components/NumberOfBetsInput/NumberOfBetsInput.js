import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from "../Input/index.js";
import styles from "./NumberOfBetsInput.module.css";
const blockedNumberKeys = new Set(["e", "E", "+", "-", "."]);
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function NumberOfBetsInput({ label = "Number of bets", placeholder = "0", selected = false, className, onInput, onKeyDown, min = 0, step = 1, ...props }) {
    const handleKeyDown = (event) => {
        if (blockedNumberKeys.has(event.key)) {
            event.preventDefault();
        }
        onKeyDown?.(event);
    };
    const handleInput = (event) => {
        event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "");
        onInput?.(event);
    };
    return (_jsx(Input, { ...props, className: cx(styles.root, selected && styles.selected, "joker-number-of-bets-input", selected && "is-selected", className), label: label, placeholder: placeholder, type: "number", inputMode: "numeric", pattern: "[0-9]*", min: min, step: step, onInput: handleInput, onKeyDown: handleKeyDown }));
}
