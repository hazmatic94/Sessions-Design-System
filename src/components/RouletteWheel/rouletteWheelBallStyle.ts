import type { CSSProperties } from "react";
import type { RoulettePoint } from "./rouletteWheelLayout";
import {
  ROULETTE_BALL_TRACK_RADIUS,
  ROULETTE_BOWL_CENTER,
  rouletteWheelPointToPercent,
} from "./rouletteWheelPaths";

export function rouletteBallCssPositionFromPoint(point: RoulettePoint): CSSProperties {
  return rouletteWheelPointToPercent(point);
}

/** @deprecated Use `rouletteBallCssPositionFromPoint` with pocket `ballPosition`. */
export function rouletteBallPosition(angleDeg: number, dropOffset = 0) {
  const radius = ROULETTE_BALL_TRACK_RADIUS + dropOffset;
  const radians = (angleDeg * Math.PI) / 180;

  return {
    x: ROULETTE_BOWL_CENTER.x + Math.cos(radians) * radius,
    y: ROULETTE_BOWL_CENTER.y + Math.sin(radians) * radius,
  };
}

/** @deprecated Use `rouletteBallCssPositionFromPoint`. */
export function rouletteBallCssPosition(angleDeg: number, dropOffset = 0): CSSProperties {
  return rouletteBallCssPositionFromPoint(rouletteBallPosition(angleDeg, dropOffset));
}

/** @deprecated Use `dropOffset` — positive values move the ball outward into the pocket. */
export function rouletteBallPositionFromInset(angleDeg: number, dropInset = 0) {
  return rouletteBallPosition(angleDeg, -dropInset);
}
