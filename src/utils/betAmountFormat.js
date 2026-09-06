export function sanitizeBetAmount(raw) {
  const cleaned = String(raw).replace(/,/g, "").replace(/[^\d.]/g, "");
  if (!cleaned) return "";

  const [whole, ...fraction] = cleaned.split(".");
  if (cleaned.endsWith(".") && fraction.length === 0) {
    return whole.length ? `${whole}.` : "";
  }

  return fraction.length ? `${whole}.${fraction.join("")}` : whole;
}

export function formatBetAmountDisplay(raw) {
  const sanitized = sanitizeBetAmount(raw);
  if (!sanitized) return "";

  const hasTrailingDot = sanitized.endsWith(".");
  const [whole, ...fractionParts] = sanitized.split(".");
  const fraction = fractionParts.join("");
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (hasTrailingDot && !fraction) {
    return `${formattedWhole}.`;
  }

  return fraction ? `${formattedWhole}.${fraction}` : formattedWhole;
}
