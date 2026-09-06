import type { HTMLAttributes } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type RouletteWrapperProps = HTMLAttributes<HTMLDivElement>;

/**
 * Responsive viewport for the fixed-size roulette wheel in the game area slot.
 * Crops the wheel as the wrapper narrows or shortens; the wheel never resizes.
 */
export function RouletteWrapper({ className, children, ...props }: RouletteWrapperProps) {
  return (
    <div {...props} className={cx("joker-roulette-wrapper", className)}>
      <div className="joker-roulette-wrapper__wheel-slot">{children}</div>
    </div>
  );
}
