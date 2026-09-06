import type { InputProps } from "../Input/index.js";
export type BetAmountInputProps = Omit<InputProps, "inputMode" | "pattern" | "type" | "rightIcon" | "suffix"> & {
    onValueChange?: (value: string) => void;
};
//# sourceMappingURL=BetAmountInput.types.d.ts.map