import assert from "node:assert/strict";
import test from "node:test";
import {
  EUROPEAN_ROULETTE_NUMBERS,
  LANDING_SLOT,
  POCKETS,
  ROULETTE_POINTER_ANGLE,
  ROULETTE_POCKET_COUNT,
  ROULETTE_POCKET_STEP,
  ROULETTE_POCKETS,
  assertSpinPocketConsistency,
  computeFinalWheelRotation,
  createSpinSnapshot,
  findPocketByIndex,
  findPocketByValue,
  findPocketUnderPointer,
  getCentreVisiblePocket,
  getPocketIndexForNumber,
  getVisiblePockets,
  normalizeDegrees,
  pickRandomTargetPocket,
} from "./rouletteWheelLayout.js";

test("european wheel order is the single source of truth", () => {
  assert.equal(EUROPEAN_ROULETTE_NUMBERS.length, 37);
  assert.equal(ROULETTE_POCKET_COUNT, 37);
  assert.equal(EUROPEAN_ROULETTE_NUMBERS[0], 0);
  assert.equal(getPocketIndexForNumber(14), 25);
  assert.equal(findPocketByIndex(25).value, 14);
});

test("POCKETS is the unified pocket table", () => {
  assert.equal(POCKETS, ROULETTE_POCKETS);
  assert.equal(ROULETTE_POCKETS.length, ROULETTE_POCKET_COUNT);
});

test("each pocket derives wedge, label, and ball from uniform segment angles", () => {
  for (let index = 0; index < ROULETTE_POCKET_COUNT; index += 1) {
    const pocket = ROULETTE_POCKETS[index];
    const startAngle = ROULETTE_POINTER_ANGLE - ROULETTE_POCKET_STEP / 2 + index * ROULETTE_POCKET_STEP;

    assert.equal(pocket.index, index);
    assert.equal(pocket.value, EUROPEAN_ROULETTE_NUMBERS[index]);
    assert.equal(pocket.startAngle, startAngle);
    assert.equal(pocket.endAngle, startAngle + ROULETTE_POCKET_STEP);
    assert.equal(pocket.centerAngle, startAngle + ROULETTE_POCKET_STEP / 2);
    assert.match(pocket.path, /^M /);
    assert.equal(typeof pocket.labelPosition.x, "number");
    assert.equal(typeof pocket.labelPosition.y, "number");
    assert.equal(typeof pocket.ballPosition.x, "number");
    assert.equal(typeof pocket.ballPosition.y, "number");
  }
});

test("findPocketByValue resolves the frozen pocket table", () => {
  const targetPocket = findPocketByValue(27);
  assert.equal(targetPocket.index, 11);
  assert.equal(targetPocket.value, 27);
});

test("computeFinalWheelRotation aligns target pocket beneath the pointer", () => {
  const targetPocket = findPocketByValue(14);
  const finalWheelRotation = computeFinalWheelRotation(0, targetPocket, 0);
  const alignmentMod = normalizeDegrees(ROULETTE_POINTER_ANGLE - targetPocket.centerAngle);

  assert.equal(normalizeDegrees(finalWheelRotation), alignmentMod);
  assert.equal(findPocketUnderPointer(finalWheelRotation).value, 14);
});

test("getVisiblePockets wraps around index 0 in European order", () => {
  const targetPocket = findPocketByIndex(0);
  const visiblePockets = getVisiblePockets(targetPocket);
  assert.deepEqual(
    visiblePockets.map((pocket) => pocket.value),
    [3, 26, 0, 32, 15],
  );
  assert.equal(visiblePockets[LANDING_SLOT].value, targetPocket.value);
});

test("getVisiblePockets neighbours match wheel sequence", () => {
  const targetPocket = findPocketByValue(27);
  const visiblePockets = getVisiblePockets(targetPocket);
  assert.deepEqual(
    visiblePockets.map((pocket) => pocket.value),
    [6, 13, 27, 36, 11],
  );
});

test("the fixed landing slot always contains the target pocket", () => {
  for (const targetPocket of ROULETTE_POCKETS) {
    const visiblePockets = getVisiblePockets(targetPocket);
    assert.equal(LANDING_SLOT, 2);
    assert.equal(visiblePockets[LANDING_SLOT], targetPocket);
    assert.equal(getCentreVisiblePocket(targetPocket), targetPocket);
  }
});

test("spin snapshot keeps every consumer on the same target pocket", () => {
  const targetPocket = findPocketByValue(14);
  const finalWheelRotation = computeFinalWheelRotation(120, targetPocket, 2);
  const snapshot = createSpinSnapshot(targetPocket, finalWheelRotation);

  assert.equal(snapshot.targetPocket, targetPocket);
  assert.equal(snapshot.highlightedPocket, targetPocket);
  assert.equal(snapshot.ballLandingPocket, targetPocket);
  assert.equal(snapshot.displayedResult, 14);
  assert.equal(snapshot.finalWheelRotation, finalWheelRotation);
  assertSpinPocketConsistency(snapshot);
});

test("every pocket uses the same angular width", () => {
  for (const pocket of ROULETTE_POCKETS) {
    const sweep = pocket.endAngle - pocket.startAngle;
    assert.equal(sweep, ROULETTE_POCKET_STEP);
  }
});

test("pickRandomTargetPocket returns a valid pocket from the frozen table", () => {
  const targetPocket = pickRandomTargetPocket();
  assert.equal(targetPocket, findPocketByValue(targetPocket.value));
});
