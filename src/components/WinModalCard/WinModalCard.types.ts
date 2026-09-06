import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type WinModalCardProps = Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> & {
  title?: ReactNode;
  amountWon?: ReactNode;
  currency?: ReactNode;
  message?: ReactNode;
  messageHighlight?: ReactNode;
  balance?: ReactNode;
  iconSrc?: string;
  iconVideoSrc?: string;
  closeLabel?: ReactNode;
  flyToWallet?: boolean;
  walletSearchRoot?: ParentNode | null;
  onCoinsLand?: () => void;
  onClose?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};
