import { escapeHtml } from '../../utils.js';

export function renderComponentExampleWrapper({
  id,
  tocTitle,
  preview = "",
  reactDemo = "",
  codePanelHtml,
  className = "",
  stageClassName = "",
  previewClassName = "",
}) {
  const tocAttrs = tocTitle
    ? ` data-toc-title="${escapeHtml(tocTitle)}" data-toc-depth="2"`
    : "";
  const previewMarkup = reactDemo
    ? `<div class="component-example-wrapper__react-demo" data-react-demo="${escapeHtml(reactDemo)}"></div>`
    : preview;
  const stageClasses = [
    "component-example-wrapper__stage",
    "button-example-stage",
    "card-example-stage",
    stageClassName,
  ]
    .filter(Boolean)
    .join(" ");
  const previewClasses = [
    "component-example-wrapper__preview",
    "card-example-preview",
    previewClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <div id="${escapeHtml(id)}" class="component-example-wrapper button-example card-example${className ? ` ${className}` : ""}"${tocAttrs}>
      <div class="${stageClasses}">
        <div class="${previewClasses}">
          ${previewMarkup}
        </div>
      </div>
      ${
        codePanelHtml
          ? `<div class="component-example-wrapper__code-slot">${codePanelHtml}</div>`
          : ""
      }
    </div>
  `;
}
