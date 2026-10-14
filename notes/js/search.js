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
