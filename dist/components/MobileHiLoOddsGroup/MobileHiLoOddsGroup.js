import { jsx as _jsx } from "react/jsx-runtime";
import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function MobileHiLoOddsGroup({ className, defaultValue, disabled = false, higherLabel = "Higher / Same", higherOdds = "30.76%", lowerLabel = "Lower / Same", lowerOdds = "76.39%", onHigherSame, onLowerSame, onValueChange, value, }) {
    return (_jsx(OddsButtonGroup, { ariaLabel: "HiLo choice", className: cx("joker-mobile-odds-group", "joker-mobile-hilo-odds-group", className), defaultValue: defaultValue, disabled: disabled, label: null, layout: "inline", onValueChange: onValueChange, showDirection: true, showOdds: false, options: [
            {
                value: "lower",
                label: lowerLabel,
                odds: lowerOdds,
                direction: "down",
                onClick: onLowerSame,
            },
            {
                value: "higher",
                label: higherLabel,
                odds: higherOdds,
                direction: "up",
                onClick: onHigherSame,
            },
        ], value: value }));
}
