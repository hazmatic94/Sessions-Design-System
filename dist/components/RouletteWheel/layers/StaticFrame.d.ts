import { type ReactNode } from "react";
export type StaticFrameProps = {
    children?: ReactNode;
};
/**
 * Fixed assembly: outer frame (bottom) and pointer (top overlay).
 * Pointer children are hoisted above the ball so the marker never moves.
 */
export declare function StaticFrame({ children }: StaticFrameProps): import("react").JSX.Element;
//# sourceMappingURL=StaticFrame.d.ts.map