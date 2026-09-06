import { CoinFaceIcon } from "./CoinFaceIcon";

type CoinHeadIconProps = {
  className?: string;
};

export function CoinHeadIcon({ className }: CoinHeadIconProps) {
  return <CoinFaceIcon side="heads" className={className} />;
}
