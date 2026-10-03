import type MarkdownIt from 'markdown-it';

/** markdown-it Token type, derived from the public API (no deep imports). */
export type Token = ReturnType<MarkdownIt['parse']>[0];

/** markdown-it renderer rule signature. */
export type RenderRule = NonNullable<MarkdownIt['renderer']['rules']['fence']>;

type RuleName = keyof MarkdownIt['renderer']['rules'];

/**
 * Returns the currently registered renderer rule, or a fallback that renders
 * the token as-is. Plugins wrap this so they can chain with each other.
 */
export function getRenderRule(md: MarkdownIt, name: RuleName): RenderRule {
  return (
    md.renderer.rules[name] ??
    ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options))
  );
}

/** Strips the container name from a container token's info string. */
export function containerParams(info: string, name: string): string {
  return info.trim().slice(name.length).trim();
}
