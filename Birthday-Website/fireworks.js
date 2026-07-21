/* ==========================================================================
   fireworks.js — lightweight canvas firework bursts
   Exposes: window.Fireworks.start(durationMs), window.Fireworks.stop()
   ========================================================================== */
window.Fireworks = (function () {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return { start() {}, stop() {} };
  const ctx = canvas.getContext('2d');
  const colors = ['#3FA9F5', '#FFC93C', '#FF6B6B', '#FF9EC7', '#FFFFFF', '#7FE3FF'];

  let sparks = [];
  let raf = null;
  let spawnTimer = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function explode(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 40 + Math.floor(Math.random() * 20);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = 1.5 + Math.random() * 3;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 0,
        maxLife: 50 + Math.random() * 24
      });
    }
  }

  function tick() {
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks.forEach(s => {
      s.vy += 0.03; // gravity
      s.x += s.vx;
      s.y += s.vy;
      s.life++;
      const alpha = Math.max(0, 1 - s.life / s.maxLife);
      ctx.beginPath();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.arc(s.x, s.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
    sparks = sparks.filter(s => s.life < s.maxLife);
    raf = requestAnimationFrame(tick);
  }

  function start(durationMs) {
    durationMs = durationMs || 4000;
    if (raf) cancelAnimationFrame(raf);
    tick();

    const spawnOnce = () => {
      explode(
        canvas.width * (0.2 + Math.random() * 0.6),
        canvas.height * (0.18 + Math.random() * 0.35)
      );
    };
    spawnOnce();
    spawnTimer = setInterval(spawnOnce, 550);

    setTimeout(() => {
      clearInterval(spawnTimer);
      setTimeout(stop, 1600);
    }, durationMs);
  }

  function stop() {
    if (spawnTimer) clearInterval(spawnTimer);
    if (raf) cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparks = [];
  }

  return { start, stop };
})();