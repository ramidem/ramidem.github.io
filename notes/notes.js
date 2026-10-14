// Notes app behavior. Everything here is an enhancement; the page works without it.

// Keep the list you came from. List pages (All Notes, a folder) remember themselves;
// a note's page lists every note, so if you came from that note's folder, filter back to it.
(function () {
  var app = document.querySelector(".notes-app");
  if (!app) return;
  var key = "notes-list";

  function remember(folder) {
    try { sessionStorage.setItem(key, folder); } catch (e) {}
  }

  function recall() {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
  }

  if (!app.classList.contains("notes-app--note")) {
    remember(app.dataset.listFolder || "");
    return;
  }

  var folder = recall();
  if (!folder || folder !== app.dataset.noteFolder) return;

  var link = app.querySelector('.folder-list a[data-folder="' + CSS.escape(folder) + '"]');
  if (!link) return;

  // Rows: show only this folder's notes, and hide groups left empty.
  app.querySelectorAll(".notes-scroll li[data-folder]").forEach(function (row) {
    row.hidden = row.dataset.folder !== folder;
  });
  app.querySelectorAll(".notes-scroll ul").forEach(function (group) {
    var empty = !group.querySelector("li:not([hidden])");
    group.hidden = empty;
    var heading = group.previousElementSibling;
    if (heading && heading.classList.contains("list-group")) heading.hidden = empty;
  });

  // Sidebar highlight and the phone back link follow the folder.
  app.querySelector("[data-all-notes]").removeAttribute("aria-current");
  link.setAttribute("aria-current", "true");

  var back = app.querySelector(".notes-back");
  back.href = link.getAttribute("href");
  back.querySelector("span").textContent = folder;
})();

// Sidebar toggle. Desktop: the sidebar is open by default and the toggle hides it
// (remembered for the visit). Smaller screens: it's hidden by default and the toggle
// slides it in as a drawer, closed again by the toggle, a tap outside, or Escape.
(function () {
  var app = document.querySelector(".notes-app");
  var toggle = document.querySelector(".notes-sidebar-toggle");
  var sidebar = document.getElementById("notes-sidebar");
  if (!app || !toggle || !sidebar) return;

  var wide = window.matchMedia("(min-width: 1000px)");
  var key = "notes-sidebar-hidden";
  toggle.hidden = false;

  function isOpen() {
    return wide.matches
      ? !app.classList.contains("notes-app--sidebar-closed")
      : app.classList.contains("notes-app--sidebar-open");
  }

  function setOpen(open) {
    if (wide.matches) {
      app.classList.toggle("notes-app--sidebar-closed", !open);
      try { sessionStorage.setItem(key, open ? "" : "1"); } catch (e) {}
    } else {
      app.classList.toggle("notes-app--sidebar-open", open);
    }
    toggle.setAttribute("aria-expanded", String(open));
  }

  function reset() {
    app.classList.remove("notes-app--sidebar-open", "notes-app--sidebar-closed");
    var hidden = false;
    try { hidden = sessionStorage.getItem(key) === "1"; } catch (e) {}
    if (wide.matches && hidden) app.classList.add("notes-app--sidebar-closed");
    toggle.setAttribute("aria-expanded", String(isOpen()));
  }

  toggle.addEventListener("click", function () {
    setOpen(!isOpen());
  });

  document.addEventListener("click", function (event) {
    if (wide.matches || !isOpen()) return;
    if (sidebar.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || wide.matches || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });

  wide.addEventListener("change", reset);
  reset();
})();

// Search. Full text via Pagefind (the index is built after Jekyll; see the deploy
// workflow), scoped to the list you're in: All Notes, or the highlighted folder.
// Without an index (e.g. a dev server that hasn't run Pagefind), it falls back to
// matching the list's titles and previews.
//
// The address is the only place the search lives: ?q=<query>. Results and the phone
// back link carry it, so a search survives opening a result, reloading, and the back
// button; any other link drops it.
(function () {
  var app = document.querySelector(".notes-app");
  var input = document.querySelector(".notes-search input");
  var scroll = document.querySelector(".notes-scroll");
  if (!app || !input || !scroll) return;

  var results = document.createElement("ul");
  results.className = "notes-results";
  var none = document.createElement("p");
  none.className = "notes-empty notes-no-results";
  none.textContent = "No results.";
  none.hidden = true; // until a search has finished with nothing
  scroll.append(results, none);

  var onNotePage = !!document.querySelector(".notes-app--note");
  var current = onNotePage && document.querySelector('.notes-scroll .note-row[aria-current="true"]');
  var currentPath = current && current.getAttribute("href");
  var back = document.querySelector(".notes-back");
  var backPath = back && back.getAttribute("href");
  var loading = null;
  var pagefindReady = false;
  var restoring = false;

  function loadPagefind() {
    if (!loading) {
      loading = import(input.dataset.pagefindPath + "pagefind.js")
        .then(function (pagefind) {
          // Short excerpts keep the highlighted match inside the two-line preview.
          return pagefind.options({ excerptLength: 12 })
            .then(function () { return pagefind.init(); })
            .then(function () { pagefindReady = true; return pagefind; });
        })
        .catch(function () { return null; });
    }
    return loading;
  }

  function folderScope() {
    var link = document.querySelector('.folder-list a[data-folder][aria-current="true"]');
    return link ? link.dataset.folder : null;
  }

  // title and excerpt are DOM nodes (see marked()) or, from Pagefind, an HTML excerpt.
  function row(url, title, excerpt) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.className = "note-row";
    a.href = withQuery(url);
    if (url === currentPath) a.setAttribute("aria-current", "true");
    var strong = document.createElement("strong");
    strong.append(title);
    var preview = document.createElement("span");
    preview.className = "note-row-excerpt";
    if (typeof excerpt === "string") {
      preview.innerHTML = excerpt; // Pagefind escapes the text; only <mark> is added
    } else {
      preview.append(excerpt);
    }
    a.append(strong, preview);
    li.append(a);
    return li;
  }

  // Text with every case-insensitive match of query wrapped in <mark>.
  function marked(text, query) {
    var fragment = document.createDocumentFragment();
    var lower = text.toLowerCase();
    var q = query.toLowerCase();
    var from = 0;
    var at = lower.indexOf(q);
    while (at !== -1) {
      fragment.append(text.slice(from, at));
      var mark = document.createElement("mark");
      mark.textContent = text.slice(at, at + q.length);
      fragment.append(mark);
      from = at + q.length;
      at = lower.indexOf(q, from);
    }
    fragment.append(text.slice(from));
    return fragment;
  }

  function show(rows) {
    results.replaceChildren.apply(results, rows);
    none.hidden = rows.length > 0;
  }

  // Matches from the rows already in the list (respecting any folder filter): shown
  // instantly, and the only results when there's no Pagefind index.
  function filterList(query) {
    var q = query.toLowerCase();
    var rows = [];
    scroll.querySelectorAll("li[data-folder]:not([hidden]) .note-row").forEach(function (link) {
      var meta = link.querySelector(".note-row-meta");
      var preview = meta ? meta.cloneNode(true) : document.createElement("span");
      preview.querySelectorAll("time").forEach(function (time) { time.remove(); });
      var title = link.querySelector("strong").textContent;
      var text = preview.textContent;
      if ((title + "\n" + text).toLowerCase().indexOf(q) === -1) return;
      rows.push(row(link.getAttribute("href"), marked(title, query), marked(text, query)));
    });
    show(rows);
  }

  input.addEventListener("focus", loadPagefind, { once: true });

  // path plus the current search as ?q=.
  function withQuery(path) {
    var query = input.value.trim();
    return query ? path + "?" + new URLSearchParams({ q: query }) : path;
  }

  // Keep the address and the phone back link in step with the search box.
  function remember(query) {
    var url = new URL(location.href);
    if (query) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    if (url.href !== location.href) history.replaceState(history.state, "", url);
    if (back) back.href = withQuery(backPath);
  }

  input.addEventListener("input", function () {
    var query = input.value.trim();
    app.classList.toggle("notes-app--searching", query !== "");
    remember(query);
    if (!query) {
      none.hidden = true;
      return;
    }

    // While Pagefind is still loading, typing shows instant matches from the list's
    // titles and previews, replaced by full-text results when they arrive. Restoring
    // a search from the address skips them and waits for the full results, so a
    // reload doesn't jump from partial to full results.
    if (!pagefindReady && !restoring) filterList(query);
    loadPagefind().then(function (pagefind) {
      if (!pagefind) return input.value.trim() === query ? filterList(query) : undefined;
      var folder = folderScope();
      return pagefind.debouncedSearch(query, folder ? { filters: { folder: folder } } : {}, 150)
        .then(function (search) {
          if (!search) return; // superseded by newer typing
          return Promise.all(search.results.slice(0, 20).map(function (r) { return r.data(); }));
        })
        .then(function (items) {
          if (!items || input.value.trim() !== query) return;
          show(items.map(function (item) { return row(item.url, item.meta.title || item.url, item.excerpt); }));
        });
    });
  });

  input.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !input.value) return;
    event.stopPropagation(); // one Escape clears the search; the next closes the drawer
    input.value = "";
    input.dispatchEvent(new Event("input"));
  });

  var saved = new URL(location.href).searchParams.get("q");
  if (saved) {
    input.value = saved;
    restoring = true;
    input.dispatchEvent(new Event("input"));
    restoring = false;
  }
})();

// Share the open note: the system share sheet where there is one, else copy the link.
(function () {
  var share = document.querySelector(".notes-share");
  if (!share) return;

  share.addEventListener("click", function () {
    var url = location.origin + share.dataset.path;

    if (navigator.share) {
      // Chrome refocuses the button with a focus ring when the share sheet closes; drop it.
      navigator.share({ title: share.dataset.title, url: url })
        .catch(function () {})
        .then(function () { share.blur(); });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        share.dataset.copied = "";
        setTimeout(function () { delete share.dataset.copied; }, 1500);
      }).catch(function () {});
    }
  });
})();

// Swap a YouTube thumbnail for the real player on click.
document.addEventListener("click", function (event) {
  var link = event.target.closest("[data-youtube-id]");
  if (!link) return;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();

  var iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/" + link.dataset.youtubeId + "?autoplay=1";
  iframe.title = link.dataset.title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  link.replaceWith(iframe);
  iframe.focus();
});

// Respect reduced motion: stop looping clips and give them controls instead.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video[data-loop]").forEach(function (video) {
    video.removeAttribute("autoplay");
    video.pause();
    video.controls = true;
  });
}
