import { useId } from "react";

type RedChipIconProps = {
  className?: string;
};

export function RedChipIcon({ className }: RedChipIconProps) {
  const uid = useId().replace(/:/g, "");
  const dropShadowId = `filter0_d_4034_1013_${uid}`;
  const innerShadowId = `filter1_i_4034_1013_${uid}`;

  return (
    <svg
      className={className}
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g id="red">
        <g filter={`url(#${dropShadowId})`}>
          <circle cx="10.5" cy="10.2773" r="8" fill="var(--joker-red-100)" />
        </g>
        <g filter={`url(#${innerShadowId})`}>
          <circle cx="10.5" cy="10.2773" r="7" fill="var(--joker-red-600)" />
        </g>
        <circle cx="10.5" cy="10.2773" r="4" fill="var(--joker-red-300)" />
      </g>
      <defs>
        <filter
          id={dropShadowId}
          x="2.34762"
          y="2.27734"
          width="16.3048"
          height="16.5714"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.419048" />
          <feGaussianBlur stdDeviation="0.0761905" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4034_1013" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4034_1013" result="shape" />
        </filter>
        <filter
          id={innerShadowId}
          x="3.5"
          y="3.27734"
          width="14"
          height="14"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="0.619977" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.017841 0 0 0 0 0.017841 0 0 0 0 0.017841 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4034_1013" />
        </filter>
      </defs>
    </svg>
  );
}
