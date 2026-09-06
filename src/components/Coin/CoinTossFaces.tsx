import { CoinFaceContent } from "./CoinFaceContent";
import { CoinTossEdge } from "./CoinTossEdge";

type CoinTossFacesProps = {
  pauseSheen?: boolean;
};

function CoinTossFaceStack({
  side,
  pauseSheen,
}: {
  side: "heads" | "tails";
  pauseSheen: boolean;
}) {
  return (
    <div className="joker-coin__rim">
      <div className="joker-coin__face">
        <CoinFaceContent side={side} pauseSheen={pauseSheen} />
        <div className="joker-coin-toss__specular" aria-hidden="true" />
      </div>
    </div>
  );
}

function CoinTossFaceShell({
  side,
  pauseSheen,
}: {
  side: "heads" | "tails";
  pauseSheen: boolean;
}) {
  return (
    <div className={`joker-coin-toss__face joker-coin-toss__face--${side}`}>
      <CoinTossFaceStack side={side} pauseSheen={pauseSheen} />
    </div>
  );
}

export function CoinTossFaces({ pauseSheen = false }: CoinTossFacesProps) {
  return (
    <div className="joker-coin-toss__flipper">
      <CoinTossEdge />
      <CoinTossFaceShell side="heads" pauseSheen={pauseSheen} />
      <CoinTossFaceShell side="tails" pauseSheen={pauseSheen} />
    </div>
  );
}
