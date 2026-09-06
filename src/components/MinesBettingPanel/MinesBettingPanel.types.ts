import type { ButtonHTMLAttributes, ChangeEventHandler, ReactNode } from "react";
import type { MinesInGameCardProps } from "../MinesInGameCard/index.js";
import type { SelectOption } from "../Select/index.js";

export type MinesBettingPanelProps = {
  layout?: "desktop" | "mobile";
  onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  inGame?: boolean;
  cashoutLabel?: ReactNode;
  inGameCardProps?: MinesInGameCardProps;
  betAmount?: string | number;
  defaultBetAmount?: string | number;
  onBetAmountChange?: ChangeEventHandler<HTMLInputElement>;
  disablePlaceBetUntilBetAmount?: boolean;
  minesAmountOptions?: SelectOption[];
  minesAmount?: string;
  defaultMinesAmount?: string;
  onMinesAmountChange?: (value: string) => void;
  className?: string;
};
