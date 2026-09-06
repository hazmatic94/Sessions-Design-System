import { slug } from '../../utils.js';

export function renderIntroductionPage(_page) {
  return `
    <section class="page-hero introduction-hero">
      <div class="page-hero-main">
        <div class="page-hero-copy">
          <div class="page-hero-text">
            <h1>Introduction</h1>
            <p class="lede">The Joker Design System provides the shared foundations, components, and patterns used to build consistent experiences across every Joker product.</p>
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
        lede: "The design system isn't a library of isolated components.",
        paragraphs: [
          'Every token, component, and pattern exists because it solves a real product problem. The same foundations power the documentation, application shell, and native games, ensuring every experience feels familiar regardless of where users interact.',
        ],
        callout: 'Design once. Build many.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Consistency Without Compromise', {
        lede: "Consistency doesn't mean every screen looks the same.",
        paragraphs: [
          'It means interactions behave predictably, layouts follow shared principles, and components communicate the same intent wherever they appear. This reduces design decisions, improves usability, and creates a more cohesive product experience.',
        ],
        callout: 'Consistency creates confidence.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Responsive From The Beginning', {
        lede: 'Responsiveness is considered from the start, not added later.',
        paragraphs: [
          'Components, layouts, and patterns are designed to adapt across desktop, tablet, and mobile while maintaining the same structure, hierarchy, and interaction principles.',
        ],
        callout: 'One system. Every screen.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Design And Development', {
        lede: 'The system creates a shared language between design and engineering.',
        paragraphs: [
          'Foundations define the visual language, components provide reusable building blocks, and documentation ensures every pattern is implemented consistently. Working from the same system reduces duplication, speeds up development, and makes iteration easier over time.',
        ],
        callout: 'Shared foundations. Faster delivery.',
      })}
      <hr class="introduction-divider" aria-hidden="true" />
      ${introductionSectionWithCallout('Designed To Grow', {
        lede: 'The design system is built to evolve alongside the product.',
        paragraphs: [
          'New components, patterns, and improvements can be introduced without changing how the system is understood. As the platform grows, the foundations remain consistent while the library continues to expand.',
        ],
        callout: 'Build once. Improve continuously.',
      })}
    </div>
  `;
}
function introductionParagraph(text) {
  return `<p>${text}</p>`;
}

function introductionSection(title, paragraphs) {
  return `
    <section id="${slug(title)}" class="introduction-section">
      <div class="page-hero-text">
        <h2 class="introduction-section__title">${title}</h2>
        <div class="docs-prose introduction-section__body">
          ${paragraphs.map(introductionParagraph).join('')}
        </div>
      </div>
    </section>
  `;
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
