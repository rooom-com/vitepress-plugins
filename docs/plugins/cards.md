---
title: Cards Plugin
description: Responsive icon card grids with optional links, emoji shortcodes, and direct emoji support.
---

## Usage

```ts
import { cardPlugin } from '@rooom/vitepress-plugins/markdown'
md.use(cardPlugin)
```

## Card Grid

Wrap individual cards in `:::: cards` to place them in a responsive grid:

```md
:::: cards
::: card :rocket: Quick Start | /plugins/accordion
Get up and running in minutes.
:::
::: card :book: API Reference | /plugins/steps
Browse the full plugin documentation.
:::
::: card :sparkles: Lucide Icons | /plugins/lucide-icons
Thousands of inline SVG icons.
:::
::::
```

**Result:**

:::: cards
::: card :rocket: Quick Start | /plugins/accordion
Get up and running in minutes.
:::
::: card :book: API Reference | /plugins/steps
Browse the full plugin documentation.
:::
::: card :sparkles: Lucide Icons | /plugins/lucide-icons
Thousands of inline SVG icons.
:::
::::

## Single Card (no grid)

```md
::: card :bulb: Tip
A card without a grid wrapper, rendered as a standalone block.
:::
```

**Result:**

::: card :bulb: Tip
A card without a grid wrapper, rendered as a standalone block.
:::

## Direct Emoji Icon

```md
::: card 🎉 Celebrate | https://example.com
Use any emoji directly as an icon.
:::
```

**Result:**

::: card 🎉 Celebrate | https://example.com
Use any emoji directly as an icon.
:::

## Emoji Shortcode Reference

Common shortcodes: `:rocket:` 🚀 · `:book:` 📖 · `:gear:` ⚙️ · `:star:` ⭐ · `:lock:` 🔒 · `:zap:` ⚡ · `:bulb:` 💡 · `:sparkles:` ✨

## Lucide Icon Fallback

Shortcodes that aren't in the emoji map above fall back to a [Lucide](https://lucide.dev) icon of the same name, rendered as inline SVG:

```md
::: card :settings: Preferences
Configure your options.
:::
```

**Result:**

::: card :settings: Preferences
Configure your options.
:::

Full icon list: [lucide.dev/icons](https://lucide.dev/icons/)

## Link Safety

Only safe URLs are rendered as `<a>` elements. Protocol-relative (`//evil.com`) and `javascript:` URLs are silently downgraded to a `<div>`.

| Scheme | Rendered as |
|---|---|
| `/relative/path` | `<a>` |
| `https://…` | `<a>` |
| `mailto:…` | `<a>` |
| `//evil.com` | `<div>` (blocked) |
| `javascript:…` | `<div>` (blocked) |

## CSS Classes

| Class | Element |
|---|---|
| `.md-cards` | Grid wrapper `<div>` |
| `.md-card` | Card (`<a>` or `<div>`) |
| `.md-card-icon` | Icon `<span>` |
| `.md-card-title` | `<h3>` title |
| `.md-card-body` | Body wrapper |
| `.md-card-content` | Content `<div>` |
