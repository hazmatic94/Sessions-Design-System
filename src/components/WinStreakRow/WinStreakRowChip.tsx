import { useCallback, useEffect, useState } from "react";
import { RouletteWinChip } from "../RouletteWinChip/index.js";
import type { WinStreakSlot } from "./WinStreakRow.types.js";

type WinStreakRowChipProps = {
  win: WinStreakSlot;
  chipSize: number;
  initialSettled: boolean;
  playDelay: number;
};

export function WinStreakRowChip({
  win,
  chipSize,
  initialSettled,
  playDelay,
}: WinStreakRowChipProps) {
  const [settled, setSettled] = useState(initialSettled);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (initialSettled) {
      setSettled(true);
      setActive(false);
      return;
    }

    setSettled(false);
    setActive(false);

    const startTimer = window.setTimeout(() => {
      setActive(true);
    }, playDelay);

    return () => window.clearTimeout(startTimer);
  }, [initialSettled, playDelay, win.betColor, win.multiplier]);

  const handleAnimationComplete = useCallback(() => {
    setActive(false);
    setSettled(true);
  }, []);

  return (
    <RouletteWinChip
      active={active}
      settled={settled}
      betColor={win.betColor}
      multiplier={win.multiplier}
      size={chipSize}
      onAnimationComplete={handleAnimationComplete}
    />
  );
}
