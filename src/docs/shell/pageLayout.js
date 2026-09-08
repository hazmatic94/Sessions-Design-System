import { renderComponentExampleWrapper } from "./componentExampleWrapper.js?v=sessions-docs-cta-v2";
import { renderGhostButton } from "../../components/button/index.js?v=sessions-docs-cta-v2";
import { escapeHtml, slug } from "../../utils.js";

export function pageHero(page) {
  return `
    <section class="page-hero">
      <div class="page-hero-main">
        <div class="page-hero-copy">
          <div class="page-hero-text">
            <h2>${pageTitle(page)}</h2>
            <p class="lede">${page.subtitle}</p>
          </div>
        </div>
      </div>
      <hr class="page-hero-divider" aria-hidden="true" />
    </section>
  `;
}

export function pageTitle(page) {
  return page.title;
}

export function pageFooter() {
  return `
    <footer class="docs-page-footer">
      <p>© 2026 Sessions. All rights reserved.</p>
    </footer>
  `;
}

export function section(title, _description, body, className = '') {
  return `
    <section id="${slug(title)}" class="section-block${className ? ` ${className}` : ''}">
      <div class="section-heading">
        <h2>${title}</h2>
      </div>
      ${body}
    </section>
  `;
}

export function codePanel(id, label, code, {collapsible = false} = {}) {
  const highlightedCode = highlightCode(code);
  return `
    <div class="code-panel${collapsible ? ' code-panel-collapsible' : ''}"${collapsible ? ' data-code-collapsible data-code-expanded="false"' : ''}>
      <div class="code-header">
        <div class="code-file-name">${label}</div>
        <div class="code-actions" aria-label="Code actions">
          <button class="code-action-button" type="button" data-copy="#${id}" data-copy-label="Copy ${label}" aria-label="Copy ${label}">
            <span class="copy-icon" data-lucide="copy" aria-hidden="true"></span>
          </button>
        </div>
      </div>
      <div class="code-body">
        <pre><code id="${id}">${highlightedCode}</code></pre>
        ${
          collapsible
            ? `
          <div class="code-reveal-overlay">
            ${renderGhostButton({
              label: 'View Code',
              className: 'code-toggle-button code-view-button',
              ariaExpanded: false,
              dataCodeToggle: true,
            })}
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;
}

export function highlightCode(code) {
  const keywords = new Set([
    'as',
    'async',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'default',
    'else',
    'export',
    'extends',
    'false',
    'finally',
    'for',
    'from',
    'function',
    'if',
    'implements',
    'import',
    'in',
    'instanceof',
    'interface',
    'let',
    'new',
    'null',
    'of',
    'return',
    'static',
    'switch',
    'throw',
    'true',
    'try',
    'type',
    'typeof',
    'undefined',
    'var',
    'void',
    'while',
    'with',
    'yield',
  ]);
  let output = '';
  let index = 0;
  let inJsxTag = false;
  let expectTagName = false;

  while (index < code.length) {
    const remainder = code.slice(index);

    if (remainder.startsWith('//')) {
      const lineEnd = code.indexOf('\n', index);
      const end = lineEnd === -1 ? code.length : lineEnd;
      output += `<span class="syntax-comment">${escapeHtml(code.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (remainder.startsWith('/*')) {
      const commentEnd = code.indexOf('*/', index + 2);
      const end = commentEnd === -1 ? code.length : commentEnd + 2;
      output += `<span class="syntax-comment">${escapeHtml(code.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    const character = code[index];
    if (character === '"' || character === "'" || character === '`') {
      const quote = character;
      let end = index + 1;
      while (end < code.length) {
        if (code[end] === '\\') {
          end += 2;
          continue;
        }
        if (code[end] === quote) {
          end += 1;
          break;
        }
        end += 1;
      }
      output += `<span class="syntax-string">${escapeHtml(code.slice(index, end))}</span>`;
      index = end;
      continue;
    }

    if (character === '<' && /^<\/?[A-Za-z]/.test(remainder)) {
      const closingTag = remainder.startsWith('</');
      output += closingTag ? '&lt;/' : '&lt;';
      index += closingTag ? 2 : 1;
      inJsxTag = true;
      expectTagName = true;
      continue;
    }

    if (inJsxTag && character === '>') {
      output += '&gt;';
      index += 1;
      inJsxTag = false;
      expectTagName = false;
      continue;
    }

    const customProperty = remainder.match(/^--[a-z0-9-]+/i);
    if (customProperty) {
      output += `<span class="syntax-property">${escapeHtml(customProperty[0])}</span>`;
      index += customProperty[0].length;
      continue;
    }

    const hexColor = remainder.match(/^#[0-9a-fA-F]{3,8}\b/);
    if (hexColor) {
      output += `<span class="syntax-color">${escapeHtml(hexColor[0])}</span>`;
      index += hexColor[0].length;
      continue;
    }

    const number = remainder.match(/^\d+(?:\.\d+)?(?:px|ms|rem|em|%)?/);
    if (number) {
      output += `<span class="syntax-number">${escapeHtml(number[0])}</span>`;
      index += number[0].length;
      continue;
    }

    const identifier = remainder.match(/^[A-Za-z_$][\w$-]*/);
    if (identifier) {
      const token = identifier[0];
      const following = code.slice(index + token.length);
      let tokenClass = '';

      if (inJsxTag && expectTagName) {
        tokenClass = 'syntax-tag';
        expectTagName = false;
      } else if (inJsxTag) {
        tokenClass = 'syntax-attribute';
      } else if (keywords.has(token)) {
        tokenClass = 'syntax-keyword';
      } else if (/^\s*:/.test(following)) {
        tokenClass = 'syntax-property';
      } else if (/^\s*\(/.test(following)) {
        tokenClass = 'syntax-function';
      }

      output += tokenClass
        ? `<span class="${tokenClass}">${escapeHtml(token)}</span>`
        : escapeHtml(token);
      index += token.length;
      continue;
    }

    output += escapeHtml(character);
    index += 1;
  }

  return output;
}
export function componentExampleWrapper({
  id,
  tocTitle,
  preview,
  reactDemo,
  codeId,
  filename,
  code,
  className = '',
  stageClassName = '',
  previewClassName = '',
}) {
  return renderComponentExampleWrapper({
    id,
    tocTitle,
    preview,
    reactDemo,
    className,
    stageClassName,
    previewClassName,
    codePanelHtml: codePanel(codeId, filename, code, {collapsible: true}),
  });
}
