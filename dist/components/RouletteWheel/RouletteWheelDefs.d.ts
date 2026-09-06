import type { RouletteWheelTheme } from "./RouletteWheel.types";
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
export declare function useRouletteWheelPaintIds(): RouletteWheelPaintIds;
type RouletteWheelDefsProps = {
    ids: RouletteWheelPaintIds;
    theme?: RouletteWheelTheme;
};
export declare function RouletteWheelDefs({ ids, theme }: RouletteWheelDefsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=RouletteWheelDefs.d.ts.map