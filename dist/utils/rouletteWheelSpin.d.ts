import { type RoulettePocket, type RoulettePoint, type RouletteSpinSnapshot } from "../components/RouletteWheel/rouletteWheelLayout.js";
export declare const ROULETTE_SPIN_DURATION_MS = 5800;
/** Progress (0–1) when the wheel enters its deceleration / settling phase. */
export declare const ROULETTE_WHEEL_SETTLING_START_PROGRESS = 0.7;
export type RouletteSpinFrame = {
    wheelRotation: number;
    ballPosition: RoulettePoint;
    ballBounceScale: number;
    ballBounceLift: number;
    progress: number;
    /** @deprecated Derived from ball orbit during spin. */
    ballAngle: number;
    /** @deprecated Ball now lerps to `targetPocket.ballPosition`. */
    ballDropOffset: number;
};
export type RouletteSpinResult = {
    targetPocket: RoulettePocket;
    finalWheelRotation: number;
    snapshot: RouletteSpinSnapshot;
    wheelRotation: number;
    ballPosition: RoulettePoint;
    ballBounceScale: number;
    ballBounceLift: number;
    /** @deprecated */
    ballAngle: number;
    /** @deprecated */
    ballDropOffset: number;
};
export type RunRouletteWheelSpinOptions = {
    fromWheelRotation: number;
    /** Target pocket chosen once before the spin — drives every visual and logical output. */
    targetPocket?: RoulettePocket;
    durationMs?: number;
    extraWheelSpins?: number;
    /** Visual-only counter-clockwise laps; never affects the winning pocket. */
    ballLaps?: number;
    onFrame: (frame: RouletteSpinFrame, snapshot: RouletteSpinSnapshot) => void;
    onComplete: (result: RouletteSpinResult) => void;
};
export declare function sampleRouletteSpinFrame(progress: number, startWheel: number, endWheel: number, ballLaps?: number): RouletteSpinFrame;
export declare function runRouletteWheelSpin({ fromWheelRotation, targetPocket, durationMs, extraWheelSpins, ballLaps, onFrame, onComplete, }: RunRouletteWheelSpinOptions): () => void;
/** @deprecated Use `ballDropOffset` */
export declare const ROULETTE_BALL_DROP_INSET_MAX = 0;
//# sourceMappingURL=rouletteWheelSpin.d.ts.map