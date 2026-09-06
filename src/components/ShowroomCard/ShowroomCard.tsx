import { useRef, useState, type MouseEvent } from "react";
import { burstShowroomCardHearts } from "../../utils/showroomCardHeartBurst.js";
import "./ShowroomCard.css";
import type { ShowroomCardProps } from "./ShowroomCard.types";

function JokerOriginalsIcon() {
  return (
    <svg className="joker-showroom-card-brand-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false" fill="none">
      <path d="M15.108 7.15232C15.108 7.15176 15.1084 7.15126 15.1089 7.15108C16.7115 6.59178 17.7711 5.34719 17.9672 5.10371C17.9833 5.08373 17.9733 5.05533 17.9483 5.04967C17.6922 4.99174 16.5194 4.75916 15.1997 5.01918C15.177 5.02365 15.1557 5.00608 15.1563 4.98299L15.2107 2.67488C15.2115 2.63886 15.1648 2.62412 15.1448 2.6541L13.8534 4.59372C13.8375 4.61754 13.8545 4.64944 13.8831 4.64959L14.2155 4.65133C14.2338 4.65143 14.2491 4.66533 14.251 4.68358L14.3089 5.24301C14.3106 5.25925 14.301 5.27461 14.2857 5.28046C12.769 5.86288 11.7711 7.03567 11.5817 7.27097C11.5656 7.29096 11.5754 7.31921 11.6005 7.32487C11.8648 7.3846 13.1081 7.63076 14.4819 7.32722C14.503 7.32256 14.5237 7.33721 14.5259 7.35869L14.8227 10.2454C14.8241 10.2592 14.8175 10.2726 14.8056 10.2798C13.8063 10.8799 12.4397 11.4393 10.5812 11.7826C10.5641 11.7858 10.5515 11.8007 10.5515 11.818V17.3294C10.5515 17.3619 10.5911 17.3777 10.6135 17.3542L17.0438 10.6039C17.0492 10.5982 17.0526 10.5908 17.0535 10.583L17.3481 7.90776C17.3529 7.86471 17.2627 7.83953 17.2426 7.8779C16.9983 8.34471 16.3965 9.2477 15.0914 10.1022C15.0673 10.118 15.0348 10.1006 15.0355 10.0718L15.1046 7.15531C15.1046 7.15438 15.1054 7.15364 15.1063 7.15364C15.1065 7.15364 15.1066 7.15364 15.1067 7.15364C15.1074 7.15364 15.108 7.15305 15.108 7.15232Z" fill="currentColor" />
      <path d="M4.89205 7.1826C4.89205 7.18204 4.89169 7.18154 4.89116 7.18135C3.28859 6.62205 2.22893 5.37746 2.03291 5.13399C2.01682 5.114 2.02673 5.0856 2.05176 5.07994C2.30792 5.02201 3.48072 4.78943 4.80042 5.04946C4.82309 5.05392 4.84436 5.03636 4.84381 5.01326L4.7894 2.70515C4.78855 2.66914 4.8353 2.65439 4.85527 2.68438L6.14667 4.62399C6.16253 4.64781 6.14555 4.67972 6.11693 4.67987L5.78462 4.6816C5.76627 4.6817 5.75093 4.6956 5.74904 4.71386L5.69119 5.27329C5.68951 5.28952 5.69911 5.30488 5.71434 5.31073C7.23104 5.89316 8.229 7.06594 8.41841 7.30125C8.4345 7.32124 8.42465 7.34948 8.39963 7.35514C8.13529 7.41488 6.892 7.66103 5.51814 7.35749C5.49706 7.35283 5.47637 7.36748 5.47416 7.38896L5.17741 10.2757C5.17598 10.2895 5.18255 10.3029 5.19447 10.31C6.19382 10.9102 7.5604 11.4696 9.41891 11.8129C9.43598 11.8161 9.44857 11.831 9.44857 11.8483V17.3597C9.44857 17.3922 9.40897 17.408 9.38658 17.3845L2.95629 10.6341C2.95086 10.6284 2.94745 10.6211 2.94659 10.6133L2.65195 7.93804C2.64721 7.89499 2.73739 7.8698 2.75747 7.90817C3.00173 8.37498 3.60357 9.27797 4.90869 10.1325C4.93281 10.1483 4.96525 10.1309 4.96457 10.102L4.89546 7.18558C4.89543 7.18466 4.89468 7.18392 4.89375 7.18392C4.89362 7.18392 4.8935 7.18392 4.89337 7.18392C4.89264 7.18392 4.89205 7.18333 4.89205 7.1826Z" fill="currentColor" />
    </svg>
  );
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const DEFAULT_BODY = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

export function ShowroomCard({
  body = DEFAULT_BODY,
  brandLabel = "Joker Originals",
  className,
  defaultFavourited = false,
  favourited,
  href = "#",
  imageAlt = "",
  imageSrc,
  onFavouriteChange,
  title = "This is a title",
  ...props
}: ShowroomCardProps) {
  const [internalFavourited, setInternalFavourited] = useState(defaultFavourited);
  const favouriteButtonRef = useRef<HTMLButtonElement>(null);
  const isFavourited = favourited ?? internalFavourited;
  const accessibleTitle = typeof title === "string" ? title : "card";

  const setFavourited = (nextValue: boolean) => {
    setInternalFavourited(nextValue);
    onFavouriteChange?.(nextValue);
  };

  const handleFavouriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const nextValue = !isFavourited;
    if (nextValue) {
      burstShowroomCardHearts(favouriteButtonRef.current);
    }
    setFavourited(nextValue);
  };

  return (
    <article {...props} className={cx("joker-showroom-card", className)}>
      <div className="joker-showroom-card-top-rail">
        <div className="joker-showroom-card-brand">
          <JokerOriginalsIcon />
          <span>{brandLabel}</span>
        </div>
        <button
          ref={favouriteButtonRef}
          className={cx("joker-showroom-card-icon is-favourite", isFavourited && "is-active")}
          type="button"
          aria-label={`Favourite ${accessibleTitle}`}
          aria-pressed={isFavourited}
          data-showroom-card-action
          onClick={handleFavouriteClick}
        >
          <HeartIcon filled={isFavourited} />
        </button>
      </div>
      <div className="joker-showroom-card-media">
        <div className="joker-showroom-card-image" data-showroom-card-image="">
          {imageSrc ? <img src={imageSrc} alt={imageAlt} /> : null}
        </div>
        <a className="joker-showroom-card-media-link" href={href} aria-label={`Open ${accessibleTitle}`} />
      </div>
      <div className="joker-showroom-card-content">
        <div className="joker-showroom-card-copy">
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      </div>
    </article>
  );
}
