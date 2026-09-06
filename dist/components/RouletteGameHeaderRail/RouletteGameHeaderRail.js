import { jsx as _jsx } from "react/jsx-runtime";
import { navigationItemRegistry } from "../../data/navigationData.js";
import { GameHeaderRail } from "../GameHeaderRail/index.js";
export function RouletteGameHeaderRail({ className, rightLabel = "Fair Play", rightIcon = "fair-play", }) {
    return (_jsx(GameHeaderRail, { game: navigationItemRegistry.roulette, className: className, rightLabel: rightLabel, rightIcon: rightIcon }));
}
