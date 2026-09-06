import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, useMemo, useState } from "react";
import inputStyles from "../Input/Input.module.css";
import styles from "./Select.module.css";
function ChevronDownIcon() {
    return (_jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: _jsx("path", { d: "m6 9 6 6 6-6", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "3" }) }));
}
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function Select({ label, helperText, error, message, status, fullWidth = false, leftIcon, options, value, defaultValue, placeholder = "Select", renderValue, onChange, className, disabled, id, ...props }) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const messageId = `${selectId}-message`;
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
    const selectedValue = value ?? internalValue;
    const selectedOption = useMemo(() => options.find((option) => option.value === selectedValue), [options, selectedValue]);
    const visibleMessage = error || message || helperText;
    const resolvedStatus = error ? "error" : status;
    const handleSelect = (nextValue) => {
        setInternalValue(nextValue);
        setIsOpen(false);
        onChange?.(nextValue);
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };
    return (_jsxs("div", { className: cx(inputStyles.field, styles.dropdown, "joker-input-field dropdown", isOpen && styles.open, isOpen && "is-open", resolvedStatus && inputStyles[resolvedStatus], resolvedStatus, disabled && inputStyles.disabled, disabled && "disabled", fullWidth && inputStyles.fullWidth, fullWidth && "full-width", className), children: [label && _jsx("label", { className: cx(inputStyles.label, "joker-input-label"), id: `${selectId}-label`, children: label }), _jsxs("button", { ...props, className: cx(inputStyles.control, styles.control, "joker-input-control joker-dropdown-control"), type: "button", disabled: disabled, "aria-labelledby": label ? `${selectId}-label` : undefined, "aria-haspopup": "listbox", "aria-expanded": isOpen, "aria-controls": listboxId, "aria-describedby": visibleMessage ? messageId : undefined, "aria-invalid": resolvedStatus === "error" || undefined, onClick: (event) => {
                    props.onClick?.(event);
                    setIsOpen((open) => !open);
                }, children: [leftIcon, _jsx("span", { className: cx(styles.value, "joker-dropdown-value"), children: renderValue ? renderValue(selectedOption) : (selectedOption?.label ?? placeholder) }), _jsx("span", { className: cx(inputStyles.icon, inputStyles.trailing, "joker-input-icon trailing"), children: _jsx(ChevronDownIcon, {}) })] }), _jsx("div", { className: cx(styles.menu, "joker-dropdown-menu"), id: listboxId, role: "listbox", "aria-labelledby": label ? `${selectId}-label` : undefined, children: options.map((option) => (_jsx("button", { className: cx(styles.option, "joker-dropdown-option"), type: "button", role: "option", "aria-selected": option.value === selectedValue, onClick: () => handleSelect(option.value), children: option.label }, option.value))) }), visibleMessage && (_jsx("span", { className: cx(inputStyles.message, "joker-input-message"), id: messageId, role: resolvedStatus === "error" ? "alert" : undefined, children: visibleMessage }))] }));
}
