
   /* ==========================================================================
   password.js — envelope interaction + password gate
   ========================================================================== */
(function () {
  const envelope   = document.getElementById('envelope');
  const form       = document.getElementById('passwordForm');
  const input      = document.getElementById('passwordInput');
  const errorEl    = document.getElementById('passwordError');
  const transition = document.getElementById('gateTransition');

  // Accepted passwords (case-insensitive, whitespace-trimmed)
  const VALID_PASSWORDS = ['riya', 'virat'];

  let opened = false;

  envelope.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    envelope.classList.add('open');
    setTimeout(() => input.focus(), 700);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = input.value.trim().toLowerCase();

    if (VALID_PASSWORDS.includes(value)) {
      errorEl.textContent = '';
      sessionStorage.setItem('bday_unlocked', 'true');
      transition.textContent = `Hi ${capitalize(value)}, unwrapping it now...`;
      transition.classList.add('run');
      setTimeout(() => {
        window.location.href = 'story.html';
      }, 950);
    } else {
      errorEl.textContent = 'Hmm, try again 💭';
      input.value = '';
      input.focus();
      envelope.animate(
        [
          { transform: 'translateX(0)' },
          { transform: 'translateX(-8px)' },
          { transform: 'translateX(8px)' },
          { transform: 'translateX(-6px)' },
          { transform: 'translateX(0)' }
        ],
        { duration: 350 }
      );
    }
  });

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
})();