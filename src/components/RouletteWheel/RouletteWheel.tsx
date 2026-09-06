import type { CSSProperties, Ref } from "react";
import { forwardRef } from "react";
import { RouletteWheelStage } from "./RouletteWheelArt";
import { RouletteWheelBakedStage } from "./RouletteWheelBakedStage";
import {
  Ball,
  BallTrack,
  CenterBowl,
  OuterFrame,
  OuterRim,
  PocketRing,
  Pointer,
  Spindle,
  StaticFrame,
  WheelSpinner,
} from "./layers";
import type { RouletteWheelProps } from "./RouletteWheel.types";
import { ROULETTE_WHEEL_NATIVE_WIDTH, snapRouletteWheelDisplaySize } from "./rouletteWheelPaths";
import "../../styles/roulette-wheel.css";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const RouletteWheelRoot = forwardRef(function RouletteWheelRoot(
  {
    size = ROULETTE_WHEEL_NATIVE_WIDTH,
    wheelRotation = 0,
    ballPosition,
    ballBounceScale = 1,
    ballBounceLift = 0,
    showBall = false,
    showDebugVisual = false,
    targetPocket = null,
    performanceMode = false,
    renderMode = "baked",
    theme,
    children,
    className,
    style,
    ...props
  }: RouletteWheelProps,
  ref: Ref<HTMLDivElement>,
) {
  if (ballPosition == null) {
    throw new Error("RouletteWheel requires `ballPosition`.");
  }

  const crispSize = performanceMode ? size : snapRouletteWheelDisplaySize(size);
  const wheelStyle = {
    "--roulette-wheel-size": `${crispSize}px`,
    ...style,
  } as CSSProperties;

  return (
    <div
      {...props}
      ref={ref}
      className={cx("joker-roulette-wheel", performanceMode && "is-performance-mode", className)}
      style={wheelStyle}
      aria-hidden={props["aria-hidden"] ?? true}
      data-show-ball={showBall || undefined}
    >
      {renderMode === "vector" ? (
        <RouletteWheelStage
          wheelRotation={wheelRotation}
          ballPosition={ballPosition}
          ballBounceScale={ballBounceScale}
          ballBounceLift={ballBounceLift}
          showBall={showBall}
          showDebugVisual={showDebugVisual}
          targetPocket={targetPocket}
          theme={theme}
        >
          {children}
        </RouletteWheelStage>
      ) : (
        <RouletteWheelBakedStage
          wheelRotation={wheelRotation}
          ballPosition={ballPosition}
          ballBounceScale={ballBounceScale}
          ballBounceLift={ballBounceLift}
          showBall={showBall}
          theme={theme}
        />
      )}
    </div>
  );
});

export const RouletteWheel = Object.assign(RouletteWheelRoot, {
  StaticFrame,
  WheelSpinner,
  OuterFrame,
  OuterRim,
  PocketRing,
  BallTrack,
  CenterBowl,
  Spindle,
  Pointer,
  Ball,
});

export { RouletteWheelStage, RouletteWheelArt, Rotor } from "./RouletteWheelArt";
export {
  Ball,
  BallTrack,
  CenterBowl,
  OuterFrame,
  OuterRim,
  PocketRing,
  Pointer,
  Spindle,
  StaticFrame,
  WheelSpinner,
} from "./layers";
export { rouletteBallPosition, rouletteBallCssPosition, rouletteBallCssPositionFromPoint } from "./rouletteWheelBallStyle";
export { useRouletteWheelPaintIds } from "./RouletteWheelDefs";
export {
  mergeRouletteWheelTheme,
  ROULETTE_WHEEL_GEOMETRY,
  useRouletteWheelContext,
} from "./RouletteWheelContext";
export {
  rouletteWheelPointerBleedPx,
  rouletteWheelRenderHeightPx,
  ROULETTE_WHEEL_POINTER_BLEED_RATIO,
  ROULETTE_WHEEL_FILL_CONTAINER_SIZE,
  ROULETTE_WHEEL_NATIVE_WIDTH,
  ROULETTE_WHEEL_NATIVE_HEIGHT,
  ROULETTE_WHEEL_VIEWPORT_AREA_INSET_TOP,
  snapRouletteWheelDisplaySize,
} from "./rouletteWheelPaths";
export type { RouletteWheelArtProps } from "./RouletteWheel.types";
export type { RouletteWheelPaintIds } from "./RouletteWheelDefs";
export { RouletteWheelAnimated } from "./RouletteWheelAnimated";
export { RouletteWheelViewport } from "./RouletteWheelViewport";
export { RouletteWheelArea } from "./RouletteWheelArea";
export { RouletteWrapper } from "./RouletteWrapper";
export { useRouletteWheelSpin } from "./useRouletteWheelSpin";
export type { RouletteWheelAnimatedProps } from "./RouletteWheelAnimated";
export type { RouletteWheelViewportProps } from "./RouletteWheelViewport.types";
export type { RouletteWheelAreaProps } from "./RouletteWheelArea";
export type { RouletteWrapperProps } from "./RouletteWrapper";
export type { RouletteWheelSpinState, UseRouletteWheelSpinOptions } from "./useRouletteWheelSpin";
export {
  EUROPEAN_ROULETTE_NUMBERS,
  LANDING_SLOT,
  POCKETS,
  ROULETTE_FIXED_LANDING_POSITION,
  ROULETTE_POINTER_ANGLE,
  ROULETTE_POCKET_COUNT,
  ROULETTE_POCKET_STEP,
  ROULETTE_SEGMENT_ANGLE,
  ROULETTE_POCKET_CENTER_ANGLES,
  clockwiseOffsetFromPointer,
  getVisiblePockets,
  getCentreVisiblePocket,
  findPocketAtStageAngle,
  createWinningPocketForNumber,
  getNumberForPocketIndex,
  getPocketBaseAngle,
  getPocketCenterAngle,
  getPocketColor,
  getPocketIndexForNumber,
  getPocketIndexFromWheelRotation,
  getPointerAngleInWheelSpace,
  getResultNumberFromWheelRotation,
  getRouletteWheelDebugInfo,
  isRouletteNumber,
  normalizeDegrees,
  pickRandomPocketIndex,
  pickRandomRouletteNumber,
  pickRandomTargetPocket,
  pickRandomWinningPocket,
  resolveWheelRotationForNumber,
  resolveWheelRotationForPocket,
  resolveWheelRotationForWinningPocket,
  resolveWinningPocketFromRotation,
} from "./rouletteWheelLayout";
export type { RouletteSpinSnapshot as RouletteWheelDebugInfo, RoulettePocket, WinningPocket } from "./rouletteWheelLayout";
export type { RouletteNumber, RoulettePocketColor } from "./rouletteWheelLayout";
export {
  runRouletteWheelSpin,
  ROULETTE_SPIN_DURATION_MS,
  ROULETTE_WHEEL_SETTLING_START_PROGRESS,
} from "../../utils/rouletteWheelSpin";
export type { RouletteSpinFrame, RouletteSpinResult } from "../../utils/rouletteWheelSpin";
