/** Emoji shortcodes supported by the card plugin (`:rocket:` → 🚀). */
export const EMOJI_MAP: Record<string, string> = {
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

/** Resolves `:shortcode:` to an emoji; returns the input unchanged if unknown. */
export function resolveEmoji(shortcode: string): string {
  const match = shortcode.match(/^:([a-z0-9_+-]+):$/i);
  if (match) return EMOJI_MAP[match[1]] ?? shortcode;
  return shortcode;
}
