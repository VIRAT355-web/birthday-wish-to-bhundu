/* ==========================================================================
   scrapbook.js — scroll reveals, photo trail arrows, balloons, photo fallback
   ========================================================================== */
(function () {
  // ---- Scroll reveal for .reveal + .trail-arrow ----
  const revealTargets = document.querySelectorAll('.reveal, .trail-arrow');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  // ---- Graceful fallback for missing photo files ----
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const n = img.dataset.fallback;
      const wrap = document.createElement('div');
      wrap.style.cssText =
        'width:100%;aspect-ratio:4/5;border-radius:3px;' +
        'display:flex;align-items:center;justify-content:center;' +
        'flex-direction:column;gap:6px;' +
        'background:linear-gradient(135deg,#DCEFFF,#FFE9C7);color:#7A8AA6;' +
        'font-family:Quicksand,sans-serif;font-size:12px;text-align:center;padding:10px;';
      wrap.innerHTML =
        '<span style="font-size:26px;">🖼️</span>' +
        '<span>drop <b>photo' + n + '.jpg</b><br>into /images</span>';
      img.replaceWith(wrap);
    }, { once: true });
  });

  // ---- Balloons in hero ----
  const balloonHost = document.getElementById('balloons');
  if (balloonHost) {
    const colors = ['#FF6B6B', '#FFC93C', '#FF9EC7', '#7FE3FF', '#FFFFFF'];
    const count = window.innerWidth < 600 ? 8 : 14;
    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 10 + Math.random() * 8;
      b.style.left = left + 'vw';
      b.style.background = colors[i % colors.length];
      b.style.animationDelay = '-' + delay + 's';
      b.style.animationDuration = duration + 's';
      balloonHost.appendChild(b);
    }
  }
})();