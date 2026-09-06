import type { HTMLAttributes } from "react";
export type RouletteWheelAreaProps = HTMLAttributes<HTMLDivElement> & {
    /** Top inset before the wheel crop — defaults to 40px. */
    insetTop?: number;
};
/** Fills the parent box — 40px top inset, wheel cropped top-center below it. */
export declare function RouletteWheelArea({ insetTop, className, style, children, ...props }: RouletteWheelAreaProps): import("react").JSX.Element;
//# sourceMappingURL=RouletteWheelArea.d.ts.map