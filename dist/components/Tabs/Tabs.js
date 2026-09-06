import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Tabs.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function Tabs({ tabs = [], value, activeValue, onChange, className, "aria-label": ariaLabel = "Tabs", }) {
    const selectedValue = value ?? activeValue ?? tabs[0]?.value;
    return (_jsx("div", { className: cx(styles.group, "joker-tab-group", className), role: "tablist", "aria-label": ariaLabel, "data-joker-tab-group": true, children: tabs.map((tab) => {
            const isSelected = tab.value === selectedValue;
            return (_jsxs("button", { type: "button", role: "tab", className: cx(styles.tab, "joker-tab", isSelected && styles.isSelected, isSelected && "is-selected"), "aria-selected": isSelected, "aria-label": tab.badge != null ? `${tab.label} (${tab.badge})` : tab.label, disabled: tab.disabled, "data-joker-tab": true, onClick: () => onChange?.(tab.value), children: [_jsx("span", { className: cx(styles.label, "joker-tab-label"), children: tab.label }), tab.badge != null ? (_jsx("span", { className: cx(styles.badge, "joker-tab-badge"), "aria-hidden": "true", children: tab.badge })) : null] }, tab.value));
        }) }));
}
