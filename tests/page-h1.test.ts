import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { pageH1Plugin } from '../src/markdown/page-h1.js';

describe('pageH1Plugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(pageH1Plugin);
  });

  it('injects an H1 from frontmatter title when none exists in content', () => {
    const env = { frontmatter: { title: 'My Page Title' } };
    const html = md.render('Content without a heading.', env);
    expect(html).toContain('<h1>My Page Title</h1>');
    expect(html).toContain('Content without a heading.');
  });

  it('does not inject H1 when content already has one', () => {
    const env = { frontmatter: { title: 'Frontmatter Title' } };
    const html = md.render('# Existing Heading\nContent.', env);
    expect(html).toContain('<h1>Existing Heading</h1>');
    expect(html).not.toContain('Frontmatter Title');
    // Only one H1 should appear
    expect((html.match(/<h1>/g) ?? []).length).toBe(1);
  });

  it('does not inject H1 when frontmatter title is missing', () => {
    const env = { frontmatter: {} };
    const html = md.render('Just content.', env);
    expect(html).not.toContain('<h1>');
  });

  it('does not inject H1 when env has no frontmatter', () => {
    const html = md.render('Just content.', {});
    expect(html).not.toContain('<h1>');
  });

  it('strips surrounding quotes from frontmatter title', () => {
    const env = { frontmatter: { title: '"Quoted Title"' } };
    const html = md.render('Content.', env);
    expect(html).toContain('<h1>Quoted Title</h1>');
    expect(html).not.toContain('"Quoted Title"');
  });

  it('strips single quotes from frontmatter title', () => {
    const env = { frontmatter: { title: "'Single Quoted'" } };
    const html = md.render('Content.', env);
    expect(html).toContain('<h1>Single Quoted</h1>');
  });

  it('does not inject H1 when title is empty after trimming', () => {
    const env = { frontmatter: { title: '""' } };
    const html = md.render('Content.', env);
    expect(html).not.toContain('<h1>');
  });

  it('injects H1 at the top of the document', () => {
    const env = { frontmatter: { title: 'Top Title' } };
    const html = md.render('Some paragraph.', env);
    const h1Index = html.indexOf('<h1>');
    const pIndex = html.indexOf('<p>');
    expect(h1Index).toBeLessThan(pIndex);
  });
});
