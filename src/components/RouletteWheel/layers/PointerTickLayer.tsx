import { useEffect, useRef, type ReactNode } from "react";
import { findPocketUnderPointer } from "../rouletteWheelLayout";
import { useRouletteWheelContext } from "../RouletteWheelContext";

const POINTER_TICK_DEG = 6;
const POINTER_TICK_DECAY = 0.78;
const POINTER_TICK_EPSILON = 0.06;

/** Applies the mechanical pointer kick while the wheel spins — pointer stays fixed in stage space. */
export function PointerTickLayer({ children }: { children: ReactNode }) {
  const { wheelRotation } = useRouletteWheelContext();
  const layerRef = useRef<SVGGElement>(null);
  const pocketIndexRef = useRef<number | null>(null);
  const kickRef = useRef(0);
  const pivotRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) {
      return;
    }

    const reduceMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduceMotion) {
      layer.removeAttribute("transform");
      return;
    }

    const pocket = findPocketUnderPointer(wheelRotation);
    if (pocketIndexRef.current === null) {
      pocketIndexRef.current = pocket.index;
    } else if (pocket.index !== pocketIndexRef.current) {
      pocketIndexRef.current = pocket.index;
      kickRef.current = POINTER_TICK_DEG;
    }

    kickRef.current *= POINTER_TICK_DECAY;
    if (kickRef.current < POINTER_TICK_EPSILON) {
      kickRef.current = 0;
      layer.removeAttribute("transform");
      return;
    }

    if (!pivotRef.current) {
      const box = layer.getBBox();
      pivotRef.current = { x: box.x + box.width / 2, y: box.y };
    }

    const pivot = pivotRef.current;
    layer.setAttribute(
      "transform",
      `rotate(${kickRef.current.toFixed(3)}, ${pivot.x}, ${pivot.y})`,
    );
  }, [wheelRotation]);

  return (
    <g ref={layerRef} className="joker-roulette-wheel__pointer-layer">
      {children}
    </g>
  );
}
