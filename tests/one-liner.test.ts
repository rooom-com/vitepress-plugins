import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { oneLinerPlugin } from '../src/markdown/one-liner.js';

describe('oneLinerPlugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(oneLinerPlugin);
  });

  it('renders a one-line block as api-value-block div', () => {
    const html = md.render('```one-line\nhttps://api.example.com/v1/endpoint\n```');
    expect(html).toContain('<div class="api-value-block">');
    expect(html).toContain('https://api.example.com/v1/endpoint');
    expect(html).toContain('</div>');
  });

  it('does not wrap regular code blocks in api-value-block', () => {
    const html = md.render('```javascript\nconsole.log("hello")\n```');
    expect(html).not.toContain('api-value-block');
    expect(html).toContain('<code');
  });

  it('escapes HTML entities in the value', () => {
    const html = md.render('```one-line\n<script>alert("xss")</script>\n```');
    expect(html).toContain('api-value-block');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('&quot;xss&quot;');
  });

  it('escapes ampersands in the value', () => {
    const html = md.render('```one-line\nfoo=bar&baz=qux\n```');
    expect(html).toContain('&amp;');
  });

  it('trims whitespace from the value', () => {
    const html = md.render('```one-line\n   trimmed value   \n```');
    expect(html).toContain('<div class="api-value-block">trimmed value</div>');
  });

  it('renders empty one-line block without crashing', () => {
    const html = md.render('```one-line\n\n```');
    expect(html).toContain('<div class="api-value-block">');
  });
});
