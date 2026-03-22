import type MarkdownIt from 'markdown-it';

/**
 * Page subtitle from frontmatter plugin for VitePress.
 *
 * Automatically renders the frontmatter `description` field as a visible
 * subtitle paragraph directly after the first H1 heading on a page.
 *
 * Usage: set `description` in frontmatter — no extra markup needed.
 *
 * ---
 * title: My Page
 * description: A short description shown as subtitle below the H1.
 * ---
 */
export function pageSubtitlePlugin(md: MarkdownIt): void {
  const defaultHeadingClose =
    md.renderer.rules.heading_close ??
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

  md.core.ruler.push('reset_subtitle_flag', (state) => {
    state.env._subtitleInjected = false;
    return false;
  });

  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    if (token.tag === 'h1' && !env._subtitleInjected) {
      const description: string | undefined = env.frontmatter?.description;
      if (description) {
        const trimmed = description.trim();
        if (trimmed) {
          env._subtitleInjected = true;
          const closingTag = defaultHeadingClose(tokens, idx, options, env, self);
          return `${closingTag}<p class="page-subtitle">${md.utils.escapeHtml(trimmed)}</p>\n`;
        }
      }
    }

    return defaultHeadingClose(tokens, idx, options, env, self);
  };
}
