import type { RouletteWheelPaintIds } from "../RouletteWheelDefs";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { getPocketColor, ROULETTE_POCKETS, type RoulettePocket } from "../rouletteWheelLayout";
import type { RouletteWheelTheme } from "../RouletteWheel.types";
import {
  buildAnnularSectorPath,
  ROULETTE_NUMBER_TRACK_INNER_RADIUS,
  ROULETTE_POCKET_INNER_RADIUS,
  ROULETTE_POCKET_NUMBER_FONT_SIZE,
  ROULETTE_POCKET_OUTER_RADIUS,
} from "../rouletteWheelPocketGeometry";

const POCKET_WALL_DEPTH = 9;
const WELL_FLOOR_INSET = 4;

function pocketFill(paintIds: RouletteWheelPaintIds, theme: Required<RouletteWheelTheme>, value: RoulettePocket["value"]) {
  const color = getPocketColor(value);
  if (color === "green") {
    return `url(#${paintIds.pocketGreen})`;
  }
  if (color === "red") {
    return `url(#${paintIds.pocketRed})`;
  }
  return `url(#${paintIds.pocketBlack})`;
}

function pocketBandPath(
  pocket: RoulettePocket,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
) {
  return buildAnnularSectorPath(
    centerX,
    centerY,
    innerRadius,
    outerRadius,
    pocket.startAngle,
    pocket.endAngle,
  );
}

export function PocketRing() {
  const { paintIds, geometry, theme, showDebugVisual } = useRouletteWheelContext();
  const { x: cx, y: cy } = geometry.center;
  const wallOuter = ROULETTE_POCKET_INNER_RADIUS + POCKET_WALL_DEPTH;
  const wellOuter = ROULETTE_NUMBER_TRACK_INNER_RADIUS - WELL_FLOOR_INSET;
  const wellInner = wallOuter + 2;

  return (
    <>
      <g className="joker-roulette-wheel__pocket-ring">
        {ROULETTE_POCKETS.map((pocket) => (
          <path
            key={`pocket-${pocket.index}`}
            d={pocketBandPath(pocket, cx, cy, wellInner, wellOuter)}
            fill={pocketFill(paintIds, theme, pocket.value)}
          />
        ))}
      </g>

      <g className="joker-roulette-wheel__number-track" aria-hidden="true">
        {ROULETTE_POCKETS.map((pocket) => (
          <path
            key={`number-track-${pocket.index}`}
            d={pocketBandPath(pocket, cx, cy, ROULETTE_NUMBER_TRACK_INNER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS)}
            fill={pocketFill(paintIds, theme, pocket.value)}
          />
        ))}
      </g>

      <g className="joker-roulette-wheel__pocket-side-walls" aria-hidden="true">
        {ROULETTE_POCKETS.map((pocket) => (
          <path
            key={`walls-${pocket.index}`}
            d={pocketBandPath(pocket, cx, cy, ROULETTE_POCKET_INNER_RADIUS, wallOuter)}
            fill={`url(#${paintIds.bronzeWall})`}
            opacity="0.2"
          />
        ))}
      </g>

      <g className="joker-roulette-wheel__numbers">
        {ROULETTE_POCKETS.map((pocket) => (
          <g key={`label-${pocket.index}`}>
            <g transform={`rotate(${pocket.centerAngle + 90}, ${pocket.labelPosition.x}, ${pocket.labelPosition.y})`}>
              <text
                className="joker-roulette-wheel__number"
                data-pocket-value={pocket.value}
                x={pocket.labelPosition.x}
                y={pocket.labelPosition.y}
                fill={theme.numberFill}
                fontSize={ROULETTE_POCKET_NUMBER_FONT_SIZE}
                fontWeight="700"
                fontFamily="var(--font)"
                letterSpacing="-0.02em"
                textAnchor="middle"
                dominantBaseline="central"
                paintOrder="stroke fill"
                stroke="color-mix(in srgb, var(--joker-black-900) 78%, transparent)"
                strokeWidth={0.7}
                vectorEffect="non-scaling-stroke"
              >
                {pocket.value}
              </text>
            </g>
            {showDebugVisual ? (
              <text
                x={pocket.labelPosition.x + 14}
                y={pocket.labelPosition.y - 10}
                fill="var(--joker-gold-400)"
                fontSize="9"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                textAnchor="start"
                dominantBaseline="central"
              >
                {pocket.index}
              </text>
            ) : null}
          </g>
        ))}
      </g>
    </>
  );
}
