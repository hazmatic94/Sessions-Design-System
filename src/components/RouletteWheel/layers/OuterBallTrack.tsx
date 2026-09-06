import { useRouletteWheelContext } from "../RouletteWheelContext";
import { RW } from "../rouletteWheelColors";
import {
  buildAnnulusPath,
  ROULETTE_OUTER_BALL_TRACK_INNER_RADIUS,
  ROULETTE_OUTER_BALL_TRACK_OUTER_RADIUS,
} from "../rouletteWheelPocketGeometry";

/** Fixed outer ball groove — thick lacquered glass ring between rim and pockets. */
export function OuterBallTrack() {
  const { paintIds, geometry } = useRouletteWheelContext();
  const { x: cx, y: cy } = geometry.center;
  const trackOuter = ROULETTE_OUTER_BALL_TRACK_OUTER_RADIUS;
  const trackInner = ROULETTE_OUTER_BALL_TRACK_INNER_RADIUS;
  const trackPath = buildAnnulusPath(cx, cy, trackInner, trackOuter);

  return (
    <g className="joker-roulette-wheel__outer-ball-track">
      <path
        d={trackPath}
        fill={`url(#${paintIds.ballTrackGlass})`}
        filter={`url(#${paintIds.ballTrackInset})`}
      />
      <path
        d={trackPath}
        fill={`url(#${paintIds.ballTrackShine})`}
        opacity="0.72"
        style={{ mixBlendMode: "screen" }}
      />
      <circle
        cx={cx}
        cy={cy}
        r={trackOuter - 0.5}
        fill="none"
        stroke={RW.trackHighlight}
        strokeWidth="1.4"
        opacity="0.42"
      />
      <circle
        cx={cx}
        cy={cy}
        r={trackOuter - 2}
        fill="none"
        stroke={RW.white}
        strokeWidth="0.6"
        opacity="0.1"
      />
      <circle
        cx={cx}
        cy={cy}
        r={trackInner}
        fill="none"
        stroke={RW.black}
        strokeWidth="4"
        opacity="0.72"
      />
      <circle
        cx={cx}
        cy={cy}
        r={trackInner + 1.5}
        fill="none"
        stroke={RW.trackInnerHighlight}
        strokeWidth="0.8"
        opacity="0.55"
      />
    </g>
  );
}
