import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import styles from "./Input.module.css";
const statusClasses = {
    success: styles.success,
    warning: styles.warning,
    error: styles.error,
};
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function Input({ label, helperText, error, message, status, fullWidth = false, leftIcon, rightIcon, prefix, suffix, className, disabled, id, required, ...props }) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const messageId = `${inputId}-message`;
    const visibleMessage = error || message || helperText;
    const resolvedStatus = error ? "error" : status;
    const leadingIcon = leftIcon || prefix;
    const trailingIcon = rightIcon || suffix;
    return (_jsxs("label", { className: cx(styles.field, "joker-input-field", resolvedStatus && statusClasses[resolvedStatus], resolvedStatus, disabled && styles.disabled, disabled && "disabled", fullWidth && styles.fullWidth, fullWidth && "full-width", className), htmlFor: inputId, children: [label && _jsx("span", { className: cx(styles.label, "joker-input-label"), children: label }), _jsxs("span", { className: cx(styles.control, "joker-input-control"), children: [leadingIcon && _jsx("span", { className: cx(styles.icon, "joker-input-icon"), children: leadingIcon }), _jsx("input", { ...props, id: inputId, disabled: disabled, required: required, "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": resolvedStatus === "error" || undefined }), trailingIcon && _jsx("span", { className: cx(styles.icon, styles.trailing, "joker-input-icon trailing"), children: trailingIcon })] }), visibleMessage && (_jsx("span", { className: cx(styles.message, "joker-input-message"), id: messageId, role: resolvedStatus === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
