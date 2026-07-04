(function () {
  var data = window.resumeData;
  var selectedLens = "general";

  function getLens() {
    return data.lenses.find(function (lens) {
      return lens.id === selectedLens;
    }) || data.lenses[0];
  }

  function projectMatches(project, lens) {
    if (lens.id === "general") {
      return true;
    }

    return project.tags.some(function (tag) {
      return lens.tags.indexOf(tag) !== -1;
    });
  }

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

  function renderLenses() {
    var list = document.querySelector("[data-lenses]");
    clear(list);

    data.lenses.forEach(function (lens) {
      var button = el("button", "lens-button", lens.label);
      button.type = "button";
      button.setAttribute("data-lens", lens.id);
      if (lens.id === selectedLens) {
        button.classList.add("is-active");
        button.setAttribute("aria-pressed", "true");
      } else {
        button.setAttribute("aria-pressed", "false");
      }
      button.addEventListener("click", function () {
        selectedLens = lens.id;
        render();
      });
      list.appendChild(button);
    });
  }

  function renderSummary(projects) {
    var lens = getLens();
    document.querySelector("[data-lens-summary]").textContent = lens.summary;
    document.querySelector("[data-project-count]").textContent = String(projects.length);
  }

  function renderSkills(projects) {
    var skillList = document.querySelector("[data-skill-groups]");
    var techList = document.querySelector("[data-tech-list]");
    var techSeen = {};

    clear(skillList);
    clear(techList);

    data.skills.forEach(function (group) {
      var block = el("article", "skill-group");
      block.appendChild(el("h3", "", group.group));

      var items = el("div", "chip-list");
      group.items.forEach(function (item) {
        items.appendChild(el("span", "chip", item));
      });

      block.appendChild(items);
      skillList.appendChild(block);
    });

    projects.forEach(function (project) {
      project.tech.forEach(function (item) {
        techSeen[item] = true;
      });
    });

    Object.keys(techSeen).sort().forEach(function (item) {
      techList.appendChild(el("span", "chip chip-strong", item));
    });
  }

  function renderProjects(projects) {
    var list = document.querySelector("[data-projects]");
    clear(list);

    projects.forEach(function (project) {
      var card = el("article", "project-card");
      var heading = el("div", "project-heading");
      var titleBlock = el("div");
      var meta = el("p", "project-meta", project.role + " | " + project.dates);

      titleBlock.appendChild(el("h3", "", project.name));
      titleBlock.appendChild(meta);
      heading.appendChild(titleBlock);
      heading.appendChild(el("span", "context-pill", project.context));

      card.appendChild(heading);
      card.appendChild(el("p", "project-summary", project.summary));

      var tech = el("div", "chip-list");
      project.tech.forEach(function (item) {
        tech.appendChild(el("span", "chip", item));
      });
      card.appendChild(tech);

      var bullets = el("ul", "bullet-list");
      project.bullets.forEach(function (bullet) {
        bullets.appendChild(el("li", "", bullet));
      });
      card.appendChild(bullets);
      list.appendChild(card);
    });
  }

  function renderRepeatedTech() {
    var list = document.querySelector("[data-repeated-tech]");
    clear(list);

    data.repeatedTech.forEach(function (item) {
      var row = el("li", "tech-row");
      row.appendChild(el("span", "", item.name));
      row.appendChild(el("strong", "", item.count + " projects"));
      list.appendChild(row);
    });
  }

  function renderExperience() {
    var list = document.querySelector("[data-experience]");
    clear(list);

    data.experience.forEach(function (job) {
      var card = el("article", "experience-card");
      card.appendChild(el("h3", "", job.organization));
      card.appendChild(el("p", "project-meta", job.role + " | " + job.dates + " | " + job.location));
      card.appendChild(el("p", "project-summary", job.summary));

      var bullets = el("ul", "bullet-list");
      job.bullets.forEach(function (bullet) {
        bullets.appendChild(el("li", "", bullet));
      });
      card.appendChild(bullets);
      list.appendChild(card);
    });
  }

  function render() {
    var lens = getLens();
    var projects = data.projects.filter(function (project) {
      return projectMatches(project, lens);
    });

    renderLenses();
    renderSummary(projects);
    renderSkills(projects);
    renderProjects(projects);
    renderRepeatedTech();
    renderExperience();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
