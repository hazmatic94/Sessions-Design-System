import type { HTMLAttributes, ReactNode } from "react";

export type ShowroomPillItem = {
  icon?: ReactNode;
  label: ReactNode;
  value: string;
};

export type ShowroomPillGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "onChange"> & {
  defaultValue?: string;
  items: ShowroomPillItem[];
  onValueChange?: (value: string) => void;
  value?: string;
};
