import type { CSSProperties } from "react";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { rouletteBallCssPositionFromPoint } from "../rouletteWheelBallStyle";

/** Independent ball layer — absolutely positioned, animated separately from the wheel. */
export function Ball() {
  const { ballPosition, ballBounceScale, ballBounceLift, showBall } = useRouletteWheelContext();

  if (!showBall) {
    return null;
  }

  const position = rouletteBallCssPositionFromPoint(ballPosition);
  const liftPx = `calc(var(--roulette-wheel-size) * ${ballBounceLift} / 1116)`;

  const style = {
    ...position,
    "--roulette-ball-bounce-scale": String(ballBounceScale),
    "--roulette-ball-bounce-lift": liftPx,
  } as CSSProperties;

  return (
    <div className="joker-roulette-wheel__ball" style={style} aria-hidden="true">
      <span className="joker-roulette-wheel__ball-shadow" />
      <span className="joker-roulette-wheel__ball-orb" />
    </div>
  );
}
