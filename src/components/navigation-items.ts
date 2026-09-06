export type NavigationSection = "home" | "games" | "misc" | "account" | "topRail";

export type NavigationIconName =
  | "bell"
  | "bomb"
  | "black-jack"
  | "casino"
  | "castle"
  | "challenges"
  | "chicken-cross"
  | "chevrons-up-down"
  | "circle"
  | "coin-flip"
  | "coco-hut"
  | "crash"
  | "egg"
  | "favourites"
  | "gift"
  | "hi-lo"
  | "headphones"
  | "home"
  | "house"
  | "live-casino"
  | "live-support"
  | "log-out"
  | "message-square"
  | "messages"
  | "mines"
  | "new-releases"
  | "promotions"
  | "recently-played"
  | "rewards"
  | "rocket"
  | "search"
  | "sparkles"
  | "sugar-scratch"
  | "soccer"
  | "star"
  | "slots"
  | "timer"
  | "tower"
  | "roulette"
  | "rouletteSoon"
  | "vip"
  | "wallet";

export interface NavigationItemDefinition {
  id: string;
  label: string;
  icon: NavigationIconName;
  section: NavigationSection;
  href?: string;
  value?: string;
  tone?: "default" | "danger";
  badge?: boolean;
  comingSoon?: boolean;
}

export const navigationIconAssets = {
  home: "home.svg",
  favourites: "favourites.svg",
  "recently-played": "recently-played.svg",
  "new-releases": "new-releases.svg",
  crash: "crash.svg",
  "chicken-cross": "chicken-cross.svg",
  "coin-flip": "coin-flip.svg",
  mines: "mines.svg",
  "hi-lo": "hi-lo.svg",
  "coco-hut": "coco-hut.svg",
  tower: "tower.svg",
  casino: "casino.svg",
  slots: "slots.svg",
  "black-jack": "black-jack.svg",
  roulette: "roulette.svg",
  rouletteSoon: "roulette-soon.svg",
  "live-casino": "live-casino.svg",
  sparkles: "originals.svg",
  promotions: "promotions.svg",
  gift: "promotions.svg",
  bell: "bell.svg",
  messages: "messages.svg",
  "message-square": "messages.svg",
  challenges: "challenges.svg",
  vip: "vip.svg",
  "sugar-scratch": "sugar-scratch.svg",
  soccer: "soccer.svg",
  "live-support": "live-support.svg",
  rewards: "rewards.svg",
  "log-out": "log-out.svg",
} satisfies Partial<Record<NavigationIconName, string>>;

export const navigationItems = {
  home: { id: "home", label: "Home", icon: "home", href: "/home", section: "home" },
  favourites: { id: "favourites", label: "Favourites", icon: "favourites", href: "/favourites", section: "home" },
  recentlyPlayed: { id: "recently-played", label: "Recently Played", icon: "recently-played", href: "/recently-played", section: "home" },
  newReleases: { id: "new-releases", label: "New Releases", icon: "new-releases", href: "/new-releases", section: "home" },
  originals: { id: "originals", label: "Originals", icon: "sparkles", section: "games" },
  crash: { id: "crash", label: "Crash", icon: "crash", value: "crash", section: "games" },
  chickenCross: { id: "chicken-cross", label: "Chicken Cross", icon: "chicken-cross", value: "chicken-cross", section: "games" },
  coinFlip: { id: "coin-flip", label: "Coin Flip", icon: "coin-flip", value: "coin-flip", section: "games" },
  mines: { id: "mines", label: "Mines", icon: "mines", value: "mines", section: "games" },
  hilo: { id: "hilo", label: "Hilo", icon: "hi-lo", value: "hilo", section: "games" },
  cocoHut: { id: "coco-hut", label: "CocoHut", icon: "coco-hut", value: "coco-hut", section: "games" },
  tower: { id: "tower", label: "Tower", icon: "tower", value: "tower", section: "games" },
  casino: { id: "casino", label: "Casino", icon: "casino", section: "games" },
  slots: { id: "slots", label: "Slots", icon: "slots", value: "slots", section: "games" },
  blackjack: { id: "black-jack", label: "Blackjack", icon: "black-jack", value: "black-jack", section: "games" },
  roulette: { id: "roulette", label: "Roulette", icon: "roulette", value: "roulette", section: "games" },
  fcPlus: { id: "fc-plus", label: "FCPlus", icon: "soccer", value: "fc-plus", section: "games" },
  rouletteComingSoon: { id: "roulette-coming-soon", label: "Roulette", icon: "rouletteSoon", value: "roulette-coming-soon", section: "games" },
  liveCasino: { id: "live-casino", label: "Live Casino", icon: "live-casino", value: "live-casino", section: "games" },
  promotions: { id: "promotions", label: "Promotions", icon: "promotions", section: "games" },
  challenges: { id: "challenges", label: "Challenges", icon: "challenges", value: "challenges", section: "games" },
  vip: { id: "vip", label: "VIP", icon: "vip", value: "vip", section: "games" },
  sugarScratch: { id: "sugar-scratch", label: "Sugar Scratch", icon: "sugar-scratch", value: "sugar-scratch", section: "games" },
  soccer: { id: "soccer", label: "Soccer", icon: "soccer", href: "/sports/soccer", section: "games" },
  liveSupport: { id: "live-support", label: "Live Support", icon: "live-support", href: "/support", section: "misc" },
  rewards: { id: "rewards", label: "Rewards", icon: "rewards", href: "/rewards", section: "misc" },
  logout: { id: "logout", label: "Log Out", icon: "log-out", href: "/logout", section: "account", tone: "danger" },
  wallet: { id: "wallet", label: "Wallet", icon: "wallet", href: "/wallet", section: "topRail" },
  notifications: { id: "notifications", label: "Notifications", icon: "bell", section: "topRail", badge: true },
  messages: { id: "messages", label: "Messages", icon: "messages", section: "topRail" },
} satisfies Record<string, NavigationItemDefinition>;

export const gameMenuItems = [
  navigationItems.mines,
  navigationItems.hilo,
  navigationItems.coinFlip,
  navigationItems.roulette,
] as const;

export const comingSoonGameMenuItems = [
  navigationItems.crash,
  navigationItems.cocoHut,
] as const;
