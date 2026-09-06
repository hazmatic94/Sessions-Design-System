import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ViewMarketsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
};
