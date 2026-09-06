import type { HTMLAttributes, ReactNode } from "react";

export type GameCardProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
