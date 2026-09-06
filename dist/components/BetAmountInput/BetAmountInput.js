import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import { formatBetAmountDisplay, sanitizeBetAmount } from "../../utils/betAmountFormat.js";
import styles from "./BetAmountInput.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function BetAmountInput({ label = "Bet amount", placeholder = "0", fullWidth = false, leftIcon, prefix, helperText, error, message, status, className, disabled, id, required, value, defaultValue, onChange, onValueChange, ...props }) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const messageId = `${inputId}-message`;
    const visibleMessage = error || message || helperText;
    const leadingIcon = leftIcon || prefix;
    const isControlled = value !== undefined;
    const resolvedRaw = isControlled ? String(value) : defaultValue !== undefined ? String(defaultValue) : "";
    const displayValue = formatBetAmountDisplay(resolvedRaw);
    const handleChange = (event) => {
        const nextRaw = sanitizeBetAmount(event.currentTarget.value);
        const nextDisplay = formatBetAmountDisplay(nextRaw);
        event.currentTarget.value = nextDisplay;
        event.currentTarget.dataset.rawValue = nextRaw;
        onChange?.(event);
        onValueChange?.(nextRaw);
    };
    return (_jsxs("div", { className: cx(styles.field, "joker-input-field live prefix currency joker-bet-field", status, disabled && styles.disabled, disabled && "disabled", fullWidth && styles.fullWidth, fullWidth && "full-width", className), children: [label && _jsx("label", { className: cx(styles.label, "joker-input-label"), htmlFor: inputId, children: label }), _jsxs("span", { className: cx(styles.control, "joker-input-control"), children: [leadingIcon && _jsx("span", { className: cx(styles.icon, "joker-input-icon"), children: leadingIcon }), _jsx("input", { ...props, id: inputId, className: styles.input, disabled: disabled, required: required, type: "text", inputMode: "decimal", pattern: "[0-9,]*[.]?[0-9]*", placeholder: placeholder, value: isControlled ? displayValue : undefined, defaultValue: !isControlled ? displayValue : undefined, onChange: handleChange, "data-bet-amount-input": true, "data-raw-value": sanitizeBetAmount(resolvedRaw), "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": error || status === "error" ? true : undefined })] }), visibleMessage && (_jsx("span", { className: cx(styles.message, "joker-input-message"), id: messageId, role: error || status === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
