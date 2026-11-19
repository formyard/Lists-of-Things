# Lists of Things

Christmas gift lists for 2026, as one static page on GitHub Pages: https://formyard.github.io/Lists-of-Things/

Plain HTML, CSS and JavaScript modules. No build step, no dependencies.

## Run it locally

The scripts load as ES modules, which browsers block when `index.html` is opened straight from disk. Serve the folder instead:

```sh
python3 -m http.server
```

Then open http://localhost:8000.

## Edit the gifts

All gift data lives in `js/gifts.js`. Each person has a `name`, a `shape` (`square`, `triangle` or `circle`) and a list of `gifts`.

A gift is either a single item:

```js
{
  name: "Roland TR-08 Rhythm Composer",
  shop: "Perfect Circuit",
  url: "https://www.perfectcircuit.com/roland-boutique-tr-08.html",
  note: "Optional short note."
}
```

or a set, whose `parts` are items:

```js
{
  name: "Bedtime set",
  parts: [
    { name: "…", shop: "…", url: "…" }
  ]
}
```

- Add `blackOwned: true` to an item to show "Black-owned" after the shop name.
- Leave out `note` when there's nothing to add.
- Each person's id comes from their name, so `?for=micah` opens straight to that list.

## Project structure

| File | What it does |
| --- | --- |
| `index.html` | Page structure, plus the `<template>` markup for a person, an item, a set and a filter choice |
| `style.css` | Styles in cascade layers: reset, tokens, base, layout, components, motion, utilities |
| `js/gifts.js` | The gift data |
| `js/main.js` | Entry point: renders the lists and starts the filter |
| `js/render.js` | Builds people, gifts and filter choices from the templates |
| `js/filter.js` | Shows one person's list and keeps the choice in the URL |
| `js/template.js` | Clones a template and fills its `data-field` slots |
| `js/text.js` | Turns names into ids and formats gift counts |
| `fonts/` | Jost, self-hosted, with its license |
| `favicon.svg` | Browser tab icon |
| `apple-touch-icon.png` | Icon for iPhone and iPad home screens |
| `og-image.png` | The 1200 × 630 picture shown when the link is shared |

## Accessibility

The page aims for WCAG 2.2 AAA.

- The person filter is a native radio group, and a status message announces how many gifts are showing.
- Text contrast is at least 7:1. The large labels on the shapes are at least 4.5:1, the AAA level for large text.
- Shop links open in a new tab. Each shows an arrow and tells screen readers it opens a new tab.
- The only motion is the shapes' entrance, and it's turned off when the device asks for reduced motion.
- Lists keep `role="list"` on purpose, so Safari's screen reader still announces them as lists after their bullets are restyled. HTML validators flag it as redundant.

## Sharing

When the link is shared on X, iMessage, Slack, Facebook and similar apps, they show `og-image.png` with the page title and description. The tags for this are at the top of `index.html`. The image address there is absolute, so update it if the repository or site address changes.

## Publish

In the repository's Settings → Pages, deploy from the `main` branch, root folder. After a push, give Pages a minute or two, then hard-reload (Cmd+Shift+R) so the browser doesn't keep old scripts.

The page has a `noindex` tag so search engines skip it, but anyone with the link can see it.

## Credits

Jost is by the Jost Project Authors, used under the SIL Open Font License. See `fonts/OFL.txt`.
