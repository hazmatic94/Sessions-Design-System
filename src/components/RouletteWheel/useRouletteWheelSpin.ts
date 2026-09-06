import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import {
  ROULETTE_FIXED_LANDING_POSITION,
  assertSpinPocketConsistency,
  createSpinSnapshot,
  findPocketByIndex,
  findPocketByValue,
  pickRandomTargetPocket,
  type RouletteNumber,
  type RoulettePocket,
  type RoulettePoint,
  type RouletteSpinSnapshot,
} from "./rouletteWheelLayout";
import {
  ROULETTE_SPIN_DURATION_MS,
  runRouletteWheelSpin,
  type RouletteSpinResult,
} from "../../utils/rouletteWheelSpin";
import {
  applyRouletteWheelSpinFrame,
  resetRouletteWheelImperativeFrame,
} from "../../utils/rouletteWheelImperativeFrame";
import { playRouletteWheelSpinSound, stopRouletteWheelSpinSound } from "../../utils/rouletteWheelSounds";

export type RouletteWheelSpinState = {
  wheelRotation: number;
  ballPosition: RoulettePoint;
  ballBounceScale: number;
  ballBounceLift: number;
  showBall: boolean;
  isSpinning: boolean;
  spinProgress: number;
  targetPocket: RoulettePocket | null;
  finalWheelRotation: number | null;
  displayedResult: number | null;
  snapshot: RouletteSpinSnapshot | null;
};

export type UseRouletteWheelSpinOptions = {
  durationMs?: number;
  /** Play the wheel spin sound for the duration of the animation. Defaults to true. */
  soundEnabled?: boolean;
  onSpinComplete?: (result: RouletteSpinResult) => void;
  /** When set, spin frames update this DOM node directly instead of React state (much faster on mobile). */
  wheelRootRef?: RefObject<HTMLElement | null>;
};

const REST_TARGET = findPocketByIndex(0);
const REST_BALL_POSITION = ROULETTE_FIXED_LANDING_POSITION;

export function useRouletteWheelSpin({
  durationMs = ROULETTE_SPIN_DURATION_MS,
  soundEnabled = true,
  onSpinComplete,
  wheelRootRef,
}: UseRouletteWheelSpinOptions = {}) {
  const cancelRef = useRef<(() => void) | null>(null);
  const onCompleteRef = useRef(onSpinComplete);
  const stateRef = useRef<RouletteWheelSpinState>({
    wheelRotation: 0,
    ballPosition: REST_BALL_POSITION,
    ballBounceScale: 1,
    ballBounceLift: 0,
    showBall: true,
    isSpinning: false,
    spinProgress: 0,
    targetPocket: REST_TARGET,
    finalWheelRotation: 0,
    displayedResult: null,
    snapshot: createSpinSnapshot(REST_TARGET, 0),
  });
  const [state, setState] = useState<RouletteWheelSpinState>(stateRef.current);

  useEffect(() => {
    onCompleteRef.current = onSpinComplete;
  }, [onSpinComplete]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    return () => {
      cancelRef.current?.();
      stopRouletteWheelSpinSound();
    };
  }, []);

  const spin = useCallback(
    (winningNumber?: RouletteNumber) => {
      const current = stateRef.current;
      if (current.isSpinning) {
        return;
      }

      const targetPocket =
        winningNumber != null ? findPocketByValue(winningNumber) : pickRandomTargetPocket();
      const snapshot = createSpinSnapshot(targetPocket, current.wheelRotation, null);

      cancelRef.current?.();
      stopRouletteWheelSpinSound();
      if (wheelRootRef?.current) {
        resetRouletteWheelImperativeFrame(wheelRootRef.current);
      }
      setState({
        ...current,
        isSpinning: true,
        spinProgress: 0,
        targetPocket,
        snapshot,
        displayedResult: null,
        finalWheelRotation: null,
        showBall: true,
        ballBounceScale: 1,
        ballBounceLift: 0,
      });

      if (soundEnabled) {
        playRouletteWheelSpinSound(durationMs);
      }

      cancelRef.current = runRouletteWheelSpin({
        fromWheelRotation: current.wheelRotation,
        targetPocket,
        durationMs,
        onFrame: (frame, activeSnapshot) => {
          const root = wheelRootRef?.current;
          if (root) {
            applyRouletteWheelSpinFrame(root, frame);
            return;
          }

          setState((prev) => ({
            ...prev,
            wheelRotation: frame.wheelRotation,
            ballPosition: frame.ballPosition,
            ballBounceScale: frame.ballBounceScale,
            ballBounceLift: frame.ballBounceLift,
            spinProgress: frame.progress,
            targetPocket: activeSnapshot.targetPocket,
            snapshot: activeSnapshot,
            showBall: true,
            isSpinning: true,
          }));
        },
        onComplete: (result) => {
          cancelRef.current = null;
          stopRouletteWheelSpinSound();
          wheelRootRef?.current && resetRouletteWheelImperativeFrame(wheelRootRef.current);
          const completedSnapshot = result.snapshot;
          assertSpinPocketConsistency(completedSnapshot, { requireDisplayedResult: true });

          const next = {
            wheelRotation: result.wheelRotation,
            ballPosition: result.ballPosition,
            ballBounceScale: result.ballBounceScale,
            ballBounceLift: result.ballBounceLift,
            showBall: true,
            isSpinning: false,
            spinProgress: 1,
            targetPocket: result.targetPocket,
            finalWheelRotation: result.finalWheelRotation,
            displayedResult: result.targetPocket.value,
            snapshot: completedSnapshot,
          };
          setState(next);
          onCompleteRef.current?.(result);
        },
      });
    },
    [durationMs, soundEnabled, wheelRootRef],
  );

  return {
    ...state,
    spin,
  };
}
