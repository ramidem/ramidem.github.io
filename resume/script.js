(function () {
  var data = window.resumeData;

  function clear(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  function renderHeader() {
    var profile = data.profile;
    var contact = document.querySelector("[data-contact]");

    document.querySelector("[data-name]").textContent = profile.name;
    document.querySelector("[data-headline]").textContent = profile.headline;

    clear(contact);
    contact.appendChild(el("span", "", profile.location));
    contact.appendChild(el("span", "", profile.email));

    var github = el("a", "", "GitHub");
    github.href = profile.github;
    github.rel = "noreferrer";
    github.target = "_blank";
    contact.appendChild(github);
  }

  function renderExperience() {
    var list = document.querySelector("[data-experience]");
    clear(list);

    data.experience.forEach(function (item) {
      list.appendChild(renderEntry({
        organization: item.organization,
        location: item.location,
        role: item.role,
        dates: item.dates,
        summary: item.summary,
        bullets: item.bullets,
        highlights: item.highlights || []
      }));
    });
  }

  function renderEntry(item) {
    var article = el("article", "entry");
    var heading = el("div", "entry-line entry-heading");
    var meta = el("div", "entry-line entry-meta");
    var bullets = el("ul");

    heading.appendChild(el("h3", "", item.organization));
    if (item.location) {
      heading.appendChild(el("p", "", item.location));
    }

    meta.appendChild(el("p", "", item.role));
    meta.appendChild(el("time", "", item.dates));

    article.appendChild(heading);
    article.appendChild(meta);

    if (item.summary) {
      article.appendChild(el("p", "entry-summary", item.summary));
    }

    item.bullets.forEach(function (bullet) {
      bullets.appendChild(el("li", "", bullet));
    });
    article.appendChild(bullets);

    if (item.highlights && item.highlights.length > 0) {
      var nested = el("div", "nested-list");
      item.highlights.forEach(function (highlight) {
        nested.appendChild(renderEntry({
          organization: highlight.organization,
          location: highlight.location,
          role: highlight.role,
          dates: highlight.dates,
          summary: "",
          bullets: highlight.bullets,
          highlights: []
        }));
      });
      article.appendChild(nested);
    }

    return article;
  }

  function renderSkills() {
    var list = document.querySelector("[data-skills]");
    clear(list);

    data.skills.forEach(function (skill) {
      var row = el("div");
      row.appendChild(el("dt", "", skill.group));
      row.appendChild(el("dd", "", skill.items.join(", ")));
      list.appendChild(row);
    });

    var interests = el("div");
    interests.appendChild(el("dt", "", "Interests"));
    interests.appendChild(el("dd", "", "Product systems, developer experience, automation"));
    list.appendChild(interests);
  }

  function bindActions() {
    var printButton = document.querySelector("[data-print]");
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  function render() {
    renderHeader();
    renderExperience();
    renderSkills();
  }

  document.addEventListener("DOMContentLoaded", function () {
    bindActions();
    render();
  });
})();
