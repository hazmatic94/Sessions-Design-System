import { jsx as _jsx } from "react/jsx-runtime";
import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function MobileOddsGroup({ ariaLabel = "Coin flip choice", className, defaultValue, disabled = false, onValueChange, options, value, }) {
    return (_jsx(OddsButtonGroup, { ariaLabel: ariaLabel, className: cx("joker-mobile-odds-group", className), defaultValue: defaultValue, disabled: disabled, label: null, layout: "inline", onValueChange: onValueChange, options: options, showOdds: false, value: value }));
}
