import { defineConfig } from 'vitepress';
import {
  accordionPlugin,
  cardPlugin,
  lucideIconPlugin,
  oneLinerPlugin,
  pageH1Plugin,
  pageSubtitlePlugin,
  stepByStepPlugin,
} from '../../src/markdown/index.js';

export default defineConfig({
  title: 'rooom VitePress Plugins',
  description: 'A collection of markdown-it plugins for VitePress — accordion, cards, steps, Lucide icons, and more.',
  lang: 'en-US',
  base: '/vitepress-plugins/',

  markdown: {
    config(md) {
      md.use(accordionPlugin);
      md.use(cardPlugin);
      md.use(lucideIconPlugin);
      md.use(oneLinerPlugin);
      md.use(pageH1Plugin);
      md.use(pageSubtitlePlugin);
      md.use(stepByStepPlugin);
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Plugins', link: '/plugins/accordion' },
      { text: 'GitHub', link: 'https://github.com/rooom-com/vitepress-plugins' },
    ],
    sidebar: [
      {
        text: 'Plugins',
        items: [
          { text: 'Accordion', link: '/plugins/accordion' },
          { text: 'Cards', link: '/plugins/cards' },
          { text: 'Steps', link: '/plugins/steps' },
          { text: 'Lucide Icons', link: '/plugins/lucide-icons' },
          { text: 'One-Liner', link: '/plugins/one-liner' },
          { text: 'Page H1', link: '/plugins/page-h1' },
          { text: 'Page Subtitle', link: '/plugins/page-subtitle' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rooom-com/vitepress-plugins' },
    ],
  },
});
