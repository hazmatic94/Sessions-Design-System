import type { HTMLAttributes } from "react";

export type StatusChipProps = HTMLAttributes<HTMLSpanElement> & {
  matchCount: number;
};
