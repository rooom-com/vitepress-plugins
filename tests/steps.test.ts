import { describe, it, expect, beforeEach } from 'vitest';
import MarkdownIt from 'markdown-it';
import { stepByStepPlugin } from '../src/markdown/steps.js';

describe('stepByStepPlugin', () => {
  let md: MarkdownIt;

  beforeEach(() => {
    md = new MarkdownIt();
    md.use(stepByStepPlugin);
  });

  it('renders the steps container wrapper', () => {
    const html = md.render('::: steps\n### First Step\nDo this.\n:::');
    expect(html).toContain('<div class="steps-container">');
    expect(html).toContain('<div class="steps-wrapper">');
  });

  it('renders a single step with badge and title', () => {
    const html = md.render('::: steps\n### First Step\nDo this.\n:::');
    expect(html).toContain('<div class="step-item">');
    expect(html).toContain('<div class="step-badge">');
    expect(html).toContain('<span class="step-number">1</span>');
    expect(html).toContain('<div class="step-content">');
    expect(html).toContain('First Step');
    expect(html).toContain('Do this.');
  });

  it('numbers multiple steps correctly', () => {
    const input = [
      '::: steps',
      '### Install dependencies',
      'Run npm install.',
      '',
      '### Start the server',
      'Run npm run dev.',
      '',
      '### Build for production',
      'Run npm run build.',
      ':::',
    ].join('\n');
    const html = md.render(input);
    expect(html).toContain('<span class="step-number">1</span>');
    expect(html).toContain('<span class="step-number">2</span>');
    expect(html).toContain('<span class="step-number">3</span>');
    expect(html).toContain('Install dependencies');
    expect(html).toContain('Start the server');
    expect(html).toContain('Build for production');
  });

  it('does not affect h3 headings outside of steps container', () => {
    const html = md.render('### Normal heading');
    expect(html).not.toContain('step-badge');
    expect(html).not.toContain('step-number');
    expect(html).toContain('<h3>Normal heading</h3>');
  });

  it('does not render step-item for h1 or h2 inside steps', () => {
    const html = md.render('::: steps\n## Not a step heading\nContent.\n:::');
    expect(html).not.toContain('step-badge');
  });

  it('renders step content (body text) correctly', () => {
    const html = md.render('::: steps\n### My Step\nThis is the step body.\n:::');
    expect(html).toContain('This is the step body.');
  });
});
