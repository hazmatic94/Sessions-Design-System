import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import goldBarSrc from "../../../assets/goldBar.png";
import inputStyles from "../Input/Input.module.css";
import styles from "./GoldNuggetsInput.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function GoldNuggetsInput({ label = "Gold bars", value = "0", fullWidth = false, className, ...props }) {
    const generatedId = useId();
    const labelId = `${generatedId}-label`;
    return (_jsxs("div", { ...props, className: cx(inputStyles.field, styles.root, "joker-input-field joker-gold-nuggets-input joker-gold-nuggets-display", fullWidth && inputStyles.fullWidth, fullWidth && "full-width", className), children: [label && _jsx("span", { className: cx(inputStyles.label, styles.label, "joker-input-label"), id: labelId, children: label }), _jsxs("span", { className: cx(inputStyles.control, "joker-input-control"), role: "status", "aria-labelledby": label ? labelId : undefined, children: [_jsx("img", { className: cx(styles.icon, "joker-gold-nuggets-icon"), src: goldBarSrc, alt: "" }), _jsx("span", { className: cx(styles.value, "joker-gold-nuggets-value"), children: value })] })] }));
}
