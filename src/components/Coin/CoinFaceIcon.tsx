import { useId } from "react";
import { coinHeadPath } from "./coinHeadPath";
import { coinTailsPath } from "./coinTailsPath";
import { minesTileGemPaths, minesTileGemViewBox } from "../MinesTile/minesTileGemPaths";
import type { CoinSide } from "./Coin.types";

type CoinFaceIconProps = {
  side?: CoinSide;
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CoinFaceConfig = {
  paths: readonly string[];
  viewBox: string;
  gradient: { x1: string; y1: string; x2: string; y2: string };
};

const coinFaceConfig: Record<CoinSide, CoinFaceConfig> = {
  heads: {
    paths: [coinHeadPath],
    viewBox: "0 0 20 20",
    gradient: { x1: "3", y1: "0", x2: "17", y2: "20" },
  },
  tails: {
    paths: [coinTailsPath],
    viewBox: "0 0 19 20",
    gradient: { x1: "2", y1: "5", x2: "17", y2: "16" },
  },
  joker: {
    paths: minesTileGemPaths,
    viewBox: minesTileGemViewBox,
    gradient: { x1: "10", y1: "5", x2: "42", y2: "47" },
  },
};

export function CoinFaceIcon({ side = "heads", className }: CoinFaceIconProps) {
  const id = useId().replace(/:/g, "");
  const gradientId = `${id}-coin-face-gradient`;
  const reliefId = `${id}-coin-face-relief`;
  const face = coinFaceConfig[side];

  return (
    <svg
      className={cx("joker-coin__icon", className)}
      viewBox={face.viewBox}
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1={face.gradient.x1}
          y1={face.gradient.y1}
          x2={face.gradient.x2}
          y2={face.gradient.y2}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#c4a878" />
          <stop offset="0.32" stopColor="#8a6c40" />
          <stop offset="0.72" stopColor="#5c4424" />
          <stop offset="1" stopColor="#3e3018" />
        </linearGradient>
        <filter id={reliefId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0.42" dy="0.55" stdDeviation="0.22" floodColor="#140c06" floodOpacity="0.62" result="reliefShadow" />
          <feDropShadow dx="-0.26" dy="-0.34" stdDeviation="0.14" floodColor="#e8d4a8" floodOpacity="0.38" result="reliefHighlight" />
          <feDropShadow dx="0.12" dy="0.18" stdDeviation="0.08" floodColor="#1a1008" floodOpacity="0.35" result="reliefContact" />
          <feMerge>
            <feMergeNode in="reliefShadow" />
            <feMergeNode in="reliefContact" />
            <feMergeNode in="reliefHighlight" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#${reliefId})`}>
        {face.paths.map((path) => (
          <path key={path} d={path} fill={`url(#${gradientId})`} />
        ))}
      </g>
    </svg>
  );
}
