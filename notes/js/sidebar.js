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
