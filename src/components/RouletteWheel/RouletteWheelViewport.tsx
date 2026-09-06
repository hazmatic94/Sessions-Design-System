import type { CSSProperties } from "react";
import { ROULETTE_WHEEL_NATIVE_WIDTH, rouletteWheelPointerBleedPx } from "./rouletteWheelPaths";
import type { RouletteWheelViewportProps } from "./RouletteWheelViewport.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Crop container — wheel stays top-center inside the area below the 40px animation inset. */
export function RouletteWheelViewport({
  wheelSize = ROULETTE_WHEEL_NATIVE_WIDTH,
  offsetY,
  className,
  style,
  children,
  ...props
}: RouletteWheelViewportProps) {
  const pointerBleed = rouletteWheelPointerBleedPx(wheelSize);
  const slotOffsetY = offsetY ?? 0;

  const viewportStyle = {
    "--roulette-wheel-size": `${wheelSize}px`,
    "--roulette-wheel-viewport-pointer-bleed": `${pointerBleed}px`,
    "--roulette-wheel-viewport-offset-y": `${slotOffsetY}px`,
    ...style,
  } as CSSProperties;

  return (
    <div {...props} className={cx("joker-roulette-wheel-viewport", className)} style={viewportStyle}>
      <div className="joker-roulette-wheel-viewport__slot">{children}</div>
    </div>
  );
}
