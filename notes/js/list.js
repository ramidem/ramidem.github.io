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
