export { navigationIconAssets } from "./navigationIconAssets.js";
export const navigationItemRegistry = {
    home: { label: "Home", icon: "home", href: "/home", section: "home" },
    favourites: { label: "Favourites", icon: "favourites", href: "/favourites", section: "home" },
    recentlyPlayed: { label: "Recently Played", icon: "recently-played", href: "/recently-played", section: "home" },
    newReleases: { label: "New Releases", icon: "new-releases", href: "/new-releases", section: "home" },
    originals: { label: "Originals", icon: "sparkles", section: "games" },
    crash: { label: "Crash", icon: "crash", value: "crash", section: "games" },
    chickenCross: { label: "Chicken Cross", icon: "chicken-cross", value: "chicken-cross", section: "games" },
    coinFlip: { label: "Coin Flip", icon: "coin-flip", value: "coin-flip", section: "games" },
    mines: { label: "Mines", icon: "mines", value: "mines", section: "games" },
    hilo: { label: "Hilo", icon: "hi-lo", value: "hilo", section: "games" },
    cocoHut: { label: "CocoHut", icon: "coco-hut", value: "coco-hut", section: "games" },
    tower: { label: "Tower", icon: "tower", value: "tower", section: "games" },
    casino: { label: "Casino", icon: "casino", section: "games" },
    slots: { label: "Slots", icon: "slots", value: "slots", section: "games" },
    blackjack: { label: "Blackjack", icon: "black-jack", value: "black-jack", section: "games" },
    roulette: { label: "Roulette", icon: "roulette", value: "roulette", section: "games" },
    fcPlus: { label: "FCPlus", icon: "soccer", value: "fc-plus", section: "games" },
    rouletteComingSoon: { label: "Roulette", icon: "rouletteSoon", value: "roulette-coming-soon", section: "games" },
    liveCasino: { label: "Live Casino", icon: "live-casino", value: "live-casino", section: "games" },
    promotions: { label: "Promotions", icon: "promotions", section: "games" },
    challenges: { label: "Challenges", icon: "challenges", value: "challenges", section: "games" },
    vip: { label: "VIP", icon: "vip", value: "vip", section: "games" },
    sugarScratch: { label: "Sugar Scratch", icon: "sugar-scratch", value: "sugar-scratch", section: "games" },
    soccer: { label: "Soccer", icon: "soccer", href: "/sports/soccer", section: "games" },
    liveSupport: { label: "Live Support", icon: "live-support", href: "/support", section: "misc" },
    rewards: { label: "Rewards", icon: "rewards", href: "/rewards", section: "misc" },
    logout: { label: "Log Out", icon: "log-out", href: "/logout", section: "account", tone: "danger" },
    wallet: { label: "Wallet", icon: "wallet", href: "/wallet", section: "topRail" },
    notifications: { label: "Notifications", icon: "bell", section: "topRail" },
    messages: { label: "Messages", icon: "messages", section: "topRail" },
};
export function withComingSoon(item) {
    return { ...item, comingSoon: true };
}
export const gameMenuItems = [
    navigationItemRegistry.mines,
    navigationItemRegistry.hilo,
    navigationItemRegistry.coinFlip,
    navigationItemRegistry.roulette,
];
export const comingSoonGameMenuItems = [
    navigationItemRegistry.crash,
    navigationItemRegistry.cocoHut,
];
export const mainNavHomeItems = [
    withComingSoon(navigationItemRegistry.home),
    withComingSoon(navigationItemRegistry.favourites),
    withComingSoon(navigationItemRegistry.recentlyPlayed),
    withComingSoon(navigationItemRegistry.newReleases),
];
export const casinoGroupMenuItems = [
    navigationItemRegistry.slots,
    navigationItemRegistry.blackjack,
    navigationItemRegistry.roulette,
    navigationItemRegistry.liveCasino,
];
export const promotionsGroupMenuItems = [
    navigationItemRegistry.challenges,
    navigationItemRegistry.vip,
];
export const mainNavGameLinkItems = [
    withComingSoon(navigationItemRegistry.sugarScratch),
    withComingSoon(navigationItemRegistry.fcPlus),
];
export const mainNavSupportItems = [
    withComingSoon(navigationItemRegistry.liveSupport),
    withComingSoon(navigationItemRegistry.rewards),
];
export const railSearchComingSoon = true;
