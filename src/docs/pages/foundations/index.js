import { renderColoursPage } from './coloursPage.js';
import { renderTypographyPage } from './typographyPage.js?v=typography-spec-dividers-v1';
import { renderSpacingPage } from './spacingPage.js';
import { renderRadiusPage } from './radiusPage.js';
import { renderShadowsPage } from './shadowsPage.js';
import { renderMotionPage } from './motionPage.js';
import { renderIconsPage } from './iconsPage.js?v=wallet-icon-v1';
import { renderFoundationFallbackPage } from './fallbackPage.js';

const foundationRenderers = {
  Colours: renderColoursPage,
  Typography: renderTypographyPage,
  Spacing: renderSpacingPage,
  Radius: renderRadiusPage,
  Shadows: renderShadowsPage,
  Motion: renderMotionPage,
  Icons: renderIconsPage,
};

export function renderFoundationPage(page) {
  const render = foundationRenderers[page.title] ?? renderFoundationFallbackPage;
  return render(page);
}
