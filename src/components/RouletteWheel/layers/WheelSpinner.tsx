import type { CSSProperties, ReactNode } from "react";
import { useRouletteWheelContext } from "../RouletteWheelContext";
import { rouletteWheelViewBoxAttribute } from "../rouletteWheelPaths";
import { BallTrack } from "./BallTrack";
import { CenterBowl } from "./CenterBowl";
import { PocketRing } from "./PocketRing";
import { Spindle } from "./Spindle";

export type WheelSpinnerProps = {
  wheelRotation?: number;
  className?: string;
  children?: ReactNode;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Rotating wheel assembly — pockets, track, bowl and spindle spin together via CSS. */
export function WheelSpinner({ wheelRotation = 0, className, children }: WheelSpinnerProps) {
  const { paintIds } = useRouletteWheelContext();
  const viewBox = rouletteWheelViewBoxAttribute();

  const spinnerStyle = {
    "--roulette-wheel-rotation": `${wheelRotation}deg`,
  } as CSSProperties;

  return (
    <div
      className={cx("joker-roulette-wheel__wheel-spinner", className)}
      style={spinnerStyle}
      aria-hidden="true"
    >
      <svg
        className="joker-roulette-wheel__svg joker-roulette-wheel__svg--spinner"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g
          className="joker-roulette-wheel__spinner-assembly"
          filter={`url(#${paintIds.wheelShadow})`}
        >
          {children ?? (
            <>
              <PocketRing />
              <BallTrack />
              <CenterBowl />
              <Spindle />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

/** @deprecated Use `WheelSpinner` */
export function Rotor({
  wheelRotation = 0,
  children,
}: {
  wheelRotation?: number;
  children: ReactNode;
}) {
  return <WheelSpinner wheelRotation={wheelRotation}>{children}</WheelSpinner>;
}
