import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import { buildAnnulusPath } from "../rouletteWheelPocketGeometry";

/** Static outer frame — never rotates. */
export function OuterFrame() {
  const { paintIds, geometry } = useRouletteWheelContext();
  const { x: cx, y: cy } = geometry.center;
  const outerR = geometry.frameOuterRadius;
  const rimWidth = 22;

  return (
    <g className="joker-roulette-wheel__outer-frame">
      <ellipse
        cx={cx}
        cy={cy}
        rx={outerR + 5}
        ry={outerR + 5}
        fill={RW.rimShadow}
        opacity="0.38"
      />

      <circle cx={cx} cy={cy} r={outerR + 2} fill={RW.rimBaseOuter} />
      <circle cx={cx} cy={cy} r={outerR} fill={RW.rimBaseInner} />

      <circle
        cx={cx}
        cy={cy}
        r={outerR - rimWidth / 2}
        fill="none"
        stroke={`url(#${paintIds.rimGold})`}
        strokeWidth={rimWidth}
      />
      <circle
        cx={cx}
        cy={cy}
        r={outerR - rimWidth / 2}
        fill="none"
        stroke={`url(#${paintIds.brushedGold})`}
        strokeWidth={rimWidth - 5}
        opacity="0.22"
      />
      <circle
        cx={cx}
        cy={cy}
        r={outerR - 0.75}
        fill="none"
        stroke={`url(#${paintIds.rimEdge})`}
        strokeWidth="1.8"
      />
      <circle
        cx={cx}
        cy={cy}
        r={outerR - rimWidth + 0.75}
        fill="none"
        stroke={RW.black}
        strokeWidth="1.6"
        opacity="0.55"
      />

      <circle
        cx={cx}
        cy={cy}
        r={outerR - 2}
        fill={`url(#${paintIds.rimSpecular})`}
        opacity="0.7"
        style={{ mixBlendMode: "screen" }}
      />

      <path
        d={buildAnnulusPath(cx, cy, outerR - rimWidth - 6, outerR - rimWidth + 2)}
        fill={RW.black}
        opacity="0.5"
      />
    </g>
  );
}

/** @deprecated Use `OuterFrame` */
export const OuterRim = OuterFrame;
