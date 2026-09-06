import type { ReactNode } from "react";
import "../../styles/roulette-win-chip.css";
type CoinProgressionStepProps = {
    multiplier: string;
    receiverSize: number;
    settled: boolean;
    animating: boolean;
    showChip: boolean;
    renderCoin?: () => ReactNode;
    onPlaybackComplete?: () => void;
};
export declare function CoinProgressionStep({ multiplier, receiverSize, settled, animating, showChip, renderCoin, onPlaybackComplete, }: CoinProgressionStepProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=CoinProgressionStep.d.ts.map