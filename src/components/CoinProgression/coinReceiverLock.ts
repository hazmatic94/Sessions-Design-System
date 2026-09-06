export const COIN_RECEIVER_LOCK_TIMING = {
  /** Clink when the coin lands in the receiver slot. */
  clinkAtMs: 120,
  /** Green win chip rises halfway onto the coin while pulsing. */
  chipRiseMs: 400,
  /** Brief hold before the loot-box reveal burst. */
  sealedHoldMs: 120,
  /** Sparkle burst and gold dust settle before resting static. */
  celebrateMs: 1400,
} as const;

export const COIN_RECEIVER_LOSS_TIMING = {
  /** Quick press in to 96%. */
  pressMs: 140,
  /** Deep red flash. */
  flashMs: 100,
  /** Coin expands outward and dissolves into dust. */
  dustMs: 480,
  /** Fade bowl to dark charcoal. */
  charcoalMs: 380,
  /** Red ring settles; particles play during this window. */
  settleMs: 480,
} as const;

export function getCoinReceiverSealAtMs() {
  return COIN_RECEIVER_LOCK_TIMING.chipRiseMs + COIN_RECEIVER_LOCK_TIMING.sealedHoldMs;
}

export function getCoinReceiverLockTotalMs() {
  return getCoinReceiverSealAtMs() + COIN_RECEIVER_LOCK_TIMING.celebrateMs;
}

export function getCoinReceiverLossSettleAtMs() {
  return (
    COIN_RECEIVER_LOSS_TIMING.pressMs +
    COIN_RECEIVER_LOSS_TIMING.flashMs +
    COIN_RECEIVER_LOSS_TIMING.dustMs +
    COIN_RECEIVER_LOSS_TIMING.charcoalMs
  );
}

export function getCoinReceiverLossTotalMs() {
  return getCoinReceiverLossSettleAtMs() + COIN_RECEIVER_LOSS_TIMING.settleMs;
}
