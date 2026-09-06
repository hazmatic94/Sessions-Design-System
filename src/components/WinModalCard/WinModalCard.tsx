import type { CSSProperties, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import jokerCoinSrc from "../../../assets/jokerCoin.svg";
import winModalCoinSpinSrc from "../../../assets/win-modal-coin-spin.mov";
import winModalIconSrc from "../../../assets/win-card-modal.svg";
import { Button } from "../Button/Button";
import styles from "./WinModalCard.module.css";
import type { WinModalCardProps } from "./WinModalCard.types";

const FLYING_COIN_COUNT = 7;
const COIN_FLIGHT_MS = 760;
const COIN_STAGGER_MS = 48;
const WALLET_CREDIT_PULSE_MS = 520;

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getVisibleWalletCoinTarget(root: ParentNode | null | undefined = document) {
  if (!root) {
    return null;
  }

  const coins = Array.from(root.querySelectorAll<HTMLElement>(".joker-wallet-coin"));

  for (const coin of coins) {
    const rect = coin.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight) {
      return coin;
    }
  }

  return null;
}

function pulseWalletBalance(target: HTMLElement | null) {
  const walletBalance = target?.closest(".joker-wallet-balance");
  if (!walletBalance) {
    return;
  }

  walletBalance.classList.add("is-credited");
  window.setTimeout(() => {
    walletBalance.classList.remove("is-credited");
  }, WALLET_CREDIT_PULSE_MS);
}

function MessageWithHighlight({
  message,
  highlight,
}: {
  message: ReactNode;
  highlight?: ReactNode;
}) {
  if (typeof message !== "string" || highlight == null || highlight === "") {
    return <>{message}</>;
  }

  const highlightText = String(highlight);
  const index = message.toLowerCase().indexOf(highlightText.toLowerCase());
  if (index === -1) {
    return <>{message}</>;
  }

  return (
    <>
      {message.slice(0, index)}
      <strong className={styles.messageHighlight}>
        {message.slice(index, index + highlightText.length)}
      </strong>
      {message.slice(index + highlightText.length)}
    </>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6 6 18" strokeLinecap="round" />
      <path d="m6 6 12 12" strokeLinecap="round" />
    </svg>
  );
}

export function WinModalCard({
  title = "You Won",
  amountWon = "+88",
  currency = "JKC",
  message = "Your winnings have been credited to your account",
  messageHighlight = "credited",
  balance,
  iconSrc = winModalIconSrc,
  iconVideoSrc = winModalCoinSpinSrc,
  closeLabel = "Close",
  flyToWallet = true,
  walletSearchRoot,
  onCoinsLand,
  onClose,
  className,
  ...props
}: WinModalCardProps) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const iconVideoRef = useRef<HTMLVideoElement>(null);
  const onCoinsLandRef = useRef(onCoinsLand);
  const [coinOrigin, setCoinOrigin] = useState<{ x: number; y: number } | null>(null);
  const [isIconVideoPlaying, setIsIconVideoPlaying] = useState(false);
  const [useIconImageFallback, setUseIconImageFallback] = useState(!iconVideoSrc);
  const [coinFlights, setCoinFlights] = useState<
    Array<{ deltaX: number; deltaY: number; delayMs: number }>
  >([]);

  onCoinsLandRef.current = onCoinsLand;

  useEffect(() => {
    if (!iconVideoSrc) {
      return undefined;
    }

    const video = iconVideoRef.current;
    if (!video) {
      return undefined;
    }

    setIsIconVideoPlaying(false);
    setUseIconImageFallback(false);

    const handlePlaying = () => {
      setIsIconVideoPlaying(true);
    };

    const handleError = () => {
      setUseIconImageFallback(true);
    };

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("error", handleError);

    void video.play().catch(() => {
      setUseIconImageFallback(true);
    });

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("error", handleError);
    };
  }, [iconVideoSrc]);

  useLayoutEffect(() => {
    if (!flyToWallet) {
      return undefined;
    }

    if (walletSearchRoot === null) {
      return undefined;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      onCoinsLandRef.current?.();
      return undefined;
    }

    const icon = iconRef.current;
    const searchRoot = walletSearchRoot ?? document;
    const target = getVisibleWalletCoinTarget(searchRoot);

    if (!icon || !target) {
      return undefined;
    }

    const iconRect = icon.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const originX = iconRect.left + iconRect.width / 2;
    const originY = iconRect.top + iconRect.height / 2;
    const deltaX = targetRect.left + targetRect.width / 2 - originX;
    const deltaY = targetRect.top + targetRect.height / 2 - originY;

    setCoinOrigin({ x: originX, y: originY });
    setCoinFlights(
      Array.from({ length: FLYING_COIN_COUNT }, (_, index) => ({
        deltaX: deltaX + (index - (FLYING_COIN_COUNT - 1) / 2) * 5,
        deltaY: deltaY + (index % 2 === 0 ? -4 : 4),
        delayMs: index * COIN_STAGGER_MS,
      })),
    );

    const landDelay = (FLYING_COIN_COUNT - 1) * COIN_STAGGER_MS + COIN_FLIGHT_MS;
    const landTimer = window.setTimeout(() => {
      pulseWalletBalance(target);
      onCoinsLandRef.current?.();
    }, landDelay);

    return () => {
      window.clearTimeout(landTimer);
    };
  }, [amountWon, currency, flyToWallet, message, title, walletSearchRoot]);

  const flyingCoins =
    coinOrigin && coinFlights.length > 0 && typeof document !== "undefined"
      ? createPortal(
          <span
            className={styles.flyingCoins}
            aria-hidden="true"
            style={
              {
                "--coin-origin-x": `${coinOrigin.x}px`,
                "--coin-origin-y": `${coinOrigin.y}px`,
              } as CSSProperties
            }
          >
            {coinFlights.map((coin, index) => (
              <img
                key={index}
                className={styles.flyingCoin}
                src={jokerCoinSrc}
                alt=""
                style={
                  {
                    "--coin-delta-x": `${coin.deltaX}px`,
                    "--coin-delta-y": `${coin.deltaY}px`,
                    animationDelay: `${coin.delayMs}ms`,
                  } as CSSProperties
                }
              />
            ))}
          </span>,
          document.body,
        )
      : null;

  const ariaLabel =
    typeof title === "string"
      ? title
      : typeof amountWon === "string"
        ? `${amountWon} ${currency}`
        : undefined;

  return (
    <div {...props} className={cx(styles.root, className)} aria-label={ariaLabel}>
      {flyingCoins}

      <div className={styles.card}>
        <button type="button" className={styles.dismiss} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <span ref={iconRef} className={styles.iconWrap} aria-hidden="true">
          {iconVideoSrc && !useIconImageFallback ? (
            <video
              ref={iconVideoRef}
              className={cx(styles.iconVideo, isIconVideoPlaying && styles.iconVideoIsPlaying)}
              src={iconVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          ) : (
            <img className={styles.icon} src={iconSrc} alt="" />
          )}
        </span>

        <div className={styles.copy}>
          <strong className={styles.amount}>
            {amountWon} {currency}
          </strong>
          <p className={styles.message}>
            <MessageWithHighlight message={message} highlight={messageHighlight} />
          </p>
        </div>

        {balance != null && balance !== "" ? (
          <div className={styles.balancePill}>
            <div className={styles.balancePillInner}>
              <img className={styles.balanceCoin} src={jokerCoinSrc} alt="" />
              <span>{balance}</span>
            </div>
          </div>
        ) : null}

        <div className={styles.footerActions}>
          <Button type="button" variant="ghost" fullWidth className={styles.cancelGhost} onClick={onClose}>
            {closeLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
