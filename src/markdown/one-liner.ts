import type MarkdownIt from 'markdown-it';

/**
 * One-liner plugin for VitePress.
 *
 * Renders a fenced code block with language tag `one-line` as a styled
 * single-line value display (useful for API values, URLs, tokens, etc.).
 *
 * Usage:
 * ```one-line
 * https://api.example.com/v1/endpoint
 * ```
 */
export function oneLinerPlugin(md: MarkdownIt): void {
  const defaultFenceRenderer =
    md.renderer.rules.fence ??
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === 'one-line') {
      const escaped = token.content.trim()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
      return `<div class="api-value-block">${escaped}</div>\n`;
    }
    return defaultFenceRenderer(tokens, idx, options, env, self);
  };
}
