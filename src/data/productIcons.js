export const productIconFiles = [
  'Icon3Day.svg',
  'IconArrow.svg',
  'IconCalendar.svg',
  'IconCard.svg',
  'IconCash.svg',
  'IconCehvronRight.svg',
  'IconChevronDown.svg',
  'IconChevronLeft.svg',
  'IconChevronUp.svg',
  'IconClients.svg',
  'IconClose.svg',
  'IconCoins.svg',
  'IconDay.svg',
  'IconDelete.svg',
  'IconEdit.svg',
  'IconError.svg',
  'IconFilters.svg',
  'IconFlag.svg',
  'IconHelp.svg',
  'IconHome.svg',
  'IconLogout.svg',
  'IconMenu.svg',
  'IconMonth.svg',
  'IconMore.svg',
  'IconNotifications.svg',
  'IconPercentage.svg',
  'IconPlus.svg',
  'IconRefresh.svg',
  'IconSearch.svg',
  'IconSettings.svg',
  'IconSheduledTeam.svg',
  'IconSort.svg',
  'IconSplit.svg',
  'IconSuccess.svg',
  'IconTeam.svg',
  'IconTime.svg',
  'IconTrash.svg',
  'IconUserAdd.svg',
  'IconWalkIn.svg',
  'IconWeek.svg',
  'IConSwitch.svg',
];

export function productIconLabel(file) {
  const name = file.replace(/\.svg$/i, '').replace(/^Icon/i, '');
  return name
    .replace(/(\d)([A-Za-z])/g, '$1 $2')
    .replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function productIconPath(file) {
  return `/assets/${file}`;
}
