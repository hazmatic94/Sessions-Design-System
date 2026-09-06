/** European single-zero wheel order, clockwise from 0 at the pointer. */
export declare const EUROPEAN_ROULETTE_NUMBERS: readonly [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
import { type RoulettePoint } from "./rouletteWheelPocketGeometry.js";
export declare const ROULETTE_POCKET_COUNT: 37;
export declare const ROULETTE_POCKET_STEP: number;
export declare const ROULETTE_HALF_SEGMENT_ANGLE: number;
/** @deprecated Use `ROULETTE_POCKET_STEP` */
export declare const ROULETTE_SEGMENT_ANGLE: number;
/** Fixed pointer in SVG space (12 o'clock). */
export declare const ROULETTE_POINTER_ANGLE = -90;
/** Canonical pocket — wedge, label, and ball all derive from the same uniform angles. */
export type RoulettePocket = {
    index: number;
    value: RouletteNumber;
    startAngle: number;
    endAngle: number;
    centerAngle: number;
    path: string;
    labelPosition: RoulettePoint;
    ballPosition: RoulettePoint;
};
/** @deprecated Use `RoulettePocket` */
export type WinningPocket = RoulettePocket;
/** Frozen pocket table — single source of truth for wedge, label, ball, and result. */
export declare const ROULETTE_POCKETS: readonly RoulettePocket[];
/** Alias for the unified pocket table. */
export declare const POCKETS: readonly RoulettePocket[];
/** Single ball settlement coordinate directly beneath the fixed pointer. */
export declare const ROULETTE_FIXED_LANDING_POSITION: RoulettePoint;
/** @deprecated Derived from `ROULETTE_POCKETS` for backward compatibility. */
export declare const ROULETTE_POCKET_CENTER_ANGLES: number[];
/** @deprecated Derived from `ROULETTE_POCKETS` for backward compatibility. */
export declare const ROULETTE_BALL_LANDING_RADII: number[];
/** @deprecated Derived from landing radii. */
export declare const ROULETTE_BALL_LANDING_RADIUS: number;
/** @deprecated Derived from landing radius. */
export declare const ROULETTE_BALL_TRACK_TO_POCKET_OFFSET: number;
/** @deprecated Uniform pockets — offset is always 0. */
export declare const ROULETTE_SVG_POCKET_OFFSET = 0;
export type RouletteNumber = (typeof EUROPEAN_ROULETTE_NUMBERS)[number];
export type RoulettePocketColor = "green" | "red" | "black";
/** Winner position within the five-pocket top window. */
export declare const LANDING_SLOT = 2;
export type RouletteSpinSnapshot = {
    targetPocket: RoulettePocket;
    highlightedPocket: RoulettePocket;
    displayedResult: number | null;
    ballLandingPocket: RoulettePocket;
    finalWheelRotation: number;
};
/** @deprecated Use `RouletteSpinSnapshot` */
export type RouletteWheelDebugInfo = RouletteSpinSnapshot;
export declare function isRouletteNumber(value: number): value is RouletteNumber;
/** Normalize into 0–360 for alignment comparisons only. */
export declare function normalizeDegrees(angle: number): number;
export declare function normalizePocketIndex(pocketIndex: number): number;
export declare function findPocketByIndex(index: number): RoulettePocket;
export declare function findPocketByValue(value: number): RoulettePocket;
export declare function getPocketIndexForNumber(number: number): number;
/** @deprecated Use `findPocketByIndex(index).value` */
export declare function getNumberForPocketIndex(pocketIndex: number): RouletteNumber;
export declare function getPocketColor(number: RouletteNumber): RoulettePocketColor;
/** @deprecated Use `findPocketByIndex(index).centerAngle` */
export declare function getPocketCenterAngle(pocketIndex: number): number;
/** @deprecated Use `findPocketByValue(number)` */
export declare function createWinningPocket(index: number): RoulettePocket;
/** @deprecated Use `findPocketByValue(number)` */
export declare function createWinningPocketForNumber(number: number): RoulettePocket;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingRadiusForPocket(pocket: RoulettePocket): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingRadiusForPocketIndex(pocketIndex: number): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingOffsetForPocket(pocket: RoulettePocket): number;
/** Five-pocket window centred on `targetPocket` in European wheel order. */
export declare function getVisiblePockets(targetPocket: RoulettePocket, pockets?: readonly RoulettePocket[]): readonly RoulettePocket[];
export declare function getCentreVisiblePocket(targetPocket: RoulettePocket, pockets?: readonly RoulettePocket[]): RoulettePocket;
export declare function findPocketAtStageAngle(wheelRotation: number, stageAngle: number): RoulettePocket;
export declare function findPocketUnderPointer(wheelRotation: number): RoulettePocket;
/**
 * Final accumulated wheel rotation that places `targetPocket` beneath the fixed pointer.
 * Accumulated rotation is never normalized — only the alignment delta uses 0–360.
 */
export declare function computeFinalWheelRotation(currentAccumulatedRotation: number, targetPocket: RoulettePocket, fullSpins: number): number;
/** @deprecated Use `computeFinalWheelRotation` */
export declare function resolveWheelRotationForWinningPocket(currentRotation: number, winningPocket: RoulettePocket, extraSpins?: number): number;
/** @deprecated Use `computeFinalWheelRotation` */
export declare function resolveWheelRotationForPocket(currentRotation: number, pocketIndex: number, extraSpins?: number): number;
/** @deprecated Use `computeFinalWheelRotation` */
export declare function resolveWheelRotationForNumber(currentRotation: number, number: number, extraSpins?: number): number;
/** Pick a winning number first, then resolve its pocket from the frozen table. */
export declare function pickRandomTargetPocket(allowedValues?: readonly RouletteNumber[]): RoulettePocket;
/** @deprecated Use `pickRandomTargetPocket` */
export declare function pickRandomWinningPocket(): RoulettePocket;
/** @deprecated Use `pickRandomTargetPocket().index` */
export declare function pickRandomPocketIndex(): number;
/** @deprecated Use `pickRandomTargetPocket().value` */
export declare function pickRandomRouletteNumber(): RouletteNumber;
export declare function createSpinSnapshot(targetPocket: RoulettePocket, finalWheelRotation: number, displayedResult?: number | null): RouletteSpinSnapshot;
export declare function assertSpinPocketConsistency(snapshot: RouletteSpinSnapshot, { requireDisplayedResult }?: {
    requireDisplayedResult?: boolean;
}): void;
/** @deprecated Post-animation rotation lookup removed — use the spin target pocket instead. */
export declare function resolveWinningPocketFromRotation(_wheelRotation: number): RoulettePocket;
/** @deprecated Post-animation rotation lookup removed. */
export declare function getPocketIndexFromWheelRotation(_wheelRotation: number): number;
/** @deprecated Post-animation rotation lookup removed. */
export declare function getResultNumberFromWheelRotation(_wheelRotation: number): RouletteNumber;
/** @deprecated Use `findPocketByIndex` */
export declare function getPocketBaseAngle(pocketIndex: number): number;
/** @deprecated Use `findPocketByValue` */
export declare function getPocketBaseAngleForNumber(number: number): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingOffsetForWinningPocket(winningPocket: RoulettePocket): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingOffsetForPocketIndex(pocketIndex: number): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingOffsetForNumber(number: number): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingRadiusForWinningPocket(winningPocket: RoulettePocket): number;
/** @deprecated Use `pocket.ballPosition` */
export declare function getBallLandingRadiusForNumber(number: number): number;
/** @deprecated Use `createSpinSnapshot` */
export declare function getRouletteWheelDebugInfo(wheelRotation: number, targetPocket: RoulettePocket): RouletteSpinSnapshot;
/** @deprecated Use `findPocketByIndex` */
export declare function clockwiseOffsetFromPointer(angle: number): number;
/** @deprecated Rotation lookup removed. */
export declare function getPointerAngleInWheelSpace(wheelRotation: number): number;
export type { RoulettePoint };
//# sourceMappingURL=rouletteWheelLayout.d.ts.map