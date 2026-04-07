---
title: Accordion Plugin
description: Collapsible sections using native HTML details/summary — no JavaScript needed.
---

## Usage

Register `accordionPlugin` in your `.vitepress/config.mts`:

```ts
import { accordionPlugin } from '@rooom/vitepress-plugins/markdown'
md.use(accordionPlugin)
```

## Single Accordion

```md
::: accordion What is VitePress?
A static site generator powered by Vite and Vue.
:::
```

**Result:**

::: accordion What is VitePress?
A static site generator powered by Vite and Vue.
:::

## Accordion Group

Wrap multiple items in `:::: accordion-group` to visually group them:

```md
:::: accordion-group
::: accordion What is VitePress?
A static site generator powered by Vite and Vue.
:::
::: accordion How do I install it?
Run `npm install vitepress` in your project directory.
:::
::: accordion Which plugins are included?
Accordion, Cards, Steps, Lucide Icons, One-Liner, Page H1, and Page Subtitle.
:::
::::
```

**Result:**

:::: accordion-group
::: accordion What is VitePress?
A static site generator powered by Vite and Vue.
:::
::: accordion How do I install it?
Run `npm install vitepress` in your project directory.
:::
::: accordion Which plugins are included?
Accordion, Cards, Steps, Lucide Icons, One-Liner, Page H1, and Page Subtitle.
:::
::::

## HTML Output

Each accordion item renders as a native `<details>` / `<summary>` element:

```html
<details class="accordion-item">
  <summary class="accordion-title">What is VitePress?</summary>
  <div class="accordion-content">
    <p>A static site generator powered by Vite and Vue.</p>
  </div>
</details>
```

## CSS Classes

| Class | Element |
|---|---|
| `.accordion-group` | Group wrapper `<div>` |
| `.accordion-item` | `<details>` element |
| `.accordion-title` | `<summary>` element |
| `.accordion-content` | Content `<div>` inside `<details>` |
