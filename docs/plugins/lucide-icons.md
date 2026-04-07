---
title: Lucide Icons Plugin
description: "Render any Lucide icon inline using :icon-name: shortcodes — SVG is injected directly into the HTML."
---

## Usage

```ts
import { lucideIconPlugin } from '@rooom/vitepress-plugins/markdown'
md.use(lucideIconPlugin)
```

## Basic Example

Use `:icon-name:` (kebab-case) to insert a Lucide SVG inline:

```md
Click the :settings: icon to open preferences.
Check out the :book-open: documentation for details.
Download the :download: file to get started.
```

**Result:**

Click the :settings: icon to open preferences.
Check out the :book-open: documentation for details.
Download the :download: file to get started.

## More Icons

```md
:heart: :star: :zap: :shield: :globe: :code: :terminal: :bell:
```

**Result:**

:heart: :star: :zap: :shield: :globe: :code: :terminal: :bell:

## Naming Convention

Icons use **kebab-case** matching [Lucide's icon names](https://lucide.dev/icons/):

| Shortcode | Icon |
|---|---|
| `:settings:` | :settings: |
| `:arrow-right:` | :arrow-right: |
| `:book-open:` | :book-open: |
| `:circle-check:` | :circle-check: |
| `:triangle-alert:` | :triangle-alert: |
| `:package:` | :package: |

## Unknown Shortcodes

If an icon name is not found in Lucide, the shortcode is left as-is:

```md
:notanicon:  →  :notanicon:
```

## SVG Attributes

Every rendered SVG includes:

```html
<svg xmlns="http://www.w3.org/2000/svg"
  width="1em" height="1em"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="lucide-icon"
  aria-hidden="true">
  <!-- paths -->
</svg>
```

Icons inherit the current text color via `stroke="currentColor"` and scale with the font size via `width="1em"`.

## Full Icon List

Browse all available icons at [lucide.dev/icons](https://lucide.dev/icons/).
