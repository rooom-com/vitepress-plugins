import type MarkdownIt from 'markdown-it';

declare module 'markdown-it-container' {
  interface ContainerOptions {
    validate?: (params: string) => boolean;
    render?: (
      tokens: ReturnType<MarkdownIt['parse']>,
      idx: number,
      options: unknown,
      env: Record<string, unknown>,
      self: MarkdownIt['renderer'],
    ) => string;
  }
  function container(
    md: MarkdownIt,
    name: string,
    options?: ContainerOptions,
  ): void;
  export default container;
}
