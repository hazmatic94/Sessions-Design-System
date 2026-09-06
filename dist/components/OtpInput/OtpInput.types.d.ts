import type { InputHTMLAttributes, ReactNode } from "react";
import type { InputStatus } from "../Input/index.js";
export type OtpInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue" | "maxLength"> & {
    label?: ReactNode;
    helperText?: ReactNode;
    error?: ReactNode;
    message?: ReactNode;
    status?: InputStatus;
    fullWidth?: boolean;
    length?: number;
    value?: string;
    defaultValue?: string;
    mask?: boolean;
    onChange?: (value: string) => void;
};
//# sourceMappingURL=OtpInput.types.d.ts.map