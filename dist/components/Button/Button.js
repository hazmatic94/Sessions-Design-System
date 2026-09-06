import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Button.module.css";
const variantClasses = {
    primary: styles.primary,
    secondary: styles.secondary,
    ghost: styles.ghost,
    odds: styles.hiLo,
    "hi-lo": styles.hiLo,
    "hi-lo-skip": styles.hiLoSkip,
    cashout: styles.cashout,
};
const sizeClasses = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large,
};
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function Button({ children, label, variant = "primary", size = "medium", fullWidth = false, loading = false, selected = false, selectGlow = false, disabled = false, className, type = "button", ...props }) {
    const isDisabled = disabled || loading;
    const content = children ?? label;
    const primarySizeClass = variant === "primary" ? sizeClasses[size] : null;
    return (_jsxs("button", { ...props, type: type, className: cx(styles.root, variantClasses[variant], primarySizeClass, fullWidth && styles.fullWidth, loading && styles.loading, selected && styles.selected, selectGlow && styles.selectGlow, selectGlow && "is-select-glow", className), disabled: isDisabled, "aria-busy": loading || undefined, "aria-pressed": selected || undefined, children: [_jsx("span", { className: styles.content, children: content }), loading && _jsx("span", { className: styles.loader, "aria-hidden": "true" })] }));
}
