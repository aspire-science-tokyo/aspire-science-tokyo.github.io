# ASPIRE DT Platform — project website

The public website for the ASPIRE *Realtime Digital Twin Platforms* project,
served at **https://aspire-dt.org** via GitHub Pages.

This is a **plain static site** — hand-written HTML + one hand-written CSS file,
**no build step, no framework, no Node.js**. To change the site you edit an
`.html` file (or `assets/css/site.css`) and `git push`; GitHub Pages redeploys
automatically in about a minute.

> It started life as a Next.js export. In 2026-10 every page was rewritten as
> readable HTML with semantic class names, and the compiled Tailwind CSS was
> replaced by `assets/css/site.css`.

---

## Repository layout

```
index.html                     Home page
research/  people/  exchange/  publications/ (= Outputs)  news/
                               The pages in the main navigation
about/  glossary/  contact/    Extra pages (not linked from the navigation)
news/
  index.html                   News & Events listing (the cards)
  <YYYY-MM-slug>/
    index.html                 One news article
    <photo>.jpeg               That article's image lives in the same folder
assets/
  css/site.css                 The only stylesheet — edit it directly
  js/main.js                   The only JavaScript (mobile menu toggle)
  media/                       The font file and the home-page images
404.html        CNAME          sitemap.xml     robots.txt     .nojekyll
favicon.png     og-image.png   ← social-media preview image (og:image / twitter:image)
```

Pages use **clean URLs**: the file `people/index.html` is served at `/people/`.
That is why every page is a folder with an `index.html` — it works on any static
server, not just GitHub Pages.

---

## Preview locally

From the repository root:

```bash
python3 -m http.server
```

Then open <http://localhost:8000/>. Click around — internal links work exactly
as they will in production. (Use `Ctrl+C` to stop.)

## Publish

```bash
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages rebuilds from the `master` branch automatically. No build command.

---

## How to add a NEWS item

Each news article is its **own folder** under `news/` holding an `index.html`
and its photo. The fastest way is to copy the most recent article and edit it.

1. **Create the folder and add the photo.** Use a date-prefixed slug:

   ```bash
   mkdir -p news/2026-09-my-news-slug
   cp ~/Desktop/photo.jpeg news/2026-09-my-news-slug/photo.jpeg
   ```

2. **Copy an existing article as the starting point:**

   ```bash
   cp news/2026-06-sakaguchi-ika-rwth-aachen/index.html news/2026-09-my-news-slug/index.html
   ```

3. **Edit `news/2026-09-my-news-slug/index.html`** and update these spots:

   | What | Where |
   |------|-------|
   | Page title | `<title>`, `og:title`, `twitter:title` |
   | Summary text | `<meta name="description">`, `og:description`, `twitter:description`, and `<p class="article__summary">` |
   | URL of this article | `<link rel="canonical">` and `og:url` → `https://aspire-dt.org/news/2026-09-my-news-slug/` |
   | Date | `<time datetime="2026-09-15">Sep 15, 2026</time>` and `article:published_time` |
   | Headline | `<h1 class="page-title">` |
   | Location / source line | the `<span>` right after `<time>` |
   | Tags | the `<li class="tag">` items |
   | Photo | the `<img>` inside `<figure class="article__figure">` (set `width`/`height` to the image's real pixel size) |
   | Body | the paragraphs inside `<div class="text prose">` |

   To show a paper reference inside the body, use the box from the VTC2026
   article: `<div class="citation">` with a `<p class="citation__title">`.

4. **Add a card to the listing** in [`news/index.html`](news/index.html): copy
   an `<article class="card news-card">…</article>` block, paste it **at the
   top** (newest first) and change the two `href`s, the `<img src>`, the
   `<time>`, the title and the summary. The badge colour is set by its class:
   `badge--news`, `badge--event`, `badge--talk` or `badge--workshop`.

5. **Add the URL to [`sitemap.xml`](sitemap.xml):**

   ```xml
   <url>
   <loc>https://aspire-dt.org/news/2026-09-my-news-slug/</loc>
   <lastmod>2026-09-15T00:00:00.000Z</lastmod>
   </url>
   ```

6. Preview, then commit and push.

---

## How to add a PAPER (Outputs page)

Papers live directly in [`publications/index.html`](publications/index.html),
one `<section>` per year (newest first). Copy an existing
`<article class="card card--roomy pub">` block inside the right year and change
the text:

```html
<article class="card card--roomy pub">
  <span class="icon-badge icon-badge--pale"><svg …graduation-cap icon…></svg></span>
  <div class="pub__body stack-sm">
    <div class="pub__tags">
      <span>international conference</span>
      <span>mobility</span>
    </div>
    <h3 class="card-title">PAPER TITLE HERE</h3>
    <p class="pub__line">A. Author, B. Author, and C. Author</p>
    <p class="pub__line">Venue, City, Country, Month Year</p>
  </div>
</article>
```

To start a new year, copy a whole `<section class="stack">…</section>` and
change its `<h2 class="group-title">2026</h2>`.

---

## How to add a PERSON (Team page)

[`people/index.html`](people/index.html) has one `<section class="panel team-section">`
per Work Package. Copy an `<article class="card person">` block into the right
group and change the initials, name, role, affiliation and description. Add
`person--lead` to the class for the WP leader. A new Work Package needs a new
section with its own `id`, plus a matching link in the `<nav class="section-nav">`
at the top of the page.

---

## How the styling works

All styling is in [`assets/css/site.css`](assets/css/site.css), organised in
numbered sections (tokens, layout, header/footer, typography, cards, page
components). Pages use short semantic class names, for example:

| Class | What it is |
|-------|-----------|
| `page`, `page--compact`, `page--spacious` | the vertical stack of sections on a page |
| `stack`, `stack-sm`, `stack-lg` … | vertical spacing inside a block |
| `grid grid--2`, `grid--3`, `grid--2-3` … | card grids (columns on phone → tablet → desktop) |
| `panel`, `panel--wash` | rounded tinted background around a section |
| `card`, `card__head`, `card-title` | white card with optional icon heading |
| `eyebrow`, `page-title`, `section-title`, `section-intro`, `lead`, `text` | typography |
| `pill`, `tag`, `badge` | rounded labels |

Colours are CSS variables at the top of `site.css` (`--brand`, `--bg`,
`--text-muted`, the domain colours, …) — change a colour there and it changes
everywhere.

Icons are inline SVGs from [Lucide](https://lucide.dev). To add one, copy its
SVG from the Lucide site and give the `<svg>` `class="icon"` (`icon--sm` /
`icon--xs` for smaller sizes).

---

## Conventions & gotchas

- **Header & footer are duplicated** on every page (plain HTML, no templating).
  To change the navigation or footer, edit every page — then check nothing was
  missed, e.g. `grep -L 'href="/news/"' */index.html news/*/index.html index.html 404.html`.
  The only per-page difference in the header is `aria-current="page"` on the
  current section's link (desktop and mobile menu).
- **Links:** use clean, root-absolute paths with a trailing slash —
  `/people/`, `/news/<slug>/`. Reference images and assets with absolute paths
  too (`/assets/…`, `/news/<slug>/photo.jpeg`) so they work from any page depth.
- **HTML entities in text:** write `&amp;` for `&`, `&#x27;` for `'`,
  `&quot;` for `"` inside attribute values, and `&mdash;` for an em-dash (—).
- **Characters / fonts:** the site ships only the Latin subset of Noto Sans JP
  (`assets/media/noto-sans-jp-latin.woff2`). Stick to English text plus common
  punctuation (`– — · → ë`). Japanese characters would fall back to a system
  font.
- **The site is the deploy.** There is no staging branch — pushing to `master`
  publishes immediately. Preview locally first.
