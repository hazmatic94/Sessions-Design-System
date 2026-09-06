/** European single-zero wheel order, clockwise from 0 at the pointer. */
export const EUROPEAN_ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
  14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
] as const;

import { ROULETTE_BALL_TRACK_RADIUS, ROULETTE_WHEEL_CENTER } from "./rouletteWheelPaths.js";
import { ROULETTE_BALL_LANDING_RADIUS as POCKET_BALL_RADIUS } from "./rouletteWheelPocketAngles.js";
import {
  ROULETTE_LABEL_RADIUS,
  ROULETTE_POCKET_CENTER,
  ROULETTE_POCKET_INNER_RADIUS,
  ROULETTE_POCKET_OUTER_RADIUS,
  buildAnnularSectorPath,
  polarToCartesian,
  type RoulettePoint,
} from "./rouletteWheelPocketGeometry.js";

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

function buildPocket(value: RouletteNumber, index: number): RoulettePocket {
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
    path: buildAnnularSectorPath(
      centerX,
      centerY,
      ROULETTE_POCKET_INNER_RADIUS,
      ROULETTE_POCKET_OUTER_RADIUS,
      startAngle,
      endAngle,
    ),
    labelPosition: polarToCartesian(centerX, centerY, ROULETTE_LABEL_RADIUS, centerAngle),
    ballPosition: polarToCartesian(
      centerX,
      centerY,
      POCKET_BALL_RADIUS,
      centerAngle,
    ),
  };
}

/** Frozen pocket table — single source of truth for wedge, label, ball, and result. */
export const ROULETTE_POCKETS: readonly RoulettePocket[] = Object.freeze(
  EUROPEAN_ROULETTE_NUMBERS.map((value, index) => buildPocket(value, index)),
);

/** Alias for the unified pocket table. */
export const POCKETS = ROULETTE_POCKETS;

/** Single ball settlement coordinate directly beneath the fixed pointer. */
export const ROULETTE_FIXED_LANDING_POSITION: RoulettePoint = Object.freeze(
  polarToCartesian(
    POCKET_GEOMETRY_CENTER.x,
    POCKET_GEOMETRY_CENTER.y,
    POCKET_BALL_RADIUS,
    ROULETTE_POINTER_ANGLE,
  ),
);

/** @deprecated Derived from `ROULETTE_POCKETS` for backward compatibility. */
export const ROULETTE_POCKET_CENTER_ANGLES = ROULETTE_POCKETS.map((pocket) => pocket.centerAngle);

/** @deprecated Derived from `ROULETTE_POCKETS` for backward compatibility. */
export const ROULETTE_BALL_LANDING_RADII = ROULETTE_POCKETS.map((pocket) => {
  const dx = pocket.ballPosition.x - POCKET_GEOMETRY_CENTER.x;
  const dy = pocket.ballPosition.y - POCKET_GEOMETRY_CENTER.y;
  return Math.hypot(dx, dy);
});

/** @deprecated Derived from landing radii. */
export const ROULETTE_BALL_LANDING_RADIUS =
  ROULETTE_BALL_LANDING_RADII.reduce((sum, radius) => sum + radius, 0) /
  ROULETTE_BALL_LANDING_RADII.length;

/** @deprecated Derived from landing radius. */
export const ROULETTE_BALL_TRACK_TO_POCKET_OFFSET =
  ROULETTE_BALL_LANDING_RADIUS - ROULETTE_BALL_TRACK_RADIUS;

/** @deprecated Uniform pockets — offset is always 0. */
export const ROULETTE_SVG_POCKET_OFFSET = 0;

const EUROPEAN_ROULETTE_RED_NUMBERS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);

export type RouletteNumber = (typeof EUROPEAN_ROULETTE_NUMBERS)[number];
export type RoulettePocketColor = "green" | "red" | "black";

/** Winner position within the five-pocket top window. */
export const LANDING_SLOT = 2;

export type RouletteSpinSnapshot = {
  targetPocket: RoulettePocket;
  highlightedPocket: RoulettePocket;
  displayedResult: number | null;
  ballLandingPocket: RoulettePocket;
  finalWheelRotation: number;
};

/** @deprecated Use `RouletteSpinSnapshot` */
export type RouletteWheelDebugInfo = RouletteSpinSnapshot;

export function isRouletteNumber(value: number): value is RouletteNumber {
  return EUROPEAN_ROULETTE_NUMBERS.includes(value as RouletteNumber);
}

/** Normalize into 0–360 for alignment comparisons only. */
export function normalizeDegrees(angle: number): number {
  return ((angle % 360) + 360) % 360;
}

export function normalizePocketIndex(pocketIndex: number): number {
  return ((pocketIndex % ROULETTE_POCKET_COUNT) + ROULETTE_POCKET_COUNT) % ROULETTE_POCKET_COUNT;
}

export function findPocketByIndex(index: number): RoulettePocket {
  return ROULETTE_POCKETS[normalizePocketIndex(index)];
}

export function findPocketByValue(value: number): RoulettePocket {
  const pocket = ROULETTE_POCKETS.find((entry) => entry.value === value);
  if (!pocket) {
    throw new RangeError(`Unknown roulette number: ${value}`);
  }
  return pocket;
}

export function getPocketIndexForNumber(number: number): number {
  return findPocketByValue(number).index;
}

/** @deprecated Use `findPocketByIndex(index).value` */
export function getNumberForPocketIndex(pocketIndex: number): RouletteNumber {
  return findPocketByIndex(pocketIndex).value;
}

export function getPocketColor(number: RouletteNumber): RoulettePocketColor {
  if (number === 0) {
    return "green";
  }
  if (EUROPEAN_ROULETTE_RED_NUMBERS.has(number)) {
    return "red";
  }
  return "black";
}

/** @deprecated Use `findPocketByIndex(index).centerAngle` */
export function getPocketCenterAngle(pocketIndex: number): number {
  return findPocketByIndex(pocketIndex).centerAngle;
}

/** @deprecated Use `findPocketByValue(number)` */
export function createWinningPocket(index: number): RoulettePocket {
  return findPocketByIndex(index);
}

/** @deprecated Use `findPocketByValue(number)` */
export function createWinningPocketForNumber(number: number): RoulettePocket {
  return findPocketByValue(number);
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForPocket(pocket: RoulettePocket): number {
  const dx = pocket.ballPosition.x - POCKET_GEOMETRY_CENTER.x;
  const dy = pocket.ballPosition.y - POCKET_GEOMETRY_CENTER.y;
  return Math.hypot(dx, dy);
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForPocketIndex(pocketIndex: number): number {
  return getBallLandingRadiusForPocket(findPocketByIndex(pocketIndex));
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForPocket(pocket: RoulettePocket): number {
  return getBallLandingRadiusForPocket(pocket) - ROULETTE_BALL_TRACK_RADIUS;
}

/** Five-pocket window centred on `targetPocket` in European wheel order. */
export function getVisiblePockets(
  targetPocket: RoulettePocket,
  pockets: readonly RoulettePocket[] = ROULETTE_POCKETS,
): readonly RoulettePocket[] {
  const targetIndex = targetPocket.index;
  const pocketCount = pockets.length;

  const visiblePockets = [
    pockets[(targetIndex - 2 + pocketCount) % pocketCount],
    pockets[(targetIndex - 1 + pocketCount) % pocketCount],
    pockets[targetIndex],
    pockets[(targetIndex + 1) % pocketCount],
    pockets[(targetIndex + 2) % pocketCount],
  ] as const;

  if (typeof process !== "undefined" && process?.env?.NODE_ENV !== "production") {
    console.assert(
      visiblePockets[2].value === targetPocket.value,
      "Centre visible pocket does not match target pocket",
    );
  }

  return visiblePockets;
}

export function getCentreVisiblePocket(
  targetPocket: RoulettePocket,
  pockets: readonly RoulettePocket[] = ROULETTE_POCKETS,
): RoulettePocket {
  return getVisiblePockets(targetPocket, pockets)[LANDING_SLOT];
}

export function findPocketAtStageAngle(
  wheelRotation: number,
  stageAngle: number,
): RoulettePocket {
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

export function findPocketUnderPointer(wheelRotation: number): RoulettePocket {
  return findPocketAtStageAngle(wheelRotation, ROULETTE_POINTER_ANGLE);
}

/**
 * Final accumulated wheel rotation that places `targetPocket` beneath the fixed pointer.
 * Accumulated rotation is never normalized — only the alignment delta uses 0–360.
 */
export function computeFinalWheelRotation(
  currentAccumulatedRotation: number,
  targetPocket: RoulettePocket,
  fullSpins: number,
): number {
  const alignmentMod = normalizeDegrees(ROULETTE_POINTER_ANGLE - targetPocket.centerAngle);
  const currentMod = normalizeDegrees(currentAccumulatedRotation);
  let delta = alignmentMod - currentMod;
  if (delta <= 0) {
    delta += 360;
  }
  return currentAccumulatedRotation + fullSpins * 360 + delta;
}

/** @deprecated Use `computeFinalWheelRotation` */
export function resolveWheelRotationForWinningPocket(
  currentRotation: number,
  winningPocket: RoulettePocket,
  extraSpins = 4,
): number {
  return computeFinalWheelRotation(currentRotation, winningPocket, extraSpins);
}

/** @deprecated Use `computeFinalWheelRotation` */
export function resolveWheelRotationForPocket(
  currentRotation: number,
  pocketIndex: number,
  extraSpins = 4,
): number {
  return computeFinalWheelRotation(currentRotation, findPocketByIndex(pocketIndex), extraSpins);
}

/** @deprecated Use `computeFinalWheelRotation` */
export function resolveWheelRotationForNumber(
  currentRotation: number,
  number: number,
  extraSpins = 4,
): number {
  return computeFinalWheelRotation(currentRotation, findPocketByValue(number), extraSpins);
}

/** Pick a winning number first, then resolve its pocket from the frozen table. */
export function pickRandomTargetPocket(
  allowedValues: readonly RouletteNumber[] = EUROPEAN_ROULETTE_NUMBERS,
): RoulettePocket {
  const pool = allowedValues.length > 0 ? allowedValues : EUROPEAN_ROULETTE_NUMBERS;
  const winningNumber = pool[Math.floor(Math.random() * pool.length)];
  return findPocketByValue(winningNumber);
}

/** @deprecated Use `pickRandomTargetPocket` */
export function pickRandomWinningPocket(): RoulettePocket {
  return pickRandomTargetPocket();
}

/** @deprecated Use `pickRandomTargetPocket().index` */
export function pickRandomPocketIndex(): number {
  return pickRandomTargetPocket().index;
}

/** @deprecated Use `pickRandomTargetPocket().value` */
export function pickRandomRouletteNumber(): RouletteNumber {
  return pickRandomTargetPocket().value;
}

export function createSpinSnapshot(
  targetPocket: RoulettePocket,
  finalWheelRotation: number,
  displayedResult: number | null = targetPocket.value,
): RouletteSpinSnapshot {
  return {
    targetPocket,
    highlightedPocket: targetPocket,
    displayedResult,
    ballLandingPocket: targetPocket,
    finalWheelRotation,
  };
}

export function assertSpinPocketConsistency(
  snapshot: RouletteSpinSnapshot,
  { requireDisplayedResult = false }: { requireDisplayedResult?: boolean } = {},
): void {
  if (typeof process !== "undefined" && process?.env?.NODE_ENV === "production") {
    return;
  }

  const { targetPocket, highlightedPocket, displayedResult, ballLandingPocket } = snapshot;
  const visiblePockets = getVisiblePockets(targetPocket);
  const centreVisiblePocket = visiblePockets[LANDING_SLOT];

  if (
    centreVisiblePocket.value !== targetPocket.value ||
    highlightedPocket.value !== targetPocket.value ||
    ballLandingPocket.value !== targetPocket.value ||
    (requireDisplayedResult && displayedResult !== targetPocket.value) ||
    (displayedResult != null && displayedResult !== targetPocket.value)
  ) {
    throw new Error(
      [
        "Roulette pocket mismatch:",
        `centre=${centreVisiblePocket.value}`,
        `target=${targetPocket.value}`,
        `highlighted=${highlightedPocket.value}`,
        `displayed=${displayedResult}`,
        `ballLanding=${ballLandingPocket.value}`,
      ].join(" "),
    );
  }
}

/** @deprecated Post-animation rotation lookup removed — use the spin target pocket instead. */
export function resolveWinningPocketFromRotation(_wheelRotation: number): RoulettePocket {
  throw new Error(
    "resolveWinningPocketFromRotation is disabled — use the spin targetPocket instead.",
  );
}

/** @deprecated Post-animation rotation lookup removed. */
export function getPocketIndexFromWheelRotation(_wheelRotation: number): number {
  throw new Error("getPocketIndexFromWheelRotation is disabled — use the spin targetPocket instead.");
}

/** @deprecated Post-animation rotation lookup removed. */
export function getResultNumberFromWheelRotation(_wheelRotation: number): RouletteNumber {
  throw new Error(
    "getResultNumberFromWheelRotation is disabled — use the spin targetPocket instead.",
  );
}

/** @deprecated Use `findPocketByIndex` */
export function getPocketBaseAngle(pocketIndex: number): number {
  return findPocketByIndex(pocketIndex).centerAngle;
}

/** @deprecated Use `findPocketByValue` */
export function getPocketBaseAngleForNumber(number: number): number {
  return findPocketByValue(number).centerAngle;
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForWinningPocket(winningPocket: RoulettePocket): number {
  return getBallLandingOffsetForPocket(winningPocket);
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForPocketIndex(pocketIndex: number): number {
  return getBallLandingOffsetForPocket(findPocketByIndex(pocketIndex));
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingOffsetForNumber(number: number): number {
  return getBallLandingOffsetForPocket(findPocketByValue(number));
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForWinningPocket(winningPocket: RoulettePocket): number {
  return getBallLandingRadiusForPocket(winningPocket);
}

/** @deprecated Use `pocket.ballPosition` */
export function getBallLandingRadiusForNumber(number: number): number {
  return getBallLandingRadiusForPocket(findPocketByValue(number));
}

/** @deprecated Use `createSpinSnapshot` */
export function getRouletteWheelDebugInfo(
  wheelRotation: number,
  targetPocket: RoulettePocket,
): RouletteSpinSnapshot {
  return createSpinSnapshot(targetPocket, wheelRotation);
}

/** @deprecated Use `findPocketByIndex` */
export function clockwiseOffsetFromPointer(angle: number): number {
  return normalizeDegrees(angle - ROULETTE_POINTER_ANGLE);
}

/** @deprecated Rotation lookup removed. */
export function getPointerAngleInWheelSpace(wheelRotation: number): number {
  return normalizeDegrees(ROULETTE_POINTER_ANGLE - normalizeDegrees(wheelRotation));
}

export type { RoulettePoint };
