import { navigationItemRegistry } from "../../data/navigationData.js";
import { GameHeaderRail } from "../GameHeaderRail/index.js";
import type { RouletteGameHeaderRailProps } from "./RouletteGameHeaderRail.types.js";

export function RouletteGameHeaderRail({
  className,
  rightLabel = "Fair Play",
  rightIcon = "fair-play",
}: RouletteGameHeaderRailProps) {
  return (
    <GameHeaderRail
      game={navigationItemRegistry.roulette}
      className={className}
      rightLabel={rightLabel}
      rightIcon={rightIcon}
    />
  );
}
