import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GameCardSuitIcon } from "../GameCardFace/GameCardFace.icons";
import styles from "./GameCardMiniFace.module.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
const RED_SUITS = new Set(["diamonds", "hearts"]);
function resolveColor(suit, color) {
    if (color) {
        return color;
    }
    return RED_SUITS.has(suit) ? "red" : "black";
}
function CornerMark({ rank, suit, className, }) {
    return (_jsxs("div", { className: className, children: [_jsx("span", { className: cx(styles.cornerRank, "joker-game-card-mini-face__corner-rank"), children: rank }), _jsx(GameCardSuitIcon, { suit: suit, className: cx(styles.cornerSuit, "joker-game-card-mini-face__corner-suit", "joker-game-card-mini-face__suit", `joker-game-card-mini-face__suit--${suit}`) })] }));
}
export function GameCardMiniFace({ rank, suit, color, className, ...props }) {
    const resolvedColor = resolveColor(suit, color);
    return (_jsxs("div", { ...props, className: cx(styles.root, "joker-game-card-mini-face", resolvedColor === "red" && styles.red, resolvedColor === "red" && "joker-game-card-mini-face--red", className), "aria-label": props["aria-label"] ?? `${rank} of ${suit}`, children: [_jsx(CornerMark, { rank: rank, suit: suit, className: cx(styles.cornerTop, "joker-game-card-mini-face__corner", "joker-game-card-mini-face__corner--top") }), _jsxs("div", { className: cx(styles.center, "joker-game-card-mini-face__center"), children: [_jsx(GameCardSuitIcon, { suit: suit, className: cx(styles.suit, "joker-game-card-mini-face__suit", `joker-game-card-mini-face__suit--${suit}`) }), _jsx("span", { className: cx(styles.rank, "joker-game-card-mini-face__rank"), children: rank })] }), _jsx(CornerMark, { rank: rank, suit: suit, className: cx(styles.cornerBottom, "joker-game-card-mini-face__corner", "joker-game-card-mini-face__corner--bottom") })] }));
}
