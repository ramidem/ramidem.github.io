# ramidem.github.io

Static GitHub Pages site for `ramidem.github.io`.

## Structure

- `/` - homepage
- `/projects` - projects placeholder page
- `/resume` - interactive static resume
- `/resume/med-aduh-resume.pdf` - downloadable resume PDF generated from the resume page
- `/assets/fonts/vollkorn` - self-hosted Vollkorn font files used by the site

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
```

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

Push to `master`. GitHub Pages serves the static site from this repository.
