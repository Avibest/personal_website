export function initEffects() {
  var glow = document.getElementById("cursorGlow");
  if (!glow) return;

  var lastX = 0;
  var lastY = 0;
  var raf = null;

  function onMove(e) {
    lastX = e.clientX;
    lastY = e.clientY;
    if (raf) return;

    raf = requestAnimationFrame(function () {
      glow.style.transform = "translate(" + (lastX - 160) + "px," + (lastY - 160) + "px)";
      raf = null;
    });
  }

  window.addEventListener("mousemove", onMove, { passive: true });
}

