import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { rouletteWheelViewBoxAttribute } from "../rouletteWheelPaths";
import { BallTrack } from "./BallTrack";
import { CenterBowl } from "./CenterBowl";
import { PocketRing } from "./PocketRing";
import { Spindle } from "./Spindle";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
/** Rotating wheel assembly — pockets, track, bowl and spindle spin together via CSS. */
export function WheelSpinner({ wheelRotation = 0, className, children }) {
    const { paintIds } = useRouletteWheelContext();
    const viewBox = rouletteWheelViewBoxAttribute();
    const spinnerStyle = {
        "--roulette-wheel-rotation": `${wheelRotation}deg`,
    };
    return (_jsx("div", { className: cx("joker-roulette-wheel__wheel-spinner", className), style: spinnerStyle, "aria-hidden": "true", children: _jsx("svg", { className: "joker-roulette-wheel__svg joker-roulette-wheel__svg--spinner", viewBox: viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", focusable: "false", children: _jsx("g", { className: "joker-roulette-wheel__spinner-assembly", filter: `url(#${paintIds.wheelShadow})`, children: children ?? (_jsxs(_Fragment, { children: [_jsx(PocketRing, {}), _jsx(BallTrack, {}), _jsx(CenterBowl, {}), _jsx(Spindle, {})] })) }) }) }));
}
/** @deprecated Use `WheelSpinner` */
export function Rotor({ wheelRotation = 0, children, }) {
    return _jsx(WheelSpinner, { wheelRotation: wheelRotation, children: children });
}
