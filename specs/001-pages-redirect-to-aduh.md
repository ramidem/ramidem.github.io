# Spec

## Problem

ramidem.github.io still serves the old site with HTTP 200. Visitors who open any page stay there. Med does not want a CNAME or a GitHub Pages custom domain, because aduh.me is already served from Cloudflare as its own site. Canonical links were pointed at https://aduh.me in commit 59ad1ca. A canonical link does not send the browser anywhere.

## Goals

- Opening any HTML page on this GitHub Pages site sends the browser to the same path on https://aduh.me.
- The path, query string, and hash are kept.
- Works with JavaScript off, via a meta refresh.
- Local `jekyll serve` (development) still shows the Jekyll pages so they can be edited.

## Non-goals

- No CNAME file. No change to the Pages custom domain. No DNS change. No edit to the aduh.me repo.
- No HTTP 301. GitHub Pages cannot send one without a custom domain. The first response stays 200, then the browser leaves. That is expected.
- Do not redirect CSS, JS, images, the resume PDF, the Atom feed at /notes/feed.xml, or other non-HTML files.
- Do not add /projects or /notes to aduh.me. Those paths 404 there today. Still send the browser to the same path. Do not send them to the home page instead.
- Do not remove the existing canonical, Open Graph, or Twitter tags.

## Requirements

1. In `_includes/head.html`, only when `jekyll.environment == "production"`, put this immediately inside `<head>`, before the other tags:
   - `<meta http-equiv="refresh" content="0; url={{ page.url | absolute_url }}">`
   - an inline script, not async and not defer: `location.replace("https://aduh.me" + location.pathname + location.search + location.hash);`
   - The host in the script is the literal `https://aduh.me`. Do not build it from `location.host`.
2. In `_layouts/base.html`, only when `jekyll.environment == "production"`, put this before `{{ content }}`:
   `<noscript><p><a href="{{ page.url | absolute_url }}">Continue to aduh.me</a></p></noscript>`
3. `resume/index.html` is not processed by Jekyll. Always add the same redirect at the start of its `<head>`, with the meta refresh URL hardcoded to `https://aduh.me/resume/`, and the same `location.replace` script. Add the same noscript link at the start of `<body>`, with href `https://aduh.me/resume/`. Put the script before the GoatCounter scripts.
4. Pages that use `layout: base` (`index.html`, `notes/index.html`, `projects/index.html`, `notes/jekyll/index.html`, posts, `404.html`) get the redirect only through the include and the layout. Do not copy the snippet into each of those files.
5. Update the README sentence that says ramidem.github.io redirects to aduh.me once the custom domain is set. Say instead that each HTML page sends the browser to the same path on https://aduh.me, and that this is not a custom domain.
6. Production is already how GitHub builds the site: `.github/workflows/pages.yml` sets `JEKYLL_ENV: production`. Do not change the workflow unless a check proves the redirect is missing from the production build.

## Acceptance

From the repo root, with dependencies already installed:

```
JEKYLL_ENV=production bundle exec jekyll build
```

Then all of these must be true:

- `_site/index.html` contains `http-equiv="refresh"` and `location.replace` and `https://aduh.me`.
- `_site/notes/index.html`, `_site/projects/index.html`, and `_site/404.html` contain the same.
- One built post under `_site/notes/` contains the same.
- `_site/resume/index.html` contains `url=https://aduh.me/resume/` and `location.replace`.
- `_site` contains no file named CNAME.
- A built CSS file under `_site/assets` does not contain `location.replace`.
- A development build (`JEKYLL_ENV=development bundle exec jekyll build --destination _site_dev`) does not put `location.replace` in `_site_dev/index.html`. `_site_dev/resume/index.html` still has it, because that file is static. Delete `_site_dev` after the check.

## Edge cases

- `location.replace` keeps the path the browser actually requested, including a missing trailing slash and any query or hash. The meta refresh is the no-JS fallback and does not include the query or hash.
- `page.url | absolute_url` already uses `site.url`, which is `https://aduh.me`.
- `/resume` on the live new site returns 307 to `/resume/`. Sending `/resume/` there is correct.
- Do not redirect the PDF at `resume/med-aduh-resume.pdf`.

## Rollout

Commit on this branch only. Engineering Lead will push and open the PR. Med merges. The Pages workflow deploys on push to master. Until then the live site does not redirect.

## Open questions

None. Do not ask. Path-preserving redirect is the decision, including paths that 404 on aduh.me today.
