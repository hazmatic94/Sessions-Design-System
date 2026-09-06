import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import minusControlSrc from "../../../assets/minus-control.svg";
import plusControlSrc from "../../../assets/plus-control.svg";
import styles from "./PlusMinusInput.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function PlusMinusInput({ value, min, max, minusLabel = "Decrease", plusLabel = "Increase", onMinusClick, onPlusClick, minusDisabled = false, plusDisabled = false, className, ...props }) {
    const hasValue = value != null && String(value) !== "";
    const numericValue = typeof value === "number" ? value : Number(value);
    const canUseBounds = hasValue && Number.isFinite(numericValue);
    const isMinusDisabled = minusDisabled || (canUseBounds && min != null && numericValue <= min);
    const isPlusDisabled = plusDisabled || (canUseBounds && max != null && numericValue >= max);
    return (_jsxs("div", { ...props, className: cx(styles.root, "joker-plus-minus-input", hasValue && "is-with-value", className), role: hasValue ? "group" : undefined, "aria-label": hasValue ? "Adjust value" : undefined, children: [_jsx("button", { className: cx(styles.control, "joker-plus-minus-input-control"), type: "button", "aria-label": minusLabel, disabled: isMinusDisabled, onClick: onMinusClick, children: _jsx("img", { className: cx(styles.icon, "joker-plus-minus-input-icon"), src: minusControlSrc, alt: "" }) }), hasValue ? (_jsx("span", { className: cx(styles.value, "joker-plus-minus-input__value"), "aria-live": "polite", "aria-atomic": "true", children: value })) : null, _jsx("button", { className: cx(styles.control, "joker-plus-minus-input-control"), type: "button", "aria-label": plusLabel, disabled: isPlusDisabled, onClick: onPlusClick, children: _jsx("img", { className: cx(styles.icon, "joker-plus-minus-input-icon"), src: plusControlSrc, alt: "" }) })] }));
}
