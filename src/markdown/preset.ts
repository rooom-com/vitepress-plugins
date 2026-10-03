import type MarkdownIt from 'markdown-it';
import { accordionPlugin }    from './accordion.js';
import { cardPlugin }         from './card.js';
import { lucideIconPlugin }   from './lucide-icons.js';
import { oneLinerPlugin }     from './one-liner.js';
import { pageH1Plugin }       from './page-h1.js';
import { pageSubtitlePlugin } from './page-subtitle.js';
import { stepByStepPlugin }   from './steps.js';

const PLUGINS = {
  accordion:    accordionPlugin,
  cards:        cardPlugin,
  lucideIcons:  lucideIconPlugin,
  oneLiner:     oneLinerPlugin,
  pageH1:       pageH1Plugin,
  pageSubtitle: pageSubtitlePlugin,
  steps:        stepByStepPlugin,
} satisfies Record<string, (md: MarkdownIt) => void>;

/** Set a plugin to `false` to skip it. All plugins are enabled by default. */
export type RooomPluginsOptions = Partial<Record<keyof typeof PLUGINS, boolean>>;

/**
 * Registers all plugins at once.
 *
 * Usage:
 *   md.use(rooomPlugins)
 *   md.use(rooomPlugins, { lucideIcons: false })
 */
export function rooomPlugins(md: MarkdownIt, options: RooomPluginsOptions = {}): void {
  for (const [name, plugin] of Object.entries(PLUGINS)) {
    if (options[name as keyof typeof PLUGINS] !== false) md.use(plugin);
  }
}
