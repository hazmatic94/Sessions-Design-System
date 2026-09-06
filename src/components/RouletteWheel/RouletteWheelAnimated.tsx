import type { CSSProperties } from "react";
import { useRef } from "react";
import { Button } from "../Button";
import { RouletteWheel } from "./RouletteWheel";
import { RouletteWheelViewport } from "./RouletteWheelViewport";
import { RouletteWheelArea } from "./RouletteWheelArea";
import { ROULETTE_WHEEL_FILL_CONTAINER_SIZE, ROULETTE_WHEEL_NATIVE_WIDTH } from "./rouletteWheelPaths";
import { RouletteWheelDebugOverlay } from "./RouletteWheelDebugOverlay";
import type { RouletteNumber } from "./rouletteWheelLayout";
import type { RouletteWheelProps } from "./RouletteWheel.types";
import { useRouletteWheelSpin } from "./useRouletteWheelSpin";

export type RouletteWheelAnimatedProps = Omit<
  RouletteWheelProps,
  | "wheelRotation"
  | "ballPosition"
  | "ballBounceScale"
  | "ballBounceLift"
  | "showBall"
  | "targetPocket"
> & {
  spinDurationMs?: number;
  /** Play the wheel spin sound for the duration of the animation. Defaults to true. */
  soundEnabled?: boolean;
  onSpinComplete?: (resultNumber: RouletteNumber) => void;
  showSpinButton?: boolean;
  spinButtonLabel?: string;
  /** Temporary mapping audit overlay — remove once alignment is verified. */
  showDebugOverlay?: boolean;
  /**
   * Stretch to the parent container — 40px top animation inset, wheel top-center below it.
   * Place inside any sized box; overflow crops naturally by aspect ratio.
   */
  fillContainer?: boolean;
  /** Top animation inset when `fillContainer` — defaults to 40px. */
  insetTop?: number;
};

export function RouletteWheelAnimated({
  size,
  spinDurationMs,
  soundEnabled = true,
  onSpinComplete,
  showSpinButton = true,
  spinButtonLabel = "Spin",
  showDebugOverlay = false,
  fillContainer = false,
  insetTop,
  className,
  style,
  ...props
}: RouletteWheelAnimatedProps) {
  const resolvedSize = size ?? (fillContainer ? ROULETTE_WHEEL_FILL_CONTAINER_SIZE : ROULETTE_WHEEL_NATIVE_WIDTH);
  const wheelRootRef = useRef<HTMLDivElement>(null);
  const {
    wheelRotation,
    ballPosition,
    ballBounceScale,
    ballBounceLift,
    showBall,
    isSpinning,
    spinProgress,
    targetPocket,
    snapshot,
    spin,
  } = useRouletteWheelSpin({
    durationMs: spinDurationMs,
    soundEnabled,
    wheelRootRef,
    onSpinComplete: (result) => onSpinComplete?.(result.targetPocket.value),
  });

  const rootStyle = {
    display: "grid",
    justifyItems: "center",
    gap: "16px",
    ...style,
  } as CSSProperties;

  const wheel = (
    <RouletteWheel
      {...props}
      ref={wheelRootRef}
      size={resolvedSize}
      wheelRotation={wheelRotation}
      ballPosition={ballPosition}
      ballBounceScale={ballBounceScale}
      ballBounceLift={ballBounceLift}
      showBall={showBall}
      showDebugVisual={showDebugOverlay}
      targetPocket={targetPocket}
      aria-hidden={props["aria-hidden"] ?? false}
      performanceMode={fillContainer ? true : props.performanceMode}
    />
  );

  const controls = (
    <>
      {showDebugOverlay ? (
        <RouletteWheelDebugOverlay
          snapshot={snapshot}
          wheelRotation={wheelRotation}
          ballPosition={ballPosition}
          spinProgress={spinProgress}
        />
      ) : null}
      {showSpinButton ? (
        <Button type="button" variant="ghost" onClick={() => spin()} disabled={isSpinning}>
          {isSpinning ? "Spinning…" : spinButtonLabel}
        </Button>
      ) : null}
    </>
  );

  if (fillContainer) {
    return (
      <>
        <RouletteWheelArea insetTop={insetTop} className={className} style={style}>
          <RouletteWheelViewport wheelSize={resolvedSize}>{wheel}</RouletteWheelViewport>
        </RouletteWheelArea>
        {controls}
      </>
    );
  }

  return (
    <div className={className} style={rootStyle}>
      {wheel}
      {controls}
    </div>
  );
}
