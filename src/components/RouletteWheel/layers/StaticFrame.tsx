import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { rouletteWheelViewBoxAttribute } from "../rouletteWheelPaths";
import { OuterFrame } from "./OuterFrame";
import { Pointer } from "./Pointer";
import { PointerTickLayer } from "./PointerTickLayer";

export type StaticFrameProps = {
  children?: ReactNode;
};

const ROULETTE_POINTER_DISPLAY_NAME = "RouletteWheelPointer";

function isPointerElement(child: ReactNode): child is ReactElement {
  if (!isValidElement(child)) {
    return false;
  }

  if (child.type === Pointer) {
    return true;
  }

  const type = child.type as { displayName?: string; name?: string };
  return (
    type.displayName === ROULETTE_POINTER_DISPLAY_NAME ||
    type.name === ROULETTE_POINTER_DISPLAY_NAME
  );
}

/**
 * Fixed assembly: outer frame (bottom) and pointer (top overlay).
 * Pointer children are hoisted above the ball so the marker never moves.
 */
export function StaticFrame({ children }: StaticFrameProps) {
  const childList = Children.toArray(children);
  const pointerLayers: ReactNode[] = [];
  const frameLayers: ReactNode[] = [];

  for (const child of childList) {
    if (isPointerElement(child)) {
      pointerLayers.push(child);
    } else {
      frameLayers.push(child);
    }
  }

  const viewBox = rouletteWheelViewBoxAttribute();

  return (
    <>
      <svg
        className="joker-roulette-wheel__svg joker-roulette-wheel__svg--static"
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <g className="joker-roulette-wheel__static-frame">
          {frameLayers.length > 0 ? frameLayers : <OuterFrame />}
        </g>
      </svg>

      {pointerLayers.length > 0 ? (
        <svg
          className="joker-roulette-wheel__svg joker-roulette-wheel__svg--pointer"
          viewBox={viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <PointerTickLayer>{pointerLayers}</PointerTickLayer>
        </svg>
      ) : null}
    </>
  );
}
