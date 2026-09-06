import type { ReactNode } from "react";
import { RouletteWheelDefs, useRouletteWheelPaintIds } from "./RouletteWheelDefs";
import {
  mergeRouletteWheelTheme,
  ROULETTE_WHEEL_GEOMETRY,
  RouletteWheelProvider,
} from "./RouletteWheelContext";
import { Ball } from "./layers/Ball";
import { BallTrack } from "./layers/BallTrack";
import { CenterBowl } from "./layers/CenterBowl";
import { OuterBallTrack } from "./layers/OuterBallTrack";
import { OuterFrame } from "./layers/OuterFrame";
import { PocketRing } from "./layers/PocketRing";
import { PocketRingOutline } from "./layers/PocketRingOutline";
import { Pointer } from "./layers/Pointer";
import { Spindle } from "./layers/Spindle";
import { StaticFrame } from "./layers/StaticFrame";
import { WheelSpinner } from "./layers/WheelSpinner";
import { RouletteWheelDebugVisual } from "./RouletteWheelDebugVisual";
import {
  rouletteWheelSpinOriginPercent,
  rouletteWheelViewBoxAttribute,
} from "./rouletteWheelPaths";
import type { RouletteWheelArtProps } from "./RouletteWheel.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DefaultRouletteWheelLayout({ wheelRotation }: { wheelRotation: number }) {
  return (
    <>
      <StaticFrame>
        <OuterFrame />
        <Pointer />
      </StaticFrame>
      <WheelSpinner wheelRotation={wheelRotation}>
        <PocketRing />
        <BallTrack />
        <PocketRingOutline />
        <CenterBowl />
        <Spindle />
        <RouletteWheelDebugVisual />
      </WheelSpinner>
      <svg
        className="joker-roulette-wheel__svg joker-roulette-wheel__svg--outer-track"
        viewBox={rouletteWheelViewBoxAttribute()}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <OuterBallTrack />
      </svg>
      <Ball />
    </>
  );
}

export function RouletteWheelStage({
  wheelRotation = 0,
  ballPosition,
  ballBounceScale = 1,
  ballBounceLift = 0,
  showBall = false,
  showDebugVisual = false,
  targetPocket = null,
  theme,
  children,
  className,
  style,
}: RouletteWheelArtProps) {
  const paintIds = useRouletteWheelPaintIds();
  const resolvedTheme = mergeRouletteWheelTheme(theme);
  const spinOrigin = rouletteWheelSpinOriginPercent();

  if (ballPosition == null) {
    throw new Error("RouletteWheelStage requires `ballPosition`.");
  }

  const stageStyle = {
    "--roulette-spin-origin-x": spinOrigin.left,
    "--roulette-spin-origin-y": spinOrigin.top,
    ...style,
  };

  return (
    <div
      className={cx("joker-roulette-wheel__stage", className)}
      style={stageStyle}
    >
      <svg className="joker-roulette-wheel__defs" aria-hidden="true" focusable="false">
        <RouletteWheelDefs ids={paintIds} theme={theme} />
      </svg>

      <RouletteWheelProvider
        value={{
          paintIds,
          geometry: ROULETTE_WHEEL_GEOMETRY,
          theme: resolvedTheme,
          wheelRotation,
          ballPosition,
          ballBounceScale,
          ballBounceLift,
          showBall,
          showDebugVisual,
          targetPocket,
        }}
      >
        {children ?? <DefaultRouletteWheelLayout wheelRotation={wheelRotation} />}
      </RouletteWheelProvider>
    </div>
  );
}

/** @deprecated Use `RouletteWheelStage` */
export const RouletteWheelArt = RouletteWheelStage;

export { WheelSpinner, Rotor } from "./layers/WheelSpinner";

export function RouletteWheelAssembly({
  children,
  wheelRotation = 0,
}: {
  children?: ReactNode;
  wheelRotation?: number;
}) {
  return children ?? <DefaultRouletteWheelLayout wheelRotation={wheelRotation} />;
}
