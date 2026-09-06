export const navGroups = [
  {
    title: 'Getting Started',
    items: [
      {
        label: 'Introduction',
        icon: 'rocket',
        route: '/getting-started/introduction',
      },
      {label: 'Installation', icon: 'package', route: '/installation'},
    ],
  },
  {
    title: 'Foundations',
    items: [
      {label: 'Colours', icon: 'palette'},
      {label: 'Typography', icon: 'type'},
      {label: 'Spacing', icon: 'move-horizontal'},
      {label: 'Radius', icon: 'squircle'},
      {label: 'Shadows', icon: 'layers'},
      {label: 'Motion', icon: 'timer'},
      {label: 'Icons', icon: 'shapes'},
    ],
  },
  {
    title: 'Components',
    items: [
      {
        label: 'Overview',
        icon: 'box',
        route: '/components',
      },
    ],
  },
];

export const foundationNotes = {
  Colours:
    'Primitive and semantic tokens keep colour usage clear and consistent.',
  Typography:
    'Reusable type styles create clear hierarchy across content and UI.',
  Spacing:
    'A consistent spacing scale keeps layouts, components and content aligned.',
  Radius:
    'Shared radius values keep controls, surfaces and containers visually consistent.',
  Shadows:
    'A simple elevation system separates overlays, menus and layered surfaces.',
  Motion:
    'Shared duration and easing values keep interactions quick, subtle and consistent.',
  Icons:
    'Consistent sizing and stroke standards keep icons clear across navigation, actions and states.',
};

export const spacingTokens = [
  {
    name: 'spacing4',
    value: 4,
    usage: 'Hairline gaps, icon nudges, and tiny control offsets.',
  },
  {
    name: 'spacing8',
    value: 8,
    usage: 'Compact gaps inside controls and tight grouped UI.',
  },
  {
    name: 'spacing12',
    value: 12,
    usage: 'Small stacked content, labels, and dense card spacing.',
  },
  {
    name: 'spacing16',
    value: 16,
    usage: 'Default component padding and common layout rhythm.',
  },
  {
    name: 'spacing24',
    value: 24,
    usage: 'Comfortable card padding and section grouping.',
  },
  {
    name: 'spacing32',
    value: 32,
    usage: 'Large component gaps and page content separation.',
  },
  {
    name: 'spacing40',
    value: 40,
    usage: 'Major layout spacing between content groups.',
  },
  {
    name: 'spacing64',
    value: 64,
    usage: 'Large section breaks and high-level page structure.',
  },
];

export const radiusTokens = [
  {name: 'cornerRad2Xs', value: 4},
  {name: 'cornerRadXs', value: 8},
  {name: 'cornerRadS', value: 12},
  {name: 'cornerRadM', value: 16},
  {name: 'cornerRadL', value: 28},
  {name: 'cornerRadXL', value: 42},
];

export const shadowTokens = [
  {
    name: 'shadow1',
    value: 'inset 0 0 0 1px rgb(255 255 255 / 0.08)',
    label: 'Inset shadow',
  },
  {
    name: 'shadow2',
    value: '0 1px 2px rgb(0 0 0 / 0.28), 0 0 0 1px rgb(255 255 255 / 0.06)',
    label: 'Classic panel low',
  },
  {
    name: 'shadow3',
    value: '0 8px 18px rgb(0 0 0 / 0.32), 0 0 0 1px rgb(255 255 255 / 0.07)',
    label: 'Classic panel raised',
  },
  {
    name: 'shadow4',
    value: '0 14px 30px rgb(0 0 0 / 0.38), 0 0 0 1px rgb(255 255 255 / 0.08)',
    label: 'Small overlay low',
  },
  {
    name: 'shadow5',
    value: '0 20px 44px rgb(0 0 0 / 0.44), 0 0 0 1px rgb(255 255 255 / 0.08)',
    label: 'Small overlay raised',
  },
  {
    name: 'shadow6',
    value: '0 30px 70px rgb(0 0 0 / 0.52), 0 0 0 1px rgb(255 255 255 / 0.1)',
    label: 'Dialog overlay',
  },
];

export const motionDurationTokens = [
  {
    name: 'motionInstant',
    value: '80ms',
    usage: 'Immediate feedback for small UI state changes.',
  },
  {
    name: 'motionFast',
    value: '120ms',
    usage: 'Hover, focus, press, and compact control transitions.',
  },
  {
    name: 'motionBase',
    value: '180ms',
    usage: 'Default component transitions and short content changes.',
  },
  {
    name: 'motionMedium',
    value: '240ms',
    usage: 'Menus, popovers, toasts, and small overlay entrances.',
  },
  {
    name: 'motionSlow',
    value: '320ms',
    usage: 'Drawers, larger overlays, and page-level UI shifts.',
  },
];

export const motionEasingTokens = [
  {
    name: 'easeStandard',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    usage: 'Default easing for most interface movement.',
  },
  {
    name: 'easeOut',
    value: 'cubic-bezier(0, 0, 0.2, 1)',
    usage: 'Entrances, reveals, and elements coming into view.',
  },
  {
    name: 'easeIn',
    value: 'cubic-bezier(0.4, 0, 1, 1)',
    usage: 'Exits and elements leaving the current context.',
  },
  {
    name: 'easeEmphasized',
    value: 'cubic-bezier(0.2, 0, 0, 1)',
    usage: 'Controlled emphasis for overlays and high-attention UI.',
  },
];

export const motionPatternTokens = [
  {
    name: 'motionFadeIn',
    output: 'opacity var(--motion-base) var(--ease-out)',
    usage: 'Content appearing after load or state changes.',
    preview: 'fade-in',
  },
  {
    name: 'motionScalePress',
    output: 'transform var(--motion-fast) var(--ease-standard)',
    usage: 'Button press and small tactile feedback.',
    preview: 'scale-press',
  },
  {
    name: 'motionSlideUp',
    output: 'transform var(--motion-medium) var(--ease-out)',
    usage: 'Menus, cards, and compact panels entering upward.',
    preview: 'slide-up',
  },
  {
    name: 'motionDrawerSlide',
    output: 'transform var(--motion-slow) var(--ease-emphasized)',
    usage: 'Side drawers and larger navigation panels.',
    preview: 'drawer-slide',
  },
  {
    name: 'motionLoadingShimmer',
    output: 'background-position var(--motion-slow) linear infinite',
    usage: 'Skeleton loading states that stay quiet.',
    preview: 'loading-shimmer',
  },
  {
    name: 'motionToastEntrance',
    output: 'transform var(--motion-medium) var(--ease-out)',
    usage: 'Toast and notification entrances.',
    preview: 'toast-entrance',
  },
];

export const iconSourceTokens = [
  {
    sample: 'Library',
    variable: '--icon-source',
    output: 'lucide-icons/lucide.git',
    usage: 'Primary source for production SVG icon assets.',
    icon: 'sparkles',
  },
  {
    sample: 'Package',
    variable: '--icon-package',
    output: 'lucide-static',
    usage: 'Static SVG package option for this docs shell and token export.',
    icon: 'package',
  },
  {
    sample: 'Style',
    variable: '--icon-style',
    output: 'outline / round caps',
    usage: 'Use Lucide outline icons with consistent stroke and joins.',
    icon: 'circle',
  },
];

export const iconSizeTokens = [
  {
    name: 'iconSizeXs',
    value: '12px',
    usage: 'Tiny metadata, dense table cells, and compact labels.',
    icon: 'dot',
  },
  {
    name: 'iconSizeSm',
    value: '16px',
    usage: 'Default controls, nav items, copy buttons, and tool actions.',
    icon: 'search',
  },
  {
    name: 'iconSizeMd',
    value: '20px',
    usage: 'Medium buttons, menu items, and product actions.',
    icon: 'check',
  },
  {
    name: 'iconSizeLg',
    value: '24px',
    usage: 'Empty states, page actions, and larger controls.',
    icon: 'alert-triangle',
  },
  {
    name: 'iconSizeXl',
    value: '32px',
    usage: 'Feature callouts and high-emphasis product moments.',
    icon: 'sparkles',
  },
];

export const iconStrokeTokens = [
  {
    name: 'iconStrokeDefault',
    value: '1.75px',
    usage: 'Default Sessions DS stroke weight for product icons.',
    icon: 'minus',
  },
  {
    name: 'iconStrokeStrong',
    value: '2px',
    usage: 'Use when an icon needs stronger visibility at small sizes.',
    icon: 'plus',
  },
];

export const iconUsageTokens = [
  {
    name: 'iconSearch',
    value: 'search',
    usage: 'Search inputs, command surfaces, and filtering.',
    icon: 'search',
  },
  {
    name: 'iconCopy',
    value: 'copy',
    usage: 'Copy actions for code, tokens, and values.',
    icon: 'copy',
  },
  {
    name: 'iconChevronDown',
    value: 'chevron-down',
    usage: 'Expandable nav sections, menus, and selects.',
    icon: 'chevron-down',
  },
  {
    name: 'iconCheck',
    value: 'check',
    usage: 'Success, complete, and selected states.',
    icon: 'check',
  },
  {
    name: 'iconAlertTriangle',
    value: 'alert-triangle',
    usage: 'Warnings, validation, and caution states.',
    icon: 'alert-triangle',
  },
  {
    name: 'iconSparkles',
    value: 'sparkles',
    usage: 'AI, assistive, or generated-system actions.',
    icon: 'sparkles',
  },
];

export const primitiveColorFamilies = [
  {
    title: 'bgWhite',
    tokens: [{name: 'jokerWhite50', value: '#ffffff', text: 'dark'}],
  },
  {
    title: 'bgBlack',
    tokens: [
      {name: 'jokerBlack50', value: '#A6A6A6', text: 'light'},
      {name: 'jokerBlack100', value: '#5F5F5F', text: 'light'},
      {name: 'jokerBlack200', value: '#3D3D3D', text: 'light'},
      {name: 'jokerBlack300', value: '#262626', text: 'light'},
      {name: 'jokerBlack400', value: '#212121', text: 'light', base: true},
      {name: 'jokerBlack500', value: '#1F1F1F', text: 'light'},
      {name: 'jokerBlack600', value: '#1B1B1B', text: 'light'},
      {name: 'jokerBlack700', value: '#171717', text: 'light'},
      {name: 'jokerBlack800', value: '#131313', text: 'light'},
      {name: 'jokerBlack900', value: '#000000', text: 'light'},
    ],
  },
  {
    title: 'Gold',
    tokens: [
      {name: 'jokerGold50', value: '#FFF4E0', text: 'dark'},
      {name: 'jokerGold100', value: '#FFEAC7', text: 'dark'},
      {name: 'jokerGold200', value: '#FFE8C2', text: 'dark'},
      {name: 'jokerGold300', value: '#FFE4B8', text: 'dark'},
      {name: 'jokerGold400', value: '#FFDEA8', text: 'dark', base: true},
      {name: 'jokerGold500', value: '#BBA072', text: 'dark'},
      {name: 'jokerGold600', value: '#A88C5D', text: 'dark'},
      {name: 'jokerGold700', value: '#8E7348', text: 'dark'},
      {name: 'jokerGold800', value: '#65512F', text: 'dark'},
      {name: 'jokerGold900', value: '#382E23', text: 'light'},
      {name: 'jokerGold1000', value: '#1D1811', text: 'light'},
    ],
  },
  {
    title: 'Green',
    tokens: [
      {name: 'jokerGreen50', value: '#D8F8DE', text: 'dark'},
      {name: 'jokerGreen100', value: '#C5F4CD', text: 'dark'},
      {name: 'jokerGreen200', value: '#B2F1BC', text: 'dark'},
      {name: 'jokerGreen300', value: '#8BE99B', text: 'dark'},
      {name: 'jokerGreen400', value: '#3EDB58', text: 'dark', base: true},
      {name: 'jokerGreen500', value: '#33B849', text: 'dark'},
      {name: 'jokerGreen600', value: '#28953A', text: 'dark'},
      {name: 'jokerGreen700', value: '#1F712C', text: 'dark'},
      {name: 'jokerGreen800', value: '#134E1D', text: 'light'},
      {name: 'jokerGreen900', value: '#0D3D15', text: 'light'},
    ],
  },
  {
    title: 'Red',
    tokens: [
      {name: 'jokerRed50', value: '#F6D2D2', text: 'dark'},
      {name: 'jokerRed100', value: '#F3BFBF', text: 'dark'},
      {name: 'jokerRed200', value: '#EFADAD', text: 'dark'},
      {name: 'jokerRed300', value: '#E98888', text: 'dark'},
      {name: 'jokerRed400', value: '#DB3E3E', text: 'dark', base: true},
      {name: 'jokerRed500', value: '#BA3434', text: 'dark'},
      {name: 'jokerRed600', value: '#982929', text: 'dark'},
      {name: 'jokerRed700', value: '#771F1F', text: 'dark'},
      {name: 'jokerRed800', value: '#551414', text: 'light'},
      {name: 'jokerRed900', value: '#450F0F', text: 'light'},
    ],
  },
  {
    title: 'Alert',
    tokens: [
      {name: 'jokerAlert50', value: '#F4D6C5', text: 'dark'},
      {name: 'jokerAlert100', value: '#F1C9B2', text: 'dark'},
      {name: 'jokerAlert200', value: '#E9AE8B', text: 'dark'},
      {name: 'jokerAlert300', value: '#E29365', text: 'dark'},
      {name: 'jokerAlert400', value: '#DB783E', text: 'dark', base: true},
      {name: 'jokerAlert500', value: '#B56333', text: 'dark'},
      {name: 'jokerAlert600', value: '#904E28', text: 'dark'},
      {name: 'jokerAlert700', value: '#572F17', text: 'light'},
      {name: 'jokerAlert800', value: '#452411', text: 'light'},
      {name: 'jokerAlert900', value: '#1F0F06', text: 'light'},
    ],
  },
];

export const semanticColorGroups = [
  {
    title: 'Background',
    tokens: [
      {
        name: 'color.bg.canvas',
        value: 'jokerBlack800',
        use: 'Main documentation canvas',
      },
      {
        name: 'color.bg.app',
        value: 'jokerBlack900',
        use: 'Outer app chrome and deepest page areas',
      },
      {
        name: 'color.bg.sidebar',
        value: 'jokerBlack900',
        use: 'Left and right navigation rails',
      },
      {
        name: 'color.bg.surface',
        value: 'jokerBlack700',
        use: 'Cards, panels, and repeated content blocks',
      },
      {
        name: 'color.bg.surfaceRaised',
        value: 'jokerBlack600',
        use: 'Raised or emphasized surfaces',
      },
      {
        name: 'color.bg.surfaceActive',
        value: 'jokerBlack400',
        use: 'Selected navigation and active surfaces',
      },
      {
        name: 'color.bg.code',
        value: 'jokerBlack900',
        use: 'Code editor backgrounds',
      },
      {
        name: 'color.bg.inverse',
        value: 'jokerWhite50',
        use: 'White controls and inverse content',
      },
    ],
  },
  {
    title: 'Text',
    tokens: [
      {
        name: 'color.text.primary',
        value: 'jokerWhite50',
        use: 'Primary headings and high-emphasis copy',
      },
      {
        name: 'color.text.secondary',
        value: 'jokerBlack50',
        use: 'Default body copy and nav labels',
      },
      {
        name: 'color.text.muted',
        value: 'jokerBlack100',
        use: 'Subtle metadata, placeholders, and secondary labels',
      },
      {
        name: 'color.text.inverse',
        value: 'jokerBlack900',
        use: 'Text on white or pale gold surfaces',
      },
      {
        name: 'color.text.brand',
        value: 'jokerGold400',
        use: 'Brand moments and premium emphasis',
      },
    ],
  },
  {
    title: 'Border',
    tokens: [
      {
        name: 'color.border.subtle',
        value: 'whiteAlpha08',
        use: 'Dividers and low-emphasis outlines',
      },
      {
        name: 'color.border.default',
        value: 'jokerBlack300',
        use: 'Default controls, panels, and cards',
      },
      {
        name: 'color.border.strong',
        value: 'jokerBlack100',
        use: 'Higher contrast borders and active outlines',
      },
      {
        name: 'color.border.focus',
        value: 'jokerGold400',
        use: 'Keyboard focus and selected emphasis',
      },
    ],
  },
  {
    title: 'Action',
    tokens: [
      {
        name: 'color.action.primary',
        value: 'jokerGold400',
        use: 'Primary action fill and premium CTA emphasis',
      },
      {
        name: 'color.action.primaryHover',
        value: 'jokerGold300',
        use: 'Primary action hover',
      },
      {
        name: 'color.action.primaryActive',
        value: 'jokerGold500',
        use: 'Primary action pressed state',
      },
      {
        name: 'color.action.onPrimary',
        value: 'jokerBlack900',
        use: 'Text or icon on primary action fills',
      },
    ],
  },
  {
    title: 'State',
    tokens: [
      {
        name: 'color.selection.bg',
        value: 'jokerBlack400',
        use: 'Selected navigation and active rows',
      },
      {
        name: 'color.status.available',
        value: 'jokerGold400',
        use: 'Available, ready, or healthy status indicators',
      },
      {
        name: 'color.status.success',
        value: 'jokerGreen400',
        use: 'Success states, approvals, completion, and positive feedback',
      },
      {
        name: 'color.status.successSurface',
        value: 'jokerGreen900',
        use: 'Low-emphasis success backgrounds',
      },
      {
        name: 'color.status.error',
        value: 'jokerRed400',
        use: 'Errors, destructive feedback, failed states, and blocking validation',
      },
      {
        name: 'color.status.errorSurface',
        value: 'jokerRed900',
        use: 'Low-emphasis error backgrounds',
      },
      {
        name: 'color.status.warning',
        value: 'jokerAlert400',
        use: 'Warnings, caution, pending, and attention states',
      },
      {
        name: 'color.status.warningSurface',
        value: 'jokerAlert900',
        use: 'Low-emphasis warning backgrounds',
      },
    ],
  },
];

export const componentSummaries = {
  Overview:
    'This is the empty component library. Add a page here when you start a new Sessions component.',
};

export const resources = {
  Introduction:
    'Overview of the Sessions Design System, how the docs site is organized, and where to start.',
};
