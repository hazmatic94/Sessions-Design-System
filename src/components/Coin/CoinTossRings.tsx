import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { startCoinTossRingAmbient } from "../../utils/coinTossRingParticles.js";
import type { CoinTossRingsProps } from "./CoinTossRings.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CoinTossRings({ size = 400, coinSizePx = 256, className, style, ...props }: CoinTossRingsProps) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return startCoinTossRingAmbient(particlesRef.current, size, coinSizePx);
  }, [size, coinSizePx]);

  return (
    <div
      {...props}
      className={cx("joker-coin-toss-rings", className)}
      style={{ "--coin-toss-stage-size": `${size}px`, ...style } as CSSProperties}
      aria-hidden={props["aria-hidden"] ?? true}
    >
      <div className="joker-coin-toss-rings__surface">
        <div className="joker-coin-toss-rings__pool" />
        <div className="joker-coin-toss-rings__plane">
          <div className="joker-coin-toss-rings__coin-shadow" />
          <div className="joker-coin-toss-rings__ring joker-coin-toss-rings__ring--outer" />
          <div className="joker-coin-toss-rings__ring joker-coin-toss-rings__ring--inner" />
        </div>
        <div className="joker-coin-toss-rings__reflection" />
        <div ref={particlesRef} className="joker-coin-toss-rings__particles" />
      </div>
    </div>
  );
}
