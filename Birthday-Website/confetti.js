/* ==========================================================================
   confetti.js — lightweight canvas confetti burst
   Exposes: window.Confetti.burst(count)
   ========================================================================== */
window.Confetti = (function () {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return { burst() {} };
  const ctx = canvas.getContext('2d');
  const colors = ['#3FA9F5', '#FFC93C', '#FF6B6B', '#FF9EC7', '#FFFFFF'];
  let particles = [];
  let running = false;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeParticle() {
    return {
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.3,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      vy: 2 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 2.4,
      life: 0,
      maxLife: 260 + Math.random() * 120
    };
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vRot;
      p.life++;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    particles = particles.filter(p => p.life < p.maxLife && p.y < canvas.height + 40);

    if (particles.length > 0) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function burst(count) {
    count = count || 140;
    for (let i = 0; i < count; i++) particles.push(makeParticle());
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  return { burst };
})();