import { CoinFaceContent } from "./CoinFaceContent";
import { CoinTossable } from "./CoinTossable";
import type { CoinProps } from "./Coin.types";
import "./Coin.module.css";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Coin({
  side = "heads",
  tossPhase,
  tossOutcome,
  onTossEnd,
  tossDurationMs,
  stageSizePx,
  tapHint,
  tapHintVisible = true,
  className,
  style,
  ...props
}: CoinProps) {
  const isTossable = tossPhase != null && side !== "joker";

  if (isTossable) {
    return (
      <CoinTossable
        {...props}
        side={side === "tails" ? "tails" : "heads"}
        tossPhase={tossPhase}
        tossOutcome={tossOutcome}
        onTossEnd={onTossEnd}
        tossDurationMs={tossDurationMs}
        stageSizePx={stageSizePx}
        tapHint={tapHint}
        tapHintVisible={tapHintVisible}
        className={className}
        style={style}
      />
    );
  }

  return (
    <div
      {...props}
      className={cx(
        "joker-coin",
        side === "tails" && "joker-coin--tails",
        side === "joker" && "joker-coin--joker",
        className,
      )}
      style={style}
      aria-hidden={props["aria-hidden"] ?? true}
    >
      <div className="joker-coin__rim">
        <div className="joker-coin__face">
          <CoinFaceContent side={side} />
        </div>
      </div>
    </div>
  );
}
