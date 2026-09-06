import { ROULETTE_FIXED_LANDING_POSITION, ROULETTE_POINTER_ANGLE, assertSpinPocketConsistency, computeFinalWheelRotation, createSpinSnapshot, findPocketUnderPointer, pickRandomTargetPocket, } from "../components/RouletteWheel/rouletteWheelLayout.js";
import { ROULETTE_BALL_TRACK_RADIUS, ROULETTE_OUTER_RADIUS, ROULETTE_WHEEL_CENTER, } from "../components/RouletteWheel/rouletteWheelPaths.js";
export const ROULETTE_SPIN_DURATION_MS = 5800;
/** Progress (0–1) when the wheel enters its deceleration / settling phase. */
export const ROULETTE_WHEEL_SETTLING_START_PROGRESS = 0.7;
const BALL_LANDING_START_PROGRESS = 0.85;
const BALL_DECELERATION_START_PROGRESS = 0.58;
const BALL_ORBIT_RADIUS = ROULETTE_OUTER_RADIUS - 34;
const BALL_SPIRAL_END_RADIUS = Math.hypot(ROULETTE_FIXED_LANDING_POSITION.x - ROULETTE_WHEEL_CENTER.x, ROULETTE_FIXED_LANDING_POSITION.y - ROULETTE_WHEEL_CENTER.y) + 48;
const BALL_SETTLE_BOUNCE_HEIGHT = 8;
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function lerp(start, end, t) {
    return start + (end - start) * t;
}
function lerpPoint(start, end, t) {
    return {
        x: lerp(start.x, end.x, t),
        y: lerp(start.y, end.y, t),
    };
}
function easeOutCubic(t) {
    const x = clamp(t, 0, 1);
    return 1 - (1 - x) ** 3;
}
function easeInCubic(t) {
    const x = clamp(t, 0, 1);
    return x ** 3;
}
function polarPosition(radius, angleDeg) {
    const radians = (angleDeg * Math.PI) / 180;
    return {
        x: ROULETTE_WHEEL_CENTER.x + Math.cos(radians) * radius,
        y: ROULETTE_WHEEL_CENTER.y + Math.sin(radians) * radius,
    };
}
function mechanicalBrake(t) {
    const x = clamp(t, 0, 1);
    return 1 - (1 - x) ** 2.6;
}
function wheelProgressCurve(progress) {
    const t = clamp(progress, 0, 1);
    if (t < 0.1) {
        const u = t / 0.1;
        return u * u * u * 0.12;
    }
    if (t < 0.7) {
        const u = (t - 0.1) / 0.6;
        return 0.12 + u * 0.66;
    }
    const u = (t - 0.7) / 0.3;
    return 0.78 + mechanicalBrake(u) * 0.22;
}
function ballDropOffsetFromPosition(point) {
    const dx = point.x - ROULETTE_WHEEL_CENTER.x;
    const dy = point.y - ROULETTE_WHEEL_CENTER.y;
    return Math.hypot(dx, dy) - ROULETTE_BALL_TRACK_RADIUS;
}
function ballAngularProgress(progress) {
    const t = clamp(progress, 0, 1);
    if (t < 0.12) {
        return easeInCubic(t / 0.12) * 0.18;
    }
    if (t < 0.7) {
        const u = (t - 0.12) / 0.58;
        return 0.18 + u * 0.64;
    }
    const u = (t - 0.7) / 0.3;
    return 0.82 + mechanicalBrake(u) * 0.18;
}
function ballSettleBounce(progress) {
    if (progress < 0.94 || progress >= 1) {
        return 0;
    }
    const u = (progress - 0.94) / 0.06;
    return Math.sin(u * Math.PI) * BALL_SETTLE_BOUNCE_HEIGHT;
}
export function sampleRouletteSpinFrame(progress, startWheel, endWheel, ballLaps = 7) {
    const t = clamp(progress, 0, 1);
    const wheelRotation = lerp(startWheel, endWheel, wheelProgressCurve(t));
    const orbitAngle = ROULETTE_POINTER_ANGLE - ballLaps * 360 * ballAngularProgress(t);
    const spiralProgress = clamp((t - BALL_DECELERATION_START_PROGRESS) /
        (BALL_LANDING_START_PROGRESS - BALL_DECELERATION_START_PROGRESS), 0, 1);
    const orbitRadius = lerp(BALL_ORBIT_RADIUS, BALL_SPIRAL_END_RADIUS, easeOutCubic(spiralProgress));
    const spiralPosition = polarPosition(orbitRadius, orbitAngle);
    const landingProgress = easeOutCubic((t - BALL_LANDING_START_PROGRESS) / (1 - BALL_LANDING_START_PROGRESS));
    const ballPosition = lerpPoint(spiralPosition, ROULETTE_FIXED_LANDING_POSITION, landingProgress);
    return {
        wheelRotation,
        ballPosition,
        ballBounceScale: 1,
        ballBounceLift: ballSettleBounce(t),
        progress: t,
        ballAngle: orbitAngle,
        ballDropOffset: ballDropOffsetFromPosition(ballPosition),
    };
}
export function runRouletteWheelSpin({ fromWheelRotation, targetPocket = pickRandomTargetPocket(), durationMs = ROULETTE_SPIN_DURATION_MS, extraWheelSpins = 5, ballLaps = 7, onFrame, onComplete, }) {
    const finalWheelRotation = computeFinalWheelRotation(fromWheelRotation, targetPocket, extraWheelSpins);
    const snapshot = createSpinSnapshot(targetPocket, finalWheelRotation, null);
    const startTime = performance.now();
    let rafId = 0;
    const tick = (now) => {
        const progress = clamp((now - startTime) / durationMs, 0, 1);
        const frame = sampleRouletteSpinFrame(progress, fromWheelRotation, finalWheelRotation, ballLaps);
        onFrame(frame, snapshot);
        if (progress < 1) {
            rafId = requestAnimationFrame(tick);
            return;
        }
        const settledBallPosition = ROULETTE_FIXED_LANDING_POSITION;
        const completedSnapshot = createSpinSnapshot(targetPocket, finalWheelRotation, targetPocket.value);
        assertSpinPocketConsistency(completedSnapshot, { requireDisplayedResult: true });
        const pocketAtBall = findPocketUnderPointer(finalWheelRotation);
        if (pocketAtBall.value !== targetPocket.value) {
            throw new Error(`Roulette alignment mismatch: pointer sees ${pocketAtBall.value}, target is ${targetPocket.value}`);
        }
        onComplete({
            targetPocket,
            finalWheelRotation,
            snapshot: completedSnapshot,
            wheelRotation: finalWheelRotation,
            ballPosition: settledBallPosition,
            ballBounceScale: 1,
            ballBounceLift: 0,
            ballAngle: ROULETTE_POINTER_ANGLE,
            ballDropOffset: ballDropOffsetFromPosition(settledBallPosition),
        });
    };
    onFrame(sampleRouletteSpinFrame(0, fromWheelRotation, finalWheelRotation, ballLaps), snapshot);
    rafId = requestAnimationFrame(tick);
    return () => {
        cancelAnimationFrame(rafId);
    };
}
/** @deprecated Use `ballDropOffset` */
export const ROULETTE_BALL_DROP_INSET_MAX = 0;
