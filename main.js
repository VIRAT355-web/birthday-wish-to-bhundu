/* ==========================================================================
   main.js — orchestrates story.html: gate check, entrance effects, replay
   ========================================================================== */
(function () {
  // Soft gate: send people back to the envelope if they land here directly.
  // Comment this block out if you want story.html to be openable on its own.
  if (sessionStorage.getItem('bday_unlocked') !== 'true') {
    window.location.href = 'index.html';
    return;
  }

  const typedTarget = document.getElementById('typedMessage');
  const distanceMessage =
    "The map says we're miles apart, but every scroll on this page is proof " +
    "that distance is just a number our favorite memories don't care about.";

  function playEntrance() {
    window.Fireworks && window.Fireworks.start(4200);
    window.Confetti && window.Confetti.burst(160);
  }

  window.addEventListener('load', () => {
    playEntrance();
  });

  // Type the distance message once the theme section scrolls into view
  const themeSection = document.getElementById('themeSection');
  if (themeSection && 'IntersectionObserver' in window) {
    let typed = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typed) {
          typed = true;
          window.TypeWriter && window.TypeWriter.run(typedTarget, distanceMessage, 26);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(themeSection);
  } else if (typedTarget) {
    typedTarget.textContent = distanceMessage;
  }

  // Replay button: re-run confetti + fireworks + scroll to top
  const replayBtn = document.getElementById('replayBtn');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(playEntrance, 500);
    });
  }
})();