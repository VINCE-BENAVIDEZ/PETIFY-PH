/*
  PETIFY photo pop-up
  Any <img data-popup> opens in a full-screen viewer.
  Close with the X button, a click on the dark backdrop, or the Esc key.
  Site icons and logos are left alone (they do not have data-popup).
*/
(() => {
  const photos = document.querySelectorAll('img[data-popup]');
  if (!photos.length) return;

  // Build the pop-up once and reuse it for every photo.
  const popup = document.createElement('div');
  popup.className = 'photo-popup';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-modal', 'true');
  popup.setAttribute('aria-label', 'Enlarged photo');
  popup.setAttribute('aria-hidden', 'true');
  popup.innerHTML = `
    <button type="button" class="photo-popup__close" aria-label="Close photo">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 5l14 14M19 5L5 19" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
      </svg>
    </button>
    <img class="photo-popup__img" alt="">
  `;
  document.body.appendChild(popup);

  const closeBtn = popup.querySelector('.photo-popup__close');
  const bigImg = popup.querySelector('.photo-popup__img');
  let lastTrigger = null;

  function open(img) {
    lastTrigger = img;
    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt;
    popup.setAttribute('aria-label', img.alt || 'Enlarged photo');
    popup.setAttribute('aria-hidden', 'false');
    popup.classList.add('is-open');
    document.body.classList.add('photo-popup-open');
    closeBtn.focus();
  }

  function close() {
    if (!popup.classList.contains('is-open')) return;
    popup.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('photo-popup-open');
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  }

  // Make each photo clickable and keyboard friendly.
  photos.forEach((img) => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-haspopup', 'dialog');
    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open(img);
      }
    });
  });

  closeBtn.addEventListener('click', close);

  // Clicking the dark area (not the photo) closes it.
  popup.addEventListener('click', (e) => {
    if (e.target === popup) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!popup.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    // Keep keyboard focus on the X while the pop-up is open.
    if (e.key === 'Tab') {
      e.preventDefault();
      closeBtn.focus();
    }
  });
})();
