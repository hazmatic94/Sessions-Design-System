import { Button } from "../Button/Button";
import styles from "./Modal.module.css";
import type { ModalProps } from "./Modal.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6 6 18" strokeLinecap="round" />
      <path d="m6 6 12 12" strokeLinecap="round" />
    </svg>
  );
}

export function Modal({
  title = "Low Balance",
  children =
    "You don’t have enough Joker Coins to place this bet. Your bet slip has been saved.\n\nDeposit more Joker Coins to continue",
  cancelLabel = "Cancel",
  primaryLabel = "Deposit Now",
  onCancel,
  onPrimary,
  onClose,
  className,
  ...props
}: ModalProps) {
  const titleId = "joker-modal-title";

  return (
    <div className={styles.viewport}>
      <div
        {...props}
        className={cx(styles.root, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <button type="button" className={styles.dismiss} onClick={onClose ?? onCancel} aria-label="Close">
          <CloseIcon />
        </button>
      </div>

      <div className={styles.body}>
        <p className={styles.message}>{children}</p>
        <div className={styles.actions}>
          <Button type="button" variant="ghost" fullWidth className={styles.cancelGhost} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button type="button" variant="primary" fullWidth onClick={onPrimary}>
            {primaryLabel}
          </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
