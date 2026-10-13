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
      });
    }
  });
})();

// Swap a YouTube thumbnail for the real player on click.
document.addEventListener("click", function (event) {
  var link = event.target.closest("[data-youtube-id]");
  if (!link) return;
  event.preventDefault();

  var iframe = document.createElement("iframe");
  iframe.src = "https://www.youtube-nocookie.com/embed/" + link.dataset.youtubeId + "?autoplay=1";
  iframe.title = link.dataset.title;
  iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  link.replaceWith(iframe);
});

// Respect reduced motion: stop looping clips and give them controls instead.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("video[data-loop]").forEach(function (video) {
    video.removeAttribute("autoplay");
    video.pause();
    video.controls = true;
  });
}
