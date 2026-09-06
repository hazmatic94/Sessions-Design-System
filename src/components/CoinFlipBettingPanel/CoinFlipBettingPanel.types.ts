import type { ButtonHTMLAttributes, ChangeEventHandler } from "react";
import type { OddsButtonGroupOption, OddsButtonGroupProps } from "../OddsButtonGroup/index.js";
import type { RoundsToWinInputProps, RoundsToWinOption } from "../RoundsToWinInput/index.js";

export type CoinFlipBettingPanelProps = {
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
  roundsToWinOptions?: RoundsToWinOption[];
  roundsToWinValue?: string;
  defaultRoundsToWinValue?: string;
  onRoundsToWinChange?: RoundsToWinInputProps["onChange"];
  onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  onCashout?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  inGame?: boolean;
  disablePlaceBetUntilBetAmount?: boolean;
  submitLabel?: string;
  flipCoinLabel?: string;
  cashoutLabel?: string;
  className?: string;
};
