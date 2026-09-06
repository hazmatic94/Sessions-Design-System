import type { InputHTMLAttributes, ReactNode } from "react";
import type { InputStatus } from "../Input/index.js";
export type MultiplierInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    suffix?: string;
    onChange?: (value: number) => void;
};
//# sourceMappingURL=MultiplierInput.types.d.ts.map