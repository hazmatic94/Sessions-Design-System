import { CoinFaceIcon } from "./CoinFaceIcon";

type CoinJokerIconProps = {
  className?: string;
};

export function CoinJokerIcon({ className }: CoinJokerIconProps) {
  return <CoinFaceIcon side="joker" className={className} />;
}
