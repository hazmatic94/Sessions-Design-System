import type { HTMLAttributes, ReactNode } from "react";

export type TeamInfoProps = HTMLAttributes<HTMLDivElement> & {
  logoSrc: string;
  logoAlt?: string;
  children?: ReactNode;
};
