import {slug} from '../../utils.js';

export function renderIntroductionPage(_page) {
  return `
    <section class="page-hero introduction-hero">
      <div class="page-hero-main">
        <div class="page-hero-copy">
          <div class="page-hero-text">
            <h1>Introduction</h1>
            <p class="lede">The Sessions Design System keeps the docs pages and preview frames. The old product demos inside those frames are gone so new components can go in.</p>
          </div>
        </div>
      </div>
    </section>
    <div class="introduction-page">
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('A System Before Screens', {
        lede: 'Every interface starts with the same foundation.',
        paragraphs: [
          'Rather than designing each screen independently, the system defines the building blocks that create consistency across products, platforms, and teams. From typography and colour to components and layouts, every decision is made once and reused everywhere.',
        ],
        callout:
          'Every component has a purpose. Every pattern has a rule. Every decision should scale.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Built For Real Products', {
        lede: 'The pages stay. The demos come out.',
        paragraphs: [
          'Buttons, inputs, cards, games, and the rest of the docs pages are still here, including the component wrapper frames. The old live demos have been cleared out of those frames so new Sessions components can be dropped in.',
        ],
        callout: 'Design once. Build many.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Consistency Without Compromise', {
        lede: "Consistency doesn't mean every screen looks the same.",
        paragraphs: [
          'It means interactions behave predictably, layouts follow shared principles, and components communicate the same intent wherever they appear.',
        ],
        callout: 'Consistency creates confidence.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Add Components Here', {
        lede: 'Each page already has a place to put the next component.',
        paragraphs: [
          'Use the existing preview frames, code panels, and page structure. Build the new component and drop it into the frame that already belongs to that page.',
        ],
        callout: 'Build once. Improve continuously.',
      })}
    </div>
  `;
}

function introductionParagraph(text) {
  return `<p>${text}</p>`;
}

function introductionSectionWithCallout(title, {lede, paragraphs, callout}) {
  return `
    <section id="${slug(title)}" class="introduction-section">
      <div class="page-hero-text">
        <h2 class="introduction-section__title">${title}</h2>
        ${lede ? `<p class="lede introduction-section__lede">${lede}</p>` : ''}
        <div class="docs-prose introduction-section__body">
          ${paragraphs.map(introductionParagraph).join('')}
          ${callout ? `<blockquote class="introduction-callout"><p>${callout}</p></blockquote>` : ''}
        </div>
      </div>
    </section>
  `;
}
