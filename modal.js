export function openModal(html) {
  var root = document.getElementById("modalRoot");
  if (!root) return;

  root.innerHTML = html;
  root.classList.add("show");
  root.setAttribute("aria-hidden", "false");

  var backdrop = root.querySelector("[data-close='backdrop']");
  var closeBtn = root.querySelector("[data-close='button']");
  var escHandler = function (e) {
    if (e.key === "Escape") closeModal();
  };

  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  window.addEventListener("keydown", escHandler, { once: true });

  root.scrollTop = 0;
}

export function closeModal() {
  var root = document.getElementById("modalRoot");
  if (!root) return;
  root.classList.remove("show");
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = "";
}

export function modalTemplate(project) {
  var imageUrl = null;
  if (project.image) {
    imageUrl = new URL(project.image, window.location.href).toString();
  }

  var media = imageUrl
    ? `<img src="${imageUrl}" alt="${escapeHtml(project.title)}" />`
    : `<div class="placeholder" style="height:100%;">
         <div class="placeholder-inner">
           <div class="placeholder-title">${escapeHtml(project.title)}</div>
           <div class="placeholder-sub">No image yet</div>
         </div>
       </div>`;

  var bullets = (project.bullets || []).map(function (b) {
    return `<li>${escapeHtml(b)}</li>`;
  }).join("");

  var tags = (project.tags || []).map(function (t) {
    return `<span class="tag">${escapeHtml(t)}</span>`;
  }).join("");

  return `
    <div class="modal-backdrop" data-close="backdrop"></div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="Project details">
      <div class="modal-top">
        <div class="modal-title">
          <h3>${escapeHtml(project.title)}</h3>
          <span class="status">${escapeHtml(project.status)}</span>
        </div>
        <button class="modal-close" data-close="button" aria-label="Close">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-media">${media}</div>
        <div class="modal-content">
          <p>${escapeHtml(project.description)}</p>

          ${project.id === "emotion" ? `
          <p style="margin-top: 10px;">
          <a href="https://avibest.github.io/Project-112/" target="_blank" rel="noopener noreferrer"
          style="color: var(--accent); text-decoration: none; font-weight: 500;">View live demo →</a>
          </p>
` : ""}

          <div class="project-tags">${tags}</div>
          <ul class="modal-bullets">${bullets}</ul>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

