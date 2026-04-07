import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { accordionPlugin } from '../src/markdown/accordion.js';

describe('accordionPlugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(accordionPlugin);
  });

  it('renders a single accordion item with title and content', () => {
    const html = md.render('::: accordion What is VitePress?\nA static site generator.\n:::');
    expect(html).toContain('<details class="accordion-item">');
    expect(html).toContain('<summary class="accordion-title">What is VitePress?</summary>');
    expect(html).toContain('<div class="accordion-content">');
    expect(html).toContain('A static site generator.');
    expect(html).toContain('</details>');
  });

  it('renders an accordion-group wrapper', () => {
    const html = md.render(':::: accordion-group\n::: accordion Q1\nA1\n:::\n::::');
    expect(html).toContain('<div class="accordion-group">');
    expect(html).toContain('</div>');
  });

  it('renders multiple accordion items inside a group', () => {
    const input = [
      ':::: accordion-group',
      '::: accordion Question 1',
      'Answer 1',
      ':::',
      '::: accordion Question 2',
      'Answer 2',
      ':::',
      '::::',
    ].join('\n');
    const html = md.render(input);
    expect(html).toContain('<div class="accordion-group">');
    expect(html).toContain('Question 1');
    expect(html).toContain('Answer 1');
    expect(html).toContain('Question 2');
    expect(html).toContain('Answer 2');
    expect((html.match(/<details class="accordion-item">/g) ?? []).length).toBe(2);
  });

  it('escapes HTML in the accordion title', () => {
    const html = md.render('::: accordion <script>alert(1)</script>\nContent\n:::');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('renders accordion without content', () => {
    const html = md.render('::: accordion Empty Title\n:::');
    expect(html).toContain('<details class="accordion-item">');
    expect(html).toContain('Empty Title');
  });
});
