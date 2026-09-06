import { useId } from "react";
import {
  ROULETTE_BOWL_CENTER,
  ROULETTE_OUTER_RADIUS,
  ROULETTE_WHEEL_CENTER,
} from "./rouletteWheelPaths";
import { ROULETTE_FRAME_OUTER_RADIUS, ROULETTE_POCKET_OUTER_RADIUS } from "./rouletteWheelPocketGeometry";
import type { RouletteWheelTheme } from "./RouletteWheel.types";
import { mergeRouletteWheelTheme } from "./RouletteWheelContext";
import { RW } from "./rouletteWheelColors";

export type RouletteWheelPaintIds = {
  pocketRed: string;
  pocketBlack: string;
  pocketGreen: string;
  brushedGold: string;
  goldLip: string;
  bronzeWall: string;
  ballTrackLacquer: string;
  ballTrackGlass: string;
  ballTrackShine: string;
  bowlFill: string;
  hubFill: string;
  hubCap: string;
  pointerFill: string;
  pointerBevel: string;
  ballFill: string;
  wheelShadow: string;
  pocketInset: string;
  pocketWell: string;
  numberCrisp: string;
  pointerMachined: string;
  rotationLight: string;
  ballTrackInset: string;
  rimSpecular: string;
  rimGold: string;
  rimEdge: string;
  wellShade: string;
  wellRib: string;
};

export function useRouletteWheelPaintIds(): RouletteWheelPaintIds {
  const uid = useId().replace(/:/g, "");

  return {
    pocketRed: `${uid}-pocket-red`,
    pocketBlack: `${uid}-pocket-black`,
    pocketGreen: `${uid}-pocket-green`,
    brushedGold: `${uid}-brushed-gold`,
    goldLip: `${uid}-gold-lip`,
    bronzeWall: `${uid}-bronze-wall`,
    ballTrackLacquer: `${uid}-ball-track-lacquer`,
    ballTrackGlass: `${uid}-ball-track-glass`,
    ballTrackShine: `${uid}-ball-track-shine`,
    bowlFill: `${uid}-bowl-fill`,
    hubFill: `${uid}-hub-fill`,
    hubCap: `${uid}-hub-cap`,
    pointerFill: `${uid}-pointer-fill`,
    pointerBevel: `${uid}-pointer-bevel`,
    ballFill: `${uid}-ball-fill`,
    wheelShadow: `${uid}-wheel-shadow`,
    pocketInset: `${uid}-pocket-inset`,
    pocketWell: `${uid}-pocket-well`,
    numberCrisp: `${uid}-number-crisp`,
    pointerMachined: `${uid}-pointer-machined`,
    rotationLight: `${uid}-rotation-light`,
    ballTrackInset: `${uid}-ball-track-inset`,
    rimSpecular: `${uid}-rim-specular`,
    rimGold: `${uid}-rim-gold`,
    rimEdge: `${uid}-rim-edge`,
    wellShade: `${uid}-well-shade`,
    wellRib: `${uid}-well-rib`,
  };
}

type RouletteWheelDefsProps = {
  ids: RouletteWheelPaintIds;
  theme?: RouletteWheelTheme;
};

export function RouletteWheelDefs({ ids, theme }: RouletteWheelDefsProps) {
  const palette = mergeRouletteWheelTheme(theme);
  const { x: centerX, y: centerY } = ROULETTE_WHEEL_CENTER;
  const { x: bowlX, y: bowlY } = ROULETTE_BOWL_CENTER;
  const lightX = centerX - 36;
  const lightY = centerY - 36;

  return (
    <defs>
      <filter id={ids.wheelShadow} x="-14%" y="-12%" width="128%" height="130%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor={RW.black} floodOpacity="0.34" />
        <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor={RW.black} floodOpacity="0.2" />
        <feDropShadow dx="0" dy="1.5" stdDeviation="10" floodColor={RW.goldAmbientShadow} floodOpacity="0.05" />
      </filter>

      <filter id={ids.pocketInset} x="-6%" y="-6%" width="112%" height="112%" colorInterpolationFilters="sRGB">
        <feComponentTransfer in="SourceAlpha" result="pocket-inverse-alpha">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur in="pocket-inverse-alpha" stdDeviation="1.35" result="pocket-blur" />
        <feOffset in="pocket-blur" dx="0.35" dy="1.8" result="pocket-shadow-offset" />
        <feComposite
          in="pocket-shadow-offset"
          in2="SourceAlpha"
          operator="in"
          result="pocket-inner-shadow-mask"
        />
        <feFlood floodColor={RW.black} floodOpacity="0.48" result="pocket-shadow-color" />
        <feComposite
          in="pocket-shadow-color"
          in2="pocket-inner-shadow-mask"
          operator="in"
          result="pocket-inner-shadow"
        />
        <feGaussianBlur in="pocket-inverse-alpha" stdDeviation="0.35" result="pocket-highlight-blur" />
        <feOffset in="pocket-highlight-blur" dx="-0.3" dy="-0.85" result="pocket-highlight-offset" />
        <feComposite
          in="pocket-highlight-offset"
          in2="SourceAlpha"
          operator="in"
          result="pocket-inner-highlight-mask"
        />
        <feFlood floodColor={RW.white} floodOpacity="0.09" result="pocket-highlight-color" />
        <feComposite
          in="pocket-highlight-color"
          in2="pocket-inner-highlight-mask"
          operator="in"
          result="pocket-inner-highlight"
        />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="pocket-inner-shadow" />
          <feMergeNode in="pocket-inner-highlight" />
        </feMerge>
      </filter>

      <filter id={ids.pocketWell} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
        <feComponentTransfer in="SourceAlpha" result="well-inverse-alpha">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur in="well-inverse-alpha" stdDeviation="1.55" result="well-blur" />
        <feOffset in="well-blur" dx="0.2" dy="1.9" result="well-offset" />
        <feComposite in="well-offset" in2="SourceAlpha" operator="in" result="well-mask" />
        <feFlood floodColor={RW.black} floodOpacity="0.5" result="well-color" />
        <feComposite in="well-color" in2="well-mask" operator="in" result="well-inner-shadow" />
        <feGaussianBlur in="well-inverse-alpha" stdDeviation="0.3" result="well-highlight-blur" />
        <feOffset in="well-highlight-blur" dx="-0.15" dy="-0.65" result="well-highlight-offset" />
        <feComposite in="well-highlight-offset" in2="SourceAlpha" operator="in" result="well-highlight-mask" />
        <feFlood floodColor={RW.white} floodOpacity="0.07" result="well-highlight-color" />
        <feComposite in="well-highlight-color" in2="well-highlight-mask" operator="in" result="well-inner-highlight" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="well-inner-shadow" />
          <feMergeNode in="well-inner-highlight" />
        </feMerge>
      </filter>

      <filter id={ids.ballTrackInset} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
        <feComponentTransfer in="SourceAlpha" result="track-inverse-alpha">
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur in="track-inverse-alpha" stdDeviation="2.1" result="track-blur" />
        <feOffset in="track-blur" dx="0" dy="2.6" result="track-shadow-offset" />
        <feComposite in="track-shadow-offset" in2="SourceAlpha" operator="in" result="track-shadow-mask" />
        <feFlood floodColor={RW.black} floodOpacity="0.54" result="track-shadow-color" />
        <feComposite in="track-shadow-color" in2="track-shadow-mask" operator="in" result="track-inner-shadow" />
        <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="track-outer-blur" />
        <feOffset in="track-outer-blur" dx="0" dy="-1.1" result="track-outer-offset" />
        <feComposite in="track-outer-offset" in2="SourceAlpha" operator="out" result="track-outer-mask" />
        <feFlood floodColor={RW.goldAmbientShadow} floodOpacity="0.14" result="track-outer-color" />
        <feComposite in="track-outer-color" in2="track-outer-mask" operator="in" result="track-outer-glow" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="track-inner-shadow" />
          <feMergeNode in="track-outer-glow" />
        </feMerge>
      </filter>

      <filter id={ids.numberCrisp} x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="0.75" stdDeviation="0" floodColor={RW.black} floodOpacity="0.62" />
      </filter>

      <filter id={ids.pointerMachined} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
        <feDropShadow dx="0" dy="1.6" stdDeviation="0.75" floodColor={RW.black} floodOpacity="0.36" />
        <feDropShadow dx="0" dy="0.45" stdDeviation="0.15" floodColor={RW.bronzeShadow} floodOpacity="0.28" />
      </filter>

      <radialGradient
        id={ids.pocketRed}
        cx={centerX}
        cy={centerY}
        r={ROULETTE_POCKET_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="72%" stopColor={palette.pocketRed[2]} />
        <stop offset="90%" stopColor={palette.pocketRed[1]} />
        <stop offset="100%" stopColor={palette.pocketRed[0]} stopOpacity="0.9" />
      </radialGradient>

      <radialGradient
        id={ids.pocketBlack}
        cx={centerX}
        cy={centerY}
        r={ROULETTE_POCKET_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="72%" stopColor={palette.pocketBlack[2]} />
        <stop offset="90%" stopColor={palette.pocketBlack[1]} />
        <stop offset="100%" stopColor={palette.pocketBlack[0]} stopOpacity="0.9" />
      </radialGradient>

      <radialGradient
        id={ids.pocketGreen}
        cx={centerX}
        cy={centerY}
        r={ROULETTE_POCKET_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="72%" stopColor={palette.pocketGreen[2]} />
        <stop offset="90%" stopColor={palette.pocketGreen[1]} />
        <stop offset="100%" stopColor={palette.pocketGreen[0]} stopOpacity="0.9" />
      </radialGradient>

      <linearGradient
        id={ids.rimGold}
        x1={centerX}
        y1={centerY - ROULETTE_FRAME_OUTER_RADIUS}
        x2={centerX}
        y2={centerY + ROULETTE_FRAME_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={RW.rimGoldTopEdge} />
        <stop offset="7%" stopColor={RW.rimGoldTop} />
        <stop offset="26%" stopColor={RW.rimGoldUpper} />
        <stop offset="52%" stopColor={RW.rimGoldMid} />
        <stop offset="78%" stopColor={RW.rimGoldLower} />
        <stop offset="100%" stopColor={RW.rimGoldBottom} />
      </linearGradient>

      <linearGradient
        id={ids.rimEdge}
        x1={centerX}
        y1={centerY - ROULETTE_FRAME_OUTER_RADIUS}
        x2={centerX}
        y2={centerY + ROULETTE_FRAME_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={RW.rimEdgeLight} stopOpacity="0.95" />
        <stop offset="30%" stopColor={RW.rimEdgeLight} stopOpacity="0.18" />
        <stop offset="62%" stopColor={RW.rimEdgeBottom} stopOpacity="0.2" />
        <stop offset="100%" stopColor={RW.rimEdgeBottom} stopOpacity="0.85" />
      </linearGradient>

      <radialGradient
        id={ids.wellShade}
        cx={centerX}
        cy={centerY}
        r={ROULETTE_POCKET_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="63%" stopColor={RW.black} stopOpacity="0" />
        <stop offset="76%" stopColor={RW.black} stopOpacity="0.28" />
        <stop offset="82%" stopColor={RW.black} stopOpacity="0.55" />
      </radialGradient>

      <pattern
        id={ids.wellRib}
        patternUnits="userSpaceOnUse"
        width="5"
        height="10"
        patternTransform="rotate(90)"
      >
        <rect width="5" height="5" fill="rgba(255,255,255,0.07)" />
        <rect y="5" width="5" height="5" fill="rgba(0,0,0,0.14)" />
      </pattern>

      <linearGradient id={ids.goldLip} x1="22%" y1="8%" x2="82%" y2="92%">
        <stop offset="0%" stopColor={RW.goldLip0} />
        <stop offset="22%" stopColor={RW.goldLip22} />
        <stop offset="55%" stopColor={RW.goldLip55} />
        <stop offset="82%" stopColor={RW.goldLip82} />
        <stop offset="100%" stopColor={RW.goldLip100} />
      </linearGradient>

      <linearGradient id={ids.bronzeWall} x1="18%" y1="14%" x2="86%" y2="90%">
        <stop offset="0%" stopColor={RW.bronzeWall0} />
        <stop offset="45%" stopColor={RW.bronzeWall45} />
        <stop offset="100%" stopColor={RW.bronzeWall100} />
      </linearGradient>

      <pattern
        id={ids.brushedGold}
        patternUnits="userSpaceOnUse"
        width="5"
        height="5"
        patternTransform="rotate(14)"
      >
        <rect width="5" height="5" fill="transparent" />
        <line x1="0" y1="1" x2="5" y2="1" stroke="rgba(255,255,255,0.09)" strokeWidth="0.4" />
        <line x1="0" y1="2.8" x2="5" y2="2.8" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3" />
      </pattern>

      <linearGradient id={ids.ballTrackLacquer} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={RW.track0} />
        <stop offset="35%" stopColor={RW.track35} />
        <stop offset="68%" stopColor={RW.track68} />
        <stop offset="100%" stopColor={RW.track100} />
      </linearGradient>

      <linearGradient
        id={ids.ballTrackGlass}
        x1={centerX}
        y1={centerY - ROULETTE_FRAME_OUTER_RADIUS}
        x2={centerX}
        y2={centerY + ROULETTE_FRAME_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={RW.track0} />
        <stop offset="18%" stopColor={RW.track35} />
        <stop offset="48%" stopColor={RW.track68} />
        <stop offset="78%" stopColor={RW.track100} />
        <stop offset="100%" stopColor={RW.black} />
      </linearGradient>

      <radialGradient
        id={ids.ballTrackShine}
        cx={centerX}
        cy={centerY}
        r={ROULETTE_FRAME_OUTER_RADIUS * 0.42}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={RW.white} stopOpacity="0.22" />
        <stop offset="38%" stopColor={RW.white} stopOpacity="0.08" />
        <stop offset="72%" stopColor={RW.white} stopOpacity="0.02" />
        <stop offset="100%" stopColor={RW.white} stopOpacity="0" />
      </radialGradient>

      {/* Concentric bowl shading: flat center falling to dark at the rim.
          Kept perfectly centered so it is rotation-invariant while spinning. */}
      <radialGradient id={ids.bowlFill} cx={bowlX} cy={bowlY} r="301" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={RW.bowl58} />
        <stop offset="88%" stopColor={RW.bowl58} />
        <stop offset="100%" stopColor={RW.bowl100} />
      </radialGradient>

      <radialGradient id={ids.hubFill} cx={bowlX} cy={bowlY} r="52" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={RW.spindle0} />
        <stop offset="55%" stopColor={RW.spindle55} />
        <stop offset="100%" stopColor={RW.spindle100} />
      </radialGradient>

      <radialGradient id={ids.hubCap} cx={bowlX} cy={bowlY} r="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={RW.spindleCap0} />
        <stop offset="55%" stopColor={RW.spindleCap55} />
        <stop offset="100%" stopColor={RW.spindleCap100} />
      </radialGradient>

      <linearGradient id={ids.pointerFill} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={RW.rimGoldTopEdge} />
        <stop offset="48%" stopColor={RW.rimGoldTop} />
        <stop offset="100%" stopColor={RW.rimGoldMid} />
      </linearGradient>

      <linearGradient id={ids.pointerBevel} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={RW.pointerFill} />
        <stop offset="100%" stopColor={RW.pointerFill} />
      </linearGradient>

      <radialGradient id={ids.ballFill} cx="34%" cy="30%" r="72%">
        <stop offset="0%" stopColor={RW.ball0} />
        <stop offset="52%" stopColor={RW.ball55} />
        <stop offset="100%" stopColor={RW.ball100} />
      </radialGradient>

      <radialGradient
        id={ids.rotationLight}
        cx={lightX}
        cy={lightY}
        r={ROULETTE_OUTER_RADIUS}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={RW.white} stopOpacity="0.16" />
        <stop offset="28%" stopColor={RW.goldLip0} stopOpacity="0.08" />
        <stop offset="52%" stopColor={RW.white} stopOpacity="0.02" />
        <stop offset="100%" stopColor={RW.black} stopOpacity="0.22" />
      </radialGradient>

      <radialGradient
        id={ids.rimSpecular}
        cx={centerX}
        cy={centerY}
        r={ROULETTE_FRAME_OUTER_RADIUS * 0.55}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor={RW.white} stopOpacity="0.42" />
        <stop offset="35%" stopColor={RW.goldLip0} stopOpacity="0.18" />
        <stop offset="72%" stopColor={RW.goldLip55} stopOpacity="0.04" />
        <stop offset="100%" stopColor={RW.goldLip100} stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}
