import { useRouletteWheelContext } from "./RouletteWheelContext";

import { ROULETTE_WHEEL_CENTER } from "./rouletteWheelPaths";

const TARGET_STROKE = "var(--joker-gold-300)";
const TARGET_FILL = "color-mix(in srgb, var(--joker-gold-300) 14%, transparent)";

/** Temporary SVG overlay — outlines target / winning pocket vectors for alignment audits. */
export function RouletteWheelDebugVisual() {
  const { showDebugVisual, targetPocket } = useRouletteWheelContext();

  if (!showDebugVisual) {
    return null;
  }

  const pocket = targetPocket;
  if (pocket == null) {
    return null;
  }

  const { path, labelPosition, ballPosition, startAngle, endAngle, centerAngle } = pocket;
  const { x: centerX, y: centerY } = ROULETTE_WHEEL_CENTER;

  return (
    <g className="joker-roulette-wheel__debug-visual" aria-hidden="true" pointerEvents="none">
      <path
        d={path}
        fill={TARGET_FILL}
        stroke={TARGET_STROKE}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={centerX}
        y1={centerY}
        x2={labelPosition.x}
        y2={labelPosition.y}
        stroke={TARGET_STROKE}
        strokeWidth="1"
        strokeDasharray="4 3"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1={centerX}
        y1={centerY}
        x2={ballPosition.x}
        y2={ballPosition.y}
        stroke={TARGET_STROKE}
        strokeWidth="1"
        strokeDasharray="2 4"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={labelPosition.x}
        cy={labelPosition.y}
        r="6"
        fill={TARGET_STROKE}
        stroke="var(--joker-black-900)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={ballPosition.x}
        cy={ballPosition.y}
        r="6"
        fill={TARGET_STROKE}
        stroke="var(--joker-black-900)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <text
        x={labelPosition.x + 18}
        y={labelPosition.y - 14}
        fill={TARGET_STROKE}
        fontSize="11"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        {`i${pocket.index} a${startAngle.toFixed(1)}-${endAngle.toFixed(1)} c${centerAngle.toFixed(1)}`}
      </text>
    </g>
  );
}
