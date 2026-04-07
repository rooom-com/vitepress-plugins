import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { lucideIconPlugin } from '../src/markdown/lucide-icons.js';

describe('lucideIconPlugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(lucideIconPlugin);
  });

  it('renders a known icon shortcode as inline SVG', () => {
    const html = md.render('Click the :settings: icon.');
    expect(html).toContain('<svg');
    expect(html).toContain('class="lucide-icon"');
    expect(html).toContain('aria-hidden="true"');
  });

  it('renders :heart: as an SVG', () => {
    const html = md.render(':heart:');
    expect(html).toContain('<svg');
    expect(html).toContain('lucide-icon');
  });

  it('keeps unknown shortcode as plain text', () => {
    const html = md.render('Use :notanicon: here.');
    expect(html).not.toContain('<svg');
    expect(html).toContain(':notanicon:');
  });

  it('renders multiple icons in one paragraph', () => {
    const html = md.render('Use :settings: and :heart: together.');
    expect((html.match(/<svg/g) ?? []).length).toBe(2);
  });

  it('preserves surrounding text when inserting SVG', () => {
    const html = md.render('Before :heart: after.');
    expect(html).toContain('Before ');
    expect(html).toContain(' after.');
    expect(html).toContain('<svg');
  });

  it('renders :book-open: (kebab-case) correctly', () => {
    const html = md.render(':book-open:');
    expect(html).toContain('<svg');
  });

  it('renders :arrow-right: correctly', () => {
    const html = md.render(':arrow-right:');
    expect(html).toContain('<svg');
  });

  it('does not render icons outside of inline context', () => {
    // Fenced code blocks should not be processed
    const html = md.render('```\n:heart:\n```');
    expect(html).not.toContain('<svg');
    expect(html).toContain(':heart:');
  });

  it('renders SVG with correct viewBox and dimensions', () => {
    const html = md.render(':heart:');
    expect(html).toContain('viewBox="0 0 24 24"');
    expect(html).toContain('width="1em"');
    expect(html).toContain('height="1em"');
  });
});
