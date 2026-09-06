import { slug } from "../../utils.js";

export function getNavItemLabel(item) {
  return typeof item === "string" ? item : item.label;
}

export function getNavItemIcon(item) {
  return typeof item === "object" ? item.icon : undefined;
}

export function getNavItemBadge(item) {
  return typeof item === "object" ? item.badge : undefined;
}

export function getNavSectionSlug(sectionTitle) {
  if (sectionTitle === "Components") return "components";
  return slug(sectionTitle);
}

export function getNavItemRoute(item, sectionTitle) {
  if (typeof item === "object" && item.route) return item.route;
  return `/${getNavSectionSlug(sectionTitle)}/${slug(getNavItemLabel(item))}`;
}

export function flattenNavGroups(navGroups) {
  const entries = [];

  navGroups.forEach((group) => {
    if (group.items) {
      group.items.forEach((item) => {
        entries.push({
          section: group.title,
          label: getNavItemLabel(item),
          route: getNavItemRoute(item, group.title),
        });
      });
    }

    if (group.groups) {
      group.groups.forEach((subgroup) => {
        subgroup.items.forEach((item) => {
          entries.push({
            section: group.title,
            label: getNavItemLabel(item),
            route: getNavItemRoute(item, group.title),
          });
        });
      });
    }
  });

  const seen = new Set();
  return entries.filter((entry) => {
    if (seen.has(entry.route)) return false;
    seen.add(entry.route);
    return true;
  });
}

