import type { ReactNode } from "react";
export type WheelSpinnerProps = {
    wheelRotation?: number;
    className?: string;
    children?: ReactNode;
};
/** Rotating wheel assembly — pockets, track, bowl and spindle spin together via CSS. */
export declare function WheelSpinner({ wheelRotation, className, children }: WheelSpinnerProps): import("react").JSX.Element;
/** @deprecated Use `WheelSpinner` */
export declare function Rotor({ wheelRotation, children, }: {
    wheelRotation?: number;
    children: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=WheelSpinner.d.ts.map