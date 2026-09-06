import type { ButtonHTMLAttributes, ChangeEventHandler } from "react";
import type { OddsButtonGroupOption, OddsButtonGroupProps } from "../OddsButtonGroup/index.js";

export type RouletteBettingPanelProps = {
  layout?: "desktop" | "mobile";
  betAmount?: string | number;
  defaultBetAmount?: string | number;
  onBetAmountChange?: ChangeEventHandler<HTMLInputElement>;
  oddsOptions?: OddsButtonGroupOption[];
  oddsLayout?: OddsButtonGroupProps["layout"];
  showOdds?: boolean;
  selectedOddsValue?: string;
  defaultSelectedOddsValue?: string;
  onOddsValueChange?: (value: string, option: OddsButtonGroupOption) => void;
  onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  inGame?: boolean;
  disablePlaceBetUntilBetAmount?: boolean;
  submitLabel?: string;
  spinWheelLabel?: string;
  cashoutLabel?: string;
  className?: string;
};
