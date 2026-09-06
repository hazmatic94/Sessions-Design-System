import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { OddsButtonGroupOption } from "../OddsButtonGroup/index.js";
export type MobileHiLoOddsGroupProps = {
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    higherLabel?: ReactNode;
    higherOdds?: ReactNode;
    lowerLabel?: ReactNode;
    lowerOdds?: ReactNode;
    onHigherSame?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onLowerSame?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onValueChange?: (value: string, option: OddsButtonGroupOption) => void;
    value?: string;
};
//# sourceMappingURL=MobileHiLoOddsGroup.types.d.ts.map