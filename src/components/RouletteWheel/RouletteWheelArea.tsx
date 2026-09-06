import type { CSSProperties, HTMLAttributes } from "react";
import { ROULETTE_WHEEL_VIEWPORT_AREA_INSET_TOP } from "./rouletteWheelPaths";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type RouletteWheelAreaProps = HTMLAttributes<HTMLDivElement> & {
  /** Top inset before the wheel crop — defaults to 40px. */
  insetTop?: number;
};

/** Fills the parent box — 40px top inset, wheel cropped top-center below it. */
export function RouletteWheelArea({
  insetTop = ROULETTE_WHEEL_VIEWPORT_AREA_INSET_TOP,
  className,
  style,
  children,
  ...props
}: RouletteWheelAreaProps) {
  const areaStyle = {
    "--roulette-wheel-viewport-area-inset-top": `${insetTop}px`,
    ...style,
  } as CSSProperties;

  return (
    <div {...props} className={cx("joker-roulette-wheel-area", className)} style={areaStyle}>
      {children}
    </div>
  );
}
