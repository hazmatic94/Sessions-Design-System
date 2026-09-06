import type { ButtonHTMLAttributes, ChangeEventHandler } from "react";
import type { SelectOption } from "../Select/index.js";

export type CocoHutDifficulty = "tourist" | "local" | "hunter" | "degenerate";

export type CocoHutBettingPanelProps = {
  layout?: "desktop" | "mobile";
  onPlaceBet?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  betAmount?: string | number;
  defaultBetAmount?: string | number;
  onBetAmountChange?: ChangeEventHandler<HTMLInputElement>;
  disablePlaceBetUntilBetAmount?: boolean;
  difficultyOptions?: SelectOption[];
  difficulty?: CocoHutDifficulty;
  defaultDifficulty?: CocoHutDifficulty;
  onDifficultyChange?: (value: CocoHutDifficulty) => void;
  className?: string;
};
