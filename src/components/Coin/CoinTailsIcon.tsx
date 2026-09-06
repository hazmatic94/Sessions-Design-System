import { CoinFaceIcon } from "./CoinFaceIcon";

type CoinTailsIconProps = {
  className?: string;
};

export function CoinTailsIcon({ className }: CoinTailsIconProps) {
  return <CoinFaceIcon side="tails" className={className} />;
}
