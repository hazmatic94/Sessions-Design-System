import type { HTMLAttributes, ReactNode } from "react";
export type DateRowVariant = "default" | "live";
export type DateRowProps = HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode;
    variant?: DateRowVariant;
    minutesPlayed?: number;
};
//# sourceMappingURL=DateRow.types.d.ts.map