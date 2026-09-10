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
      {label: 'Button', route: '/components/buttons'},
      {label: 'Inputs', route: '/components/inputs'},
      {label: 'Navigation', route: '/components/navigation'},
      {label: 'Modals', route: '/components/modals'},
      {label: 'Chips', route: '/components/chips'},
      {label: 'Betting Panel', route: '/components/betting-panel'},
      {label: 'Cards', route: '/components/cards'},
      {label: 'Game Rails', route: '/components/game-rails'},
    ],
  },
  {
    title: 'Patterns',
    items: [
      {label: 'Page Header', route: '/patterns/page-header'},
      {label: 'Metric Value', route: '/patterns/metric-value'},
      {label: 'Metric Row', route: '/patterns/metric-row'},
      {label: 'Legend Item', route: '/patterns/legend-item'},
      {label: 'Chart Grid', route: '/patterns/chart-grid'},
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
    title: 'Black',
    tokens: [
      {name: 'black50', value: '#A8A8A8', text: 'dark'},
      {name: 'black100', value: '#7D7D7D', text: 'dark'},
      {name: 'black200', value: '#595959', text: 'light'},
      {name: 'black300', value: '#343434', text: 'light'},
      {name: 'black400', value: '#2A2A2A', text: 'light', base: true},
      {name: 'black500', value: '#222222', text: 'light'},
      {name: 'black600', value: '#1C1C1C', text: 'light'},
      {name: 'black700', value: '#181818', text: 'light'},
      {name: 'black800', value: '#141414', text: 'light'},
      {name: 'black900', value: '#0F0F0F', text: 'light'},
    ],
  },
  {
    title: 'Green',
    tokens: [
      {name: 'green50', value: '#F4F8F3', text: 'dark'},
      {name: 'green100', value: '#E4EDE2', text: 'dark'},
      {name: 'green200', value: '#C8D7C5', text: 'dark'},
      {name: 'green300', value: '#A5BC9F', text: 'dark'},
      {name: 'green400', value: '#82A17A', text: 'dark'},
      {name: 'green500', value: '#5F8660', text: 'light', base: true},
      {name: 'green600', value: '#47684A', text: 'light'},
      {name: 'green700', value: '#304834', text: 'light'},
      {name: 'green800', value: '#18271D', text: 'light'},
      {name: 'green900', value: '#07110B', text: 'light'},
    ],
  },
];

export const semanticColorGroups = [
  {
    title: 'Surface',
    tokens: [
      {
        name: 'color.surface.background',
        value: 'black900',
        use: 'Outermost app chrome and deepest page areas',
      },
      {
        name: 'color.surface.base',
        value: 'black800',
        use: 'Primary shell surfaces such as the sidebar and main frame',
      },
      {
        name: 'color.surface.elevated',
        value: 'black700',
        use: 'Content canvas and repeated surface blocks',
      },
      {
        name: 'color.surface.hover',
        value: 'black600',
        use: 'Hover fill for elevated controls and interactive surfaces',
      },
      {
        name: 'color.surface.panel',
        value: 'black600',
        use: 'Raised panels, cards, and emphasized surfaces',
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
        value: 'black50',
        use: 'Default body copy and nav labels',
      },
      {
        name: 'color.text.muted',
        value: 'black100',
        use: 'Subtle metadata, placeholders, and secondary labels',
      },
      {
        name: 'color.text.inverse',
        value: 'black900',
        use: 'Text on white or pale gold surfaces',
      },
      {
        name: 'color.text.brand',
        value: 'green300',
        use: 'Brand moments and premium emphasis',
      },
    ],
  },
  {
    title: 'Border',
    tokens: [
      {
        name: 'color.border.subtle',
        value: 'black400',
        use: 'Low-emphasis dividers and outlines',
      },
      {
        name: 'color.border.default',
        value: 'black300',
        use: 'Default controls, panels, and cards',
      },
      {
        name: 'color.border.strong',
        value: 'black200',
        use: 'Higher contrast borders and active outlines',
      },
      {
        name: 'color.border.focus',
        value: 'green700',
        use: 'Keyboard focus and selected emphasis',
      },
      {
        name: 'color.border.brand',
        value: 'green500',
        use: 'Brand accents on borders and emphasis rings',
      },
    ],
  },
  {
    title: 'Interaction',
    tokens: [
      {
        name: 'color.interaction.hover',
        value: 'black600',
        use: 'Hover fill for selector rows and interactive list items',
      },
      {
        name: 'color.interaction.pressed',
        value: 'black600',
        use: 'Pressed fill for selector rows and interactive list items',
      },
      {
        name: 'color.interaction.selected',
        value: 'black400',
        use: 'Selected fill for selector rows and interactive list items',
      },
      {
        name: 'color.interaction.disabled',
        value: 'black600',
        use: 'Disabled fill for selector rows and interactive list items',
      },
    ],
  },
];

export const patternSummaries = {
  'Page Header':
    'A consistent page title and supporting body line for top-of-page context.',
  'Metric Value':
    'A flexible metric display for currency totals, counts, and optional period labels.',
  'Metric Row':
    'A compact inline label and value row for appointment and summary stats.',
  'Legend Item':
    'A colored dot and label for chart legends and status keys.',
  'Chart Grid':
    'A 7 by 4 chart grid for plotting sales and appointment data.',
};

export const componentSummaries = {
  Buttons:
    'Shared button styles create clear hierarchy across primary, secondary and supporting actions.',
  Inputs:
    'Flexible field patterns support data entry, validation, prefixes and verification states.',
  Navigation:
    'Shared navigation patterns keep routes, active states and wayfinding consistent.',
  'Game Rails':
    'Shared rails keep game identity, information and controls in predictable locations.',
  Cards:
    'Reusable card patterns group related content, summaries and repeated information.',
  'Betting Panel':
    'A shared panel structure keeps betting controls consistent while giving each game room for its own mechanics.',
  Modals:
    'Focused overlays handle confirmations, key decisions and tasks requiring immediate attention.',
  Tables:
    'Data-dense structures for comparison, filtering, review, and operational product actions.',
  Tabs: 'Local navigation patterns for switching related views inside one focused product context.',
  Chips:
    'Compact chips communicate multipliers, outcomes and game states without adding unnecessary UI.',
};

export const resources = {
  Introduction:
    'Overview of the Sessions Design System, how the docs site is organized, and where to start.',
  Showroom:
    'A place for composed screens and end-to-end UI previews.',
};
