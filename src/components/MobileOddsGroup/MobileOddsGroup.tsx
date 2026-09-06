import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
import type { MobileOddsGroupProps } from "./MobileOddsGroup.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MobileOddsGroup({
  ariaLabel = "Coin flip choice",
  className,
  defaultValue,
  disabled = false,
  onValueChange,
  options,
  value,
}: MobileOddsGroupProps) {
  return (
    <OddsButtonGroup
      ariaLabel={ariaLabel}
      className={cx("joker-mobile-odds-group", className)}
      defaultValue={defaultValue}
      disabled={disabled}
      label={null}
      layout="inline"
      onValueChange={onValueChange}
      options={options}
      showOdds={false}
      value={value}
    />
  );
}
