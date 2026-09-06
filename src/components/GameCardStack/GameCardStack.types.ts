import type { HTMLAttributes, ReactNode } from "react";

export type GameCardStackProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};
