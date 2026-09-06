import type { ButtonHTMLAttributes, ReactNode } from "react";

export type OddsButtonDirection = "up" | "down";
export type OddsButtonSideIcon = "heads" | "tails" | "black" | "green" | "red";

export type OddsButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label?: ReactNode;
  odds?: ReactNode;
  direction?: OddsButtonDirection;
  sideIcon?: OddsButtonSideIcon;
  fullWidth?: boolean;
  showOdds?: boolean;
  showDirection?: boolean;
  selected?: boolean;
  /** Plays a short gold glow when this option becomes selected. */
  selectGlow?: boolean;
};
