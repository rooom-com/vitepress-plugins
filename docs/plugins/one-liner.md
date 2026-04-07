---
title: One-Liner Plugin
description: Display a single-line value such as a URL, token, or endpoint in a styled read-only block.
---

## Usage

```ts
import { oneLinerPlugin } from '@rooom/vitepress-plugins/markdown'
md.use(oneLinerPlugin)
```

## Basic Example

Use a fenced code block with the language tag `one-line`:

````md
```one-line
https://api.example.com/v1/users
```
````

**Result:**

```one-line
https://api.example.com/v1/users
```

## More Examples

**API endpoint:**

```one-line
https://api.example.com/v1/products?limit=10&page=1
```

**Environment variable value:**

```one-line
VITE_API_BASE_URL=https://api.example.com
```

**Token placeholder:**

```one-line
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## HTML Output

```html
<div class="api-value-block">https://api.example.com/v1/users</div>
```

- HTML entities (`<`, `>`, `&`, `"`) are **escaped** automatically.
- Whitespace is **trimmed** from both ends of the value.
- Regular code blocks (with other language tags) are **not affected**.

## CSS Class

| Class | Element |
|---|---|
| `.api-value-block` | The wrapping `<div>` |
