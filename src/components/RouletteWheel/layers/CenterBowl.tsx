import { useRouletteWheelContext } from "../RouletteWheelContext";

export function CenterBowl() {
  const { paintIds, geometry } = useRouletteWheelContext();
  const { x: bowlX, y: bowlY } = geometry.bowlCenter;
  const bowlR = geometry.bowlRadius;

  return (
    <g className="joker-roulette-wheel__center-bowl">
      <circle cx={bowlX} cy={bowlY} r={bowlR} fill={`url(#${paintIds.bowlFill})`} />
      <circle
        cx={bowlX}
        cy={bowlY}
        r={bowlR - 1}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1.6"
      />
    </g>
  );
}
