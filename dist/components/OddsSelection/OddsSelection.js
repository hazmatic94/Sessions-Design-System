import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { OddsPanel } from "../OddsPanel/OddsPanel";
import { OddsRow } from "../OddsRow/OddsRow";
import styles from "./OddsSelection.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function OddsSelection({ options, selectedIndex, defaultSelectedIndex = null, onSelect, className, ...props }) {
    const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultSelectedIndex);
    const activeIndex = selectedIndex !== undefined ? selectedIndex : uncontrolledIndex;
    const handleSelect = (index, unavailable) => {
        if (unavailable)
            return;
        if (selectedIndex === undefined) {
            setUncontrolledIndex(index);
        }
        onSelect?.(index);
    };
    return (_jsxs("div", { ...props, className: cx(styles.group, "joker-odds-selection", className), "data-odds-selection": true, children: [_jsx("div", { className: cx(styles.labels, "joker-odds-selection__labels"), children: options.map((option) => (_jsx(OddsRow, { children: option.label }, option.label))) }), _jsx("div", { className: cx(styles.panels, "joker-odds-selection__panels"), children: options.map((option, index) => (_jsx(OddsPanel, { "data-odds-selection-panel": true, selected: activeIndex === index, unavailable: option.unavailable, onClick: () => handleSelect(index, option.unavailable), children: option.odds }, option.label))) })] }));
}
