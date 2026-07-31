import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { cardPlugin } from '../src/markdown/card.js';

describe('cardPlugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(cardPlugin);
  });

  it('renders a card grid wrapper', () => {
    const html = md.render(':::: cards\n::: card :rocket: Quick Start\nDesc\n:::\n::::');
    expect(html).toContain('<div class="md-cards">');
  });

  it('renders a card with emoji shortcode icon and title', () => {
    const html = md.render('::: card :rocket: Quick Start\nDescription text.\n:::');
    expect(html).toContain('<span class="md-card-icon"');
    expect(html).toContain('🚀');
    expect(html).toContain('<h3 class="md-card-title">Quick Start</h3>');
    expect(html).toContain('<div class="md-card-content">');
    expect(html).toContain('Description text.');
  });

  it('renders a card with a safe link as <a>', () => {
    const html = md.render('::: card :book: Guide | /docs/guide\nRead more.\n:::');
    expect(html).toContain('<a class="md-card"');
    expect(html).toContain('href="/docs/guide"');
  });

  it('renders a card with an https link as <a>', () => {
    const html = md.render('::: card :globe: External | https://example.com\nVisit us.\n:::');
    expect(html).toContain('<a class="md-card"');
    expect(html).toContain('href="https://example.com"');
  });

  it('renders a card without a link as <div>', () => {
    const html = md.render('::: card :star: No Link\nContent here.\n:::');
    expect(html).toContain('<div class="md-card">');
    expect(html).not.toContain('<a ');
  });

  it('renders a card with a direct emoji icon', () => {
    const html = md.render('::: card 🎉 Celebrate\nParty!\n:::');
    expect(html).toContain('🎉');
    expect(html).toContain('Celebrate');
  });

  it('renders a card with a Lucide icon fallback for shortcodes not in the emoji map', () => {
    const html = md.render('::: card :settings: Preferences\nConfigure options.\n:::');
    expect(html).toContain('<span class="md-card-icon" aria-hidden="true"><svg');
    expect(html).toContain('lucide-icon');
    expect(html).toContain('<h3 class="md-card-title">Preferences</h3>');
  });

  it('keeps an unresolvable shortcode as literal text', () => {
    const html = md.render('::: card :notanicon: Title\nContent.\n:::');
    expect(html).toContain('<span class="md-card-icon" aria-hidden="true">:notanicon:</span>');
  });

  it('renders a card without an icon', () => {
    const html = md.render('::: card Plain Title\nNo icon here.\n:::');
    expect(html).toContain('<h3 class="md-card-title">Plain Title</h3>');
    expect(html).not.toContain('<span class="md-card-icon"');
  });

  it('rejects protocol-relative URLs', () => {
    const html = md.render('::: card :lock: Bad Link | //evil.com\nContent.\n:::');
    expect(html).toContain('<div class="md-card">');
    expect(html).not.toContain('href="//evil.com"');
  });

  it('rejects javascript: URLs', () => {
    const html = md.render('::: card :warning: XSS | javascript:alert(1)\nContent.\n:::');
    expect(html).toContain('<div class="md-card">');
    expect(html).not.toContain('href="javascript:');
  });

  it('escapes HTML in card title', () => {
    const html = md.render('::: card <script>xss</script> Title\nContent.\n:::');
    expect(html).not.toContain('<script>');
  });
});
