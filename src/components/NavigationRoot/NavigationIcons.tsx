import { navigationIconSvg } from "../../data/navigationSvgIcons.js";

export function AssetIcon({ icon, className = "" }: { icon?: string; className?: string }) {
  if (!icon) return null;

  if (icon === "search") {
    return (
      <svg className={`system-icon nav-inline-icon ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M10.75 4a6.75 6.75 0 0 1 5.34 10.88l3.52 3.51-1.42 1.42-3.51-3.52A6.75 6.75 0 1 1 10.75 4Zm0 2a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z" fill="currentColor" />
      </svg>
    );
  }

  const svg = navigationIconSvg(icon, className);
  if (!svg) return <span className={`system-icon nav-custom-icon-missing ${className}`.trim()} aria-hidden="true" />;

  return <span className={`nav-inline-icon-host ${className}`.trim()} dangerouslySetInnerHTML={{ __html: svg }} aria-hidden="true" />;
}

export function WalletIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M1.89417 4.6875C2.57863 4.08212 3.46123 3.74858 4.375 3.75H15.625C16.5758 3.75 17.4442 4.10417 18.1058 4.6875C18.0297 4.08328 17.7357 3.52763 17.2789 3.12485C16.8221 2.72208 16.234 2.49989 15.625 2.5H4.375C3.766 2.49989 3.17791 2.72208 2.72113 3.12485C2.26435 3.52763 1.97029 4.08328 1.89417 4.6875ZM1.89417 7.1875C2.57863 6.58212 3.46123 6.24858 4.375 6.25H15.625C16.5758 6.25 17.4442 6.60417 18.1058 7.1875C18.0297 6.58328 17.7357 6.02763 17.2789 5.62485C16.8221 5.22208 16.234 4.99989 15.625 5H4.375C3.766 4.99989 3.17791 5.22208 2.72113 5.62485C2.26435 6.02763 1.97029 6.58328 1.89417 7.1875ZM4.375 7.5C3.71196 7.5 3.07607 7.76339 2.60723 8.23223C2.13839 8.70107 1.875 9.33696 1.875 10V15C1.875 15.663 2.13839 16.2989 2.60723 16.7678C3.07607 17.2366 3.71196 17.5 4.375 17.5H15.625C16.288 17.5 16.9239 17.2366 17.3928 16.7678C17.8616 16.2989 18.125 15.663 18.125 15V10C18.125 9.33696 17.8616 8.70107 17.3928 8.23223C16.9239 7.76339 16.288 7.5 15.625 7.5H12.5C12.3342 7.5 12.1753 7.56585 12.0581 7.68306C11.9408 7.80027 11.875 7.95924 11.875 8.125C11.875 8.62228 11.6775 9.09919 11.3258 9.45082C10.9742 9.80246 10.4973 10 10 10C9.50272 10 9.02581 9.80246 8.67417 9.45082C8.32254 9.09919 8.125 8.62228 8.125 8.125C8.125 7.95924 8.05915 7.80027 7.94194 7.68306C7.82473 7.56585 7.66576 7.5 7.5 7.5H4.375Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuIcon({ open }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {open ? (
        <>
          <path d="M18 6 6 18" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m6 6 12 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : (
        <>
          <path d="M4 6h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 12h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 18h16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
