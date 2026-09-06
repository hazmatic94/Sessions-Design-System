export declare const COIN_RECEIVER_LOCK_TIMING: {
    /** Clink when the coin lands in the receiver slot. */
    readonly clinkAtMs: 120;
    /** Green win chip rises halfway onto the coin while pulsing. */
    readonly chipRiseMs: 400;
    /** Brief hold before the loot-box reveal burst. */
    readonly sealedHoldMs: 120;
    /** Sparkle burst and gold dust settle before resting static. */
    readonly celebrateMs: 1400;
};
export declare const COIN_RECEIVER_LOSS_TIMING: {
    /** Quick press in to 96%. */
    readonly pressMs: 140;
    /** Deep red flash. */
    readonly flashMs: 100;
    /** Coin expands outward and dissolves into dust. */
    readonly dustMs: 480;
    /** Fade bowl to dark charcoal. */
    readonly charcoalMs: 380;
    /** Red ring settles; particles play during this window. */
    readonly settleMs: 480;
};
export declare function getCoinReceiverSealAtMs(): number;
export declare function getCoinReceiverLockTotalMs(): number;
export declare function getCoinReceiverLossSettleAtMs(): number;
export declare function getCoinReceiverLossTotalMs(): number;
//# sourceMappingURL=coinReceiverLock.d.ts.map