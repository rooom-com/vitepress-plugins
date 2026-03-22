import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';

type Token = ReturnType<MarkdownIt['parse']>[0];

/**
 * Accordion plugin for VitePress.
 *
 * Single accordion item:
 * ::: accordion Title here
 * Content here.
 * :::
 *
 * Accordion group (multiple connected items):
 * :::: accordion-group
 * ::: accordion Question 1
 * Answer 1
 * :::
 * ::: accordion Question 2
 * Answer 2
 * :::
 * ::::
 */
export function accordionPlugin(md: MarkdownIt): void {
  // Accordion group wrapper
  md.use(container, 'accordion-group', {
    render: (tokens: Token[], idx: number) => {
      if (tokens[idx].nesting === 1) {
        return '<div class="accordion-group">\n';
      }
      return '</div>\n';
    },
  });

  // Single accordion item
  md.use(container, 'accordion', {
    render: (tokens: Token[], idx: number) => {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const title = md.utils.escapeHtml(
          token.info.trim().slice('accordion'.length).trim(),
        );
        return (
          `<details class="accordion-item">\n` +
          `<summary class="accordion-title">${title}</summary>\n` +
          `<div class="accordion-content">\n`
        );
      }
      return '</div>\n</details>\n';
    },
  });
}
