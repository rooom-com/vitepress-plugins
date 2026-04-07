---
title: Page H1 Plugin
description: Automatically inject an H1 heading from the frontmatter title field — keep your markdown DRY.
---

## Usage

```ts
import { pageH1Plugin } from '@rooom/vitepress-plugins/markdown'
md.use(pageH1Plugin)
```

## How It Works

When a page has a `title` in its frontmatter but **no `# Heading`** in the body, the plugin automatically inserts an `<h1>` at the top of the token stream.

If an H1 already exists in the content, it is left **untouched**.

## Example

**Without the plugin** you repeat the title:

```md
---
title: My Page Title
---

# My Page Title   ← duplicated

Content starts here.
```

**With the plugin**, the H1 is injected automatically:

```md
---
title: My Page Title
---

Content starts here.   ← H1 is added by the plugin above this
```

## Frontmatter

```yaml
---
title: My Page Title
---
```

The plugin supports titles wrapped in quotes as some YAML parsers produce them:

```yaml
title: "My Quoted Title"   # → <h1>My Quoted Title</h1>
title: 'Single Quoted'     # → <h1>Single Quoted</h1>
```

## Behaviour Summary

| Condition | Result |
|---|---|
| `title` set, no `# H1` in body | H1 injected at top |
| `title` set, `# H1` exists in body | Existing H1 kept, no injection |
| No `title` in frontmatter | No injection |
| `title` is empty string | No injection |

## Pair with pageSubtitlePlugin

Combine with [`pageSubtitlePlugin`](/plugins/page-subtitle) to inject both H1 and a subtitle from frontmatter:

```md
---
title: My Page
description: A short description shown below the H1.
---
```
