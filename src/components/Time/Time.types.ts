import type { HTMLAttributes, ReactNode } from "react";

export type TimeProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode;
};
