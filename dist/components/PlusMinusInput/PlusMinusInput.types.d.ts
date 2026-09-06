import type { ButtonHTMLAttributes, HTMLAttributes } from "react";
export type PlusMinusInputProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
    value?: number | string;
    min?: number;
    max?: number;
    minusLabel?: string;
    plusLabel?: string;
    onMinusClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    onPlusClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
    minusDisabled?: boolean;
    plusDisabled?: boolean;
};
//# sourceMappingURL=PlusMinusInput.types.d.ts.map