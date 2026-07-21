/* ==========================================================================
   music.js — background music play/pause toggle
   ========================================================================== */
(function () {
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  if (!btn || !audio) return;

  let playing = false;

  audio.addEventListener('error', () => {
    const err = audio.error;
    const reasons = {
      1: 'Loading was aborted.',
      2: 'A network error occurred while loading the file.',
      3: 'The file could not be decoded — it may be corrupt or an unsupported codec.',
      4: 'File not found at "audio/birthday.mp3", or the format is unsupported by this browser.'
    };
    console.error(
      '[birthday-site] Audio failed to load:',
      err ? (reasons[err.code] || `code ${err.code}`) : 'unknown error'
    );
  });

  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play()
        .then(() => {
          playing = true;
          btn.classList.add('playing');
          btn.textContent = '🔊';
          btn.title = 'Pause music';
        })
        .catch((err) => {
          console.error('[birthday-site] play() failed:', err.name, '-', err.message);
          btn.title = 'Music failed to play — check DevTools Console for the reason';
          btn.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
            { duration: 300 }
          );
        });
    } else {
      audio.pause();
      playing = false;
      btn.classList.remove('playing');
      btn.textContent = '🎵';
      btn.title = 'Play birthday music';
    }
  });
})();