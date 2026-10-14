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
