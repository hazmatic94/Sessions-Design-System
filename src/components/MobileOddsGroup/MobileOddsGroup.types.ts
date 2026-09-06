import type { OddsButtonGroupOption } from "../OddsButtonGroup/index.js";

export type MobileOddsGroupProps = {
  ariaLabel?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (value: string, option: OddsButtonGroupOption) => void;
  options: OddsButtonGroupOption[];
  value?: string;
};
