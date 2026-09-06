import { jsx as _jsx } from "react/jsx-runtime";
import { minesTileGemPaths, minesTileGemViewBox } from "../MinesTile/minesTileGemPaths";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function CoinReceiverEmblem({ className }) {
    return (_jsx("svg", { className: cx("joker-coin-receiver__emblem-svg", className), viewBox: minesTileGemViewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", children: _jsx("g", { children: minesTileGemPaths.map((path) => (_jsx("path", { d: path }, path))) }) }));
}
