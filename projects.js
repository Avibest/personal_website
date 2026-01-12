import { openModal, modalTemplate } from "./modal.js";

var PROJECTS = [
  {
    id: "drone",
    title: "Autonomous Campus Drone Platform",
    status: "In progress",
    image: "assets/cad_drone.png",
    description:
      "CAD-designed drone platform developed for a club project focused on autonomous monitoring across the IMSA campus. The frame is designed to support computer vision and machine learning workflows by accounting for onboard sensing, compute, and power constraints.",
    tags: ["Onshape", "CAD", "Robotics", "ML Systems"],
    categories: ["cad", "hardware"],
    bullets: [
      "Designed a quadcopter frame in Onshape with mounting support for a camera, thermal imaging module, and onboard electronics.",
      "Planned component placement to support ML-based activity detection while maintaining structural balance and clear wiring paths.",
      "Accounted for payload weight, sensor placement, and future expansion during frame design.",
      "Currently transitioning from CAD to physical assembly and mechanical validation."
    ]
  },
  {
    id: "microbit",
    title: "Micro:bit Workout Phase Coach",
    status: "Prototype",
    image: "assets/bit.png",
    description:
      "A sensor-based fitness system that uses heart-rate and motion data to guide pacing across warmup, cardio, and cooldown phases. Built using Python-based machine learning and deployed on a Micro:bit for real-time feedback.",
    tags: ["Python", "Machine Learning", "Micro:bit", "Sensors"],
    categories: ["hardware", "ml"],
    bullets: [
      "Collected heart sensor and accelerometer data during exercise sessions and segmented data by workout phase.",
      "Trained a Python ML model to learn typical heart-rate patterns for warmup, cardio, and cooldown.",
      "Used the trained model to generate real-time on-screen feedback telling the user to speed up or slow down.",
      "Implemented the full system using the Micro:bit development environment."
    ]
  },
  {
    id: "glove",
    title: "Cooling Glove for Tendonitis",
    status: "Completed",
    image: "assets/glove.png",
    description:
      "Innovation project developed for FIRST LEGO League focused on assisting musicians with tendonitis. The solution is a cooling glove connected to an external power unit designed to reduce strain during extended playing sessions.",
    tags: ["Fusion 360", "Product Design", "Research", "Prototype"],
    categories: ["cad", "hardware"],
    bullets: [
      "Led the innovation project, defining the problem scope and guiding the solution design.",
      "Designed a cooling glove prototype in Fusion 360 connected to an external cooling unit.",
      "Reached out to professional musicians and manufacturers to evaluate feasibility and real-world usefulness.",
      "Used the feedback to validate the concept and present it during competition."
    ]
  },
  {
    id: "emotion",
    title: "Emotion to Emoji Web App",
    status: "Completed",
    image: "assets/emoji.png",
    description:
      "Personal web project built with HTML, CSS, and JavaScript. Uses a webcam-based Teachable Machine model to recognize hand gestures and map them to emoji outputs in real time.",
    tags: ["JavaScript", "HTML", "CSS", "Teachable Machine", "ML"],
    categories: ["web", "ml"],
    bullets: [
      "Collected gesture data and trained a classification model using Teachable Machine.",
      "Integrated the trained model into a browser-based application using JavaScript.",
      "Built a webcam-driven interface that classifies gestures in real time and displays corresponding emojis."
    ]
  },
  {
    id: "solar",
    title: "Curved Solar Panel Design",
    status: "Completed",
    image: "assets/panel.png",
    description:
      "Innovation project exploring improved solar energy collection through a curved panel concept. The design addresses energy loss caused by flat panels only receiving optimal sunlight for limited hours per day.",
    tags: ["Engineering Design", "Renewable Energy", "Research"],
    categories: ["hardware"],
    bullets: [
      "Helped develop the concept and technical justification for a curved solar panel design.",
      "Evaluated how curvature can increase total sunlight exposure across more hours of the day.",
      "Contacted manufacturers to discuss feasibility and real-world constraints.",
      "Refined the concept based on feedback to keep it practical and implementable."
    ]
  }
];

var currentFilter = "all";

export function renderProjects() {
  var grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  var shown = PROJECTS.filter(function (p) {
    var cats = Array.isArray(p.categories) ? p.categories : [];
    cats = cats.map(function (c) { return String(c).toLowerCase().trim(); });

    if (currentFilter === "all") return true;
    return cats.includes(String(currentFilter).toLowerCase().trim());
  });

  shown.forEach(function (p) {
    grid.appendChild(projectCard(p));
  });

  requestAnimationFrame(function () {
    var cards = grid.querySelectorAll(".project");
    cards.forEach(function (c) {
      c.style.opacity = "1";
      c.style.visibility = "visible";
      c.style.transform = "none";
    });
  });
}

export function setupProjectFiltering() {
  var btns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // remove active from all
      btns.forEach(function (x) { x.classList.remove("active"); });
      btn.classList.add("active");

      // normalize filter value
      var f = btn.getAttribute("data-filter") || "all";
      currentFilter = String(f).toLowerCase().trim();

      renderProjects();
    });
  });
}

export function setupProjectModal() {
  var grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.addEventListener("click", function (e) {
    var card = e.target.closest("[data-project-id]");
    if (!card) return;

    var id = card.getAttribute("data-project-id");
    var project = PROJECTS.find(function (p) { return p.id === id; });
    if (!project) return;

    openModal(modalTemplate(project));
  });
}

function projectCard(p) {
  var article = document.createElement("article");
  article.className = "project card"; 
  article.setAttribute("data-project-id", p.id);

  var media = document.createElement("div");
  media.className = "project-media";

  if (p.image) {
    var img = document.createElement("img");
    img.src = new URL(p.image, window.location.href).toString();
    img.alt = p.title;
    img.loading = "lazy";
    media.appendChild(img);
  } else {
    media.classList.add("placeholder");
    media.innerHTML = `
      <div class="placeholder-inner">
        <div class="placeholder-title">${escapeHtml(p.title)}</div>
        <div class="placeholder-sub">Add an image later</div>
      </div>
    `;
  }

  var body = document.createElement("div");
  body.className = "project-body";

  var titleRow = document.createElement("div");
  titleRow.className = "project-title-row";
  titleRow.innerHTML = `
    <h3>${escapeHtml(p.title)}</h3>
    <span class="status">${escapeHtml(p.status)}</span>
  `;

  var desc = document.createElement("p");
  desc.className = "muted";
  desc.textContent = p.description;

  var tags = document.createElement("div");
  tags.className = "project-tags";
  tags.innerHTML = (p.tags || []).map(function (t) {
    return `<span class="tag">${escapeHtml(t)}</span>`;
  }).join("");

  body.appendChild(titleRow);
  body.appendChild(desc);
  body.appendChild(tags);

  article.appendChild(media);
  article.appendChild(body);

  return article;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

