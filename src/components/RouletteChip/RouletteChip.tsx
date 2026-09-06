import type { CSSProperties } from "react";
import rouletteChipBlackSrc from "../../../assets/roulette-chip-black.svg";
import rouletteChipGreenSrc from "../../../assets/roulette-chip-green.svg";
import rouletteChipRedSrc from "../../../assets/roulette-chip-red.svg";
import type { RouletteChipColor, RouletteChipProps } from "./RouletteChip.types.js";
import "../../styles/roulette-chip.css";

const ROULETTE_CHIP_ART: Partial<Record<RouletteChipColor, string>> = {
  black: rouletteChipBlackSrc,
  green: rouletteChipGreenSrc,
  red: rouletteChipRedSrc,
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function RouletteChip({
  size,
  color = "black",
  children,
  className,
  style,
  ...props
}: RouletteChipProps) {
  const chipArtSrc = ROULETTE_CHIP_ART[color];

  const rootStyle = {
    ...(size !== undefined ? { "--roulette-chip-size": `${size}px` } : {}),
    ...style,
  } as CSSProperties;

  return (
    <div
      {...props}
      className={cx("joker-roulette-chip", `joker-roulette-chip--${color}`, className)}
      style={rootStyle}
      data-color={color}
    >
      {chipArtSrc ? (
        <img
          className="joker-roulette-chip__art"
          src={chipArtSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      ) : (
        <>
          <span className="joker-roulette-chip__disc" aria-hidden="true" />
          <span className="joker-roulette-chip__face" aria-hidden="true" />
          <span className="joker-roulette-chip__center" aria-hidden="true" />
        </>
      )}
      {children ? <span className="joker-roulette-chip__content">{children}</span> : null}
    </div>
  );
}
