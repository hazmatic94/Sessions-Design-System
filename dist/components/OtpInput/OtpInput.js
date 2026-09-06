import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useState } from "react";
import inputStyles from "../Input/Input.module.css";
import styles from "./OtpInput.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function OtpInput({ label = "Verification code", helperText, error, message, status, fullWidth = false, length = 4, value = "", defaultValue = "", mask = false, onChange, className, disabled, id, ...props }) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const messageId = `${inputId}-message`;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value ?? internalValue;
    const digits = Array.from({ length }, (_, index) => currentValue[index] ?? "");
    const visibleMessage = error || message || helperText;
    const resolvedStatus = error ? "error" : status;
    const updateDigit = (index, nextDigit) => {
        const nextDigits = [...digits];
        nextDigits[index] = nextDigit.slice(-1);
        const nextValue = nextDigits.join("").trim();
        setInternalValue(nextValue);
        onChange?.(nextValue);
    };
    return (_jsxs("div", { className: cx(inputStyles.field, styles.root, "joker-input-field otp", resolvedStatus && inputStyles[resolvedStatus], resolvedStatus, disabled && inputStyles.disabled, disabled && "disabled", fullWidth && inputStyles.fullWidth, fullWidth && "full-width", className), children: [label && _jsx("label", { className: cx(inputStyles.label, "joker-input-label"), htmlFor: `${inputId}-0`, children: label }), _jsx("div", { className: cx(styles.group, "joker-otp-group"), "aria-label": typeof label === "string" ? label : "Verification code", children: Array.from({ length }).map((_, index) => {
                    const digit = digits[index] || "";
                    return (_createElement("input", { ...props, id: `${inputId}-${index}`, key: index, type: mask ? "password" : "text", inputMode: "numeric", autoComplete: "one-time-code", maxLength: 1, value: digit, disabled: disabled, "data-filled": digit ? "true" : undefined, "aria-label": `Digit ${index + 1}`, "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": resolvedStatus === "error" || undefined, onChange: (event) => updateDigit(index, event.target.value) }));
                }) }), visibleMessage && (_jsx("span", { className: cx(inputStyles.message, "joker-input-message"), id: messageId, role: resolvedStatus === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
