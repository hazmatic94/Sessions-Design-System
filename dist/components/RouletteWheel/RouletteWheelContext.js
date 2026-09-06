import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { ROULETTE_FRAME_OUTER_RADIUS, } from "./rouletteWheelPocketGeometry";
import { ROULETTE_BALL_TRACK_RADIUS, ROULETTE_BOWL_RADIUS, ROULETTE_OUTER_RADIUS, ROULETTE_WHEEL_CENTER, } from "./rouletteWheelPaths";
import { DEFAULT_POCKET_BLACK, DEFAULT_POCKET_GREEN, DEFAULT_POCKET_RED, RW, } from "./rouletteWheelColors";
export const DEFAULT_ROULETTE_WHEEL_THEME = {
    numberFill: RW.number,
    pocketRed: [...DEFAULT_POCKET_RED],
    pocketBlack: [...DEFAULT_POCKET_BLACK],
    pocketGreen: [...DEFAULT_POCKET_GREEN],
};
export const ROULETTE_WHEEL_GEOMETRY = {
    center: ROULETTE_WHEEL_CENTER,
    bowlCenter: ROULETTE_WHEEL_CENTER,
    outerRadius: ROULETTE_OUTER_RADIUS,
    frameOuterRadius: ROULETTE_FRAME_OUTER_RADIUS,
    bowlRadius: ROULETTE_BOWL_RADIUS,
    ballTrackRadius: ROULETTE_BALL_TRACK_RADIUS,
};
const RouletteWheelContext = createContext(null);
export function RouletteWheelProvider({ value, children }) {
    return _jsx(RouletteWheelContext.Provider, { value: value, children: children });
}
export function useRouletteWheelContext() {
    const context = useContext(RouletteWheelContext);
    if (!context) {
        throw new Error("Roulette wheel layer components must be rendered inside <RouletteWheel>.");
    }
    return context;
}
export function mergeRouletteWheelTheme(theme) {
    return {
        numberFill: theme?.numberFill ?? DEFAULT_ROULETTE_WHEEL_THEME.numberFill,
        pocketRed: theme?.pocketRed ?? DEFAULT_ROULETTE_WHEEL_THEME.pocketRed,
        pocketBlack: theme?.pocketBlack ?? DEFAULT_ROULETTE_WHEEL_THEME.pocketBlack,
        pocketGreen: theme?.pocketGreen ?? DEFAULT_ROULETTE_WHEEL_THEME.pocketGreen,
    };
}
