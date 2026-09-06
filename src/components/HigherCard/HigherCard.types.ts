import type { HTMLAttributes, ReactNode } from "react";

export type HigherCardProps = HTMLAttributes<HTMLDivElement> & {
  topLabel?: ReactNode;
  bottomLabel?: ReactNode;
  multiplier?: ReactNode;
};
