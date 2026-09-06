import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ShowroomPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  label?: ReactNode;
  selected?: boolean;
};
