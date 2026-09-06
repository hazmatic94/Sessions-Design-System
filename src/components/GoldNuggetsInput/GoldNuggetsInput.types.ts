import type { HTMLAttributes, ReactNode } from "react";

export type GoldNuggetsInputProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: ReactNode;
  value?: ReactNode;
  fullWidth?: boolean;
};
