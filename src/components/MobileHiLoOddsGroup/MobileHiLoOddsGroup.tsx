import { OddsButtonGroup } from "../OddsButtonGroup/index.js";
import type { MobileHiLoOddsGroupProps } from "./MobileHiLoOddsGroup.types.js";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function MobileHiLoOddsGroup({
  className,
  defaultValue,
  disabled = false,
  higherLabel = "Higher / Same",
  higherOdds = "30.76%",
  lowerLabel = "Lower / Same",
  lowerOdds = "76.39%",
  onHigherSame,
  onLowerSame,
  onValueChange,
  value,
}: MobileHiLoOddsGroupProps) {
  return (
    <OddsButtonGroup
      ariaLabel="HiLo choice"
      className={cx("joker-mobile-odds-group", "joker-mobile-hilo-odds-group", className)}
      defaultValue={defaultValue}
      disabled={disabled}
      label={null}
      layout="inline"
      onValueChange={onValueChange}
      showDirection
      showOdds={false}
      options={[
        {
          value: "lower",
          label: lowerLabel,
          odds: lowerOdds,
          direction: "down",
          onClick: onLowerSame,
        },
        {
          value: "higher",
          label: higherLabel,
          odds: higherOdds,
          direction: "up",
          onClick: onHigherSame,
        },
      ]}
      value={value}
    />
  );
}
