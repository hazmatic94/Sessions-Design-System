import { createElement, useEffect, useState } from "react";
import { Modal } from "../../../components/Modal/Modal.tsx";
import { WinModalCard } from "../../../components/WinModalCard/WinModalCard.tsx";

const WIN_MODAL_CREDIT = 88;

function parseShowroomBalanceAmount(value) {
  const numeric = Number(String(value).replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatShowroomBalanceAmount(value) {
  return Math.round(value).toLocaleString("en-US");
}

function WinModalShowroomDemo() {
  const [balance, setBalance] = useState("150,000");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setBalance((current) =>
        formatShowroomBalanceAmount(parseShowroomBalanceAmount(current) + WIN_MODAL_CREDIT),
      );
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <WinModalCard
      balance={balance}
      flyToWallet={false}
      onClose={() => {}}
    />
  );
}

/** @type {Record<string, () => import("react").ReactElement>} */
export const MODAL_REACT_DEMOS = {
  "modal-low-balance": () => createElement(Modal, { onClose: () => {}, onCancel: () => {}, onPrimary: () => {} }),
  "modal-win-card": () => createElement(WinModalShowroomDemo),
};
