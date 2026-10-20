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

    clear(contact);
    contact.appendChild(el("span", "", profile.location));

    var email = el("a", "", profile.email);
    email.href = "mailto:" + profile.email;
    contact.appendChild(email);

    var github = el("a", "", profile.github.replace(/^https?:\/\/(www\.)?/, ""));
    github.href = profile.github;
    github.rel = "noopener noreferrer";
    github.target = "_blank";
    contact.appendChild(github);

    if (profile.linkedin) {
      var linkedin = el("a", "", profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""));
      linkedin.href = profile.linkedin;
      linkedin.rel = "noopener noreferrer";
      linkedin.target = "_blank";
      contact.appendChild(linkedin);
    }
  }

  function renderExperience() {
    var list = document.querySelector("[data-experience]");
    clear(list);

    data.experience.forEach(function (item, index) {
      list.appendChild(renderEntry({
        organization: item.organization,
        url: item.url,
        location: item.location,
        role: item.role,
        dates: item.dates,
        summary: item.summary,
        bullets: item.bullets,
        highlights: item.highlights || [],
        isClientWork: index > 0
      }));
    });
  }

  function renderEntry(item) {
    var article = el("article", "entry");
    var heading = el("div", "entry-line entry-heading");
    var meta = el("div", "entry-line entry-meta");
    var bullets = el("ul");
    var title = item.url ? el("a", "", item.organization) : el("h3", "", item.organization);

    if (item.isClientWork) {
      article.className += " client-work";
    }

    if (item.plain) {
      article.className += " plain";
    }

    if (item.url) {
      title.href = item.url;
      title.rel = "noopener noreferrer";
      title.target = "_blank";
      var titleHeading = el("h3");
      titleHeading.appendChild(title);
      heading.appendChild(titleHeading);
    } else {
      heading.appendChild(title);
    }

    if (item.location) {
      heading.appendChild(el("p", "", item.location));
    }

    if (item.role) {
      meta.appendChild(el("p", "", item.role));
      meta.appendChild(el("time", "", item.dates));
    } else if (item.dates) {
      // No role line: show the dates inline with the title instead of on a row of their own.
      heading.appendChild(el("p", "", item.dates));
    }

    article.appendChild(heading);
    if (item.role) {
      article.appendChild(meta);
    }

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
          bullets: highlight.bullets.slice(0, 1),
          highlights: []
        }));
      });
      article.appendChild(nested);
    }

    return article;
  }

  function renderEducation() {
    var list = document.querySelector("[data-education]");
    clear(list);

    data.education.forEach(function (item) {
      list.appendChild(renderEntry({
        organization: item.institution,
        role: item.degree,
        dates: item.dates,
        summary: "",
        bullets: [],
        highlights: [],
        plain: true
      }));
    });
  }

  function render() {
    renderHeader();
    renderEducation();
    renderExperience();
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
  });
})();
