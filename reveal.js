export function initReveal() {
  var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  nodes.forEach(function (el) { io.observe(el); });

  setTimeout(function () {
    nodes.forEach(function (el) { el.classList.add("visible"); });
  }, 1200);
}

