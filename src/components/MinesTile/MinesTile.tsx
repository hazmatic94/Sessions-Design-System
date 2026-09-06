import { useId, type MouseEvent } from "react";
import { playMineClickSound } from "../../utils/tileSounds";
import { mergeTileStackStyle } from "../../utils/tileStackStyles";
import { minesTileGemPaths, minesTileGemViewBox } from "./minesTileGemPaths";
import styles from "./MinesTile.module.css";
import type { MinesTileProps } from "./MinesTile.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function MinesTileIcon({ gradientId, unselected }: { gradientId: string; unselected: boolean }) {
  if (unselected) {
    return (
      <svg className={styles.icon} viewBox={minesTileGemViewBox} fill="none" aria-hidden="true" focusable="false">
        <g>
          {minesTileGemPaths.map((path) => (
            <path key={path} d={path} fill="var(--joker-black-300)" />
          ))}
        </g>
      </svg>
    );
  }

  const paint0 = `${gradientId}-0`;
  const paint1 = `${gradientId}-1`;
  const paint2 = `${gradientId}-2`;
  const paint3 = `${gradientId}-3`;
  const innerShadow = `${gradientId}-inner-shadow`;

  return (
    <svg className={styles.icon} viewBox={minesTileGemViewBox} fill="none" aria-hidden="true" focusable="false">
      <defs>
        <filter id={innerShadow} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
          <feOffset in="SourceAlpha" dx="0" dy="1.62" result="offset" />
          <feGaussianBlur in="offset" stdDeviation="0" result="blur" />
          <feComposite in="SourceAlpha" in2="blur" operator="out" result="inverse" />
          <feFlood floodColor="var(--mines-tile-icon-inner-shadow-color)" result="color" />
          <feComposite in="color" in2="inverse" operator="in" result="shadow" />
          <feComposite in="shadow" in2="SourceGraphic" operator="over" />
        </filter>
        {[paint0, paint1, paint2, paint3].map((paintId) => (
          <linearGradient key={paintId} id={paintId} x1="16.5323" y1="45.6977" x2="16.5323" y2="5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#444444" />
            <stop offset="1" stopColor="#3F3F3F" />
          </linearGradient>
        ))}
      </defs>
      <g filter={`url(#${innerShadow})`}>
        {[paint0, paint1, paint2, paint3].map((paintId, index) => (
          <path key={minesTileGemPaths[index]} d={minesTileGemPaths[index]} fill={`url(#${paintId})`} />
        ))}
      </g>
    </svg>
  );
}

export function MinesTile({
  className,
  selected = true,
  playClickSound = true,
  stackIndex,
  style,
  onClick,
  ...props
}: MinesTileProps) {
  const gradientId = useId().replace(/:/g, "");
  const unselected = !selected;

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!unselected && playClickSound) {
      playMineClickSound();
    }
    onClick?.(event);
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      style={mergeTileStackStyle(stackIndex, style)}
      className={cx(
        styles.root,
        "joker-mines-tile",
        unselected && styles.unselected,
        unselected && "joker-mines-tile--unselected",
        className,
      )}
      aria-hidden={props["aria-hidden"] ?? true}
    >
      <MinesTileIcon gradientId={gradientId} unselected={unselected} />
    </div>
  );
}
