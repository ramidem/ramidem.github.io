# ramidem.github.io

Static GitHub Pages site for `ramidem.github.io`.

## Structure

- `/` - homepage
- `/projects` - projects placeholder page
- `/resume` - interactive static resume
- `/resume/med-aduh-resume.pdf` - downloadable resume PDF generated from the resume page
- `/notes` - notes blog in a notes-app layout; notes are Jekyll posts in `_posts/` (see [Notes](#notes))
- `/notes/<folder>/` - one folder's notes; `/notes/<folder>/<slug>/` - a note
- `/notes/feed.xml` - Atom feed of all notes
- `/assets/fonts/vollkorn` - self-hosted Vollkorn font files used by the site

Analytics: [GoatCounter](https://ramidem.goatcounter.com), set by `goatcounter` in `_config.yml`
(production builds only).

## Local Development

One-time setup (Ruby version is pinned in `.ruby-version`):

```sh
brew install rbenv ruby-build   # skip if already installed
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc   # once; then open a new terminal
rbenv install -s                 # installs the version in .ruby-version
ruby -v                          # should match .ruby-version, not Homebrew's Ruby
gem install bundler -v 2.3.26
bundle install
```

Run a dev server with live reload:

```sh
bundle exec jekyll serve --livereload --port 4317
```

Or build once and serve the static output:

```sh
bundle exec jekyll build
python3 -m http.server 4317 --directory _site
```

Open:

```text
http://localhost:4317/
http://localhost:4317/resume/
http://localhost:4317/notes/
```

Restart the dev server after changing `_config.yml`; it doesn't reload config.

## Notes

### Add a note

Create `_posts/YYYY-MM-DD-slug.md`. The `slug` part of the filename becomes the note's address:

```markdown
---
title: what the blog?
date: 2026-10-13 19:46:00 +0800
description: How this notes blog is put together
category: jekyll
---
The note, in markdown.
```

- `title`, `date` - required. Include the `+0800` offset; posts dated in the future are skipped.
- `description` - the preview line in the list and in link previews. Optional; defaults to the
  first paragraph.
- `category` - the note's folder (one level; no folders inside folders). Leave it out for a note
  that only appears under All Notes.
- `pinned: true` - lists the note under Pinned, and list pages open on it.

The note lives at `/notes/<category>/<slug>/`, or `/notes/<slug>/` without a category. Keep slugs
unique: two notes with the same address overwrite each other.

Markdown has no syntax for media, so use the includes in `_includes/notes/` (each file documents
its parameters):

```liquid
{% include notes/figure.html src="/notes/media/photo.jpg" alt="..." caption="..." %}
{% include notes/video.html src="/notes/media/clip.mp4" poster="/notes/media/clip.jpg" %}
{% include notes/youtube.html id="jNQXAC9IVRw" title="Me at the zoo" %}
{% include notes/audio.html src="/notes/media/clip.mp3" title="..." %}
{% include notes/link-card.html url="https://..." title="..." description="..." %}
```

Put self-hosted files in `notes/media/`; host anything long on YouTube or Vimeo.

### Add a folder

Folders come from `category`, but each one also needs a page at `notes/<folder>/index.html`:

```yaml
---
layout: folder
folder: jekyll
---
```

Use lowercase, hyphenated folder names. Without the page, the folder still shows in the sidebar,
marked with a dashed underline, but its link is a 404.

### Search

Search on `/notes` uses [Pagefind](https://pagefind.app/), which indexes the built site. The deploy
workflow builds the index after Jekyll. Locally, with the dev server running, build it into `_site`:

```sh
npx pagefind@1.5.2 --site _site
```

Re-run it to pick up note changes. Without an index, the search box falls back to matching note
titles and previews.

## Resume Checks

Check resume JavaScript syntax:

```sh
node --check resume/data.js
node --check resume/script.js
```

Regenerate the downloadable resume PDF from the local page:

```sh
mkdir -p tmp/pdfs
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' \
  --headless \
  --disable-gpu \
  --no-pdf-header-footer \
  --print-to-pdf="$PWD/tmp/pdfs/resume.pdf" \
  "http://localhost:4317/resume/"
cp tmp/pdfs/resume.pdf resume/med-aduh-resume.pdf
rm -rf tmp
```

Confirm the PDF remains one page:

```sh
pdfinfo resume/med-aduh-resume.pdf | rg 'Pages|File size'
```

## Deploy

Push to `master`. The `Deploy site` workflow (`.github/workflows/pages.yml`) builds the site
with the Gemfile's Jekyll on the Ruby in `.ruby-version`, the same as local development, and
deploys it to GitHub Pages.

This needs the repository's Pages source set to GitHub Actions: Settings → Pages →
Build and deployment → Source: **GitHub Actions**.

`Gemfile.lock` lists both `arm64-darwin` (local) and `x86_64-linux` (the build runner). Keep both
when updating gems; if a platform goes missing, add it back with
`bundle lock --add-platform x86_64-linux`.
