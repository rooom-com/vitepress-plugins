# @rooom/vitepress-plugins

[![npm version](https://img.shields.io/npm/v/@rooom/vitepress-plugins)](https://www.npmjs.com/package/@rooom/vitepress-plugins)
[![license](https://img.shields.io/npm/l/@rooom/vitepress-plugins)](./LICENSE)

A collection of [markdown-it](https://github.com/markdown-it/markdown-it) plugins for [VitePress](https://vitepress.dev) — accordion, cards, step-by-step guides, Lucide icons, one-liner blocks, and automatic H1/subtitle injection from frontmatter.

## Installation

```bash
npm install @rooom/vitepress-plugins
```

## Setup

Register the plugins in your `.vitepress/config.mts`:

```ts
import { defineConfig } from 'vitepress'
import {
  accordionPlugin,
  cardPlugin,
  lucideIconPlugin,
  oneLinerPlugin,
  pageH1Plugin,
  pageSubtitlePlugin,
  stepByStepPlugin,
} from '@rooom/vitepress-plugins/markdown'

export default defineConfig({
  markdown: {
    config(md) {
      md.use(accordionPlugin)
      md.use(cardPlugin)
      md.use(lucideIconPlugin)
      md.use(oneLinerPlugin)
      md.use(pageH1Plugin)
      md.use(pageSubtitlePlugin)
      md.use(stepByStepPlugin)
    },
  },
})
```

## Plugins

### `accordionPlugin`

Renders collapsible accordion items using native `<details>`/`<summary>`.

```md
:::: accordion-group
::: accordion What is VitePress?
A static site generator powered by Vite and Vue.
:::
::: accordion How do I install it?
Run `npm install vitepress`.
:::
::::
```

---

### `cardPlugin`

Renders icon cards in a responsive grid. Icons support emoji shortcodes (`:rocket:`) or direct emoji (🚀). Links are optional.

```md
:::: cards
::: card :rocket: Quick Start | /guide/getting-started
Get up and running in minutes.
:::
::: card :book: API Reference | /api/
Browse the full API documentation.
:::
::::
```

---

### `stepByStepPlugin`

Renders numbered step-by-step guides from `### headings` inside a `::: steps` container.

```md
::: steps
### Install dependencies
Run `npm install` in your project root.

### Start the dev server
Run `npm run dev` and open `http://localhost:5173`.

### Build for production
Run `npm run build` to generate the static output.
:::
```

---

### `lucideIconPlugin`

Renders inline [Lucide](https://lucide.dev) SVG icons from `:icon-name:` shortcodes.

```md
Click the :settings: icon to open preferences.
Check out the :book-open: documentation for details.
```

Full icon list: [lucide.dev/icons](https://lucide.dev/icons/)

---

### `oneLinerPlugin`

Renders a fenced block tagged `` one-line `` as a styled single-line value display.

````md
```one-line
https://api.example.com/v1/endpoint
```
````

---

### `pageH1Plugin`

Automatically injects an `<h1>` from the frontmatter `title` field — no `# Heading` needed in the body.

```md
---
title: My Page Title
---

Content starts here, H1 is injected automatically.
```

---

### `pageSubtitlePlugin`

Renders the frontmatter `description` as a subtitle paragraph after the first `<h1>`.

```md
---
title: My Page
description: A short description shown as subtitle below the H1.
---
```

## License

[MIT](./LICENSE) © rooom AG
