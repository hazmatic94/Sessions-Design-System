import {navGroups} from '../../system-data.js?v=sessions-nav-trim-v1';
import {slug} from '../../utils.js';
import {hydrateLucideIcons} from '../../utils/lucideIcon.js?v=nav-outline-v1';
import {updateCustomScrollbars} from '../demo/customScrollbar.js?v=scrollbar-3px-v1';
import {navRoot} from './dom.js?v=docs-routing-v1';
import {
  getNavItemBadge,
  getNavItemIcon,
  getNavItemLabel,
  getNavItemRoute,
} from './navModel.js?v=nav-fix-2210';
import {state} from './state.js?v=docs-routing-v1';

export function renderNav() {
  const root = navRoot || document.querySelector('#primary-nav');
  if (!root) return;

  root.innerHTML = '';

  navGroups.forEach(group => {
    const section = document.createElement('section');
    section.className = `nav-section nav-section--${slug(group.title)}`;

    const heading = document.createElement('div');
    heading.className = 'nav-section-button';
    heading.textContent = group.title;

    const body = document.createElement('div');
    body.className = 'nav-section-body';

    let hasVisibleItems = false;

    if (group.items) {
      const links = createNavLinks(group.items, group.title);
      if (links.childElementCount > 0) {
        body.append(links);
        hasVisibleItems = true;
      }
    }

    if (group.groups) {
      group.groups.forEach(subgroup => {
        if (subgroup.items.length === 0) return;

        hasVisibleItems = true;

        const subsection = document.createElement('div');
        subsection.className = 'nav-subsection';

        const subheading = document.createElement('div');
        subheading.className = 'nav-subsection-button';
        subheading.textContent = subgroup.title;

        const links = document.createElement('div');
        links.className = 'nav-links nav-links--nested';
        subgroup.items.forEach(item => {
          links.append(createNavLink(item, getNavItemRoute(item, group.title)));
        });

        subsection.append(subheading, links);
        body.append(subsection);
      });
    }

    if (!hasVisibleItems) {
      section.hidden = true;
    }

    section.append(heading, body);
    root.append(section);
  });

  hydrateLucideIcons(root);
  updateCustomScrollbars();
}

function createNavLinks(items, sectionTitle) {
  const links = document.createElement('div');
  const variant = getNavVariant(sectionTitle);
  links.className = `nav-links${variant !== 'default' ? ` nav-links--${variant}` : ''}`;

  items.forEach(item => {
    links.append(
      createNavLink(item, getNavItemRoute(item, sectionTitle), {variant}),
    );
  });

  return links;
}

function getNavVariant(sectionTitle) {
  if (sectionTitle === 'Foundations') return 'foundations';
  if (sectionTitle === 'Getting Started') return 'getting-started';
  return 'default';
}

function shouldShowNavIcon(icon, variant) {
  return (
    Boolean(icon) &&
    (variant === 'foundations' || variant === 'getting-started')
  );
}

export function createNavLink(item, route, {variant = 'default'} = {}) {
  const label = getNavItemLabel(item);
  const icon = getNavItemIcon(item);
  const badge = getNavItemBadge(item);

  const link = document.createElement('a');
  link.className = `nav-link${variant !== 'default' ? ` nav-link--${variant}` : ''}${state.route === route ? ' active' : ''}`;
  link.href = `#${route}`;

  if (shouldShowNavIcon(icon, variant)) {
    const iconWrap = document.createElement('span');
    iconWrap.className = 'nav-link-icon-wrap';
    iconWrap.setAttribute('aria-hidden', 'true');

    const iconEl = document.createElement('span');
    iconEl.className = `nav-link-icon${variant === 'foundations' || variant === 'getting-started' ? ' nav-link-icon--md' : ''}`;
    iconEl.dataset.lucide = icon;
    iconWrap.append(iconEl);
    link.append(iconWrap);
  }

  const text = document.createElement('span');
  text.className = 'nav-link-label';
  text.textContent = label;
  link.append(text);

  if (badge) {
    const pill = document.createElement('span');
    pill.className = 'status-pill';
    pill.textContent = badge;
    link.append(pill);
  }

  return link;
}
