import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, isValidElement } from "react";
import { rouletteWheelViewBoxAttribute } from "../rouletteWheelPaths";
import { OuterFrame } from "./OuterFrame";
import { Pointer } from "./Pointer";
import { PointerTickLayer } from "./PointerTickLayer";
const ROULETTE_POINTER_DISPLAY_NAME = "RouletteWheelPointer";
function isPointerElement(child) {
    if (!isValidElement(child)) {
        return false;
    }
    if (child.type === Pointer) {
        return true;
    }
    const type = child.type;
    return (type.displayName === ROULETTE_POINTER_DISPLAY_NAME ||
        type.name === ROULETTE_POINTER_DISPLAY_NAME);
}
/**
 * Fixed assembly: outer frame (bottom) and pointer (top overlay).
 * Pointer children are hoisted above the ball so the marker never moves.
 */
export function StaticFrame({ children }) {
    const childList = Children.toArray(children);
    const pointerLayers = [];
    const frameLayers = [];
    for (const child of childList) {
        if (isPointerElement(child)) {
            pointerLayers.push(child);
        }
        else {
            frameLayers.push(child);
        }
    }
    const viewBox = rouletteWheelViewBoxAttribute();
    return (_jsxs(_Fragment, { children: [_jsx("svg", { className: "joker-roulette-wheel__svg joker-roulette-wheel__svg--static", viewBox: viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", children: _jsx("g", { className: "joker-roulette-wheel__static-frame", children: frameLayers.length > 0 ? frameLayers : _jsx(OuterFrame, {}) }) }), pointerLayers.length > 0 ? (_jsx("svg", { className: "joker-roulette-wheel__svg joker-roulette-wheel__svg--pointer", viewBox: viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", children: _jsx(PointerTickLayer, { children: pointerLayers }) })) : null] }));
}
