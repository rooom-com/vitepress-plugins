import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { pageSubtitlePlugin } from '../src/markdown/page-subtitle.js';

describe('pageSubtitlePlugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(pageSubtitlePlugin);
  });

  it('injects subtitle after H1 when description is set', () => {
    const env = { frontmatter: { description: 'A short description.' } };
    const html = md.render('# My Page\nContent.', env);
    expect(html).toContain('<p class="page-subtitle">A short description.</p>');
    const h1Close = html.indexOf('</h1>');
    const subtitleIdx = html.indexOf('page-subtitle');
    expect(subtitleIdx).toBeGreaterThan(h1Close);
  });

  it('does not inject subtitle when description is missing', () => {
    const env = { frontmatter: {} };
    const html = md.render('# My Page\nContent.', env);
    expect(html).not.toContain('page-subtitle');
  });

  it('does not inject subtitle when there is no H1', () => {
    const env = { frontmatter: { description: 'Subtitle text.' } };
    const html = md.render('## Just a H2\nContent.', env);
    expect(html).not.toContain('page-subtitle');
  });

  it('only injects subtitle once even with multiple H1 headings', () => {
    const env = { frontmatter: { description: 'Only once.' } };
    // Two H1s – unusual but the plugin should only inject after the first
    const html = md.render('# First\n# Second\nContent.', env);
    expect((html.match(/page-subtitle/g) ?? []).length).toBe(1);
  });

  it('escapes HTML in the description', () => {
    const env = { frontmatter: { description: '<script>alert(1)</script>' } };
    const html = md.render('# Page\nContent.', env);
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('trims whitespace from the description', () => {
    const env = { frontmatter: { description: '  Trimmed subtitle.  ' } };
    const html = md.render('# Page\nContent.', env);
    expect(html).toContain('<p class="page-subtitle">Trimmed subtitle.</p>');
  });

  it('does not inject subtitle for empty description', () => {
    const env = { frontmatter: { description: '   ' } };
    const html = md.render('# Page\nContent.', env);
    expect(html).not.toContain('page-subtitle');
  });
});
