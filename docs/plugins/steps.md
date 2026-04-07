---
title: Steps Plugin
description: Numbered step-by-step guides auto-generated from h3 headings inside a steps container.
---

## Usage

```ts
import { stepByStepPlugin } from '@rooom/vitepress-plugins/markdown'
md.use(stepByStepPlugin)
```

## Basic Example

Use `### headings` inside a `::: steps` container. Each `###` becomes a numbered step:

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

**Result:**

::: steps
### Install dependencies
Run `npm install` in your project root.

### Start the dev server
Run `npm run dev` and open `http://localhost:5173`.

### Build for production
Run `npm run build` to generate the static output.
:::

## Step Content

Each step can contain any markdown — paragraphs, code blocks, lists, and more:

```md
::: steps
### Configure your project
Edit `.vitepress/config.mts` and add your plugins:

```ts
md.use(stepByStepPlugin)
` ``

### Write your content
Create `.md` files in your `docs/` directory.

### Deploy
Push to your hosting provider of choice.
:::
```

**Result:**

::: steps
### Configure your project
Edit `.vitepress/config.mts` and add your plugins.

### Write your content
Create `.md` files in your `docs/` directory.

### Deploy
Push to your hosting provider of choice.
:::

## Notes

- Only `### h3` headings trigger step rendering inside the container.
- `## h2` and `# h1` headings inside `::: steps` are left unchanged.
- Steps outside of `::: steps` render as regular `<h3>` elements.

## CSS Classes

| Class | Element |
|---|---|
| `.steps-container` | Outer wrapper `<div>` |
| `.steps-wrapper` | Inner flex column `<div>` |
| `.step-item` | Per-step wrapper `<div>` |
| `.step-badge` | Numbered circle `<div>` |
| `.step-number` | Number `<span>` |
| `.step-content` | Content area `<div>` |
| `.step-title` | Step heading `<h3>` |
