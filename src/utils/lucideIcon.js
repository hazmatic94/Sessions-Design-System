export function hydrateLucideIcons(root = document) {
  root.querySelectorAll('[data-lucide]').forEach(placeholder => {
    const fill = placeholder.getAttribute('fill');
    const strokeWidth = placeholder.getAttribute('stroke-width');
    if (fill != null || strokeWidth != null) {
      placeholder.innerHTML = lucideIcon(placeholder.dataset.lucide, '', {
        fill: fill ?? undefined,
        strokeWidth: strokeWidth ?? undefined,
      });
      return;
    }
    placeholder.innerHTML = lucideIcon(placeholder.dataset.lucide);
  });
}

export function lucideIcon(name, className = '', {fill, strokeWidth} = {}) {
  const paths = {
    'alert-triangle':
      '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>',
    'arrow-left': '<path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path>',
    'arrow-left-right':
      '<path d="M8 7H3l3-3"></path><path d="M3 7h14"></path><path d="M16 17h5l-3 3"></path><path d="M21 17H7"></path>',
    'arrow-right': '<path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>',
    bomb: '<path d="M14.5 6.5 17 4"></path><path d="M18 2l4 4"></path><path d="M20 4h-3"></path><path d="M20 4v3"></path><circle cx="10" cy="14" r="7"></circle>',
    castle:
      '<path d="M4 22V9h3V4h3v5h4V4h3v5h3v13Z"></path><path d="M9 22v-6a3 3 0 0 1 6 0v6"></path>',
    check: '<path d="M20 6 9 17l-5-5"></path>',
    'chevron-down': '<path d="m6 9 6 6 6-6"></path>',
    'chevron-left': '<path d="m15 18-6-6 6-6"></path>',
    'chevron-right': '<path d="m9 18 6-6-6-6"></path>',
    'chevron-up': '<path d="m18 15-6-6-6 6"></path>',
    'chevrons-up-down':
      '<path d="m7 8 5-5 5 5Z"></path><path d="m7 16 5 5 5-5Z"></path>',
    circle: '<circle cx="12" cy="12" r="8"></circle>',
    'circle-alert':
      '<circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>',
    crown:
      '<path d="m2 7 4.4 3.3L9 4l3 6 3-6 2.6 6.3L22 7l-2 11H4L2 7Z"></path><path d="M4 21h16"></path>',
    dot: '<circle cx="12" cy="12" r="2"></circle>',
    egg: '<path d="M19 14.5c0 4.14-3.13 7.5-7 7.5s-7-3.36-7-7.5C5 9.9 8.1 2 12 2s7 7.9 7 12.5Z"></path><path d="M7.5 14.5c1 .8 1.9.8 2.8 0s1.8-.8 2.7 0 1.8.8 3 0"></path>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"></path><circle cx="12" cy="12" r="3"></circle>',
    headphones:
      '<path d="M3 14v3a3 3 0 0 0 3 3h1v-8H6a3 3 0 0 0-3 2Z"></path><path d="M21 14v3a3 3 0 0 1-3 3h-1v-8h1a3 3 0 0 1 3 2Z"></path><path d="M3 14a9 9 0 0 1 18 0"></path>',
    heart:
      '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6a5 5 0 1 1 7.5 6.6Z"></path>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
    'log-out':
      '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path>',
    'loader-circle': '<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>',
    bell: '<path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2v1h16v-1l-2-2Z"></path><path d="M10.25 21a2 2 0 0 0 3.5 0Z"></path>',
    'book-open':
      '<path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>',
    box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>',
    menu: '<path d="M4 6h16"></path><path d="M4 12h16"></path><path d="M4 18h16"></path>',
    gift: '<path d="M20 7h-2.17A3.001 3.001 0 0 0 12.5 4.1L12 5l-.5-.9A3.001 3.001 0 0 0 6.17 7H4a1 1 0 0 0-1 1v3h18V8a1 1 0 0 0-1-1Z"></path><path d="M5 13v6a2 2 0 0 0 2 2h4v-8H5Z"></path><path d="M13 13v8h4a2 2 0 0 0 2-2v-6h-6Z"></path>',
    house:
      '<path d="M3 10.75 12 3l9 7.75V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.25Z"></path>',
    info: '<circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>',
    'info-filled':
      '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z"></path>',
    'message-square':
      '<path d="M7 3h10a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4Z"></path>',
    minus: '<path d="M5 12h14"></path>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>',
    package:
      '<path d="m7.5 4.27 9 5.15"></path><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>',
    plus: '<path d="M5 12h14"></path><path d="M12 5v14"></path>',
    rocket:
      '<path d="M4.5 16.5c-1.5 1.26-2 4-2 4s2.74-.5 4-2c.7-.84.69-2.12-.08-2.9a2.18 2.18 0 0 0-2.92-.1Z"></path><path d="m12 15-3-3a22 22 0 0 1 2-5.1A11 11 0 0 1 21 2a11 11 0 0 1-4.9 10 22 22 0 0 1-5.1 2Z"></path><path d="M9 12H4l3-3"></path><path d="M12 15v5l3-3"></path><circle cx="16" cy="7" r="1.5"></circle>',
    search:
      '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
    'search-filled':
      '<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM2 10.5a8.5 8.5 0 1 1 15.18 5.24l4.04 4.04a1 1 0 1 1-1.42 1.42l-4.04-4.04A8.5 8.5 0 0 1 2 10.5Z"></path>',
    'shield-check-filled':
      '<path d="M12 2 4.5 5.2v5.9c0 4.65 3.18 8.98 7.5 10.17 4.32-1.19 7.5-5.52 7.5-10.17V5.2L12 2Zm3.65 7.75-4.2 4.2a1 1 0 0 1-1.4 0l-1.7-1.7 1.4-1.4.99.99 3.51-3.5 1.4 1.41Z"></path>',
    sparkles:
      '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"></path>',
    sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>',
    timer:
      '<path d="M10 2h4"></path><path d="M12 14v-4"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 13a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"></path>',
    'app-window':
      '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path>',
    'badge-check':
      '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path><path d="m9 12 2 2 4-4"></path>',
    compass:
      '<circle cx="12" cy="12" r="10"></circle><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z"></path>',
    'gamepad-2':
      '<line x1="6" x2="10" y1="11" y2="11"></line><line x1="8" x2="8" y1="9" y2="13"></line><line x1="15" x2="15.01" y1="12" y2="12"></line><line x1="18" x2="18.01" y1="10" y2="10"></line><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5Z"></path>',
    layers:
      '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
    'layout-grid':
      '<rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect>',
    list: '<line x1="8" x2="21" y1="6" y2="6"></line><line x1="8" x2="21" y1="12" y2="12"></line><line x1="8" x2="21" y1="18" y2="18"></line><line x1="3" x2="3.01" y1="6" y2="6"></line><line x1="3" x2="3.01" y1="12" y2="12"></line><line x1="3" x2="3.01" y1="18" y2="18"></line>',
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>',
    'move-horizontal':
      '<path d="m18 8 4 4-4 4"></path><path d="M2 12h20"></path><path d="m6 16-4-4 4-4"></path>',
    'mouse-pointer-click':
      '<path d="m9 9 5 12 1.8-5.2L21 14Z"></path><path d="M7.2 2.2 8 5.1"></path><path d="m5.1 8-2.9-.8"></path><path d="M14 4.1 12 6"></path><path d="m6 12-1.9 2"></path>',
    palette:
      '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
    'panel-top':
      '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path>',
    pipette:
      '<path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a.5.5 0 0 0 .5.5h1.344a2 2 0 0 0 1.414-.586L15 12"></path><path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z"></path><path d="m2 22 .414-.414"></path>',
    'rows-3':
      '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M21 9H3"></path><path d="M21 15H3"></path>',
    shapes:
      '<path d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"></path><rect x="3" y="14" width="7" height="7" rx="1"></rect><circle cx="17.5" cy="17.5" r="3.5"></circle>',
    squircle:
      '<path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9Z"></path>',
    'square-stack':
      '<path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path><rect width="8" height="8" x="14" y="14" rx="2"></rect>',
    table:
      '<path d="M12 3v18"></path><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M3 15h18"></path>',
    'text-cursor-input':
      '<path d="M5 4v16"></path><path d="M12 4v16"></path><path d="M19 4v16"></path><path d="M5 8h14"></path><path d="M5 16h14"></path>',
    type: '<path d="M12 4v16"></path><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"></path><path d="M9 20h6"></path>',
    'trash-2':
      '<path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path>',
    wallet:
      '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5"></path><path d="M18 12h.01"></path>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  };

  const iconPaths = paths[name] || paths.circle;
  const usesLucideFill =
    fill != null || strokeWidth != null;

  if (usesLucideFill) {
    const resolvedFill = fill ?? 'none';
    const resolvedStrokeWidth =
      strokeWidth ?? 'var(--icon-preview-stroke, 1.75)';

    return `
    <svg class="system-icon${className ? ` ${className}` : ''}" viewBox="0 0 24 24" fill="${resolvedFill}" stroke="currentColor" stroke-width="${resolvedStrokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${iconPaths}
    </svg>
  `;
  }

  return `
    <svg class="system-icon${className ? ` ${className}` : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="var(--icon-preview-stroke, 1.75)" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      ${iconPaths}
    </svg>
  `;
}
