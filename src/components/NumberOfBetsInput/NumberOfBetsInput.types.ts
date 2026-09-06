import type { InputProps } from "../Input/index.js";

export type NumberOfBetsInputProps = Omit<InputProps, "type" | "inputMode" | "pattern"> & {
  selected?: boolean;
};
