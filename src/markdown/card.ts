import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import * as LucideIcons from 'lucide';
import type { IconNode } from 'lucide';
import { kebabToPascal, renderInlineSvg } from './lucide-icons.js';

type Token = ReturnType<MarkdownIt['parse']>[0];

/**
 * Card plugin for VitePress.
 *
 * Card grid (multiple cards in a responsive grid):
 * :::: cards
 * ::: card :rocket: Quick Start | /docs/start
 * Description text here.
 * :::
 * ::::
 *
 * Single card (no grid wrapper needed):
 * ::: card :house: Title
 * Description without a link.
 * :::
 *
 * Icon: emoji shortcode (:rocket:), direct emoji (🚀), or — for shortcodes
 * not in the emoji map — a Lucide icon name (:settings:), rendered as inline SVG.
 * Link: optional, follows a pipe separator: | /path/to/page
 */

const EMOJI_MAP: Record<string, string> = {
  rocket: '🚀', house: '🏠', package: '📦', calendar: '📅',
  heart: '❤️', star: '⭐', check: '✅', warning: '⚠️',
  info: 'ℹ️', fire: '🔥', zap: '⚡', lock: '🔒',
  key: '🔑', globe: '🌍', link: '🔗', code: '💻',
  terminal: '🖥️', gear: '⚙️', wrench: '🔧', search: '🔍',
  book: '📖', docs: '📄', page: '📄', api: '🔌',
  plugin: '🧩', box: '📦', shopping: '🛍️', shopping_bag: '🛍️',
  target: '🎯', game: '🎮', robot: '🤖', user: '🧑',
  sparkles: '✨', tada: '🎉', art: '🎨', bulb: '💡',
  bell: '🔔', email: '📧', phone: '📱', cloud: '☁️',
  database: '🗄️', chart: '📊', shield: '🛡️', world: '🌐',
  cube: '🧊', layers: '🗂️', arrow_right: '→', plus: '➕',
  minus: '➖', x: '❌', flag: '🚩', tag: '🏷️',
};

interface ResolvedIcon {
  html: string;
  isHtml: boolean;
}

/** Resolve a `:shortcode:` to an emoji, a Lucide SVG, or the literal shortcode text. */
function resolveIcon(shortcode: string): ResolvedIcon {
  const match = shortcode.match(/^:([a-z0-9_+-]+):$/i);
  if (!match) return { html: shortcode, isHtml: false };
  const name = match[1];

  const emoji = EMOJI_MAP[name];
  if (emoji) return { html: emoji, isHtml: false };

  const iconNode = (LucideIcons as Record<string, unknown>)[kebabToPascal(name)] as IconNode | undefined;
  if (Array.isArray(iconNode) && iconNode.length > 0) {
    return { html: renderInlineSvg(iconNode), isHtml: true };
  }

  return { html: shortcode, isHtml: false };
}

/** Allow safe URL schemes and relative paths; reject protocol-relative URLs. */
const SAFE_HREF_RE = /^(?!\/\/)(?:(?:https?|mailto|tel):|[./#])/;
function isSafeHref(url: string): boolean {
  return SAFE_HREF_RE.test(url);
}

function parseCardInfo(info: string): { icon: string; iconIsHtml: boolean; title: string; link: string } {
  let rest = info.trim().slice('card'.length).trim();
  let link = '';

  const pipeIdx = rest.lastIndexOf(' | ');
  if (pipeIdx !== -1) {
    link = rest.slice(pipeIdx + 3).trim();
    rest = rest.slice(0, pipeIdx).trim();
  }

  let icon = '';
  let iconIsHtml = false;
  const shortcodeMatch = rest.match(/^(:[a-z0-9_+-]+:)\s*/i);
  if (shortcodeMatch) {
    const resolved = resolveIcon(shortcodeMatch[1]);
    icon = resolved.html;
    iconIsHtml = resolved.isHtml;
    rest = rest.slice(shortcodeMatch[0].length).trim();
  } else {
    const emojiMatch = rest.match(/^(\p{Extended_Pictographic}\uFE0F?)\s*/u);
    if (emojiMatch) {
      icon = emojiMatch[1];
      rest = rest.slice(emojiMatch[0].length).trim();
    }
  }

  return { icon, iconIsHtml, title: rest, link };
}

export function cardPlugin(md: MarkdownIt): void {
  // Card grid wrapper
  md.use(container, 'cards', {
    render(tokens: Token[], idx: number) {
      return tokens[idx].nesting === 1 ? '<div class="md-cards">\n' : '</div>\n';
    },
  });

  const tagStack: string[] = [];

  // Individual card
  md.use(container, 'card', {
    render(tokens: Token[], idx: number) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const { icon, iconIsHtml, title, link } = parseCardInfo(token.info);
        const safeTitle = md.utils.escapeHtml(title);
        const safeIcon  = iconIsHtml ? icon : md.utils.escapeHtml(icon);
        const safeLink  = md.utils.escapeHtml(link);
        const safe = link && isSafeHref(link);
        const tag  = safe ? 'a' : 'div';
        tagStack.push(tag);
        const href    = safe ? ` href="${safeLink}"` : '';
        const iconHtml  = icon  ? `<span class="md-card-icon" aria-hidden="true">${safeIcon}</span>\n` : '';
        const titleHtml = title ? `<h3 class="md-card-title">${safeTitle}</h3>\n` : '';
        return (
          `<${tag} class="md-card"${href}>\n` +
          iconHtml +
          `<div class="md-card-body">\n` +
          titleHtml +
          `<div class="md-card-content">\n`
        );
      }
      const tag = tagStack.pop() ?? 'div';
      return `</div>\n</div>\n</${tag}>\n`;
    },
  });
}
