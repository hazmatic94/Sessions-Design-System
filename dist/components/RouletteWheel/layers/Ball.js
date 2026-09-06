import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    };
    return (_jsxs("div", { className: "joker-roulette-wheel__ball", style: style, "aria-hidden": "true", children: [_jsx("span", { className: "joker-roulette-wheel__ball-shadow" }), _jsx("span", { className: "joker-roulette-wheel__ball-orb" })] }));
}
