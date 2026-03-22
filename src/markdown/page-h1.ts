import type MarkdownIt from 'markdown-it';

/**
 * Auto-inject H1 from frontmatter plugin for VitePress.
 *
 * When a page has a `title` in its frontmatter but no `# Heading` in the
 * content body, this plugin automatically inserts an H1 token at the top
 * of the token stream so writers only need to maintain the title in one place.
 *
 * If an H1 already exists in the content, it is left untouched.
 *
 * Usage: set `title` in frontmatter — no `# Heading` needed in the body.
 *
 * ---
 * title: My Page Title
 * ---
 */
export function pageH1Plugin(md: MarkdownIt): void {
  md.core.ruler.push('inject_h1_from_frontmatter', (state) => {
    const rawTitle: string | undefined = state.env?.frontmatter?.title;
    if (!rawTitle) return false;

    // Strip surrounding quotes that YAML parsers may leave in place
    const title = rawTitle.replace(/^["']|["']$/g, '').trim();
    if (!title) return false;

    // If an H1 already exists in the content, do not inject
    const hasH1 = state.tokens.some(
      (t) => t.type === 'heading_open' && t.tag === 'h1',
    );
    if (hasH1) return false;

    const { Token } = state;

    const open = new Token('heading_open', 'h1', 1);
    open.markup = '#';
    open.map = [0, 1];

    const inline = new Token('inline', '', 0);
    inline.content = title;
    const textToken = new Token('text', '', 0);
    textToken.content = title;
    inline.children = [textToken];

    const close = new Token('heading_close', 'h1', -1);
    close.markup = '#';

    state.tokens.splice(0, 0, open, inline, close);
    return false;
  });
}
