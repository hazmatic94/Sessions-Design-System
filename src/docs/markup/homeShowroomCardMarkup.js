import {escapeHtml} from '../../utils.js';

export function homeShowroomCardMarkup({railLabel, body, href, innerMedia}) {
  const safeRailLabel = escapeHtml(railLabel);
  const safeBody = escapeHtml(body);
  const safeHref = escapeHtml(href || '#/home');

  return `
    <article class="joker-showroom-card joker-showroom-card--home">
      <a
        class="joker-showroom-card-home-stretched-link"
        href="${safeHref}"
        aria-label="${safeRailLabel}: ${safeBody}"></a>
      <div class="joker-showroom-card-media">
        <div class="joker-showroom-card-media-frame">
          <div class="joker-showroom-card-media-art">
            <div class="joker-showroom-card-image" data-showroom-card-image>${innerMedia || ''}</div>
          </div>
        </div>
      </div>
      <div class="joker-showroom-card-top-rail joker-showroom-card-home-footer">
        <div class="joker-showroom-card-home-copy">
          <p class="joker-showroom-card-home-title">${safeRailLabel}</p>
          <p class="joker-showroom-card-home-body">${safeBody}</p>
        </div>
      </div>
    </article>
  `;
}
