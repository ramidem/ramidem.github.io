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
