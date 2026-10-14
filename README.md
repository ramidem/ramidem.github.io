# ramidem.github.io

Static GitHub Pages site for `ramidem.github.io`.

## Structure

- `/` - homepage
- `/projects` - projects placeholder page
- `/resume` - static resume; `/resume/med-aduh-resume.pdf` is generated from it
- `/notes` - notes blog; notes are Jekyll posts in `_posts/` (see [Notes](#notes))
- `/notes/feed.xml` - Atom feed of all notes

Analytics: [GoatCounter](https://ramidem.goatcounter.com) (`goatcounter` in `_config.yml`), in
production builds only.

## Local Development

One-time setup (Ruby version is pinned in `.ruby-version`):

```sh
brew install rbenv ruby-build   # skip if already installed
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc   # once; then open a new terminal
rbenv install -s                 # installs the version in .ruby-version
gem install bundler -v 2.3.26
bundle install
```

Run a dev server at `http://localhost:4317/` (restart it after changing `_config.yml`):

```sh
bundle exec jekyll serve --livereload --port 4317
```

## Notes

### Add a note

Create `_posts/YYYY-MM-DD-slug.md`:

```markdown
---
title: what the blog?
date: 2026-10-13 19:46:00 +0800
description: How this notes blog is put together
category: jekyll
---
The note, in markdown.
```

- `title`, `date` - required. Keep the `+0800` offset; future-dated posts are skipped.
- `description` - the preview line in lists and link previews; defaults to the first paragraph.
- `category` - the note's folder (one level). Leave it out to list the note only under All Notes.
- `pinned: true` - lists the note under Pinned; list pages open on it.

The note lives at `/notes/<category>/<slug>/` (or `/notes/<slug>/`). Slugs must be unique, or one
note overwrites the other.

For media, use the includes in `_includes/notes/` (each documents its parameters):

```liquid
{% include notes/figure.html src="/notes/media/photo.jpg" alt="..." caption="..." %}
{% include notes/video.html src="/notes/media/clip.mp4" poster="/notes/media/clip.jpg" %}
{% include notes/youtube.html id="jNQXAC9IVRw" title="Me at the zoo" %}
{% include notes/audio.html src="/notes/media/clip.mp3" title="..." %}
{% include notes/link-card.html url="https://..." title="..." description="..." %}
```

Self-hosted files go in `notes/media/`.

### Add a folder

Each folder (lowercase, hyphenated) needs a page at `notes/<folder>/index.html`, or its link is a
404 (the sidebar marks it):

```yaml
---
layout: folder
folder: jekyll
---
```

### How it works

- `_includes/notes/app.html` draws the panes; `_layouts/note.html`, `_layouts/folder.html`, and
  `notes/index.html` use it. Styles in `notes/styles.css`; `notes/js/*.js` adds the sidebar
  toggle, share, search, and list memory (pages work without it).
- Lists show Pinned, then notes by month. A note's page lists All Notes, or its folder if you came
  from there.
- The feed's title and subtitle are `title` and `description` in `_config.yml`.
- Click events are marked with `data-goatcounter-click`. The resume isn't built by Jekyll, so its
  head has its own copy of the GoatCounter snippet.

### Search

Search uses [Pagefind](https://pagefind.app/); the deploy workflow builds the index. To build it
locally (re-run after edits), with the dev server running:

```sh
npx pagefind@1.5.2 --site _site
```

Without an index, search matches only titles and previews. Search covers the current list (All
Notes or a folder), and the query lives in the address as `?q=`.

## Resume

Check the JavaScript:

```sh
node --check resume/data.js
node --check resume/script.js
```

Regenerate the PDF from the dev server, then confirm it's one page:

```sh
mkdir -p tmp/pdfs
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/tmp/pdfs/resume.pdf" \
  "http://localhost:4317/resume/"
cp tmp/pdfs/resume.pdf resume/med-aduh-resume.pdf
rm -rf tmp
pdfinfo resume/med-aduh-resume.pdf | rg 'Pages|File size'
```

## Deploy

Push to `master`. The `Deploy site` workflow (`.github/workflows/pages.yml`) builds with the
Gemfile's Jekyll and deploys to GitHub Pages (Settings → Pages → Source: GitHub Actions).

`Gemfile.lock` must list both `arm64-darwin` and `x86_64-linux`; if Linux goes missing, run
`bundle lock --add-platform x86_64-linux`.

## Gotchas

- Folders inside `_posts/` don't set categories; notes use front matter only.
- Jekyll has no nested categories, and `site.posts | map: "categories" | map: "first"` silently
  returns nothing; collect folder names with a loop.
- kramdown wraps a leading `<a>` in `<p>`, so block includes must start with a block tag.
