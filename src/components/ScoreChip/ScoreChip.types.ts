import type { HTMLAttributes, ReactNode } from "react";

export type ScoreChipProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};
