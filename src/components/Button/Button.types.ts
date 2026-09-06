import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "odds" | "hi-lo" | "hi-lo-skip" | "cashout";
export type ButtonSize = "small" | "medium" | "large";

type ButtonBaseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  label?: string;
  fullWidth?: boolean;
  loading?: boolean;
  selected?: boolean;
  /** Brief gold glow when an odds choice is newly selected. */
  selectGlow?: boolean;
};

export type ButtonProps =
  | (ButtonBaseProps & {
      variant?: "primary";
      size?: ButtonSize;
    })
  | (ButtonBaseProps & {
      variant: Exclude<ButtonVariant, "primary">;
      size?: never;
    });
