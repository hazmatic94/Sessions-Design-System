import type { HTMLAttributes, ReactNode } from "react";

export type EnterBetPrecursorProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  message?: ReactNode;
};
