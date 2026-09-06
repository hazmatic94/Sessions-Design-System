export const COIN_TOSS_DURATION_MS = 1080;
/** Progress where compress ends and the coin launches upward. */
export const COIN_TOSS_LAUNCH_PROGRESS = 0.065;

export function getCoinTossLaunchDelayMs(durationMs = COIN_TOSS_DURATION_MS) {
  return Math.round(durationMs * COIN_TOSS_LAUNCH_PROGRESS);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function smoothstep(t) {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

/** Interpolate knot values with smooth easing between breakpoints. */
function sampleKnotCurve(progress, knots) {
  const p = clamp(progress, 0, 1);
  if (p <= knots[0][0]) {
    return knots[0][1];
  }

  for (let index = 1; index < knots.length; index += 1) {
    const [nextProgress, nextValue] = knots[index];
    if (p <= nextProgress) {
      const [prevProgress, prevValue] = knots[index - 1];
      const span = nextProgress - prevProgress;
      if (span <= 0) {
        return nextValue;
      }
      const localT = (p - prevProgress) / span;
      return lerp(prevValue, nextValue, smoothstep(localT));
    }
  }

  return knots[knots.length - 1][1];
}

/**
 * Six-phase toss curve:
 * 1. compress  2. launch  3. fast spin  4. slow final  5. landing  6. settle
 */
export function sampleCoinTossFrame(progress, options) {
  const p = clamp(progress, 0, 1);
  const { startRotateX, endRotateX, tiltZ, liftPx } = options;
  const rotationDelta = endRotateX - startRotateX;

  const rotationT = sampleKnotCurve(p, [
    [0, 0],
    [0.065, 0],
    [0.2, 0.08],
    [0.58, 0.82],
    [0.78, 0.94],
    [0.93, 1],
    [1, 1],
  ]);

  const liftT = sampleKnotCurve(p, [
    [0, 0],
    [0.065, 0],
    [0.2, 0.58],
    [0.58, 1],
    [0.78, 0.94],
    [0.93, 0],
    [1, 0],
  ]);

  const squashT = sampleKnotCurve(p, [
    [0, 0],
    [0.065, 1],
    [0.2, 0],
    [0.93, 0],
    [0.97, 1],
    [1, 0],
  ]);

  const tiltT = sampleKnotCurve(p, [
    [0, 0],
    [0.2, 0.62],
    [0.58, 1],
    [0.93, 0.28],
    [1, 0],
  ]);

  const shadowLiftT = sampleKnotCurve(p, [
    [0, 0],
    [0.065, 0.08],
    [0.2, 0.72],
    [0.58, 1],
    [0.93, 0],
    [1, 0],
  ]);

  const spinRateT = sampleKnotCurve(p, [
    [0, 0],
    [0.2, 0.18],
    [0.45, 1],
    [0.58, 0.92],
    [0.78, 0.34],
    [0.93, 0.08],
    [1, 0],
  ]);

  const compress = 1 - squashT * 0.04;
  const landingSquashX = 1 + squashT * 0.022;
  const landingSquashY = 1 - squashT * 0.03;

  const translateY = -liftPx * liftT;
  const rotateX = startRotateX + rotationDelta * rotationT;
  const rotateZ = tiltZ * tiltT;

  const shadowScale = lerp(1, 0.3, shadowLiftT);
  const shadowOpacity = lerp(0, 0.46, Math.min(shadowLiftT * 1.05, 1)) * (1 - p * 0.08);
  const shadowBlur = lerp(1, 1.5, shadowLiftT) * lerp(1, 0.82, p);
  const specularShift = spinRateT * 38;
  const specularOpacity = lerp(0.08, 0.36, spinRateT) * (1 - p * 0.35);
  const motionBlur = spinRateT * 0.95;

  return {
    progress: p,
    translateY,
    scaleX: compress * landingSquashX,
    scaleY: compress * landingSquashY,
    rotateX,
    rotateZ,
    shadowScale,
    shadowOpacity,
    shadowBlur,
    specularShift,
    specularOpacity,
    motionBlur,
  };
}

export function computeTossEndRotation(startDeg, outcome) {
  const fullSpins = 4 + Math.floor(Math.random() * 3);
  const startMod = ((startDeg % 360) + 360) % 360;
  const targetMod = outcome === "heads" ? 0 : 180;
  let delta = targetMod - startMod;
  if (delta <= 0) {
    delta += 360;
  }
  return startDeg + fullSpins * 360 + delta;
}

export function normalizeTossRestRotation(outcome) {
  return outcome === "heads" ? 0 : 180;
}

export function createTossTiltZ() {
  const sign = Math.random() > 0.5 ? 1 : -1;
  return sign * (2 + Math.random() * 2);
}

export function runCoinTossAnimation(options) {
  const {
    durationMs = COIN_TOSS_DURATION_MS,
    startRotateX,
    endRotateX,
    tiltZ,
    liftPx,
    onUpdate,
  } = options;

  const startTime = performance.now();

  return new Promise((resolve) => {
    const tick = (now) => {
      const progress = clamp((now - startTime) / durationMs, 0, 1);
      const frame = sampleCoinTossFrame(progress, { startRotateX, endRotateX, tiltZ, liftPx });
      onUpdate(frame);

      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }

      onUpdate(sampleCoinTossFrame(1, { startRotateX, endRotateX, tiltZ, liftPx }));
      resolve();
    };

    requestAnimationFrame(tick);
  });
}

export function getVisibleTossSide(rotateXDeg) {
  const mod = ((rotateXDeg % 360) + 360) % 360;
  return mod > 90 && mod < 270 ? "tails" : "heads";
}
