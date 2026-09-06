import { CoinFaceIcon } from "./CoinFaceIcon";
import type { CoinSide } from "./Coin.types";

type CoinFaceContentProps = {
  side: CoinSide;
  pauseSheen?: boolean;
};

export function CoinFaceContent({ side, pauseSheen = false }: CoinFaceContentProps) {
  return (
    <>
      <div className="joker-coin__icon-well">
        <CoinFaceIcon side={side} />
      </div>
      {!pauseSheen ? <div className="joker-coin__sheen" aria-hidden="true" /> : null}
    </>
  );
}
