---
title: Page Subtitle Plugin
description: Render the frontmatter description as a styled subtitle paragraph directly after the first H1.
---

## Usage

```ts
import { pageSubtitlePlugin } from '@rooom/vitepress-plugins/markdown'
md.use(pageSubtitlePlugin)
```

## How It Works

When a page has a `description` in its frontmatter **and** an `<h1>` in its content, the plugin inserts a `<p class="page-subtitle">` immediately after the closing `</h1>` tag.

The subtitle is injected only once — after the **first** H1 on the page.

## Example

```md
---
title: My Page
description: A short description shown as subtitle below the H1.
---

# My Page

Content starts here.
```

**Rendered HTML:**

```html
<h1>My Page</h1>
<p class="page-subtitle">A short description shown as subtitle below the H1.</p>
<p>Content starts here.</p>
```

## Works Best With pageH1Plugin

Combine with [`pageH1Plugin`](/plugins/page-h1) — both H1 and subtitle come from frontmatter:

```md
---
title: My Page
description: A subtitle automatically placed below the H1.
---

Content here — no manual `# Heading` needed.
```

Register both:

```ts
md.use(pageH1Plugin)
md.use(pageSubtitlePlugin)
```

## Behaviour Summary

| Condition | Result |
|---|---|
| `description` set, H1 in content | Subtitle injected after first H1 |
| `description` set, no H1 | No injection |
| No `description` in frontmatter | No injection |
| `description` is whitespace only | No injection |
| Multiple H1s | Subtitle injected after the **first** H1 only |

## Security

The description is passed through `md.utils.escapeHtml()` — HTML special characters are escaped automatically.

## CSS Class

| Class | Element |
|---|---|
| `.page-subtitle` | The subtitle `<p>` element |

Style it in your theme's custom CSS:

```css
.page-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
}
```
