import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';

type Token = ReturnType<MarkdownIt['parse']>[0];

interface StepsEnv {
  stepsContainer?: boolean;
  stepNumber?: number;
}

/**
 * Step-by-step container plugin for VitePress.
 *
 * Usage:
 * ::: steps
 * ### 1. First step
 * Description of the first step.
 *
 * ### 2. Second step
 * Description of the second step.
 * :::
 */
export function stepByStepPlugin(md: MarkdownIt): void {
  md.use(container, 'steps', {
    validate: (params: string) => params.trim() === 'steps',

    render: (tokens: Token[], idx: number, _options: unknown, env: StepsEnv) => {
      if (tokens[idx].nesting === 1) {
        env.stepsContainer = true;
        env.stepNumber = 1;
        return `<div class="steps-container">\n<div class="steps-wrapper">\n`;
      }
      let closing = '';
      if ((env.stepNumber ?? 0) > 1) {
        closing = `</div>\n</div>\n`;
      }
      env.stepsContainer = false;
      env.stepNumber = 1;
      return closing + `</div>\n</div>\n`;
    },
  });

  const defaultHeadingOpen =
    md.renderer.rules.heading_open ??
    ((tokens: Token[], idx: number, options: unknown, _env: unknown, self: MarkdownIt['renderer']) =>
      self.renderToken(tokens, idx, options as MarkdownIt.Options));

  const defaultHeadingClose =
    md.renderer.rules.heading_close ??
    ((tokens: Token[], idx: number, options: unknown, _env: unknown, self: MarkdownIt['renderer']) =>
      self.renderToken(tokens, idx, options as MarkdownIt.Options));

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if ((env as StepsEnv).stepsContainer && token.tag === 'h3') {
      const stepNumber = (env as StepsEnv).stepNumber ?? 1;
      (env as StepsEnv).stepNumber = stepNumber + 1;
      const closePrevious = stepNumber > 1 ? `</div>\n</div>\n` : '';
      return (
        `${closePrevious}<div class="step-item">\n` +
        `  <div class="step-badge"><span class="step-number">${stepNumber}</span></div>\n` +
        `  <div class="step-content">\n    <h3 class="step-title">`
      );
    }
    return defaultHeadingOpen(tokens, idx, options, env, self);
  };

  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if ((env as StepsEnv).stepsContainer && token.tag === 'h3') {
      return `</h3>\n`;
    }
    return defaultHeadingClose(tokens, idx, options, env, self);
  };
}
