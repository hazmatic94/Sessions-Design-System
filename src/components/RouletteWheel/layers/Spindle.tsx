import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import { polarToCartesian } from "../rouletteWheelPocketGeometry";

const STUD_HALF_LENGTH = 11;
const STUD_HALF_WIDTH = 7;

/** Small four-point diamond deflector, long axis along the radial direction. */
function goldStud(centerX: number, centerY: number, angleDeg: number, radius: number) {
  const radians = (angleDeg * Math.PI) / 180;
  const ca = Math.cos(radians);
  const sa = Math.sin(radians);
  const px = centerX + ca * radius;
  const py = centerY + sa * radius;
  const inner = { x: px - ca * STUD_HALF_LENGTH, y: py - sa * STUD_HALF_LENGTH };
  const outer = { x: px + ca * STUD_HALF_LENGTH, y: py + sa * STUD_HALF_LENGTH };
  const left = { x: px + sa * STUD_HALF_WIDTH, y: py - ca * STUD_HALF_WIDTH };
  const right = { x: px - sa * STUD_HALF_WIDTH, y: py + ca * STUD_HALF_WIDTH };

  return `M ${inner.x} ${inner.y} L ${left.x} ${left.y} L ${outer.x} ${outer.y} L ${right.x} ${right.y} Z`;
}

/** Gold deflectors + simplified hub. */
export function Spindle() {
  const { paintIds, geometry } = useRouletteWheelContext();
  const { x: bowlX, y: bowlY } = geometry.bowlCenter;
  const trackR = geometry.ballTrackRadius;

  return (
    <g className="joker-roulette-wheel__spindle">
      <path d={goldStud(bowlX, bowlY, 25, trackR)} fill={`url(#${paintIds.goldLip})`} />
      <path d={goldStud(bowlX, bowlY, 155, trackR)} fill={`url(#${paintIds.goldLip})`} />
      <circle cx={bowlX} cy={bowlY} r="62" fill={`url(#${paintIds.hubFill})`} />
      <circle cx={bowlX} cy={bowlY} r="43" fill={RW.spindle55} />
      <circle cx={bowlX} cy={bowlY} r="25" fill={RW.spindle100} />
      <circle cx={bowlX} cy={bowlY} r="9" fill={`url(#${paintIds.hubCap})`} />
      <circle
        cx={bowlX}
        cy={bowlY}
        r="9"
        fill="none"
        stroke={RW.goldLip55}
        strokeWidth="0.8"
        opacity="0.55"
      />
    </g>
  );
}
