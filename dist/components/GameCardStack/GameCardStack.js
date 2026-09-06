import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GameCard } from "../GameCard/GameCard";
import styles from "./GameCardStack.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function GameCardStack({ children, className, ...props }) {
    return (_jsx("div", { ...props, className: cx(styles.root, "joker-game-card-stack", className), "aria-label": props["aria-label"] ?? "Game card stack", children: _jsxs("div", { className: cx(styles.stack, "joker-game-card-stack__cards"), children: [_jsx("div", { className: cx(styles.hoverZone, styles.hoverZoneLeft, "joker-game-card-stack__hover-zone", "joker-game-card-stack__hover-zone--left"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.hoverZone, styles.hoverZoneRight, "joker-game-card-stack__hover-zone", "joker-game-card-stack__hover-zone--right"), "aria-hidden": "true" }), _jsx("div", { className: cx(styles.layer, styles.layerBack, "joker-game-card-stack__layer", "joker-game-card-stack__layer--back"), "aria-hidden": "true", children: _jsx(GameCard, {}) }), _jsx("div", { className: cx(styles.layer, styles.layerMiddle, "joker-game-card-stack__layer", "joker-game-card-stack__layer--middle"), "aria-hidden": "true", children: _jsx(GameCard, {}) }), _jsx("div", { className: cx(styles.layer, styles.layerFront, "joker-game-card-stack__layer", "joker-game-card-stack__layer--front"), children: _jsx(GameCard, { children: children }) })] }) }));
}
