import { setupNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initEffects } from "./effects.js";
import { renderProjects, setupProjectFiltering, setupProjectModal } from "./projects.js";

document.getElementById("year").textContent = new Date().getFullYear();

setupNav();
initEffects();

renderProjects();
setupProjectFiltering();
setupProjectModal();

initReveal();

