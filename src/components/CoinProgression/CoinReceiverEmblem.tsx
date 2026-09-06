import { minesTileGemPaths, minesTileGemViewBox } from "../MinesTile/minesTileGemPaths";

type CoinReceiverEmblemProps = {
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CoinReceiverEmblem({ className }: CoinReceiverEmblemProps) {
  return (
    <svg
      className={cx("joker-coin-receiver__emblem-svg", className)}
      viewBox={minesTileGemViewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g>
        {minesTileGemPaths.map((path) => (
          <path key={path} d={path} />
        ))}
      </g>
    </svg>
  );
}
