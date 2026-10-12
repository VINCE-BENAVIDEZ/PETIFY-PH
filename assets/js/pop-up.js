/*
  PETIFY photo pop-up
  Opens a pet photo in a full-screen viewer. Works with local files AND
  online image links (https://...), including photos whose src is changed
  later by hand or by script.

  Photos that open: the main profile photo, the gallery photos, and any
  <img data-popup>. Site icons and logos are left alone.
  Close with the X button, a click on the dark backdrop, or the Esc key.
*/
(() => {
  // Auto-detected, so a photo still pops up even if data-popup is removed
  // when its src is replaced with an online link.
  const PHOTO_SELECTOR = [
    'img[data-popup]',
    '.pet-identity__photo img',
    '.profile-gallery__item img'
  ].join(',');

  // ---------- Build the pop-up once ----------
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
    <p class="photo-popup__error" role="alert" hidden>Sorry, this photo couldn’t be loaded.</p>
  `;
  document.body.appendChild(popup);

  const closeBtn = popup.querySelector('.photo-popup__close');
  const bigImg = popup.querySelector('.photo-popup__img');
  const errorMsg = popup.querySelector('.photo-popup__error');
  let lastTrigger = null;
  let retried = false;

  // Some image hosts reject requests that carry a referrer. If the first
  // load fails, try once more without it before showing the message.
  bigImg.addEventListener('error', () => {
    if (!retried && bigImg.getAttribute('src')) {
      retried = true;
      bigImg.referrerPolicy = 'no-referrer';
      bigImg.src = bigImg.getAttribute('src');
      return;
    }
    bigImg.hidden = true;
    errorMsg.hidden = false;
  });
  bigImg.addEventListener('load', () => {
    bigImg.hidden = false;
    errorMsg.hidden = true;
  });

  // ---------- Open / close ----------
  function open(img) {
    const src = img.currentSrc || img.src;
    if (!src) return;

    lastTrigger = img;
    retried = false;
    errorMsg.hidden = true;
    bigImg.hidden = false;
    bigImg.referrerPolicy = img.referrerPolicy || '';
    bigImg.alt = img.alt;
    bigImg.src = src;

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

  // ---------- Find the photo for a click ----------
  // Delegated, so it keeps working if an <img> is swapped or added later.
  // Clicking a gallery tile's caption also opens that tile's photo.
  function photoFrom(target) {
    if (!(target instanceof Element) || popup.contains(target)) return null;
    const direct = target.closest(PHOTO_SELECTOR);
    if (direct) return direct;
    const tile = target.closest('.profile-gallery__item');
    return tile ? tile.querySelector('img') : null;
  }

  document.addEventListener('click', (e) => {
    const img = photoFrom(e.target);
    if (img) open(img);
  });

  document.addEventListener('keydown', (e) => {
    if (popup.classList.contains('is-open')) {
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); } // keep focus on the X
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      const img = e.target instanceof Element && e.target.matches(PHOTO_SELECTOR) ? e.target : null;
      if (img) { e.preventDefault(); open(img); }
    }
  });

  closeBtn.addEventListener('click', close);
  popup.addEventListener('click', (e) => {
    if (e.target === popup) close(); // dark area only, not the photo
  });

  // ---------- Keyboard/screen-reader support for every photo ----------
  function enhance(root) {
    root.querySelectorAll(PHOTO_SELECTOR).forEach((img) => {
      if (img.hasAttribute('data-popup-ready')) return;
      img.setAttribute('data-popup-ready', '');
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-haspopup', 'dialog');
    });
  }
  enhance(document);
  new MutationObserver(() => enhance(document))
    .observe(document.body, { childList: true, subtree: true });
})();
