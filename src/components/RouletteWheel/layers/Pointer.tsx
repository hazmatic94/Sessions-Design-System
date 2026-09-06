import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import {
  buildRoulettePointerBodyPath,
  ROULETTE_POINTER_BORDER_WIDTH,
} from "../rouletteWheelPaths";

export function Pointer() {
  const { paintIds, geometry } = useRouletteWheelContext();
  const { x: cx, y: cy } = geometry.center;
  const outerR = geometry.outerRadius;
  const body = buildRoulettePointerBodyPath(cx, cy, outerR);

  return (
    <g className="joker-roulette-wheel__pointer" filter={`url(#${paintIds.pointerMachined})`}>
      <path
        d={body}
        fill={`url(#${paintIds.pointerFill})`}
        stroke={RW.pointerOutline}
        strokeWidth={ROULETTE_POINTER_BORDER_WIDTH}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </g>
  );
}

Pointer.displayName = "RouletteWheelPointer";
