import { type RefObject } from "react";
import { type RouletteNumber, type RoulettePocket, type RoulettePoint, type RouletteSpinSnapshot } from "./rouletteWheelLayout";
import { type RouletteSpinResult } from "../../utils/rouletteWheelSpin";
export type RouletteWheelSpinState = {
    wheelRotation: number;
    ballPosition: RoulettePoint;
    ballBounceScale: number;
    ballBounceLift: number;
    showBall: boolean;
    isSpinning: boolean;
    spinProgress: number;
    targetPocket: RoulettePocket | null;
    finalWheelRotation: number | null;
    displayedResult: number | null;
    snapshot: RouletteSpinSnapshot | null;
};
export type UseRouletteWheelSpinOptions = {
    durationMs?: number;
    /** Play the wheel spin sound for the duration of the animation. Defaults to true. */
    soundEnabled?: boolean;
    onSpinComplete?: (result: RouletteSpinResult) => void;
    /** When set, spin frames update this DOM node directly instead of React state (much faster on mobile). */
    wheelRootRef?: RefObject<HTMLElement | null>;
};
export declare function useRouletteWheelSpin({ durationMs, soundEnabled, onSpinComplete, wheelRootRef, }?: UseRouletteWheelSpinOptions): {
    spin: (winningNumber?: RouletteNumber) => void;
    wheelRotation: number;
    ballPosition: RoulettePoint;
    ballBounceScale: number;
    ballBounceLift: number;
    showBall: boolean;
    isSpinning: boolean;
    spinProgress: number;
    targetPocket: RoulettePocket | null;
    finalWheelRotation: number | null;
    displayedResult: number | null;
    snapshot: RouletteSpinSnapshot | null;
};
//# sourceMappingURL=useRouletteWheelSpin.d.ts.map