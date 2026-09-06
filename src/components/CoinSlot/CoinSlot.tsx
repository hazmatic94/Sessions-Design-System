import type { CSSProperties } from "react";
import { CoinReceiver } from "../CoinProgression/CoinReceiver";
import type { CoinSlotProps } from "./CoinSlot.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** @deprecated Use `CoinReceiver` or `CoinProgression` instead. */
export function CoinSlot({ size = 256, className, style, children, ...props }: CoinSlotProps) {
  const slotStyle = {
    ...(style as CSSProperties),
    "--coin-receiver-size": `${size}px`,
    "--coin-size": `${size}px`,
  } as CSSProperties;

  return (
    <CoinReceiver
      {...props}
      size={size}
      className={cx(className)}
      style={slotStyle}
      state={children ? "completed" : "inactive"}
    >
      {children}
    </CoinReceiver>
  );
}
