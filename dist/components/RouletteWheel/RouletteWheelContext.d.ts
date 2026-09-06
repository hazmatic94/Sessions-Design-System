import { type ReactNode } from "react";
import type { RouletteWheelPaintIds } from "./RouletteWheelDefs";
import type { RoulettePocket, RoulettePoint } from "./rouletteWheelLayout";
import { ROULETTE_BOWL_CENTER, ROULETTE_WHEEL_CENTER } from "./rouletteWheelPaths";
import type { RouletteWheelTheme } from "./RouletteWheel.types";
export declare const DEFAULT_ROULETTE_WHEEL_THEME: Required<RouletteWheelTheme>;
export type RouletteWheelGeometry = {
    center: typeof ROULETTE_WHEEL_CENTER;
    bowlCenter: typeof ROULETTE_BOWL_CENTER;
    /** Pocket-layout anchor radius (pointer, pocket math). */
    outerRadius: number;
    /** Expanded static rim / outer ball-track radius. */
    frameOuterRadius: number;
    bowlRadius: number;
    ballTrackRadius: number;
};
export declare const ROULETTE_WHEEL_GEOMETRY: RouletteWheelGeometry;
export type RouletteWheelContextValue = {
    paintIds: RouletteWheelPaintIds;
    geometry: RouletteWheelGeometry;
    theme: Required<RouletteWheelTheme>;
    wheelRotation: number;
    ballPosition: RoulettePoint;
    ballBounceScale: number;
    ballBounceLift: number;
    showBall: boolean;
    showDebugVisual: boolean;
    targetPocket: RoulettePocket | null;
};
export type RouletteWheelProviderProps = {
    value: RouletteWheelContextValue;
    children: ReactNode;
};
export declare function RouletteWheelProvider({ value, children }: RouletteWheelProviderProps): import("react").JSX.Element;
export declare function useRouletteWheelContext(): RouletteWheelContextValue;
export declare function mergeRouletteWheelTheme(theme?: RouletteWheelTheme): Required<RouletteWheelTheme>;
//# sourceMappingURL=RouletteWheelContext.d.ts.map