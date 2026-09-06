/** European single-zero wheel order, clockwise from 0 at the pointer. */
export const EUROPEAN_ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
    14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
import { ROULETTE_BALL_TRACK_RADIUS } from "./rouletteWheelPaths.js";
import { ROULETTE_BALL_LANDING_RADIUS as POCKET_BALL_RADIUS } from "./rouletteWheelPocketAngles.js";
import { ROULETTE_LABEL_RADIUS, ROULETTE_POCKET_CENTER, ROULETTE_POCKET_INNER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS, buildAnnularSectorPath, polarToCartesian, } from "./rouletteWheelPocketGeometry.js";
export const ROULETTE_POCKET_COUNT = EUROPEAN_ROULETTE_NUMBERS.length;
export const ROULETTE_POCKET_STEP = 360 / ROULETTE_POCKET_COUNT;
export const ROULETTE_HALF_SEGMENT_ANGLE = ROULETTE_POCKET_STEP / 2;
/** @deprecated Use `ROULETTE_POCKET_STEP` */
export const ROULETTE_SEGMENT_ANGLE = ROULETTE_POCKET_STEP;
/** Fixed pointer in SVG space (12 o'clock). */
export const ROULETTE_POINTER_ANGLE = -90;
const POCKET_GEOMETRY_CENTER = ROULETTE_POCKET_CENTER;
/** Pocket 0 centre sits on the pointer when the wheel is at rest. */
const POCKET_BASE_ANGLE = ROULETTE_POINTER_ANGLE - ROULETTE_HALF_SEGMENT_ANGLE;
function buildPocket(value, index) {
    const segmentAngle = ROULETTE_POCKET_STEP;
    const startAngle = POCKET_BASE_ANGLE + index * segmentAngle;
    const endAngle = startAngle + segmentAngle;
    const centerAngle = startAngle + segmentAngle / 2;
    const { x: centerX, y: centerY } = POCKET_GEOMETRY_CENTER;
    return {
        index,
        value,
        startAngle,
        endAngle,
        centerAngle,
        path: buildAnnularSectorPath(centerX, centerY, ROULETTE_POCKET_INNER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS, startAngle, endAngle),
        labelPosition: polarToCartesian(centerX, centerY, ROULETTE_LABEL_RADIUS, centerAngle),
        ballPosition: polarToCartesian(centerX, centerY, POCKET_BALL_RADIUS, centerAngle),
    };
}
/** Frozen pocket table — single source of truth for wedge, label, ball, and result. */
export const ROULETTE_POCKETS = Object.freeze(EUROPEAN_ROULETTE_NUMBERS.map((value, index) => buildPocket(value, index)));
/** Alias for the unified pocket table. */
export const POCKETS = ROULETTE_POCKETS;
/** Single ball settlement coordinate directly beneath the fixed pointer. */
export const ROULETTE_FIXED_LANDING_POSITION = Object.freeze(polarToCartesian(POCKET_GEOMETRY_CENTER.x, POCKET_GEOMETRY_CENTER.y, POCKET_BALL_RADIUS, ROULETTE_POINTER_ANGLE));
/** @deprecated Derived from `ROULETTE_POCKETS` for backward compatibility. */
export const ROULETTE_POCKET_CENTER_ANGLES = ROULETTE_POCKETS.map((pocket) => pocket.centerAngle);
/** @deprecated Derived from `ROULETTE_POCKETS` for backward compatibility. */
export const ROULETTE_BALL_LANDING_RADII = ROULETTE_POCKETS.map((pocket) => {
    const dx = pocket.ballPosition.x - POCKET_GEOMETRY_CENTER.x;
    const dy = pocket.ballPosition.y - POCKET_GEOMETRY_CENTER.y;
    return Math.hypot(dx, dy);
});
/** @deprecated Derived from landing radii. */
export const ROULETTE_BALL_LANDING_RADIUS = ROULETTE_BALL_LANDING_RADII.reduce((sum, radius) => sum + radius, 0) /
    ROULETTE_BALL_LANDING_RADII.length;
/** @deprecated Derived from landing radius. */
export const ROULETTE_BALL_TRACK_TO_POCKET_OFFSET = ROULETTE_BALL_LANDING_RADIUS - ROULETTE_BALL_TRACK_RADIUS;
/** @deprecated Uniform pockets — offset is always 0. */
export const ROULETTE_SVG_POCKET_OFFSET = 0;
const EUROPEAN_ROULETTE_RED_NUMBERS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
/** Winner position within the five-pocket top window. */
export const LANDING_SLOT = 2;
export function isRouletteNumber(value) {
    return EUROPEAN_ROULETTE_NUMBERS.includes(value);
}
/** Normalize into 0–360 for alignment comparisons only. */
export function normalizeDegrees(angle) {
    return ((angle % 360) + 360) % 360;
}
export function normalizePocketIndex(pocketIndex) {
    return ((pocketIndex % ROULETTE_POCKET_COUNT) + ROULETTE_POCKET_COUNT) % ROULETTE_POCKET_COUNT;
}
export function findPocketByIndex(index) {
    return ROULETTE_POCKETS[normalizePocketIndex(index)];
}
export function findPocketByValue(value) {
    const pocket = ROULETTE_POCKETS.find((entry) => entry.value === value);
    if (!pocket) {
        throw new RangeError(`Unknown roulette number: ${value}`);
    }
    return pocket;
}
export function getPocketIndexForNumber(number) {
    return findPocketByValue(number).index;
}
/** @deprecated Use `findPocketByIndex(index).value` */
export function getNumberForPocketIndex(pocketIndex) {
    return findPocketByIndex(pocketIndex).value;
}
export function getPocketColor(number) {
    if (number === 0) {
        return "green";
    }
    if (EUROPEAN_ROULETTE_RED_NUMBERS.has(number)) {
        return "red";
    }
    return "black";
}
/** @deprecated Use `findPocketByIndex(index).centerAngle` */
export function getPocketCenterAngle(pocketIndex) {
    return findPocketByIndex(pocketIndex).centerAngle;
}
/** @deprecated Use `findPocketByValue(number)` */
export function createWinningPocket(index) {
    return findPocketByIndex(index);
}
/** @deprecated Use `findPocketByValue(number)` */
export function createWinningPocketForNumber(number) {
    return findPocketByValue(number);
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForPocket(pocket) {
    const dx = pocket.ballPosition.x - POCKET_GEOMETRY_CENTER.x;
    const dy = pocket.ballPosition.y - POCKET_GEOMETRY_CENTER.y;
    return Math.hypot(dx, dy);
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForPocketIndex(pocketIndex) {
    return getBallLandingRadiusForPocket(findPocketByIndex(pocketIndex));
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForPocket(pocket) {
    return getBallLandingRadiusForPocket(pocket) - ROULETTE_BALL_TRACK_RADIUS;
}
/** Five-pocket window centred on `targetPocket` in European wheel order. */
export function getVisiblePockets(targetPocket, pockets = ROULETTE_POCKETS) {
    const targetIndex = targetPocket.index;
    const pocketCount = pockets.length;
    const visiblePockets = [
        pockets[(targetIndex - 2 + pocketCount) % pocketCount],
        pockets[(targetIndex - 1 + pocketCount) % pocketCount],
        pockets[targetIndex],
        pockets[(targetIndex + 1) % pocketCount],
        pockets[(targetIndex + 2) % pocketCount],
    ];
    if (typeof process !== "undefined" && process?.env?.NODE_ENV !== "production") {
        console.assert(visiblePockets[2].value === targetPocket.value, "Centre visible pocket does not match target pocket");
    }
    return visiblePockets;
}
export function getCentreVisiblePocket(targetPocket, pockets = ROULETTE_POCKETS) {
    return getVisiblePockets(targetPocket, pockets)[LANDING_SLOT];
}
export function findPocketAtStageAngle(wheelRotation, stageAngle) {
    const angleOnWheel = normalizeDegrees(stageAngle - normalizeDegrees(wheelRotation));
    let best = ROULETTE_POCKETS[0];
    let bestDistance = Number.POSITIVE_INFINITY;
    for (const pocket of ROULETTE_POCKETS) {
        const distance = Math.abs(((pocket.centerAngle - angleOnWheel + 180) % 360) - 180);
        if (distance < bestDistance) {
            bestDistance = distance;
            best = pocket;
        }
    }
    return best;
}
export function findPocketUnderPointer(wheelRotation) {
    return findPocketAtStageAngle(wheelRotation, ROULETTE_POINTER_ANGLE);
}
/**
 * Final accumulated wheel rotation that places `targetPocket` beneath the fixed pointer.
 * Accumulated rotation is never normalized — only the alignment delta uses 0–360.
 */
export function computeFinalWheelRotation(currentAccumulatedRotation, targetPocket, fullSpins) {
    const alignmentMod = normalizeDegrees(ROULETTE_POINTER_ANGLE - targetPocket.centerAngle);
    const currentMod = normalizeDegrees(currentAccumulatedRotation);
    let delta = alignmentMod - currentMod;
    if (delta <= 0) {
        delta += 360;
    }
    return currentAccumulatedRotation + fullSpins * 360 + delta;
}
/** @deprecated Use `computeFinalWheelRotation` */
export function resolveWheelRotationForWinningPocket(currentRotation, winningPocket, extraSpins = 4) {
    return computeFinalWheelRotation(currentRotation, winningPocket, extraSpins);
}
/** @deprecated Use `computeFinalWheelRotation` */
export function resolveWheelRotationForPocket(currentRotation, pocketIndex, extraSpins = 4) {
    return computeFinalWheelRotation(currentRotation, findPocketByIndex(pocketIndex), extraSpins);
}
/** @deprecated Use `computeFinalWheelRotation` */
export function resolveWheelRotationForNumber(currentRotation, number, extraSpins = 4) {
    return computeFinalWheelRotation(currentRotation, findPocketByValue(number), extraSpins);
}
/** Pick a winning number first, then resolve its pocket from the frozen table. */
export function pickRandomTargetPocket(allowedValues = EUROPEAN_ROULETTE_NUMBERS) {
    const pool = allowedValues.length > 0 ? allowedValues : EUROPEAN_ROULETTE_NUMBERS;
    const winningNumber = pool[Math.floor(Math.random() * pool.length)];
    return findPocketByValue(winningNumber);
}
/** @deprecated Use `pickRandomTargetPocket` */
export function pickRandomWinningPocket() {
    return pickRandomTargetPocket();
}
/** @deprecated Use `pickRandomTargetPocket().index` */
export function pickRandomPocketIndex() {
    return pickRandomTargetPocket().index;
}
/** @deprecated Use `pickRandomTargetPocket().value` */
export function pickRandomRouletteNumber() {
    return pickRandomTargetPocket().value;
}
export function createSpinSnapshot(targetPocket, finalWheelRotation, displayedResult = targetPocket.value) {
    return {
        targetPocket,
        highlightedPocket: targetPocket,
        displayedResult,
        ballLandingPocket: targetPocket,
        finalWheelRotation,
    };
}
export function assertSpinPocketConsistency(snapshot, { requireDisplayedResult = false } = {}) {
    if (typeof process !== "undefined" && process?.env?.NODE_ENV === "production") {
        return;
    }
    const { targetPocket, highlightedPocket, displayedResult, ballLandingPocket } = snapshot;
    const visiblePockets = getVisiblePockets(targetPocket);
    const centreVisiblePocket = visiblePockets[LANDING_SLOT];
    if (centreVisiblePocket.value !== targetPocket.value ||
        highlightedPocket.value !== targetPocket.value ||
        ballLandingPocket.value !== targetPocket.value ||
        (requireDisplayedResult && displayedResult !== targetPocket.value) ||
        (displayedResult != null && displayedResult !== targetPocket.value)) {
        throw new Error([
            "Roulette pocket mismatch:",
            `centre=${centreVisiblePocket.value}`,
            `target=${targetPocket.value}`,
            `highlighted=${highlightedPocket.value}`,
            `displayed=${displayedResult}`,
            `ballLanding=${ballLandingPocket.value}`,
        ].join(" "));
    }
}
/** @deprecated Post-animation rotation lookup removed — use the spin target pocket instead. */
export function resolveWinningPocketFromRotation(_wheelRotation) {
    throw new Error("resolveWinningPocketFromRotation is disabled — use the spin targetPocket instead.");
}
/** @deprecated Post-animation rotation lookup removed. */
export function getPocketIndexFromWheelRotation(_wheelRotation) {
    throw new Error("getPocketIndexFromWheelRotation is disabled — use the spin targetPocket instead.");
}
/** @deprecated Post-animation rotation lookup removed. */
export function getResultNumberFromWheelRotation(_wheelRotation) {
    throw new Error("getResultNumberFromWheelRotation is disabled — use the spin targetPocket instead.");
}
/** @deprecated Use `findPocketByIndex` */
export function getPocketBaseAngle(pocketIndex) {
    return findPocketByIndex(pocketIndex).centerAngle;
}
/** @deprecated Use `findPocketByValue` */
export function getPocketBaseAngleForNumber(number) {
    return findPocketByValue(number).centerAngle;
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForWinningPocket(winningPocket) {
    return getBallLandingOffsetForPocket(winningPocket);
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForPocketIndex(pocketIndex) {
    return getBallLandingOffsetForPocket(findPocketByIndex(pocketIndex));
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForNumber(number) {
    return getBallLandingOffsetForPocket(findPocketByValue(number));
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForWinningPocket(winningPocket) {
    return getBallLandingRadiusForPocket(winningPocket);
}
/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForNumber(number) {
    return getBallLandingRadiusForPocket(findPocketByValue(number));
}
/** @deprecated Use `createSpinSnapshot` */
export function getRouletteWheelDebugInfo(wheelRotation, targetPocket) {
    return createSpinSnapshot(targetPocket, wheelRotation);
}
/** @deprecated Use `findPocketByIndex` */
export function clockwiseOffsetFromPointer(angle) {
    return normalizeDegrees(angle - ROULETTE_POINTER_ANGLE);
}
/** @deprecated Rotation lookup removed. */
export function getPointerAngleInWheelSpace(wheelRotation) {
    return normalizeDegrees(ROULETTE_POINTER_ANGLE - normalizeDegrees(wheelRotation));
}
