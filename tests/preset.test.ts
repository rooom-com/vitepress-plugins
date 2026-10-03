import { describe, it, expect } from 'vitest';
import MarkdownIt from 'markdown-it';
import { rooomPlugins } from '../src/markdown/preset.js';

const input = [
  '::: accordion Title',
  'Body',
  ':::',
  '',
  '```one-line',
  'value',
  '```',
].join('\n');

describe('rooomPlugins', () => {
  it('registers all plugins by default', () => {
    const md = new MarkdownIt().use(rooomPlugins);
    const html = md.render(input + '\n\n:heart:');
    expect(html).toContain('<details class="accordion-item">');
    expect(html).toContain('<div class="api-value-block">value</div>');
    expect(html).toContain('class="lucide-icon"');
  });

  it('skips plugins disabled via options', () => {
    const md = new MarkdownIt().use(rooomPlugins, { oneLiner: false, lucideIcons: false });
    const html = md.render(input + '\n\n:heart:');
    expect(html).toContain('<details class="accordion-item">');
    expect(html).not.toContain('api-value-block');
    expect(html).toContain(':heart:');
  });

  it('chains steps and page subtitle on heading_close', () => {
    const md = new MarkdownIt().use(rooomPlugins);
    const html = md.render('# Title\n\n::: steps\n### One\nDo it.\n:::', {
      frontmatter: { description: 'Sub' },
    });
    expect(html).toContain('</h1>\n<p class="page-subtitle">Sub</p>');
    expect(html).toContain('<h3 class="step-title">One</h3>');
  });
});
