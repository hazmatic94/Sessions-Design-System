import { useState, type FocusEvent, type MouseEvent } from "react";
import { railSearchComingSoon } from "../../data/navigationData.js";
import { AssetIcon } from "./NavigationIcons.js";

export function RailSearch({
  className = "",
  placeholder = "Search",
  searchOpen,
  setSearchOpen,
  comingSoon = railSearchComingSoon,
}: {
  className?: string;
  placeholder?: string;
  searchOpen?: boolean;
  setSearchOpen?: (open: boolean) => void;
  comingSoon?: boolean;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = !comingSoon && (searchOpen ?? internalOpen);
  const setOpen = setSearchOpen ?? setInternalOpen;

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (comingSoon) {
      event.currentTarget.blur();
      return;
    }
    setOpen(true);
  };

  const handleClick = (event: MouseEvent<HTMLLabelElement>) => {
    if (!comingSoon) return;
    event.preventDefault();
  };

  return (
    <label
      className={`joker-rail-search-item ${isOpen ? "is-search-open" : ""} ${comingSoon ? "is-coming-soon" : ""} ${className}`.trim()}
      aria-label="Search navigation"
      aria-disabled={comingSoon || undefined}
      data-tooltip="Search"
      onClick={handleClick}
    >
      <AssetIcon icon="search" />
      <input
        type="search"
        placeholder={placeholder}
        disabled={comingSoon}
        readOnly={comingSoon}
        tabIndex={comingSoon ? -1 : undefined}
        onFocus={handleFocus}
        onKeyDown={(event) => {
          if (comingSoon) return;
          if (event.key === "Escape") {
            event.currentTarget.blur();
            setOpen(false);
          }
        }}
      />
    </label>
  );
}
