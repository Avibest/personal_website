export function setupNav() {
  var menuBtn = document.getElementById("menuBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  if (!menuBtn || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  Array.prototype.slice.call(mobileMenu.querySelectorAll("a")).forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
}
