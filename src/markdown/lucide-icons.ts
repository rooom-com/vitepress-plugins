/**
 * Lucide icon plugin for markdown-it.
 *
 * Converts :icon-name: shortcodes in markdown text to inline Lucide SVGs.
 * Icon names use kebab-case matching Lucide's naming convention.
 *
 * Usage in markdown:
 *   :heart:       → heart icon SVG
 *   :book-open:   → book-open icon SVG
 *   :arrow-right: → arrow-right icon SVG
 *
 * Full icon list: https://lucide.dev/icons/
 */
import type MarkdownIt from 'markdown-it';
import * as LucideIcons from 'lucide';
import type { IconNode } from 'lucide';

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function renderInlineSvg(iconNode: IconNode): string {
  const children = iconNode
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${attrStr}/>`;
    })
    .join('');
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" ` +
    `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ` +
    `stroke-linecap="round" stroke-linejoin="round" ` +
    `class="lucide-icon" aria-hidden="true">${children}</svg>`
  );
}

export function lucideIconPlugin(md: MarkdownIt): void {
  md.core.ruler.push('lucide_icons', (state) => {
    for (const blockToken of state.tokens) {
      if (blockToken.type !== 'inline' || !blockToken.children) continue;

      const newChildren: InstanceType<typeof state.Token>[] = [];

      for (const token of blockToken.children) {
        if (token.type !== 'text' || !token.content.includes(':')) {
          newChildren.push(token);
          continue;
        }

        const parts = token.content.split(/(:[a-z][a-z0-9-]*:)/g);

        if (parts.length === 1) {
          newChildren.push(token);
          continue;
        }

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          if (!part) continue;

          if (i % 2 === 1) {
            const iconName  = part.slice(1, -1);
            const pascalName = kebabToPascal(iconName);
            const iconNode  = (LucideIcons as Record<string, unknown>)[pascalName] as IconNode | undefined;

            if (Array.isArray(iconNode) && iconNode.length > 0) {
              const htmlToken = new state.Token('html_inline', '', 0);
              htmlToken.content = renderInlineSvg(iconNode);
              newChildren.push(htmlToken);
              continue;
            }
          }

          const textToken = new state.Token('text', '', 0);
          textToken.content = part;
          newChildren.push(textToken);
        }
      }

      blockToken.children = newChildren;
    }
  });
}
