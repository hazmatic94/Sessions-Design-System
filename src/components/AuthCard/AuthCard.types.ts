import type { FormHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export type AuthCardProps = Omit<FormHTMLAttributes<HTMLFormElement>, "children" | "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  /** Home hero gold logo loop (`JokerGoldLogoV3.mp4` by default). */
  logoVideoSrc?: string;
  usernameLabel?: ReactNode;
  passwordLabel?: ReactNode;
  usernamePlaceholder?: string;
  passwordPlaceholder?: string;
  signInLabel?: string;
  usernameInputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder">;
  passwordInputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder">;
};
