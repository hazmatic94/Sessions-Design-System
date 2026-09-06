import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { OddsButtonDirection, OddsButtonSideIcon } from "../OddsButton/index.js";

export type OddsButtonGroupOption = {
  value: string;
  label: ReactNode;
  odds?: ReactNode;
  direction?: OddsButtonDirection;
  sideIcon?: OddsButtonSideIcon;
  disabled?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

export type OddsButtonGroupProps = {
  label?: ReactNode;
  options?: OddsButtonGroupOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: OddsButtonGroupOption) => void;
  layout?: "stacked" | "inline";
  showOdds?: boolean;
  showDirection?: boolean;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};
